 import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
 import { supabase } from "@/integrations/supabase/client";
 import { useAuth } from "./useAuth";
 
 export interface Course {
   id: string;
   title: string;
   description: string | null;
   category: string;
   difficulty: string;
   duration: string | null;
   instructor_name: string | null;
   instructor_avatar: string | null;
   lessons_count: number;
   unlocks_internships: number;
   unlocks_jobs: number;
 }
 
 export interface UserCourse {
   id: string;
   user_id: string;
   course_id: string;
   progress_percentage: number;
   completed: boolean;
   started_at: string;
   completed_at: string | null;
 }
 
 export const useCourses = () => {
   const { data: courses, isLoading } = useQuery({
     queryKey: ["courses"],
     queryFn: async () => {
       const { data, error } = await supabase
         .from("courses")
         .select("*")
         .order("title");
       
       if (error) throw error;
       return data as Course[];
     },
   });
 
   return { courses: courses || [], isLoading };
 };
 
 export const useUserCourses = () => {
   const { user } = useAuth();
   const queryClient = useQueryClient();
 
   const { data: userCourses, isLoading } = useQuery({
     queryKey: ["userCourses", user?.id],
     queryFn: async () => {
       if (!user?.id) return [];
       const { data, error } = await supabase
         .from("user_courses")
         .select("*")
         .eq("user_id", user.id);
       
       if (error) throw error;
       return data as UserCourse[];
     },
     enabled: !!user?.id,
   });
 
   const enrollCourse = useMutation({
     mutationFn: async (courseId: string) => {
       if (!user?.id) throw new Error("Not authenticated");
       const { error } = await supabase
         .from("user_courses")
         .insert({
           user_id: user.id,
           course_id: courseId,
           progress_percentage: 0,
           completed: false,
         });
       if (error) throw error;
     },
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["userCourses", user?.id] });
     },
   });
 
   return { userCourses: userCourses || [], isLoading, enrollCourse };
 };