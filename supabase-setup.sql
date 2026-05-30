-- Run this in Supabase SQL Editor

-- Add ad_type column to ads table if it doesn't exist
ALTER TABLE ads ADD COLUMN IF NOT EXISTS ad_type TEXT DEFAULT 'client';

-- Update existing records to have the correct type
UPDATE ads SET ad_type = 'client' WHERE ad_type IS NULL OR ad_type = '';

-- If you need to reset and start fresh:
-- DROP TABLE IF EXISTS ads CASCADE;
-- Recreate with the new column
-- CREATE TABLE ads (
--   id TEXT PRIMARY KEY DEFAULT (substr(md5(random()::text), 1, 12)),
--   title TEXT NOT NULL, description TEXT NOT NULL,
--   client_name TEXT NOT NULL, client_email TEXT NOT NULL,
--   client_phone TEXT, website_url TEXT,
--   image_url TEXT NOT NULL, target_url TEXT NOT NULL,
--   position TEXT NOT NULL, size TEXT NOT NULL,
--   status TEXT DEFAULT 'pending',
--   start_date TIMESTAMPTZ NOT NULL, end_date TIMESTAMPTZ NOT NULL,
--   impressions INT DEFAULT 0, clicks INT DEFAULT 0,
--   ad_type TEXT DEFAULT 'client',
--   created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
-- );