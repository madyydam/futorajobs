-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enums
CREATE TYPE public.difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE public.application_status AS ENUM ('pending', 'reviewing', 'shortlisted', 'rejected', 'accepted');
CREATE TYPE public.content_category AS ENUM ('ai', 'development', 'design', 'growth');

-- PROFILES TABLE
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  avatar_url TEXT,
  email TEXT,
  availability TEXT DEFAULT 'Open to opportunities',
  website_url TEXT,
  github_url TEXT,
  twitter_url TEXT,
  linkedin_url TEXT,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  total_learning_days INTEGER DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SKILLS TABLE (master list)
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  category content_category NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- USER SKILLS (auto-populated from learning)
CREATE TABLE public.user_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE NOT NULL,
  level INTEGER DEFAULT 0 CHECK (level >= 0 AND level <= 100),
  courses_completed INTEGER DEFAULT 0,
  projects_completed INTEGER DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, skill_id)
);

-- CAREER PATHS
CREATE TABLE public.career_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  category content_category NOT NULL,
  difficulty difficulty_level DEFAULT 'intermediate',
  duration_weeks INTEGER DEFAULT 12,
  total_courses INTEGER DEFAULT 0,
  total_projects INTEGER DEFAULT 0,
  total_internships INTEGER DEFAULT 0,
  total_jobs INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CAREER PATH SKILLS (what skills does each path teach)
CREATE TABLE public.career_path_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  career_path_id UUID REFERENCES public.career_paths(id) ON DELETE CASCADE NOT NULL,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE NOT NULL,
  target_level INTEGER DEFAULT 50,
  UNIQUE(career_path_id, skill_id)
);

-- USER CAREER PATHS (user's chosen path)
CREATE TABLE public.user_career_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  career_path_id UUID REFERENCES public.career_paths(id) ON DELETE CASCADE NOT NULL,
  current_step TEXT DEFAULT 'learn',
  progress_percentage INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, career_path_id)
);

-- COURSES
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category content_category NOT NULL,
  difficulty difficulty_level DEFAULT 'beginner',
  duration TEXT,
  instructor_name TEXT,
  instructor_avatar TEXT,
  lessons_count INTEGER DEFAULT 0,
  unlocks_internships INTEGER DEFAULT 0,
  unlocks_jobs INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- COURSE SKILLS (what skills each course teaches)
CREATE TABLE public.course_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE NOT NULL,
  skill_points INTEGER DEFAULT 10,
  UNIQUE(course_id, skill_id)
);

-- USER COURSES (enrollment & progress)
CREATE TABLE public.user_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  progress_percentage INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, course_id)
);

-- PROJECTS
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category content_category NOT NULL,
  difficulty difficulty_level DEFAULT 'intermediate',
  duration TEXT,
  deliverables TEXT[],
  unlocks_internships INTEGER DEFAULT 0,
  unlocks_jobs INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROJECT SKILLS (required skills for project)
CREATE TABLE public.project_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE NOT NULL,
  required_level INTEGER DEFAULT 20,
  UNIQUE(project_id, skill_id)
);

-- USER PROJECTS (submissions)
CREATE TABLE public.user_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  submission_url TEXT,
  github_url TEXT,
  demo_url TEXT,
  status TEXT DEFAULT 'in_progress',
  submitted_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  UNIQUE(user_id, project_id)
);

-- INTERNSHIPS
CREATE TABLE public.internships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  company_logo TEXT,
  description TEXT,
  location TEXT,
  stipend TEXT,
  duration TEXT,
  category content_category NOT NULL,
  is_remote BOOLEAN DEFAULT TRUE,
  min_readiness_score INTEGER DEFAULT 60,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INTERNSHIP REQUIREMENTS (skills & projects needed)
CREATE TABLE public.internship_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  internship_id UUID REFERENCES public.internships(id) ON DELETE CASCADE NOT NULL,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  required_skill_level INTEGER DEFAULT 30
);

-- JOBS
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  company_logo TEXT,
  description TEXT,
  location TEXT,
  salary_range TEXT,
  experience_level TEXT,
  category content_category NOT NULL,
  is_remote BOOLEAN DEFAULT TRUE,
  min_readiness_score INTEGER DEFAULT 70,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- JOB REQUIREMENTS
CREATE TABLE public.job_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  required_skill_level INTEGER DEFAULT 50
);

-- APPLICATIONS
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  internship_id UUID REFERENCES public.internships(id) ON DELETE CASCADE,
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
  status application_status DEFAULT 'pending',
  readiness_score INTEGER,
  cover_note TEXT,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- LEARNING STREAKS (daily log)
CREATE TABLE public.learning_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
  minutes_spent INTEGER DEFAULT 0,
  courses_touched INTEGER DEFAULT 0,
  lessons_completed INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, activity_date)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_path_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_career_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internship_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_activities ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES (for catalog data)
CREATE POLICY "Skills are viewable by everyone" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Career paths are viewable by everyone" ON public.career_paths FOR SELECT USING (true);
CREATE POLICY "Career path skills are viewable by everyone" ON public.career_path_skills FOR SELECT USING (true);
CREATE POLICY "Courses are viewable by everyone" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Course skills are viewable by everyone" ON public.course_skills FOR SELECT USING (true);
CREATE POLICY "Projects are viewable by everyone" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Project skills are viewable by everyone" ON public.project_skills FOR SELECT USING (true);
CREATE POLICY "Internships are viewable by everyone" ON public.internships FOR SELECT USING (true);
CREATE POLICY "Internship requirements are viewable by everyone" ON public.internship_requirements FOR SELECT USING (true);
CREATE POLICY "Jobs are viewable by everyone" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Job requirements are viewable by everyone" ON public.job_requirements FOR SELECT USING (true);

-- USER-SPECIFIC POLICIES
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own skills" ON public.user_skills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own skills" ON public.user_skills FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own career paths" ON public.user_career_paths FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own career paths" ON public.user_career_paths FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own courses" ON public.user_courses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own courses" ON public.user_courses FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own projects" ON public.user_projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own projects" ON public.user_projects FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own applications" ON public.applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own applications" ON public.applications FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own learning activities" ON public.learning_activities FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own learning activities" ON public.learning_activities FOR ALL USING (auth.uid() = user_id);

-- FUNCTION: Update user skills when course completed
CREATE OR REPLACE FUNCTION public.update_user_skills_on_course_completion()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.completed = TRUE AND (OLD.completed IS NULL OR OLD.completed = FALSE) THEN
    -- Add skill points from course
    INSERT INTO public.user_skills (user_id, skill_id, level, courses_completed)
    SELECT NEW.user_id, cs.skill_id, cs.skill_points, 1
    FROM public.course_skills cs
    WHERE cs.course_id = NEW.course_id
    ON CONFLICT (user_id, skill_id)
    DO UPDATE SET 
      level = LEAST(100, user_skills.level + EXCLUDED.level),
      courses_completed = user_skills.courses_completed + 1,
      last_updated = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_course_completion
  AFTER INSERT OR UPDATE ON public.user_courses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_skills_on_course_completion();

-- FUNCTION: Update streak on learning activity
CREATE OR REPLACE FUNCTION public.update_learning_streak()
RETURNS TRIGGER AS $$
DECLARE
  prev_date DATE;
  current_streak INTEGER;
BEGIN
  SELECT last_activity_date, profiles.current_streak INTO prev_date, current_streak
  FROM public.profiles WHERE user_id = NEW.user_id;
  
  IF prev_date IS NULL OR NEW.activity_date - prev_date > 1 THEN
    -- Streak broken or first activity
    UPDATE public.profiles 
    SET current_streak = 1, 
        last_activity_date = NEW.activity_date,
        total_learning_days = COALESCE(total_learning_days, 0) + 1,
        updated_at = NOW()
    WHERE user_id = NEW.user_id;
  ELSIF NEW.activity_date - prev_date = 1 THEN
    -- Consecutive day
    UPDATE public.profiles 
    SET current_streak = current_streak + 1,
        longest_streak = GREATEST(COALESCE(longest_streak, 0), current_streak + 1),
        last_activity_date = NEW.activity_date,
        total_learning_days = COALESCE(total_learning_days, 0) + 1,
        updated_at = NOW()
    WHERE user_id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_learning_activity
  AFTER INSERT ON public.learning_activities
  FOR EACH ROW
  EXECUTE FUNCTION public.update_learning_streak();

-- FUNCTION: Calculate readiness score
CREATE OR REPLACE FUNCTION public.calculate_readiness_score(
  p_user_id UUID,
  p_internship_id UUID DEFAULT NULL,
  p_job_id UUID DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
  total_requirements INTEGER := 0;
  met_requirements INTEGER := 0;
  req RECORD;
BEGIN
  -- Get requirements based on internship or job
  FOR req IN 
    SELECT ir.skill_id, ir.project_id, ir.required_skill_level
    FROM public.internship_requirements ir
    WHERE ir.internship_id = p_internship_id
    UNION ALL
    SELECT jr.skill_id, jr.project_id, jr.required_skill_level
    FROM public.job_requirements jr
    WHERE jr.job_id = p_job_id
  LOOP
    total_requirements := total_requirements + 1;
    
    -- Check skill requirement
    IF req.skill_id IS NOT NULL THEN
      IF EXISTS (
        SELECT 1 FROM public.user_skills us
        WHERE us.user_id = p_user_id 
        AND us.skill_id = req.skill_id 
        AND us.level >= req.required_skill_level
      ) THEN
        met_requirements := met_requirements + 1;
      END IF;
    END IF;
    
    -- Check project requirement
    IF req.project_id IS NOT NULL THEN
      IF EXISTS (
        SELECT 1 FROM public.user_projects up
        WHERE up.user_id = p_user_id 
        AND up.project_id = req.project_id 
        AND up.status = 'approved'
      ) THEN
        met_requirements := met_requirements + 1;
      END IF;
    END IF;
  END LOOP;
  
  IF total_requirements = 0 THEN
    RETURN 100;
  END IF;
  
  RETURN (met_requirements * 100) / total_requirements;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- FUNCTION: Check if internship is unlocked
CREATE OR REPLACE FUNCTION public.is_internship_unlocked(p_user_id UUID, p_internship_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN public.calculate_readiness_score(p_user_id, p_internship_id, NULL) >= 
    (SELECT min_readiness_score FROM public.internships WHERE id = p_internship_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Updated at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();