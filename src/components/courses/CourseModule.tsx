import { useState } from "react";
import { Module, Lesson } from "@/data/courseDetails";
import { 
  ChevronDown, 
  ChevronUp, 
  Play, 
  FileText, 
  Code, 
  HelpCircle,
  Lock,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const lessonTypeIcons = {
  video: Play,
  reading: FileText,
  project: Code,
  quiz: HelpCircle,
};

const lessonTypeColors = {
  video: "text-blue-500",
  reading: "text-amber-500",
  project: "text-emerald-500",
  quiz: "text-violet-500",
};

interface CourseModuleProps {
  module: Module;
  index: number;
}

export function CourseModule({ module, index }: CourseModuleProps) {
  const [isOpen, setIsOpen] = useState(index === 0);
  
  const completedCount = module.lessons.filter(l => l.isCompleted).length;
  const totalCount = module.lessons.length;

  return (
    <div className="clean-card overflow-hidden">
      {/* Module Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-3 text-left">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-semibold text-sm">{index + 1}</span>
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm md:text-base">
              {module.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {totalCount} lessons • {completedCount}/{totalCount} completed
            </p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>

      {/* Module Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border">
              {module.lessons.map((lesson, lessonIndex) => (
                <LessonItem key={lesson.id} lesson={lesson} index={lessonIndex} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface LessonItemProps {
  lesson: Lesson;
  index: number;
}

function LessonItem({ lesson, index }: LessonItemProps) {
  const Icon = lessonTypeIcons[lesson.type];
  const iconColor = lessonTypeColors[lesson.type];

  return (
    <div 
      className={cn(
        "flex items-center gap-3 p-4 border-b border-border last:border-b-0 transition-colors",
        lesson.isLocked 
          ? "opacity-50 cursor-not-allowed" 
          : "hover:bg-secondary/30 cursor-pointer"
      )}
    >
      {/* Status Icon */}
      <div className="flex-shrink-0">
        {lesson.isCompleted ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : lesson.isLocked ? (
          <Lock className="h-5 w-5 text-muted-foreground" />
        ) : (
          <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
        )}
      </div>

      {/* Lesson Info */}
      <div className="flex-1 min-w-0">
        <p className={cn(
          "font-medium text-sm truncate",
          lesson.isCompleted ? "text-muted-foreground" : "text-foreground"
        )}>
          {lesson.title}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Icon className={cn("h-3.5 w-3.5", iconColor)} />
          <span className="capitalize">{lesson.type}</span>
          <span>•</span>
          <span>{lesson.duration}</span>
        </div>
      </div>
    </div>
  );
}
