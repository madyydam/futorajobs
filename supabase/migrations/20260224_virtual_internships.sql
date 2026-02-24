-- Virtual Internships / Task-based Internships Schema

-- 1. Update internships table
ALTER TABLE public.internships ADD COLUMN IF NOT EXISTS is_virtual BOOLEAN DEFAULT FALSE;
ALTER TABLE public.internships ADD COLUMN IF NOT EXISTS tasks JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.internships ADD COLUMN IF NOT EXISTS certificate_template JSONB DEFAULT '{}'::jsonb;

-- 2. Create user_certificates table
CREATE TABLE IF NOT EXISTS public.user_certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    internship_id UUID REFERENCES public.internships(id) ON DELETE CASCADE,
    certificate_url TEXT,
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    UNIQUE(user_id, internship_id)
);

-- 3. Create task_submissions table (to track progress on virtual internships)
CREATE TABLE IF NOT EXISTS public.task_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    internship_id UUID NOT NULL REFERENCES public.internships(id) ON DELETE CASCADE,
    task_index INTEGER NOT NULL,
    submission_content TEXT,
    submission_url TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, internship_id, task_index)
);

-- 4. Enable RLS
ALTER TABLE public.user_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_submissions ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
CREATE POLICY "Users can view their own certificates" ON public.user_certificates
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own submissions" ON public.task_submissions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create submissions" ON public.task_submissions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own submissions" ON public.task_submissions
    FOR UPDATE USING (auth.uid() = user_id);

-- 6. Seed some Virtual Internships
INSERT INTO public.internships (title, company, description, category, is_remote, is_virtual, tasks, certificate_template)
VALUES 
(
    'AI Prompt Engineering Virtual Intern', 
    'Futora AI', 
    'Complete a series of high-level prompt engineering tasks to earn an industry-recognized certificate.', 
    'ai', 
    true, 
    true,
    '[
        {"title": "Creative Storytelling", "description": "Create a 500-word story using a specific AI persona."},
        {"title": "Code Optimization", "description": "Prompt an AI to refactor a complex Python script."},
        {"title": "Ad Copy Generation", "description": "Generate 10 variants of high-converting ad copy for a SaaS product."}
    ]'::jsonb,
    '{"title": "Certified Prompt Engineer", "issuer": "Futora Academy"}'::jsonb
),
(
    'UI/UX Micro-Internship (Web Dashboard)', 
    'DesignFlow', 
    'Task-based internship focusing on dashboard wireframing and prototyping.', 
    'design', 
    true, 
    true,
    '[
        {"title": "User Flow Mapping", "description": "Map the user flow for a fintech dashboard."},
        {"title": "Mid-Fidelity Wireframes", "description": "Create wireframes for the main dashboard and settings page."},
        {"title": "Interactive Prototype", "description": "Build a clickable prototype showing the main navigation flow."}
    ]'::jsonb,
    '{"title": "UI Design Excellence Certification", "issuer": "DesignFlow Agency"}'::jsonb
)
ON CONFLICT DO NOTHING;
