-- Freelance Marketplace Schema

-- 1. Create Freelancer Profiles
CREATE TABLE IF NOT EXISTS public.freelancer_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    tagline TEXT,
    bio TEXT,
    hourly_rate NUMERIC DEFAULT 0,
    experience_years INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    portfolio_urls TEXT[] DEFAULT '{}',
    skills TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

-- 2. Create Freelance Categories
CREATE TABLE IF NOT EXISTS public.freelance_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Freelance Services (Gigs)
CREATE TABLE IF NOT EXISTS public.freelance_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    freelancer_id UUID NOT NULL REFERENCES public.freelancer_profiles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.freelance_categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC NOT NULL,
    price_type TEXT DEFAULT 'fixed', -- 'fixed' or 'hourly'
    delivery_time TEXT,
    portfolio_urls TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Freelance Orders
CREATE TABLE IF NOT EXISTS public.freelance_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES public.freelance_services(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    freelancer_id UUID NOT NULL REFERENCES public.freelancer_profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending', -- 'pending', 'active', 'completed', 'cancelled'
    amount NUMERIC NOT NULL,
    requirements TEXT,
    delivery_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Enable Row Level Security
ALTER TABLE public.freelancer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freelance_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freelance_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freelance_orders ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies

-- Freelancer Profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.freelancer_profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can create their own freelancer profile" ON public.freelancer_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own freelancer profile" ON public.freelancer_profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- Freelance Categories
CREATE POLICY "Categories are viewable by everyone" ON public.freelance_categories
    FOR SELECT USING (true);

-- Freelance Services
CREATE POLICY "Active services are viewable by everyone" ON public.freelance_services
    FOR SELECT USING (is_active = true);

CREATE POLICY "Freelancers can manage their own services" ON public.freelance_services
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.freelancer_profiles
            WHERE id = freelance_services.freelancer_id
            AND user_id = auth.uid()
        )
    );

-- Freelance Orders
CREATE POLICY "Clients can view their own orders" ON public.freelance_orders
    FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Freelancers can view orders for their services" ON public.freelance_orders
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.freelancer_profiles
            WHERE id = freelance_orders.freelancer_id
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Clients can place orders" ON public.freelance_orders
    FOR INSERT WITH CHECK (auth.uid() = client_id);

-- 7. Seed Categories
INSERT INTO public.freelance_categories (name, slug, icon, description) VALUES
('UI/UX Design', 'ui-ux', 'Palette', 'Visual and interactive design for digital products.'),
('Frontend Development', 'frontend', 'Code', 'Building responsive and interactive user interfaces.'),
('Backend Development', 'backend', 'Terminal', 'Server-side logic and database management.'),
('AI Training & Prompting', 'ai', 'Sparkles', 'Specialized AI model training and expert prompting.'),
('Video Editing', 'video', 'Video', 'High-impact video production and motion graphics.'),
('Marketing & Growth', 'growth', 'TrendingUp', 'Full-funnel marketing and conversion optimization.')
ON CONFLICT (slug) DO NOTHING;
