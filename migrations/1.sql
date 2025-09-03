
CREATE TABLE viral_searches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  query TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  total_results INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

CREATE TABLE viral_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  search_id INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  post_url TEXT NOT NULL,
  platform TEXT NOT NULL,
  title TEXT,
  description TEXT,
  engagement_score REAL DEFAULT 0,
  views_estimate INTEGER DEFAULT 0,
  likes_estimate INTEGER DEFAULT 0,
  comments_estimate INTEGER DEFAULT 0,
  shares_estimate INTEGER DEFAULT 0,
  author TEXT,
  author_followers INTEGER DEFAULT 0,
  post_date TEXT,
  hashtags TEXT,
  image_path TEXT,
  screenshot_path TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_viral_searches_query ON viral_searches(query);
CREATE INDEX idx_viral_searches_status ON viral_searches(status);
CREATE INDEX idx_viral_images_search_id ON viral_images(search_id);
CREATE INDEX idx_viral_images_platform ON viral_images(platform);
CREATE INDEX idx_viral_images_engagement_score ON viral_images(engagement_score);
