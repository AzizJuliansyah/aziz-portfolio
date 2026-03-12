-- Create tables for portfolio

CREATE TABLE portfolio_profile (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT,
  email TEXT,
  bio TEXT,
  avatar TEXT,
  cv TEXT,
  phone TEXT,
  location TEXT,
  github TEXT,
  linkedin TEXT,
  instagram TEXT,
  twitter TEXT,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Function to handle single active profile
CREATE OR REPLACE FUNCTION set_single_active_profile()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_active THEN
    UPDATE portfolio_profile SET is_active = FALSE WHERE id <> NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger
CREATE TRIGGER enforce_single_active_profile
BEFORE INSERT OR UPDATE OF is_active ON portfolio_profile
FOR EACH ROW
WHEN (NEW.is_active = TRUE)
EXECUTE FUNCTION set_single_active_profile();

CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES portfolio_profile(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  "order" INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES portfolio_profile(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  link TEXT,
  info TEXT,
  description TEXT NOT NULL,
  "order" INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE project_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  info TEXT NOT NULL,
  description TEXT NOT NULL,
  "order" INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed Initial Admin User (password is 'admin123' bcrypt hashed)
INSERT INTO users (email, password, name) 
VALUES ('admin@portfolio.com', '$2b$10$wK1c6BvK0W1f6C/X.X5C/.qJq4a0k6gX.b8zY8gQoJ8v9yN8y/Y4C', 'Admin')
ON CONFLICT (email) DO NOTHING;
