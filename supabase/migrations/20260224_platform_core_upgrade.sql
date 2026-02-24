-- AI Platform Core Upgrade: Levels, XP, and Enhanced Readiness

-- 1. Upgrade Profiles with Gamification
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS level INTEGER DEFAULT 1;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS xp INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS total_points INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- 2. Upgrade User Skills with Verification
ALTER TABLE public.user_skills ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE public.user_skills ADD COLUMN IF NOT EXISTS verification_score INTEGER DEFAULT 0;

-- 3. Enhanced Global Readiness Function
-- This calculates a user's readiness across different domains (AI, Frontend, Startup-Ready)
CREATE OR REPLACE FUNCTION public.calculate_domain_readiness(
    p_user_id UUID,
    p_domain TEXT -- 'frontend', 'ai', 'startup', 'general'
)
RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
    skill_points INTEGER := 0;
    project_points INTEGER := 0;
    activity_points INTEGER := 0;
    freelance_points INTEGER := 0;
BEGIN
    -- 1. Skill Points (Domain Specific)
    SELECT COALESCE(SUM(level), 0) INTO skill_points
    FROM public.user_skills us
    JOIN public.skills s ON us.skill_id = s.id
    WHERE us.user_id = p_user_id
    AND (p_domain = 'general' OR s.category::text = p_domain);

    -- 2. Project Points
    SELECT COALESCE(COUNT(*) * 20, 0) INTO project_points
    FROM public.user_projects
    WHERE user_id = p_user_id AND status = 'approved';

    -- 3. Learning Activity (Recently active)
    SELECT COALESCE(SUM(minutes_spent) / 10, 0) INTO activity_points
    FROM public.learning_activities
    WHERE user_id = p_user_id AND activity_date > (CURRENT_DATE - INTERVAL '30 days');

    -- 4. Freelance Experience (If any)
    IF p_domain = 'startup' THEN
        SELECT COALESCE(COUNT(*) * 15, 0) INTO freelance_points
        FROM public.freelance_orders
        WHERE (client_id = p_user_id OR freelancer_id IN (SELECT id FROM public.freelancer_profiles WHERE user_id = p_user_id))
        AND status = 'completed';
    END IF;

    -- Aggregate (capped at 100)
    score := LEAST(100, (skill_points / 5) + project_points + activity_points + freelance_points);
    
    RETURN score;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 4. AI Career Copilot Suggestions Table
CREATE TABLE IF NOT EXISTS public.ai_suggestions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'roadmap', 'skill_gap', 'next_step', 'resume_tip'
    content JSONB NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Enable RLS on AI Suggestions
ALTER TABLE public.ai_suggestions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own suggestions" ON public.ai_suggestions
    FOR SELECT USING (auth.uid() = user_id);

-- 6. Seed some AI insights logic (simplified as a function for now)
CREATE OR REPLACE FUNCTION public.generate_ai_insight(p_user_id UUID)
RETURNS VOID AS $$
BEGIN
    -- This would normally be triggered by an edge function or worker, 
    -- but we can seed some defaults for current active users.
    INSERT INTO public.ai_suggestions (user_id, type, content)
    SELECT 
        p_user_id,
        'next_step',
        '{"title": "Career Boost", "message": "You are 82% ready for Frontend Internships. Build 1 more project to reach 90%."}'::jsonb
    ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
