import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ShieldCheck, Clock, Search, ExternalLink, CheckCircle2, XCircle, Loader2, Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { CreateCourseModal } from "@/components/admin/CreateCourseModal";

const LearningGovernance = () => {
    const [activeTab, setActiveTab] = useState<"courses" | "evidence">("courses");
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const queryClient = useQueryClient();

    // Fetch Courses
    const { data: courses, isLoading: coursesLoading } = useQuery({
        queryKey: ['admin-courses'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('courses')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            return data;
        },
        enabled: activeTab === "courses"
    });

    // Fetch Pending Evidence (Projects)
    const { data: pendingEvidence, isLoading: evidenceLoading } = useQuery({
        queryKey: ['admin-pending-evidence'],
        queryFn: async () => {
            const { data: projectsData, error: projectsError } = await supabase
                .from('user_projects')
                .select(`
                    *,
                    projects:project_id(title, category)
                `)
                .eq('status', 'pending')
                .order('submitted_at', { ascending: false });

            if (projectsError) throw projectsError;

            // Manual join for profiles since the schema uses indirect FKs
            const userIds = [...new Set(projectsData.map(p => p.user_id))];
            if (userIds.length === 0) return [];

            const { data: profilesData, error: profilesError } = await supabase
                .from('profiles')
                .select('user_id, full_name, avatar_url, email')
                .in('user_id', userIds);

            if (profilesError) throw profilesError;

            return projectsData.map(project => ({
                ...project,
                profiles: profilesData.find(p => p.user_id === project.user_id)
            }));
        },
        enabled: activeTab === "evidence"
    });

    // Approval Mutation
    const verifyMutation = useMutation({
        mutationFn: async ({ id, status }: { id: string; status: 'approved' | 'rejected' }) => {
            const { error } = await supabase
                .from('user_projects')
                .update({
                    status,
                    approved_at: status === 'approved' ? new Date().toISOString() : null
                })
                .eq('id', id);
            if (error) throw error;
        },
        onSuccess: (_, variables) => {
            toast.success(`Submission ${variables.status === 'approved' ? 'Verified' : 'Rejected'}`);
            queryClient.invalidateQueries({ queryKey: ['admin-pending-evidence'] });
            queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
        },
        onError: () => toast.error("Failed to process decision")
    });

    return (
        <AdminLayout>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 text-primary uppercase text-[10px] font-black tracking-[0.4em] mb-3">
                            <BookOpen className="h-4 w-4" />
                            Curriculum & Verification
                        </div>
                        <h1 className="text-4xl font-black text-foreground tracking-tighter italic uppercase">Learning <span className="text-primary/40 dark:text-primary/60">Governance</span></h1>
                        <p className="text-muted-foreground mt-3 font-medium text-sm">Control the knowledge base and verify talent evidence.</p>
                    </div>

                    <div className="flex p-1.5 rounded-2xl bg-muted/50 border border-border backdrop-blur-xl">
                        {(["courses", "evidence"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative",
                                    activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {activeTab === tab && (
                                    <motion.div layoutId="governance-tab" className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20" />
                                )}
                                <span className="relative z-10">{tab}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sub-header / Search */}
                <div className="bg-card border border-border rounded-[2rem] overflow-hidden backdrop-blur-sm">
                    <div className="p-8 border-b border-border bg-muted/20 flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="relative w-full md:w-[400px] group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-600 group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder={`Search ${activeTab}...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-14 bg-background/50 border-border rounded-2xl focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/50 font-bold"
                            />
                        </div>
                        {activeTab === "courses" && (
                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="h-14 px-8 rounded-2xl bg-primary text-black transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
                            >
                                <Plus className="h-4 w-4" />
                                Deploy New Course
                            </button>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        {activeTab === "courses" ? (
                            <table className="w-full text-left">
                                <thead className="bg-white/[0.01] text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 border-b border-white/[0.05]">
                                    <tr>
                                        <th className="px-8 py-5">Course Unit</th>
                                        <th className="px-8 py-5 text-center">Difficulty</th>
                                        <th className="px-8 py-5 text-center">Engagement Stats</th>
                                        <th className="px-8 py-5 text-right">Protocol</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.03]">
                                    {coursesLoading ? (
                                        <tr><td colSpan={4} className="py-24 text-center"><Loader2 className="h-10 w-10 animate-spin mx-auto text-primary/40" /></td></tr>
                                    ) : courses?.map((course) => (
                                        <tr key={course.id} className="group hover:bg-white/[0.01] transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-12 rounded-2xl bg-muted border border-border flex items-center justify-center font-black text-muted-foreground group-hover:text-primary transition-colors">
                                                        <BookOpen className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-foreground tracking-tight">{course.title}</div>
                                                        <div className="text-[10px] text-muted-foreground font-black uppercase tracking-wider mt-1">{course.category}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-muted border border-border text-muted-foreground italic">
                                                    {course.difficulty}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <div className="flex items-center justify-center gap-4">
                                                    <div className="flex items-center gap-1.5 text-neutral-500 font-bold text-xs">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        {course.duration}
                                                    </div>
                                                    <div className="text-[10px] font-black text-primary/60">{course.lessons_count} LESSONS</div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 hover:text-white transition-colors">Configure</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="bg-white/[0.01] text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 border-b border-white/[0.05]">
                                    <tr>
                                        <th className="px-8 py-5">Submitting Talent</th>
                                        <th className="px-8 py-5">Requested Proof</th>
                                        <th className="px-8 py-5 text-center">Timeline</th>
                                        <th className="px-8 py-5 text-right">Decision Kernel</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.03]">
                                    {evidenceLoading ? (
                                        <tr><td colSpan={4} className="py-24 text-center"><Loader2 className="h-10 w-10 animate-spin mx-auto text-primary/40" /></td></tr>
                                    ) : pendingEvidence?.length === 0 ? (
                                        <tr><td colSpan={4} className="py-24 text-center text-[10px] font-black uppercase tracking-[0.3em] text-neutral-700">No Pending Claims</td></tr>
                                    ) : pendingEvidence?.map((claim) => (
                                        <tr key={claim.id} className="group hover:bg-white/[0.01] transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-full bg-white border border-white/10 flex items-center justify-center font-black text-black overflow-hidden">
                                                        {claim.profiles?.full_name?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-foreground tracking-tight">{claim.profiles?.full_name}</div>
                                                        <div className="text-[10px] text-muted-foreground font-bold">{claim.profiles?.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="space-y-2">
                                                    <div className="text-xs font-black text-primary italic underline decoration-primary/20 flex items-center gap-2">
                                                        {claim.projects?.title}
                                                        <a href={claim.submission_url} target="_blank" rel="noreferrer"><ExternalLink className="h-3 w-3" /></a>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        {claim.github_url && <a href={claim.github_url} target="_blank" rel="noreferrer" className="text-[9px] font-black uppercase tracking-tighter text-neutral-500 hover:text-white px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05]">GITHUB</a>}
                                                        {claim.demo_url && <a href={claim.demo_url} target="_blank" rel="noreferrer" className="text-[9px] font-black uppercase tracking-tighter text-neutral-500 hover:text-white px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05]">DEMO</a>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600">
                                                    {new Date(claim.submitted_at).toLocaleDateString()}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => verifyMutation.mutate({ id: claim.id, status: 'rejected' })}
                                                        disabled={verifyMutation.isPending}
                                                        className="h-10 w-10 rounded-xl bg-red-500/5 text-red-500 border border-red-500/10 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                                                    >
                                                        <XCircle className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => verifyMutation.mutate({ id: claim.id, status: 'approved' })}
                                                        disabled={verifyMutation.isPending}
                                                        className="h-10 px-6 rounded-xl bg-emerald-500/5 text-emerald-500 border border-emerald-500/10 hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest"
                                                    >
                                                        <CheckCircle2 className="h-4 w-4" />
                                                        VERIFY PROOF
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                <CreateCourseModal
                    open={isCreateModalOpen}
                    onOpenChange={setIsCreateModalOpen}
                />
            </motion.div>
        </AdminLayout>
    );
};

export default LearningGovernance;
