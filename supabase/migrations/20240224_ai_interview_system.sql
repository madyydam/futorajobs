
-- AI Interview Simulation System Schema

-- Enum for Interview Status
DO $$ BEGIN
    CREATE TYPE interview_status AS ENUM ('draft', 'ongoing', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Enum for Round Status
DO $$ BEGIN
    CREATE TYPE round_status AS ENUM ('upcoming', 'active', 'completed', 'skipped');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. Interview Sessions Tablet
CREATE TABLE IF NOT EXISTS interview_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    status interview_status DEFAULT 'draft',
    total_score DECIMAL(5,2),
    overall_feedback TEXT,
    readiness_impact DECIMAL(5,2),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 2. Interview Rounds Table
CREATE TABLE IF NOT EXISTS interview_rounds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES interview_sessions(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    label TEXT NOT NULL,
    description TEXT,
    status round_status DEFAULT 'upcoming',
    round_order INT NOT NULL,
    score DECIMAL(5,2),
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Interview Questions & Responses Table
CREATE TABLE IF NOT EXISTS interview_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    round_id UUID REFERENCES interview_rounds(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    expected_answer TEXT,
    code_template TEXT,
    user_answer TEXT,
    user_code TEXT,
    evaluation JSONB, -- Stores {score, feedback, strengths, weaknesses, metrics}
    follow_up_to UUID REFERENCES interview_questions(id),
    is_follow_up BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. User Readiness/Skills Impact (Historical)
CREATE TABLE IF NOT EXISTS interview_performance_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES interview_sessions(id) ON DELETE CASCADE,
    metric_name TEXT NOT NULL, -- 'coding', 'communication', 'technical', etc.
    score DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE interview_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_performance_logs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own interview sessions"
    ON interview_sessions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own interview sessions"
    ON interview_sessions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own interview sessions"
    ON interview_sessions FOR UPDATE
    USING (auth.uid() = user_id);

-- Apply similar policies to child tables
CREATE POLICY "Users can view their own rounds"
    ON interview_rounds FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM interview_sessions 
        WHERE id = session_id AND user_id = auth.uid()
    ));

CREATE POLICY "Users can view their own questions"
    ON interview_questions FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM interview_rounds r
        JOIN interview_sessions s ON s.id = r.session_id
        WHERE r.id = round_id AND s.user_id = auth.uid()
    ));

-- Indices for performance
CREATE INDEX idx_interview_sessions_user_id ON interview_sessions(user_id);
CREATE INDEX idx_interview_rounds_session_id ON interview_rounds(session_id);
CREATE INDEX idx_interview_questions_round_id ON interview_questions(round_id);
