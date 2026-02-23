-- Freelance Marketplace Schema

-- 1. Freelancer Profiles
CREATE TABLE IF NOT EXISTS public.freelancer_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    tagline TEXT,
    bio TEXT,
    hourly_rate DECIMAL(10,2),
    experience_years INTEGER,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- 2. Freelance Categories
CREATE TABLE IF NOT EXISTS public.freelance_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Freelance Services
CREATE TABLE IF NOT EXISTS public.freelance_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    freelancer_id UUID NOT NULL REFERENCES public.freelancer_profiles(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.freelance_categories(id),
    title TEXT NOT NULL,
    description TEXT,
    price_type TEXT CHECK (price_type IN ('fixed', 'hourly')),
    price DECIMAL(10,2) NOT NULL,
    delivery_time TEXT, -- e.g. "3 days"
    portfolio_urls TEXT[],
    tags TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Freelance Orders
CREATE TABLE IF NOT EXISTS public.freelance_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.profiles(user_id),
    service_id UUID NOT NULL REFERENCES public.freelance_services(id),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
    total_price DECIMAL(10,2) NOT NULL,
    requirements TEXT,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Freelance Messages
CREATE TABLE IF NOT EXISTS public.freelance_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL REFERENCES public.profiles(user_id),
    receiver_id UUID NOT NULL REFERENCES public.profiles(user_id),
    order_id UUID REFERENCES public.freelance_orders(id),
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Freelance Reviews
CREATE TABLE IF NOT EXISTS public.freelance_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.freelance_orders(id),
    client_id UUID NOT NULL REFERENCES public.profiles(user_id),
    freelancer_id UUID NOT NULL REFERENCES public.freelancer_profiles(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(order_id)
);

-- RLS Policies (Enable RLS on all tables)
ALTER TABLE public.freelancer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freelance_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freelance_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freelance_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freelance_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freelance_reviews ENABLE ROW LEVEL SECURITY;

-- Public read for profiles, categories, services, reviews
CREATE POLICY "Public profiles are viewable by everyone" ON public.freelancer_profiles FOR SELECT USING (true);
CREATE POLICY "Public categories are viewable by everyone" ON public.freelance_categories FOR SELECT USING (true);
CREATE POLICY "Public services are viewable by everyone" ON public.freelance_services FOR SELECT USING (true);
CREATE POLICY "Public reviews are viewable by everyone" ON public.freelance_reviews FOR SELECT USING (true);

-- Authenticated users can create/update their own data
CREATE POLICY "Users can create their own freelancer profile" ON public.freelancer_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own freelancer profile" ON public.freelancer_profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Freelancers can manage their own services" ON public.freelance_services FOR ALL USING (
    freelancer_id IN (SELECT id FROM public.freelancer_profiles WHERE user_id = auth.uid())
);

CREATE POLICY "Clients can view their own orders" ON public.freelance_orders FOR SELECT USING (auth.uid() = client_id);
CREATE POLICY "Freelancers can view orders for their services" ON public.freelance_orders FOR SELECT USING (
    service_id IN (SELECT id FROM public.freelance_services WHERE freelancer_id IN (SELECT id FROM public.freelancer_profiles WHERE user_id = auth.uid()))
);

CREATE POLICY "Users can view their own messages" ON public.freelance_messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send messages" ON public.freelance_messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Insert initial categories
INSERT INTO public.freelance_categories (name, slug, icon, description) VALUES
('UI/UX Design', 'ui-ux-design', 'Palette', 'Visual and interactive design for digital products.'),
('Frontend Development', 'frontend-development', 'Code', 'Building responsive and interactive user interfaces.'),
('Backend Development', 'backend-development', 'Database', 'Server-side logic and database management.'),
('AI Training & Prompt Engineering', 'ai-training', 'Bot', 'Specialized AI model training and expert prompting.'),
('Content Writing', 'content-writing', 'FileText', 'Professional writing and SEO-optimized content.'),
('Marketing & Growth', 'marketing', 'TrendingUp', 'Strategy and execution for brand growth.'),
('Video Editing', 'video-editing', 'Video', 'High-impact video production and post-processing.');
