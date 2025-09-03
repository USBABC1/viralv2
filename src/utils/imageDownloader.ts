// Image downloader utility for local development
export class ImageDownloader {
  private static instance: ImageDownloader;
  private downloadedImages: Map<string, string> = new Map();

  private constructor() {}

  static getInstance(): ImageDownloader {
    if (!ImageDownloader.instance) {
      ImageDownloader.instance = new ImageDownloader();
    }
    return ImageDownloader.instance;
  }

  async downloadImage(imageUrl: string, filename: string): Promise<string | null> {
    try {
      console.log(`📥 Starting download: ${filename}`);
      
      // Check if already downloaded
      if (this.downloadedImages.has(filename)) {
        console.log(`✅ Image already cached: ${filename}`);
        return this.downloadedImages.get(filename)!;
      }

      // Download the image
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
      const bytes = new Uint8Array(arrayBuffer);
      
      console.log(`📦 Downloaded ${bytes.length} bytes for: ${filename}`);

      // Convert to base64 for storage
      const base64 = btoa(String.fromCharCode(...bytes));
      const dataUrl = `data:${response.headers.get('content-type') || 'image/jpeg'};base64,${base64}`;

      // Cache the result
      this.downloadedImages.set(filename, dataUrl);
      
      console.log(`✅ Image cached successfully: ${filename}`);
      return dataUrl;

    } catch (error) {
      console.error(`💥 Download error for ${filename}:`, error);
      return null;
    }
  }

  getStats() {
    return {
      total_downloaded: this.downloadedImages.size,
      cached_images: Array.from(this.downloadedImages.keys())
    };
  }

  clearCache() {
    this.downloadedImages.clear();
    console.log('🗑️ Image cache cleared');
  }
}
