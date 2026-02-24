-- Startup Community & Ecosystem Schema

-- Communities/Groups
CREATE TABLE startup_communities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT DEFAULT 'Globe',
    tags TEXT[],
    activity_level TEXT DEFAULT 'Normal',
    color_theme TEXT, -- Store tailwind classes or hex
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Startups (for matching)
CREATE TABLE startups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    sector TEXT,
    required_skills TEXT[],
    hiring_roles TEXT[],
    legal_status TEXT DEFAULT 'Seed Funded, Compliant',
    match_score_base INTEGER DEFAULT 0,
    logo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Community Memberships
CREATE TABLE community_memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    community_id UUID REFERENCES startup_communities(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, community_id)
);

-- Enable RLS
ALTER TABLE startup_communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_memberships ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Startup communities are viewable by everyone" ON startup_communities FOR SELECT USING (true);
CREATE POLICY "Startups are viewable by everyone" ON startups FOR SELECT USING (true);
CREATE POLICY "Users can view their own memberships" ON community_memberships FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can join communities" ON community_memberships FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Sample Communities
INSERT INTO startup_communities (name, slug, description, tags, activity_level, color_theme) VALUES
('AI & GenAI Builders', 'ai-builders', 'A community for engineers building the next generation of AI products in Pune.', ARRAY['AI', 'Python', 'LLMs'], 'High', 'from-blue-500/20 to-cyan-500/20'),
('SaaS Scaling Pune', 'saas-scaling', 'Venture-backed founders and early employees sharing scaling strategies.', ARRAY['SaaS', 'Growth', 'B2B'], 'Moderate', 'from-emerald-500/20 to-teal-500/20'),
('Web3 & Blockchain', 'web3-pune', 'Exploring decentralized tech, smart contracts, and the future of Pune tech.', ARRAY['Web3', 'Solidity', 'Rust'], 'Growing', 'from-purple-500/20 to-indigo-500/20');

-- Sample Startups
INSERT INTO startups (name, description, sector, required_skills, hiring_roles, legal_status) VALUES
('Neural Nexus AI', 'Building autonomous agents for supply chain optimization.', 'Artificial Intelligence', ARRAY['Python', 'React', 'Problem Solving'], ARRAY['Junior Builder', 'AI Engineer'], 'Seed Funded, Compliant'),
('DevStream Pune', 'Developer experience platform for distributed teams.', 'DevTools', ARRAY['TypeScript', 'Next.js', 'PostgreSQL'], ARRAY['Frontend Developer'], 'Series A, Compliant'),
('GreenStack', 'Eco-friendly cloud hosting solutions for sustainable startups.', 'SaaS', ARRAY['Go', 'Kubernetes', 'AWS'], ARRAY['DevOps Engineer'], 'Angel Funded, Compliant');
