
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import {
    Zap,
    ShieldCheck,
    TrendingUp,
    AlertCircle,
    CheckCircle2,
    ArrowRight,
    Target,
    Activity,
    Brain,
    LineChart,
    PieChart,
    ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const InterviewFeedback = () => {
    const { sessionId } = useParams();

    // In a real app, this would be fetched from Supabase using sessionId
    const mockFeedback = {
        role: "Frontend Engineer",
        difficulty: "Intermediate",
        score: 82,
        metrics: [
            { label: "Technical Accuracy", value: 85, color: "bg-primary" },
            { label: "Communication Clarity", value: 92, color: "bg-blue-500" },
            { label: "Problem Solving", value: 78, color: "bg-purple-500" },
            { label: "Code Efficiency", value: 70, color: "bg-orange-500" }
        ],
        strengths: [
            "Excellent understanding of React state management and hooks lifecycle.",
            "Strong communication skills with clear articulation of complex technical concepts.",
            "Handled follow-up questions with confidence and logic."
        ],
        weaknesses: [
            "Needs more focus on performance optimization patterns like memoization.",
            "Behavioral answers could have more specific quantifiable outcomes (STAR method).",
            "Slight hesitation during the live coding session for edge cases."
        ],
        nextSteps: [
            "Review Web Performance optimization articles",
            "Practice mock behavioral rounds with STAR focus",
            "Take the 'Advanced React' course in the Learning Hub"
        ]
    };

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-6 py-12">
                <Link to="/interview-coach" className="inline-flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest hover:underline mb-12">
                    <ChevronLeft className="h-4 w-4" />
                    Back to Hub
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                                <Activity className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Report_ID: {sessionId?.slice(0, 8) || 'SIM_001'}</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-foreground italic uppercase tracking-tighter leading-[0.85]">
                            INTERVIEW <span className="text-primary/40 dark:text-primary/20">RESULTS</span>
                        </h1>
                    </div>

                    <div className="p-8 rounded-[3.5rem] bg-card border border-border shadow-2xl relative overflow-hidden group min-w-[280px]">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                            <TrendingUp className="h-24 w-24" />
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Readiness Score</div>
                        <div className="text-7xl font-black text-foreground italic leading-none">{mockFeedback.score}%</div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Performance Metrics */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            {mockFeedback.metrics.map((metric) => (
                                <div key={metric.label} className="p-8 rounded-[2.5rem] bg-card border border-border">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{metric.label}</span>
                                        <span className="text-xl font-black italic">{metric.value}%</span>
                                    </div>
                                    <Progress value={metric.value} className={cn("h-1 bg-muted", metric.color)} />
                                </div>
                            ))}
                        </div>

                        {/* Critical Analysis */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-10 rounded-[3rem] bg-emerald-500/5 border border-emerald-500/20">
                                <h3 className="flex items-center gap-3 text-emerald-500 font-black text-xs uppercase tracking-widest mb-8">
                                    <CheckCircle2 className="h-5 w-5" /> Killer Strengths
                                </h3>
                                <ul className="space-y-6">
                                    {mockFeedback.strengths.map((s, i) => (
                                        <li key={i} className="flex gap-4 items-start text-sm font-bold text-foreground italic leading-relaxed">
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-10 rounded-[3rem] bg-orange-500/5 border border-orange-500/20">
                                <h3 className="flex items-center gap-3 text-orange-500 font-black text-xs uppercase tracking-widest mb-8">
                                    <AlertCircle className="h-5 w-5" /> Skill Gaps
                                </h3>
                                <ul className="space-y-6">
                                    {mockFeedback.weaknesses.map((w, i) => (
                                        <li key={i} className="flex gap-4 items-start text-sm font-bold text-foreground italic leading-relaxed">
                                            <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                                            {w}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* AI Personalized Roadmap */}
                    <div className="lg:col-span-1">
                        <div className="p-10 rounded-[3rem] bg-primary border border-primary shadow-[0_0_50px_rgba(16,185,129,0.2)] text-primary-foreground h-full">
                            <h3 className="flex items-center gap-3 font-black text-xs uppercase tracking-widest mb-10">
                                <Brain className="h-6 w-6" /> AI Recommendation
                            </h3>

                            <div className="space-y-12">
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-6">Strategic Next Steps</div>
                                    <ul className="space-y-6">
                                        {mockFeedback.nextSteps.map((step, i) => (
                                            <li key={i} className="flex gap-4 items-start text-sm font-black italic leading-tight group">
                                                <ArrowRight className="h-5 w-5 shrink-0 group-hover:translate-x-1 transition-transform" />
                                                {step}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-8 border-t border-white/20">
                                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-4">Market Readiness</div>
                                    <div className="text-3xl font-black italic uppercase tracking-tighter">Level: High</div>
                                    <p className="text-[11px] font-bold mt-2 opacity-80 italic">You are in the top 15% of candidates for {mockFeedback.role} roles at startups in this tier.</p>
                                </div>

                                <Button asChild className="w-full h-16 rounded-2xl bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest text-[10px]">
                                    <Link to="/learning">Boost Your Score</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default InterviewFeedback;
