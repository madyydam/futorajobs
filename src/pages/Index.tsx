import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Briefcase, GraduationCap, Sparkles, BookOpen, Target, Hammer } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CoursesSection } from "@/components/home/CoursesSection";
import { CareerTracksSection } from "@/components/home/CareerTracksSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { LearningModesSection } from "@/components/home/LearningModesSection";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Pune's learning-first career platform. Find the best startup roles and internships in Pune with skill-based hiring.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 group"
                onClick={() => scrollToSection('courses-section')}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-border hover:bg-accent text-base px-8 py-6"
                onClick={() => scrollToSection('career-tracks-section')}
              >
                <Target className="h-5 w-5 mr-2" />
                Explore Career Paths
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Learning Modes Section */}
        <LearningModesSection />

        {/* Tabbed Content Section */}
        <section className="py-8">
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="w-full justify-start bg-muted/50 p-1 rounded-lg mb-6">
              <TabsTrigger
                value="courses"
                className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                <BookOpen className="h-4 w-4" />
                Courses
              </TabsTrigger>
              <TabsTrigger
                value="tracks"
                className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                <Target className="h-4 w-4" />
                Career Tracks
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                <Hammer className="h-4 w-4" />
                Projects
              </TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="mt-0">
              <CoursesSection />
            </TabsContent>

            <TabsContent value="tracks" className="mt-0">
              <CareerTracksSection />
            </TabsContent>

            <TabsContent value="projects" className="mt-0">
              <ProjectsSection />
            </TabsContent>
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
                  onClick={() => scrollToSection('courses-section')}
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
            © 2025 Futora. Learn. Build. Get Hired.
          </p>
        </footer>
      </div>
    </Layout>
  );
};

export default Index;
