-- Admin OS Setup & Role Elevation Protocol
-- Run this in Supabase SQL Editor to ensure full administrative control

-- 1. Create Admin Role Enum if not exists
DO $$ BEGIN
    CREATE TYPE public.admin_role AS ENUM ('super_admin', 'curriculum_admin', 'hiring_admin', 'support_admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Add admin_role to profiles if missing
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS user_role public.admin_role DEFAULT NULL;

-- 3. Create high-fidelity admin stats view with security_invoker = true
-- This provides real-time signal data for the Dashboard 2.0
CREATE OR REPLACE VIEW public.admin_dashboard_stats WITH (security_invoker = true) AS
SELECT 
    (SELECT count(*) FROM public.profiles) as total_users,
    (SELECT count(*) FROM public.courses) as total_courses,
    (SELECT count(*) FROM public.jobs WHERE created_at > now() - interval '7 days') as new_jobs_week,
    (SELECT count(*) FROM public.user_projects WHERE status = 'pending') as pending_verifications;

-- 4. Set Initial Admin (Manual Override)
-- Replace 'YOUR_USER_ID' with your actual Supabase auth.uid() to gain full access
-- UPDATE public.profiles SET user_role = 'super_admin' WHERE user_id = 'YOUR_USER_ID';

-- 5. Seed initial Career Trajectories if empty
INSERT INTO public.career_paths (title, description, category, difficulty, duration_weeks)
SELECT 'Full-Stack Engineer', 'Master the entire stack from UI to Infrastructure.', 'development', 'advanced', 24
WHERE NOT EXISTS (SELECT 1 FROM public.career_paths WHERE title = 'Full-Stack Engineer');

INSERT INTO public.career_paths (title, description, category, difficulty, duration_weeks)
SELECT 'Product Designer', 'Create human-centric digital experiences.', 'design', 'intermediate', 12
WHERE NOT EXISTS (SELECT 1 FROM public.career_paths WHERE title = 'Product Designer');

INSERT INTO public.career_paths (title, description, category, difficulty, duration_weeks)
SELECT 'AI Strategist', 'Harness the power of LLMs and Neural Networks.', 'ai', 'advanced', 16
WHERE NOT EXISTS (SELECT 1 FROM public.career_paths WHERE title = 'AI Strategist');
