import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, GraduationCap, Sparkles, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CoursesSection } from "@/components/home/CoursesSection";

const features = [
  {
    icon: Sparkles,
    title: "Vision-First Hiring",
    description: "We match intent and mindset, not just skills and resumes.",
  },
  {
    icon: Users,
    title: "Builder Community",
    description: "Connect with founders, AI builders, and early believers.",
  },
  {
    icon: Zap,
    title: "No Ghosting",
    description: "Every application gets a response. Always.",
  },
];

const Index = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Build the Future
              <br />
              <span className="gradient-text">with Us</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Jobs & internships that actually matter. Join the builders shaping the next era of AI & humanity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/jobs">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 group"
                >
                  <Briefcase className="h-5 w-5 mr-2" />
                  Explore Jobs
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/internships">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto border-border hover:bg-accent text-base px-8 py-6"
                >
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Explore Internships
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Quick Action Cards */}
        <section className="py-8">
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
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
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
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

        {/* Courses Section */}
        <CoursesSection />

        {/* Features Section */}
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Why <span className="gradient-text">FutoraJobs</span>?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Not another job board. A high-signal layer for builders who think in decades.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="clean-card p-6 h-full text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
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
                Ready to join the movement?
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6 text-sm">
                Whether you're a builder looking for your next mission or a founder hunting for exceptional talent.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/jobs">
                  <Button 
                    size="lg" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 group"
                  >
                    Find Jobs
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/post">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-border hover:bg-accent"
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
            © 2025 FutoraJobs. Built for builders, by builders.
          </p>
        </footer>
      </div>
    </Layout>
  );
};

export default Index;
