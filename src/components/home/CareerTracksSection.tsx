import { useCareerPaths } from "@/hooks/useCareerPaths";
import { CareerTrackCard } from "@/components/learn/CareerTrackCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { memo } from "react";

export const CareerTracksSection = memo(function CareerTracksSection() {
  const { careerPaths, isLoading } = useCareerPaths();
  const featuredTracks = careerPaths.slice(0, 2);

  return (
    <section id="career-tracks-section" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Target className="h-4 w-4" />
          Structured Paths
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Career Tracks to <span className="gradient-text">Your Dream Role</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Follow a structured path from learning to getting hired. Each track maps directly to real opportunities.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {featuredTracks.map((track, index) => (
            <CareerTrackCard key={track.id} track={track} index={index} />
          ))}
        </div>
      )}


      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Link to="/career-paths">
          <Button
            variant="outline"
            size="lg"
            className="border-border hover:bg-accent group"
          >
            Explore All Tracks
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
});
