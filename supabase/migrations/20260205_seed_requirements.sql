-- 1. SEED COURSE SKILLS (Mapping courses to skills they provide)
-- Skill Points match the values used in the update_user_skills_on_course_completion function

-- AI Fundamentals with Python -> Python
INSERT INTO public.course_skills (course_id, skill_id, skill_points)
SELECT c.id, s.id, 20
FROM public.courses c, public.skills s
WHERE c.title = 'AI Fundamentals with Python' AND s.name = 'Python'
ON CONFLICT DO NOTHING;

-- Building LLM Applications -> LLMs, RAG
INSERT INTO public.course_skills (course_id, skill_id, skill_points)
SELECT c.id, s.id, 25
FROM public.courses c, public.skills s
WHERE c.title = 'Building LLM Applications' AND s.name IN ('LLMs', 'RAG')
ON CONFLICT DO NOTHING;

-- Prompt Engineering Mastery -> Prompt Engineering
INSERT INTO public.course_skills (course_id, skill_id, skill_points)
SELECT c.id, s.id, 30
FROM public.courses c, public.skills s
WHERE c.title = 'Prompt Engineering Mastery' AND s.name = 'Prompt Engineering'
ON CONFLICT DO NOTHING;

-- React & TypeScript Complete -> React, TypeScript
INSERT INTO public.course_skills (course_id, skill_id, skill_points)
SELECT c.id, s.id, 25
FROM public.courses c, public.skills s
WHERE c.title = 'React & TypeScript Complete' AND s.name IN ('React', 'TypeScript')
ON CONFLICT DO NOTHING;

-- Full-Stack with Node.js -> Node.js, PostgreSQL
INSERT INTO public.course_skills (course_id, skill_id, skill_points)
SELECT c.id, s.id, 25
FROM public.courses c, public.skills s
WHERE c.title = 'Full-Stack with Node.js' AND s.name IN ('Node.js', 'PostgreSQL')
ON CONFLICT DO NOTHING;


-- 2. SEED INTERNSHIP REQUIREMENTS (What's needed to unlock)

-- AI Research Intern -> Needs Python (30) and AI Fundamentals Course (implied by skill)
INSERT INTO public.internship_requirements (internship_id, skill_id, required_skill_level)
SELECT i.id, s.id, 40
FROM public.internships i, public.skills s
WHERE i.title = 'AI Research Intern' AND s.name = 'Python'
ON CONFLICT DO NOTHING;

-- Frontend Developer Intern -> Needs React (30)
INSERT INTO public.internship_requirements (internship_id, skill_id, required_skill_level)
SELECT i.id, s.id, 35
FROM public.internships i, public.skills s
WHERE i.title = 'Frontend Developer Intern' AND s.name = 'React'
ON CONFLICT DO NOTHING;

-- Full-Stack Intern -> Needs React (20) and Node.js (20)
INSERT INTO public.internship_requirements (internship_id, skill_id, required_skill_level)
SELECT i.id, s.id, 25
FROM public.internships i, public.skills s
WHERE i.title = 'Full-Stack Intern' AND s.name IN ('React', 'Node.js')
ON CONFLICT DO NOTHING;


-- 3. SEED JOB REQUIREMENTS (What's needed to apply)

-- AI Engineer (Job) -> Needs Python (60), LLMs (50), RAG (40)
INSERT INTO public.job_requirements (job_id, skill_id, required_skill_level)
SELECT j.id, s.id, 60
FROM public.jobs j, public.skills s
WHERE j.title = 'AI Engineer' AND s.name = 'Python'
UNION ALL
SELECT j.id, s.id, 50
FROM public.jobs j, public.skills s
WHERE j.title = 'AI Engineer' AND s.name = 'LLMs'
ON CONFLICT DO NOTHING;

-- Full-Stack Developer (Job) -> Needs React (60), Node.js (60), PostgreSQL (50)
INSERT INTO public.job_requirements (job_id, skill_id, required_skill_level)
SELECT j.id, s.id, 60
FROM public.jobs j, public.skills s
WHERE j.title = 'Full-Stack Developer' AND s.name = 'React'
UNION ALL
SELECT j.id, s.id, 60
FROM public.jobs j, public.skills s
WHERE j.title = 'Full-Stack Developer' AND s.name = 'Node.js'
ON CONFLICT DO NOTHING;


-- 4. TRIGGER: Update user skills when project approved
CREATE OR REPLACE FUNCTION public.update_user_skills_on_project_approval()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved') THEN
    -- Add skill points from project (standard 30 points per required skill)
    INSERT INTO public.user_skills (user_id, skill_id, level, projects_completed)
    SELECT NEW.user_id, ps.skill_id, 30, 1
    FROM public.project_skills ps
    WHERE ps.project_id = NEW.project_id
    ON CONFLICT (user_id, skill_id)
    DO UPDATE SET 
      level = LEAST(100, user_skills.level + EXCLUDED.level),
      projects_completed = user_skills.projects_completed + 1,
      last_updated = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_project_approval
  AFTER INSERT OR UPDATE ON public.user_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_skills_on_project_approval();
