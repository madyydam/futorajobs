# FutoraCareer All Features (Master Document)

This document provides an exhaustive, end-to-end breakdown of the FutoraCareer (Career OS) platform, including existing features, planned roadmap, tech stack, and integrations.

---

## 1. Existing Features

1.  **Learning & Skill Development**
    a.  **Courses Module**
        i.   Browse high-impact courses tailored for startup roles.
        ii.  Detailed course pages with syllabi, duration, and difficulty levels.
        iii. Performance tracking and competency mapping.
    b.  **Career Tracks (Trajectory Engine)**
        i.   Design-led career paths (Frontend, AI, Growth, Design).
        ii.  Multi-week progression with clear milestones.
        iii. Skill-based verified learning paths.
    c.  **Learning Modes**
        i.   Self-paced learning with industry-standard resources.
        ii.  Project-based validation of skills (Learn → Build → Hired).

2.  **Build & Proof-of-Work**
    a.  **Project Engine**
        i.   Real-world project prompts to build a portfolio.
        ii.  Guidance for AI-first, design-led, and remote-native building.
        iii. Repository of starter templates for quick prototyping.

3.  **Hire & Opportunity Hub (Pune-First)**
    a.  **Pune Jobs Portal**
        i.   Exclusive startup roles located in Pune.
        ii.  Remote, hybrid, and on-site filtering.
        iii. Skill-based application process bypassing traditional resumes.
    b.  **Internship Portal**
        i.   Student-focused internships in Pune's growing ecosystem.
        ii.  Paid vs. Learning-focused internship filtering.
        iii. Verified readiness scores for faster hiring.
    c.  **Job Posting Interface**
        i.   Vision-led job postings (Culture over keywords).
        ii.  Vision tags (Early-stage chaos, AI-first, Long-term builders).

4.  **Admin Operating System (Admin OS)**
    a.  **Dashboard & Analytics**
        i.   Real-time overview of users, jobs, and platform activity.
        ii.  KPI tracking for user readiness and placement.
    b.  **User Management**
        i.   Full access control and role assignment (User vs. Admin).
        ii.  User activity logs and identity verification.
    c.  **Learning Governance**
        i.   Manage and audit courses, tracks, and learning content.
        ii.  Competency score adjustments and curriculum mapping.
    d.  **Career OS (Trajectory Engine Admin)**
        i.   Initialize and configure high-impact career trajectories.
        ii.  Difficulty adjustment and milestone management.
    e.  **Internship & Job Control**
        i.   Moderate and verify role postings.
        ii.  Job status management (Active, Closed, Draft).
    f.  **System Settings (Kernel Configuration)**
        i.   Maintenance mode toggle and non-admin traffic redirection.
        ii.  AI Engine configuration and competency score auto-calculation.
        iii. Real-time RLS (Row Level Security) monitoring and audit logs.
        iv. Global Semantic Search toggle for vector-based search hub.

5.  **User Persona & Identity**
    a.  **Profile Hub**
        i.   Unified profile showcasing skills, projects, and readiness.
        ii.  Identity management and auth session control.
    b.  **Auth Portal**
        i.   Secure login/signup via Supabase.
        ii.  Role-based routing and redirection.

---

## 2. Remaining Features (Roadmap & Concepts)

1.  **Upcoming (Short-term Phase)**
    a.  **AI Interview Coach**
        i.   Automated mock interviews based on career trajectories.
        ii.  Real-time feedback on technical and cultural fit.
    b.  **Verified Portfolio (Proof-of-Work Badge)**
        i.   On-chain or cryptographically signed certificates for project completion.
        ii.  Public-facing profile links for recruiter visibility.
    c.  **Direct Recruiter Chat**
        i.   Real-time messaging between candidates and startup founders.
        ii.  In-platform interview scheduling and management.

2.  **Active (Mid-term Phase)**
    a.  **Skill Assessment Marketplace**
        i.   Third-party assessments and certifications integration.
        ii.  Live coding challenges with automated evaluation.
    b.  **Community Hub (Founder & Builder Network)**
        i.   Forums and groups for specific Pune startups.
        ii.  Local Pune networking event scheduling.
    c.  **Advanced Analytics for Recruiters**
        i.   Predictive hiring scores based on learning activity.
        ii.  Candidate benchmarking against Pune's talent pool.

3.  **10Phase (Long-term Vision)**
    a.  **Global Pune Expansion**
        i.   Replicating the "Pune-First" model for other tier-2 cities.
        ii.  Cross-city talent mobility engine.
    b.  **AI-Led Career Guidance**
        i.   Fully autonomous career path recommendations using deep user data.
        ii.  Predictive job market analysis for future skill demand.
    c.  **Self-Sovereign Identity (SSI)**
        i.   Decentralized career profiles owned entirely by the user.
        ii.  Interoperable resumes across the entire Futora ecosystem.

4.  **Other Missing/Conceptual**
    a.  **Payroll Integration** (Optional)
    b.  **Equity/ESOP Management Advisor**
    c.  **Remote Work Subsidy Hub**

---

## 3. Tech Stack

1.  **Frontend Framework**
    a.  **React 18**: Core UI library.
    b.  **Vite**: Fast build tool and dev server.
    c.  **TypeScript**: Type-safe development.

2.  **UI & Styling**
    a.  **Tailwind CSS**: Utility-first styling.
    b.  **shadcn/ui**: Premium UI components based on Radix UI.
    c.  **Lucide React**: Vector-based icon library.
    d.  **Framer Motion**: High-performance animations and transitions.

3.  **State & Data Management**
    a.  **TanStack Query (React Query)**: Server state management and caching.
    b.  **Supabase JS SDK**: Real-time DB and Auth interactions.

4.  **Backend & Infrastructure**
    a.  **Supabase (BaaS)**: PostgREST API, Auth, and Postgres DB.
    b.  **Vercel**: Global edge hosting and deployment.
    c.  **PostgreSQL**: Core relational database.

5.  **Tools & Libraries**
    a.  **React Hook Form / Zod**: Robust form handling and validation.
    b.  **Sonner / Toaster**: Notification management.
    c.  **Date-fns**: Date manipulation.
    d.  **Embla Carousel**: Responsive slider components.

---

## 4. Current Integrations

1.  **Supabase Auth**
2.  **Supabase Database (PostgreSQL)**
3.  **Vercel Hosting & CI/CD**
4.  **Lucide Icons**
5.  **Google Fonts (via Typography plugin)**

---

## 5. Pending Integrations

1.  **Stripe/Razorpay**: For premium courses or paid recruitment services.
2.  **Firebase Cloud Messaging (FCM)**: Real-time push notifications.
3.  **LinkedIn API**: Import profile and projects directly.
4.  **GitHub API**: Pull repository data for proof-of-work validation.
5.  **Slack/Discord**: Real-time notifications for job alerts.

---

## 6. Suggested Sections

1.  **Version History**
    *   2024: MVP Launch as FutoraJobs.
    *   2026 (Current): Rebranded to FutoraCareer (Career OS), Admin Engine V2.
    *   Future: Futora Ecosystem expansion.

2.  **User Roles & Permissions**
    *   **User**: Browse courses, apply to jobs/internships, build profile.
    *   **Admin**: Manage content, users, system settings, and trajectories.
    *   **Recruiter** (Planned): Post roles, search verified candidates.

3.  **KPIs & Metrics**
    *   **User Readiness Score**: 1-100 metric for candidate quality.
    *   **Course Completion Rate**: Measure of platform engagement.
    *   **Match Accuracy**: Effectiveness of skill-based hiring.

4.  **Dependencies Map**
    *   Jobs depend on Internship Control.
    *   Career Paths depend on Courses.
    *   Admin OS depends on Supabase RLS.

5.  **Future Roadmap**
    *   AI-Native Career Assistant.
    *   Global Talent Liquidity Engine.
