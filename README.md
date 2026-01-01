# Recipe App

A modern, responsive recipe collection app built with Next.js, shadcn UI, and Supabase. Accessible on mobile, tablet, and desktop devices.

## Features

- 📱 Responsive design for mobile, tablet, and desktop
- 🎨 Beautiful UI with shadcn components
- 🗄️ Supabase backend for data storage
- ➕ Create, view, edit, and delete recipes
- 🖼️ Image upload support (works on mobile devices)
- ⏱️ Track prep time, cook time, and servings
- 💰 Track the cost to make each recipe
- 🌓 Dark/Light mode with dark mode as default

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase Database

You need to create a `recipes` table in your Supabase database. Run the SQL from `supabase-setup.sql` in your Supabase SQL Editor.

### 3. Set Up Supabase Storage (for Image Uploads)

To enable image uploads, you need to create a storage bucket. Run the SQL from `supabase-storage-setup.sql` in your Supabase SQL Editor, or follow these steps:

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **New bucket**
4. Name it `recipe-images`
5. Make it **Public**
6. Click **Create bucket**

Alternatively, run the SQL from `supabase-storage-setup.sql` which will create the bucket and set up the necessary policies.

```sql
-- Create recipes table
CREATE TABLE recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  ingredients TEXT[] NOT NULL,
  instructions TEXT[] NOT NULL,
  prep_time INTEGER,
  cook_time INTEGER,
  servings INTEGER,
  price DECIMAL(10, 2),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional, but recommended)
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow all operations (adjust based on your auth needs)
CREATE POLICY "Allow all operations for authenticated users" ON recipes
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Or if you want public access (for development):
CREATE POLICY "Allow public access" ON recipes
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

### 4. Environment Variables

The `.env.local` file has been created with your Supabase credentials. Make sure it contains:

```
NEXT_PUBLIC_SUPABASE_URL=https://cuyuffsbrxopcdtnkxeh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_x2X-3crSm53rr6taWTUKMQ_cKczaJo5
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
recipe-app/
├── app/
│   ├── recipes/
│   │   ├── [id]/
│   │   │   └── page.tsx      # Recipe detail page
│   │   └── new/
│   │       └── page.tsx      # New recipe form
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page (recipe list)
├── components/
│   └── ui/                   # shadcn UI components
├── lib/
│   └── supabase.ts           # Supabase client
├── types/
│   └── recipe.ts             # Recipe type definitions
└── .env.local                # Environment variables
```

## Usage

1. **View Recipes**: The home page displays all your recipes in a responsive grid
2. **Add Recipe**: Click the "+" button to create a new recipe
3. **Upload Images**: Click "Choose Image" to upload from your device (works on mobile!) or enter an image URL
4. **Edit Recipe**: Click the "Edit" button on any recipe detail page or use the menu on recipe cards
5. **Delete Recipe**: Click the "Delete" button and confirm to remove a recipe
6. **Toggle Theme**: Click the sun/moon icon to switch between dark and light modes

## Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn UI** - UI component library
- **Supabase** - Backend database and API

## Image Upload

The app supports image uploads directly from your device:
- **Mobile-friendly**: Works seamlessly on phones and tablets
- **File validation**: Only accepts image files (max 5MB)
- **Preview**: See your image before saving
- **Fallback**: Can still use image URLs if preferred
- **Storage**: Images are stored in Supabase Storage

## Next Steps

- Add authentication for user-specific recipes
- Add recipe search and filtering
- Add recipe categories/tags
- Add recipe sharing features
- Add image compression/optimization
