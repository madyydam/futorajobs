 import { useQuery } from "@tanstack/react-query";
 import { supabase } from "@/integrations/supabase/client";
 import { useAuth } from "./useAuth";
 
 export interface UserSkill {
   id: string;
   user_id: string;
   skill_id: string;
   level: number;
   courses_completed: number;
   projects_completed: number;
   last_updated: string;
   skill: {
     id: string;
     name: string;
     category: string;
     icon: string | null;
   };
 }
 
 export const useUserSkills = () => {
   const { user } = useAuth();
 
   const { data: userSkills, isLoading, error } = useQuery({
     queryKey: ["userSkills", user?.id],
     queryFn: async () => {
       if (!user?.id) return [];
       const { data, error } = await supabase
         .from("user_skills")
         .select(`
           *,
           skill:skills(id, name, category, icon)
         `)
         .eq("user_id", user.id)
         .order("level", { ascending: false });
       
       if (error) throw error;
       return data as UserSkill[];
     },
     enabled: !!user?.id,
   });
 
   return { userSkills: userSkills || [], isLoading, error };
 };