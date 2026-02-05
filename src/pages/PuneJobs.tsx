import { Layout } from "@/components/layout/Layout";
import { JobCard } from "@/components/jobs/JobCard";
import { useJobs } from "@/hooks/useJobs";
import { Search, TrendingUp, Loader2, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const PuneJobs = () => {
    const { jobs, isLoading } = useJobs();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "AI", "Development", "Design", "Growth"];

    // Filter for Pune-based or Remote jobs that are relevant to Pune
    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
            activeCategory === "All" ||
            job.category.toLowerCase() === activeCategory.toLowerCase();

        const isPuneOrRemote =
            (job.location?.toLowerCase().includes("pune")) ||
            job.is_remote;

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
                        <MapPin className="h-3 w-3" />
                        Pune Startup Ecosystem
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                        Jobs in <span className="gradient-text">Pune</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl">
                        Explore the best high-growth startup opportunities in Pune. From AI Engineering to Product Design, find your next role in Maharashtra's tech hub.
                    </p>
                </motion.div>

                {/* Search & Filters */}
                <div className="space-y-4 mb-8">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search Pune jobs..."
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

                {/* Jobs Grid */}
                {!isLoading && (
                    <div className="grid md:grid-cols-2 gap-4">
                        {filteredJobs.map((job, index) => (
                            <JobCard key={job.id} job={job} index={index} />
                        ))}
                    </div>
                )}

                {!isLoading && filteredJobs.length === 0 && (
                    <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed border-border">
                        <p className="text-muted-foreground italic">
                            New Pune-based roles are being added daily. Check back soon!
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default PuneJobs;
