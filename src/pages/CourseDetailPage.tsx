import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SkillChip } from "@/components/ui/SkillChip";
import { mockCourseDetails } from "@/data/courseDetails";
import { mockCourses } from "@/data/courses";
import { 
  ArrowLeft, 
  Clock, 
  Briefcase, 
  GraduationCap, 
  Users, 
  Star,
  Play,
  FileText,
  Code,
  HelpCircle,
  Lock,
  CheckCircle2,
  Sparkles,
  Palette,
  TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";
import { CourseModule } from "@/components/courses/CourseModule";

const categoryIcons = {
  AI: Sparkles,
  Development: Code,
  Design: Palette,
  Growth: TrendingUp,
};

const categoryColors = {
  AI: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  Development: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Design: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  Growth: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
};

const levelColors = {
  Beginner: "bg-green-500/10 text-green-600 dark:text-green-400",
  Intermediate: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Advanced: "bg-red-500/10 text-red-600 dark:text-red-400",
};

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  // Try to get detailed course data, fallback to basic course data
  const courseDetail = courseId ? mockCourseDetails[courseId] : null;
  const basicCourse = mockCourses.find(c => c.id === courseId);
  
  if (!courseDetail && !basicCourse) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Course not found</h1>
          <p className="text-muted-foreground mb-6">This course doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/")}>Back to Learn</Button>
        </div>
      </Layout>
    );
  }

  // Use detailed data if available, otherwise construct from basic data
  const course = courseDetail || {
    ...basicCourse!,
    longDescription: basicCourse!.description,
    mappedInternships: Math.floor(basicCourse!.mappedJobs * 0.8),
    instructor: { name: "Futora Team", role: "Expert Instructors" },
    skills: [],
    modules: [],
    enrolledCount: Math.floor(Math.random() * 1000) + 200,
    rating: 4.7,
    reviewCount: Math.floor(Math.random() * 200) + 50,
  };

  const CategoryIcon = categoryIcons[course.category];
  const OutcomeIcon = course.outcome === "Job-ready" ? Briefcase : GraduationCap;
  
  const totalLessons = course.modules?.reduce((acc, m) => acc + m.lessons.length, 0) || 0;
  const completedLessons = 0; // Will be dynamic with backend
  const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </motion.button>

        {/* Course Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="clean-card p-6 md:p-8 mb-6"
        >
          {/* Category & Level */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${categoryColors[course.category]}`}>
              <CategoryIcon className="h-3.5 w-3.5" />
              {course.category}
            </div>
            <div className={`px-2 py-0.5 text-xs font-medium rounded-full ${levelColors[course.level]}`}>
              {course.level}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <OutcomeIcon className="h-3.5 w-3.5" />
              {course.outcome}
            </div>
          </div>

          {/* Title & Description */}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {course.title}
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {course.longDescription || course.description}
          </p>

          {/* Meta Stats */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              {course.enrolledCount?.toLocaleString()} enrolled
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-500" />
              {course.rating} ({course.reviewCount} reviews)
            </div>
          </div>

          {/* Instructor */}
          <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg mb-6">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-semibold text-sm">
                {course.instructor?.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">{course.instructor?.name}</p>
              <p className="text-xs text-muted-foreground">{course.instructor?.role}</p>
            </div>
          </div>

          {/* Skills */}
          {course.skills && course.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-foreground mb-2">Skills you'll learn</h3>
              <div className="flex flex-wrap gap-2">
                {course.skills.map((skill, i) => (
                  <SkillChip key={i}>{skill}</SkillChip>
                ))}
              </div>
            </div>
          )}

          {/* Opportunity Links */}
          <div className="flex flex-wrap gap-3 p-4 bg-primary/5 rounded-lg border border-primary/10 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="h-4 w-4 text-primary" />
              <span className="text-foreground">Unlocks <strong className="text-primary">{course.mappedJobs} jobs</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <GraduationCap className="h-4 w-4 text-primary" />
              <span className="text-foreground">Unlocks <strong className="text-primary">{course.mappedInternships} internships</strong></span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {course.isPaid ? (
              <>
                <Button size="lg" className="flex-1 sm:flex-none">
                  Enroll for ₹{course.price?.toLocaleString()}
                </Button>
                <span className="text-sm text-muted-foreground text-center sm:text-left">
                  One-time payment • Lifetime access
                </span>
              </>
            ) : (
              <Button size="lg" className="flex-1 sm:flex-none">
                Start Learning — Free
              </Button>
            )}
          </div>
        </motion.div>

        {/* Progress Section (shown if enrolled) */}
        {progressPercent > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="clean-card p-6 mb-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Your Progress</h3>
              <span className="text-sm text-muted-foreground">
                {completedLessons}/{totalLessons} lessons
              </span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </motion.div>
        )}

        {/* Curriculum */}
        {course.modules && course.modules.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h2 className="text-xl font-bold text-foreground mb-4">Curriculum</h2>
            <div className="space-y-3">
              {course.modules.map((module, index) => (
                <CourseModule key={module.id} module={module} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* What's Included */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="clean-card p-6"
        >
          <h2 className="text-xl font-bold text-foreground mb-4">What's Included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Play className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Video Lessons</p>
                <p className="text-xs text-muted-foreground">Bite-sized, practical content</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Code className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Hands-on Projects</p>
                <p className="text-xs text-muted-foreground">Build real portfolio pieces</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Skill Badges</p>
                <p className="text-xs text-muted-foreground">Added to your profile on completion</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Job Access</p>
                <p className="text-xs text-muted-foreground">Apply to aligned opportunities</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
