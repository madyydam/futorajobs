import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function FloatingAIButton() {
    const location = useLocation();

    // Don't show the button if we're already on the coach page
    if (location.pathname === "/interview-coach") return null;

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[100]"
        >
            <Link
                to="/interview-coach"
                className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground shadow-2xl shadow-primary/40",
                    "hover:bg-primary/90 transition-all duration-300 group relative"
                )}
            >
                <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />

                {/* Tooltip */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-card border border-border text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                    AI Interview Coach
                </div>

                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-2xl bg-primary animate-ping opacity-20 pointer-events-none" />
            </Link>
        </motion.div>
    );
}
