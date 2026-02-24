import { motion } from "framer-motion";
import { Play, Clock, BarChart, Bookmark, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoCourse } from "@/types/learning";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface VideoCourseCardProps {
    course: VideoCourse;
    progress?: number;
    isBookmarked?: boolean;
    onBookmark?: (id: string) => void;
}

export const VideoCourseCard = ({ course, progress, isBookmarked, onBookmark }: VideoCourseCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,209,255,0.1)]"
        >
            {/* Thumbnail Area */}
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-black shadow-lg shadow-primary/40 transform scale-90 group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 fill-current" />
                    </div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-primary">
                        {course.category?.name || 'COURSE'}
                    </span>
                </div>

                {/* Progress Bar */}
                {progress !== undefined && progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                        <div
                            className="h-full bg-primary"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        <span className={cn(
                            "px-1.5 py-0.5 rounded",
                            course.difficulty === 'Beginner' ? "text-green-400 bg-green-400/10" :
                                course.difficulty === 'Intermediate' ? "text-amber-400 bg-amber-400/10" :
                                    "text-rose-400 bg-rose-400/10"
                        )}>
                            {course.difficulty}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {course.duration}
                        </span>
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onBookmark?.(course.id);
                        }}
                        className={cn(
                            "p-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors",
                            isBookmarked ? "text-primary border-primary/30" : "text-muted-foreground"
                        )}
                    >
                        <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
                    </button>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 min-h-[3.5rem] leading-tight group-hover:text-primary transition-colors">
                    {course.title}
                </h3>

                <div className="flex items-center justify-between mt-4 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                            {course.instructor_name?.charAt(0)}
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">{course.instructor_name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-xs font-bold">{course.rating}</span>
                    </div>
                </div>

                <div className="flex gap-2 mt-4">
                    <Button asChild className="flex-1 rounded-xl font-bold bg-primary text-black hover:bg-primary/90">
                        <Link to={`/learning/video/${course.id}`}>
                            START LEARNING
                        </Link>
                    </Button>
                    <Button variant="outline" className="w-10 rounded-xl border-white/10 hover:bg-white/5">
                        <ExternalLink className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};
