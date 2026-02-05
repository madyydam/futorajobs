import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    BookOpen,
    Target,
    Briefcase,
    GraduationCap,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    ShieldCheck,
    Sun,
    Moon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

interface AdminSidebarProps {
    collapsed: boolean;
    setCollapsed: (val: boolean) => void;
    isDark: boolean;
    setIsDark: (val: boolean) => void;
}

export function AdminSidebar({ collapsed, setCollapsed, isDark, setIsDark }: AdminSidebarProps) {
    const location = useLocation();
    const { signOut, role } = useAuth();

    const menuItems = [
        { icon: LayoutDashboard, label: "Mission Control", path: "/admin" },
        { icon: Users, label: "User Intelligence", path: "/admin/users" },
        { icon: BookOpen, label: "Learning Governance", path: "/admin/learning" },
        { icon: Target, label: "Career OS", path: "/admin/career-paths" },
        { icon: Briefcase, label: "Job & Talent", path: "/admin/jobs" },
        { icon: GraduationCap, label: "Internship Control", path: "/admin/internships" },
        { icon: Settings, label: "System Brain", path: "/admin/settings" },
    ];

    return (
        <div
            className={cn(
                "fixed left-0 top-0 h-screen bg-card/80 dark:bg-neutral-950/80 backdrop-blur-2xl border-r border-border dark:border-white/5 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-50 flex flex-col",
                collapsed ? "w-20" : "w-72"
            )}
        >
            {/* Header / Brand */}
            <div className="p-6 flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-primary/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                    <ShieldCheck className="h-6 w-6 text-white dark:text-black" />
                </div>
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                    >
                        <span className="font-black text-lg tracking-tighter text-foreground dark:text-white italic leading-none uppercase">FUTORA<span className="text-primary/60 not-italic ml-1 font-bold tracking-normal text-xs">OS</span></span>
                        <span className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-black mt-1.5">
                            {typeof role === 'string' ? role.replace('_', ' ') : 'VERIFYING IDENTITY'}
                        </span>
                    </motion.div>
                )}
            </div>

            {/* Navigation Section */}
            <div className="flex-1 px-4 mt-8 space-y-8 overflow-y-auto scrollbar-none">
                <div className="space-y-1.5">
                    {!collapsed && <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] px-3 mb-4">Core Governance</p>}
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-3 px-3.5 py-3 rounded-2xl transition-all duration-300 group relative",
                                    isActive
                                        ? "bg-primary/5 dark:bg-white/[0.03] text-primary"
                                        : "text-muted-foreground hover:text-foreground dark:hover:text-white hover:bg-muted dark:hover:bg-white/[0.02]"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute left-0 w-1 h-5 bg-primary rounded-full"
                                    />
                                )}
                                <item.icon className={cn(
                                    "h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110",
                                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground dark:group-hover:text-white"
                                )} />
                                {!collapsed && (
                                    <span className="text-xs font-bold tracking-tight">{item.label}</span>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 bg-muted/50 dark:bg-white/[0.01] border-t border-border dark:border-white/5 space-y-3">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-1 h-12 rounded-2xl bg-card border border-border dark:bg-white/[0.02] dark:border-white/5 text-muted-foreground hover:text-foreground dark:hover:text-white transition-all overflow-hidden"
                        onClick={() => setIsDark(!isDark)}
                    >
                        <motion.div
                            initial={false}
                            animate={{ y: isDark ? 0 : 40 }}
                            className="flex flex-col items-center gap-10"
                        >
                            <Moon className="h-5 w-5" />
                            <Sun className="h-5 w-5" />
                        </motion.div>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 rounded-2xl hover:bg-muted dark:hover:bg-white/[0.03] text-muted-foreground hover:text-foreground dark:hover:text-white transition-all"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                    </Button>
                </div>

                {!collapsed && (
                    <button
                        onClick={signOut}
                        className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-muted-foreground hover:text-red-500 hover:bg-red-500/5 transition-all group"
                    >
                        <LogOut className="h-5 w-5 shrink-0 group-hover:rotate-12 transition-transform" />
                        <span className="text-xs font-bold tracking-tight">Disconnect System</span>
                    </button>
                )}
            </div>
        </div>
    );
}
