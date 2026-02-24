import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import {
    Github,
    Linkedin,
    Globe,
    Twitter,
    Mail,
    ExternalLink,
    ShieldCheck,
    Zap,
    Cpu,
    Target,
    Loader2,
    ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PublicPortfolio = () => {
    const { id } = useParams();

    const { data: profile, isLoading } = useQuery({
        queryKey: ["public-portfolio", id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select(`
                    *,
                    user_skills (
                        skill:skills(name, category),
                        is_verified,
                        level
                    ),
                    user_projects (
                        title,
                        description,
                        github_url,
                        live_url,
                        status
                    )
                `)
                .eq("id", id)
                .single();

            if (error) throw error;
            return data;
        },
        enabled: !!id
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6">
                <h1 className="text-4xl font-black italic uppercase mb-4">404 Builder Not Found</h1>
                <Button asChild>
                    <Link to="/">Back to Futora</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#05070A] text-white selection:bg-primary selection:text-black">
            {/* Minimal Header */}
            <header className="fixed top-0 left-0 w-full p-6 z-50 mix-blend-difference">
                <Link to="/" className="text-xs font-black uppercase tracking-[0.5em] hover:text-primary transition-colors flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    FUTORA_PRO_NETWORK
                </Link>
            </header>

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] -z-10 rounded-full" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-8"
                >
                    <div className="relative inline-block">
                        <div className="w-40 h-40 md:w-56 md:h-56 rounded-[3rem] bg-slate-900 border-2 border-white/5 flex items-center justify-center text-6xl font-black text-primary overflow-hidden mx-auto shadow-2xl">
                            {profile.avatar_url ? <img src={profile.avatar_url} className="w-full h-full object-cover" /> : profile.full_name?.charAt(0)}
                        </div>
                        <div className="absolute -bottom-4 -right-4 bg-primary text-black px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                            LVL {(profile as any).level || 1} BUILDER
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8]">
                            {profile.full_name}
                        </h1>
                        <p className="text-primary font-black uppercase tracking-[0.3em] text-sm md:text-xl">
                            {profile.role || "Elite Technical Architect"}
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        {[
                            { icon: Github, url: profile.github_url },
                            { icon: Linkedin, url: profile.linkedin_url },
                            { icon: Globe, url: profile.website_url },
                            { icon: Twitter, url: profile.twitter_url }
                        ].map((link, i) => link.url && (
                            <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-all group"
                            >
                                <link.icon className="h-6 w-6" />
                            </a>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Skills Core */}
            <section className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
                <div className="grid lg:grid-cols-2 gap-20">
                    <div>
                        <h2 className="text-4xl font-black italic uppercase mb-12 flex items-center gap-4">
                            <Zap className="h-8 w-8 text-primary fill-primary" />
                            CORE_STACK
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(profile.user_skills as any[])?.map((skill, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 10 }}
                                    className="p-6 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="text-xs font-black uppercase tracking-widest">{skill.skill?.name}</div>
                                        {skill.is_verified && <ShieldCheck className="h-4 w-4 text-primary" />}
                                    </div>
                                    <div className="text-primary font-black italic text-lg opacity-40 group-hover:opacity-100 transition-opacity">
                                        LVL_{skill.level}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-12">
                        <h2 className="text-4xl font-black italic uppercase flex items-center gap-4">
                            <Target className="h-8 w-8 text-primary" />
                            MISSION
                        </h2>
                        <p className="text-2xl md:text-3xl text-muted-foreground italic font-medium leading-relaxed">
                            "{profile.bio || "Building the next generation of intelligent systems and elite digital experiences."}"
                        </p>
                        <div className="pt-8">
                            <Button className="h-16 px-10 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:bg-primary transition-all">
                                DOWNLOAD_DOSSIER
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Showcase */}
            <section className="bg-white/5 py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-20 text-center">
                        WORK_EXHIBITION
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {(profile.user_projects as any[])?.map((project, i) => (
                            <motion.div
                                key={i}
                                className="group p-10 rounded-[3.5rem] bg-black border border-white/10 hover:border-primary/40 transition-all relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:scale-110 transition-transform duration-1000">
                                    <Cpu className="h-40 w-40" />
                                </div>

                                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">{project.title}</h3>
                                <p className="text-muted-foreground text-lg mb-10 italic leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex gap-4">
                                    {project.github_url && (
                                        <a href={project.github_url} target="_blank" className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                            <Github className="h-6 w-6" />
                                        </a>
                                    )}
                                    {project.live_url && (
                                        <a href={project.live_url} target="_blank" className="h-14 w-14 rounded-2xl bg-primary text-black flex items-center justify-center hover:scale-105 transition-all">
                                            <ExternalLink className="h-6 w-6" />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 text-center border-t border-white/10">
                <div className="text-[10px] font-black text-white/20 uppercase tracking-[1em] mb-4">GENERATED_BY_FUTORA_AI</div>
                <Link to="/" className="text-primary font-black hover:underline tracking-widest">CLAIM YOUR OWN PORTFOLIO</Link>
            </footer>
        </div>
    );
};

export default PublicPortfolio;
