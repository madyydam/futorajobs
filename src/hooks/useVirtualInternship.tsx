import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export interface TaskSubmission {
    id: string;
    user_id: string;
    internship_id: string;
    task_index: number;
    submission_content: string | null;
    submission_url: string | null;
    status: string;
    submitted_at: string;
    completed_at: string | null;
}

export interface UserCertificate {
    id: string;
    user_id: string;
    internship_id: string;
    title: string;
    issuer: string;
    issued_at: string;
    certificate_url: string | null;
    metadata: any;
}

export const useVirtualInternship = (internshipId?: string) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { data: submissions, isLoading: isLoadingSubmissions } = useQuery<TaskSubmission[]>({
        queryKey: ["task-submissions", internshipId, user?.id],
        queryFn: async () => {
            if (!user?.id || !internshipId) return [];
            const { data, error } = await (supabase as any)
                .from("task_submissions")
                .select("*")
                .eq("user_id", user.id)
                .eq("internship_id", internshipId);

            if (error) throw error;
            return data;
        },
        enabled: !!user?.id && !!internshipId,
    });

    const { data: certificate, isLoading: isLoadingCertificate } = useQuery<UserCertificate | null>({
        queryKey: ["user-certificate", internshipId, user?.id],
        queryFn: async () => {
            if (!user?.id || !internshipId) return null;
            const { data, error } = await (supabase as any)
                .from("user_certificates")
                .select("*")
                .eq("user_id", user.id)
                .eq("internship_id", internshipId)
                .maybeSingle();

            if (error) throw error;
            return data;
        },
        enabled: !!user?.id && !!internshipId,
    });

    const submitTask = useMutation({
        mutationFn: async ({ taskIndex, content, url }: { taskIndex: number, content?: string, url?: string }) => {
            if (!user?.id || !internshipId) throw new Error("Not authenticated");

            const { data, error } = await (supabase as any)
                .from("task_submissions")
                .upsert({
                    user_id: user.id,
                    internship_id: internshipId,
                    task_index: taskIndex,
                    submission_content: content,
                    submission_url: url,
                    status: 'completed', // For virtual tasks, we can auto-approve or mark as completed
                    submitted_at: new Date().toISOString(),
                    completed_at: new Date().toISOString()
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["task-submissions", internshipId] });
            toast.success("Task submitted successfully!");
        },
        onError: (error) => {
            toast.error("Failed to submit task: " + error.message);
        }
    });

    const claimCertificate = useMutation({
        mutationFn: async (certificationDetails: { title: string, issuer: string }) => {
            if (!user?.id || !internshipId) throw new Error("Not authenticated");

            const { data, error } = await (supabase as any)
                .from("user_certificates")
                .insert({
                    user_id: user.id,
                    internship_id: internshipId,
                    title: certificationDetails.title,
                    issuer: certificationDetails.issuer,
                    metadata: { claimed_at: new Date().toISOString() }
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-certificate", internshipId] });
            toast.success("Certificate claimed successfully!");
        },
        onError: (error) => {
            toast.error("Failed to claim certificate: " + error.message);
        }
    });

    return {
        submissions: submissions || [],
        isLoadingSubmissions,
        certificate,
        isLoadingCertificate,
        submitTask,
        claimCertificate
    };
};
