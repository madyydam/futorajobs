import { Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Briefcase, GraduationCap, Sparkles, Code, Palette, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const categoryIcons = {
  AI: Sparkles,
  Development: Code,
  Design: Palette,
  Growth: TrendingUp,
};

const categoryColors = {
  AI: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  Development: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Design: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  Growth: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
};

const difficultyColors = {
  Beginner: "bg-primary/10 text-primary",
  Intermediate: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Advanced: "bg-destructive/10 text-destructive",
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const CategoryIcon = categoryIcons[project.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="clean-card p-6 h-full hover-lift cursor-pointer group flex flex-col">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${categoryColors[project.category]}`}>
            <CategoryIcon className="h-3.5 w-3.5" />
            {project.category}
          </div>
          <div className={`px-2 py-0.5 text-xs font-medium rounded-full ${difficultyColors[project.difficulty]}`}>
            {project.difficulty}
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.skills.map((skill) => (
            <span key={skill} className="skill-chip text-xs">
              {skill}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {project.duration}
          </div>
        </div>

        {/* Deliverables */}
        <div className="mb-4 p-3 rounded-lg bg-secondary/50">
          <p className="text-xs text-muted-foreground mb-2">Deliverables:</p>
          <div className="flex flex-wrap gap-1.5">
            {project.deliverables.map((item) => (
              <Badge key={item} variant="secondary" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        {/* Unlocks */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <span className="font-medium text-foreground">Completion unlocks:</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <GraduationCap className="h-3.5 w-3.5 text-primary" />
              {project.unlocks.internships} internships
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="h-3.5 w-3.5 text-primary" />
              {project.unlocks.jobs} jobs
            </span>
          </div>
        </div>

        {/* CTA */}
        <Button variant="outline" className="w-full mt-auto border-border hover:bg-accent group/btn">
          Start Project
          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
}
