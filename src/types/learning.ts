export type VideoSubCategory = {
    id: string;
    name: string;
    image?: string;
};

export type VideoCategory = {
    id: string;
    name: string;
    slug: string;
    icon: string;
    description: string;
    subcategories?: VideoSubCategory[];
    color?: string; // Hex or tailwind class
    image?: string; // Background thumbnail
};

export type VideoLesson = {
    id: string;
    title: string;
    duration: string;
    video_url: string;
    is_completed?: boolean;
};

export type VideoCourse = {
    id: string;
    category_id: string;
    title: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    instructor_name: string;
    thumbnail_url: string;
    video_url: string; // Preview or lesson 1 video
    source_platform: string;
    is_external: boolean;
    total_views: number;
    rating: number;
    created_at: string;
    category?: VideoCategory;
    lessons?: VideoLesson[];
};

export type VideoProgress = {
    id: string;
    user_id: string;
    course_id: string;
    progress_percent: number;
    status: 'started' | 'completed';
    last_watched_at: string;
    completed_at?: string;
};

export type VideoBookmark = {
    id: string;
    user_id: string;
    course_id: string;
    created_at: string;
};
