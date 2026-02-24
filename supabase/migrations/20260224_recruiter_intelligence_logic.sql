-- Recruiter Intelligence Engine
-- Task 1-5 Implementation

-- 1. Helper Function: Calculate weighted match score
CREATE OR REPLACE FUNCTION public.calculate_candidate_match_score(
    p_user_id UUID,
    p_job_id UUID
)
RETURNS JSONB AS $$
DECLARE
    v_score NUMERIC := 0;
    v_skill_match NUMERIC := 0;
    v_exp_match NUMERIC := 0;
    v_role_relevance NUMERIC := 0;
    v_proficiency NUMERIC := 0;
    v_industry_match NUMERIC := 0;
    v_location_match NUMERIC := 0;
    v_availability NUMERIC := 0;
    
    v_job_record RECORD;
    v_candidate_record RECORD;
    v_common_skills_count INTEGER;
    v_total_job_skills INTEGER;
    v_match_level TEXT;
    v_explanation TEXT;
BEGIN
    -- Fetch Job & Candidate Data
    SELECT * INTO v_job_record FROM public.jobs WHERE id = p_job_id;
    SELECT * INTO v_candidate_record FROM public.profiles WHERE user_id = p_user_id;
    
    -- 1. Skill Match (40%)
    SELECT COUNT(*), (SELECT COUNT(*) FROM public.job_requirements WHERE job_id = p_job_id)
    INTO v_common_skills_count, v_total_job_skills
    FROM public.job_requirements jr
    WHERE jr.job_id = p_job_id
    AND jr.skill_id IN (SELECT skill_id FROM public.user_skills WHERE user_id = p_user_id);
    
    IF v_total_job_skills > 0 THEN
        v_skill_match := (v_common_skills_count::NUMERIC / v_total_job_skills::NUMERIC) * 100;
    ELSE
        v_skill_match := 100;
    END IF;

    -- 2. Experience Match (20%) - Using Level as proxy for seniority if specific field missing
    -- Let's assume Level 1-2 = Junior, 3-4 = Mid, 5+ = Senior
    v_exp_match := CASE 
        WHEN v_candidate_record.level >= 5 AND v_job_record.experience_level = 'Senior' THEN 100
        WHEN v_candidate_record.level >= 3 AND v_job_record.experience_level = 'Mid' THEN 100
        WHEN v_candidate_record.level >= 1 AND v_job_record.experience_level = 'Junior' THEN 100
        ELSE 50
    END;

    -- 3. Role Relevance (15%)
    IF v_candidate_record.role ILIKE '%' || v_job_record.title || '%' THEN
        v_role_relevance := 100;
    ELSIF v_candidate_record.role IS NOT NULL THEN
        v_role_relevance := 70;
    ELSE
        v_role_relevance := 0;
    END IF;

    -- 4. Skill Proficiency (10%)
    SELECT COALESCE(AVG(level), 0) INTO v_proficiency
    FROM public.user_skills
    WHERE user_id = p_user_id;

    -- 5. Industry Match (5%) - Categories match
    IF v_candidate_record.role ILIKE '%' || v_job_record.category::text || '%' THEN
        v_industry_match := 100;
    ELSE
        v_industry_match := 50;
    END IF;

    -- 6. Location Match (5%)
    IF v_job_record.is_remote OR v_candidate_record.availability = 'Open to remote' THEN
        v_location_match := 100;
    ELSIF v_candidate_record.bio ILIKE '%' || v_job_record.location || '%' THEN
        v_location_match := 100;
    ELSE
        v_location_match := 20;
    END IF;

    -- 7. Availability (5%)
    IF v_candidate_record.availability = 'Open to opportunities' THEN
        v_availability := 100;
    ELSE
        v_availability := 50;
    END IF;

    -- Composite Score
    v_score := (v_skill_match * 0.4) + 
               (v_exp_match * 0.2) + 
               (v_role_relevance * 0.15) + 
               (v_proficiency * 0.1) + 
               (v_industry_match * 0.05) + 
               (v_location_match * 0.05) + 
               (v_availability * 0.05);

    v_match_level := CASE 
        WHEN v_score >= 90 THEN 'Exceptional Match'
        WHEN v_score >= 75 THEN 'Strong Match'
        WHEN v_score >= 60 THEN 'Good Match'
        WHEN v_score >= 40 THEN 'Partial Match'
        ELSE 'Weak Match'
    END;

    v_explanation := format('Candidate matches %s%% of required skills. Role alignment is %s. Proficiency score is %s. Candidate is %s for this position.', 
        round(v_skill_match), 
        CASE WHEN v_role_relevance = 100 THEN 'perfect' ELSE 'moderate' END,
        round(v_proficiency),
        v_match_level
    );

    RETURN jsonb_build_object(
        'candidate_id', v_candidate_record.id,
        'name', v_candidate_record.full_name,
        'match_score', round(v_score),
        'match_level', v_match_level,
        'explanation', v_explanation,
        'strengths', ARRAY[
            CASE WHEN v_skill_match >= 80 THEN 'High skill overlap' ELSE NULL END,
            CASE WHEN v_proficiency >= 70 THEN 'Elite proficiency' ELSE NULL END,
            CASE WHEN v_exp_match = 100 THEN 'Ideal seniority level' ELSE NULL END
        ]
    );
END;
$$ LANGUAGE plpgsql STABLE;

-- 2. Main Intelligence Engine Function
CREATE OR REPLACE FUNCTION public.get_recruiter_intelligence(p_job_id UUID)
RETURNS JSONB AS $$
DECLARE
    v_job_record RECORD;
    v_ranked_candidates JSONB;
    v_skill_heatmap JSONB;
    v_recommended_filters JSONB;
    v_shortlist_candidates JSONB;
    v_recruiter_summary JSONB;
    v_avg_score NUMERIC;
    v_best_candidate_name TEXT;
BEGIN
    -- Fetch Job
    SELECT * INTO v_job_record FROM public.jobs WHERE id = p_job_id;
    
    -- Task 1: Candidate Ranking
    WITH rankings AS (
        SELECT public.calculate_candidate_match_score(p.user_id, p_job_id) as score_obj
        FROM public.profiles p
        WHERE p.full_name IS NOT NULL
    )
    SELECT jsonb_agg(score_obj ORDER BY (score_obj->>'match_score')::int DESC)
    INTO v_ranked_candidates
    FROM rankings;

    -- Task 2: Skill Heatmap
    -- We analyze all candidates who have at least one skill related to the job category
    SELECT jsonb_agg(t)
    INTO v_skill_heatmap
    FROM (
        SELECT 
            s.name as skill_name,
            COUNT(us.id) as total_candidates_with_skill,
            ROUND(AVG(us.level)) as average_proficiency,
            CASE 
                WHEN COUNT(us.id) > 10 THEN 'Abundant'
                WHEN COUNT(us.id) > 5 THEN 'Moderate'
                WHEN COUNT(us.id) > 2 THEN 'Scarce'
                ELSE 'Very Scarce'
            END as talent_supply_level
        FROM public.skills s
        JOIN public.user_skills us ON s.id = us.skill_id
        WHERE s.id IN (SELECT skill_id FROM public.job_requirements WHERE job_id = p_job_id)
        GROUP BY s.name
    ) t;

    -- Task 3: Talent Search Filters
    v_recommended_filters := jsonb_build_object(
        'ideal_experience_range', CASE 
            WHEN v_job_record.experience_level = 'Senior' THEN '5-10 years'
            WHEN v_job_record.experience_level = 'Mid' THEN '2-5 years'
            ELSE '0-2 years'
        END,
        'required_skills_priority_order', (
            SELECT jsonb_agg(s.name)
            FROM public.job_requirements jr
            JOIN public.skills s ON jr.skill_id = s.id
            WHERE jr.job_id = p_job_id
        ),
        'boolean_search_string', (
            SELECT string_agg(s.name, ' AND ')
            FROM public.job_requirements jr
            JOIN public.skills s ON jr.skill_id = s.id
            WHERE jr.job_id = p_job_id
        )
    );

    -- Task 4: Shortlist
    SELECT jsonb_agg(t)
    INTO v_shortlist_candidates
    FROM (
        SELECT 
            (score_obj->>'candidate_id') as candidate_id,
            (score_obj->>'name') as name,
            (score_obj->>'match_score')::int as match_score,
            (SELECT jsonb_agg(s.name) FROM public.user_skills us JOIN public.skills s ON us.skill_id = s.id WHERE us.user_id = (SELECT user_id FROM public.profiles WHERE id = (score_obj->>'candidate_id')::uuid) AND s.id IN (SELECT skill_id FROM public.job_requirements WHERE job_id = p_job_id)) as key_matching_skills,
            CASE 
                WHEN (score_obj->>'match_score')::int >= 90 THEN 'Interview Immediately'
                WHEN (score_obj->>'match_score')::int >= 80 THEN 'High Priority Interview'
                ELSE 'Consider'
            END as hiring_recommendation
        FROM (
            SELECT public.calculate_candidate_match_score(user_id, p_job_id) as score_obj
            FROM public.profiles
            WHERE full_name IS NOT NULL
        ) scores
        WHERE (score_obj->>'match_score')::int >= 70
        ORDER BY (score_obj->>'match_score')::int DESC
    ) t;

    -- Task 5: Recruiter Decision Summary
    v_avg_score := (SELECT AVG((score_obj->>'match_score')::int) FROM (SELECT public.calculate_candidate_match_score(user_id, p_job_id) as score_obj FROM public.profiles WHERE full_name IS NOT NULL) s);
    v_best_candidate_name := (v_ranked_candidates->0->>'name');

    v_recruiter_summary := jsonb_build_object(
        'best_candidate', v_best_candidate_name,
        'average_match_score', round(v_avg_score),
        'talent_pool_quality', CASE 
            WHEN v_avg_score >= 70 THEN 'Strong'
            WHEN v_avg_score >= 50 THEN 'Moderate'
            ELSE 'Weak'
        END,
        'hiring_difficulty', CASE 
            WHEN jsonb_array_length(v_shortlist_candidates) > 5 THEN 'Easy'
            WHEN jsonb_array_length(v_shortlist_candidates) > 2 THEN 'Moderate'
            ELSE 'Difficult'
        END,
        'recommendations_to_recruiter', format('Prioritize interviewing %s based on an exceptional match score of %s. The talent pool for %s is currently %s.', 
            v_best_candidate_name, 
            v_ranked_candidates->0->>'match_score',
            v_job_record.title,
            CASE WHEN v_avg_score >= 70 THEN 'highly qualified' ELSE 'moderate' END
        )
    );

    RETURN jsonb_build_object(
        'ranked_candidates', v_ranked_candidates,
        'skill_heatmap', v_skill_heatmap,
        'recommended_filters', v_recommended_filters,
        'shortlist_candidates', v_shortlist_candidates,
        'recruiter_summary', v_recruiter_summary
    );
END;
$$ LANGUAGE plpgsql STABLE;
