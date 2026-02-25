import { Layout } from "@/components/layout/Layout";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, LayoutGrid, Sparkles, GraduationCap } from "lucide-react";
import { MOCK_VIDEO_CATEGORIES } from "@/data/learningMockData";
import { useMemo } from "react";

const CategoryDetail = () => {
    const { categorySlug } = useParams();
    const navigate = useNavigate();

    const category = useMemo(() =>
        MOCK_VIDEO_CATEGORIES.find(c => c.slug === categorySlug),
        [categorySlug]);

    if (!category) {
        return (
            <Layout>
                <div className="py-20 text-center">
                    <h1 className="text-2xl font-bold">Category not found</h1>
                    <Link to="/learning" className="text-primary font-black uppercase tracking-widest text-xs">Back to Hub</Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-6xl mx-auto pb-24 px-4">

                {/* Back Link */}
                <div className="pt-8 pb-4">
                    <button
                        onClick={() => navigate("/learning")}
                        className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-primary transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                        Back to Paths
                    </button>
                </div>

                {/* Section 1: Category Title */}
                <header className="pt-6 pb-2 text-center space-y-3">
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border"
                        style={{
                            backgroundColor: `${category.color}10`,
                            color: category.color,
                            borderColor: `${category.color}30`
                        }}
                    >
                        <GraduationCap className="h-3 w-3" />
                        Specialized Curriculum
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900">
                        {category.name}
                    </h1>
                </header>

                {/* Section 2: Subheading */}
                <div className="pb-8 text-center">
                    <p className="text-slate-500 text-sm font-medium">
                        Select a specialized track to access deep-dive video lessons and industry-ready projects.
                    </p>
                </div>

                {/* Section 3: Vibrant 2-Column Sub-category Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
                    {(category.subcategories || []).map((sub, i) => (
                        <motion.div
                            key={sub.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.4 }}
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            <Link to={`/learning/${category.slug}/${sub.id}`}>
                                <div
                                    className="relative aspect-square rounded-[2rem] overflow-hidden group shadow-sm border border-slate-200/60 bg-white transition-all duration-500 hover:shadow-xl"
                                >
                                    {/* Background Image with Industry Color Overlay */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={sub.image}
                                            alt={sub.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div
                                            className="absolute inset-0 opacity-80 mix-blend-multiply transition-opacity group-hover:opacity-90"
                                            style={{ backgroundColor: category.color }}
                                        />
                                        {/* Gradient overlay for text readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                    </div>

                                    <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 text-center items-center">
                                        {/* Glass Icon Container */}
                                        <div
                                            className="w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 bg-white/20 backdrop-blur-md border border-white/30"
                                        >
                                            <LayoutGrid className="h-5 w-5 md:h-7 md:w-7" />
                                        </div>

                                        <div className="space-y-1 w-full flex flex-col items-center">
                                            {/* Name with text wrapping to fix overlap */}
                                            <span className="text-xs md:text-base font-bold text-white leading-tight block w-full">
                                                {sub.name}
                                            </span>
                                            <div
                                                className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300 text-white/80"
                                            >
                                                Start Path
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="space-y-0.5">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Industry Core</div>
                        <div className="text-sm font-bold text-slate-900">Career OS • {category.name}</div>
                    </div>
                    <Sparkles className="h-5 w-5 text-slate-300" />
                </div>
            </div>
        </Layout>
    );
};

export default CategoryDetail;
