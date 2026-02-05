 import { motion } from "framer-motion";
 import { Flame, Trophy, Calendar } from "lucide-react";
 import { cn } from "@/lib/utils";
 
 interface LearningStreakProps {
   currentStreak: number;
   longestStreak: number;
   totalDays: number;
   className?: string;
 }
 
 export const LearningStreak = ({
   currentStreak,
   longestStreak,
   totalDays,
   className,
 }: LearningStreakProps) => {
   return (
     <div className={cn("grid grid-cols-3 gap-4", className)}>
       <motion.div
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         className="text-center p-4 rounded-xl bg-orange-500/10 border border-orange-500/20"
       >
         <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
         <p className="text-2xl font-bold text-foreground">{currentStreak}</p>
         <p className="text-xs text-muted-foreground">Day Streak</p>
       </motion.div>
 
       <motion.div
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.1 }}
         className="text-center p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20"
       >
         <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
         <p className="text-2xl font-bold text-foreground">{longestStreak}</p>
         <p className="text-xs text-muted-foreground">Best Streak</p>
       </motion.div>
 
       <motion.div
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.2 }}
         className="text-center p-4 rounded-xl bg-blue-500/10 border border-blue-500/20"
       >
         <Calendar className="w-6 h-6 text-blue-500 mx-auto mb-2" />
         <p className="text-2xl font-bold text-foreground">{totalDays}</p>
         <p className="text-xs text-muted-foreground">Total Days</p>
       </motion.div>
     </div>
   );
 };