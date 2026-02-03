export interface Project {
  id: string;
  title: string;
  description: string;
  category: "AI" | "Development" | "Design" | "Growth";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  skills: string[];
  deliverables: string[];
  unlocks: {
    internships: number;
    jobs: number;
  };
}

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "AI Chatbot for Customer Support",
    description: "Build a conversational AI bot using LLMs that can handle customer queries.",
    category: "AI",
    difficulty: "Intermediate",
    duration: "2 weeks",
    skills: ["Python", "LLMs", "Prompt Engineering"],
    deliverables: ["Live demo", "GitHub repo", "Documentation"],
    unlocks: { internships: 4, jobs: 6 },
  },
  {
    id: "2",
    title: "Full-Stack Task Manager",
    description: "Create a complete task management app with auth, CRUD, and real-time updates.",
    category: "Development",
    difficulty: "Intermediate",
    duration: "3 weeks",
    skills: ["React", "Node.js", "PostgreSQL"],
    deliverables: ["Live app", "GitHub repo", "API docs"],
    unlocks: { internships: 5, jobs: 8 },
  },
  {
    id: "3",
    title: "Mobile App Redesign",
    description: "Redesign an existing mobile app with improved UX and modern design system.",
    category: "Design",
    difficulty: "Beginner",
    duration: "1 week",
    skills: ["Figma", "UI Design", "Prototyping"],
    deliverables: ["Figma file", "Prototype", "Case study"],
    unlocks: { internships: 3, jobs: 4 },
  },
  {
    id: "4",
    title: "SEO Audit & Strategy",
    description: "Perform a complete SEO audit and create an actionable growth strategy.",
    category: "Growth",
    difficulty: "Beginner",
    duration: "1 week",
    skills: ["SEO", "Analytics", "Content Strategy"],
    deliverables: ["Audit report", "Strategy doc", "Implementation plan"],
    unlocks: { internships: 3, jobs: 5 },
  },
  {
    id: "5",
    title: "AI-Powered Content Generator",
    description: "Build a tool that generates marketing content using AI models.",
    category: "AI",
    difficulty: "Advanced",
    duration: "2 weeks",
    skills: ["Python", "LLMs", "API Integration"],
    deliverables: ["Live tool", "GitHub repo", "Usage docs"],
    unlocks: { internships: 6, jobs: 8 },
  },
  {
    id: "6",
    title: "Portfolio Website",
    description: "Design and build a personal portfolio showcasing your best work.",
    category: "Development",
    difficulty: "Beginner",
    duration: "1 week",
    skills: ["React", "CSS", "Responsive Design"],
    deliverables: ["Live website", "GitHub repo"],
    unlocks: { internships: 4, jobs: 6 },
  },
];
