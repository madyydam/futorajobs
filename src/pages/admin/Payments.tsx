import { AdminLayout } from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { CreditCard, TrendingUp, RefreshCw, Shield, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_TRANSACTIONS = [
    { id: "txn_001", user: "Rahul Sharma", plan: "Recruiter Plan", amount: "₹1,999", status: "paid", date: "Feb 25, 2026" },
    { id: "txn_002", user: "Startup Hub", plan: "Pro Plan", amount: "₹799", status: "paid", date: "Feb 24, 2026" },
    { id: "txn_003", user: "Priya Patel", plan: "Pro Plan", amount: "₹799", status: "pending", date: "Feb 24, 2026" },
    { id: "txn_004", user: "Amit Kumar", plan: "Recruiter Plan", amount: "₹1,999", status: "refunded", date: "Feb 23, 2026" },
    { id: "txn_005", user: "Sneha Joshi", plan: "Pro Plan", amount: "₹799", status: "paid", date: "Feb 22, 2026" },
];

const PLANS = [
    { name: "Free", price: "₹0", features: ["Browse Jobs", "3 Applications/mo", "Basic Profile"], color: "border-border", badge: "" },
    { name: "Pro", price: "₹799/mo", features: ["Unlimited Applications", "AI Interview Coach", "Portfolio Page", "Readiness Score"], color: "border-primary/50", badge: "POPULAR" },
    { name: "Recruiter", price: "₹1,999/mo", features: ["Post Unlimited Jobs", "View All Applicants", "AI Match Scoring", "Analytics Dashboard"], color: "border-purple-500/50", badge: "FOUNDER" },
];

const statusColor: Record<string, string> = {
    paid: "bg-emerald-500/10 text-emerald-500",
    pending: "bg-yellow-500/10 text-yellow-500",
    refunded: "bg-red-500/10 text-red-500",
};

const Payments = () => {
    return (
        <AdminLayout>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 text-primary uppercase text-[10px] font-black tracking-[0.4em] mb-3">
                            <CreditCard className="h-4 w-4" />
                            Revenue Engine
                        </div>
                        <h1 className="text-4xl font-black text-foreground tracking-tighter italic uppercase">PAYMENTS <span className="text-primary/40 dark:text-primary/60">CONTROL</span></h1>
                        <p className="text-muted-foreground mt-3 font-medium text-sm">Manage subscriptions, transactions, and refunds.</p>
                    </div>
                    <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-yellow-500/5 text-yellow-500 text-[10px] font-black tracking-[0.2em] border border-yellow-500/10">
                        <AlertCircle className="h-4 w-4" />
                        STRIPE INTEGRATION COMING SOON
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "MRR", value: "₹18,394", trend: "+23%", color: "text-emerald-500" },
                        { label: "Active Subs", value: "24", trend: "+5", color: "text-primary" },
                        { label: "Pending", value: "1", trend: "", color: "text-yellow-500" },
                        { label: "Refunds", value: "₹1,999", trend: "-1 txn", color: "text-red-500" },
                    ].map(s => (
                        <div key={s.label} className="bg-card border border-border p-6 rounded-[2rem]">
                            <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-2", s.color)}>{s.label}</p>
                            <div className="text-2xl font-black text-foreground">{s.value}</div>
                            {s.trend && <div className="text-[10px] font-black text-muted-foreground mt-1">{s.trend}</div>}
                        </div>
                    ))}
                </div>

                {/* Subscription Plans */}
                <div className="mb-8">
                    <h2 className="font-black text-foreground uppercase tracking-widest text-sm mb-4">Subscription Plans</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {PLANS.map(plan => (
                            <div key={plan.name} className={cn("bg-card border-2 rounded-[2rem] p-6 relative", plan.color)}>
                                {plan.badge && (
                                    <span className="absolute top-4 right-4 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary/10 text-primary">{plan.badge}</span>
                                )}
                                <h3 className="text-xl font-black text-foreground mb-1">{plan.name}</h3>
                                <div className="text-2xl font-black text-primary mb-4">{plan.price}</div>
                                <div className="space-y-2">
                                    {plan.features.map(f => (
                                        <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Transaction History */}
                <div className="bg-card border border-border rounded-[2rem] overflow-hidden mb-6">
                    <div className="p-6 border-b border-border flex items-center justify-between">
                        <h2 className="font-black text-foreground uppercase tracking-widest text-sm">Transaction History</h2>
                        <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                            <Shield className="h-3.5 w-3.5" />
                            Mock Data
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-muted/30 border-b border-border text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                <tr>
                                    <th className="px-8 py-4">Transaction ID</th>
                                    <th className="px-8 py-4">User</th>
                                    <th className="px-8 py-4">Plan</th>
                                    <th className="px-8 py-4">Amount</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4">Date</th>
                                    <th className="px-8 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {MOCK_TRANSACTIONS.map(txn => (
                                    <tr key={txn.id} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-8 py-4 text-[10px] font-black text-muted-foreground font-mono">{txn.id}</td>
                                        <td className="px-8 py-4 font-bold text-foreground text-sm">{txn.user}</td>
                                        <td className="px-8 py-4 text-sm text-muted-foreground">{txn.plan}</td>
                                        <td className="px-8 py-4 font-black text-foreground">{txn.amount}</td>
                                        <td className="px-8 py-4">
                                            <span className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full", statusColor[txn.status])}>
                                                {txn.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4 text-sm text-muted-foreground">{txn.date}</td>
                                        <td className="px-8 py-4 text-right">
                                            {txn.status === "paid" && (
                                                <button className="flex items-center gap-1.5 text-[10px] font-black text-red-400 hover:text-red-500 transition-colors ml-auto">
                                                    <RefreshCw className="h-3 w-3" /> Refund
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Stripe Banner */}
                <div className="bg-gradient-to-r from-[#635BFF]/10 to-[#0EA5E9]/10 border border-[#635BFF]/20 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#635BFF] mb-2">Coming Soon</div>
                        <h3 className="text-xl font-black text-foreground">Stripe & Razorpay Integration</h3>
                        <p className="text-sm text-muted-foreground mt-1">Full payment processing, webhooks, and subscription management will be live in the next release.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="px-6 py-3 rounded-2xl bg-[#635BFF] text-white text-[10px] font-black uppercase tracking-widest">Stripe</div>
                        <div className="px-6 py-3 rounded-2xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest">Razorpay</div>
                    </div>
                </div>
            </motion.div>
        </AdminLayout>
    );
};

export default Payments;
