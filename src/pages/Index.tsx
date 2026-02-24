import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Briefcase, GraduationCap, Sparkles, Target, Hammer, PlayCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LearningHubSection } from "@/components/home/LearningHubSection";
import { CareerTracksSection } from "@/components/home/CareerTracksSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { useAuth } from "@/hooks/useAuth";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("learning");

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const getTabColor = (tab: string) => {
    switch (tab) {
      case 'learning': return 'bg-primary';
      case 'tracks': return 'bg-orange-500';
      case 'projects': return 'bg-emerald-600';
      default: return 'bg-primary';
    }
  };

  const getTabShadow = (tab: string) => {
    switch (tab) {
      case 'learning': return 'shadow-primary/40';
      case 'tracks': return 'shadow-orange-500/40';
      case 'projects': return 'shadow-emerald-600/40';
      default: return 'shadow-primary/40';
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Hero Section - Learning First */}
        <section className="py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Learn → Build → Get Hired
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Jobs & Internships in
              <br />
              <span className="gradient-text">Pune</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed font-medium">
              Master skills and unlock elite startup roles with skill-based hiring.
            </p>

            <div className="flex flex-row gap-3 justify-center px-4">
              <Button
                size="sm"
                className="flex-1 max-w-[160px] bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] md:text-sm px-2 md:px-4 py-3 group h-auto rounded-xl"
                onClick={() => navigate('/learning')}
              >
                <PlayCircle className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1 flex-shrink-0" />
                <span className="whitespace-nowrap">Skills Hub</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex-1 max-w-[160px] border-border hover:bg-accent text-[10px] md:text-sm px-2 md:px-4 py-3 h-auto rounded-xl"
                onClick={() => scrollToSection('career-tracks-section')}
              >
                <Target className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1 flex-shrink-0" />
                <span className="whitespace-nowrap">Explore Paths</span>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Tabbed Content Section - Redesigned Selection */}
        <section id="path-selector-section" className="py-12 border-t border-border/50">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              Choose Your Path
            </h2>
            <p className="text-muted-foreground text-sm">Multiple paths, one destination: getting hired.</p>
          </div>

          <Tabs defaultValue="learning" onValueChange={setActiveTab} className="w-full relative">
            {/* Dynamic Background Glow - Simplified to Cyan */}
            <div className={cn(
              "absolute inset-0 -z-10 blur-[100px] opacity-10 transition-all duration-700 rounded-full bg-[#00D1FF]"
            )} />

            <div className="flex justify-center mb-10">
              <TabsList className="grid grid-cols-3 w-full max-w-xl bg-slate-100 dark:bg-slate-900/50 p-1 rounded-full border border-border/40 backdrop-blur-md self-center h-auto items-stretch">
                {[
                  { value: "learning", label: "SKILLS", icon: PlayCircle, activeColor: "data-[state=active]:!bg-[#00D1FF]" },
                  { value: "tracks", label: "TRACKS", icon: Target, activeColor: "data-[state=active]:!bg-[#F97316]" },
                  { value: "projects", label: "PROJECTS", icon: Hammer, activeColor: "data-[state=active]:!bg-[#10B981]" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={cn(
                      "flex items-center justify-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 relative group",
                      "data-[state=active]:!text-white data-[state=active]:shadow-lg",
                      "hover:bg-accent/30 text-slate-500 font-black text-[11px] tracking-tight",
                      tab.activeColor
                    )}
                  >
                    <tab.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <motion.div
              layout
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              onPanEnd={(_, info) => {
                const swipeThreshold = 50;
                const tabs = ["learning", "tracks", "projects"];
                const currentIndex = tabs.indexOf(activeTab);

                // Detect horizontal swipe with threshold, and ensure it's mostly horizontal
                if (Math.abs(info.offset.y) < 40) {
                  if (info.offset.x < -swipeThreshold && currentIndex < tabs.length - 1) {
                    // Swipe Left -> Next Tab
                    setActiveTab(tabs[currentIndex + 1]);
                  } else if (info.offset.x > swipeThreshold && currentIndex > 0) {
                    // Swipe Right -> Previous Tab
                    setActiveTab(tabs[currentIndex - 1]);
                  }
                }
              }}
              className="touch-pan-y"
            >
              <TabsContent value="learning" className="mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <LearningHubSection />
              </TabsContent>

              <TabsContent value="tracks" className="mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <CareerTracksSection />
              </TabsContent>

              <TabsContent value="projects" className="mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <ProjectsSection />
              </TabsContent>
            </motion.div>
          </Tabs>
        </section>

        {/* Quick Links to Jobs & Internships */}
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Ready to <span className="gradient-text">Apply</span>?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Once you've built your skills and proof of work, explore opportunities waiting for you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link to="/jobs">
                <div className="clean-card p-8 hover-lift group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Briefcase className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        Full-time Jobs
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Remote, hybrid, and on-site roles at top startups building the future.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/pune-internships">
                <div className="clean-card p-8 hover-lift group cursor-pointer border-primary/20 bg-primary/5">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <GraduationCap className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        Internships in Pune
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Exclusive local internships for Pune students. Paid and learning-focused roles.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          <div className="mt-6 text-center">
            <Link to="/pune-jobs" className="text-sm text-primary hover:underline font-medium inline-flex items-center gap-1">
              View all startup jobs in Pune <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="clean-card text-center py-12 px-8">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Ready to start your journey?
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6 text-sm">
                Join thousands of builders who are learning, building, and getting hired through Futora.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 group"
                  onClick={() => scrollToSection('learning-hub-section')}
                >
                  Start Learning Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border hover:bg-accent w-full sm:w-auto"
                  onClick={() => navigate(user ? "/post" : "/auth?redirect=/post")}
                >
                  Post a Role
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center border-t border-border mt-8">
          <p className="text-sm text-muted-foreground">
            © 2026 Futora. Learn. Build. Get Hired.
          </p>
        </footer>
      </div>
    </Layout>
  );
};

export default Index;
