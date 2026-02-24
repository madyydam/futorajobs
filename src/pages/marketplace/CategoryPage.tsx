import { Layout } from "@/components/layout/Layout";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Filter, SlidersHorizontal, Sparkles, Briefcase, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ServiceCard } from "@/components/marketplace/ServiceCard";
import { useFreelance } from "@/hooks/useFreelance";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useMemo } from "react";

const CategoryPage = () => {
    const { slug } = useParams();
    const { services, categories } = useFreelance();
    const [searchQuery, setSearchQuery] = useState("");

    const category = categories.data?.find(c => c.slug === slug);
    const categoryName = category?.name || slug?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || "Category";

    const filteredServices = useMemo(() => {
        let items = services.data?.filter(s => s.category?.slug === slug) || [];
        if (searchQuery) {
            items = items.filter(s =>
                s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return items;
    }, [services.data, slug, searchQuery]);

    return (
        <Layout>
            <div className="relative min-h-screen pb-20 overflow-x-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 blur-[120px] -z-10 rounded-full opacity-50" />

                <div className="max-w-7xl mx-auto py-12 px-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Link to="/freelancing" className="inline-flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em] hover:opacity-70 mb-12 transition-all">
                            <ArrowLeft className="h-4 w-4" />
                            RETURN TO HUB
                        </Link>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 px-2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black tracking-[0.2em] uppercase">
                                <Sparkles className="h-3 w-3" />
                                Elite Domain
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none italic uppercase">
                                {categoryName} <span className="text-primary/40 block sm:inline">GIGS</span>
                            </h1>
                            <p className="text-muted-foreground font-medium text-lg italic max-w-xl">
                                {category?.description || `Explore top-tier professional services specialized in ${categoryName}.`}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto"
                        >
                            <div className="relative flex-1 lg:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search in category..."
                                    className="h-14 pl-12 pr-6 bg-[#0B0F1A]/80 border-white/10 rounded-2xl focus:border-primary/50 text-white font-bold"
                                />
                            </div>
                            <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/10 bg-white/5 font-black uppercase text-[10px] tracking-widest hover:bg-white/10 italic">
                                <SlidersHorizontal className="h-4 w-4 mr-3" />
                                FILTER_SORT
                            </Button>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {services.isLoading ? (
                            Array(8).fill(0).map((_, i) => (
                                <Skeleton key={i} className="h-[450px] rounded-[2rem] bg-white/5" />
                            ))
                        ) : filteredServices.length > 0 ? (
                            <AnimatePresence mode="popLayout">
                                {filteredServices.map((service, index) => (
                                    <ServiceCard key={service.id} service={service} index={index} />
                                ))}
                            </AnimatePresence>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-32 text-center"
                            >
                                <div className="h-24 w-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-inner">
                                    <Briefcase className="h-10 w-10 text-muted-foreground/30" />
                                </div>
                                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">No Matrix Entities Found</h3>
                                <p className="text-muted-foreground font-medium italic mb-10 max-w-md mx-auto">Be the first elite freelancer to establish your presence in the {categoryName} sector.</p>
                                <Button asChild className="h-14 px-10 rounded-2xl bg-primary text-black font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(16,185,129,0.2)] active:scale-95 transition-all">
                                    <Link to="/freelancing/create">
                                        <Zap className="h-4 w-4 mr-3 fill-black" />
                                        DEPLOY_GIG
                                    </Link>
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CategoryPage;
