import { Layout } from "@/components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Clock, BarChart3, Star, CheckCircle2, Bookmark, Share2, MoreHorizontal, PlayCircle, Sparkles, Target } from "lucide-react";


import { Button } from "@/components/ui/button";
import { useVideoLearning } from "@/hooks/useVideoLearning";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

const CoursePlayer = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { courses, progress, updateProgress, isLoading } = useVideoLearning();
    const [showGoldenTicket, setShowGoldenTicket] = useState(false);

    const course = useMemo(() => courses.find(c => c.id === courseId), [courses, courseId]);
    const courseProgress = useMemo(() => progress.find(p => p.course_id === courseId), [progress, courseId]);

    const handleComplete = async () => {
        if (!course) return;
        await updateProgress(course.id, 100);
        setShowGoldenTicket(true);
    };

    const getYoutubeEmbedUrl = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        const id = (match && match[2].length === 11) ? match[2] : null;
        return id ? `https://www.youtube.com/embed/${id}` : url;
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="max-w-6xl mx-auto py-20 text-center">
                    <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground font-bold tracking-widest uppercase text-xs">Loading Course...</p>
                </div>
            </Layout>
        );
    }

    if (!course) {
        return (
            <Layout>
                <div className="max-w-6xl mx-auto py-20 text-center">
                    <h1 className="text-2xl font-bold mb-4">Course not found</h1>
                    <Button onClick={() => navigate("/learning")}>Back to Hub</Button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-7xl mx-auto pb-20">
                <AnimatePresence>
                    {showGoldenTicket && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                        >
                            <motion.div
                                initial={{ scale: 0.8, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                className="relative max-w-lg w-full bg-gradient-to-br from-amber-400 to-amber-600 rounded-[3rem] p-1 shadow-[0_0_100px_rgba(251,191,36,0.3)]"
                            >
                                <div className="bg-slate-950 rounded-[2.9rem] p-10 text-center">
                                    <div className="mb-6 relative">
                                        <Sparkles className="h-20 w-20 text-amber-400 mx-auto animate-pulse" />
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 border-2 border-dashed border-amber-400/30 rounded-full scale-150"
                                        />
                                    </div>
                                    <h2 className="text-4xl font-black text-amber-400 mb-2 italic">GOLDEN TICKET UNLOCKED!</h2>
                                    <p className="text-white/80 font-medium mb-8">
                                        Congratulations! You've successfully completed <span className="text-white underline">{course.title}</span>.
                                        This ticket grants you direct interview priority for Futora Group opportunities.
                                    </p>

                                    <div className="p-6 rounded-3xl bg-amber-400/10 border border-amber-400/20 mb-8 text-left">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="text-[10px] font-black text-amber-400 tracking-widest uppercase">Member ID</div>
                                                <div className="text-white font-mono font-bold tracking-tighter">FUTORA-{Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                                            </div>
                                            <PlayCircle className="h-8 w-8 text-amber-400" />
                                        </div>
                                        <div className="text-xs text-white/60">VALID FOR: DIRECT JOB INTERVIEWS</div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <Button
                                            onClick={() => navigate("/profile")}
                                            className="h-14 rounded-2xl bg-amber-400 text-black font-black hover:bg-amber-300"
                                        >
                                            VIEW IN MY PROFILE
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={() => setShowGoldenTicket(false)}
                                            className="text-white/50 hover:text-white"
                                        >
                                            CONTINUE LEARNING
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Header Navigation */}
                <div className="flex items-center justify-between mb-8 group">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/learning")}
                        className="rounded-xl hover:bg-white/5 group-hover:-translate-x-1 transition-all"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        BACK TO LEARNING HUB
                    </Button>

                    <div className="flex items-center gap-4">
                        {courseProgress?.status === 'completed' && (
                            <div className="px-4 py-2 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-black tracking-widest flex items-center gap-2">
                                <Sparkles className="h-4 w-4" />
                                GOLDEN TICKET ACTIVE
                            </div>
                        )}
                        <Button variant="outline" size="icon" className="rounded-xl border-white/10 hover:bg-white/5">
                            <Bookmark className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Video Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Video Player Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl shadow-primary/10"
                        >
                            <iframe
                                src={getYoutubeEmbedUrl(course.video_url)}
                                className="absolute inset-0 w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </motion.div>

                        {/* Course Info */}
                        <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10">
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                    {course.category?.name}
                                </span>
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-bold uppercase tracking-wider">
                                    <Clock className="h-4 w-4" />
                                    {course.duration}
                                </div>
                                <div className="ml-auto flex gap-2">
                                    {courseProgress?.status !== 'completed' ? (
                                        <Button
                                            onClick={handleComplete}
                                            className="rounded-xl px-6 font-bold bg-primary text-black hover:bg-primary/90"
                                        >
                                            MARK AS COMPLETED
                                        </Button>
                                    ) : (
                                        <Button
                                            className="rounded-xl px-6 font-bold bg-green-500/20 text-green-400 border border-green-500/30 cursor-default"
                                        >
                                            <CheckCircle2 className="h-4 w-4 mr-2" />
                                            COMPLETED
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                                {course.title}
                            </h1>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                                {course.description || "Master these industry-standard skills with our curated video curriculum."}
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 p-2">
                                <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl">
                                    <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center text-xl font-black uppercase tracking-wider">
                                        {course.instructor_name?.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-0.5">Instructor</div>
                                        <div className="font-bold text-white flex items-center gap-1.5 text-lg">
                                            {course.instructor_name}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                                        <Target className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-primary font-bold uppercase tracking-widest mb-0.5">OUTCOME</div>
                                        <div className="font-bold text-white text-lg">
                                            Industry Ready
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Career Pathway Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-slate-900 to-black border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                                <BarChart3 className="h-40 w-40 text-primary" />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Post-Course Pathway</h3>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h4 className="text-primary font-black uppercase tracking-widest text-xs">Unlocked Opportunities</h4>
                                        <ul className="space-y-3">
                                            {[
                                                { role: "Junior Developer", comp: "Futora Labs", type: "Full-Time" },
                                                { role: "Product Designer", comp: "Lunexi Inc", type: "Internship" },
                                                { role: "Freelance Gig", comp: "Marketplace", type: "Project" }
                                            ].map((job, idx) => (
                                                <li key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                                                    <div>
                                                        <div className="font-bold text-white">{job.role}</div>
                                                        <div className="text-[10px] text-muted-foreground uppercase">{job.comp}</div>
                                                    </div>
                                                    <span className="text-[10px] px-2 py-1 rounded bg-white/10 text-white font-bold">{job.type}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="p-6 bg-primary/10 border border-primary/20 rounded-3xl">
                                            <h4 className="text-white font-bold mb-2">Download Roadmap</h4>
                                            <p className="text-sm text-muted-foreground mb-4">Get the full industry standard curriculum and project guide for this path.</p>
                                            <Button className="w-full rounded-xl font-black bg-white text-black hover:bg-slate-200">
                                                DOWNLOAD PDF
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>


                    {/* Sidebar Area - Course Context */}
                    <div className="space-y-6">
                        <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <PlayCircle className="h-5 w-5 text-primary" />
                                COURSE CURRICULUM
                            </h3>
                            <div className="space-y-2">
                                {[
                                    { title: "Introduction & Setup", duration: "05:00", active: true },
                                    { title: "Core Fundamentals", duration: "12:30", active: false },
                                    { title: "Advanced Architecture", duration: "18:20", active: false },
                                    { title: "Performance Optimization", duration: "10:45", active: false },
                                    { title: "Deployment Guide", duration: "08:15", active: false }
                                ].map((step, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer",
                                            step.active ? "bg-primary/10 border-primary/30" : "bg-white/5 border-transparent hover:border-white/10"
                                        )}
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className={cn(
                                                "h-6 w-6 rounded-lg flex items-center justify-center text-[10px] font-black",
                                                step.active ? "bg-primary text-black" : "bg-white/10 text-muted-foreground"
                                            )}>
                                                {i + 1}
                                            </div>
                                            <span className={cn(
                                                "text-sm font-bold truncate",
                                                step.active ? "text-white" : "text-muted-foreground"
                                            )}>{step.title}</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-muted-foreground tabular-nums">{step.duration}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Learning Milestones */}
                        <div className="bg-gradient-to-br from-blue-600/10 to-primary/10 border border-white/10 rounded-[2rem] p-6">
                            <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">Milestone reward</h4>
                            <p className="text-sm text-white font-bold leading-snug mb-4 italic">
                                "Complete this curso to unlock the 'AI Enthusiast' badge on your profile."
                            </p>
                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[33%]" />
                            </div>
                            <div className="flex justify-between mt-2 text-[10px] font-semibold text-muted-foreground">
                                <span>33% COMPLETE</span>
                                <span>1/3 CHAPTERS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CoursePlayer;
