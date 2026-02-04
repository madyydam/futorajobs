export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "reading" | "project" | "quiz";
  isCompleted?: boolean;
  isLocked?: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface CourseDetail {
  id: string;
  title: string;
  category: "AI" | "Development" | "Design" | "Growth";
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  outcome: "Job-ready" | "Internship-ready";
  mappedJobs: number;
  mappedInternships: number;
  description: string;
  longDescription: string;
  isPaid: boolean;
  price?: number;
  instructor: {
    name: string;
    role: string;
    avatar?: string;
  };
  skills: string[];
  modules: Module[];
  enrolledCount: number;
  rating: number;
  reviewCount: number;
}

export const mockCourseDetails: Record<string, CourseDetail> = {
  "1": {
    id: "1",
    title: "AI Foundations for Builders",
    category: "AI",
    level: "Beginner",
    duration: "4 weeks",
    outcome: "Internship-ready",
    mappedJobs: 8,
    mappedInternships: 12,
    description: "Master the fundamentals of AI, ML concepts, and prompt engineering.",
    longDescription: "This course is designed for builders who want to understand AI from the ground up. You'll learn how machine learning works, how to craft effective prompts, and how to integrate AI into real products. No prior ML experience required — just curiosity and willingness to build.",
    isPaid: false,
    instructor: {
      name: "Arjun Mehta",
      role: "AI Engineer @ Futora",
    },
    skills: ["Prompt Engineering", "Machine Learning Basics", "AI APIs", "ChatGPT", "Python Basics"],
    modules: [
      {
        id: "m1",
        title: "Understanding AI & ML",
        description: "Learn the fundamentals of artificial intelligence and machine learning",
        lessons: [
          { id: "l1", title: "What is AI? (And what it isn't)", duration: "12 min", type: "video" },
          { id: "l2", title: "Machine Learning vs Traditional Programming", duration: "8 min", type: "reading" },
          { id: "l3", title: "Types of ML: Supervised, Unsupervised, Reinforcement", duration: "15 min", type: "video" },
          { id: "l4", title: "Quiz: AI Fundamentals", duration: "10 min", type: "quiz" },
        ],
      },
      {
        id: "m2",
        title: "Prompt Engineering Mastery",
        description: "Master the art of communicating with AI models effectively",
        lessons: [
          { id: "l5", title: "Anatomy of a Great Prompt", duration: "10 min", type: "video" },
          { id: "l6", title: "Zero-shot vs Few-shot Prompting", duration: "12 min", type: "video" },
          { id: "l7", title: "Chain of Thought Reasoning", duration: "8 min", type: "reading" },
          { id: "l8", title: "Project: Build a Prompt Library", duration: "45 min", type: "project" },
        ],
      },
      {
        id: "m3",
        title: "Building with AI APIs",
        description: "Integrate AI into real applications using popular APIs",
        lessons: [
          { id: "l9", title: "OpenAI API Deep Dive", duration: "18 min", type: "video" },
          { id: "l10", title: "Building Your First AI App", duration: "25 min", type: "video" },
          { id: "l11", title: "Error Handling & Best Practices", duration: "10 min", type: "reading" },
          { id: "l12", title: "Final Project: AI-Powered Tool", duration: "2 hours", type: "project" },
        ],
      },
    ],
    enrolledCount: 1247,
    rating: 4.8,
    reviewCount: 342,
  },
  "2": {
    id: "2",
    title: "Full-Stack Developer Track",
    category: "Development",
    level: "Intermediate",
    duration: "8 weeks",
    outcome: "Job-ready",
    mappedJobs: 15,
    mappedInternships: 10,
    description: "Build production-ready apps with React, Node.js, and databases.",
    longDescription: "Go from knowing basics to building complete, deployable web applications. This intensive track covers frontend with React, backend with Node.js, databases with PostgreSQL, and deployment. You'll ship 3 real projects that become your portfolio.",
    isPaid: true,
    price: 1999,
    instructor: {
      name: "Priya Sharma",
      role: "Senior Engineer @ Futora",
    },
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "REST APIs", "Git", "Deployment"],
    modules: [
      {
        id: "m1",
        title: "React Foundations",
        description: "Build modern user interfaces with React",
        lessons: [
          { id: "l1", title: "React in 2024: What You Need to Know", duration: "15 min", type: "video" },
          { id: "l2", title: "Components, Props & State", duration: "20 min", type: "video" },
          { id: "l3", title: "Hooks Deep Dive", duration: "25 min", type: "video" },
          { id: "l4", title: "Project: Build a Task Manager", duration: "1.5 hours", type: "project" },
        ],
      },
      {
        id: "m2",
        title: "Backend with Node.js",
        description: "Create robust APIs and server-side logic",
        lessons: [
          { id: "l5", title: "Node.js & Express Basics", duration: "18 min", type: "video" },
          { id: "l6", title: "RESTful API Design", duration: "15 min", type: "video" },
          { id: "l7", title: "Authentication & Authorization", duration: "22 min", type: "video" },
          { id: "l8", title: "Project: Build an API", duration: "2 hours", type: "project" },
        ],
      },
      {
        id: "m3",
        title: "Databases & Deployment",
        description: "Store data and ship your apps",
        lessons: [
          { id: "l9", title: "PostgreSQL Essentials", duration: "20 min", type: "video" },
          { id: "l10", title: "ORMs: Prisma & Drizzle", duration: "15 min", type: "video" },
          { id: "l11", title: "Deploying to Production", duration: "18 min", type: "video" },
          { id: "l12", title: "Final Project: Full-Stack App", duration: "4 hours", type: "project" },
        ],
      },
    ],
    enrolledCount: 892,
    rating: 4.9,
    reviewCount: 215,
  },
};
