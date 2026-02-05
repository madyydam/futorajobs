 import { Layout } from "@/components/layout/Layout";
 import { Button } from "@/components/ui/button";
 import { motion } from "framer-motion";
 import { Link, useNavigate } from "react-router-dom";
 import { useAuth } from "@/hooks/useAuth";
 import { useProfile } from "@/hooks/useProfile";
 import { useUserSkills } from "@/hooks/useUserSkills";
 import { useUserCareerPath } from "@/hooks/useCareerPaths";
 import { SkillGraph } from "@/components/profile/SkillGraph";
 import { LearningStreak } from "@/components/profile/LearningStreak";
 import { CareerRoadmap } from "@/components/career/CareerRoadmap";
 import {
   Github,
   Twitter,
   Globe,
   Linkedin,
   Mail,
   Loader2,
   LogOut,
   Target,
   BookOpen,
 } from "lucide-react";
 
 const ProfilePage = () => {
   const navigate = useNavigate();
   const { user, loading: authLoading, signOut } = useAuth();
   const { profile, isLoading: profileLoading } = useProfile();
   const { userSkills } = useUserSkills();
   const { userCareerPath } = useUserCareerPath();
 
   const handleSignOut = async () => {
     await signOut();
     navigate("/");
   };
 
   // Not logged in
   if (!authLoading && !user) {
     return (
       <Layout>
         <div className="max-w-md mx-auto py-20 text-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
           >
             <h1 className="text-2xl font-bold text-foreground mb-4">
               Join Futora
             </h1>
             <p className="text-muted-foreground mb-6">
               Sign in to track your learning progress, build your skill graph, and unlock opportunities.
             </p>
             <Link to="/auth">
               <Button className="bg-primary text-primary-foreground">
                 Get Started
               </Button>
             </Link>
           </motion.div>
         </div>
       </Layout>
     );
   }
 
   // Loading
   if (authLoading || profileLoading) {
     return (
       <Layout>
         <div className="flex items-center justify-center py-20">
           <Loader2 className="h-8 w-8 animate-spin text-primary" />
         </div>
       </Layout>
     );
   }
 
   // Transform skills for SkillGraph
   const skillsForGraph = userSkills.map((us) => ({
     name: us.skill?.name || "Unknown",
     level: us.level,
     category: us.skill?.category || "development",
   }));
 
   return (
     <Layout>
       <div className="max-w-4xl mx-auto">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8"
         >
           <div className="flex items-center justify-between">
             <div>
               <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                 Profile
               </h1>
               <p className="text-muted-foreground">
                 Your builder passport in the Futora ecosystem
               </p>
             </div>
             <Button variant="ghost" onClick={handleSignOut} className="text-muted-foreground">
               <LogOut className="h-4 w-4 mr-2" />
               Sign Out
             </Button>
           </div>
         </motion.div>
 
         <div className="grid lg:grid-cols-3 gap-6">
           {/* Main Profile Card */}
           <div className="lg:col-span-2 space-y-6">
             {/* Profile Info */}
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
             >
               <div className="clean-card p-8">
                 <div className="flex items-start gap-4 mb-6">
                   <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                     {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || "?"}
                   </div>
                   <div className="flex-1">
                     <h2 className="text-xl font-bold text-foreground">
                       {profile?.full_name || "Builder"}
                     </h2>
                     <p className="text-muted-foreground">
                       {profile?.role || "Learning on Futora"}
                     </p>
                     <div className="flex items-center gap-2 mt-2 text-primary text-sm">
                       <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                       {profile?.availability || "Open to opportunities"}
                     </div>
                   </div>
                 </div>
 
                 {profile?.bio && (
                   <p className="text-foreground leading-relaxed mb-6">
                     {profile.bio}
                   </p>
                 )}
 
                 {/* Links */}
                 <div className="grid grid-cols-2 gap-3">
                   {profile?.website_url && (
                     <a
                       href={profile.website_url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                     >
                       <Globe className="h-4 w-4" />
                       Website
                     </a>
                   )}
                   {profile?.github_url && (
                     <a
                       href={profile.github_url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                     >
                       <Github className="h-4 w-4" />
                       GitHub
                     </a>
                   )}
                   {profile?.twitter_url && (
                     <a
                       href={profile.twitter_url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                     >
                       <Twitter className="h-4 w-4" />
                       Twitter
                     </a>
                   )}
                   {profile?.linkedin_url && (
                     <a
                       href={profile.linkedin_url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                     >
                       <Linkedin className="h-4 w-4" />
                       LinkedIn
                     </a>
                   )}
                   {profile?.email && (
                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                       <Mail className="h-4 w-4" />
                       {profile.email}
                     </div>
                   )}
                 </div>
               </div>
             </motion.div>
 
             {/* Skill Graph */}
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
             >
               <div className="clean-card p-6">
                 <h3 className="text-lg font-semibold text-foreground mb-4">
                   Skill Graph
                 </h3>
                 <SkillGraph skills={skillsForGraph} />
                 {skillsForGraph.length === 0 && (
                   <div className="text-center py-4">
                     <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                     <p className="text-sm text-muted-foreground">
                       Complete courses to build your skill graph
                     </p>
                     <Link to="/">
                       <Button variant="link" className="mt-2">
                         Start Learning
                       </Button>
                     </Link>
                   </div>
                 )}
               </div>
             </motion.div>
           </div>
 
           {/* Sidebar */}
           <div className="space-y-4">
             {/* Learning Streak */}
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
             >
               <div className="clean-card p-6">
                 <h3 className="text-sm font-medium text-muted-foreground mb-4">
                   Learning Streak
                 </h3>
                 <LearningStreak
                   currentStreak={profile?.current_streak || 0}
                   longestStreak={profile?.longest_streak || 0}
                   totalDays={profile?.total_learning_days || 0}
                 />
               </div>
             </motion.div>
 
             {/* Career Path Progress */}
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
             >
               <div className="clean-card p-6">
                 <div className="flex items-center gap-2 mb-4">
                   <Target className="h-4 w-4 text-muted-foreground" />
                   <h3 className="text-sm font-medium text-muted-foreground">
                     Career Path
                   </h3>
                 </div>
                 {userCareerPath ? (
                   <div>
                     <p className="font-medium text-foreground mb-3">
                       {userCareerPath.career_path?.title}
                     </p>
                     <CareerRoadmap
                       currentStep={userCareerPath.current_step as "learn" | "build" | "apply" | "hired"}
                       progress={userCareerPath.progress_percentage}
                     />
                   </div>
                 ) : (
                   <div className="text-center py-4">
                     <p className="text-sm text-muted-foreground mb-3">
                       No career path selected yet
                     </p>
                     <Link to="/">
                       <Button variant="outline" size="sm">
                         Choose a Path
                       </Button>
                     </Link>
                   </div>
                 )}
               </div>
             </motion.div>
           </div>
         </div>
       </div>
     </Layout>
   );
 };
 
 export default ProfilePage;
