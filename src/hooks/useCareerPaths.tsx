 import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
 import { supabase } from "@/integrations/supabase/client";
 import { useAuth } from "./useAuth";
 
 export interface CareerPath {
   id: string;
   title: string;
   description: string | null;
   icon: string | null;
   category: string;
   difficulty: string;
   duration_weeks: number;
   total_courses: number;
   total_projects: number;
   total_internships: number;
   total_jobs: number;
 }
 
 export interface UserCareerPath {
   id: string;
   user_id: string;
   career_path_id: string;
   current_step: string;
   progress_percentage: number;
   started_at: string;
   completed_at: string | null;
   career_path: CareerPath;
 }
 
 export const useCareerPaths = () => {
   const { data: careerPaths, isLoading } = useQuery({
     queryKey: ["careerPaths"],
     queryFn: async () => {
       const { data, error } = await supabase
         .from("career_paths")
         .select("*")
         .order("title");
       
       if (error) throw error;
       return data as CareerPath[];
     },
   });
 
   return { careerPaths: careerPaths || [], isLoading };
 };
 
 export const useUserCareerPath = () => {
   const { user } = useAuth();
   const queryClient = useQueryClient();
 
   const { data: userCareerPath, isLoading } = useQuery({
     queryKey: ["userCareerPath", user?.id],
     queryFn: async () => {
       if (!user?.id) return null;
       const { data, error } = await supabase
         .from("user_career_paths")
         .select(`
           *,
           career_path:career_paths(*)
         `)
         .eq("user_id", user.id)
         .maybeSingle();
       
       if (error) throw error;
       return data as UserCareerPath | null;
     },
     enabled: !!user?.id,
   });
 
   const selectCareerPath = useMutation({
     mutationFn: async (careerPathId: string) => {
       if (!user?.id) throw new Error("Not authenticated");
       const { error } = await supabase
         .from("user_career_paths")
         .upsert({
           user_id: user.id,
           career_path_id: careerPathId,
           current_step: "learn",
           progress_percentage: 0,
         });
       if (error) throw error;
     },
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["userCareerPath", user?.id] });
     },
   });
 
   return { userCareerPath, isLoading, selectCareerPath };
 };