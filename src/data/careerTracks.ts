export interface CareerTrack {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: string[];
  coursesCount: number;
  projectsCount: number;
  jobsCount: number;
  internshipsCount: number;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export const mockCareerTracks: CareerTrack[] = [
  {
    id: "1",
    title: "AI Engineer",
    description: "Build AI agents, fine-tune models, and deploy production AI systems.",
    icon: "brain",
    skills: ["Python", "Machine Learning", "LLMs", "Prompt Engineering", "RAG"],
    coursesCount: 5,
    projectsCount: 3,
    jobsCount: 12,
    internshipsCount: 8,
    duration: "12 weeks",
    difficulty: "Advanced",
  },
  {
    id: "2",
    title: "Full-Stack Developer",
    description: "Master frontend, backend, and databases to build complete applications.",
    icon: "code",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "APIs"],
    coursesCount: 6,
    projectsCount: 4,
    jobsCount: 15,
    internshipsCount: 10,
    duration: "14 weeks",
    difficulty: "Intermediate",
  },
  {
    id: "3",
    title: "UI/UX Designer",
    description: "Create beautiful, user-centered designs that solve real problems.",
    icon: "palette",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Accessibility"],
    coursesCount: 4,
    projectsCount: 3,
    jobsCount: 8,
    internshipsCount: 6,
    duration: "10 weeks",
    difficulty: "Beginner",
  },
  {
    id: "4",
    title: "Growth Marketer",
    description: "Drive user acquisition, retention, and revenue through data-driven strategies.",
    icon: "trending",
    skills: ["SEO", "Content Marketing", "Analytics", "Social Media", "Paid Ads"],
    coursesCount: 4,
    projectsCount: 2,
    jobsCount: 10,
    internshipsCount: 7,
    duration: "8 weeks",
    difficulty: "Beginner",
  },
];
