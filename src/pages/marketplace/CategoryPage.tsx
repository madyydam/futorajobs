import { Layout } from "@/components/layout/Layout";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ServiceCard } from "@/components/marketplace/ServiceCard";
import { FreelanceService } from "@/types/marketplace";

// Use the same mock data or ideally fetch from Supabase
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
        category: { id: "1", name: "UI/UX Design", slug: "ui-ux", icon: "Palette" }
    },
    // Add more mock services if needed
];

const CategoryPage = () => {
    const { categorySlug } = useParams();
    const categoryName = categorySlug?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || "Category";

    return (
        <Layout>
            <div className="max-w-7xl mx-auto py-12 px-6">
                <Link to="/freelancing" className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:underline mb-8">
                    <ArrowLeft className="h-4 w-4" />
                    BACK TO ALL CATEGORIES
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic uppercase mb-2">
                            {categoryName} <span className="text-primary/40">GIGS</span>
                        </h1>
                        <p className="text-muted-foreground font-medium">
                            Browse high-impact freelance services in {categoryName}.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search in this category..."
                                className="h-11 pl-10 bg-white/5 border-white/10 rounded-xl w-64 focus:border-primary/50"
                            />
                        </div>
                        <Button variant="outline" className="h-11 rounded-xl border-white/10 bg-white/5 font-bold">
                            <SlidersHorizontal className="h-4 w-4 mr-2" />
                            SORT
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_SERVICES.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                    {MOCK_SERVICES.length === 0 && (
                        <div className="col-span-full py-24 text-center">
                            <h3 className="text-xl font-bold text-white mb-2">No services found in this category</h3>
                            <p className="text-muted-foreground">Be the first to list a service here!</p>
                            <Button asChild className="mt-6 rounded-xl bg-primary text-black">
                                <Link to="/freelancing/create">CREATE SERVICE</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default CategoryPage;
