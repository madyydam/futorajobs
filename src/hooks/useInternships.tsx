import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Internship {
  id: string;
  title: string;
  company: string;
  company_logo: string | null;
  description: string | null;
  location: string | null;
  stipend: string | null;
  duration: string | null;
  category: string;
  is_remote: boolean;
  min_readiness_score: number;
  is_virtual?: boolean;
  tasks?: any[];
  certificate_template?: any;
}

export interface InternshipWithReadiness extends Internship {
  readiness_score: number;
  is_unlocked: boolean;
}

export const useInternships = () => {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["internships", user?.id],
    queryFn: async () => {
      const { data: internships, error } = await supabase
        .from("internships")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Calculate readiness for each internship
      const internshipsWithReadiness: InternshipWithReadiness[] = await Promise.all(
        (internships as Internship[]).map(async (internship) => {
          let readiness_score = 0;

          if (user?.id) {
            const { data: score } = await supabase
              .rpc("calculate_readiness_score", {
                p_user_id: user.id,
                p_internship_id: internship.id,
                p_job_id: null,
              });
            readiness_score = score || 0;
          }

          return {
            ...internship,
            readiness_score,
            is_unlocked: readiness_score >= internship.min_readiness_score,
          };
        })
      );

      return internshipsWithReadiness;
    },
  });

  return { internships: data || [], isLoading };
};