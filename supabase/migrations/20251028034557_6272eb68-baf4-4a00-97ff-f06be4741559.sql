-- Create users registration table
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to register (insert)
CREATE POLICY "Anyone can register"
  ON public.registrations
  FOR INSERT
  WITH CHECK (true);

-- Only allow users to view their own registration
CREATE POLICY "Users can view own registration"
  ON public.registrations
  FOR SELECT
  USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Create index on email for faster lookups
CREATE INDEX idx_registrations_email ON public.registrations(email);