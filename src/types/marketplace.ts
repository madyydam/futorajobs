export type FreelanceCategory = {
    id: string;
    name: string;
    slug: string;
    icon: string;
    description?: string;
};

export type FreelancerProfile = {
    id: string;
    user_id: string;
    tagline: string;
    bio: string;
    hourly_rate: number;
    experience_years: number;
    is_verified: boolean;
    avatar_url?: string;
    full_name?: string;
};

export type FreelanceService = {
    id: string;
    freelancer_id: string;
    category_id: string;
    title: string;
    description: string;
    price_type: 'fixed' | 'hourly';
    price: number;
    delivery_time: string;
    portfolio_urls: string[];
    tags: string[];
    is_active: boolean;
    freelancer?: FreelancerProfile;
    category?: FreelanceCategory;
};

export type FreelanceOrder = {
    id: string;
    client_id: string;
    service_id: string;
    status: 'pending' | 'active' | 'completed' | 'cancelled';
    total_price: number;
    requirements: string;
    started_at?: string;
    completed_at?: string;
    created_at: string;
    service?: FreelanceService;
    client?: {
        full_name: string;
        avatar_url?: string;
    };
};

export type FreelanceReview = {
    id: string;
    order_id: string;
    client_id: string;
    rating: number;
    comment: string;
    created_at: string;
    client_name?: string;
};
