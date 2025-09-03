// Image downloader utility for local development
export class ImageDownloader {
  private bucket: R2Bucket;

  constructor(bucket: R2Bucket) {
    this.bucket = bucket;
  }

  async downloadImage(imageUrl: string, filename: string): Promise<string | null> {
    try {
      console.log(`📥 Starting download: ${filename}`);
      
      // Check if file already exists in R2
      const existing = await this.bucket.head(filename);
      if (existing) {
        console.log(`✅ Image already exists in R2: ${filename}`);
        return filename;
      }

      // Download the image
      console.log(`Fetching image from: ${imageUrl}`);
      const response = await fetch(imageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'image/*',
          'Referer': 'https://www.instagram.com/'
        }
      });

      if (!response.ok) {
        console.log(`❌ Download failed (${response.status}): ${filename}`);
        return null;
      }

      // Get image data
      const arrayBuffer = await response.arrayBuffer();
      
      console.log(`📦 Downloaded ${arrayBuffer.byteLength} bytes for: ${filename}`);

      // Save the image to R2
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      await this.bucket.put(filename, arrayBuffer, {
        httpMetadata: { contentType },
      });
      
      console.log(`✅ Image saved successfully to R2: ${filename}`);
      return filename;

    } catch (error) {
      console.error(`💥 Download error for ${filename}:`, error);
      return null;
    }
  }

  async getStats() {
    try {
      const objects = await this.bucket.list();
      return {
        total_downloaded: objects.objects.length,
        cached_images: objects.objects.map(obj => obj.key)
      };
    } catch (error) {
      console.error('Error getting stats from R2:', error);
      return {
        total_downloaded: 0,
        cached_images: []
      };
    }
  }

  async clearCache() {
    try {
      const objects = await this.bucket.list();
      const keys = objects.objects.map(obj => obj.key);
      await this.bucket.delete(keys);
      console.log('🗑️ R2 cache cleared');
    } catch (error) {
      console.error('Error clearing R2 cache:', error);
    }
  }
}
