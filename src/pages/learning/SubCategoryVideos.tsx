import { Layout } from "@/components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Filter, PlayCircle, SlidersHorizontal } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VideoCourseCard } from "@/components/learning/VideoCourseCard";
import { useVideoLearning } from "@/hooks/useVideoLearning";
import { MOCK_VIDEO_CATEGORIES } from "@/data/learningMockData";
import { cn } from "@/lib/utils";

const SubCategoryVideos = () => {
    const { categorySlug, subSlug } = useParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("all");

    const { courses, isLoading } = useVideoLearning();

    const category = useMemo(() =>
        MOCK_VIDEO_CATEGORIES.find(c => c.slug === categorySlug),
        [categorySlug]);

    const subCategory = useMemo(() => {
        if (!category || !subSlug) return null;
        return category.subcategories?.find(s => s.id === subSlug);
    }, [category, subSlug]);

    const subName = useMemo(() => {
        return subCategory?.name || subSlug?.replace(/-/g, ' ').toUpperCase() || "";
    }, [subCategory, subSlug]);

    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            const matchesCategory = course.category_id === category?.id;
            const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesLevel = selectedLevel === 'all' || course.difficulty === selectedLevel;
            return matchesCategory && matchesSearch && matchesLevel;
        });
    }, [courses, category, searchQuery, selectedLevel]);

    if (!category) return null;

    return (
        <Layout>
            <div className="max-w-2xl mx-auto pb-32 px-4">

                {/* Back Link */}
                <div className="pt-8 pb-4">
                    <button
                        onClick={() => navigate(`/learning/${categorySlug}`)}
                        className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-primary transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                        Back to {category.name}
                    </button>
                </div>

                {/* Section 1: Sub-category Title */}
                <header className="pt-6 pb-2 text-center space-y-3">
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border"
                        style={{
                            backgroundColor: `${category.color}10`,
                            color: category.color,
                            borderColor: `${category.color}30`
                        }}
                    >
                        <PlayCircle className="h-3 w-3" />
                        Video Curriculum
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                        {subName}
                    </h1>
                </header>

                {/* Section 2: Header Info / Filters Label */}
                <div className="pb-6 text-center">
                    <p className="text-slate-500 text-sm font-medium">
                        Master {subName} with {filteredCourses.length} expert-led video lessons curated by industry leaders.
                    </p>
                </div>

                {/* Section 3: Filters Bar */}
                <div className="pb-8 flex items-center gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Find lessons..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-12 bg-white border border-slate-200 pl-11 rounded-xl text-sm font-medium text-slate-900 focus-visible:ring-primary/20"
                        />
                    </div>
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl bg-white border border-slate-200 shadow-sm active:bg-slate-50 transition-colors hover:border-primary/30">
                        <SlidersHorizontal className="h-5 w-5 text-slate-600" />
                    </Button>
                </div>

                {/* Level 3: Vertical Video Feed (Single Column) */}
                <div className="space-y-6">
                    {isLoading ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="aspect-video rounded-2xl bg-white/5 animate-pulse border border-white/5" />
                        ))
                    ) : filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                            <VideoCourseCard
                                key={course.id}
                                course={course}
                            />
                        ))
                    ) : (
                        <div className="py-20 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
                            <PlayCircle className="h-10 w-10 text-muted-foreground/20 mx-auto mb-4" />
                            <h3 className="text-lg font-black text-white italic uppercase tracking-tighter">Empty Curriculum</h3>
                            <p className="text-xs text-muted-foreground px-10">We are currently curating industry-level videos for this path.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default SubCategoryVideos;
