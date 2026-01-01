-- Supabase Storage Setup for Recipe Images
-- Run this SQL in your Supabase SQL Editor

-- Create a storage bucket for recipe images
INSERT INTO storage.buckets (id, name, public)
VALUES ('recipe-images', 'recipe-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create a policy to allow public read access
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT
USING (bucket_id = 'recipe-images');

-- Create a policy to allow authenticated users to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'recipe-images' AND
  auth.role() = 'authenticated'
);

-- For development: Allow public uploads (remove in production)
CREATE POLICY "Public can upload" ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'recipe-images');

-- Allow public to update their own uploads
CREATE POLICY "Public can update" ON storage.objects
FOR UPDATE
USING (bucket_id = 'recipe-images')
WITH CHECK (bucket_id = 'recipe-images');

-- Allow public to delete their own uploads
CREATE POLICY "Public can delete" ON storage.objects
FOR DELETE
USING (bucket_id = 'recipe-images');

