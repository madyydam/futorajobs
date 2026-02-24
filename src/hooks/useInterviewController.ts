
import { useState, useCallback, useEffect } from "react";
import {
    InterviewSession,
    InterviewRound,
    InterviewQuestion,
    InterviewRole,
    InterviewDifficulty,
    InterviewSelection
} from "@/types/interview";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export const useInterviewController = () => {
    const { user } = useAuth();
    const [session, setSession] = useState<InterviewSession | null>(null);
    const [rounds, setRounds] = useState<InterviewRound[]>([]);
    const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isInterviewing, setIsInterviewing] = useState(false);

    const startInterview = async (selection: InterviewSelection) => {
        if (!user) {
            toast.error("You must be logged in to start an interview");
            return;
        }

        setIsLoading(true);
        try {
            // 1. Create Session
            const { data: sessionData, error: sessionError } = await (supabase as any)
                .from("interview_sessions")
                .insert({
                    user_id: user.id,
                    role: selection.role,
                    difficulty: selection.difficulty,
                    status: 'ongoing',
                })
                .select()
                .single();

            if (sessionError) throw sessionError;

            // 2. Create Rounds
            const roundsToCreate = selection.types.map((type, index) => ({
                session_id: sessionData.id,
                type,
                label: type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' '),
                round_order: index,
                status: index === 0 ? 'active' : 'upcoming',
            }));

            const { data: roundsData, error: roundsError } = await (supabase as any)
                .from("interview_rounds")
                .insert(roundsToCreate)
                .select()
                .order('round_order', { ascending: true });

            if (roundsError) throw roundsError;

            setSession(sessionData);
            setRounds(roundsData);
            setCurrentRoundIndex(0);
            setIsInterviewing(true);

            // 3. Trigger first question
            await generateNextQuestion(roundsData[0].id);

        } catch (error: any) {
            console.error("Error starting interview:", error);
            toast.error("Failed to initialize interview simulation");
        } finally {
            setIsLoading(false);
        }
    };

    const generateNextQuestion = async (roundId: string) => {
        setIsLoading(true);
        try {
            // In a real production app, this would call an AI Edge Function
            // Mocking AI behavior for now
            const mockQuestions = {
                technical: "Can you explain how Virtual DOM works in React and why it's efficient?",
                hr: "Tell me about a time you had a conflict with a team member. How did you resolve it?",
                coding: "Write a function to find the first non-repeating character in a string.",
            };

            const roundType = rounds[currentRoundIndex]?.type || 'technical';
            const questionText = (mockQuestions as any)[roundType] || "Tell me about your experience.";

            const { data: questionData, error: questionError } = await (supabase as any)
                .from("interview_questions")
                .insert({
                    round_id: roundId,
                    question_text: questionText,
                })
                .select()
                .single();

            if (questionError) throw questionError;
            setCurrentQuestion(questionData);
        } finally {
            setIsLoading(false);
        }
    };

    const submitAnswer = async (answer: string, code?: string) => {
        if (!currentQuestion) return;

        setIsLoading(true);
        try {
            // 1. Save answer
            const { error: updateError } = await (supabase as any)
                .from("interview_questions")
                .update({
                    user_answer: answer,
                    user_code: code,
                    evaluation: {
                        score: 85,
                        feedback: "Good answer, but could be more specific about memory implications.",
                        strengths: ["Clear explanation", "Logical flow"],
                        weaknesses: ["Missing edge cases"],
                        metrics: {
                            accuracy: 0.8,
                            communication: 0.9
                        }
                    }
                })
                .eq("id", currentQuestion.id);

            if (updateError) throw updateError;

            // 2. Logic to move to next question or next round
            // This is a simplified flow: 1 question per round for demo
            if (currentRoundIndex < rounds.length - 1) {
                const nextIndex = currentRoundIndex + 1;
                setCurrentRoundIndex(nextIndex);

                // Update round statuses
                await (supabase as any)
                    .from("interview_rounds")
                    .update({ status: 'completed' })
                    .eq("id", rounds[currentRoundIndex].id);

                await (supabase as any)
                    .from("interview_rounds")
                    .update({ status: 'active' })
                    .eq("id", rounds[nextIndex].id);

                await generateNextQuestion(rounds[nextIndex].id);
            } else {
                await completeInterview();
            }

        } finally {
            setIsLoading(false);
        }
    };

    const completeInterview = async () => {
        if (!session) return;

        try {
            await (supabase as any)
                .from("interview_sessions")
                .update({
                    status: 'completed',
                    completed_at: new Date().toISOString(),
                    total_score: 82.5,
                    overall_feedback: "Excellent technical performance. Work on your confident delivery during behavioral rounds."
                })
                .eq("id", session.id);

            setIsInterviewing(false);
            toast.success("Interview completed! Generating your final report...");

            // Redirect to results after a short delay
            setTimeout(() => {
                window.location.href = `/interview-feedback/${session.id}`;
            }, 2000);
        } catch (error) {
            console.error("Error completing interview:", error);
        }
    };

    return {
        session,
        rounds,
        currentRoundIndex,
        currentQuestion,
        isLoading,
        isInterviewing,
        startInterview,
        submitAnswer,
    };
};
