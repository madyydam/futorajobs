import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface RankedCandidate {
    candidate_id: string;
    name: string;
    match_score: number;
    match_level: string;
    explanation: string;
    strengths: string[];
}

export interface SkillHeatmapItem {
    skill_name: string;
    total_candidates_with_skill: number;
    average_proficiency: number;
    talent_supply_level: 'Abundant' | 'Moderate' | 'Scarce' | 'Very Scarce';
}

export interface RecommendedFilters {
    ideal_experience_range: string;
    required_skills_priority_order: string[];
    boolean_search_string: string;
}

export interface ShortlistCandidate {
    candidate_id: string;
    name: string;
    match_score: number;
    key_matching_skills: string[];
    hiring_recommendation: string;
}

export interface RecruiterSummary {
    best_candidate: string;
    average_match_score: number;
    talent_pool_quality: string;
    hiring_difficulty: string;
    recommendations_to_recruiter: string;
}

export interface RecruiterIntelligence {
    ranked_candidates: RankedCandidate[];
    skill_heatmap: SkillHeatmapItem[];
    recommended_filters: RecommendedFilters;
    shortlist_candidates: ShortlistCandidate[];
    recruiter_summary: RecruiterSummary;
}

export const useRecruiterIntelligence = (jobId: string | null) => {
    return useQuery({
        queryKey: ["recruiter-intelligence", jobId],
        queryFn: async () => {
            if (!jobId) return null;

            const { data, error } = await (supabase as any).rpc('get_recruiter_intelligence', {
                p_job_id: jobId
            });

            if (error) throw error;
            return data as RecruiterIntelligence;
        },
        enabled: !!jobId
    });
};
