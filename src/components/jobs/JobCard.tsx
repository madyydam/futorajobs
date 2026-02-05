 import { cn } from "@/lib/utils";
 import { Button } from "@/components/ui/button";
 import { MapPin, Banknote, ArrowRight, TrendingUp } from "lucide-react";
 import { Link } from "react-router-dom";
 import { motion } from "framer-motion";
 import { ReadinessScore } from "@/components/career/ReadinessScore";
 
 export interface JobCardData {
   id: string;
   title: string;
   company: string;
   company_logo?: string | null;
   description?: string | null;
   location?: string | null;
   salary_range?: string | null;
   experience_level?: string | null;
   category: string;
   is_remote: boolean;
   min_readiness_score: number;
   readiness_score?: number;
   is_ready?: boolean;
 }
 
 interface JobCardProps {
   job: JobCardData;
   index?: number;
   showReadiness?: boolean;
 }
 
 export function JobCard({ job, index = 0, showReadiness = true }: JobCardProps) {
   const isReady = job.is_ready ?? true;
   const readinessScore = job.readiness_score ?? 0;
 
   return (
     <motion.div
       className="clean-card p-6 group cursor-pointer hover-lift"
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.4, delay: index * 0.05 }}
     >
       <div className="flex flex-col gap-4">
         {/* Header */}
         <div className="flex items-start justify-between gap-4">
           <div className="flex-1">
             <div className="flex items-center gap-2 mb-1">
               <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                 {job.title}
               </h3>
               {job.is_remote && (
                 <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary">
                   Remote
                 </span>
               )}
             </div>
             <p className="text-sm text-muted-foreground">{job.company}</p>
           </div>
           <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
             <span className="text-lg font-bold text-primary">
               {job.company.charAt(0)}
             </span>
           </div>
         </div>
 
         {/* Description */}
         {job.description && (
           <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
             {job.description}
           </p>
         )}
 
         {/* Category & Experience */}
         <div className="flex flex-wrap gap-2">
           <span className="skill-chip capitalize">{job.category}</span>
           {job.experience_level && (
             <span className="vision-tag">{job.experience_level}</span>
           )}
         </div>
 
         {/* Meta */}
         <div className="flex items-center gap-4 text-xs text-muted-foreground">
           <span className="flex items-center gap-1">
             <MapPin className="h-3 w-3" />
             {job.location || "Remote"}
           </span>
           {job.salary_range && (
             <span className="flex items-center gap-1">
               <Banknote className="h-3 w-3" />
               {job.salary_range}
             </span>
           )}
         </div>
 
         {/* Readiness Score */}
         {showReadiness && (
           <ReadinessScore
             score={readinessScore}
             minRequired={job.min_readiness_score}
             type="job"
           />
         )}
 
         {/* CTA */}
         <div className="flex items-center justify-between pt-4 border-t border-border">
           <div className="flex items-center gap-1 text-xs">
             <TrendingUp className={cn("h-3 w-3", isReady ? "text-primary" : "text-muted-foreground")} />
             <span className={cn("font-medium", isReady ? "text-primary" : "text-muted-foreground")}>
               {isReady ? "Ready to apply" : `Need ${job.min_readiness_score}%`}
             </span>
           </div>
           <Link to={`/apply/job/${job.id}`}>
             <Button 
               size="sm" 
               className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors group/btn"
             >
               Apply
               <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
             </Button>
           </Link>
         </div>
       </div>
     </motion.div>
   );
 }
