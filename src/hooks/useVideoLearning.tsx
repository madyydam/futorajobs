import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { VideoCourse, VideoCategory, VideoProgress } from "@/types/learning";
import { useAuth } from "./useAuth";
import { MOCK_VIDEO_COURSES, MOCK_VIDEO_CATEGORIES } from "@/data/learningMockData";

export const useVideoLearning = (categoryId?: string) => {
    const { user } = useAuth();

    // Fetch Categories
    const categoriesQuery = useQuery({
        queryKey: ["video-categories"],
        queryFn: async () => {
            const { data, error } = await (supabase as any)
                .from("learning_video_categories")
                .select("*")
                .order("name");
            if (error) throw error;

            // Merge with mock categories if needed
            const dbCategories = data as VideoCategory[];
            return dbCategories.length > 0 ? dbCategories : MOCK_VIDEO_CATEGORIES;
        },
        initialData: MOCK_VIDEO_CATEGORIES
    });

    // Fetch Courses
    const coursesQuery = useQuery({
        queryKey: ["video-courses", categoryId],
        queryFn: async () => {
            let query = (supabase as any)
                .from("learning_video_courses")
                .select("*, category:learning_video_categories(*)");

            if (categoryId && categoryId !== 'all') {
                query = query.eq("category_id", categoryId);
            }

            const { data, error } = await query.order("created_at", { ascending: false });
            if (error) throw error;

            const dbCourses = data as VideoCourse[];

            // Filter and merge mock courses
            let filteredMock = MOCK_VIDEO_COURSES;
            if (categoryId && categoryId !== 'all') {
                filteredMock = MOCK_VIDEO_COURSES.filter(c => c.category_id === categoryId);
            }

            return dbCourses.length > 0 ? [...dbCourses, ...filteredMock] : filteredMock;
        },
        initialData: MOCK_VIDEO_COURSES
    });

    // Fetch User Progress
    const progressQuery = useQuery({
        queryKey: ["video-progress", user?.id],
        queryFn: async () => {
            if (!user?.id) return [];
            const { data, error } = await (supabase as any)
                .from("learning_video_progress")
                .select("*")
                .eq("user_id", user.id);
            if (error) throw error;
            return data as VideoProgress[];
        },
        enabled: !!user?.id
    });

    // Update Progress Mutation
    const updateProgress = async (courseId: string, percent: number) => {
        if (!user?.id) return;
        const { error } = await (supabase as any)
            .from("learning_video_progress")
            .upsert({
                user_id: user.id,
                course_id: courseId,
                progress_percent: percent,
                last_watched_at: new Date().toISOString(),
                status: percent >= 100 ? 'completed' : 'started',
                completed_at: percent >= 100 ? new Date().toISOString() : null
            });
        if (error) throw error;
    };

    return {
        categories: categoriesQuery.data || [],
        courses: coursesQuery.data || [],
        progress: progressQuery.data || [],
        isLoading: categoriesQuery.isLoading || coursesQuery.isLoading,
        isError: categoriesQuery.isError || coursesQuery.isError,
        updateProgress
    };
};

