import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Link } from "react-router-dom";
import { FreelanceCategory } from "@/types/marketplace";

interface CategoryCardProps {
    category: FreelanceCategory;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
    const IconComponent = (Icons as any)[category.icon] || Icons.Briefcase;

    return (
        <Link to={`/freelancing/category/${category.slug}`}>
            <motion.div
                whileHover={{ y: -5 }}
                className="group p-6 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <IconComponent className="h-24 w-24 text-primary" />
                </div>

                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-500">
                    <IconComponent className="h-6 w-6 text-primary group-hover:text-black transition-colors duration-500" />
                </div>

                <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-2">{category.name}</h3>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed group-hover:text-white/80 transition-colors">
                    {category.description || `Browse top services in ${category.name}`}
                </p>

                <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary opacity-0 group-hover:opacity-100 transition-all">
                    EXPLORE SERVICES <Icons.ArrowRight className="h-3 w-3" />
                </div>
            </motion.div>
        </Link>
    );
};
