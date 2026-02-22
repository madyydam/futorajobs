import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Sparkles, Rocket, Code, Heart, Linkedin, Twitter, Globe, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const FounderPage = () => {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto py-12 md:py-20">
                {/* Schema for SEO */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Madhur Dhadve",
                        "url": "https://futorajobs.com/madhur-dhadve",
                        "jobTitle": "Founder",
                        "worksFor": {
                            "@type": "Organization",
                            "name": "Futora Group"
                        },
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Pune"
                        }
                    })}
                </script>

                {/* Hero Section */}
                <section className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary to-purple-600 mx-auto mb-6 flex items-center justify-center border-4 border-background shadow-xl"
                    >
                        <span className="text-4xl font-bold text-white">MD</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-foreground mb-4"
                    >
                        Madhur Dhadve
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        Founder of <span className="text-primary font-semibold">Futora Group</span>. Pune-based tech entrepreneur building the future of learning-first careers.
                    </motion.p>
                </section>

                {/* Vision & About */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="clean-card p-8"
                    >
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                            <Rocket className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">The Vision</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Madhur is building Futora to bridge the gap between education and employability. By focusing on proof-of-work and skill-based hiring, he aim to give every builder a fair shot at the best opportunities in Pune and beyond.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="clean-card p-8"
                    >
                        <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
                            <Code className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Building Pune</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            As a Pune native, Madhur is committed to strengthening the local startup ecosystem. FutoraCareer is optimized to bring the best startup culture directly to Pune's talented student community.
                        </p>
                    </motion.div>
                </div>

                {/* Brand Ecosystem */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-center mb-8">Building the Futora Ecosystem</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {['FutoraCareer', 'FutoraOne', 'FutoraFlow'].map((item, idx) => (
                            <div key={item} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/50">
                                <Sparkles className="h-5 w-5 text-primary" />
                                <span className="font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact / Links */}
                <section className="text-center">
                    <div className="flex justify-center gap-6 mb-8">
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Globe className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Github className="h-6 w-6" />
                        </a>
                    </div>
                    <Button size="lg" className="rounded-full px-8">
                        Get in Touch
                    </Button>
                </section>
            </div>
        </Layout>
    );
};

export default FounderPage;
