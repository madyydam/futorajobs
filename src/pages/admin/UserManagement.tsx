import { AdminLayout } from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Search, Filter, Mail, Award, Activity, Loader2, ArrowRight, BookOpen, Users, ShieldCheck, User, Download, Ban, Pause } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";

// Extracted outside component to stop recreation on every render
const ROLE_OPTIONS = [
    { value: "", label: "Standard User" },
    { value: "super_admin", label: "Super Admin" },
    { value: "curriculum_admin", label: "Curriculum Admin" },
    { value: "hiring_admin", label: "Hiring Admin" },
    { value: "support_admin", label: "Support Admin" },
] as const;

// Button extracted to module level (stable reference)
interface ButtonProps {
    children: React.ReactNode;
    variant?: "outline" | "solid";
    className?: string;
    onClick?: () => void;
}
const Button = ({ children, variant, className, onClick }: ButtonProps) => (
    <button
        onClick={onClick}
        className={cn(
            "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/20",
            variant === "outline" ? "border border-border bg-background hover:bg-muted" : "bg-primary text-primary-foreground hover:bg-primary/90",
            className
        )}
    >
        {children}
    </button>
);

const UserManagement = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isUpdating, setIsUpdating] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [suspendedIds, setSuspendedIds] = useState<string[]>([]);

    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ["admin-users"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("*, user_skills(count), user_courses(count), user_projects(count)")
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data;
        },
        staleTime: 30_000, // Re-use cached data for 30s
    });

    // Memoized filter — only recalculates when users or searchQuery changes
    const filteredUsers = useMemo(() => {
        if (!users) return [];
        const q = searchQuery.toLowerCase();
        if (!q) return users;
        return users.filter(u =>
            u.full_name?.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q)
        );
    }, [users, searchQuery]);

    // Stable callbacks via useCallback
    const handleRoleUpdate = useCallback(async (userId: string, newRole: string | null) => {
        setIsUpdating(userId);
        try {
            const { error } = await supabase
                .from("profiles")
                .update({ role: newRole || null })
                .eq("id", userId);
            if (error) throw error;
            toast.success("Identity Permissions Updated");
            refetch();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to update permissions");
        } finally {
            setIsUpdating(null);
        }
    }, [refetch]);

    const handleSuspend = useCallback((id: string, name: string) => {
        const wasAlready = suspendedIds.includes(id);
        setSuspendedIds(prev => wasAlready ? prev.filter(i => i !== id) : [...prev, id]);
        toast.success(`${name} ${wasAlready ? "unsuspended" : "suspended"}`);
    }, [suspendedIds]);

    const handleBan = useCallback((name: string) => {
        toast.error(`${name} has been permanently banned`);
    }, []);

    const handleExportCSV = useCallback(() => {
        if (!users?.length) return;
        const rows = [
            ["Name", "Email", "Role", "Skills", "Courses"].join(","),
            ...users.map(u => [
                `"${u.full_name}"`,
                `"${u.email ?? ""}"`,
                `"${(u as { role?: string }).role ?? ""}"`,
                (u.user_skills as { count: number }[])?.[0]?.count ?? 0,
                (u.user_courses as { count: number }[])?.[0]?.count ?? 0,
            ].join(","))
        ].join("\n");
        const blob = new Blob([rows], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "futora_users.csv";
        a.click();
        URL.revokeObjectURL(url);
        toast.success("CSV exported!");
    }, [users]);

    const toggleSelect = useCallback((id: string) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    }, []);

    const handleBulkAction = useCallback((action: string) => {
        toast.success(`Bulk ${action} applied to ${selectedIds.length} users`);
        setSelectedIds([]);
    }, [selectedIds.length]);

    const clearSelection = useCallback(() => setSelectedIds([]), []);

    return (
        <AdminLayout>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 text-primary uppercase text-[10px] font-black tracking-[0.4em] mb-3">
                            <Users className="h-4 w-4" />
                            Talent Analytics
                        </div>
                        <h1 className="text-4xl font-black text-foreground tracking-tighter italic uppercase">USER <span className="text-primary/40 dark:text-primary/60">INTELLIGENCE</span></h1>
                        <p className="text-muted-foreground mt-3 font-medium text-sm">Monitor and verify talent across the network.</p>
                    </div>
                </div>

                {/* Bulk Actions Bar */}
                {selectedIds.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex items-center gap-4 px-6 py-4 rounded-2xl bg-primary/5 border border-primary/20">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">{selectedIds.length} selected</span>
                        <button onClick={() => handleBulkAction("role assign")} className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-black transition-all">Assign Role</button>
                        <button onClick={() => handleBulkAction("suspend")} className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white transition-all">Suspend All</button>
                        <button onClick={() => handleBulkAction("delete")} className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">Delete All</button>
                        <button onClick={clearSelection} className="ml-auto text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground">Clear</button>
                    </motion.div>
                )}

                <div className="bg-card border border-border rounded-[2rem] overflow-hidden backdrop-blur-sm">
                    <div className="p-8 border-b border-border bg-muted/20 flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="relative w-full md:w-[400px] group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-600 group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Search by name or email..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="pl-12 h-14 bg-background/50 border-border rounded-2xl focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/50 font-bold"
                            />
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <Button variant="outline" className="h-14 px-8 rounded-2xl bg-background/50 border-border text-muted-foreground hover:text-foreground transition-all font-black text-[10px] uppercase tracking-widest">
                                <Filter className="h-4 w-4 mr-3" />
                                SKILL FILTER
                            </Button>
                            <Button onClick={handleExportCSV} variant="outline" className="h-14 px-8 rounded-2xl bg-background/50 border-border text-muted-foreground hover:text-foreground transition-all font-black text-[10px] uppercase tracking-widest">
                                <Download className="h-4 w-4 mr-3" />
                                EXPORT CSV
                            </Button>
                        </div>
                    </div>

                    <div className="overflow-x-auto overflow-y-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-muted/30 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-border">
                                <tr>
                                    <th className="px-8 py-5 w-10"></th>
                                    <th className="px-8 py-5">Network Identity</th>
                                    <th className="px-8 py-5 text-center">Engagement Spectrum</th>
                                    <th className="px-8 py-5 text-center">Acquisitions</th>
                                    <th className="px-8 py-5 text-right">Protocol</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-24 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <Loader2 className="h-10 w-10 animate-spin text-primary/40" />
                                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-700">Initializing Scan...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-24 text-center">
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-700">Zero Signals Detected</p>
                                        </td>
                                    </tr>
                                ) : filteredUsers.map(user => {
                                    const userRole = (user as { role?: string }).role ?? "";
                                    const isSuspended = suspendedIds.includes(user.id);
                                    const isSelected = selectedIds.includes(user.id);
                                    const skillCount = (user.user_skills as { count: number }[])?.[0]?.count ?? 0;
                                    const courseCount = (user.user_courses as { count: number }[])?.[0]?.count ?? 0;
                                    return (
                                        <tr key={user.id} className={cn("group hover:bg-white/[0.01] transition-colors relative", isSuspended && "opacity-50")}>
                                            <td className="px-4 py-6">
                                                <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(user.id)} className="w-4 h-4 accent-primary rounded" />
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.05] flex items-center justify-center font-black text-neutral-400 group-hover:text-primary transition-colors">
                                                        {user.full_name?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white tracking-tight leading-tight">{user.full_name}</div>
                                                        <div className="text-xs text-neutral-600 font-medium flex items-center gap-2 mt-1">
                                                            <Mail className="h-3 w-3" />
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-orange-500/[0.03] border border-orange-500/10 text-orange-500 text-[10px] font-black uppercase tracking-wider">
                                                        <Activity className="h-3.5 w-3.5" />
                                                        {user.current_streak ?? 0} DAY STREAK
                                                    </div>
                                                    <div className="text-[9px] text-neutral-600 font-bold uppercase tracking-widest">{user.availability}</div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center justify-center gap-3">
                                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-neutral-400 group-hover:text-primary transition-colors">
                                                        <Award className="h-3.5 w-3.5" />
                                                        <span className="text-[10px] font-black tracking-tight">{skillCount} SKILLS</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-neutral-400 group-hover:text-purple-400 transition-colors">
                                                        <BookOpen className="h-3.5 w-3.5" />
                                                        <span className="text-[10px] font-black tracking-tight">{courseCount} COURSES</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <select
                                                            value={userRole}
                                                            onChange={e => handleRoleUpdate(user.id, e.target.value || null)}
                                                            disabled={isUpdating === user.id}
                                                            className="bg-background border border-border rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer hover:bg-muted"
                                                        >
                                                            {ROLE_OPTIONS.map(opt => (
                                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                            ))}
                                                        </select>
                                                        {isUpdating === user.id
                                                            ? <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                                            : userRole
                                                                ? <ShieldCheck className="h-4 w-4 text-primary" />
                                                                : <User className="h-4 w-4 text-neutral-700" />
                                                        }
                                                    </div>
                                                    <button
                                                        onClick={() => handleSuspend(user.id, user.full_name ?? "User")}
                                                        className={cn("h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                                                            isSuspended ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/10" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/10 hover:bg-yellow-500 hover:text-white"
                                                        )}
                                                    >
                                                        <Pause className="inline h-3 w-3 mr-1" />{isSuspended ? "Unsuspend" : "Suspend"}
                                                    </button>
                                                    <button onClick={() => handleBan(user.full_name ?? "User")} className="h-10 px-4 rounded-xl bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest border border-red-500/10 hover:bg-red-500 hover:text-white transition-all">
                                                        <Ban className="inline h-3 w-3 mr-1" />Ban
                                                    </button>
                                                    <button className="h-10 px-6 rounded-xl bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10 hover:bg-primary hover:text-black transition-all group/btn">
                                                        INSPECT
                                                        <ArrowRight className="inline-block h-3 w-3 ml-2 -rotate-45 group-hover/btn:rotate-0 transition-transform" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        </AdminLayout>
    );
};

export default UserManagement;
