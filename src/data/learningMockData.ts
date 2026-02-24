import { VideoCourse, VideoCategory } from "@/types/learning";

export const MOCK_VIDEO_CATEGORIES: VideoCategory[] = [
    {
        id: "web-dev",
        name: "Web Development",
        slug: "web-dev",
        icon: "Code2",
        description: "Modern Fullstack development",
        color: "#3B82F6",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400",
        subcategories: [
            { id: "frontend", name: "Frontend Development", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=400" },
            { id: "backend", name: "Backend Development", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400" },
            { id: "fullstack", name: "Full Stack Development", image: "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?auto=format&fit=crop&q=80&w=400" },
            { id: "mern", name: "MERN Stack", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400" },
            { id: "api", name: "API Development", image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=400" },
            { id: "web-sec", name: "Web Security", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400" }
        ]
    },
    {
        id: "app-dev",
        name: "App Development",
        slug: "app-dev",
        icon: "Smartphone",
        description: "Mobile app development",
        color: "#EF4444",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400",
        subcategories: [
            { id: "android", name: "Android Development", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400" },
            { id: "ios", name: "iOS Development", image: "https://images.unsplash.com/photo-1556656793-062ff987b50d?auto=format&fit=crop&q=80&w=400" },
            { id: "flutter", name: "Flutter Development", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400" },
            { id: "react-native", name: "React Native", image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80&w=400" },
            { id: "cross-platform", name: "Cross-Platform Apps", image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=400" }
        ]
    },
    {
        id: "ai-ml",
        name: "AI & Machine Learning",
        slug: "ai-ml",
        icon: "Sparkles",
        description: "Master GenAI and ML",
        color: "#8B5CF6",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400",
        subcategories: [
            { id: "ml", name: "Machine Learning", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=400" },
            { id: "deep-learning", name: "Deep Learning", image: "https://images.unsplash.com/photo-1509228468518-180dd482195b?auto=format&fit=crop&q=80&w=400" },
            { id: "gen-ai", name: "Generative AI", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400" },
            { id: "prompt-eng", name: "Prompt Engineering", image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=400" },
            { id: "data-science", name: "Data Science", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400" },
            { id: "ai-automation", name: "AI Tools & Automation", image: "https://images.unsplash.com/photo-1620712943543-bcc4607c9759?auto=format&fit=crop&q=80&w=400" }
        ]
    },
    {
        id: "ui-ux",
        name: "UI/UX & Design",
        slug: "ui-ux",
        icon: "Palette",
        description: "Design beautiful interfaces",
        color: "#EC4899",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=400",
        subcategories: [
            { id: "ui-design", name: "UI Design", image: "https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?auto=format&fit=crop&q=80&w=400" },
            { id: "ux-research", name: "UX Research", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=400" },
            { id: "figma", name: "Figma Masterclass", image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=400" },
            { id: "web-design", name: "Web Design", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=400" },
            { id: "design-systems", name: "Design Systems", image: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?auto=format&fit=crop&q=80&w=400" }
        ]
    },
    {
        id: "data-analytics",
        name: "Data & Analytics",
        slug: "data-analytics",
        icon: "BarChart3",
        description: "Data analysis and visualization",
        color: "#10B981",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400",
        subcategories: [
            { id: "data-analysis", name: "Data Analysis", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400" },
            { id: "python-data", name: "Python for Data", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400" },
            { id: "sql", name: "SQL Mastery", image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=400" },
            { id: "power-bi", name: "Power BI", image: "https://images.unsplash.com/photo-1599658880436-c61792e70672?auto=format&fit=crop&q=80&w=400" },
            { id: "tableau", name: "Tableau", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400" }
        ]
    },
    {
        id: "cybersecurity",
        name: "Cybersecurity",
        slug: "cybersecurity",
        icon: "ShieldAlert",
        description: "Defend against cyber threats",
        color: "#F59E0B",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400",
        subcategories: [
            { id: "ethical-hacking", name: "Ethical Hacking", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400" },
            { id: "network-security", name: "Network Security", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=400" },
            { id: "bug-bounty", name: "Bug Bounty", image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&q=80&w=400" },
            { id: "web-sec", name: "Web Security", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400" }
        ]
    },
    {
        id: "marketing",
        name: "Digital Marketing",
        slug: "marketing",
        icon: "Megaphone",
        description: "Grow brands online",
        color: "#6366F1",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
        subcategories: [
            { id: "social-media", name: "Social Media Marketing", image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=400" },
            { id: "seo", name: "SEO Optimization", image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&q=80&w=400" },
            { id: "performance-mkt", name: "Performance Marketing", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400" },
            { id: "content-mkt", name: "Content Marketing", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400" }
        ]
    },
    {
        id: "business",
        name: "Startup & Business",
        slug: "business",
        icon: "Rocket",
        description: "Build and scale your business",
        color: "#06B6D4",
        image: "https://images.unsplash.com/photo-1556761175-5973bc0f22b8?auto=format&fit=crop&q=80&w=400",
        subcategories: [
            { id: "entrepreneurship", name: "Entrepreneurship", image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=400" },
            { id: "product-mgmt", name: "Product Management", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400" },
            { id: "growth-hacking", name: "Growth Hacking", image: "https://images.unsplash.com/photo-1454165833267-03511eb44d8b?auto=format&fit=crop&q=80&w=400" },
            { id: "fundraising", name: "Fundraising Basics", image: "https://images.unsplash.com/photo-1553484771-047a44eee27b?auto=format&fit=crop&q=80&w=400" }
        ]
    },
    {
        id: "freelancing",
        name: "Freelancing",
        slug: "freelancing",
        icon: "Zap",
        description: "Lauch your freelance career",
        color: "#F43F5E",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400",
        subcategories: [
            { id: "freelance-basics", name: "Freelancing Basics", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400" },
            { id: "clients", name: "Client Acquisition", image: "https://images.unsplash.com/photo-1556761175-5973bc0f22b8?auto=format&fit=crop&q=80&w=400" },
            { id: "upwork", name: "Upwork Masterclass", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400" },
            { id: "branding", name: "Personal Branding", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400" }
        ]
    }
];

export const MOCK_VIDEO_COURSES: VideoCourse[] = [
    // Web Dev Courses
    {
        id: "js-m1",
        category_id: "web-dev",
        title: "Modern JavaScript Masterclass",
        description: "Deep dive into JS: From Variables to Closures and Async/Await.",
        difficulty: "Beginner",
        duration: "45h",
        instructor_name: "Chai aur Code",
        thumbnail_url: "https://img.youtube.com/vi/Zg4-uSjxosE/maxresdefault.jpg",
        video_url: "https://youtu.be/Zg4-uSjxosE",
        source_platform: "YouTube",
        is_external: true,
        total_views: 120000,
        rating: 5.0,
        created_at: new Date().toISOString(),
        lessons: [
            { id: "js-l1", title: "JavaScript Introduction", duration: "12:05", video_url: "https://youtu.be/Zg4-uSjxosE" }
        ]
    },
    {
        id: "py-m1",
        category_id: "ai-ml",
        title: "Python for Data Science",
        description: "Master Python specifically for data processing and analysis.",
        difficulty: "Beginner",
        duration: "20h",
        instructor_name: "Krish Naik",
        thumbnail_url: "https://img.youtube.com/vi/fXAGTOZ25H8/maxresdefault.jpg",
        video_url: "https://youtu.be/fXAGTOZ25H8",
        source_platform: "YouTube",
        is_external: true,
        total_views: 45000,
        rating: 4.9,
        created_at: new Date().toISOString()
    }
];
