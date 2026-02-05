import { Layout } from "@/components/layout/Layout";
import { useCareerPaths } from "@/hooks/useCareerPaths";
import { CareerTrackCard } from "@/components/learn/CareerTrackCard";
import { Target, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const CareerPathsPage = () => {
    const { careerPaths, isLoading } = useCareerPaths();

    return (
        <Layout>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <section className="py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <Target className="h-4 w-4" />
                            All Career Paths
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                            Career Tracks to <span className="gradient-text">Your Dream Role</span>
                        </h1>

                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                            Follow a structured path from learning to getting hired. Each track maps directly to real opportunities within the Futora ecosystem.
                        </p>
                    </motion.div>
                </section>

                {/* Career Paths Grid */}
                <section className="pb-12">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : careerPaths.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground text-lg">No career paths available yet.</p>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="grid md:grid-cols-2 gap-6"
                        >
                            {careerPaths.map((track, index) => (
                                <CareerTrackCard key={track.id} track={track} index={index} />
                            ))}
                        </motion.div>
                    )}
                </section>
            </div>
        </Layout>
    );
};

export default CareerPathsPage;
