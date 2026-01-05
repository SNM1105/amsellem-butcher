-- Update products table to support bilingual content
-- Run this in your Supabase SQL Editor

-- Add new columns for French translations
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS name_fr TEXT,
ADD COLUMN IF NOT EXISTS description_fr TEXT;

-- Rename existing columns to indicate they're English
ALTER TABLE products 
RENAME COLUMN name TO name_en;

ALTER TABLE products 
RENAME COLUMN description TO description_en;

-- Optional: Update existing data to have the same content in both languages initially
UPDATE products 
SET name_fr = name_en, 
    description_fr = description_en
WHERE name_fr IS NULL;

-- Verify the changes
SELECT id, name_en, name_fr, description_en, description_fr 
FROM products 
LIMIT 5;
