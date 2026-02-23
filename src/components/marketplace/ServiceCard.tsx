import { motion } from "framer-motion";
import { Star, Clock, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { FreelanceService } from "@/types/marketplace";

interface ServiceCardProps {
    service: FreelanceService;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)]"
        >
            <div className="relative aspect-[16/10] overflow-hidden">
                {service.portfolio_urls?.[0] ? (
                    <img
                        src={service.portfolio_urls[0]}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                        <div className="text-muted-foreground/20 text-4xl font-black italic">FUTORA</div>
                    </div>
                )}
                <div className="absolute top-4 left-4">
                    <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-primary">
                        {service.category?.name || "Service"}
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-10 w-10 border border-white/10">
                        <AvatarImage src={service.freelancer?.avatar_url} />
                        <AvatarFallback>{service.freelancer?.full_name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-white tracking-tight">{service.freelancer?.full_name}</span>
                            {service.freelancer?.is_verified && <CheckCircle2 className="h-3.5 w-3.5 text-primary fill-primary/10" />}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <span>4.9 (42 reviews)</span>
                        </div>
                    </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                    {service.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                    <div className="flex items-center gap-1.5 font-medium">
                        <Clock className="h-3.5 w-3.5" />
                        {service.delivery_time}
                    </div>
                    <div className="h-1 w-1 rounded-full bg-white/20"></div>
                    <div className="flex items-center gap-1.5 font-medium">
                        <span className="text-primary font-bold">₹{service.price}</span>
                        <span className="opacity-60">{service.price_type === 'hourly' ? '/hr' : 'Starting at'}</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button asChild className="flex-1 rounded-xl font-bold bg-primary text-black hover:bg-primary/90">
                        <Link to={`/freelancing/service/${service.id}`}>VIEW GIG</Link>
                    </Button>
                    <Button variant="outline" className="w-12 rounded-xl border-white/10 hover:bg-white/5">
                        <ArrowUpRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};
