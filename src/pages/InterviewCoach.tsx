
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    MessageSquare,
    Send,
    Bot,
    User,
    ArrowLeft,
    RefreshCw,
    Target,
    Brain,
    ShieldCheck,
    Zap,
    Code,
    History,
    ChevronRight,
    Terminal,
    Lock
} from "lucide-react";
import { useState, useRef, useEffect, useCallback, memo } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useInterviewController } from "@/hooks/useInterviewController";
import { InterviewRole, InterviewType, InterviewSelection, InterviewDifficulty } from "@/types/interview";
import { Progress } from "@/components/ui/progress";

const InterviewCoach = () => {
    const navigate = useNavigate();
    const {
        session,
        rounds,
        currentRoundIndex,
        currentQuestion,
        isLoading,
        isInterviewing,
        startInterview,
        submitAnswer
    } = useInterviewController();

    const [selection, setSelection] = useState<InterviewSelection>({
        role: 'frontend',
        difficulty: 'intermediate',
        types: ['technical', 'behavioral']
    });

    const [inputValue, setInputValue] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [currentQuestion, isLoading]);

    const handleSend = () => {
        if (!inputValue.trim()) return;
        submitAnswer(inputValue);
        setInputValue("");
    };

    if (!isInterviewing) {
        return (
            <Layout>
                <div className="max-w-6xl mx-auto px-6 py-12 relative">
                    {/* Background Decor */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full animate-pulse" />

                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                                <Brain className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Simulation Hub v3.0</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-foreground italic uppercase tracking-tighter leading-[0.8]">
                            INTERVIEW <span className="text-primary/40 dark:text-primary/20">SIMULATOR</span>
                        </h1>
                        <p className="text-muted-foreground font-bold italic mt-4 max-w-xl text-lg">
                            Experience hyper-realistic startup interviews. Dynamic AI questioning, live coding evaluation, and instant performance scoring.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Selection Matrix */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Role Select */}
                            <div className="p-8 rounded-[2.5rem] bg-card border border-border">
                                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6">Select Your Target_Role</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {(['frontend', 'backend', 'fullstack', 'ai', 'design', 'growth', 'product', 'mobile'] as InterviewRole[]).map((role) => (
                                        <button
                                            key={role}
                                            onClick={() => setSelection({ ...selection, role })}
                                            className={cn(
                                                "p-4 rounded-2xl border font-black text-[10px] uppercase tracking-tighter transition-all",
                                                selection.role === role
                                                    ? "bg-primary border-primary text-primary-foreground shadow-lg scale-105"
                                                    : "bg-background border-border text-muted-foreground hover:bg-accent"
                                            )}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Round Types */}
                            <div className="p-8 rounded-[2.5rem] bg-card border border-border">
                                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6">Execution_Modules (Select multiple)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { id: 'technical', label: 'Technical Depth', icon: Terminal },
                                        { id: 'coding', label: 'Live Coding', icon: Code },
                                        { id: 'behavioral', label: 'HR & Culture', icon: Target },
                                        { id: 'system_design', label: 'System Design', icon: ShieldCheck },
                                        { id: 'quiz', label: 'Rapid MCQ', icon: Zap },
                                    ].map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => {
                                                const types = selection.types.includes(type.id as InterviewType)
                                                    ? selection.types.filter(t => t !== type.id)
                                                    : [...selection.types, type.id as InterviewType];
                                                setSelection({ ...selection, types });
                                            }}
                                            className={cn(
                                                "flex items-center gap-4 p-5 rounded-2xl border font-black text-[10px] uppercase tracking-widest transition-all",
                                                selection.types.includes(type.id as InterviewType)
                                                    ? "bg-primary/10 border-primary text-primary shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                                                    : "bg-background border-border text-muted-foreground hover:bg-accent"
                                            )}
                                        >
                                            <type.icon className="h-4 w-4" />
                                            {type.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    size="lg"
                                    onClick={() => startInterview(selection)}
                                    disabled={isLoading || selection.types.length === 0}
                                    className="h-16 flex-1 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-widest text-[11px] shadow-xl hover:shadow-primary/20"
                                >
                                    {isLoading ? "INITIALIZING_SYSTEM..." : "START_MISSION"}
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Recent Performance Log */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="p-8 rounded-[2.5rem] bg-background border border-border h-full flex flex-col">
                                <div className="flex items-center gap-3 mb-8">
                                    <History className="h-5 w-5 text-primary" />
                                    <h3 className="text-xs font-black uppercase tracking-widest">Performance_Logs</h3>
                                </div>

                                <div className="space-y-6 flex-1">
                                    <div className="p-6 rounded-2xl bg-card border border-border">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-[10px] font-black text-primary uppercase bg-primary/10 px-2 py-1 rounded">Last Session</span>
                                            <span className="text-xl font-black italic">82%</span>
                                        </div>
                                        <div className="text-[11px] font-bold text-foreground mb-1">Frontend Engineering</div>
                                        <div className="text-[9px] text-muted-foreground lowercase opacity-60">24 Feb 2026 • Advanced Difficulty</div>
                                    </div>

                                    <div className="pt-4">
                                        <h4 className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-4">Meta_Readiness Status</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-[10px] uppercase font-black mb-1">
                                                    <span>Technical Depth</span>
                                                    <span>75%</span>
                                                </div>
                                                <Progress value={75} className="h-1 bg-muted" />
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-[10px] uppercase font-black mb-1">
                                                    <span>Communication</span>
                                                    <span>92%</span>
                                                </div>
                                                <Progress value={92} className="h-1 bg-muted" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Button variant="outline" className="w-full mt-8 rounded-xl border-border hover:bg-accent font-black text-[10px] uppercase tracking-widest">
                                    View Detailed Analytics
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    // Active Interview UI
    return (
        <Layout>
            <div className="max-w-7xl mx-auto h-[calc(100vh-6rem)] grid lg:grid-cols-4 gap-6 p-6">

                {/* Global Interview Status (Sidebar) */}
                <div className="lg:col-span-1 space-y-4 overflow-y-auto pr-2">
                    <div className="p-6 rounded-[2rem] bg-card border border-border shadow-xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                <Bot className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-primary uppercase">Interviewer_AI</div>
                                <div className="text-sm font-black italic uppercase">Senior Evaluator</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {rounds.map((round, idx) => (
                                <div
                                    key={round.id}
                                    className={cn(
                                        "p-4 rounded-xl border transition-all flex items-center justify-between",
                                        idx === currentRoundIndex
                                            ? "bg-primary border-primary text-primary-foreground shadow-lg"
                                            : round.status === 'completed'
                                                ? "bg-primary/10 border-primary/30 text-primary opacity-60"
                                                : "bg-background border-border text-muted-foreground"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-black opacity-40">0{idx + 1}</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest">{round.label}</span>
                                    </div>
                                    {round.status === 'completed' && <ShieldCheck className="h-4 w-4" />}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 rounded-[2rem] bg-background border border-border">
                        <h4 className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">Session Context</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-[10px] font-bold">
                                <span className="text-muted-foreground">Difficulty</span>
                                <span className="uppercase text-primary">{session?.difficulty}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-bold">
                                <span className="text-muted-foreground">Target Role</span>
                                <span className="uppercase text-primary">{session?.role}</span>
                            </div>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        onClick={() => navigate(0)}
                        className="w-full rounded-xl text-destructive hover:bg-destructive/10 text-[10px] font-black uppercase"
                    >
                        Terminate Simulation
                    </Button>
                </div>

                {/* Main Interview Environment */}
                <div className="lg:col-span-3 flex flex-col gap-6 h-full">
                    {/* Interaction Hub */}
                    <div className="flex-1 bg-card border border-border rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col p-10">
                        {/* Background Cyber Pattern */}
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12">
                            <Zap className="h-64 w-64 text-primary" />
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-8">
                                <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Live_Evaluation in progress</span>
                            </div>

                            <AnimatePresence mode="wait">
                                {currentQuestion && !isLoading ? (
                                    <motion.div
                                        key={currentQuestion.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-12"
                                    >
                                        <div className="space-y-4">
                                            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Question_Payload:</div>
                                            <h2 className="text-3xl md:text-5xl font-black text-foreground italic uppercase tracking-tighter leading-[1.1]">
                                                {currentQuestion.question_text}
                                            </h2>
                                        </div>

                                        {rounds[currentRoundIndex]?.type === 'coding' && (
                                            <div className="p-6 rounded-2xl bg-black border border-white/10 font-mono text-sm text-primary/80">
                                                <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2 text-[10px] font-black text-muted-foreground uppercase">
                                                    <Code className="h-3 w-3" /> Execution Context: JavaScript
                                                </div>
                                                <pre className="opacity-80">
                                                    {`function solve(input) {\n  // Your implementation here\n  return result;\n}`}
                                                </pre>
                                            </div>
                                        )}
                                    </motion.div>
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                                        <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                                        <div className="text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">Analyzing_Context & Generating Question...</div>
                                    </div>
                                )}
                            </AnimatePresence>

                            {/* Response Input */}
                            <div className="mt-auto pt-10">
                                <div className="relative">
                                    <textarea
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSend();
                                            }
                                        }}
                                        placeholder="Transmit your response..."
                                        className="w-full bg-background border border-border rounded-[2.5rem] py-8 pl-10 pr-20 text-lg font-bold focus:outline-none focus:border-primary/50 transition-all shadow-xl resize-none min-h-[140px]"
                                    />
                                    <Button
                                        size="icon"
                                        onClick={handleSend}
                                        disabled={!inputValue.trim() || isLoading}
                                        className="absolute right-4 bottom-4 h-16 w-16 rounded-[2rem] bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                    >
                                        <Send className="h-6 w-6" />
                                    </Button>
                                </div>
                                <div className="mt-4 flex items-center justify-center gap-6">
                                    <div className="flex items-center gap-2 text-[9px] font-black uppercase text-muted-foreground tracking-widest">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        Secure Channel Enabled
                                    </div>
                                    <div className="flex items-center gap-2 text-[9px] font-black uppercase text-muted-foreground tracking-widest">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        AI Evaluation Active
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default InterviewCoach;
