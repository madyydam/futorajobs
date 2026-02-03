import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, GraduationCap, Sparkles, BookOpen, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CoursesSection } from "@/components/home/CoursesSection";
import { CareerTracksSection } from "@/components/home/CareerTracksSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { LearningModesSection } from "@/components/home/LearningModesSection";

const Index = () => {
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
              Learn. Build.
              <br />
              <span className="gradient-text">Get Hired.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              A practical learning platform designed to make you job-ready inside the Futora ecosystem.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 group"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-border hover:bg-accent text-base px-8 py-6"
              >
                <Target className="h-5 w-5 mr-2" />
                Explore Career Paths
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Learning Modes Section */}
        <LearningModesSection />

        {/* Career Tracks Section */}
        <CareerTracksSection />

        {/* Courses Section */}
        <CoursesSection />

        {/* Projects Section */}
        <ProjectsSection />

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
              <Link to="/internships">
                <div className="clean-card p-8 hover-lift group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <GraduationCap className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        Internships
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Paid and learning internships with mentorship and real impact.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
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
                >
                  Start Learning Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Link to="/post">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-border hover:bg-accent w-full sm:w-auto"
                  >
                    Post a Role
                  </Button>
                </Link>
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
