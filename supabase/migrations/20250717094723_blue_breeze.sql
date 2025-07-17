/*
  # Add auth users table integration

  1. New Tables
    - Update users table to work with Supabase Auth
    - Add auth trigger for automatic user creation

  2. Security
    - Update RLS policies to work with Supabase Auth
    - Add trigger for automatic user creation on signup

  3. Changes
    - Remove clerk_id column
    - Add auth trigger function
    - Update policies to use auth.uid()
*/

-- Remove clerk_id column and add auth integration
ALTER TABLE users DROP COLUMN IF EXISTS clerk_id;

-- Add auth trigger function to automatically create user records
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update RLS policies for users table
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Service role can manage all users" ON users;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Service role can manage all users"
  ON users
  FOR ALL
  TO service_role
  USING (true);

-- Update RLS policies for subscriptions table
DROP POLICY IF EXISTS "Users can read own subscriptions" ON subscriptions;

CREATE POLICY "Users can read own subscriptions"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions"
  ON subscriptions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Update indexes
DROP INDEX IF EXISTS idx_users_clerk_id;
CREATE INDEX IF NOT EXISTS idx_users_id ON users(id);