import { CareerTrack } from "@/data/careerTracks";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Code, Palette, TrendingUp, BookOpen, Briefcase, GraduationCap, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CareerTrackCardProps {
  track: CareerTrack;
  index?: number;
}

const iconMap: Record<string, React.ElementType> = {
  brain: Brain,
  code: Code,
  palette: Palette,
  trending: TrendingUp,
};

const difficultyColors = {
  Beginner: "bg-primary/10 text-primary",
  Intermediate: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Advanced: "bg-destructive/10 text-destructive",
};

export function CareerTrackCard({ track, index = 0 }: CareerTrackCardProps) {
  const Icon = iconMap[track.icon] || Code;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="clean-card p-6 h-full hover-lift cursor-pointer group flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {track.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${difficultyColors[track.difficulty]}`}>
                {track.difficulty}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {track.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {track.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {track.skills.slice(0, 4).map((skill) => (
            <span key={skill} className="skill-chip text-xs">
              {skill}
            </span>
          ))}
          {track.skills.length > 4 && (
            <span className="text-xs text-muted-foreground">+{track.skills.length - 4}</span>
          )}
        </div>

        {/* Progress Visual */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Track Progress</span>
            <span className="text-primary font-medium">Learn → Build → Apply → Hired</span>
          </div>
          <Progress value={0} className="h-2" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="p-2 rounded-lg bg-secondary/50">
            <BookOpen className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">{track.coursesCount}</span>
            <p className="text-xs text-muted-foreground">Courses</p>
          </div>
          <div className="p-2 rounded-lg bg-secondary/50">
            <GraduationCap className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">{track.internshipsCount}</span>
            <p className="text-xs text-muted-foreground">Internships</p>
          </div>
          <div className="p-2 rounded-lg bg-secondary/50">
            <Briefcase className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">{track.jobsCount}</span>
            <p className="text-xs text-muted-foreground">Jobs</p>
          </div>
        </div>

        {/* CTA */}
        <Button className="w-full mt-auto bg-primary text-primary-foreground hover:bg-primary/90 group/btn">
          Start Track
          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
}
