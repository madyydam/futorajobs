import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TechEvent {
    id: string;
    title: string;
    description: string;
    event_type: 'hackathon' | 'conference' | 'workshop' | 'meetup';
    organizer: string;
    location: string;
    start_date: string;
    end_date: string | null;
    registration_deadline: string | null;
    registration_url: string | null;
    banner_url: string | null;
    tags: string[];
    is_featured: boolean;
    created_at: string;
}

export const useEvents = () => {
    return useQuery({
        queryKey: ["tech-events"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("tech_events")
                .select("*")
                .order("start_date", { ascending: true });

            if (error) throw error;
            return data as TechEvent[];
        }
    });
};
