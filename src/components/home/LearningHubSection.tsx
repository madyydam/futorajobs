import { motion } from "framer-motion";
import { ChevronRight, Sparkles, Code2, Smartphone, Palette, BarChart3, ShieldAlert, Megaphone, Rocket, Zap, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { MOCK_VIDEO_CATEGORIES } from "@/data/learningMockData";
import { memo } from "react";

const iconMap: Record<string, any> = {
    "Code2": Code2,
    "Smartphone": Smartphone,
    "Sparkles": Sparkles,
    "Palette": Palette,
    "BarChart3": BarChart3,
    "ShieldAlert": ShieldAlert,
    "Megaphone": Megaphone,
    "Rocket": Rocket,
    "Zap": Zap
};

export const LearningHubSection = memo(function LearningHubSection() {
    return (
        <section id="learning-hub-section" className="py-8 space-y-8">
            <div className="space-y-3 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-[9px] font-black text-primary uppercase tracking-[0.2em] border border-primary/10 mx-auto">
                    <PlayCircle className="h-3 w-3" />
                    Video Course Ecosystem
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 leading-none pt-1">
                    Select Your <span className="text-primary font-bold">Career Path</span>
                </h2>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest opacity-60">
                    Master Skills through Structured Learning
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {MOCK_VIDEO_CATEGORIES.map((cat, i) => {
                    const Icon = iconMap[cat.icon] || PlayCircle;
                    return (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link to={`/learning/${cat.slug}`}>
                                <div className="relative aspect-square rounded-3xl overflow-hidden group border border-slate-200/60 shadow-sm transition-all duration-300">
                                    {/* Background Image with Overlay */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={cat.image}
                                            alt={cat.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div
                                            className="absolute inset-0 opacity-80 mix-blend-multiply"
                                            style={{ backgroundColor: cat.color }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 p-4 flex flex-col justify-between items-center text-center">
                                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-lg">
                                            <Icon className="w-5 h-5" />
                                        </div>

                                        <h3 className="text-xs md:text-sm font-bold text-white leading-tight">
                                            {cat.name}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>

            <div className="flex justify-center pt-4">
                <Link to="/learning">
                    <button className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 hover:text-primary flex items-center gap-2 group transition-colors">
                        VISIT FULL SKILLS HUB
                        <ChevronRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </Link>
            </div>
        </section>
    );
});
