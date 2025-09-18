-- Supabase Database Schema
-- Hot Wheels Catalog - Free PostgreSQL Database
-- Desenvolvido com Amazon Q Developer

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (integrates with Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hot Wheels cars table
CREATE TABLE IF NOT EXISTS hotwheels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  series VARCHAR(255),
  year INTEGER,
  rarity VARCHAR(50),
  color VARCHAR(100),
  observations TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Packs table
CREATE TABLE IF NOT EXISTS packs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  year INTEGER,
  series VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lists table
CREATE TABLE IF NOT EXISTS lists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- List items table
CREATE TABLE IF NOT EXISTS list_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  list_id UUID REFERENCES lists(id) ON DELETE CASCADE,
  car_id UUID REFERENCES hotwheels(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(list_id, car_id)
);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  car_id UUID REFERENCES hotwheels(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, car_id)
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_hotwheels_user_id ON hotwheels(user_id);
CREATE INDEX IF NOT EXISTS idx_hotwheels_series ON hotwheels(series);
CREATE INDEX IF NOT EXISTS idx_hotwheels_year ON hotwheels(year);
CREATE INDEX IF NOT EXISTS idx_packs_user_id ON packs(user_id);
CREATE INDEX IF NOT EXISTS idx_lists_user_id ON lists(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotwheels ENABLE ROW LEVEL SECURITY;
ALTER TABLE packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE list_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own cars" ON hotwheels FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cars" ON hotwheels FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cars" ON hotwheels FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cars" ON hotwheels FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own packs" ON packs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own packs" ON packs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own packs" ON packs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own packs" ON packs FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own lists" ON lists FOR SELECT USING (auth.uid() = user_id OR is_public = true);
CREATE POLICY "Users can insert own lists" ON lists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own lists" ON lists FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own lists" ON lists FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own favorites" ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own favorites" ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own favorites" ON favorites FOR DELETE USING (auth.uid() = user_id);
