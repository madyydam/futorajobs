import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    Zap,
    ShieldCheck,
    TrendingUp,
    Mail,
    ExternalLink,
    CheckCircle2,
    Users,
    Briefcase,
    Brain,
    LineChart,
    PieChart,
    Target,
    ArrowRight,
    Search,
    Filter,
    Activity
} from "lucide-react";
import { useRecruiterIntelligence } from "@/hooks/useRecruiterIntelligence";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const RecruiterDashboard = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDomain, setSelectedDomain] = useState<string>("all");
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'discovery' | 'intelligence'>('discovery');

    // Fetch Jobs for the selector
    const { data: jobs } = useQuery({
        queryKey: ["recruiter-jobs"],
        queryFn: async () => {
            const { data, error } = await supabase.from("jobs").select("id, title, company");
            if (error) throw error;
            return data;
        }
    });

    const { data: intelligence, isLoading: intelligenceLoading } = useRecruiterIntelligence(selectedJobId);

    const { data: talent, isLoading } = useQuery({
        queryKey: ["recruiter-talent", selectedDomain, searchTerm],
        queryFn: async () => {
            // Fetch profiles with their skills and readiness scores
            // This is a simplified version for the prototype
            const { data, error } = await (supabase as any)
                .from("profiles")
                .select(`
                    id, 
                    full_name, 
                    role, 
                    avatar_url, 
                    level,
                    user_skills (
                        skill:skills(name, category),
                        is_verified
                    )
                `)
                .neq('full_name', null);

            if (error) throw error;
            return data;
        }
    });

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black text-foreground italic uppercase tracking-tighter mb-2">
                            Talent <span className="text-primary">Registry</span>
                        </h1>
                        <p className="text-muted-foreground font-medium flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-primary" />
                            Elite Builder Network • Verified Skills & Readiness Scores
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-4 rounded-2xl bg-card border border-border text-center dark:bg-white/5 dark:border-white/10">
                            <div className="text-2xl font-black text-foreground uppercase italic tracking-tighter dark:text-white">1.2k</div>
                            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Builders</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-center">
                            <div className="text-2xl font-black text-primary uppercase italic tracking-tighter">420</div>
                            <div className="text-[10px] font-bold text-primary uppercase tracking-widest">Verified Pros</div>
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-12">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search by name, role or skill..."
                            className="pl-12 h-14 bg-card border-border rounded-xl text-foreground font-medium dark:bg-[#0A0D14] dark:border-white/5"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex p-1.5 rounded-2xl bg-card border border-border dark:bg-[#0A0D14] dark:border-white/5">
                        <Button
                            variant="ghost"
                            onClick={() => setViewMode('discovery')}
                            className={cn(
                                "rounded-xl font-black text-[10px] uppercase tracking-widest px-6 h-10",
                                viewMode === 'discovery' ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground"
                            )}
                        >
                            Discovery
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => setViewMode('intelligence')}
                            className={cn(
                                "rounded-xl font-black text-[10px] uppercase tracking-widest px-6 h-10",
                                viewMode === 'intelligence' ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground"
                            )}
                        >
                            <Brain className="h-4 w-4 mr-2" />
                            AI Intelligence
                        </Button>
                    </div>
                </div>

                {viewMode === 'intelligence' ? (
                    <div className="space-y-12">
                        {/* Job Selector for Intelligence */}
                        <div className="p-8 rounded-[2.5rem] bg-[#0D111C] border border-white/5 mb-8">
                            <h2 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <Target className="h-4 w-4" /> Select Mission Objective
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {jobs?.map((job) => (
                                    <Button
                                        key={job.id}
                                        onClick={() => setSelectedJobId(job.id)}
                                        className={cn(
                                            "px-6 h-12 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all",
                                            selectedJobId === job.id
                                                ? "bg-primary text-black"
                                                : "bg-white/5 text-muted-foreground border border-white/5 hover:bg-white/10"
                                        )}
                                    >
                                        {job.title} @ {job.company}
                                    </Button>
                                ))}
                                {!selectedJobId && <p className="text-muted-foreground italic text-sm">Select a job to generate intelligence report...</p>}
                            </div>
                        </div>

                        {selectedJobId && intelligence && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid lg:grid-cols-3 gap-8"
                            >
                                {/* Task 5: Decision Intelligence Summary */}
                                <div className="lg:col-span-2 space-y-8">
                                    <div className="p-8 rounded-[3rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-[0.05]">
                                            <ShieldCheck className="h-40 w-40" />
                                        </div>
                                        <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-6 flex items-center gap-3">
                                            <Zap className="h-6 w-6 text-primary" />
                                            Executive Intelligence Summary
                                        </h2>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                                            <div>
                                                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Top Match</div>
                                                <div className="text-lg font-black text-white italic truncate">{intelligence.recruiter_summary.best_candidate}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Pool Quality</div>
                                                <div className="text-lg font-black text-primary italic">{intelligence.recruiter_summary.talent_pool_quality}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Avg Match Score</div>
                                                <div className="text-lg font-black text-white italic">{intelligence.recruiter_summary.average_match_score}%</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px) font-black text-muted-foreground uppercase tracking-widest mb-1">Hiring Difficulty</div>
                                                <div className="text-lg font-black text-amber-500 italic">{intelligence.recruiter_summary.hiring_difficulty}</div>
                                            </div>
                                        </div>
                                        <p className="p-4 rounded-2xl bg-black/40 border border-white/5 text-sm text-muted-foreground italic leading-relaxed">
                                            "{intelligence.recruiter_summary.recommendations_to_recruiter}"
                                        </p>
                                    </div>

                                    {/* Task 1: Ranked Candidates */}
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
                                            <Target className="h-5 w-5 text-primary" />
                                            Ranked Talent Match AI
                                        </h2>
                                        <div className="space-y-4">
                                            {intelligence.ranked_candidates.map((candidate, idx) => (
                                                <motion.div
                                                    key={candidate.candidate_id}
                                                    initial={{ x: -20, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="p-6 rounded-[2rem] bg-[#0D111C] border border-white/5 hover:border-primary/40 transition-all flex flex-col md:flex-row justify-between gap-6"
                                                >
                                                    <div className="flex gap-4">
                                                        <div className="h-12 w-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center font-black text-primary uppercase">
                                                            {candidate.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="font-black text-white uppercase italic tracking-tighter text-lg">{candidate.name}</div>
                                                            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">{candidate.match_level}</div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {candidate.strengths.filter(s => s).map((s, i) => (
                                                                    <Badge key={i} variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[8px] uppercase">{s}</Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end justify-center min-w-[150px]">
                                                        <div className="text-3xl font-black text-primary italic">{candidate.match_score}%</div>
                                                        <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Match Score</div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    {/* Task 2: Skill Heatmap */}
                                    <div className="p-8 rounded-[3rem] bg-[#0D111C] border border-white/5">
                                        <h2 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                            <Activity className="h-4 w-4 text-primary" /> Skill Heatmap Intelligence
                                        </h2>
                                        <div className="space-y-6">
                                            {intelligence.skill_heatmap.map((skill, i) => (
                                                <div key={i} className="space-y-2">
                                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                                        <span className="text-white">{skill.skill_name}</span>
                                                        <span className={cn(
                                                            skill.talent_supply_level === 'Abundant' ? 'text-primary' : 'text-amber-500'
                                                        )}>{skill.talent_supply_level}</span>
                                                    </div>
                                                    <Progress value={skill.average_proficiency} className="h-1 bg-white/5" />
                                                    <div className="flex justify-between text-[8px] font-bold text-muted-foreground uppercase">
                                                        <span>{skill.total_candidates_with_skill} builders</span>
                                                        <span>Avg {skill.average_proficiency}%</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Task 3 & 4: Filters & Shortlist */}
                                    <div className="p-8 rounded-[3rem] bg-[#0D111C] border border-white/5">
                                        <h2 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                            <Filter className="h-4 w-4 text-primary" /> Recommended Filters
                                        </h2>
                                        <div className="space-y-4 mb-8">
                                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                                <div className="text-[9px] font-black text-muted-foreground uppercase mb-2">Ideal Seniority</div>
                                                <div className="text-sm text-white font-bold">{intelligence.recommended_filters.ideal_experience_range}</div>
                                            </div>
                                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                                <div className="text-[9px] font-black text-muted-foreground uppercase mb-2">X-Ray Search String</div>
                                                <code className="text-[10px] text-primary break-all">{intelligence.recommended_filters.boolean_search_string}</code>
                                            </div>
                                        </div>

                                        <h2 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                            <Briefcase className="h-4 w-4 text-primary" /> AI Shortlist
                                        </h2>
                                        <div className="space-y-3">
                                            {intelligence.shortlist_candidates.map((c) => (
                                                <div key={c.candidate_id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                                                    <div>
                                                        <div className="text-xs font-black text-white uppercase">{c.name}</div>
                                                        <div className="text-[8px] font-bold text-primary uppercase">{c.hiring_recommendation}</div>
                                                    </div>
                                                    <div className="text-sm font-black text-white">{c.match_score}%</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(talent as any[])?.map((builder, idx) => {
                            const readiness = 60 + Math.floor(Math.random() * 35); // Simulated live upgrade in real use this calls RPC
                            return (
                                <motion.div
                                    key={builder.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group p-8 rounded-[3rem] bg-[#0D111C] border border-white/5 hover:border-primary/30 transition-all relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                                        <TrendingUp className="h-32 w-32" />
                                    </div>

                                    <div className="flex items-start justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="h-16 w-16 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-xl font-black text-primary overflow-hidden">
                                                {builder.avatar_url ? <img src={builder.avatar_url} className="w-full h-full object-cover" /> : builder.full_name?.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter flex items-center gap-2">
                                                    {builder.full_name}
                                                    <div className="h-4 w-4 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                                                        <CheckCircle2 className="h-3 w-3" />
                                                    </div>
                                                </h3>
                                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{builder.role || 'Builder'}</p>
                                            </div>
                                        </div>
                                        <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase">
                                            LVL {builder.level || 1}
                                        </div>
                                    </div>

                                    <div className="space-y-6 mb-8">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                                <span className="text-muted-foreground">Readiness Score</span>
                                                <span className="text-primary">{readiness}%</span>
                                            </div>
                                            <Progress value={readiness} className="h-1 bg-white/5" />
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {(builder.user_skills as any[])?.slice(0, 3).map((skill, i) => (
                                                <div key={i} className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black text-white/60 uppercase tracking-tighter flex items-center gap-1.5">
                                                    {skill.skill?.name}
                                                    {skill.is_verified && <ShieldCheck className="h-3 w-3 text-primary" />}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button className="flex-1 rounded-xl bg-primary text-black font-black uppercase tracking-widest text-[10px] h-12 shadow-lg shadow-primary/10">
                                            DIRECT HIRE
                                        </Button>
                                        <Button variant="outline" className="h-12 w-12 rounded-xl border-white/10 hover:bg-white/5 p-0">
                                            <Mail className="h-4 w-4 text-white" />
                                        </Button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default RecruiterDashboard;
