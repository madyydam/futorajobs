import { AdminLayout } from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { BarChart2, TrendingUp, Users, BookOpen, Briefcase, Download, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { toast } from "sonner";

const CUSTOM_TOOLTIP_STYLE = {
    backgroundColor: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "16px",
    padding: "12px 16px",
    fontSize: "12px",
    fontWeight: 700,
    color: "hsl(var(--foreground))",
};

const Analytics = () => {
    // Real counts
    const { data: stats } = useQuery({
        queryKey: ["analytics-stats"],
        queryFn: async () => {
            const [
                { count: users },
                { count: courses },
                { count: jobs },
                { count: applications },
                { data: avgData }
            ] = await Promise.all([
                supabase.from("profiles").select("*", { count: "exact", head: true }),
                supabase.from("courses").select("*", { count: "exact", head: true }),
                supabase.from("jobs").select("*", { count: "exact", head: true }),
                supabase.from("applications").select("*", { count: "exact", head: true }),
                supabase.from("applications").select("readiness_score"),
            ]);
            const scores = avgData?.map(r => r.readiness_score ?? 0).filter(s => s > 0) ?? [];
            const avgReadiness = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
            return { users: users ?? 0, courses: courses ?? 0, jobs: jobs ?? 0, applications: applications ?? 0, avgReadiness };
        },
    });

    // Real user growth — new signups per day (last 11 days)
    const { data: growthData, isLoading: loadingGrowth } = useQuery({
        queryKey: ["analytics-user-growth"],
        queryFn: async () => {
            const since = new Date();
            since.setDate(since.getDate() - 10);
            const { data, error } = await supabase
                .from("profiles")
                .select("created_at")
                .gte("created_at", since.toISOString());
            if (error) throw error;
            // Group by day
            const counts: Record<string, number> = {};
            for (let i = 10; i >= 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                const key = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                counts[key] = 0;
            }
            data?.forEach(p => {
                const key = new Date(p.created_at!).toLocaleDateString("en-US", { month: "short", day: "numeric" });
                if (key in counts) counts[key]++;
            });
            return Object.entries(counts).map(([day, users]) => ({ day, users }));
        },
    });

    // Real application trends — by month (last 4 months)
    const { data: appTrends, isLoading: loadingTrends } = useQuery({
        queryKey: ["analytics-app-trends"],
        queryFn: async () => {
            const since = new Date();
            since.setMonth(since.getMonth() - 3);
            const { data, error } = await supabase
                .from("applications")
                .select("applied_at")
                .gte("applied_at", since.toISOString());
            if (error) throw error;
            const counts: Record<string, number> = {};
            data?.forEach(a => {
                if (!a.applied_at) return;
                const key = new Date(a.applied_at).toLocaleDateString("en-US", { month: "short" });
                counts[key] = (counts[key] ?? 0) + 1;
            });
            return Object.entries(counts).map(([month, applications]) => ({ month, applications }));
        },
    });

    // Real course completion by category
    const { data: courseCompletion } = useQuery({
        queryKey: ["analytics-course-completion"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("user_courses")
                .select("courses(category), completed");
            if (error) throw error;
            const totals: Record<string, { total: number; completed: number }> = {};
            data?.forEach(uc => {
                const cat = (uc.courses as { category: string } | null)?.category ?? "other";
                if (!totals[cat]) totals[cat] = { total: 0, completed: 0 };
                totals[cat].total++;
                if (uc.completed) totals[cat].completed++;
            });
            return Object.entries(totals).map(([category, v]) => ({
                category,
                completion: v.total > 0 ? Math.round((v.completed / v.total) * 100) : 0,
            }));
        },
    });

    // Real skills in network
    const { data: topSkills } = useQuery({
        queryKey: ["analytics-top-skills"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("user_skills")
                .select("skill_id, skills(name), level")
                .order("level", { ascending: false })
                .limit(60);
            if (error) throw error;
            // Deduplicate skill names, sort by frequency
            const freq: Record<string, number> = {};
            data?.forEach(us => {
                const name = (us.skills as { name: string } | null)?.name;
                if (name) freq[name] = (freq[name] ?? 0) + 1;
            });
            return Object.entries(freq)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 15)
                .map(([name]) => name);
        },
    });

    return (
        <AdminLayout>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 text-primary uppercase text-[10px] font-black tracking-[0.4em] mb-3">
                            <BarChart2 className="h-4 w-4" />
                            Platform Intelligence
                        </div>
                        <h1 className="text-4xl font-black text-foreground tracking-tighter italic uppercase">ANALYTICS <span className="text-primary/40 dark:text-primary/60">PANEL</span></h1>
                        <p className="text-muted-foreground mt-3 font-medium text-sm">Real-time platform metrics and growth intelligence.</p>
                    </div>
                    <button
                        onClick={() => toast.success("CSV export started...")}
                        className="h-14 px-8 rounded-2xl bg-card border border-border text-muted-foreground hover:text-foreground transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-3"
                    >
                        <Download className="h-4 w-4" />
                        Export CSV
                    </button>
                </div>

                {/* KPI Cards — real */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Total Users", value: stats?.users ?? "—", icon: Users, color: "text-primary" },
                        { label: "Courses Published", value: stats?.courses ?? "—", icon: BookOpen, color: "text-purple-500" },
                        { label: "Active Jobs", value: stats?.jobs ?? "—", icon: Briefcase, color: "text-blue-500" },
                        { label: "Avg Readiness", value: stats ? `${stats.avgReadiness}%` : "—", icon: TrendingUp, color: "text-emerald-500" },
                    ].map(kpi => {
                        const Icon = kpi.icon;
                        return (
                            <div key={kpi.label} className="bg-card border border-border p-6 rounded-[2rem]">
                                <div className="flex items-start justify-between mb-3">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{kpi.label}</p>
                                    <Icon className={`h-4 w-4 ${kpi.color}`} />
                                </div>
                                <div className="text-3xl font-black text-foreground">{kpi.value}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Charts Row 1 */}
                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                    {/* User Growth — real */}
                    <div className="bg-card border border-border rounded-[2rem] p-8">
                        <h3 className="font-black text-foreground uppercase tracking-widest text-sm mb-6">User Signups (Last 11 Days)</h3>
                        {loadingGrowth ? (
                            <div className="flex items-center justify-center h-[200px]"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
                        ) : (
                            <ResponsiveContainer width="100%" height={200}>
                                <AreaChart data={growthData}>
                                    <defs>
                                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis dataKey="day" tick={{ fontSize: 10, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                                    <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} allowDecimals={false} />
                                    <Tooltip contentStyle={CUSTOM_TOOLTIP_STYLE} />
                                    <Area type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#colorUsers)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                    {/* Course Completion — real */}
                    <div className="bg-card border border-border rounded-[2rem] p-8">
                        <h3 className="font-black text-foreground uppercase tracking-widest text-sm mb-6">Course Completion Rate (%)</h3>
                        {!courseCompletion ? (
                            <div className="flex items-center justify-center h-[200px]"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
                        ) : courseCompletion.length === 0 ? (
                            <div className="flex items-center justify-center h-[200px] text-xs text-muted-foreground font-black uppercase tracking-widest">No enrollment data yet</div>
                        ) : (
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={courseCompletion}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis dataKey="category" tick={{ fontSize: 10, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                                    <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={CUSTOM_TOOLTIP_STYLE} />
                                    <Bar dataKey="completion" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* Charts Row 2 */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Application Trends — real */}
                    <div className="lg:col-span-2 bg-card border border-border rounded-[2rem] p-8">
                        <h3 className="font-black text-foreground uppercase tracking-widest text-sm mb-6">Job Application Trends</h3>
                        {loadingTrends ? (
                            <div className="flex items-center justify-center h-[180px]"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
                        ) : !appTrends?.length ? (
                            <div className="flex items-center justify-center h-[180px] text-xs text-muted-foreground font-black uppercase tracking-widest">No application data yet</div>
                        ) : (
                            <ResponsiveContainer width="100%" height={180}>
                                <LineChart data={appTrends}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis dataKey="month" tick={{ fontSize: 10, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                                    <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} allowDecimals={false} />
                                    <Tooltip contentStyle={CUSTOM_TOOLTIP_STYLE} />
                                    <Line type="monotone" dataKey="applications" stroke="#7C3AED" strokeWidth={3} dot={{ r: 5, fill: "#7C3AED" }} />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                    {/* Top Skills — real */}
                    <div className="bg-card border border-border rounded-[2rem] p-8">
                        <h3 className="font-black text-foreground uppercase tracking-widest text-sm mb-6">Top Skills in Network</h3>
                        <div className="flex flex-wrap gap-2">
                            {topSkills?.length === 0 && (
                                <p className="text-xs text-muted-foreground font-black uppercase tracking-widest">No skill data yet</p>
                            )}
                            {topSkills?.map((skill, i) => (
                                <span
                                    key={skill}
                                    className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all cursor-default"
                                    style={{ fontSize: `${Math.max(9, 13 - i * 0.3)}px` }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AdminLayout>
    );
};

export default Analytics;
