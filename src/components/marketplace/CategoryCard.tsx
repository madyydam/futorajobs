import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Link } from "react-router-dom";
import { FreelanceCategory } from "@/types/marketplace";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
    category: FreelanceCategory;
    index?: number;
    isActive?: boolean;
    onClick?: () => void;
}

export const CategoryCard = ({ category, index = 0, isActive, onClick }: CategoryCardProps) => {
    const IconComponent = (Icons as any)[category.icon] || Icons.Briefcase;

    const content = (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            onClick={onClick}
            className={cn(
                "group relative p-8 rounded-[2.5rem] border transition-all duration-500 overflow-hidden cursor-pointer",
                isActive
                    ? "bg-primary/20 border-primary/50 shadow-[0_0_40px_rgba(16,185,129,0.2)]"
                    : "bg-card border-border hover:bg-accent dark:bg-[#0B0F1A] dark:border-white/5 dark:hover:bg-slate-900/50"
            )}
        >
            {/* Background Pattern */}
            <div className="absolute -bottom-10 -right-10 p-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-1000 rotate-12">
                <IconComponent className="h-64 w-64 text-primary" />
            </div>

            <div className="relative z-10">
                <div className="h-16 w-16 rounded-[1.5rem] bg-primary/5 border border-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:border-primary transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <IconComponent className="h-8 w-8 text-primary group-hover:text-black transition-all duration-500 group-hover:scale-110" />
                </div>

                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-foreground mb-4 leading-none group-hover:text-primary transition-colors dark:text-white">
                    {category.name}
                </h3>

                <p className="text-sm text-muted-foreground font-medium leading-relaxed group-hover:text-white/80 transition-colors mb-8 max-w-[200px]">
                    {category.description || `Browse top services in ${category.name}`}
                </p>

                <div className="flex items-center gap-3">
                    <div className="h-1 w-8 bg-primary rounded-full group-hover:w-16 transition-all duration-500"></div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                        VIEW GIGS
                    </div>
                </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    );

    if (onClick) return content;

    return (
        <Link to={`/freelancing/category/${category.slug}`}>
            {content}
        </Link>
    );
};
