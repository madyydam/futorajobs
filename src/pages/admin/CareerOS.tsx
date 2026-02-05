import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Target, Search, Plus, Loader2, Award, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const CareerOS = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const { data: paths, isLoading } = useQuery({
        queryKey: ['admin-career-paths'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('career_paths')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            return data;
        }
    });

    const filteredPaths = paths?.filter(p =>
        p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase())
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
                            <Target className="h-4 w-4" />
                            Trajectory Engine
                        </div>
                        <h1 className="text-4xl font-black text-foreground tracking-tighter italic uppercase">Career <span className="text-primary/40 dark:text-primary/60">OS</span></h1>
                        <p className="text-muted-foreground mt-3 font-medium text-sm">Design and manage high-impact career trajectories.</p>
                    </div>

                    <button className="h-14 px-8 rounded-2xl bg-primary text-black transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                        <Plus className="h-4 w-4" />
                        Initialize Trajectory
                    </button>
                </div>

                <div className="bg-card border border-border rounded-[2rem] overflow-hidden backdrop-blur-sm">
                    <div className="p-8 border-b border-border bg-muted/20 flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="relative w-full md:w-[400px] group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-600 group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Search trajectories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-14 bg-background/50 border-border rounded-2xl focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/50 font-bold"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 divide-x divide-y divide-border/20">
                        {isLoading ? (
                            <div className="col-span-full py-24 text-center">
                                <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary/40" />
                            </div>
                        ) : filteredPaths?.length === 0 ? (
                            <div className="col-span-full py-24 text-center text-[10px] font-black uppercase tracking-[0.3em] text-neutral-700">
                                No Trajectories Found
                            </div>
                        ) : (
                            filteredPaths?.map((path) => (
                                <div key={path.id} className="p-8 hover:bg-white/[0.01] transition-all group relative">
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="h-14 w-14 rounded-2xl bg-muted border border-border flex items-center justify-center font-black text-muted-foreground group-hover:text-primary transition-colors">
                                            <Target className="h-6 w-6" />
                                        </div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-neutral-600 italic">
                                            {path.difficulty}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{path.title}</h3>
                                    <p className="text-sm text-muted-foreground font-medium line-clamp-2 mb-6">{path.description}</p>

                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="p-4 rounded-xl bg-muted/50 border border-border">
                                            <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Duration</div>
                                            <div className="text-xs font-bold text-foreground">{path.duration_weeks} Weeks</div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-muted/50 border border-border">
                                            <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Catalog</div>
                                            <div className="text-xs font-bold text-foreground uppercase">{path.category}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/[0.03]">
                                        <div className="flex -space-x-2">
                                            <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-white/5 flex items-center justify-center text-blue-500"><Award className="h-4 w-4" /></div>
                                            <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-white/5 flex items-center justify-center text-purple-500"><GraduationCap className="h-4 w-4" /></div>
                                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-white/5 flex items-center justify-center text-emerald-500"><Briefcase className="h-4 w-4" /></div>
                                        </div>
                                        <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors flex items-center gap-2 group/btn">
                                            CONFIGURE
                                            <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </motion.div>
        </AdminLayout>
    );
};

export default CareerOS;
