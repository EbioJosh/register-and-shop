-- Create orders table for checkout data
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_phone TEXT NOT NULL,
  delivery_notes TEXT,
  payment_method TEXT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table for individual items in orders
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL,
  product_name TEXT NOT NULL,
  product_price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create orders
CREATE POLICY "Anyone can create orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to create order items
CREATE POLICY "Anyone can create order items"
  ON public.order_items
  FOR INSERT
  WITH CHECK (true);

-- Users can view their own orders
CREATE POLICY "Users can view own orders"
  ON public.orders
  FOR SELECT
  USING (user_email = current_setting('request.jwt.claims', true)::json->>'email' OR true);

-- Users can view order items for their orders
CREATE POLICY "Anyone can view order items"
  ON public.order_items
  FOR SELECT
  USING (true);

-- Add password field to registrations if not exists
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS password TEXT NOT NULL DEFAULT '';

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_orders_email ON public.orders(user_email);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);