import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FreelanceService, FreelanceCategory, FreelanceOrder, FreelancerProfile } from "@/types/marketplace";
import { useAuth } from "./useAuth";

export const useFreelance = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // Fetch Categories
    const categories = useQuery({
        queryKey: ["freelance-categories"],
        queryFn: async () => {
            const { data, error } = await (supabase as any)
                .from("freelance_categories")
                .select("*")
                .order("name");
            if (error) throw error;
            return data as FreelanceCategory[];
        },
    });

    // Fetch Services
    const services = useQuery({
        queryKey: ["freelance-services"],
        queryFn: async () => {
            const { data, error } = await (supabase as any)
                .from("freelance_services")
                .select(`
                    *,
                    freelancer:freelancer_profiles(*),
                    category:freelance_categories(*)
                `)
                .eq("is_active", true)
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data as FreelanceService[];
        },
    });

    // Fetch Freelancer Profile
    const freelancerProfile = useQuery({
        queryKey: ["freelancer-profile", user?.id],
        queryFn: async () => {
            if (!user?.id) return null;
            const { data, error } = await (supabase as any)
                .from("freelancer_profiles")
                .select("*")
                .eq("user_id", user.id)
                .maybeSingle();
            if (error) throw error;
            return data as FreelancerProfile;
        },
        enabled: !!user?.id,
    });

    // Create Service Mutation
    const createService = useMutation({
        mutationFn: async (service: Partial<FreelanceService>) => {
            if (!user?.id) throw new Error("Not authenticated");

            // Ensure freelancer profile exists
            let profile = freelancerProfile.data;
            if (!profile) {
                const { data: newProfile, error: profileError } = await (supabase as any)
                    .from("freelancer_profiles")
                    .insert({
                        user_id: user.id,
                        full_name: user.user_metadata?.full_name || "User",
                    })
                    .select()
                    .single();

                if (profileError) throw profileError;
                profile = newProfile as FreelancerProfile;
            }

            const { data, error } = await (supabase as any)
                .from("freelance_services")
                .insert({
                    ...service,
                    freelancer_id: (profile as any).id,
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["freelance-services"] });
        },
    });

    // Fetch Single Service
    const useService = (id: string | undefined) => useQuery({
        queryKey: ["freelance-service", id],
        queryFn: async () => {
            if (!id) return null;
            const { data, error } = await (supabase as any)
                .from("freelance_services")
                .select(`
                    *,
                    freelancer:freelancer_profiles(*),
                    category:freelance_categories(*)
                `)
                .eq("id", id)
                .single();
            if (error) throw error;
            return data as FreelanceService;
        },
        enabled: !!id,
    });

    return {
        categories,
        services,
        freelancerProfile,
        createService,
        useService,
    };
};
