import { AdminLayout } from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Bot, Zap, Brain, Search, ToggleLeft, ToggleRight, Save, Activity } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { LucideIcon } from "lucide-react";

// Moved outside component — stable reference, no recreation on render
const INITIAL_TOGGLES = [
    { id: "interview_coach", label: "AI Interview Coach", description: "Enable AI-powered mock interviews with real-time feedback", icon: Brain, enabled: true },
    { id: "semantic_search", label: "Semantic Search", description: "Vector-powered job and talent matching", icon: Search, enabled: true },
    { id: "career_recommendation", label: "Career Recommendations", description: "Auto-suggest career paths based on user skills", icon: Zap, enabled: false },
    { id: "readiness_auto", label: "Auto Readiness Calculation", description: "Recalculate readiness scores on user activity", icon: Activity, enabled: true },
] as const;

type ToggleId = (typeof INITIAL_TOGGLES)[number]["id"];

interface Toggle {
    id: ToggleId;
    label: string;
    description: string;
    icon: LucideIcon;
    enabled: boolean;
}

type WeightKey = "courses" | "projects" | "internship" | "activity";
const WEIGHT_KEYS: WeightKey[] = ["courses", "projects", "internship", "activity"];

const AIEngine = () => {
    const [toggles, setToggles] = useState<Toggle[]>([...INITIAL_TOGGLES]);
    const [weights, setWeights] = useState({ courses: 35, projects: 30, internship: 20, activity: 15 });
    const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");

    // Memoized so the badge doesn't re-render unnecessarily
    const totalWeight = useMemo(() => Object.values(weights).reduce((a, b) => a + b, 0), [weights]);

    const handleToggle = useCallback((id: ToggleId) => {
        setToggles(prev => prev.map(t => {
            if (t.id !== id) return t;
            toast.success(`${t.label} ${t.enabled ? "disabled" : "enabled"}`);
            return { ...t, enabled: !t.enabled };
        }));
    }, []);

    const handleWeightChange = useCallback((key: WeightKey, value: number) => {
        setWeights(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleSaveWeights = useCallback(() => {
        if (totalWeight !== 100) {
            toast.error(`Weights must sum to 100. Current: ${totalWeight}`);
            return;
        }
        toast.success("Readiness score logic updated ✅");
    }, [totalWeight]);

    return (
        <AdminLayout>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 text-primary uppercase text-[10px] font-black tracking-[0.4em] mb-3">
                            <Bot className="h-4 w-4" />
                            Neural Control Layer
                        </div>
                        <h1 className="text-4xl font-black text-foreground tracking-tighter italic uppercase">AI <span className="text-primary/40 dark:text-primary/60">ENGINE</span></h1>
                        <p className="text-muted-foreground mt-3 font-medium text-sm">Configure AI features, readiness logic, and model behavior.</p>
                    </div>
                    <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500/5 text-emerald-500 text-[10px] font-black tracking-[0.2em] border border-emerald-500/10">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        AI SYSTEMS ONLINE
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                    {/* Feature Toggles */}
                    <div className="bg-card border border-border rounded-[2rem] overflow-hidden">
                        <div className="p-6 border-b border-border">
                            <h2 className="font-black text-foreground uppercase tracking-widest text-sm">Feature Controls</h2>
                        </div>
                        <div className="divide-y divide-border/50">
                            {toggles.map(toggle => {
                                const Icon = toggle.icon;
                                return (
                                    <div key={toggle.id} className="p-6 flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className={cn("h-10 w-10 rounded-2xl flex items-center justify-center", toggle.enabled ? "bg-primary/10" : "bg-muted")}>
                                                <Icon className={cn("h-5 w-5", toggle.enabled ? "text-primary" : "text-muted-foreground")} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-foreground text-sm">{toggle.label}</div>
                                                <div className="text-xs text-muted-foreground mt-0.5">{toggle.description}</div>
                                            </div>
                                        </div>
                                        <button onClick={() => handleToggle(toggle.id)} className="shrink-0">
                                            {toggle.enabled
                                                ? <ToggleRight className="h-8 w-8 text-primary" />
                                                : <ToggleLeft className="h-8 w-8 text-muted-foreground" />}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Readiness Score Logic */}
                    <div className="bg-card border border-border rounded-[2rem] overflow-hidden">
                        <div className="p-6 border-b border-border flex items-center justify-between">
                            <h2 className="font-black text-foreground uppercase tracking-widest text-sm">Readiness Score Weights</h2>
                            <span className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full", totalWeight === 100 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500")}>
                                Total: {totalWeight}%
                            </span>
                        </div>
                        <div className="p-6 space-y-6">
                            {WEIGHT_KEYS.map(key => (
                                <div key={key}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{key}</span>
                                        <span className="text-sm font-black text-foreground">{weights[key]}%</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="range"
                                            min={0}
                                            max={100}
                                            value={weights[key]}
                                            onChange={e => handleWeightChange(key, Number(e.target.value))}
                                            className="flex-1 accent-primary"
                                        />
                                        <div className="w-12 h-8 bg-muted rounded-lg flex items-center justify-center text-xs font-black text-foreground">{weights[key]}</div>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-muted mt-2 overflow-hidden">
                                        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${weights[key]}%` }} />
                                    </div>
                                </div>
                            ))}
                            <button onClick={handleSaveWeights} className="w-full h-12 rounded-2xl bg-primary text-black font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all mt-4">
                                <Save className="h-4 w-4" /> Save Logic
                            </button>
                        </div>
                    </div>
                </div>

                {/* Interview Difficulty */}
                <div className="bg-card border border-border rounded-[2rem] p-6 mb-6">
                    <h2 className="font-black text-foreground uppercase tracking-widest text-sm mb-4">Interview Coach Difficulty</h2>
                    <div className="flex gap-3">
                        {(["easy", "medium", "hard"] as const).map(d => (
                            <button
                                key={d}
                                onClick={() => setDifficulty(d)}
                                className={cn(
                                    "flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                    difficulty === d
                                        ? d === "easy" ? "bg-emerald-500 text-white" : d === "medium" ? "bg-yellow-500 text-white" : "bg-red-500 text-white"
                                        : "bg-muted text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                {/* AI Usage Log — placeholder until real AI logging table exists */}
                <div className="bg-card border border-border rounded-[2rem] overflow-hidden">
                    <div className="p-6 border-b border-border flex items-center justify-between">
                        <h2 className="font-black text-foreground uppercase tracking-widest text-sm">AI Usage Log</h2>
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3 py-1 rounded-full bg-muted">Logging table coming soon</span>
                    </div>
                    <div className="py-16 flex flex-col items-center gap-4 text-muted-foreground">
                        <Bot className="h-10 w-10 opacity-20" />
                        <p className="text-[10px] font-black uppercase tracking-widest">AI request logs will appear here once the logging pipeline is active.</p>
                    </div>
                </div>
            </motion.div>
        </AdminLayout>
    );
};

export default AIEngine;
