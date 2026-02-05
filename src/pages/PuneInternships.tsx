import { Layout } from "@/components/layout/Layout";
import { InternshipCard } from "@/components/internships/InternshipCard";
import { useInternships } from "@/hooks/useInternships";
import { Search, Loader2, MapPin, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const PuneInternships = () => {
    const { internships, isLoading } = useInternships();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "AI", "Development", "Design", "Growth"];

    const filteredInternships = internships.filter((internship) => {
        const matchesSearch =
            internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            internship.company.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
            activeCategory === "All" ||
            internship.category.toLowerCase() === activeCategory.toLowerCase();

        const isPuneOrRemote =
            (internship.location?.toLowerCase().includes("pune")) ||
            internship.is_remote;

        return matchesSearch && matchesCategory && isPuneOrRemote;
    });

    return (
        <Layout>
            <div className="max-w-6xl mx-auto">
                {/* Localized Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                        <GraduationCap className="h-3 w-3" />
                        Built for Pune Students
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                        Internships in <span className="gradient-text">Pune</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl">
                        Find the best paid and learning internships in Pune. Kickstart your career with localized opportunities in the Oxford of the East.
                    </p>
                </motion.div>

                {/* Search & Filters */}
                <div className="space-y-4 mb-8">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search internships in Pune..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-card border-border"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium rounded-full transition-all",
                                    activeCategory === category
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-secondary text-secondary-foreground hover:bg-accent"
                                )}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}

                {/* Internships Grid */}
                {!isLoading && (
                    <div className="grid md:grid-cols-2 gap-4">
                        {filteredInternships.map((internship, index) => (
                            <InternshipCard key={internship.id} internship={internship} index={index} />
                        ))}
                    </div>
                )}

                {!isLoading && filteredInternships.length === 0 && (
                    <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed border-border">
                        <p className="text-muted-foreground italic">
                            Stay tuned! Local Pune internships are added every week.
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default PuneInternships;
