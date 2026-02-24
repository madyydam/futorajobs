import { useVideoLearning } from "@/hooks/useVideoLearning";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Trophy, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export const CoursesProgress = () => {
    const { courses, progress } = useVideoLearning();

    const activeProgress = progress.filter(p => (p.progress_percent || 0) > 0);
    const goldenTickets = progress.filter(p => p.status === 'completed');

    if (activeProgress.length === 0) return null;

    return (
        <div className="space-y-4">
            {/* Golden Tickets Section */}
            {goldenTickets.length > 0 && (
                <div className="clean-card p-6 bg-gradient-to-br from-amber-400/10 to-transparent border-amber-400/20">
                    <div className="flex items-center gap-2 mb-4">
                        <Trophy className="h-4 w-4 text-amber-500" />
                        <h3 className="text-sm font-bold text-amber-500 uppercase tracking-widest">
                            Golden Tickets ({goldenTickets.length})
                        </h3>
                    </div>
                    <div className="space-y-3">
                        {goldenTickets.map((t, i) => {
                            const course = courses.find(c => c.id === t.course_id);
                            return (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-amber-400/5 border border-amber-400/20">
                                    <Sparkles className="h-4 w-4 text-amber-400" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-white truncate">{course?.title || 'Course Completed'}</p>
                                        <p className="text-[10px] text-amber-400/60 uppercase font-black">Priority Interview Access</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* In Progress Section */}
            <div className="clean-card p-6">
                <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-sm font-medium text-muted-foreground italic">
                        Learning Progress
                    </h3>
                </div>
                <div className="space-y-5">
                    {activeProgress.slice(0, 3).map((p, i) => {
                        const course = courses.find(c => c.id === p.course_id);
                        return (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-[11px] font-bold">
                                    <span className="text-white truncate max-w-[150px]">{course?.title}</span>
                                    <span className="text-primary">{p.progress_percent}%</span>
                                </div>
                                <Progress value={p.progress_percent || 0} className="h-1.5" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
