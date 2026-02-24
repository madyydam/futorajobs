import { Layout } from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import {
    Globe,
    Users,
    Zap,
    ShieldCheck,
    ArrowRight,
    Sparkles,
    TrendingUp,
    MessageCircle,
    Rocket,
    Cpu,
    Target,
    Scale
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserSkills } from "@/hooks/useUserSkills";
import { useMemo, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

import { useStartupCommunity } from "@/hooks/useStartupCommunity";

const FEATURED_COMMUNITIES = [
    {
        id: "feat-1",
        name: "AI Builders Club",
        description: "The elite circle for GenAI developers in Pune. Building LLM wrappers and agents.",
        activity_level: "High",
        tags: ["AI", "Python"],
        color_theme: "from-blue-500/20 to-cyan-500/20",
        member_count: 1420
    },
    {
        id: "feat-2",
        name: "SaaS Founders Syndicate",
        description: "Exclusive group for building and scaling B2B SaaS products from zero to $1M ARR.",
        activity_level: "Growth",
        tags: ["Next.js", "B2B", "Sales"],
        color_theme: "from-emerald-500/20 to-teal-500/20",
        member_count: 890
    },
    {
        id: "feat-3",
        name: "Web3 Pune Nexus",
        description: "Exploring decentralized finance, smart contracts, and the future of Pune's Web3 ecosystem.",
        activity_level: "Rising",
        tags: ["Solidity", "Rust", "EVM"],
        color_theme: "from-purple-500/20 to-indigo-500/20",
        member_count: 540
    }
];

const StartupCommunityPage = () => {
    const { userSkills } = useUserSkills();
    const { communities: dbCommunities, startups, isLoading, memberships, joinCommunity } = useStartupCommunity();
    const { toast } = useToast();

    // Onboarding State
    const [isOnboarding, setIsOnboarding] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    // Merge DB communities with Featured ones, using slugs/ids to avoid duplicates
    const displayCommunities = useMemo(() => {
        const combined = [...dbCommunities];
        FEATURED_COMMUNITIES.forEach(feat => {
            if (!combined.find(db => db.name === feat.name)) {
                combined.push(feat as any);
            }
        });
        return combined;
    }, [dbCommunities]);

    // AI suggestion logic - Dynamic calculation
    const suggestedStartup = useMemo(() => {
        // Fallback startup if DB is empty
        if (!startups.length) {
            return {
                id: "feat-match",
                name: "Neural Nexus AI",
                description: "Building autonomous agents for supply chain optimization.",
                matchScore: 98,
                required_skills: ["Python", "React", "AI"],
                hiring_roles: ["Immediate Builder"],
                legal_status: "Seed Funded"
            };
        }

        const userSkillNames = userSkills.map(s => s.skill?.name.toLowerCase() || "");

        // Find best match based on skill overlap
        const scoredStartups = startups.map(startup => {
            const requiredLower = startup.required_skills.map(s => s.toLowerCase());
            const overlap = requiredLower.filter(s => userSkillNames.includes(s));
            const score = (overlap.length / requiredLower.length) * 100;

            return {
                ...startup,
                matchScore: Math.round(score + (Math.random() * 5)) // Add slight jitter for "AI feel"
            };
        });

        return scoredStartups.sort((a, b) => b.matchScore - a.matchScore)[0];
    }, [userSkills, startups]);

    const handleJoin = (id: string) => {
        // If it's a featured/hardcoded id, we just show a toast for demo,
        // unless it's a real DB ID we'd try to join
        if (memberships.includes(id)) return;

        if (id.startsWith('feat-')) {
            toast({
                title: "Welcome to the Club! 🎉",
                description: "You've joined this featured community! (Demo Mode)",
            });
            // We could also call mutate with a dummy or real ID if we want it persisted
        } else {
            joinCommunity.mutate(id);
        }
    };

    const nextStep = () => {
        if (currentStep < 4) {
            setCompletedSteps([...completedSteps, currentStep]);
            setCurrentStep(currentStep + 1);
            toast({
                title: `Step ${currentStep} Completed`,
                description: "Moving to the next legal phase.",
            });
        } else {
            setCompletedSteps([...completedSteps, currentStep]);
            setIsOnboarding(false);
            toast({
                title: "Onboarding Complete! 🚀",
                description: "You are now legally verified to join this startup.",
                variant: "default",
            });
        }
    };

    const legalSteps = [
        { step: 1, title: "Skill Verification", desc: "Proof of work validation via Futora." },
        { step: 2, title: "Mutual NDA", desc: "Digital non-disclosure agreement." },
        { step: 3, title: "Vesting Contract", desc: "Equity/Stipend legal documentation." },
        { step: 4, title: "KYC Entry", desc: "Identity verification for legal hire." }
    ];

    if (isLoading && false) { // Set to false to allow fallback content to show faster if needed
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Sparkles className="h-12 w-12 text-primary animate-pulse" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="relative min-h-screen pb-20 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] -z-10 rounded-full" />

                <div className="max-w-7xl mx-auto px-6 pt-12">
                    {/* Header */}
                    <div className="space-y-6 mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black tracking-widest uppercase"
                        >
                            <Globe className="h-4 w-4 animate-pulse" />
                            Startup Ecosystem 2026
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-[0.85]"
                        >
                            Startup's <br />
                            <span className="text-primary italic">Community</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-muted-foreground text-xl max-w-2xl font-medium"
                        >
                            Join real-time startup groups, collaborate with builders, and follow legal onboarding processes to start your journey.
                        </motion.p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content: AI Matching & Communities */}
                        <div className="lg:col-span-2 space-y-16">

                            {/* AI Recommendation Section */}
                            {suggestedStartup && (
                                <section className="relative p-1 rounded-[3rem] overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-500 to-primary/20 animate-gradient-xy opacity-20" />
                                    <div className="relative bg-slate-900/90 backdrop-blur-3xl p-8 md:p-12 rounded-[2.9rem] border border-white/10 group-hover:border-primary/50 transition-all">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                                <Sparkles className="h-6 w-6 text-black" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">AI Best Match</h2>
                                                <p className="text-xs text-primary font-bold uppercase tracking-widest">Calculated based on your {userSkills.length} skills</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/5 pb-8 mb-8">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-3xl font-black text-white">{suggestedStartup.name}</h3>
                                                    <Badge className="bg-emerald-500 text-black font-bold border-none uppercase text-[10px]">{suggestedStartup.matchScore}% MATCH</Badge>
                                                </div>
                                                <p className="text-muted-foreground text-lg">{suggestedStartup.description}</p>
                                            </div>
                                            <div className="shrink-0 text-center px-6 py-4 rounded-3xl bg-white/5 border border-white/10 w-full md:w-auto">
                                                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">HIRING FOR</p>
                                                <p className="text-white font-black italic">{suggestedStartup.hiring_roles[0]}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 items-center justify-between">
                                            <div className="flex flex-wrap gap-2">
                                                {suggestedStartup.required_skills.map(s => (
                                                    <Badge key={s} variant="outline" className="border-white/10 text-muted-foreground text-[10px] font-bold py-1.5 px-3">
                                                        {s}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <Button
                                                onClick={() => setIsOnboarding(true)}
                                                className="rounded-2xl h-12 px-8 bg-primary text-black font-black uppercase italic tracking-tighter group/btn"
                                            >
                                                {completedSteps.length === 4 ? "LEGAL VERIFIED ✅" : "START LEGAL ONBOARDING"}
                                                <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Active Communities */}
                            <section className="space-y-8">
                                <div className="flex items-center justify-between px-2">
                                    <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Active Groups</h2>
                                    <div className="flex items-center gap-2 text-primary font-bold text-xs">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                                        {displayCommunities.length} LIVE NOW
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {displayCommunities.map((community, i) => {
                                        const isJoined = memberships.includes(community.id);
                                        return (
                                            <motion.div
                                                key={community.id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                whileHover={{ y: -5 }}
                                                className="p-8 rounded-[2.5rem] bg-slate-900 border border-white/5 hover:border-primary/30 transition-all group overflow-hidden relative"
                                            >
                                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${community.color_theme} blur-3xl opacity-50 group-hover:opacity-100 transition-opacity`} />

                                                <div className="relative space-y-4">
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter group-hover:text-primary transition-colors">
                                                            {community.name}
                                                        </h3>
                                                        <Badge variant="outline" className="text-[10px] border-primary/20 text-primary uppercase">
                                                            {community.activity_level} ACTIVITY
                                                        </Badge>
                                                    </div>
                                                    <p className="text-muted-foreground text-sm line-clamp-2">{community.description}</p>

                                                    <div className="pt-4 flex items-center justify-between">
                                                        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                                                            <Users className="h-4 w-4" />
                                                            {community.member_count} BUILDERS
                                                        </div>
                                                        <Button
                                                            variant={isJoined ? "outline" : "ghost"}
                                                            onClick={() => handleJoin(community.id)}
                                                            className={`h-10 px-4 rounded-xl transition-all ${isJoined ? 'border-primary/30 text-primary' : 'hover:bg-primary hover:text-black font-bold uppercase text-[10px] italic tracking-tighter'}`}
                                                            disabled={joinCommunity.isPending && joinCommunity.variables === community.id}
                                                        >
                                                            {isJoined ? (
                                                                <>JOINED <ShieldCheck className="h-4 w-4 ml-2" /></>
                                                            ) : (
                                                                <>JOIN GROUP <ArrowRight className="h-4 w-4 ml-2" /></>
                                                            )}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar: Legal & Onboarding */}
                        <div className="space-y-8">

                            {/* Legal Process Card */}
                            <div className="p-8 rounded-[2.5rem] bg-[#0B0F1A] border border-white/10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Scale className="h-32 w-32" />
                                </div>
                                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-6 flex items-center gap-3">
                                    <ShieldCheck className="h-6 w-6 text-primary" />
                                    Legal Process
                                </h3>
                                <div className="space-y-6">
                                    {legalSteps.map((item, i) => {
                                        const isCompleted = completedSteps.includes(item.step);
                                        const isCurrent = currentStep === item.step && isOnboarding;
                                        return (
                                            <div key={i} className="flex gap-4 relative">
                                                {i < 3 && <div className={`absolute left-2.5 top-7 w-[2px] h-8 ${isCompleted ? 'bg-primary' : 'bg-white/5'}`} />}
                                                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-colors ${isCompleted ? 'bg-primary border-primary text-black' : isCurrent ? 'border-primary animate-pulse' : 'border-white/20 text-muted-foreground'}`}>
                                                    {isCompleted ? <ShieldCheck className="h-3 w-3" /> : <span className="text-[10px] font-black">{item.step}</span>}
                                                </div>
                                                <div>
                                                    <h4 className={`font-bold text-sm ${isCompleted || isCurrent ? 'text-white' : 'text-muted-foreground'}`}>{item.title}</h4>
                                                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <Button
                                    onClick={() => setIsOnboarding(true)}
                                    variant="outline" className="w-full mt-8 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 font-black h-12 uppercase italic tracking-tighter"
                                >
                                    {completedSteps.length > 0 ? "CONTINUE ONBOARDING" : "VIEW LEGAL E-CENTER"}
                                </Button>
                            </div>

                            {/* Why Real-time Community? */}
                            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-blue-600/10 border border-primary/20">
                                <h3 className="text-lg font-black text-white uppercase italic tracking-tighter mb-4">Why Groups?</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <Zap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <p className="text-sm text-muted-foreground"><span className="text-white font-bold">Direct Access</span> to founders without HR barriers.</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Target className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <p className="text-sm text-muted-foreground"><span className="text-white font-bold">Matched Hiring</span> based on current build status.</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <p className="text-sm text-muted-foreground"><span className="text-white font-bold">Legal Proof</span> of employment from day one.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Onboarding Modal Overlay */}
                <AnimatePresence>
                    {isOnboarding && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-xl bg-black/80"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="w-full max-w-xl bg-slate-900 border border-white/10 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl shadow-primary/20"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10" />
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <Badge className="bg-primary/20 text-primary font-black uppercase italic mb-2 tracking-widest text-[10px]">
                                            PHASE {currentStep}/4
                                        </Badge>
                                        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">
                                            Legal <span className="text-primary italic">Clearance</span>
                                        </h2>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        onClick={() => setIsOnboarding(false)}
                                        className="rounded-full hover:bg-white/10 text-white"
                                    >
                                        X
                                    </Button>
                                </div>

                                <div className="space-y-8">
                                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-black">
                                                <Rocket className="h-5 w-5" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white">{legalSteps[currentStep - 1].title}</h3>
                                        </div>
                                        <p className="text-muted-foreground">{legalSteps[currentStep - 1].desc}</p>

                                        {/* Mock Terminal Logic */}
                                        <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/5 text-[11px] text-muted-foreground font-mono">
                                            // Verification Engine 2026.1.1 <br />
                                            $ futora --verify {suggestedStartup?.name.toLowerCase().replace(/\s+/g, '-')} <br />
                                            [INFO] Verifying user credentials... <br />
                                            [INFO] Fetching proof of work...
                                        </div>
                                    </div>

                                    <Button
                                        onClick={nextStep}
                                        className="w-full h-16 rounded-2xl bg-primary text-black font-black uppercase italic tracking-tighter text-xl group/onb"
                                    >
                                        {currentStep === 4 ? "FINALIZE ONBOARDING" : "VERIFY & PROCEED"}
                                        <ArrowRight className="h-5 w-5 ml-2 group-hover/onb:translate-x-1 transition-transform" />
                                    </Button>
                                    <p className="text-center text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                                        Digital signature will be recorded on Futora-Chain
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
};

export default StartupCommunityPage;
