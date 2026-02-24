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
import { CoursesProgress } from "@/components/profile/CoursesProgress";

import { useCallback, useMemo } from "react";
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
  Sparkles,
  MapPin,
  Zap
} from "lucide-react";
import {
  ProfileProjects,
  ProfileEducation,
  ProfileCertifications,
  ProfileAchievements
} from "@/components/profile/ProfileSections";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { profile, isLoading: profileLoading } = useProfile();
  const { userSkills } = useUserSkills();
  const { userCareerPath } = useUserCareerPath();

  // Transform skills for SkillGraph - Memoized
  const skillsForGraph = useMemo(() => userSkills.map((us) => ({
    name: us.skill?.name || "Unknown",
    level: us.level,
    category: us.skill?.category || "development",
    isVerified: (us as any).is_verified || false,
  })), [userSkills]);

  const handleSignOut = useCallback(async () => {
    await signOut();
    navigate("/");
  }, [signOut, navigate]);

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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-12"
        >
          {/* Cover/Glow Effect */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/20 via-blue-500/10 to-transparent blur-3xl -z-10 rounded-[3rem]" />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-slate-900 border-2 border-primary/20 flex items-center justify-center text-4xl font-black text-primary shadow-2xl overflow-hidden group">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    profile?.full_name?.charAt(0).toUpperCase() || "B"
                  )}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-xl bg-primary text-black flex flex-col items-center justify-center border-4 border-background shadow-lg overflow-hidden">
                  <div className="text-[10px] font-black leading-none">LVL</div>
                  <div className="text-sm font-black leading-none">{profile?.level || 1}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <h1 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
                    {profile?.full_name || "PRO BUILDER"}
                  </h1>
                  <p className="text-primary font-black uppercase tracking-[0.2em] text-xs">
                    {profile?.role || "Learning Hub Pro"} • FOUNDER @ FUTORA LABS
                  </p>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    {profile?.availability || "Open to Collaboration"}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    <MapPin className="h-3 w-3" /> Pune, IN
                  </div>
                </div>

                {/* Social Links Bar */}
                <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
                  {[
                    { icon: Github, url: profile?.github_url, label: "GitHub" },
                    { icon: Linkedin, url: profile?.linkedin_url, label: "LinkedIn" },
                    { icon: Globe, url: profile?.website_url, label: "Portfolio" },
                    { icon: Twitter, url: profile?.twitter_url, label: "Twitter" },
                    { icon: Mail, url: profile?.email || `mailto:${user?.email}`, label: "Email" }
                  ].map((link, i) => link.url && (
                    <motion.a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all shadow-lg"
                      title={link.label}
                    >
                      <link.icon className="h-4 w-4" />
                    </motion.a>
                  ))}
                  <Button variant="ghost" size="icon" onClick={handleSignOut} className="h-10 w-10 rounded-xl hover:bg-destructive/10 hover:text-destructive text-muted-foreground" title="Sign Out">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="outline" className="rounded-2xl h-12 px-8 border-white/10 hover:bg-white/5 font-black italic uppercase tracking-tighter transition-all">
                <Link to={`/portfolio/${user?.id}`}>VIEW PORTFOLIO</Link>
              </Button>
              <Button asChild className="rounded-2xl h-12 px-8 bg-primary text-black font-black italic uppercase tracking-tighter shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                <Link to="/freelancing/create">LAUNCH GIG</Link>
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-12">

            {/* Bio/About */}
            {profile?.bio && (
              <section className="space-y-4">
                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Mission Statement</h3>
                <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                  {profile.bio}
                </p>
              </section>
            )}

            {/* Dynamic Content Grid */}
            <div className="grid grid-cols-1 gap-12">
              <ProfileProjects />
              <ProfileEducation />
              <ProfileCertifications />
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4 space-y-8">

            {/* Stats Sidebar */}
            <div className="space-y-6">

              <LearningStreak
                currentStreak={profile?.current_streak || 0}
                longestStreak={profile?.longest_streak || 0}
                totalDays={profile?.total_learning_days || 0}
              />

              <CoursesProgress />

              {/* Achievements sidebar */}
              <ProfileAchievements />

              {/* Skill Graph Card */}
              <div className="p-6 rounded-[2.5rem] bg-slate-900 border border-white/10 overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <BookOpen className="h-32 w-32 text-primary" />
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary fill-primary" />
                  Skill Graph
                </h3>
                <SkillGraph skills={skillsForGraph} />
                {skillsForGraph.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-xs text-muted-foreground font-bold uppercase mb-4">No data mapped yet</p>
                    <Link to="/learning">
                      <Button variant="outline" className="rounded-xl border-primary/30 text-primary font-bold text-[10px] uppercase tracking-widest">
                        Build Graph Now
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Career Path sidebar */}
              <div className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-6">
                  <Target className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">
                    Active Path
                  </h3>
                </div>
                {userCareerPath ? (
                  <div className="space-y-6">
                    <p className="font-black text-lg text-white italic uppercase tracking-tighter">
                      {userCareerPath.career_path?.title}
                    </p>
                    <CareerRoadmap
                      currentStep={userCareerPath.current_step as "learn" | "build" | "apply" | "hired"}
                      progress={userCareerPath.progress_percentage}
                    />
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-4">
                      Path Not Initialized
                    </p>
                    <Link to="/career-paths">
                      <Button className="rounded-xl bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-slate-200">
                        Choose A Path
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};


export default ProfilePage;
