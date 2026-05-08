ALTER TABLE public.inventory DISABLE ROW LEVEL SECURITY;
ALTER PUBLICATION supabase_realtime ADD TABLE public.inventory;
ALTER TABLE public.inventory REPLICA IDENTITY FULL;