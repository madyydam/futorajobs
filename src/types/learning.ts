export type VideoCategory = {
    id: string;
    name: string;
    slug: string;
    icon: string;
    description: string;
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
    video_url: string;
    source_platform: string;
    is_external: boolean;
    total_views: number;
    rating: number;
    created_at: string;
    category?: VideoCategory;
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
