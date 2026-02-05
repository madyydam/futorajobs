 import { motion } from "framer-motion";
 import { Progress } from "@/components/ui/progress";
 import { cn } from "@/lib/utils";
 
 interface Skill {
   name: string;
   level: number;
   category: string;
 }
 
 interface SkillGraphProps {
   skills: Skill[];
   className?: string;
 }
 
 const categoryColors: Record<string, string> = {
   ai: "bg-purple-500",
   development: "bg-blue-500",
   design: "bg-pink-500",
   growth: "bg-green-500",
 };
 
 const categoryBgColors: Record<string, string> = {
   ai: "bg-purple-500/20",
   development: "bg-blue-500/20",
   design: "bg-pink-500/20",
   growth: "bg-green-500/20",
 };
 
 export const SkillGraph = ({ skills, className }: SkillGraphProps) => {
   if (!skills.length) {
     return (
       <div className={cn("text-center py-8 text-muted-foreground", className)}>
         <p className="text-sm">No skills yet. Complete courses to build your skill graph!</p>
       </div>
     );
   }
 
   return (
     <div className={cn("space-y-4", className)}>
       {skills.map((skill, index) => (
         <motion.div
           key={skill.name}
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: index * 0.05 }}
           className="space-y-2"
         >
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
               <div
                 className={cn(
                   "w-2 h-2 rounded-full",
                   categoryColors[skill.category] || "bg-primary"
                 )}
               />
               <span className="text-sm font-medium text-foreground">
                 {skill.name}
               </span>
             </div>
             <span className="text-xs text-muted-foreground">
               {skill.level}%
             </span>
           </div>
           <div className={cn("h-2 rounded-full overflow-hidden", categoryBgColors[skill.category] || "bg-secondary")}>
             <motion.div
               initial={{ width: 0 }}
               animate={{ width: `${skill.level}%` }}
               transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
               className={cn("h-full rounded-full", categoryColors[skill.category] || "bg-primary")}
             />
           </div>
         </motion.div>
       ))}
     </div>
   );
 };