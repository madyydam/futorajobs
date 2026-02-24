-- Video Learning Hub Schema

-- Categories for structured learning
CREATE TABLE learning_video_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Core Video Courses
CREATE TABLE learning_video_courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES learning_video_categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    difficulty TEXT CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
    duration TEXT, -- e.g., "2h 30m"
    instructor_name TEXT,
    thumbnail_url TEXT,
    video_url TEXT NOT NULL, -- YouTube ID or Full Link
    source_platform TEXT DEFAULT 'YouTube',
    is_external BOOLEAN DEFAULT TRUE,
    total_views INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 4.5,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Progress Tracking
CREATE TABLE learning_video_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES learning_video_courses(id) ON DELETE CASCADE,
    progress_percent INTEGER DEFAULT 0,
    status TEXT CHECK (status IN ('started', 'completed')) DEFAULT 'started',
    last_watched_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    UNIQUE(user_id, course_id)
);

-- User Bookmarks
CREATE TABLE learning_video_bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES learning_video_courses(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE learning_video_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_video_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_video_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_video_bookmarks ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public categories are viewable by everyone" ON learning_video_categories FOR SELECT USING (true);
CREATE POLICY "Public courses are viewable by everyone" ON learning_video_courses FOR SELECT USING (true);

CREATE POLICY "Users can view their own progress" ON learning_video_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON learning_video_progress FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own bookmarks" ON learning_video_bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own bookmarks" ON learning_video_bookmarks FOR ALL USING (auth.uid() = user_id);

-- Sample Data
INSERT INTO learning_video_categories (name, slug, icon, description) VALUES
('AI & Machine Learning', 'ai-ml', 'Sparkles', 'Master GenAI, LLMs, and Python for Data Science'),
('Web Development', 'web-dev', 'Code', 'Modern Fullstack development with React, Next.js, and Node'),
('UI/UX Design', 'ui-ux', 'Palette', 'Design beautiful interfaces and seamless user experiences'),
('App Development', 'app-dev', 'Smartphone', 'Build mobile apps for iOS and Android with Flutter and React Native'),
('Marketing', 'marketing', 'TrendingUp', 'Growth hacking, SEO, and Digital Marketing strategies'),
('Data Science', 'data-science', 'BarChart3', 'Analyze complex data and build predictive models'),
('Content Creation', 'content', 'Video', 'Master video editing, storytelling, and social media growth'),
('DevOps', 'devops', 'Terminal', 'Automate deployments and manage cloud infrastructure');


-- Sample Courses (Real YouTube links provided by user)
INSERT INTO learning_video_courses (category_id, title, description, difficulty, duration, instructor_name, thumbnail_url, video_url) VALUES
((SELECT id FROM learning_video_categories WHERE slug='ui-ux'), 'UI/UX Design Masterclass', 'Comprehensive guide to modern interface design and user experience principles.', 'Beginner', '12h 45m', 'King Sidharth', 'https://img.youtube.com/vi/ajdRvxDWH4w/maxresdefault.jpg', 'https://youtu.be/ajdRvxDWH4w'),
((SELECT id FROM learning_video_categories WHERE slug='web-dev'), 'Web Development Bootcamp', 'The complete frontend web development journey from zero to hero.', 'Beginner', '25h', 'Chai aur Code', 'https://img.youtube.com/vi/Zg4-uSjxosE/maxresdefault.jpg', 'https://youtu.be/Zg4-uSjxosE'),
((SELECT id FROM learning_video_categories WHERE slug='web-dev'), 'Backend Engineering Path', 'Master server-side logic, databases, and API development.', 'Intermediate', '20h', 'Chai aur Code', 'https://img.youtube.com/vi/gFWhbjzowrM/maxresdefault.jpg', 'https://youtu.be/gFWhbjzowrM'),
((SELECT id FROM learning_video_categories WHERE slug='ai-ml'), 'Prompt Engineering Guide', 'Learn the art of communicating with AI models effectively.', 'Beginner', '5h', 'Hitesh Choudhary', 'https://img.youtube.com/vi/P0XMXqDGttU/maxresdefault.jpg', 'https://youtu.be/P0XMXqDGttU'),
((SELECT id FROM learning_video_categories WHERE slug='app-dev'), 'Flutter App Development', 'Build cross-platform mobile applications for iOS and Android.', 'Intermediate', '15h', 'Hitesh Choudhary', 'https://img.youtube.com/vi/7zcXPCt8Ck0/maxresdefault.jpg', 'https://youtu.be/7zcXPCt8Ck0'),
((SELECT id FROM learning_video_categories WHERE slug='data-science'), 'Data Science Roadmap', 'Detailed path to becoming a data scientist in the modern age.', 'Beginner', '10h', 'Krish Naik', 'https://img.youtube.com/vi/fXAGTOZ25H8/maxresdefault.jpg', 'https://youtu.be/fXAGTOZ25H8');

