import { motion } from "framer-motion";
import { Sparkles, MessageSquare, GraduationCap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function FloatingAIButton() {
    const location = useLocation();

    // Features to show in the AI menu
    const aiFeatures = [
        {
            title: "AI Interview Coach",
            description: "Practice interviews with real-time feedback",
            icon: MessageSquare,
            path: "/interview-coach",
            color: "text-blue-500",
            bgColor: "bg-blue-500/10"
        },
        {
            title: "AI Career Copilot",
            description: "Personalized career guidance & path",
            icon: GraduationCap,
            path: "/ai-copilot",
            color: "text-primary",
            bgColor: "bg-primary/10"
        }
    ];

    return (
        <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[100]">
            <Popover>
                <PopoverTrigger asChild>
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground shadow-2xl shadow-primary/40",
                            "hover:bg-primary/90 transition-all duration-300 group relative"
                        )}
                    >
                        <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />

                        {/* Static Tooltip for desktop */}
                        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-card border border-border text-[10px] font-black uppercase tracking-widest whitespace-nowrap opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border-primary/20">
                            AI Power Suite
                        </div>

                        {/* Pulse effect */}
                        <div className="absolute inset-0 rounded-2xl bg-primary animate-ping opacity-20 pointer-events-none" />
                    </motion.button>
                </PopoverTrigger>

                <PopoverContent
                    side="top"
                    align="end"
                    sideOffset={15}
                    className="w-72 p-2 bg-card/95 backdrop-blur-xl border border-primary/20 rounded-3xl shadow-2xl overflow-hidden"
                >
                    <div className="p-3 mb-1">
                        <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Futora AI Suite</h3>
                        <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">Select an AI tool to continue</p>
                    </div>

                    <div className="space-y-1">
                        {aiFeatures.map((feature) => (
                            <Link
                                key={feature.path}
                                to={feature.path}
                                className="flex items-start gap-3 p-3 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all group"
                            >
                                <div className={cn("mt-0.5 p-2 rounded-xl transition-colors shrink-0", feature.bgColor, "group-hover:bg-primary group-hover:text-black")}>
                                    <feature.icon className={cn("h-4 w-4", feature.color, "group-hover:text-inherit")} />
                                </div>
                                <div className="space-y-0.5">
                                    <div className="text-[11px] font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </div>
                                    <div className="text-[9px] text-muted-foreground font-medium leading-tight">
                                        {feature.description}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-2 p-3 bg-primary/5 rounded-2xl border border-primary/10">
                        <p className="text-[8px] text-primary/60 font-black text-center uppercase tracking-[0.1em]">More AI tools coming soon</p>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
