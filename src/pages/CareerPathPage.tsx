 import { Layout } from "@/components/layout/Layout";
 import { Button } from "@/components/ui/button";
 import { motion } from "framer-motion";
 import { useParams, useNavigate } from "react-router-dom";
 import { useCareerPaths, useUserCareerPath } from "@/hooks/useCareerPaths";
 import { useAuth } from "@/hooks/useAuth";
 import { CareerRoadmap } from "@/components/career/CareerRoadmap";
 import { Brain, Code, Palette, TrendingUp, BookOpen, Hammer, Briefcase, GraduationCap, ArrowRight, Check, Loader2 } from "lucide-react";
 import { cn } from "@/lib/utils";
 import { toast } from "sonner";
 
 const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
   brain: Brain,
   code: Code,
   palette: Palette,
   "trending-up": TrendingUp,
 };
 
 const CareerPathPage = () => {
   const { pathId } = useParams();
   const navigate = useNavigate();
   const { user } = useAuth();
   const { careerPaths, isLoading } = useCareerPaths();
   const { userCareerPath, selectCareerPath } = useUserCareerPath();
 
   const careerPath = careerPaths.find((cp) => cp.id === pathId);
 
   if (isLoading) {
     return (
       <Layout>
         <div className="flex items-center justify-center py-20">
           <Loader2 className="h-8 w-8 animate-spin text-primary" />
         </div>
       </Layout>
     );
   }
 
   if (!careerPath) {
     return (
       <Layout>
         <div className="text-center py-20">
           <p className="text-muted-foreground">Career path not found.</p>
           <Button onClick={() => navigate("/")} className="mt-4">
             Go Back
           </Button>
         </div>
       </Layout>
     );
   }
 
   const IconComponent = iconMap[careerPath.icon || "code"] || Code;
   const isEnrolled = userCareerPath?.career_path_id === careerPath.id;
 
   const handleEnroll = async () => {
     if (!user) {
       toast.error("Please sign in to enroll");
       navigate("/auth");
       return;
     }
 
     try {
       await selectCareerPath.mutateAsync(careerPath.id);
       toast.success(`Enrolled in ${careerPath.title}!`);
     } catch (error) {
       toast.error("Failed to enroll");
     }
   };
 
   return (
     <Layout>
       <div className="max-w-4xl mx-auto">
         {/* Header */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8"
         >
           <div className="flex items-start gap-4 mb-6">
             <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
               <IconComponent className="h-8 w-8 text-primary" />
             </div>
             <div className="flex-1">
               <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                 {careerPath.title}
               </h1>
               <p className="text-muted-foreground">{careerPath.description}</p>
             </div>
           </div>
 
           {/* Meta */}
           <div className="flex flex-wrap gap-4 mb-6">
             <span className="skill-chip capitalize">{careerPath.difficulty}</span>
             <span className="text-sm text-muted-foreground">
               {careerPath.duration_weeks} weeks
             </span>
           </div>
 
           {/* Enroll Button */}
           {isEnrolled ? (
             <div className="flex items-center gap-2 text-primary">
               <Check className="h-5 w-5" />
               <span className="font-medium">Currently enrolled</span>
             </div>
           ) : (
             <Button
               onClick={handleEnroll}
               className="bg-primary text-primary-foreground hover:bg-primary/90"
               disabled={selectCareerPath.isPending}
             >
               {selectCareerPath.isPending ? (
                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
               ) : null}
               Start This Path
               <ArrowRight className="h-4 w-4 ml-2" />
             </Button>
           )}
         </motion.div>
 
         {/* Roadmap */}
         {isEnrolled && userCareerPath && (
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="mb-8"
           >
             <div className="clean-card p-6">
               <h2 className="text-lg font-semibold text-foreground mb-4">
                 Your Progress
               </h2>
               <CareerRoadmap
                 currentStep={userCareerPath.current_step as "learn" | "build" | "apply" | "hired"}
                 progress={userCareerPath.progress_percentage}
               />
             </div>
           </motion.div>
         )}
 
         {/* What's Included */}
         <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="mb-8"
         >
           <h2 className="text-lg font-semibold text-foreground mb-4">
             What's Included
           </h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="clean-card p-4 text-center">
               <BookOpen className="h-6 w-6 text-primary mx-auto mb-2" />
               <p className="text-2xl font-bold text-foreground">
                 {careerPath.total_courses}
               </p>
               <p className="text-xs text-muted-foreground">Courses</p>
             </div>
             <div className="clean-card p-4 text-center">
               <Hammer className="h-6 w-6 text-primary mx-auto mb-2" />
               <p className="text-2xl font-bold text-foreground">
                 {careerPath.total_projects}
               </p>
               <p className="text-xs text-muted-foreground">Projects</p>
             </div>
             <div className="clean-card p-4 text-center">
               <GraduationCap className="h-6 w-6 text-primary mx-auto mb-2" />
               <p className="text-2xl font-bold text-foreground">
                 {careerPath.total_internships}
               </p>
               <p className="text-xs text-muted-foreground">Internships</p>
             </div>
             <div className="clean-card p-4 text-center">
               <Briefcase className="h-6 w-6 text-primary mx-auto mb-2" />
               <p className="text-2xl font-bold text-foreground">
                 {careerPath.total_jobs}
               </p>
               <p className="text-xs text-muted-foreground">Jobs</p>
             </div>
           </div>
         </motion.div>
 
         {/* Journey Steps */}
         <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
         >
           <h2 className="text-lg font-semibold text-foreground mb-4">
             Your Journey
           </h2>
           <div className="space-y-4">
             <div className="clean-card p-6">
               <div className="flex items-start gap-4">
                 <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                   <span className="text-primary font-bold">1</span>
                 </div>
                 <div>
                   <h3 className="font-semibold text-foreground mb-1">Learn</h3>
                   <p className="text-sm text-muted-foreground">
                     Complete {careerPath.total_courses} courses to build your foundational skills.
                   </p>
                 </div>
               </div>
             </div>
 
             <div className="clean-card p-6">
               <div className="flex items-start gap-4">
                 <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                   <span className="text-primary font-bold">2</span>
                 </div>
                 <div>
                   <h3 className="font-semibold text-foreground mb-1">Build</h3>
                   <p className="text-sm text-muted-foreground">
                     Submit {careerPath.total_projects} projects to create your proof of work.
                   </p>
                 </div>
               </div>
             </div>
 
             <div className="clean-card p-6">
               <div className="flex items-start gap-4">
                 <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                   <span className="text-primary font-bold">3</span>
                 </div>
                 <div>
                   <h3 className="font-semibold text-foreground mb-1">Apply</h3>
                   <p className="text-sm text-muted-foreground">
                     Unlock and apply to {careerPath.total_internships} internships and {careerPath.total_jobs} jobs.
                   </p>
                 </div>
               </div>
             </div>
 
             <div className="clean-card p-6">
               <div className="flex items-start gap-4">
                 <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
                   <span className="text-primary-foreground font-bold">4</span>
                 </div>
                 <div>
                   <h3 className="font-semibold text-foreground mb-1">Get Hired</h3>
                   <p className="text-sm text-muted-foreground">
                     Land your dream role with your proven skills and portfolio.
                   </p>
                 </div>
               </div>
             </div>
           </div>
         </motion.div>
       </div>
     </Layout>
   );
 };
 
 export default CareerPathPage;