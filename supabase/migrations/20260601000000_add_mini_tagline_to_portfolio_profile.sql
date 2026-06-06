-- Migration: Add mini_tagline to portfolio_profile table
ALTER TABLE portfolio_profile ADD COLUMN IF NOT EXISTS mini_tagline TEXT;
