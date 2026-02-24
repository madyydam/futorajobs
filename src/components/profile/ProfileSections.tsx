import { motion } from "framer-motion";
import {
    GraduationCap,
    Trophy,
    Award,
    ExternalLink,
    Github,
    Code2,
    Calendar,
    MapPin,
    Briefcase,
    Globe,
    Target
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// --- Projects Section ---
export const ProfileProjects = () => {
    const projects = [
        {
            title: "Futora Marketplace",
            description: "A high-fidelity freelancing marketplace built with Next.js, Supabase, and Framer Motion.",
            tech: ["React", "TypeScript", "Tailwind", "Supabase"],
            github: "https://github.com",
            link: "https://futora.jobs",
        },
        {
            title: "AI Resume Scanner",
            description: "NLP-powered tool to analyze and score resumes against job descriptions.",
            tech: ["Python", "FastAPI", "OpenAI", "React"],
            github: "https://github.com",
            link: "#",
        }
    ];

    return (
        <section className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <Code2 className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Featured Projects</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{project.title}</h4>
                            <div className="flex gap-2">
                                <a href={project.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white">
                                    <Github className="h-4 w-4" />
                                </a>
                                <a href={project.link} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white">
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map(t => (
                                <Badge key={t} variant="secondary" className="bg-primary/10 text-primary border-none text-[10px]">
                                    {t}
                                </Badge>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

// --- Education Section ---
export const ProfileEducation = () => {
    const education = [
        {
            school: "Pune Institute of Technology",
            degree: "B.Tech in Computer Science",
            period: "2022 - 2026",
            location: "Pune, India",
        }
    ];

    return (
        <section className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Education</h3>
            </div>
            <div className="space-y-4">
                {education.map((edu, i) => (
                    <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <GraduationCap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">{edu.school}</h4>
                            <p className="text-primary font-medium">{edu.degree}</p>
                            <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {edu.period}</span>
                                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {edu.location}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

// --- Certifications Section ---
export const ProfileCertifications = () => {
    const certs = [
        {
            name: "AWS Certified Developer",
            issuer: "Amazon Web Services",
            date: "Jan 2024",
            icon: Award
        },
        {
            name: "Google Cloud Professional",
            issuer: "Google",
            date: "Nov 2023",
            icon: Globe
        }
    ];

    return (
        <section className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Certifications</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certs.map((cert, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                            <cert.icon className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm">{cert.name}</h4>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{cert.issuer} • {cert.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

// --- Achievements Section ---
export const ProfileAchievements = () => {
    const achievements = [
        {
            title: "Smart India Hackathon Finalist",
            desc: "Represented college in the national finals of SIH 2023.",
            icon: Trophy
        },
        {
            title: "Top 1% on LeetCode",
            desc: "Solved 500+ problems with a rating of 2100+.",
            icon: Target
        }
    ];

    return (
        <section className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Achievements</h3>
            </div>
            <div className="space-y-3">
                {achievements.map((ach, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                        <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                            <ach.icon className="h-5 w-5 text-indigo-500" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-foreground">{ach.title}</h4>
                            <p className="text-xs text-muted-foreground">{ach.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
