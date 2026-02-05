 import { useQuery } from "@tanstack/react-query";
 import { supabase } from "@/integrations/supabase/client";
 import { useAuth } from "./useAuth";
 
 export interface Job {
   id: string;
   title: string;
   company: string;
   company_logo: string | null;
   description: string | null;
   location: string | null;
   salary_range: string | null;
   experience_level: string | null;
   category: string;
   is_remote: boolean;
   min_readiness_score: number;
 }
 
 export interface JobWithReadiness extends Job {
   readiness_score: number;
   is_ready: boolean;
 }
 
 export const useJobs = () => {
   const { user } = useAuth();
 
   const { data, isLoading } = useQuery({
     queryKey: ["jobs", user?.id],
     queryFn: async () => {
       const { data: jobs, error } = await supabase
         .from("jobs")
         .select("*")
         .order("created_at", { ascending: false });
       
       if (error) throw error;
       
       // Calculate readiness for each job
       const jobsWithReadiness: JobWithReadiness[] = await Promise.all(
         (jobs as Job[]).map(async (job) => {
           let readiness_score = 0;
           
           if (user?.id) {
             const { data: score } = await supabase
               .rpc("calculate_readiness_score", {
                 p_user_id: user.id,
                 p_internship_id: null,
                 p_job_id: job.id,
               });
             readiness_score = score || 0;
           }
           
           return {
             ...job,
             readiness_score,
             is_ready: readiness_score >= job.min_readiness_score,
           };
         })
       );
       
       return jobsWithReadiness;
     },
   });
 
   return { jobs: data || [], isLoading };
 };