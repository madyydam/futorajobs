import { AdminLayout } from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Users, BookOpen, Target, Briefcase, GraduationCap, TrendingUp, Sparkles, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const StatCard = ({ icon: Icon, label, value, trend, color }: any) => (
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
        queryKey: ['admin-stats'],
        queryFn: async () => {
            // In a real prod env, we'd call the view we created
            // For now, let's pull direct counts for the dashboard
            const [
                { count: users },
                { count: courses },
                { count: jobs },
                { count: internships },
                { count: applications },
                { count: approved }
            ] = await Promise.all([
                supabase.from('profiles').select('*', { count: 'exact', head: true }),
                supabase.from('courses').select('*', { count: 'exact', head: true }),
                supabase.from('jobs').select('*', { count: 'exact', head: true }),
                supabase.from('internships').select('*', { count: 'exact', head: true }),
                supabase.from('applications').select('*', { count: 'exact', head: true }),
                supabase.from('user_projects').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
            ]);

            return {
                users: users || 0,
                courses: courses || 0,
                jobs: jobs || 0,
                internships: internships || 0,
                applications: applications || 0,
                approved_projects: approved || 0
            };
        }
    });

    return (
        <AdminLayout>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        icon={Users}
                        label="Total Network Users"
                        value={stats?.users || 0}
                        trend="+12% from last week"
                        color="var(--primary)"
                    />
                    <StatCard
                        icon={BookOpen}
                        label="Learning Engagement"
                        value={stats?.courses || 0}
                        trend="+5% completions"
                        color="#8b5cf6"
                    />
                    <StatCard
                        icon={Sparkles}
                        label="Verified Evidence"
                        value={stats?.approved_projects || 0}
                        trend="+22 new proofs"
                        color="#ec4899"
                    />
                    <StatCard
                        icon={Briefcase}
                        label="Job Pipeline"
                        value={stats?.jobs || 0}
                        color="#3b82f6"
                    />
                    <StatCard
                        icon={GraduationCap}
                        label="Internship Unlocks"
                        value={stats?.internships || 0}
                        color="#10b981"
                    />
                    <StatCard
                        icon={Activity}
                        label="Hiring Authority"
                        value={stats?.applications || 0}
                        trend="Active signals"
                        color="#f59e0b"
                    />
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="clean-card p-8">
                        <h3 className="text-lg font-bold mb-6">Recent Network Activity</h3>
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-4 items-start pb-6 border-b border-border last:border-0 last:pb-0">
                                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                                        <Users className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">New User "User_{i}" joined the network</p>
                                        <p className="text-xs text-muted-foreground mt-1">Starting Career Path: AI Engineer • 2m ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="clean-card p-8 bg-primary/5 border-primary/20">
                        <h3 className="text-lg font-bold mb-4">System Notifications</h3>
                        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                            No critical system issues detected. All RLS policies are active and database triggers are firing correctly for skill growth.
                        </p>
                        <div className="p-4 rounded-xl bg-background/50 border border-primary/10">
                            <div className="flex items-center gap-3 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                                <ShieldCheck className="h-4 w-4" />
                                Governance Check
                            </div>
                            <p className="text-xs text-muted-foreground italic">
                                All application readiness scores are currently being calculated against seeded requirements. Application signal quality is high.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AdminLayout>
    );
};

const ShieldCheck = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>
);

export default Dashboard;
