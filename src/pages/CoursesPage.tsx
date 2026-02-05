import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { useCourses } from "@/hooks/useCourses";
import { CourseCard } from "@/components/courses/CourseCard";
import { Button } from "@/components/ui/button";
import { BookOpen, Filter, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const CoursesPage = () => {
    const { courses, isLoading } = useCourses();
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [selectedLevel, setSelectedLevel] = useState<string>("All");

    const categories = ["All", "AI", "Development", "Design", "Growth"];
    const levels = ["All", "Beginner", "Intermediate", "Advanced"];

    const filteredCourses = courses.filter((course) => {
        const categoryMatch = selectedCategory === "All" || course.category === selectedCategory;
        const levelMatch = selectedLevel === "All" || course.difficulty === selectedLevel;
        return categoryMatch && levelMatch;
    });

    return (
        <Layout>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <section className="py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <BookOpen className="h-4 w-4" />
                            All Courses
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                            Learn Skills That Actually <span className="gradient-text">Get You Hired</span>
                        </h1>

                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                            Handpicked courses aligned with real jobs and internships at Futora. Build practical skills that employers are looking for.
                        </p>
                    </motion.div>
                </section>

                {/* Filters */}
                <section className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col md:flex-row gap-4"
                    >
                        {/* Category Filter */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <Filter className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Category</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <Button
                                        key={category}
                                        variant={selectedCategory === category ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedCategory(category)}
                                        className="text-sm"
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Level Filter */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <Filter className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Level</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {levels.map((level) => (
                                    <Button
                                        key={level}
                                        variant={selectedLevel === level ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedLevel(level)}
                                        className="text-sm"
                                    >
                                        {level}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Courses Grid */}
                <section className="pb-12">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : filteredCourses.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground text-lg">No courses found matching your filters.</p>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredCourses.map((course, index) => (
                                <CourseCard key={course.id} course={course} index={index} />
                            ))}
                        </motion.div>
                    )}
                </section>
            </div>
        </Layout>
    );
};

export default CoursesPage;
