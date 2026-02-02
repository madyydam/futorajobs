import { Job } from "@/components/jobs/JobCard";

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "AI Engineer",
    company: "Futora Labs",
    vision: "Build the next generation of AI agents that understand context and intent like humans do.",
    skills: ["Python", "LLMs", "RAG", "Vector DBs"],
    location: "Remote",
    type: "Full-time",
    visionTags: ["AI-first", "Open-source"],
    posted: "2 days ago",
  },
  {
    id: "2",
    title: "Full-Stack Developer",
    company: "BuildersHQ",
    vision: "Create tools that empower 1000s of indie hackers to ship faster than ever.",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    location: "Remote",
    type: "Full-time",
    visionTags: ["Remote-native", "Long-term builders"],
    posted: "1 week ago",
  },
  {
    id: "3",
    title: "Product Designer",
    company: "Nexus Studio",
    vision: "Design interfaces that feel like magic – intuitive, beautiful, and delightful.",
    skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
    location: "Hybrid",
    type: "Full-time",
    visionTags: ["Design-led", "Early-stage chaos"],
    posted: "3 days ago",
  },
  {
    id: "4",
    title: "Growth Hacker",
    company: "LaunchPad",
    vision: "Take products from 0 to 10k users using creative, unconventional strategies.",
    skills: ["SEO", "Paid Ads", "Analytics", "Content"],
    location: "Remote",
    type: "Part-time",
    visionTags: ["Growth mindset", "Startup energy"],
    posted: "5 days ago",
  },
  {
    id: "5",
    title: "Backend Engineer",
    company: "InfraCore",
    vision: "Build infrastructure that scales from 1 to 1 million requests per second.",
    skills: ["Go", "Kubernetes", "AWS", "System Design"],
    location: "Remote",
    type: "Full-time",
    visionTags: ["Infrastructure", "Open-source"],
    posted: "1 day ago",
  },
  {
    id: "6",
    title: "Developer Advocate",
    company: "DevTools Inc",
    vision: "Help developers fall in love with building. Create content that inspires and educates.",
    skills: ["Technical Writing", "Video", "Community", "APIs"],
    location: "Remote",
    type: "Full-time",
    visionTags: ["Community-first", "Remote-native"],
    posted: "4 days ago",
  },
];

export interface Internship {
  id: string;
  title: string;
  company: string;
  vision: string;
  skills: string[];
  location: string;
  duration: string;
  stipend: string;
  isPaid: boolean;
  posted: string;
}

export const mockInternships: Internship[] = [
  {
    id: "i1",
    title: "AI Research Intern",
    company: "Futora AI",
    vision: "Work on cutting-edge LLM research and help shape the future of AI assistants.",
    skills: ["Python", "PyTorch", "NLP", "Research"],
    location: "Remote",
    duration: "3 months",
    stipend: "₹25,000/month",
    isPaid: true,
    posted: "1 day ago",
  },
  {
    id: "i2",
    title: "Frontend Development Intern",
    company: "FutoraFlow",
    vision: "Build beautiful, performant interfaces for the next-gen business OS.",
    skills: ["React", "TypeScript", "Tailwind", "Figma"],
    location: "Remote",
    duration: "6 months",
    stipend: "₹20,000/month",
    isPaid: true,
    posted: "3 days ago",
  },
  {
    id: "i3",
    title: "Product Design Intern",
    company: "FutoraOne",
    vision: "Design social experiences that bring the tech community together.",
    skills: ["Figma", "UI/UX", "Prototyping", "User Research"],
    location: "Hybrid",
    duration: "4 months",
    stipend: "₹18,000/month",
    isPaid: true,
    posted: "5 days ago",
  },
  {
    id: "i4",
    title: "Marketing Intern",
    company: "Velora Creatives",
    vision: "Help startups tell their stories and reach their first 1000 users.",
    skills: ["Content", "Social Media", "Analytics", "Copywriting"],
    location: "Remote",
    duration: "3 months",
    stipend: "Unpaid (with certificate)",
    isPaid: false,
    posted: "2 days ago",
  },
  {
    id: "i5",
    title: "Backend Engineering Intern",
    company: "FutoraPay",
    vision: "Build secure, scalable fintech infrastructure from the ground up.",
    skills: ["Node.js", "PostgreSQL", "APIs", "Security"],
    location: "Remote",
    duration: "6 months",
    stipend: "₹30,000/month",
    isPaid: true,
    posted: "1 week ago",
  },
  {
    id: "i6",
    title: "Data Science Intern",
    company: "FutoraDrop",
    vision: "Analyze product launch data and help founders make better decisions.",
    skills: ["Python", "SQL", "Pandas", "Visualization"],
    location: "Remote",
    duration: "3 months",
    stipend: "₹22,000/month",
    isPaid: true,
    posted: "4 days ago",
  },
];
