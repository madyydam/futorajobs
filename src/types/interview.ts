
export type InterviewRole = 'frontend' | 'backend' | 'fullstack' | 'ai' | 'design' | 'growth' | 'product' | 'mobile';

export type InterviewType = 'technical' | 'hr' | 'coding' | 'quiz' | 'system_design' | 'behavioral';

export type InterviewDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type RoundStatus = 'upcoming' | 'active' | 'completed' | 'skipped';

export interface InterviewRound {
    id: string;
    type: InterviewType;
    label: string;
    description: string;
    status: RoundStatus;
    score?: number;
    feedback?: string;
}

export interface InterviewQuestion {
    id: string;
    round_id: string;
    question_text: string;
    code_template?: string;
    expected_answer?: string;
    user_answer?: string;
    user_code?: string;
    evaluation?: {
        score: number;
        feedback: string;
        strengths: string[];
        weaknesses: string[];
        correctness: number;
        efficiency?: number;
        communication: number;
    };
    created_at: string;
}

export interface InterviewSession {
    id: string;
    user_id: string;
    role: InterviewRole;
    difficulty: InterviewDifficulty;
    status: 'draft' | 'ongoing' | 'completed' | 'cancelled';
    total_score?: number;
    overall_feedback?: string;
    readiness_impact?: number;
    created_at: string;
    completed_at?: string;
}

export interface InterviewSelection {
    role: InterviewRole;
    difficulty: InterviewDifficulty;
    types: InterviewType[];
}

export interface InterviewPerformance {
    technical_accuracy: number;
    problem_solving: number;
    communication: number;
    confidence: number;
    coding_efficiency?: number;
    behavioral_competency: number;
}
