import fs from 'fs/promises';
import path from 'path';

// Image downloader utility for local development
export class ImageDownloader {
  private static instance: ImageDownloader;
  private imageDir = path.join(process.cwd(), 'data', 'images');

  private constructor() {
    // Ensure the image directory exists
    fs.mkdir(this.imageDir, { recursive: true });
  }

  static getInstance(): ImageDownloader {
    if (!ImageDownloader.instance) {
      ImageDownloader.instance = new ImageDownloader();
    }
    return ImageDownloader.instance;
  }

  async downloadImage(imageUrl: string, filename: string): Promise<string | null> {
    const filePath = path.join(this.imageDir, filename);
    const relativePath = path.join('data', 'images', filename);

    try {
      console.log(`📥 Starting download: ${filename}`);
      
      // Check if file already exists
      try {
        await fs.access(filePath);
        console.log(`✅ Image already exists on disk: ${filename}`);
        return relativePath;
      } catch {
        // File doesn't exist, proceed with download
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
      const buffer = Buffer.from(arrayBuffer);
      
      console.log(`📦 Downloaded ${buffer.length} bytes for: ${filename}`);

      // Save the image to the filesystem
      await fs.writeFile(filePath, buffer);
      
      console.log(`✅ Image saved successfully: ${filename}`);
      return relativePath;

    } catch (error) {
      console.error(`💥 Download error for ${filename}:`, error);
      return null;
    }
  }

  async getStats() {
    try {
      const files = await fs.readdir(this.imageDir);
      return {
        total_downloaded: files.length,
        cached_images: files
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      return {
        total_downloaded: 0,
        cached_images: []
      };
    }
  }

  async clearCache() {
    try {
      const files = await fs.readdir(this.imageDir);
      for (const file of files) {
        await fs.unlink(path.join(this.imageDir, file));
      }
      console.log('🗑️ Image cache cleared');
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }
}
