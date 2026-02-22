import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Zap, Search, Filter, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const Freelancing = () => {
    return (
        <Layout>
            <div className="max-w-7xl mx-auto py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        <Zap className="h-4 w-4" />
                        Freelance & Gigs
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter italic uppercase mb-4">
                        THE <span className="text-primary/40">GIG ECONOMY</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-medium">
                        Find high-impact freelance projects and build your proof-of-work through real-world gigs.
                    </p>
                </motion.div>

                {/* Coming Soon Section */}
                <div className="bg-card/50 backdrop-blur-md border border-border rounded-3xl p-12 text-center">
                    <div className="h-20 w-20 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-6">
                        <Zap className="h-10 w-10 text-primary animate-pulse" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Marketplace Arriving Soon</h2>
                    <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                        We are currently onboarding top startups and companies to bring the best freelance opportunities to FutoraCareer students.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button className="rounded-xl px-8 h-12">Notify Me</Button>
                        <Button variant="outline" className="rounded-xl px-8 h-12">Back to Jobs</Button>
                    </div>
                </div>

                {/* Demo Categories */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    {["UI Design", "Content Strategy", "AI Training", "Frontend Dev", "Marketing", "Video Editing"].map((cat) => (
                        <div key={cat} className="p-6 rounded-2xl border border-border bg-card/30 hover:bg-card/50 transition-colors group cursor-not-allowed grayscale">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-lg">{cat}</span>
                                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <Briefcase className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">Coming in Phase 3</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Freelancing;
