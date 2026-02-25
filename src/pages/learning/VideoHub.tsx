import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles, Code2, Smartphone, Palette, BarChart3, ShieldAlert, Megaphone, Rocket, Zap, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { MOCK_VIDEO_CATEGORIES } from "@/data/learningMockData";

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

const VideoHub = () => {
    return (
        <Layout>
            <div className="max-w-6xl mx-auto pb-24 px-4">

                {/* Section 1: Page Title */}
                <header className="pt-10 pb-6 text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-[10px] font-bold text-primary uppercase tracking-widest border border-primary/20">
                        <PlayCircle className="h-3 w-3" />
                        Video Course Hub
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                        Master New Skills with <br />
                        <span className="text-primary">Structured Curriculum</span>
                    </h1>
                </header>

                {/* Section 2: Subheading */}
                <div className="pb-8 text-center max-w-xl mx-auto">
                    <p className="text-slate-500 text-sm font-medium">
                        Explore expert-led video lessons across major industries. Pick a path to start building your career today.
                    </p>
                </div>

                {/* Section 3: Tabs */}
                <div className="pb-10 flex justify-center">
                    <div className="flex p-1 gap-1 rounded-xl bg-slate-100 border border-slate-200 w-full max-w-sm">
                        <button className="flex-1 py-2 px-4 rounded-lg bg-primary text-white text-xs font-bold shadow-sm transition-all">
                            Skills
                        </button>
                        <button className="flex-1 py-2 px-4 rounded-lg text-slate-500 text-xs font-bold hover:bg-white/50 transition-all">
                            Tracks
                        </button>
                        <button className="flex-1 py-2 px-4 rounded-lg text-slate-500 text-xs font-bold hover:bg-white/50 transition-all">
                            Projects
                        </button>
                    </div>
                </div>

                {/* Section 4: Vibrant 2-Column Category Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
                    {MOCK_VIDEO_CATEGORIES.map((cat, i) => {
                        const Icon = iconMap[cat.icon] || PlayCircle;
                        return (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.4 }}
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link to={`/learning/${cat.slug}`}>
                                    <div className="relative aspect-square rounded-[2rem] overflow-hidden group border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-500">
                                        {/* Background Image with Overlay */}
                                        <div className="absolute inset-0">
                                            <img
                                                src={cat.image}
                                                alt={cat.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div
                                                className="absolute inset-0 opacity-80 mix-blend-multiply transition-opacity group-hover:opacity-90"
                                                style={{ backgroundColor: cat.color }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        </div>

                                        {/* Content Overlay */}
                                        <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-between items-center text-center">
                                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-lg">
                                                <Icon className="w-6 h-6 md:w-8 md:h-8" />
                                            </div>

                                            <div className="space-y-1">
                                                <h3 className="text-sm md:text-xl font-bold text-white leading-tight">
                                                    {cat.name}
                                                </h3>
                                                <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                                    <span className="text-[10px] md:text-xs font-bold text-white/90 uppercase tracking-widest">
                                                        Explore Path
                                                    </span>
                                                    <ChevronRight className="w-3 h-3 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Footer Minimal Decor */}
                <div className="mt-20 py-8 text-center border-t border-slate-100">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-[10px] font-semibold tracking-wider uppercase text-slate-500 border border-slate-100">
                        <Sparkles className="h-3 w-3 text-primary/60" />
                        Career Ecosystem
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default VideoHub;
