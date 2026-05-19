
-- 1. Enable RLS on inventory (policy already exists for public read)
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

-- 2. Lock down SECURITY DEFINER helper from API roles
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;

-- 3. Restrict Realtime subscriptions: only allow the inventory channel
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow inventory realtime subscription" ON realtime.messages;
CREATE POLICY "Allow inventory realtime subscription"
ON realtime.messages
FOR SELECT
TO anon, authenticated
USING (
  realtime.topic() IN ('inventory-changes', 'realtime:public:inventory')
);
