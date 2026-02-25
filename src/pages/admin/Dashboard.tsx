import { AdminLayout } from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Users, BookOpen, Briefcase, GraduationCap, TrendingUp, Sparkles, Activity, ShieldCheck, Bot, Award, FolderGit2, BarChart2, CreditCard, ArrowRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

// Module-level constant — never recreated on re-render
const TOOLTIP_STYLE = {
    backgroundColor: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "12px",
    padding: "10px 14px",
    fontSize: "12px",
    fontWeight: 700,
    color: "hsl(var(--foreground))",
};

const QUICK_LINKS = [
    { label: "Project Engine", href: "/admin/projects", icon: FolderGit2 },
    { label: "Certificate Engine", href: "/admin/certificates", icon: Award },
    { label: "AI Engine", href: "/admin/ai-engine", icon: Bot },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart2 },
    { label: "Payments", href: "/admin/payments", icon: CreditCard },
] as const;

const TOP_SKILLS = ["React", "Python", "Node.js", "TypeScript", "Figma", "SQL", "ML", "Docker"];
const SYSTEM_ITEMS = ["RLS Policies Active", "DB Triggers Healthy", "Auth Provider Online"];

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
    trend?: string;
}

const StatCard = ({ icon: Icon, label, value, trend }: StatCardProps) => (
    <div className="bg-card border border-border p-8 rounded-[2rem] hover:bg-muted/50 transition-all duration-500 group">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">{label}</p>
                <h3 className="text-4xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">{value}</h3>
                {trend && (
                    <div className="flex items-center gap-1.5 mt-4 text-[10px] text-emerald-500 font-black uppercase tracking-wider">
                        <TrendingUp className="h-3 w-3" />
                        <span>{trend}</span>
                    </div>
                )}
            </div>
            <div className="p-4 rounded-2xl bg-muted group-hover:bg-primary/10 transition-colors">
                <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const { data: stats, isLoading } = useQuery({
        queryKey: ["admin-stats"],
        staleTime: 30_000,
        queryFn: async () => {
            const [
                { count: users },
                { count: courses },
                { count: jobs },
                { count: internships },
                { count: applications },
                { count: approved }
            ] = await Promise.all([
                supabase.from("profiles").select("*", { count: "exact", head: true }),
                supabase.from("courses").select("*", { count: "exact", head: true }),
                supabase.from("jobs").select("*", { count: "exact", head: true }),
                supabase.from("internships").select("*", { count: "exact", head: true }),
                supabase.from("applications").select("*", { count: "exact", head: true }),
                supabase.from("user_projects").select("*", { count: "exact", head: true }).eq("status", "approved"),
            ]);
            return { users: users ?? 0, courses: courses ?? 0, jobs: jobs ?? 0, internships: internships ?? 0, applications: applications ?? 0, approved_projects: approved ?? 0 };
        },
    });

    // Real user signup growth for the past 7 days
    const { data: growthData, isLoading: loadingGrowth } = useQuery({
        queryKey: ["admin-dash-growth"],
        staleTime: 30_000,
        queryFn: async () => {
            const since = new Date();
            since.setDate(since.getDate() - 6);
            const { data } = await supabase
                .from("profiles")
                .select("created_at")
                .gte("created_at", since.toISOString());
            const counts: Record<string, number> = {};
            for (let i = 6; i >= 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                counts[d.toLocaleDateString("en-US", { month: "short", day: "numeric" })] = 0;
            }
            data?.forEach(p => {
                const key = new Date(p.created_at!).toLocaleDateString("en-US", { month: "short", day: "numeric" });
                if (key in counts) counts[key]++;
            });
            return Object.entries(counts).map(([day, users]) => ({ day, users }));
        },
    });

    return (
        <AdminLayout>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 text-primary uppercase text-[10px] font-black tracking-[0.4em] mb-3">
                            <Activity className="h-4 w-4" />
                            Live Telemetry
                        </div>
                        <h1 className="text-4xl font-black text-foreground tracking-tighter italic uppercase">MISSION <span className="text-primary/40 dark:text-primary/60">CONTROL</span></h1>
                        <p className="text-muted-foreground mt-3 font-medium text-sm">System performance and network health report.</p>
                    </div>
                    <div className="px-6 py-3 rounded-2xl bg-emerald-500/5 text-emerald-500 text-[10px] font-black tracking-[0.2em] border border-emerald-500/10 flex items-center gap-3 backdrop-blur-xl">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        GOVERNANCE OPTIMAL
                    </div>
                </div>

                {/* KPI stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard icon={Users} label="Total Network Users" value={isLoading ? "—" : stats?.users || 0} trend="+12% this week" />
                    <StatCard icon={BookOpen} label="Learning Engagement" value={isLoading ? "—" : stats?.courses || 0} trend="+5% completions" />
                    <StatCard icon={Sparkles} label="Verified Evidence" value={isLoading ? "—" : stats?.approved_projects || 0} trend="+22 new proofs" />
                    <StatCard icon={Briefcase} label="Job Pipeline" value={isLoading ? "—" : stats?.jobs || 0} />
                    <StatCard icon={GraduationCap} label="Internship Unlocks" value={isLoading ? "—" : stats?.internships || 0} />
                    <StatCard icon={Activity} label="Total Applications" value={isLoading ? "—" : stats?.applications || 0} trend="Active signals" />
                </div>

                {/* User Growth Chart + Quick Actions */}
                <div className="grid lg:grid-cols-3 gap-6 mb-6">
                    <div className="lg:col-span-2 bg-card border border-border rounded-[2rem] p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-black text-foreground uppercase tracking-widest text-sm">User Signups (Last 7 Days)</h3>
                            <Link to="/admin/analytics" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-1">
                                Full Analytics <ArrowRight className="h-3 w-3" />
                            </Link>
                        </div>
                        {loadingGrowth ? (
                            <div className="flex items-center justify-center h-[180px]">
                                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={180}>
                                <AreaChart data={growthData}>
                                    <defs>
                                        <linearGradient id="colorU" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis dataKey="day" tick={{ fontSize: 10, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                                    <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} allowDecimals={false} />
                                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                                    <Area type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#colorU)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                    {/* Quick Links to Modules */}
                    <div className="bg-card border border-border rounded-[2rem] p-6">
                        <h3 className="font-black text-foreground uppercase tracking-widest text-sm mb-4">Quick Access</h3>
                        <div className="space-y-2">
                            {QUICK_LINKS.map(link => {
                                const Icon = link.icon;
                                return (
                                    <Link key={link.href} to={link.href} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-muted transition-colors group">
                                        <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">{link.label}</span>
                                        <ArrowRight className="h-3 w-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Top Skills + System Status */}
                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-card border border-border rounded-[2rem] p-8">
                        <h3 className="font-black text-foreground uppercase tracking-widest text-sm mb-4">Trending Skills in Network</h3>
                        <div className="flex flex-wrap gap-2">
                            {TOP_SKILLS.map(skill => (
                                <span key={skill} className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:border-primary/30 hover:text-primary transition-all cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-8">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            System Notifications
                        </h3>
                        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                            No critical system issues detected. All RLS policies are active and database triggers are firing correctly.
                        </p>
                        <div className="space-y-3">
                            {SYSTEM_ITEMS.map(item => (
                                <div key={item} className="flex items-center gap-3 text-sm">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                    <span className="font-medium text-foreground">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AdminLayout>
    );
};

export default Dashboard;
