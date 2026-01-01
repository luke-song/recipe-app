-- Add price column to existing recipes table
-- Run this SQL in your Supabase SQL Editor if you already created the table

ALTER TABLE recipes 
ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2);

