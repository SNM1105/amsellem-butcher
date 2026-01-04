# Supabase Database Setup

## Products Table Schema

Create a table called `products` in your Supabase dashboard with the following structure:

```sql
-- Create products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  stock INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add RLS (Row Level Security) policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Allow public read access to products"
  ON products FOR SELECT
  USING (true);

-- Only authenticated users can insert/update/delete
CREATE POLICY "Allow authenticated insert"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update"
  ON products FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Create an index for better performance on category queries
CREATE INDEX idx_products_category ON products(category);

-- Optional: Add a trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Image Storage Setup

For images, you should also set up a Storage bucket in Supabase:

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `product-images`
3. Make it public for read access
4. Set up appropriate policies:

```sql
-- Allow public read access to images
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product-images');

-- Allow authenticated users to update images
CREATE POLICY "Authenticated users can update images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'product-images');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'product-images');
```

## Categories

Based on your current products, you have these categories:

- Beef
- Lamb
- Chicken
- Veal
- Turkey

## Next Steps

1. Go to your Supabase project: https://supabase.com/dashboard
2. Navigate to SQL Editor
3. Run the SQL script above to create the table
4. Set up Storage bucket for images
5. Add your environment variables to `.env`
6. Migrate your existing products data to Supabase
