export interface Course {
  id: string;
  title: string;
  category: "AI" | "Development" | "Design" | "Growth";
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  outcome: "Job-ready" | "Internship-ready";
  mappedJobs: number;
  description: string;
  isPaid: boolean;
  price?: number;
}

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "AI Foundations for Builders",
    category: "AI",
    level: "Beginner",
    duration: "4 weeks",
    outcome: "Internship-ready",
    mappedJobs: 8,
    description: "Master the fundamentals of AI, ML concepts, and prompt engineering.",
    isPaid: false,
  },
  {
    id: "2",
    title: "Full-Stack Developer Track",
    category: "Development",
    level: "Intermediate",
    duration: "8 weeks",
    outcome: "Job-ready",
    mappedJobs: 15,
    description: "Build production-ready apps with React, Node.js, and databases.",
    isPaid: true,
    price: 1999,
  },
  {
    id: "3",
    title: "UI/UX for Developers",
    category: "Design",
    level: "Beginner",
    duration: "3 weeks",
    outcome: "Internship-ready",
    mappedJobs: 6,
    description: "Learn design principles, Figma, and build beautiful interfaces.",
    isPaid: false,
  },
  {
    id: "4",
    title: "Growth & Marketing Essentials",
    category: "Growth",
    level: "Beginner",
    duration: "4 weeks",
    outcome: "Job-ready",
    mappedJobs: 10,
    description: "Master SEO, content marketing, and user acquisition strategies.",
    isPaid: true,
    price: 999,
  },
  {
    id: "5",
    title: "Become an AI Engineer",
    category: "AI",
    level: "Advanced",
    duration: "10 weeks",
    outcome: "Job-ready",
    mappedJobs: 12,
    description: "Build AI agents, fine-tune models, and deploy production AI systems.",
    isPaid: true,
    price: 2999,
  },
  {
    id: "6",
    title: "Get Your First Internship",
    category: "Growth",
    level: "Beginner",
    duration: "2 weeks",
    outcome: "Internship-ready",
    mappedJobs: 20,
    description: "Build proof of work, craft your profile, and land your first role.",
    isPaid: false,
  },
];
