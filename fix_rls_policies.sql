-- Fix Row Level Security (RLS) policies for products table
-- Run this in your Supabase SQL Editor

-- Disable RLS on products table (simplest solution for now)
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- OR if you want to keep RLS enabled, use these policies instead:
-- (Comment out the line above and uncomment these)

-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- DROP POLICY IF EXISTS "Enable read access for all users" ON products;
-- CREATE POLICY "Enable read access for all users" ON products
--   FOR SELECT USING (true);

-- DROP POLICY IF EXISTS "Enable insert for all users" ON products;
-- CREATE POLICY "Enable insert for all users" ON products
--   FOR INSERT WITH CHECK (true);

-- DROP POLICY IF EXISTS "Enable update for all users" ON products;
-- CREATE POLICY "Enable update for all users" ON products
--   FOR UPDATE USING (true);

-- DROP POLICY IF EXISTS "Enable delete for all users" ON products;
-- CREATE POLICY "Enable delete for all users" ON products
--   FOR DELETE USING (true);
