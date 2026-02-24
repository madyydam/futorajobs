import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import {
    Zap,
    Search,
    Filter,
    Plus,
    MessageSquare,
    Sparkles,
    TrendingUp,
    ShieldCheck,
    ArrowRight,
    Rocket,
    Globe,
    Code,
    Palette,
    Terminal,
    Video,
    Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryCard } from "@/components/marketplace/CategoryCard";
import { ServiceCard } from "@/components/marketplace/ServiceCard";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useFreelance } from "@/hooks/useFreelance";
import { Skeleton } from "@/components/ui/skeleton";

const Freelancing = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { services, categories, freelancerProfile } = useFreelance();

    const filteredServices = useMemo(() => {
        let items = services.data || [];
        if (searchQuery) {
            items = items.filter(s =>
                s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (selectedCategory) {
            items = items.filter(s => s.category_id === selectedCategory || s.category?.slug === selectedCategory);
        }
        return items;
    }, [services.data, searchQuery, selectedCategory]);

    return (
        <Layout>
            <div className="relative min-h-screen pb-20 overflow-x-hidden">
                {/* Premium Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-primary/5 blur-[120px] -z-10 rounded-full opacity-50" />
                <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[100px] -z-10 rounded-full" />

                <div className="max-w-7xl mx-auto px-6 pt-12">
                    {/* Elite Header */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 relative">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6 max-w-2xl"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black tracking-[0.2em] uppercase">
                                <Sparkles className="h-4 w-4" />
                                Student Freelance Network
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter leading-[0.85] italic uppercase">
                                FUTORA <span className="text-primary/40 dark:text-primary/20 block md:inline">GIGS</span>
                            </h1>
                            <p className="text-muted-foreground text-xl font-medium leading-relaxed max-w-lg">
                                The elite marketplace for student builders. Hire top-tier student talent or launch your professional career.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap items-center gap-4"
                        >
                            <div className="flex bg-card backdrop-blur-xl p-1.5 rounded-[2rem] border border-border shadow-2xl">
                                <Button asChild variant="ghost" className="rounded-[1.5rem] font-black text-xs h-12 px-8 hover:bg-white/5 data-[active=true]:bg-white/10">
                                    <Link to="/freelancing/dashboard">DASHBOARD</Link>
                                </Button>
                                <Button asChild variant="ghost" className="rounded-[1.5rem] font-black text-xs h-12 px-8 hover:bg-white/5">
                                    <Link to="/freelancing/client-dashboard">ORDERS</Link>
                                </Button>
                            </div>
                            <Button asChild className="h-16 rounded-[2rem] bg-primary text-black hover:bg-primary/90 font-black px-10 shadow-2xl shadow-primary/20 border-t border-white/20 active:scale-95 transition-all">
                                <Link to="/freelancing/create">
                                    <Plus className="h-5 w-5 mr-3 stroke-[3px]" />
                                    POST A GIG
                                </Link>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Elite Search & Filter Bar */}
                    <div className="relative z-10 mb-24">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-600/30 rounded-[3rem] blur-xl opacity-30 animate-pulse" />
                        <div className="relative flex flex-col md:flex-row gap-4 p-5 bg-card/80 backdrop-blur-3xl border border-border rounded-[3rem] shadow-2xl">
                            <div className="relative flex-1">
                                <Search className="absolute left-7 top-1/2 -translate-y-1/2 h-6 w-6 text-primary" />
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for 'Next.js Dev', 'UI Designer', 'AI Expert'..."
                                    className="h-16 pl-16 pr-8 bg-background border-border rounded-[2rem] focus:border-primary/50 transition-all font-bold text-lg placeholder:text-muted-foreground/30 text-foreground"
                                />
                            </div>
                            <Button className="h-16 px-12 rounded-[2rem] bg-primary text-primary-foreground hover:opacity-90 font-black shadow-xl tracking-widest italic active:scale-95 transition-all">
                                SEARCH
                            </Button>
                        </div>
                    </div>

                    {/* Elite Categories */}
                    <section className="mb-24">
                        <div className="flex items-center justify-between mb-12 px-2">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-1.5 bg-primary rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                                <h2 className="text-4xl font-black italic uppercase tracking-tighter text-foreground">Elite Domains</h2>
                            </div>
                            <div className="hidden md:block h-px flex-1 mx-12 bg-gradient-to-r from-white/10 to-transparent"></div>
                            <Button variant="ghost" className="text-primary font-black text-xs tracking-widest uppercase hover:bg-primary/10 rounded-full px-6">
                                VIEW ALL <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categories.isLoading ? (
                                Array(6).fill(0).map((_, i) => (
                                    <Skeleton key={i} className="h-40 rounded-[2.5rem] bg-muted" />
                                ))
                            ) : (
                                categories.data?.map((cat) => (
                                    <CategoryCard
                                        key={cat.id}
                                        category={cat}
                                        isActive={selectedCategory === cat.slug}
                                        onClick={() => setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)}
                                    />
                                ))
                            )}
                        </div>
                    </section>

                    {/* Featured Services */}
                    <section className="mb-32">
                        <div className="flex items-center justify-between mb-12 px-2">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-1.5 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                                <h2 className="text-4xl font-black italic uppercase tracking-tighter text-foreground">Verified Gigs</h2>
                            </div>
                            <div className="hidden md:block h-px flex-1 mx-12 bg-gradient-to-r from-white/10 to-transparent"></div>
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest mr-4">Sorted by: Newest</span>
                                <Button variant="outline" size="icon" className="rounded-xl border-border h-10 w-10">
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {services.isLoading ? (
                                Array(8).fill(0).map((_, i) => (
                                    <Skeleton key={i} className="h-[450px] rounded-[2rem] bg-muted" />
                                ))
                            ) : filteredServices.length > 0 ? (
                                filteredServices.map((service, index) => (
                                    <ServiceCard key={service.id} service={service} index={index} />
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center">
                                    <div className="h-24 w-24 bg-card rounded-full flex items-center justify-center mx-auto mb-6 border border-border">
                                        <Briefcase className="h-10 w-10 text-muted-foreground/30" />
                                    </div>
                                    <h3 className="text-2xl font-black text-foreground italic uppercase tracking-tighter mb-2">No Gigs Found</h3>
                                    <p className="text-muted-foreground font-medium italic">Try adjusting your search or filters to find what you're looking for.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default Freelancing;
