import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Briefcase, Search, Plus, Loader2, MapPin, Building2, DollarSign, ArrowRight, MoreHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const JobManagement = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const { data: jobs, isLoading } = useQuery({
        queryKey: ['admin-jobs'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('jobs')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            return data;
        }
    });

    const filteredJobs = jobs?.filter(j =>
        j.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.company?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 text-primary uppercase text-[10px] font-black tracking-[0.4em] mb-3">
                            <Briefcase className="h-4 w-4" />
                            Market Intelligence
                        </div>
                        <h1 className="text-4xl font-black text-foreground tracking-tighter italic uppercase">Job <span className="text-primary/40 dark:text-primary/60">Management</span></h1>
                        <p className="text-muted-foreground mt-3 font-medium text-sm">Orchestrate high-value opportunities across the ecosystem.</p>
                    </div>

                    <button className="h-14 px-8 rounded-2xl bg-primary text-black transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                        <Plus className="h-4 w-4" />
                        POST OPPORTUNITY
                    </button>
                </div>

                <div className="bg-card border border-border rounded-[2rem] overflow-hidden backdrop-blur-sm">
                    <div className="p-8 border-b border-border bg-muted/20 flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="relative w-full md:w-[400px] group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-600 group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Search by job or company..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-14 bg-background/50 border-border rounded-2xl focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/50 font-bold"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-muted/30 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-border">
                                <tr>
                                    <th className="px-8 py-5">Position & Company</th>
                                    <th className="px-8 py-5 text-center">Environment</th>
                                    <th className="px-8 py-5 text-center">Value Bracket</th>
                                    <th className="px-8 py-5 text-right">Protocol</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {isLoading ? (
                                    <tr><td colSpan={4} className="py-24 text-center"><Loader2 className="h-10 w-10 animate-spin mx-auto text-primary/40" /></td></tr>
                                ) : filteredJobs?.length === 0 ? (
                                    <tr><td colSpan={4} className="py-24 text-center text-[10px] font-black uppercase tracking-[0.3em] text-neutral-700">Zero Opportunities Logged</td></tr>
                                ) : (
                                    filteredJobs?.map((job) => (
                                        <tr key={job.id} className="group hover:bg-white/[0.01] transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-12 rounded-2xl bg-muted border border-border flex items-center justify-center overflow-hidden">
                                                        {job.company_logo ? (
                                                            <img src={job.company_logo} alt={job.company} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <Building2 className="h-6 w-6 text-neutral-600" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-foreground tracking-tight leading-none mb-1 group-hover:text-primary transition-colors">{job.title}</div>
                                                        <div className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">{job.company}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <div className="flex flex-col items-center gap-1.5">
                                                    <div className="flex items-center gap-2 text-muted-foreground font-bold text-xs">
                                                        <MapPin className="h-3.5 w-3.5" />
                                                        {job.location}
                                                    </div>
                                                    {job.is_remote && (
                                                        <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/10">REMOTE</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <div className="flex items-center justify-center gap-1.5 text-foreground font-black text-xs">
                                                    <DollarSign className="h-3.5 w-3.5 text-primary" />
                                                    {job.salary_range}
                                                </div>
                                                <div className="text-[9px] text-muted-foreground font-black uppercase tracking-widest mt-1">{job.experience_level}</div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button className="p-3 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground transition-colors">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </button>
                                                    <button className="h-10 px-6 rounded-xl bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10 hover:bg-primary hover:text-black transition-all group/btn">
                                                        INSPECT
                                                        <ArrowRight className="inline-block h-3 w-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        </AdminLayout>
    );
};

export default JobManagement;
