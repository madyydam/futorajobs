import { useCourses } from "@/hooks/useCourses";
import { CourseCard } from "@/components/courses/CourseCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function CoursesSection() {
  const { courses, isLoading } = useCourses();
  // Show first 3 courses on homepage
  const featuredCourses = courses.slice(0, 3);

  return (
    <section id="courses-section" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <BookOpen className="h-4 w-4" />
          Career-Aligned Learning
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Learn Skills That Actually <span className="gradient-text">Get You Hired</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Handpicked courses aligned with real jobs and internships at Futora.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {featuredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      )}


      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Link to="/courses">
          <Button
            variant="outline"
            size="lg"
            className="border-border hover:bg-accent group"
          >
            View All Courses
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
