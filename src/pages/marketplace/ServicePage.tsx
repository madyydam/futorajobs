import { Layout } from "@/components/layout/Layout";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Star,
    Clock,
    MessageSquare,
    ShieldCheck,
    CheckCircle2,
    Share2,
    Bookmark,
    Zap,
    AlertCircle,
    Package,
    TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/hooks/useChatStore";
import { useFreelance } from "@/hooks/useFreelance";
import { Skeleton } from "@/components/ui/skeleton";

const ServicePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { startNewChat } = useChatStore();
    const { useService } = useFreelance();
    const { data: service, isLoading } = useService(id);

    const handleContact = () => {
        if (!service?.freelancer) return;

        startNewChat({
            id: service.freelancer.id,
            name: service.freelancer.full_name || "Freelancer",
            role: service.freelancer.tagline || "Elite GIG",
            avatar: service.freelancer.avatar_url || `https://ui-avatars.com/api/?name=${service.freelancer.full_name}`,
            lastMessage: "Interested in your gig",
            time: "Just now",
            unread: 0,
            online: true
        }, `Hi ${service.freelancer.full_name}, I'm interested in your gig "${service.title}". Can we discuss requirements?`);
        navigate("/chat");
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
                    <Skeleton className="h-10 w-32 bg-white/5" />
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-8">
                            <Skeleton className="h-[400px] w-full rounded-[2.5rem] bg-white/5" />
                            <Skeleton className="h-20 w-3/4 bg-white/5" />
                        </div>
                        <Skeleton className="h-[500px] w-full rounded-[2.5rem] bg-white/5" />
                    </div>
                </div>
            </Layout>
        );
    }

    if (!service) {
        return (
            <Layout>
                <div className="max-w-7xl mx-auto px-6 py-32 text-center">
                    <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">Service Not Found</h1>
                    <Button asChild variant="outline" className="rounded-xl border-white/10">
                        <Link to="/freelancing">BACK TO MARKETPLACE</Link>
                    </Button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 py-12 relative">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full" />

                {/* Navigation */}
                <div className="flex items-center justify-between mb-10">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="rounded-xl hover:bg-white/5 group text-[10px] font-black tracking-[0.2em] uppercase"
                    >
                        <ArrowLeft className="h-5 w-5 mr-4 group-hover:-translate-x-1 transition-transform" />
                        PREVIOUS_LOC
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="rounded-xl border-white/10 hover:bg-white/5 h-12 w-12 group">
                            <Share2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-xl border-white/10 hover:bg-white/5 h-12 w-12 group">
                            <Bookmark className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        </Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left: Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-[9px] font-black uppercase tracking-[0.2em] text-primary">
                                    {service.category?.name || "Premium GIG"}
                                </div>
                                <div className="h-px w-12 bg-white/10" />
                                <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">GIG_ID: {service.id.slice(0, 8)}</div>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.9] mb-12">
                                {service.title}
                            </h1>

                            {/* Portfolio Banner */}
                            <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900 mb-16 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] group">
                                {service.portfolio_urls?.[0] ? (
                                    <img
                                        src={service.portfolio_urls[0]}
                                        alt="Portfolio"
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-[#0B0F1A]">
                                        <TrendingUp className="h-20 w-20 text-primary/10" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-8 right-8">
                                    <div className="px-6 py-2.5 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-white">
                                        VERIFIED_WORK
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-8 bg-[#0B0F1A]/50 p-10 rounded-[3rem] border border-white/5 relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 p-10 opacity-[0.02]">
                                    <Package className="h-40 w-40" />
                                </div>
                                <h3 className="text-3xl font-black text-primary uppercase italic tracking-tighter flex items-center gap-3">
                                    <div className="h-8 w-1.5 bg-primary rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                                    Scope of Work
                                </h3>
                                <p className="text-white/80 text-xl font-medium leading-relaxed whitespace-pre-line italic">
                                    {service.description}
                                </p>
                            </div>
                        </motion.div>

                        {/* Freelancer Profile Card */}
                        <div className="p-10 rounded-[3rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                                <ShieldCheck className="h-48 w-48 text-primary" />
                            </div>

                            <div className="flex flex-col md:flex-row gap-10 relative z-10">
                                <div className="relative">
                                    <Avatar className="h-28 w-28 border-4 border-[#121826] shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                        <AvatarImage src={service.freelancer?.avatar_url} />
                                        <AvatarFallback className="bg-slate-800 text-2xl font-black">{service.freelancer?.full_name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary text-black flex items-center justify-center shadow-lg border-4 border-[#121826]">
                                        <CheckCircle2 className="h-4 w-4" />
                                    </div>
                                </div>

                                <div className="flex-1 space-y-5">
                                    <div>
                                        <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-1">
                                            {service.freelancer?.full_name}
                                        </h3>
                                        <div className="text-primary font-black text-xs uppercase tracking-[0.2em]">{service.freelancer?.tagline || "Elite Professional"}</div>
                                    </div>
                                    <p className="text-muted-foreground font-medium text-lg leading-relaxed max-w-xl italic">
                                        {service.freelancer?.bio}
                                    </p>
                                    <div className="flex flex-wrap gap-4 pt-4">
                                        <div className="px-6 py-4 rounded-2xl bg-black/60 border border-white/5 text-center shadow-inner">
                                            <div className="text-[9px] font-black text-muted-foreground uppercase mb-1 tracking-widest">Exp_Level</div>
                                            <div className="text-white font-black italic">{service.freelancer?.experience_years || 0} Years</div>
                                        </div>
                                        <div className="px-6 py-4 rounded-2xl bg-black/60 border border-white/5 text-center shadow-inner">
                                            <div className="text-[9px] font-black text-muted-foreground uppercase mb-1 tracking-widest">Base_Rate</div>
                                            <div className="text-primary font-black italic">₹{service.freelancer?.hourly_rate || 0}/hr</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Gig Features */}
                        <div className="grid md:grid-cols-2 gap-6 pb-12">
                            {[
                                { icon: Clock, title: "SLA Response", desc: "Under 2 hours" },
                                { icon: ShieldCheck, title: "Escrow Protection", desc: "100% Secure Funds" },
                                { icon: Zap, title: "Elite Execution", desc: "Highest Standard" },
                                { icon: Package, title: "Express Delivery", desc: service.delivery_time || "Variable" }
                            ].map((f, i) => (
                                <div key={i} className="p-8 rounded-[2rem] bg-[#0D111C] border border-white/5 flex items-center gap-6 group hover:border-primary/20 transition-all">
                                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                                        <f.icon className="h-7 w-7 text-primary group-hover:text-black" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-black text-white uppercase tracking-tighter mb-0.5">{f.title}</div>
                                        <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{f.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Pricing Card */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-10 rounded-[3.5rem] bg-[#0D111C] border border-primary/20 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] sticky top-24"
                        >
                            <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/10">
                                <div className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">ELITE_TIER</div>
                                <div className="flex items-baseline gap-1 font-black text-white text-4xl tabular-nums italic tracking-tighter">
                                    <span className="text-xl">₹</span>
                                    {service.price}
                                    {service.price_type === 'hourly' && <span className="text-xs uppercase text-white/40 ml-1">/HR</span>}
                                </div>
                            </div>

                            <div className="space-y-6 mb-10">
                                <h4 className="text-xl font-black text-white uppercase tracking-tighter italic">Package Manifest</h4>
                                <div className="space-y-4">
                                    {[
                                        "Professional Grade Execution",
                                        "Futora Certified Quality",
                                        service.delivery_time ? `${service.delivery_time} Delivery` : "Standard Delivery",
                                        "Complete Source Assets",
                                        "24/7 Priority Support"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                                                <CheckCircle2 className="h-3 w-3 text-primary" />
                                            </div>
                                            <span className="text-sm text-white/80 font-bold italic">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Button className="w-full h-16 rounded-[2rem] bg-primary text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-primary/90 shadow-[0_0_40px_rgba(16,185,129,0.3)] active:scale-95 transition-all">
                                    <Zap className="h-4 w-4 mr-3 fill-black" />
                                    HIRE_NOW
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleContact}
                                    className="w-full h-16 rounded-[2rem] border-white/10 bg-white/5 hover:bg-white/10 font-black uppercase tracking-[0.2em] text-[10px] text-white/60 hover:text-white"
                                >
                                    <MessageSquare className="h-4 w-4 mr-3" />
                                    ENGAGE_COMMS
                                </Button>
                            </div>

                            <div className="mt-8 text-center">
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 border border-white/5 text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                                    <ShieldCheck className="h-3 w-3 text-primary" />
                                    Futora Escrow Secured
                                </div>
                            </div>
                        </motion.div>

                        <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-white/5 flex gap-5 shadow-inner">
                            <AlertCircle className="h-6 w-6 text-primary shrink-0" />
                            <div>
                                <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mb-1">Security_Notice</p>
                                <p className="text-[10px] text-muted-foreground leading-relaxed font-bold italic">
                                    Quantum-encrypted payments are only guaranteed when processed through the Futora platform core.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ServicePage;
