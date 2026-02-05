import { Course } from "@/hooks/useCourses";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Briefcase, GraduationCap, Sparkles, Code, Palette, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  course: Course;
  index?: number;
}

const categoryIcons: Record<string, React.ElementType> = {
  ai: Sparkles,
  development: Code,
  design: Palette,
  growth: TrendingUp,
};

const categoryColors: Record<string, string> = {
  ai: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  development: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  design: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  growth: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
};

const levelColors: Record<string, string> = {
  beginner: "bg-green-500/10 text-green-600 dark:text-green-400",
  intermediate: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  advanced: "bg-red-500/10 text-red-600 dark:text-red-400",
};

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const navigate = useNavigate();
  const CategoryIcon = categoryIcons[course.category] || Code;

  const handleClick = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div
        onClick={handleClick}
        className="clean-card p-6 h-full hover-lift cursor-pointer group flex flex-col"
      >
        {/* Top Row: Category & Level */}
        <div className="flex items-center justify-between mb-4">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border capitalize ${categoryColors[course.category] || categoryColors.development}`}>
            <CategoryIcon className="h-3.5 w-3.5" />
            {course.category}
          </div>
          <div className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${levelColors[course.difficulty] || levelColors.beginner}`}>
            {course.difficulty}
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
          {course.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          {course.duration && (
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {course.duration}
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5" />
            {course.lessons_count} lessons
          </div>
        </div>

        {/* Opportunity Links */}
        <div className="flex flex-col gap-1 mb-4">
          <div className="text-xs text-muted-foreground">
            <span className="text-primary font-medium">
              {course.unlocks_internships} internships + {course.unlocks_jobs} jobs
            </span>{" "}
            unlocked
          </div>
          <div className="text-[10px] text-muted-foreground italic">
            Prepares for: {course.category === 'ai' ? 'AI Engineer, ML Engineer' :
              course.category === 'development' ? 'Frontend, Full-Stack Developer' :
                course.category === 'design' ? 'Product Designer, UX Researcher' :
                  'Growth Lead, SEO Specialist'}
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-0">
            Free
          </Badge>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Start Learning
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
