import { Layout } from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Sparkles, BookOpen, Clock, BarChart3, TrendingUp, Code, Palette, Smartphone, PlayCircle } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VideoCourseCard } from "@/components/learning/VideoCourseCard";
import { useVideoLearning } from "@/hooks/useVideoLearning";
import { cn } from "@/lib/utils";

const VideoHub = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedLevel, setSelectedLevel] = useState("all");

    const { categories, courses, progress, isLoading } = useVideoLearning(
        selectedCategory === 'all' ? undefined : selectedCategory
    );

    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesLevel = selectedLevel === 'all' || course.difficulty === selectedLevel;
            return matchesSearch && matchesLevel;
        });
    }, [courses, searchQuery, selectedLevel]);

    const getProgressForCourse = (courseId: string) => {
        return progress.find(p => p.course_id === courseId)?.progress_percent;
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto space-y-12 pb-20">
                {/* Hero Header */}
                <section className="relative pt-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[120px] -z-10 rounded-full"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16 space-y-4"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-widest uppercase">
                            <Sparkles className="h-3 w-3" />
                            PREMIUM LEARNING HUB
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
                            Master New Skills with <br />
                            <span className="text-primary italic">Expert-Led</span> Videos
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Structured video paths designed to take you from absolute beginner to industry-ready professional.
                        </p>
                    </motion.div>

                    {/* Search & Filters Area */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-12 max-w-4xl mx-auto px-4"
                    >
                        <div className="flex flex-col md:flex-row gap-4 p-2 bg-card/40 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-[2rem] shadow-2xl">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    placeholder="Search courses, skills, or topics..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-14 bg-transparent border-none pl-12 focus-visible:ring-0 text-lg"
                                />
                            </div>
                            <div className="h-10 w-[1px] bg-white/10 self-center hidden md:block" />
                            <div className="flex gap-2">
                                <select
                                    className="bg-transparent text-sm font-bold uppercase tracking-widest px-4 focus:outline-none cursor-pointer"
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value)}
                                >
                                    <option value="all" className="bg-slate-900">Difficulty: All</option>
                                    <option value="Beginner" className="bg-slate-900">Beginner</option>
                                    <option value="Intermediate" className="bg-slate-900">Intermediate</option>
                                    <option value="Advanced" className="bg-slate-900">Advanced</option>
                                </select>
                                <Button className="h-12 w-12 rounded-2xl bg-primary text-black hover:bg-primary/90">
                                    <Filter className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Category Navigation */}
                <section className="px-4">
                    <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide no-scrollbar">
                        <Button
                            variant={selectedCategory === 'all' ? 'default' : 'outline'}
                            onClick={() => setSelectedCategory('all')}
                            className={cn(
                                "rounded-full px-6 font-bold h-11 border-white/10 whitespace-nowrap",
                                selectedCategory === 'all' ? "bg-primary text-black" : "text-white hover:bg-white/5"
                            )}
                        >
                            All Categories
                        </Button>
                        {categories.map((cat) => (
                            <Button
                                key={cat.id}
                                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={cn(
                                    "rounded-full px-6 font-bold h-11 border-white/10 whitespace-nowrap",
                                    selectedCategory === cat.id ? "bg-primary text-black" : "text-white hover:bg-white/5 flex gap-2"
                                )}
                            >
                                {cat.name}
                            </Button>
                        ))}
                    </div>
                </section>

                {/* Course Grid */}
                <section className="px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">Explore Courses</h2>
                            <p className="text-sm text-muted-foreground">Showing {filteredCourses.length} professional courses</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-primary" />
                                Trending
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="aspect-video rounded-3xl bg-white/5 animate-pulse" />
                            ))}
                        </div>
                    ) : filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCourses.map((course) => (
                                <VideoCourseCard
                                    key={course.id}
                                    course={course}
                                    progress={getProgressForCourse(course.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center bg-card/20 rounded-[3rem] border border-dashed border-white/10">
                            <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-6">
                                <PlayCircle className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No courses found</h3>
                            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
                            <Button variant="link" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setSelectedLevel("all"); }} className="mt-4 text-primary">
                                Clear all filters
                            </Button>
                        </div>
                    )}
                </section>

                {/* Recommendation Banner */}
                <section className="px-4">
                    <div className="relative overflow-hidden rounded-[3rem] p-12 bg-gradient-to-br from-primary/20 to-blue-600/20 border border-primary/30">
                        <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-10 -translate-y-10">
                            <Sparkles className="h-64 w-64 text-primary" />
                        </div>
                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-3xl font-black text-white mb-4 italic">personalized Learning Path</h2>
                            <p className="text-lg text-primary/80 mb-8 font-medium">
                                We've analyzed your interest in <span className="text-white underline decoration-wavy">AI and Web Development</span>.
                                Complete these 3 courses to unlock direct interview opportunities at Futora Labs.
                            </p>
                            <Button size="lg" className="rounded-2xl px-8 font-black bg-white text-black hover:bg-white/90">
                                VIEW MY PATH
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default VideoHub;
