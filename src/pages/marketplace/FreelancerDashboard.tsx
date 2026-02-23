import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Zap, LayoutDashboard, Briefcase, IndianRupee, Star, Settings, Bell, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const stats = [
    { label: "Active Orders", value: "3", icon: Briefcase, color: "text-blue-500" },
    { label: "Total Earnings", value: "₹45,200", icon: IndianRupee, color: "text-primary" },
    { label: "Rating", value: "4.9", icon: Star, color: "text-yellow-500" },
];

const FreelancerDashboard = () => {
    return (
        <Layout>
            <div className="max-w-7xl mx-auto py-12 px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic uppercase mb-2">
                            MISSION <span className="text-primary/40">CONTROL</span>
                        </h1>
                        <p className="text-muted-foreground font-medium flex items-center gap-2">
                            Freelancer Dashboard <ChevronRight className="h-4 w-4" /> Rahul Sharma
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-xl border-white/10 bg-white/5 h-12">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <Button asChild className="rounded-xl bg-primary text-black hover:bg-primary/90 h-12 font-bold px-6">
                            <Link to="/freelancing/create">
                                <Plus className="h-4 w-4 mr-2" />
                                CREATE GIG
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
                        <Tabs defaultValue="orders" className="w-full">
                            <TabsList className="bg-white/5 border border-white/10 rounded-2xl p-1 mb-8">
                                <TabsTrigger value="orders" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-black transition-all">ACTIVE ORDERS</TabsTrigger>
                                <TabsTrigger value="gigs" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-black transition-all">MY GIGS</TabsTrigger>
                                <TabsTrigger value="reviews" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-black transition-all">REVIEWS</TabsTrigger>
                            </TabsList>

                            <TabsContent value="orders" className="space-y-4">
                                {[
                                    { client: "Starlight AI", service: "UI/UX Design", deadline: "2 days left", price: "₹12,000", status: "Active" },
                                    { client: "Nexus Corp", service: "Frontend Development", deadline: "Completed", price: "₹8,500", status: "In Review" },
                                ].map((order, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group hover:border-primary/30 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                                <Zap className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-white mb-0.5">{order.service}</div>
                                                <div className="text-xs text-muted-foreground">Client: <span className="text-white/60">{order.client}</span></div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-black text-white mb-1">{order.price}</div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-primary">{order.deadline}</div>
                                        </div>
                                    </div>
                                ))}
                            </TabsContent>

                            <TabsContent value="gigs">
                                <div className="p-12 text-center rounded-3xl border-2 border-dashed border-white/10">
                                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-white font-bold">Manage your active listings here.</p>
                                    <Button variant="link" className="text-primary font-bold">Show active gigs</Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <section className="p-8 rounded-3xl bg-white/5 border border-white/10">
                            <h3 className="text-lg font-black italic uppercase tracking-tighter text-white mb-6">FREELANCER PROFILE</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Response Rate</div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full w-[95%] bg-primary"></div>
                                    </div>
                                    <div className="flex justify-between mt-1 text-[10px] font-bold">
                                        <span className="text-primary">95%</span>
                                        <span className="text-muted-foreground">Excellent</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-center">
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Level</div>
                                        <div className="text-lg font-black text-white italic uppercase">PRO</div>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-center">
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Rank</div>
                                        <div className="text-lg font-black text-white italic uppercase">#12</div>
                                    </div>
                                </div>

                                <Button variant="outline" className="w-full rounded-xl border-white/10 bg-white/5 h-12 font-bold italic tracking-tighter uppercase">
                                    <Settings className="h-4 w-4 mr-2" />
                                    EDIT PUBLIC PROFILE
                                </Button>
                            </div>
                        </section>

                        <div className="p-8 rounded-3xl bg-primary text-black shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                            <h3 className="text-lg font-black italic tracking-tighter uppercase mb-2">Withdraw Earnings</h3>
                            <p className="text-sm font-medium mb-6 opacity-80">Available to withdraw: ₹12,800</p>
                            <Button className="w-full rounded-xl bg-black text-white hover:bg-neutral-800 font-bold uppercase tracking-widest">
                                WITHDRAW NOW
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FreelancerDashboard;
