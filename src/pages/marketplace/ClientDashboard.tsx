import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Zap, Search, Briefcase, IndianRupee, Star, Settings, Bell, ChevronRight, Plus, ShoppingBag, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const stats = [
    { label: "Active Projects", value: "2", icon: Briefcase, color: "text-blue-500" },
    { label: "Total Spent", value: "₹28,500", icon: IndianRupee, color: "text-primary" },
    { label: "Talent Hired", value: "4", icon: Users, color: "text-purple-500" },
];

const ClientDashboard = () => {
    return (
        <Layout>
            <div className="max-w-7xl mx-auto py-12 px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic uppercase mb-2">
                            CLIENT <span className="text-primary/40">PORTAL</span>
                        </h1>
                        <p className="text-muted-foreground font-medium flex items-center gap-2">
                            Managing Startup Talent <ChevronRight className="h-4 w-4" /> Nexus AI
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-xl border-white/10 bg-white/5 h-12">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <Button asChild className="rounded-xl bg-primary text-black hover:bg-primary/90 h-12 font-bold px-6">
                            <Link to="/freelancing">
                                <Search className="h-4 w-4 mr-2" />
                                FIND TALENT
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <stat.icon className="h-24 w-24" />
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                                <div className={`h-2 w-2 rounded-full ${stat.color} animate-pulse`}></div>
                                {stat.label}
                            </div>
                            <div className="text-4xl font-black text-white italic">{stat.value}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Tabs defaultValue="hired" className="w-full">
                            <TabsList className="bg-white/5 border border-white/10 rounded-2xl p-1 mb-8">
                                <TabsTrigger value="hired" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-black transition-all">HIRED TALENT</TabsTrigger>
                                <TabsTrigger value="posted" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-black transition-all">POSTED REQUIREMENTS</TabsTrigger>
                            </TabsList>

                            <TabsContent value="hired" className="space-y-4">
                                {[
                                    { freelancer: "Rahul Sharma", service: "Mobile App UI Design", progress: 75, status: "Active", deadline: "3 days", avatar: "https://i.pravatar.cc/150?u=rahul" },
                                    { freelancer: "Priya Das", service: "SaaS Landing Page", progress: 100, status: "Completed", deadline: "Delivered", avatar: "https://i.pravatar.cc/150?u=priya" },
                                ].map((order, i) => (
                                    <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 group hover:border-primary/30 transition-all">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-12 w-12 border border-white/10">
                                                    <AvatarImage src={order.avatar} />
                                                    <AvatarFallback>{order.freelancer.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="text-sm font-bold text-white mb-0.5">{order.service}</div>
                                                    <div className="text-xs text-muted-foreground">Freelancer: <span className="text-primary/80 font-bold">{order.freelancer}</span></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="text-right">
                                                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Status</div>
                                                    <div className={`text-xs font-bold uppercase ${order.status === 'Completed' ? 'text-primary' : 'text-blue-400'}`}>{order.status}</div>
                                                </div>
                                                <Button size="sm" variant="outline" className="rounded-xl border-white/10 bg-white/5 font-bold text-[10px] h-9">
                                                    VEW ORDER
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                                                <span className="text-muted-foreground">Project Progress</span>
                                                <span className="text-white">{order.progress}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${order.progress}%` }}
                                                    className="h-full bg-primary"
                                                ></motion.div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </TabsContent>

                            <TabsContent value="posted">
                                <div className="p-12 text-center rounded-3xl border-2 border-dashed border-white/10 bg-white/5">
                                    <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                                        <Plus className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <h3 className="text-white font-bold mb-2">No Active Requirements</h3>
                                    <p className="text-xs text-muted-foreground max-w-xs mx-auto mb-6 uppercase tracking-widest font-bold">Post your startup's needs and let top talent find you.</p>
                                    <Button className="rounded-xl bg-primary text-black font-bold px-8">POST REQUIREMENT</Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <section className="p-8 rounded-3xl bg-white/5 border border-white/10">
                            <h3 className="text-lg font-black italic uppercase tracking-tighter text-white mb-6">QUICK ACTIONS</h3>
                            <div className="space-y-3">
                                <Button variant="outline" className="w-full justify-start rounded-xl border-white/10 bg-white/5 h-14 font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                                    <MessageSquare className="h-4 w-4 mr-3 text-primary" />
                                    CHAT TO TALENT
                                </Button>
                                <Button variant="outline" className="w-full justify-start rounded-xl border-white/10 bg-white/5 h-14 font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                                    <Clock className="h-4 w-4 mr-3 text-primary" />
                                    VIEW HISTORY
                                </Button>
                                <Button variant="outline" className="w-full justify-start rounded-xl border-white/10 bg-white/5 h-14 font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                                    <Star className="h-4 w-4 mr-3 text-primary" />
                                    LEAVE A REVIEW
                                </Button>
                            </div>
                        </section>

                        <div className="p-8 rounded-[32px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Zap className="h-20 w-20 text-white" />
                            </div>
                            <h3 className="text-white font-black italic uppercase tracking-tighter text-xl mb-2">FUTORA PRO</h3>
                            <p className="text-xs text-white/60 font-medium mb-6">Get 10% discount on all service fees and priority talent matching.</p>
                            <Button className="w-full rounded-xl bg-white text-black hover:bg-white/90 font-bold uppercase tracking-widest text-[10px]">
                                UPGRADE NOW
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

// Messaging interface components (reused from Chat.tsx logic but themed for Marketplace)
const MessageSquare = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

export default ClientDashboard;
