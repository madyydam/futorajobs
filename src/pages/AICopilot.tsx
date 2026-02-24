import { Layout } from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import {
    Brain,
    Zap,
    Target,
    TrendingUp,
    Search,
    FileText,
    Video,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    Cpu,
    LineChart,
    MessageSquare,
    Loader2,
    ChevronRight,
    Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAICopilot } from "@/hooks/useAICopilot";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "react-router-dom";

const AICopilotPage = () => {
    const { readiness, suggestions, isLoading } = useAICopilot();
    const [selectedTab, setSelectedTab] = useState<'roadmap' | 'resume' | 'interview'>('roadmap');

    if (isLoading) {
        return (
            <Layout>
                <div className="flex h-[80vh] items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                        <p className="text-muted-foreground font-black uppercase tracking-widest text-[10px]">Initializing Career_AI...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    const generalReadiness = readiness.find(r => r.domain === 'general')?.score || 0;

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 py-12 relative">
                {/* Background Cyber Decor */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] -z-10 rounded-full animate-pulse" />
                <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] -z-10 rounded-full" />

                {/* Hero Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                                <Brain className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">System Core v2.0.4</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-foreground italic uppercase tracking-tighter leading-[0.8]">
                            AI <span className="text-primary/40 dark:text-primary/20">COPILOT</span>
                        </h1>
                        <p className="text-muted-foreground font-bold italic mt-4 max-w-xl text-lg">
                            Quantum-calculated career intelligence. Analyzing your skills, projects, and market trends to build your roadmap to elite status.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-8 rounded-[3.5rem] bg-card border border-border shadow-2xl relative overflow-hidden group min-w-[300px] dark:bg-[#0A0D14] dark:border-white/5"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                            <TrendingUp className="h-24 w-24" />
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Overall Readiness</div>
                        <div className="text-6xl font-black text-foreground italic leading-none mb-4">{generalReadiness}%</div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${generalReadiness}%` }}
                                className="h-full bg-primary shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Domain Readiness Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {readiness.filter(r => r.domain !== 'general').map((domain, i) => (
                        <motion.div
                            key={domain.domain}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-primary/20 transition-all group relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 rounded-2xl bg-muted border border-border group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                    {domain.domain === 'frontend' && <Target className="h-5 w-5" />}
                                    {domain.domain === 'ai' && <Cpu className="h-5 w-5" />}
                                    {domain.domain === 'startup' && <Zap className="h-5 w-5" />}
                                </div>
                                <div className="text-2xl font-black text-foreground italic">{domain.score}%</div>
                            </div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">{domain.domain}_Status</h3>
                            <Progress value={domain.score} className="h-1 bg-white/5" />
                        </motion.div>
                    ))}
                </div>

                {/* Main AI Interaction Hub */}
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Left: AI Navigation */}
                    <div className="lg:col-span-1 space-y-3">
                        {[
                            { id: 'roadmap', label: 'ROADMAP_GEN', icon: LineChart },
                            { id: 'resume', label: 'RESUME_OPTIM', icon: FileText },
                            { id: 'interview', label: 'MOCK_INTERVIEW', icon: MessageSquare },
                        ].map((nav) => (
                            <button
                                key={nav.id}
                                onClick={() => setSelectedTab(nav.id as any)}
                                className={cn(
                                    "w-full flex items-center justify-between p-6 rounded-2xl transition-all border font-black text-[10px] uppercase tracking-widest",
                                    selectedTab === nav.id
                                        ? "bg-primary border-primary text-primary-foreground shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                                        : "bg-card border-border text-muted-foreground hover:bg-accent dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <nav.icon className="h-4 w-4" />
                                    {nav.label}
                                </div>
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        ))}

                        <div className="pt-8 px-4">
                            <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">Elite Verification</h4>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                                    <ShieldCheck className="h-4 w-4 text-primary" />
                                    Verified Skills Dashboard
                                </div>
                                <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                                    <Sparkles className="h-4 w-4 text-primary" />
                                    Portfolio Auto-Gen
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Focused Insight Panel */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-10 rounded-[3rem] bg-card border border-border shadow-2xl min-h-[500px] relative overflow-hidden dark:bg-[#0D111C] dark:border-white/5"
                            >
                                <div className="absolute top-0 right-0 p-12 opacity-[0.02]">
                                    {selectedTab === 'roadmap' && <LineChart className="h-64 w-64" />}
                                    {selectedTab === 'resume' && <FileText className="h-64 w-64" />}
                                    {selectedTab === 'interview' && <MessageSquare className="h-64 w-64" />}
                                </div>

                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-6">
                                            <Sparkles className="h-4 w-4" />
                                            AI Intelligence Feed
                                        </div>

                                        <h2 className="text-4xl md:text-5xl font-black text-foreground italic uppercase tracking-tighter mb-8 dark:bg-gradient-to-r dark:from-white dark:to-white/40 dark:bg-clip-text dark:text-transparent">
                                            {selectedTab === 'roadmap' && "Career Strategy Generator"}
                                            {selectedTab === 'resume' && "Professional Impact Optimizer"}
                                            {selectedTab === 'interview' && "Elite Performance Simulation"}
                                        </h2>

                                        <div className="space-y-6">
                                            {suggestions.length > 0 ? (
                                                suggestions.map((s, idx) => (
                                                    <div key={s.id} className="p-8 rounded-[2rem] bg-background border border-border hover:border-primary/30 transition-all dark:bg-black/40 dark:border-white/10">
                                                        <h4 className="text-xl font-black text-foreground uppercase italic tracking-tighter mb-2 dark:text-white">{s.content.title}</h4>
                                                        <p className="text-muted-foreground text-lg italic mb-6 leading-relaxed">
                                                            {s.content.message}
                                                        </p>
                                                        {s.content.actionLabel && (
                                                            <Button asChild className="rounded-xl bg-primary text-black font-black uppercase tracking-widest text-[10px] h-12 px-8 shadow-lg hover:shadow-primary/20">
                                                                <Link to={s.content.actionUrl || "#"}>
                                                                    {s.content.actionLabel}
                                                                    <ArrowRight className="h-4 w-4 ml-2" />
                                                                </Link>
                                                            </Button>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="space-y-6">
                                                    <div className="p-8 rounded-[2rem] bg-background border border-border dark:bg-black/40 dark:border-white/10">
                                                        <h4 className="text-xl font-black text-foreground uppercase italic tracking-tighter mb-2 dark:text-white">Initialize Your Intelligence Feed</h4>
                                                        <p className="text-muted-foreground text-lg italic mb-6">
                                                            Complete 2 courses or finish your first project to unlock persistent AI roadmaps and skill gap analysis.
                                                        </p>
                                                        <Button asChild variant="outline" className="rounded-xl border-border hover:bg-accent font-black uppercase tracking-widest text-[10px] h-12 dark:border-white/10 dark:hover:bg-white/5">
                                                            <Link to="/learning">GO TO LEARNING HUB</Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
                                        <div className="p-6 rounded-2xl bg-card border border-border flex items-center gap-4 group cursor-pointer hover:bg-accent transition-all dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10">
                                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                <Target className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black text-foreground uppercase tracking-tighter dark:text-white">Skill_Gap Detector</div>
                                                <div className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">Analyze weaknesses</div>
                                            </div>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-card border border-border flex items-center gap-4 group cursor-pointer hover:bg-accent transition-all dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10">
                                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                <Sparkles className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black text-foreground uppercase tracking-tighter dark:text-white">Portfolio_Gen</div>
                                                <div className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">Build brand 1-click</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AICopilotPage;
