-- Migration to add favicon to portfolio_profile table
ALTER TABLE portfolio_profile ADD COLUMN favicon TEXT;
