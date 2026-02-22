import { mockProjects } from "@/data/projects";
import { ProjectCard } from "@/components/learn/ProjectCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Hammer } from "lucide-react";
import { motion } from "framer-motion";
import { memo } from "react";

export const ProjectsSection = memo(function ProjectsSection() {
  const featuredProjects = mockProjects.slice(0, 3);

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Hammer className="h-4 w-4" />
          Proof of Work
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Build Proof, <span className="gradient-text">Not Certificates</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Real-world projects that prove your skills. Complete them to unlock internships and jobs.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {featuredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Button
          variant="outline"
          size="lg"
          className="border-border hover:bg-accent group"
        >
          View All Projects
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </section>
  );
});
