 import { motion } from "framer-motion";
 import { Lock, Unlock, TrendingUp } from "lucide-react";
 import { cn } from "@/lib/utils";
 
 interface ReadinessScoreProps {
   score: number;
   minRequired: number;
   type: "internship" | "job";
   className?: string;
 }
 
 export const ReadinessScore = ({
   score,
   minRequired,
   type,
   className,
 }: ReadinessScoreProps) => {
   const isUnlocked = score >= minRequired;
   const percentage = Math.min(100, score);
 
   // Determine color based on score
   const getColor = () => {
     if (score >= 80) return "text-green-500";
     if (score >= 60) return "text-yellow-500";
     if (score >= 40) return "text-orange-500";
     return "text-red-500";
   };
 
   const getBgColor = () => {
     if (score >= 80) return "bg-green-500";
     if (score >= 60) return "bg-yellow-500";
     if (score >= 40) return "bg-orange-500";
     return "bg-red-500";
   };
 
   return (
     <div className={cn("", className)}>
       <div className="flex items-center justify-between mb-2">
         <div className="flex items-center gap-2">
           {isUnlocked ? (
             <Unlock className="w-4 h-4 text-green-500" />
           ) : (
             <Lock className="w-4 h-4 text-muted-foreground" />
           )}
           <span className="text-xs text-muted-foreground">
             {isUnlocked ? "Ready to apply" : `Need ${minRequired}% to unlock`}
           </span>
         </div>
         <div className={cn("flex items-center gap-1", getColor())}>
           <TrendingUp className="w-3 h-3" />
           <span className="text-sm font-bold">{score}%</span>
         </div>
       </div>
 
       <div className="h-2 bg-muted rounded-full overflow-hidden">
         <motion.div
           initial={{ width: 0 }}
           animate={{ width: `${percentage}%` }}
           transition={{ duration: 0.5 }}
           className={cn("h-full rounded-full", getBgColor())}
         />
       </div>
     </div>
   );
 };