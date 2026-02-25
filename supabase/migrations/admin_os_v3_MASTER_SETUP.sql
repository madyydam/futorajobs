-- ============================================================
-- FUTURACAREER ADMIN OS V3 — MASTER SUPABASE SETUP
-- Run this in: https://supabase.com/dashboard/project/ejqcvhvbroabygbtgjjn/sql
-- ============================================================


-- ─────────────────────────────────────────
-- STEP 1 · Admin Role Column Setup
-- ─────────────────────────────────────────

-- Create role enum (safe, skips if already exists)
DO $$ BEGIN
    CREATE TYPE public.admin_role AS ENUM (
        'super_admin',
        'curriculum_admin',
        'hiring_admin',
        'support_admin'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add role columns to profiles (both 'role' text and 'user_role' enum)
-- useAuth.tsx reads BOTH, so we keep both in sync
ALTER TABLE public.profiles
    ADD COLUMN IF NOT EXISTS role        TEXT         DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS user_role   public.admin_role DEFAULT NULL;


-- ─────────────────────────────────────────
-- STEP 2 · Grant YOU Super Admin Access
-- 
-- Instructions:
--   1. Log into your app at http://localhost:5173
--   2. Open browser DevTools → Console
--   3. Run: (await import('/src/integrations/supabase/client.js')).supabase.auth.getSession()
--      OR just check Supabase Auth Logs for your user ID
--   4. Replace 'PUT-YOUR-USER-ID-HERE' below with your actual auth UID
--   5. Run this SQL
-- ─────────────────────────────────────────

-- ⚠️  HOW TO GRANT YOURSELF ADMIN:
--   1. Go to: https://supabase.com/dashboard/project/ejqcvhvbroabygbtgjjn/auth/users
--   2. Find your email → copy the UUID in the "User UID" column
--   3. Paste it below, replacing the placeholder
--   4. Uncomment the UPDATE line and run ONLY that line

-- UPDATE public.profiles
-- SET role = 'super_admin', user_role = 'super_admin'
-- WHERE user_id = 'PASTE-YOUR-UUID-HERE';   -- ← replace this, then uncomment


-- ─────────────────────────────────────────
-- STEP 3 · Verify your admin was set
-- ─────────────────────────────────────────
SELECT id, user_id, email, full_name, role, user_role
FROM public.profiles
WHERE role = 'super_admin' OR user_role = 'super_admin';


-- ─────────────────────────────────────────
-- STEP 4 · Admin Dashboard Stats View
-- ─────────────────────────────────────────
DROP VIEW IF EXISTS public.admin_dashboard_stats;
CREATE VIEW public.admin_dashboard_stats WITH (security_invoker = true) AS
SELECT
    (SELECT COUNT(*) FROM public.profiles)                                              AS total_users,
    (SELECT COUNT(*) FROM public.courses)                                               AS total_courses,
    (SELECT COUNT(*) FROM public.jobs)                                                  AS total_jobs,
    (SELECT COUNT(*) FROM public.internships)                                           AS total_internships,
    (SELECT COUNT(*) FROM public.applications)                                          AS total_applications,
    (SELECT COUNT(*) FROM public.user_projects WHERE status = 'approved')               AS approved_projects,
    (SELECT COUNT(*) FROM public.user_projects WHERE status = 'pending')                AS pending_verifications,
    (SELECT COUNT(*) FROM public.profiles WHERE created_at > now() - interval '7 days') AS new_users_week;


-- ─────────────────────────────────────────
-- STEP 5 · Row Level Security for Admin Panel
-- ─────────────────────────────────────────

-- Enable RLS on profiles (if not already)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = user_id);

-- Policy: Super Admins can read ALL profiles
DROP POLICY IF EXISTS "Super admins can view all profiles" ON public.profiles;
CREATE POLICY "Super admins can view all profiles"
    ON public.profiles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.user_id = auth.uid()
            AND (p.role = 'super_admin' OR p.user_role::TEXT = 'super_admin')
        )
    );

-- Policy: Super Admins can update any profile (for role changes)
DROP POLICY IF EXISTS "Super admins can update profiles" ON public.profiles;
CREATE POLICY "Super admins can update profiles"
    ON public.profiles FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.user_id = auth.uid()
            AND (p.role = 'super_admin' OR p.user_role::TEXT = 'super_admin')
        )
    );

-- Policy: Users can update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = user_id);



-- ─────────────────────────────────────────
-- STEP 6 · Seed Initial Career Paths (safe)
-- ─────────────────────────────────────────
INSERT INTO public.career_paths (title, description, category, difficulty, duration_weeks)
SELECT 'Full-Stack Engineer', 'Master the entire stack from UI to Infrastructure.', 'development', 'advanced', 24
WHERE NOT EXISTS (SELECT 1 FROM public.career_paths WHERE title = 'Full-Stack Engineer');

INSERT INTO public.career_paths (title, description, category, difficulty, duration_weeks)
SELECT 'Product Designer', 'Create human-centric digital experiences.', 'design', 'intermediate', 12
WHERE NOT EXISTS (SELECT 1 FROM public.career_paths WHERE title = 'Product Designer');

INSERT INTO public.career_paths (title, description, category, difficulty, duration_weeks)
SELECT 'AI Strategist', 'Harness the power of LLMs and Neural Networks.', 'ai', 'advanced', 16
WHERE NOT EXISTS (SELECT 1 FROM public.career_paths WHERE title = 'AI Strategist');


-- ─────────────────────────────────────────
-- ✅ SETUP COMPLETE
-- Admin Access URL: http://localhost:5173/admin/login
-- Supabase Dashboard: https://supabase.com/dashboard/project/ejqcvhvbroabygbtgjjn
-- ─────────────────────────────────────────
