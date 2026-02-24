import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "@/hooks/use-toast";

export interface StartupCommunity {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    tags: string[];
    activity_level: string;
    color_theme: string;
    member_count?: number;
}

export interface Startup {
    id: string;
    name: string;
    description: string;
    sector: string;
    required_skills: string[];
    hiring_roles: string[];
    legal_status: string;
}

export const useStartupCommunity = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const communities = useQuery({
        queryKey: ["startup-communities"],
        queryFn: async () => {
            const { data, error } = await (supabase as any)
                .from("startup_communities")
                .select("*")
                .order("created_at", { ascending: true });

            if (error) throw error;
            return data as StartupCommunity[];
        }
    });

    const startups = useQuery({
        queryKey: ["startups-matching"],
        queryFn: async () => {
            const { data, error } = await (supabase as any)
                .from("startups")
                .select("*");

            if (error) throw error;
            return data as Startup[];
        }
    });

    const userMemberships = useQuery({
        queryKey: ["user-community-memberships", user?.id],
        queryFn: async () => {
            if (!user) return [];
            const { data, error } = await (supabase as any)
                .from("community_memberships")
                .select("community_id")
                .eq("user_id", user.id);

            if (error) throw error;
            return (data as any[]).map(m => m.community_id);
        },
        enabled: !!user
    });

    const joinCommunity = useMutation({
        mutationFn: async (communityId: string) => {
            if (!user) throw new Error("Please sign in to join communities");
            const { error } = await (supabase as any)
                .from("community_memberships")
                .insert([{ user_id: user.id, community_id: communityId }]);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-community-memberships", user?.id] });
            toast({
                title: "Welcome to the group! 🎉",
                description: "You've successfully joined the community.",
            });
        },
        onError: (error) => {
            toast({
                title: "Failed to join",
                description: error.message,
                variant: "destructive",
            });
        }
    });

    return {
        communities: communities.data || [],
        startups: startups.data || [],
        memberships: userMemberships.data || [],
        isLoading: communities.isLoading || startups.isLoading,
        joinCommunity
    };
};
