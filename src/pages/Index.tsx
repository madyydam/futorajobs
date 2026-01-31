import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowRight, Sparkles, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
      <div className="container max-w-6xl">
        {/* Hero Section */}
        <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Glow effect behind hero */}
            <div className="absolute -inset-20 bg-gradient-glow opacity-50 blur-3xl" />
            
            <GlassCard 
              glow 
              hover={false}
              className="relative max-w-3xl mx-auto px-8 py-16 md:px-16 md:py-20"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                  Build the Future
                  <br />
                  <span className="gradient-text glow-text">with Us</span>
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
                  We're looking for visionaries, weirdos, and builders shaping the next era of AI & humanity.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/jobs">
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity text-base px-8 py-6 group"
                    >
                      Explore Jobs
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/post-job">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="w-full sm:w-auto border-border/50 hover:bg-secondary/50 text-base px-8 py-6"
                    >
                      Post a Role
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </GlassCard>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Why <span className="gradient-text">FutoraJobs</span>?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Not another job board. A high-signal layer for builders who think in decades.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
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
                  <GlassCard className="h-full text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-primary/20 flex items-center justify-center mx-auto mb-5">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="text-center py-16 px-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to join the movement?
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Whether you're a builder looking for your next mission or a founder hunting for exceptional talent.
              </p>
              <Link to="/jobs">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity group"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </GlassCard>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-4 text-center border-t border-border/30">
          <p className="text-sm text-muted-foreground">
            © 2025 FutoraJobs. Built for builders, by builders.
          </p>
        </footer>
      </div>
    </Layout>
  );
};

export default Index;
