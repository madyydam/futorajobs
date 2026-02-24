-- Tech Events & Hackathons Schema
CREATE TABLE IF NOT EXISTS public.tech_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    event_type TEXT NOT NULL, -- 'hackathon', 'conference', 'workshop', 'meetup'
    organizer TEXT NOT NULL,
    location TEXT NOT NULL, -- 'Online' or City Name
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    registration_deadline TIMESTAMP WITH TIME ZONE,
    registration_url TEXT,
    banner_url TEXT,
    tags TEXT[] DEFAULT '{}',
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.tech_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view tech events" ON public.tech_events FOR SELECT USING (true);

-- Seed more initial hackathons and events
INSERT INTO public.tech_events (title, description, event_type, organizer, location, start_date, registration_deadline, registration_url, tags, is_featured)
VALUES 
('Smart India Hackathon 2026', 'The worlds biggest open innovation model which provides students with a platform to solve some of the pressing problems we face in our daily lives.', 'hackathon', 'Government of India', 'Pan India', '2026-08-15 09:00:00+00', '2026-07-30 23:59:59+00', 'https://sih.gov.in', ARRAY['GovTech', 'Innovation', 'Nation-wide'], true),
('Builder’s Monsoon Hack', 'A 48-hour intense coding sprint for building AI-first SaaS products. Top teams get equity and incubation offers.', 'hackathon', 'Futora Labs', 'Pune / Hybrid', '2026-04-10 10:00:00+00', '2026-04-05 23:59:59+00', '/apply/hackathon/monsoon-hack', ARRAY['AI', 'SaaS', 'Equity'], true),
('India Blockchain Week 2026', 'The premier web3 conference in India featuring global leaders, developers, and founders shaping the future of decentralized tech.', 'conference', 'IBW DAO', 'Bangalore', '2026-11-05 10:00:00+00', '2026-10-25 23:59:59+00', 'https://indiablockchainweek.com', ARRAY['Web3', 'Blockchain', 'Bangalore'], true),
('Google I/O Extended Delhi', 'Join local developers for an overview of the latest news and technology from Google I/O. Demo pits and networking sessions included.', 'workshop', 'GDG New Delhi', 'NCR / Hybrid', '2026-06-20 09:30:00+00', '2026-06-15 23:59:59+00', 'https://gdg.community.dev', ARRAY['Google', 'Cloud', 'AI'], false),
('Unstop Ignite Challenge', 'A pan-India competition for engineering students to solve real-world industry case studies and win pre-placement interviews.', 'hackathon', 'Unstop', 'Online', '2026-05-12 10:00:00+00', '2026-05-01 23:59:59+00', 'https://unstop.com', ARRAY['Case Study', 'Engineering', 'Placement'], false),
('Elite AI Dev Meetup', 'Private gathering for top 1% AI builders to discuss LLM optimization and multi-agent systems over coffee and high-speed internet.', 'meetup', 'Futora Elite', 'Mumbai', '2026-03-25 18:00:00+00', '2026-03-24 23:59:59+00', '/events/ai-meetup', ARRAY['AI', 'Networking', 'Elite'], true);

-- Seed an AI notification for the first user
INSERT INTO public.ai_suggestions (user_id, type, content)
SELECT id, 'next_step', '{"title": "Hackathon Alert: SIH 2026", "message": "Smart India Hackathon registrations are now open. This is a prime opportunity to build your portfolio and gain national recognition.", "actionLabel": "View Event", "actionUrl": "/events"}'::jsonb
FROM auth.users
LIMIT 1;
