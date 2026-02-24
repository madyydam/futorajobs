import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, Link } from "react-router-dom";
import { MessageSquare, Star, Clock, CheckCircle2, ArrowUpRight, TrendingUp } from "lucide-react";
import { FreelanceService } from "@/types/marketplace";
import { useChatStore } from "@/hooks/useChatStore";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
    service: FreelanceService;
    index?: number;
}

export const ServiceCard = ({ service, index = 0 }: ServiceCardProps) => {
    const navigate = useNavigate();
    const { startNewChat } = useChatStore();

    const handleMessage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (service.freelancer) {
            startNewChat({
                id: service.freelancer.id,
                name: service.freelancer.full_name || "Freelancer",
                role: service.freelancer.tagline || "Service Provider",
                avatar: service.freelancer.avatar_url || `https://ui-avatars.com/api/?name=${service.freelancer.full_name}`,
                lastMessage: "Interested in your gig",
                time: "Just now",
                unread: 0,
                online: true
            }, `Hi ${service.freelancer.full_name}, I saw your gig "${service.title}" and I'm interested. Can we discuss?`);
            navigate("/chat");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-card border border-border rounded-[2rem] overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-xl flex flex-col h-full dark:bg-[#0B0F1A] dark:border-white/5"
        >
            {/* Top Indicator */}
            <div className="absolute top-4 left-4 z-10">
                <div className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-primary">
                    {service.category?.name || "Premium GIG"}
                </div>
            </div>

            {/* Image Section */}
            <Link to={`/freelancing/service/${service.id}`} className="block relative aspect-[16/10] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-[1] opacity-60 group-hover:opacity-40 transition-opacity dark:from-[#0B0F1A]" />
                {service.portfolio_urls?.[0] ? (
                    <img
                        src={service.portfolio_urls[0]}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                        <TrendingUp className="h-12 w-12 text-primary/20" />
                    </div>
                )}

                {/* Overlay Action */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="h-14 w-14 rounded-full bg-primary text-black flex items-center justify-center shadow-xl shadow-primary/40">
                        <ArrowUpRight className="h-6 w-6 stroke-[3px]" />
                    </div>
                </div>
            </Link>

            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                    <div className="relative">
                        <Avatar className="h-10 w-10 border border-border ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                            <AvatarImage src={service.freelancer?.avatar_url} />
                            <AvatarFallback className="bg-muted text-xs font-black">{service.freelancer?.full_name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-background border border-border flex items-center justify-center">
                            <CheckCircle2 className="h-2.5 w-2.5 text-primary" />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-black text-foreground truncate tracking-tight">{service.freelancer?.full_name}</div>
                        <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{service.freelancer?.tagline || "Verified Pro"}</div>
                    </div>
                </div>

                <Link to={`/freelancing/service/${service.id}`}>
                    <h3 className="text-xl font-black text-foreground mb-4 line-clamp-2 leading-[1.1] italic uppercase tracking-tighter group-hover:text-primary transition-colors decoration-primary underline-offset-4 decoration-0 group-hover:decoration-2">
                        {service.title}
                    </h3>
                </Link>

                <p className="text-xs text-muted-foreground mb-6 line-clamp-2 font-medium leading-relaxed italic">
                    {service.description}
                </p>

                <div className="mt-auto space-y-5">
                    <div className="flex items-center justify-between pb-4 border-b border-border">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-black uppercase tracking-tighter">
                            <Clock className="h-4 w-4 text-primary" />
                            {service.delivery_time}
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-0.5">Price</div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-lg font-black text-primary tabular-nums italic">₹{service.price}</span>
                                {service.price_type === 'hourly' && <span className="text-[10px] text-muted-foreground font-black">/HR</span>}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button asChild className="flex-1 rounded-[1.2rem] font-black text-xs h-12 bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-lg shadow-primary/10 active:scale-95 lowercase">
                            <Link to={`/freelancing/service/${service.id}`}>VIEW_PROJECT</Link>
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleMessage}
                            className="w-12 rounded-[1.2rem] border-border bg-card hover:bg-accent text-foreground transition-all h-12 active:scale-95"
                        >
                            <MessageSquare className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
