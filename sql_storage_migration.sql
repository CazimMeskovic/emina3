-- Supabase Storage migration SQL
-- 1. Add image_url column to posts
ALTER TABLE posts ADD COLUMN image_url TEXT;
-- 2. (Optional) Remove old images column if not needed
-- ALTER TABLE posts DROP COLUMN images;
-- 3. (Optional) Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_created_at ON posts (created_at);