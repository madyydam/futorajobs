import { AdminLayout } from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Award, Plus, QrCode, Send, Trash2, ShieldCheck, Eye } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Module-level constants — never recreated on render
const MOCK_TEMPLATES = [
    { id: "t1", title: "Course Completion", description: "Awarded upon completing any course", color: "#2563EB", issued: 142 },
    { id: "t2", title: "Career Track Graduate", description: "Full track completion with project proof", color: "#7C3AED", issued: 38 },
    { id: "t3", title: "Verified Builder", description: "3+ projects approved by admin", color: "#059669", issued: 61 },
    { id: "t4", title: "Interview Ready", description: "Passed AI interview benchmark", color: "#D97706", issued: 27 },
] as const;

const MOCK_ISSUED = [
    { id: "c1", user: "Rahul Sharma", template: "Course Completion", course: "Web Development", issuedAt: "Feb 22, 2026", status: "active" },
    { id: "c2", user: "Priya Patel", template: "Verified Builder", course: "3 Projects Approved", issuedAt: "Feb 20, 2026", status: "active" },
    { id: "c3", user: "Amit Kumar", template: "Career Track Graduate", course: "AI Engineer Track", issuedAt: "Feb 18, 2026", status: "revoked" },
] as const;

type Certificate = { id: string; user: string; template: string; course: string; issuedAt: string; status: string };

// Pre-computed stats to avoid recalculating in JSX
const TOTAL_ISSUED = MOCK_TEMPLATES.reduce((a, t) => a + t.issued, 0);
const INITIAL_CERTS: Certificate[] = MOCK_ISSUED.map(c => ({ ...c }));

// Tab labels map
const TAB_LABELS: Record<"templates" | "issued" | "issue", string> = {
    templates: "Templates",
    issued: "Issued Certs",
    issue: "Issue Manual",
};

const CertificateEngine = () => {
    const [activeTab, setActiveTab] = useState<"templates" | "issued" | "issue">("templates");
    const [certificates, setCertificates] = useState<Certificate[]>(INITIAL_CERTS);
    const [previewId, setPreviewId] = useState<string | null>(null);

    // Memoized stats so they don't recompute unless certificates changes
    const stats = useMemo(() => ({
        active: certificates.filter(c => c.status === "active").length,
        revoked: certificates.filter(c => c.status === "revoked").length,
    }), [certificates]);

    const handleRevoke = useCallback((id: string) => {
        setCertificates(prev => prev.map(c => c.id === id ? { ...c, status: "revoked" } : c));
        toast.error("Certificate revoked");
    }, []);

    const handleIssue = useCallback(() => {
        toast.success("Certificate issued successfully!");
    }, []);

    const closePreview = useCallback(() => setPreviewId(null), []);

    return (
        <AdminLayout>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 text-primary uppercase text-[10px] font-black tracking-[0.4em] mb-3">
                            <Award className="h-4 w-4" />
                            Credential Authority
                        </div>
                        <h1 className="text-4xl font-black text-foreground tracking-tighter italic uppercase">CERTIFICATE <span className="text-primary/40 dark:text-primary/60">ENGINE</span></h1>
                        <p className="text-muted-foreground mt-3 font-medium text-sm">Issue, manage, and revoke credentials across the platform.</p>
                    </div>
                    <button className="h-14 px-8 rounded-2xl bg-primary text-black transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:scale-[1.02] active:scale-95">
                        <Plus className="h-4 w-4" />
                        New Template
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Templates", value: MOCK_TEMPLATES.length },
                        { label: "Total Issued", value: TOTAL_ISSUED },
                        { label: "Active", value: stats.active },
                        { label: "Revoked", value: stats.revoked },
                    ].map(s => (
                        <div key={s.label} className="bg-card border border-border p-6 rounded-[2rem]">
                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2">{s.label}</div>
                            <div className="text-3xl font-black text-foreground">{s.value}</div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    {(Object.keys(TAB_LABELS) as (keyof typeof TAB_LABELS)[]).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                activeTab === tab ? "bg-primary text-black" : "bg-card border border-border text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {TAB_LABELS[tab]}
                        </button>
                    ))}
                </div>

                <div className="bg-card border border-border rounded-[2rem] overflow-hidden">
                    {activeTab === "templates" && (
                        <div className="grid md:grid-cols-2 gap-0 divide-border/50">
                            {MOCK_TEMPLATES.map((t, i) => (
                                <div key={t.id} className={cn("p-8 hover:bg-muted/20 transition-colors", i % 2 === 0 ? "border-r border-border/50" : "", i < 2 ? "border-b border-border/50" : "")}>
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="h-14 w-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${t.color}20` }}>
                                            <Award className="h-6 w-6" style={{ color: t.color }} />
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Issued</div>
                                            <div className="text-2xl font-black text-foreground">{t.issued}</div>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-1">{t.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-6">{t.description}</p>
                                    <div className="flex gap-3">
                                        <button onClick={() => setPreviewId(t.id)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
                                            <Eye className="h-3.5 w-3.5" /> Preview
                                        </button>
                                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground">
                                            <QrCode className="h-3.5 w-3.5" /> Verify Link
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "issued" && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-muted/30 border-b border-border text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                    <tr>
                                        <th className="px-8 py-5">Recipient</th>
                                        <th className="px-8 py-5">Certificate</th>
                                        <th className="px-8 py-5">Issued</th>
                                        <th className="px-8 py-5">Status</th>
                                        <th className="px-8 py-5 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {certificates.map(c => (
                                        <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                                            <td className="px-8 py-5 font-bold text-foreground">{c.user}</td>
                                            <td className="px-8 py-5">
                                                <div className="text-sm font-bold text-foreground">{c.template}</div>
                                                <div className="text-xs text-muted-foreground">{c.course}</div>
                                            </td>
                                            <td className="px-8 py-5 text-sm text-muted-foreground">{c.issuedAt}</td>
                                            <td className="px-8 py-5">
                                                <span className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                                                    c.status === "active" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500")}>
                                                    {c.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                {c.status === "active" && (
                                                    <button onClick={() => handleRevoke(c.id)} className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline flex items-center gap-1.5 ml-auto">
                                                        <Trash2 className="h-3.5 w-3.5" /> Revoke
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === "issue" && (
                        <div className="p-8 max-w-lg">
                            <h3 className="text-lg font-bold mb-6">Issue Certificate Manually</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Select User</label>
                                    <select className="w-full h-12 bg-background border border-border rounded-2xl px-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary/20">
                                        <option>Rahul Sharma</option>
                                        <option>Priya Patel</option>
                                        <option>Amit Kumar</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Certificate Template</label>
                                    <select className="w-full h-12 bg-background border border-border rounded-2xl px-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary/20">
                                        {MOCK_TEMPLATES.map(t => <option key={t.id}>{t.title}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Achievement / Course Name</label>
                                    <input className="w-full h-12 bg-background border border-border rounded-2xl px-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary/20" placeholder="e.g. Full Stack React Course" />
                                </div>
                                <button onClick={handleIssue} className="w-full h-14 rounded-2xl bg-primary text-black font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:opacity-90 transition-all mt-2">
                                    <Send className="h-4 w-4" /> Issue Certificate
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Preview Modal */}
                {previewId && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        onClick={closePreview}
                    >
                        <motion.div
                            className="bg-card border border-border rounded-[2rem] p-10 max-w-md w-full text-center"
                            initial={{ scale: 0.95 }} animate={{ scale: 1 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                                <Award className="h-10 w-10 text-primary" />
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-2">Certificate of Achievement</div>
                            <h2 className="text-2xl font-black text-foreground mb-1">{MOCK_TEMPLATES.find(t => t.id === previewId)?.title}</h2>
                            <p className="text-muted-foreground text-sm mb-6">This certifies that <strong>[Recipient Name]</strong> has successfully completed the requirements.</p>
                            <div className="flex items-center justify-center gap-2 text-[10px] font-black text-primary">
                                <ShieldCheck className="h-4 w-4" />
                                <span>FutoraCareer • Verified Credential</span>
                            </div>
                            <div className="mt-6 p-4 bg-muted/50 rounded-2xl flex items-center justify-center gap-3">
                                <QrCode className="h-8 w-8 text-muted-foreground" />
                                <div className="text-left">
                                    <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">QR Verify</div>
                                    <div className="text-xs font-bold text-foreground">futora.career/verify/xxx</div>
                                </div>
                            </div>
                            <button onClick={closePreview} className="mt-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Close Preview</button>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </AdminLayout>
    );
};

export default CertificateEngine;
