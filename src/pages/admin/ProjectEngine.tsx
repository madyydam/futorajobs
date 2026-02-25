import { AdminLayout } from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { FolderGit2, Plus, Search, CheckCircle, XCircle, Github, Clock, Loader2 } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const difficultyColor: Record<string, string> = {
    beginner: "text-emerald-500 bg-emerald-500/10",
    intermediate: "text-yellow-500 bg-yellow-500/10",
    advanced: "text-red-500 bg-red-500/10",
};

const ProjectEngine = () => {
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState<"templates" | "submissions">("templates");
    const queryClient = useQueryClient();

    // Real projects (templates) from Supabase
    const { data: projects, isLoading: loadingProjects } = useQuery({
        queryKey: ["admin-projects"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("projects")
                .select("*, project_skills(skill_id, skills(name))")
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data;
        },
    });

    // Real user project submissions from Supabase
    const { data: submissions, isLoading: loadingSubmissions } = useQuery({
        queryKey: ["admin-user-projects"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("user_projects")
                .select("*, projects(title), profiles!user_projects_user_id_fkey(full_name, email)")
                .order("submitted_at", { ascending: false });
            if (error) throw error;
            return data;
        },
    });

    const approveMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from("user_projects")
                .update({ status: "approved", approved_at: new Date().toISOString() })
                .eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-user-projects"] });
            toast.success("Project approved — Proof of Work verified ✅");
        },
        onError: (e: Error) => toast.error(e.message),
    });

    const rejectMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from("user_projects")
                .update({ status: "rejected" })
                .eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-user-projects"] });
            toast.error("Project rejected");
        },
        onError: (e: Error) => toast.error(e.message),
    });

    const filteredProjects = projects?.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    const pending = submissions?.filter(s => s.status === "pending").length ?? 0;
    const approved = submissions?.filter(s => s.status === "approved").length ?? 0;
    const rejected = submissions?.filter(s => s.status === "rejected").length ?? 0;

    return (
        <AdminLayout>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 text-primary uppercase text-[10px] font-black tracking-[0.4em] mb-3">
                            <FolderGit2 className="h-4 w-4" />
                            Proof of Work System
                        </div>
                        <h1 className="text-4xl font-black text-foreground tracking-tighter italic uppercase">PROJECT <span className="text-primary/40 dark:text-primary/60">ENGINE</span></h1>
                        <p className="text-muted-foreground mt-3 font-medium text-sm">Manage project templates and verify submitted proof-of-work.</p>
                    </div>
                    <button className="h-14 px-8 rounded-2xl bg-primary text-black transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                        <Plus className="h-4 w-4" />
                        Add Template
                    </button>
                </div>

                {/* Stats — real data */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Templates", value: projects?.length ?? "—", icon: FolderGit2, color: "text-primary" },
                        { label: "Submitted", value: submissions?.length ?? "—", icon: Clock, color: "text-yellow-500" },
                        { label: "Approved", value: approved, icon: CheckCircle, color: "text-emerald-500" },
                        { label: "Rejected", value: rejected, icon: XCircle, color: "text-red-500" },
                    ].map((s) => {
                        const Icon = s.icon;
                        return (
                            <div key={s.label} className="bg-card border border-border p-6 rounded-[2rem]">
                                <div className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-2", s.color)}>{s.label}</div>
                                <div className="text-3xl font-black text-foreground">{s.value}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    {(["templates", "submissions"] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                activeTab === tab ? "bg-primary text-black" : "bg-card border border-border text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {tab === "templates" ? "Project Templates" : `Submissions Queue${pending > 0 ? ` (${pending})` : ""}`}
                        </button>
                    ))}
                </div>

                <div className="bg-card border border-border rounded-[2rem] overflow-hidden">
                    {activeTab === "templates" ? (
                        <>
                            <div className="p-6 border-b border-border flex gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search templates or category..."
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        className="pl-12 h-12 bg-background/50 border-border rounded-2xl font-bold"
                                    />
                                </div>
                            </div>
                            <div className="divide-y divide-border/50">
                                {loadingProjects ? (
                                    <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span className="text-xs font-black uppercase tracking-widest">Loading Projects...</span>
                                    </div>
                                ) : filteredProjects?.length === 0 ? (
                                    <div className="py-20 text-center text-xs font-black uppercase tracking-widest text-muted-foreground">No projects found</div>
                                ) : filteredProjects?.map(p => (
                                    <div key={p.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/20 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                                <FolderGit2 className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-foreground">{p.title}</div>
                                                <div className="text-xs text-muted-foreground mt-0.5">{p.description?.slice(0, 70)}...</div>
                                                <div className="flex gap-1.5 mt-1 flex-wrap">
                                                    {(p.project_skills as { skills: { name: string } | null }[])?.map((ps, i) => (
                                                        <span key={i} className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                                            {ps.skills?.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full", difficultyColor[p.difficulty ?? "beginner"])}>{p.difficulty}</span>
                                            <span className="text-xs text-muted-foreground">{p.duration}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="divide-y divide-border/50">
                            {loadingSubmissions ? (
                                <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span className="text-xs font-black uppercase tracking-widest">Loading Submissions...</span>
                                </div>
                            ) : submissions?.length === 0 ? (
                                <div className="py-20 text-center text-xs font-black uppercase tracking-widest text-muted-foreground">No submissions yet</div>
                            ) : submissions?.map(sub => {
                                const profile = sub.profiles as { full_name: string; email: string } | null;
                                const project = sub.projects as { title: string } | null;
                                return (
                                    <div key={sub.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/20 transition-colors">
                                        <div>
                                            <div className="font-bold text-foreground">{profile?.full_name ?? "Unknown"}</div>
                                            <div className="text-sm text-muted-foreground mt-0.5">{project?.title ?? "—"}</div>
                                            <div className="flex items-center gap-2 mt-2">
                                                {sub.github_url && (
                                                    <a href={sub.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] font-black text-primary hover:underline">
                                                        <Github className="h-3 w-3" /> GitHub
                                                    </a>
                                                )}
                                                {sub.submitted_at && (
                                                    <span className="text-[10px] text-muted-foreground">{new Date(sub.submitted_at).toLocaleDateString()}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {sub.status === "pending" ? (
                                                <>
                                                    <button onClick={() => approveMutation.mutate(sub.id)} disabled={approveMutation.isPending} className="flex items-center gap-2 h-10 px-5 rounded-xl bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-50">
                                                        <CheckCircle className="h-3.5 w-3.5" /> Approve
                                                    </button>
                                                    <button onClick={() => rejectMutation.mutate(sub.id)} disabled={rejectMutation.isPending} className="flex items-center gap-2 h-10 px-5 rounded-xl bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all disabled:opacity-50">
                                                        <XCircle className="h-3.5 w-3.5" /> Reject
                                                    </button>
                                                </>
                                            ) : (
                                                <span className={cn("text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl", sub.status === "approved" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500")}>
                                                    {sub.status}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </motion.div>
        </AdminLayout>
    );
};

export default ProjectEngine;
