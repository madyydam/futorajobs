import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Zap, Search, Filter, Plus, LayoutDashboard, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryCard } from "@/components/marketplace/CategoryCard";
import { ServiceCard } from "@/components/marketplace/ServiceCard";
import { Link } from "react-router-dom";
import { FreelanceCategory, FreelanceService } from "@/types/marketplace";

const MOCK_CATEGORIES: FreelanceCategory[] = [
    { id: "1", name: "UI/UX Design", slug: "ui-ux", icon: "Palette", description: "Visual and interactive design for digital products." },
    { id: "2", name: "Frontend Dev", slug: "frontend", icon: "Code", description: "Building responsive and interactive user interfaces." },
    { id: "3", name: "Backend Dev", slug: "backend", icon: "Database", description: "Server-side logic and database management." },
    { id: "4", name: "AI Training", slug: "ai", icon: "Bot", description: "Specialized AI model training and expert prompting." },
    { id: "5", name: "Content Writing", slug: "content", icon: "FileText", description: "Professional writing and SEO-optimized content." },
    { id: "6", name: "Video Editing", slug: "video", icon: "Video", description: "High-impact video production and post-processing." },
];

const MOCK_SERVICES: FreelanceService[] = [
    {
        id: "s1",
        freelancer_id: "f1",
        category_id: "1",
        title: "High-Fidelity Mobile App Design for Startups",
        description: "I will design a modern, conversion-focused mobile app for your startup.",
        price_type: "fixed",
        price: 12000,
        delivery_time: "5 Days",
        portfolio_urls: ["https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop"],
        tags: ["Mobile", "Figma", "UI/UX"],
        is_active: true,
        freelancer: {
            id: "f1",
            user_id: "u1",
            tagline: "Product Designer @ Futora",
            bio: "Experienced UI/UX designer specialized in SaaS.",
            hourly_rate: 1500,
            experience_years: 4,
            is_verified: true,
            full_name: "Rahul Sharma",
            avatar_url: "https://i.pravatar.cc/150?u=rahul"
        },
        category: MOCK_CATEGORIES[0]
    },
    {
        id: "s2",
        freelancer_id: "f2",
        category_id: "2",
        title: "Next.js + Tailwind CSS SaaS Landing Page",
        description: "Highly performant and SEO optimized landing pages built with modern stack.",
        price_type: "fixed",
        price: 8500,
        delivery_time: "3 Days",
        portfolio_urls: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop"],
        tags: ["Next.js", "Tailwind", "React"],
        is_active: true,
        freelancer: {
            id: "f2",
            user_id: "u2",
            tagline: "Fullstack Wizard",
            bio: "Building the future with React and Node.",
            hourly_rate: 2000,
            experience_years: 3,
            is_verified: true,
            full_name: "Priya Das",
            avatar_url: "https://i.pravatar.cc/150?u=priya"
        },
        category: MOCK_CATEGORIES[1]
    },
    {
        id: "s3",
        freelancer_id: "f3",
        category_id: "4",
        title: "Advanced Prompt Engineering for LLMs",
        description: "Optimize your AI workflows with custom engineered prompts for GPT-4 and Claude.",
        price_type: "hourly",
        price: 2500,
        delivery_time: "1 Day",
        portfolio_urls: ["https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop"],
        tags: ["AI", "LLM", "Prompts"],
        is_active: true,
        freelancer: {
            id: "f3",
            user_id: "u3",
            tagline: "AI Solutions Architect",
            bio: "Specialist in integrating AI into existing business processes.",
            hourly_rate: 2500,
            experience_years: 2,
            is_verified: true,
            full_name: "Amit Patel",
            avatar_url: "https://i.pravatar.cc/150?u=amit"
        },
        category: MOCK_CATEGORIES[3]
    }
];

const Freelancing = () => {
    return (
        <Layout>
            <div className="max-w-7xl mx-auto py-12 px-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                            <Zap className="h-3 w-3" />
                            Active Marketplace
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase mb-2">
                            FUTORA <span className="text-primary/40">GIGS</span>
                        </h1>
                        <p className="text-muted-foreground max-w-xl font-medium">
                            The specialized engine for startup talent. Hire top-tier freelancers or monetize your skills.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-wrap gap-3"
                    >
                        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 mr-2">
                            <Button asChild variant="ghost" className="rounded-xl font-bold text-[10px] h-10 px-4 data-[active=true]:bg-primary data-[active=true]:text-black" data-active="true">
                                <Link to="/freelancing/dashboard">FREELANCER</Link>
                            </Button>
                            <Button asChild variant="ghost" className="rounded-xl font-bold text-[10px] h-10 px-4 data-[active=false]:bg-primary data-[active=false]:text-black">
                                <Link to="/freelancing/client-dashboard">CLIENT</Link>
                            </Button>
                        </div>
                        <Button asChild variant="outline" className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 font-bold">
                            <Link to="/chat">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                MESSAGES
                            </Link>
                        </Button>
                        <Button asChild className="rounded-xl bg-primary text-black hover:bg-primary/90 font-bold">
                            <Link to="/freelancing/create">
                                <Plus className="h-4 w-4 mr-2" />
                                POST A GIG
                            </Link>
                        </Button>
                    </motion.div>

                </div>

                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-16">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="What service are you looking for today?"
                            className="h-14 pl-12 bg-white/5 border-white/10 rounded-2xl focus:border-primary/50 transition-all font-medium"
                        />
                    </div>
                    <Button variant="outline" className="h-14 px-6 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 font-bold">
                        <Filter className="h-5 w-5 mr-2 text-primary" />
                        FILTERS
                    </Button>
                </div>

                {/* Categories Grid */}
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">Categories</h2>
                        <div className="h-px flex-1 mx-8 bg-white/5"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {MOCK_CATEGORIES.map((cat) => (
                            <CategoryCard key={cat.id} category={cat} />
                        ))}
                    </div>
                </section>

                {/* Featured Services */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">Featured Gigs</h2>
                        <div className="h-px flex-1 mx-8 bg-white/5"></div>
                        <Link to="/freelancing/explore" className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">View All</Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {MOCK_SERVICES.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                </section>

                {/* Trust/Info Section */}
                <div className="mt-24 p-12 rounded-[40px] bg-gradient-to-br from-primary/10 via-transparent to-transparent border border-primary/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <Zap className="h-48 w-48 text-primary" />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter mb-6">
                            WHY HIRE ON <span className="text-primary">FUTORA?</span>
                        </h2>
                        <div className="space-y-4">
                            {[
                                "Verified Proof-of-Work profiles",
                                "Direct messaging with talent",
                                "Escrow-based secure payments (Coming Soon)",
                                "Zero commissions for the first 100 startups"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Zap className="h-3 w-3 text-primary" />
                                    </div>
                                    <span className="text-white/80 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Freelancing;

