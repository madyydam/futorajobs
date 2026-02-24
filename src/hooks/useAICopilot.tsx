import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import {
    Sparkles,
    MessageSquare,
    Zap,
    PlayCircle,
    Globe,
    Brain,
    ChevronRight,
    Lock
} from "lucide-react";

export interface AISuggestion {
    id: string;
    type: 'roadmap' | 'skill_gap' | 'next_step' | 'resume_tip';
    content: {
        title: string;
        message: string;
        actionLabel?: string;
        actionUrl?: string;
        details?: string[];
    };
    created_at: string;
}

export interface DomainReadiness {
    domain: string;
    score: number;
}

export const useAICopilot = () => {
    const { user } = useAuth();

    const { data: readiness, isLoading: isLoadingReadiness } = useQuery({
        queryKey: ["domain-readiness", user?.id],
        queryFn: async () => {
            if (!user?.id) return [];

            const domains = ['frontend', 'ai', 'startup', 'general'];
            const scores = await Promise.all(domains.map(async (domain) => {
                const { data, error } = await (supabase as any).rpc('calculate_domain_readiness', {
                    p_user_id: user.id,
                    p_domain: domain
                });
                return { domain, score: data || 0 };
            }));

            return scores as DomainReadiness[];
        },
        enabled: !!user?.id,
    });

    const { data: suggestions, isLoading: isLoadingSuggestions } = useQuery({
        queryKey: ["ai-suggestions", user?.id],
        queryFn: async () => {
            if (!user?.id) return [];

            const { data, error } = await (supabase as any)
                .from("ai_suggestions")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (error) return [];

            // If no suggestions, return some dynamic defaults based on readiness
            if (!data || data.length === 0) {
                return [
                    {
                        id: "default-1",
                        type: "next_step",
                        content: {
                            title: "Initialize Roadmap",
                            message: "Building a career path... Start by completing your profile and adding 3 top skills.",
                            actionLabel: "Update Profile",
                            actionUrl: "/profile"
                        },
                        created_at: new Date().toISOString()
                    }
                ] as AISuggestion[];
            }

            return data as AISuggestion[];
        },
        enabled: !!user?.id,
    });

    return {
        readiness: readiness || [],
        suggestions: suggestions || [],
        isLoading: isLoadingReadiness || isLoadingSuggestions
    };
};
