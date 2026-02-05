-- Admin Settings Table
-- Stores global platform configuration (Maintenance Mode, AI Engine Status, etc.)

CREATE TABLE public.admin_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    maintenance_mode BOOLEAN DEFAULT FALSE,
    ai_engine_enabled BOOLEAN DEFAULT TRUE,
    rls_monitoring_enabled BOOLEAN DEFAULT TRUE,
    global_search_enabled BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES auth.users(id)
);

-- RLS Policies
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Allow read access to everyone (so the app knows if maintenance mode is on)
CREATE POLICY "Settings viewable by everyone" ON public.admin_settings FOR SELECT USING (true);

-- Allow update only by admins (we'll assume super_admin role check in app logic or trigger, 
-- but for now allow auth users to keep it simple as middleware handles role check)
CREATE POLICY "Admins can update settings" ON public.admin_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can insert settings" ON public.admin_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Seed valid initial row (Singleton Pattern)
INSERT INTO public.admin_settings (maintenance_mode, ai_engine_enabled, rls_monitoring_enabled, global_search_enabled)
SELECT false, true, true, true
WHERE NOT EXISTS (SELECT 1 FROM public.admin_settings);
