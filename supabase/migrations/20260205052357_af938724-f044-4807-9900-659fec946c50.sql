-- SEED SKILLS
INSERT INTO public.skills (name, category, description, icon) VALUES
('Python', 'ai', 'Core programming language for AI/ML', 'code'),
('Machine Learning', 'ai', 'Building predictive models', 'brain'),
('LLMs', 'ai', 'Large Language Model development', 'message-square'),
('Prompt Engineering', 'ai', 'Crafting effective AI prompts', 'wand'),
('RAG', 'ai', 'Retrieval Augmented Generation', 'database'),
('React', 'development', 'Modern frontend framework', 'code'),
('TypeScript', 'development', 'Type-safe JavaScript', 'file-code'),
('Node.js', 'development', 'Server-side JavaScript runtime', 'server'),
('PostgreSQL', 'development', 'Relational database', 'database'),
('APIs', 'development', 'Building and consuming APIs', 'link'),
('Figma', 'design', 'Design and prototyping tool', 'pen-tool'),
('User Research', 'design', 'Understanding user needs', 'users'),
('Prototyping', 'design', 'Interactive design mockups', 'layers'),
('Design Systems', 'design', 'Scalable design components', 'layout'),
('Accessibility', 'design', 'Inclusive design practices', 'eye'),
('SEO', 'growth', 'Search engine optimization', 'search'),
('Content Marketing', 'growth', 'Strategic content creation', 'file-text'),
('Analytics', 'growth', 'Data-driven decision making', 'bar-chart'),
('Social Media', 'growth', 'Platform growth strategies', 'share-2'),
('Paid Ads', 'growth', 'Advertising campaign management', 'dollar-sign');

-- SEED CAREER PATHS
INSERT INTO public.career_paths (title, description, icon, category, difficulty, duration_weeks, total_courses, total_projects, total_internships, total_jobs) VALUES
('AI Engineer', 'Build AI agents, fine-tune models, and deploy production AI systems.', 'brain', 'ai', 'advanced', 12, 5, 3, 8, 12),
('Full-Stack Developer', 'Master frontend, backend, and databases to build complete applications.', 'code', 'development', 'intermediate', 14, 6, 4, 10, 15),
('UI/UX Designer', 'Create beautiful, user-centered designs that solve real problems.', 'palette', 'design', 'beginner', 10, 4, 3, 6, 8),
('Growth Marketer', 'Drive user acquisition, retention, and revenue through data-driven strategies.', 'trending-up', 'growth', 'beginner', 8, 4, 2, 7, 10);

-- SEED COURSES
INSERT INTO public.courses (title, description, category, difficulty, duration, instructor_name, lessons_count, unlocks_internships, unlocks_jobs) VALUES
('AI Fundamentals with Python', 'Learn the foundations of artificial intelligence using Python', 'ai', 'beginner', '4 weeks', 'Dr. Sarah Chen', 24, 3, 4),
('Building LLM Applications', 'Create production-ready applications powered by large language models', 'ai', 'intermediate', '6 weeks', 'Alex Kumar', 32, 5, 6),
('Prompt Engineering Mastery', 'Master the art of crafting effective prompts for AI systems', 'ai', 'beginner', '2 weeks', 'Maya Johnson', 16, 4, 5),
('React & TypeScript Complete', 'Build modern web applications with React and TypeScript', 'development', 'intermediate', '8 weeks', 'David Park', 48, 6, 8),
('Full-Stack with Node.js', 'Create complete applications with Node.js and PostgreSQL', 'development', 'intermediate', '6 weeks', 'Lisa Wong', 36, 5, 7),
('UI Design Foundations', 'Learn the principles of beautiful, functional interface design', 'design', 'beginner', '4 weeks', 'Emma Garcia', 20, 3, 4),
('UX Research Methods', 'Master user research techniques for product design', 'design', 'intermediate', '3 weeks', 'James Miller', 18, 4, 5),
('Growth Hacking 101', 'Learn rapid experimentation techniques for startup growth', 'growth', 'beginner', '3 weeks', 'Nina Patel', 15, 4, 6),
('SEO & Content Strategy', 'Drive organic traffic through strategic content creation', 'growth', 'beginner', '4 weeks', 'Mark Thompson', 22, 3, 5);

-- SEED PROJECTS
INSERT INTO public.projects (title, description, category, difficulty, duration, deliverables, unlocks_internships, unlocks_jobs) VALUES
('AI Chatbot for Customer Support', 'Build a conversational AI bot using LLMs that can handle customer queries', 'ai', 'intermediate', '2 weeks', ARRAY['Live demo', 'GitHub repo', 'Documentation'], 4, 6),
('Full-Stack Task Manager', 'Create a complete task management app with auth, CRUD, and real-time updates', 'development', 'intermediate', '3 weeks', ARRAY['Live app', 'GitHub repo', 'API docs'], 5, 8),
('Mobile App Redesign', 'Redesign an existing mobile app with improved UX and modern design system', 'design', 'beginner', '1 week', ARRAY['Figma file', 'Prototype', 'Case study'], 3, 4),
('SEO Audit & Strategy', 'Perform a complete SEO audit and create an actionable growth strategy', 'growth', 'beginner', '1 week', ARRAY['Audit report', 'Strategy doc', 'Implementation plan'], 3, 5),
('AI-Powered Content Generator', 'Build a tool that generates marketing content using AI models', 'ai', 'advanced', '2 weeks', ARRAY['Live tool', 'GitHub repo', 'Usage docs'], 6, 8),
('Portfolio Website', 'Design and build a personal portfolio showcasing your best work', 'development', 'beginner', '1 week', ARRAY['Live website', 'GitHub repo'], 4, 6);

-- SEED INTERNSHIPS
INSERT INTO public.internships (title, company, description, location, stipend, duration, category, is_remote, min_readiness_score) VALUES
('AI Research Intern', 'Futora AI', 'Work on cutting-edge AI research and model development', 'Remote', '₹25,000/month', '3 months', 'ai', true, 60),
('ML Engineering Intern', 'TechVentures', 'Build and deploy machine learning pipelines', 'Bangalore', '₹30,000/month', '6 months', 'ai', false, 65),
('Frontend Developer Intern', 'BuildersHQ', 'Create beautiful React applications for our products', 'Remote', '₹20,000/month', '3 months', 'development', true, 55),
('Full-Stack Intern', 'StartupFlow', 'Work across the entire stack on real products', 'Mumbai', '₹28,000/month', '4 months', 'development', false, 60),
('Product Design Intern', 'Nexus Studio', 'Design user experiences for mobile and web products', 'Remote', '₹22,000/month', '3 months', 'design', true, 50),
('UX Research Intern', 'DesignLab', 'Conduct user research and usability testing', 'Delhi', '₹18,000/month', '3 months', 'design', false, 55),
('Growth Marketing Intern', 'GrowthEngine', 'Drive user acquisition through creative experiments', 'Remote', '₹15,000/month', '3 months', 'growth', true, 45),
('Content & SEO Intern', 'MediaFirst', 'Create content strategies and optimize for search', 'Remote', '₹12,000/month', '2 months', 'growth', true, 40);

-- SEED JOBS
INSERT INTO public.jobs (title, company, description, location, salary_range, experience_level, category, is_remote, min_readiness_score) VALUES
('AI Engineer', 'Futora AI', 'Build production AI systems and LLM applications', 'Remote', '₹18-30 LPA', '1-3 years', 'ai', true, 75),
('Senior ML Engineer', 'DataMinds', 'Lead ML infrastructure and model deployment', 'Bangalore', '₹30-50 LPA', '3-5 years', 'ai', false, 85),
('Full-Stack Developer', 'BuildersHQ', 'Build and scale web applications end-to-end', 'Remote', '₹12-20 LPA', '1-2 years', 'development', true, 70),
('React Developer', 'TechStack', 'Create modern frontend experiences with React', 'Mumbai', '₹10-18 LPA', '1-3 years', 'development', false, 65),
('Backend Engineer', 'CloudScale', 'Design and build scalable backend systems', 'Hyderabad', '₹15-25 LPA', '2-4 years', 'development', false, 75),
('Product Designer', 'Nexus Studio', 'Design beautiful, user-centered products', 'Remote', '₹12-22 LPA', '1-3 years', 'design', true, 70),
('UX Designer', 'UserFirst', 'Create seamless user experiences through research', 'Bangalore', '₹10-18 LPA', '1-2 years', 'design', false, 65),
('Growth Lead', 'GrowthEngine', 'Drive company growth through data-driven strategies', 'Remote', '₹15-28 LPA', '2-4 years', 'growth', true, 75),
('Content Strategist', 'MediaFirst', 'Lead content strategy and SEO initiatives', 'Delhi', '₹8-15 LPA', '1-3 years', 'growth', false, 60);