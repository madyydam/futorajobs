import { motion } from "framer-motion";
import { Play, Clock, BarChart3, Bookmark, Star, ExternalLink, PlayCircle, Heart } from "lucide-react";
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
            whileHover={{ y: -4 }}
            className="group relative bg-[#0F172A]/40 backdrop-blur-3xl border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
            {/* Thumbnail Area */}
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60" />

                {/* Level Badge */}
                <div className="absolute top-4 left-4">
                    <span className={cn(
                        "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border backdrop-blur-md",
                        course.difficulty === 'Beginner' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                            course.difficulty === 'Intermediate' ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                                "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    )}>
                        {course.difficulty}
                    </span>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-bold text-white flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-primary" />
                    {course.duration}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-black shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                        <PlayCircle className="h-8 w-8 fill-current" />
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-4">
                <div className="space-y-2">
                    <h3 className="text-base font-black text-white italic uppercase tracking-tight line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        {course.title}
                    </h3>
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[8px] font-black text-primary uppercase">
                            {course.instructor_name?.charAt(0)}
                        </div>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{course.instructor_name}</span>
                    </div>
                </div>

                {/* Progress Bar (if exists) */}
                {progress !== undefined && progress > 0 && (
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-primary">
                            <span>Progress</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-primary"
                            />
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-bold text-white">{course.rating}</span>
                        <span className="text-[9px] text-muted-foreground font-medium">({(course.total_views / 1000).toFixed(1)}k)</span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={(e) => { e.preventDefault(); onBookmark?.(course.id); }}
                            className={cn(
                                "p-2 rounded-xl border transition-all",
                                isBookmarked ? "bg-primary/10 border-primary/20 text-primary" : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
                            )}
                        >
                            <Heart className={cn("h-3.5 w-3.5", isBookmarked && "fill-current")} />
                        </button>
                        <Link to={`/learning/video/${course.id}`}>
                            <Button size="sm" className="h-9 px-4 rounded-xl font-black bg-primary text-black hover:bg-primary/90 text-[10px] uppercase tracking-tighter italic">
                                WATCH NOW
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
