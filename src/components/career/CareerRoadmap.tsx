 import { motion } from "framer-motion";
 import { BookOpen, Hammer, Briefcase, CheckCircle, Lock, ArrowRight } from "lucide-react";
 import { cn } from "@/lib/utils";
 
 interface CareerRoadmapProps {
   currentStep: "learn" | "build" | "apply" | "hired";
   progress: number;
   className?: string;
 }
 
 const steps = [
   { id: "learn", label: "Learn", icon: BookOpen, description: "Complete courses" },
   { id: "build", label: "Build", icon: Hammer, description: "Submit projects" },
   { id: "apply", label: "Apply", icon: Briefcase, description: "Unlock opportunities" },
   { id: "hired", label: "Hired", icon: CheckCircle, description: "Get placed" },
 ];
 
 export const CareerRoadmap = ({ currentStep, progress, className }: CareerRoadmapProps) => {
   const currentIndex = steps.findIndex((s) => s.id === currentStep);
 
   return (
     <div className={cn("", className)}>
       <div className="flex items-center justify-between mb-6">
         {steps.map((step, index) => {
           const isCompleted = index < currentIndex;
           const isCurrent = index === currentIndex;
           const isLocked = index > currentIndex;
 
           return (
             <div key={step.id} className="flex items-center">
               <motion.div
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ delay: index * 0.1 }}
                 className="flex flex-col items-center"
               >
                 <div
                   className={cn(
                     "w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-all",
                     isCompleted && "bg-primary text-primary-foreground",
                     isCurrent && "bg-primary/20 text-primary border-2 border-primary",
                     isLocked && "bg-muted text-muted-foreground"
                   )}
                 >
                   {isLocked ? (
                     <Lock className="w-5 h-5" />
                   ) : (
                     <step.icon className="w-5 h-5" />
                   )}
                 </div>
                 <p
                   className={cn(
                     "text-xs font-medium",
                     isCurrent ? "text-primary" : "text-muted-foreground"
                   )}
                 >
                   {step.label}
                 </p>
               </motion.div>
               {index < steps.length - 1 && (
                 <ArrowRight
                   className={cn(
                     "w-4 h-4 mx-2 mt-[-20px]",
                     index < currentIndex ? "text-primary" : "text-muted-foreground/30"
                   )}
                 />
               )}
             </div>
           );
         })}
       </div>
 
       {/* Progress bar */}
       <div className="h-2 bg-muted rounded-full overflow-hidden">
         <motion.div
           initial={{ width: 0 }}
           animate={{ width: `${progress}%` }}
           transition={{ duration: 0.5 }}
           className="h-full bg-primary rounded-full"
         />
       </div>
       <p className="text-xs text-muted-foreground mt-2 text-center">
         {progress}% complete on your journey
       </p>
     </div>
   );
 };