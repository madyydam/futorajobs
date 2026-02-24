import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import {
    Zap,
    Briefcase,
    IndianRupee,
    Star,
    Settings,
    Bell,
    ChevronRight,
    Plus,
    Clock,
    CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFreelance } from "@/hooks/useFreelance";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const FreelancerDashboard = () => {
    const { services, freelancerProfile } = useFreelance();

    const myServices = services.data?.filter(s => s.freelancer_id === freelancerProfile.data?.id) || [];

    const stats = [
        { label: "Active My Gigs", value: myServices.length.toString(), icon: Briefcase, color: "text-blue-500" },
        { label: "Total Earnings", value: "₹0", icon: IndianRupee, color: "text-primary" },
        { label: "Rating", value: "N/A", icon: Star, color: "text-yellow-500" },
    ];

    return (
        <Layout>
            <div className="max-w-7xl mx-auto py-12 px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic uppercase mb-2">
                            MISSION <span className="text-primary/40">CONTROL</span>
                        </h1>
                        <p className="text-muted-foreground font-medium flex items-center gap-2 italic uppercase tracking-widest text-[10px]">
                            Freelancer Dashboard <ChevronRight className="h-4 w-4" /> {freelancerProfile.data?.full_name || "Agent"}
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
                            className="p-8 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group hover:border-primary/40 transition-all shadow-xl"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <stat.icon className="h-24 w-24" />
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                                <div className={`h-2 w-2 rounded-full ${stat.color} animate-pulse`}></div>
                                {stat.label}
                            </div>
                            <div className="text-4xl font-black text-white italic tracking-tighter">{stat.value}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Tabs defaultValue="gigs" className="w-full">
                            <TabsList className="bg-white/5 border border-white/10 rounded-2xl p-1 mb-8">
                                <TabsTrigger value="orders" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-black transition-all">ACTIVE ORDERS</TabsTrigger>
                                <TabsTrigger value="gigs" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-black transition-all">MY GIGS</TabsTrigger>
                            </TabsList>

                            <TabsContent value="orders" className="space-y-4">
                                <div className="p-16 text-center rounded-3xl border-2 border-dashed border-white/10 bg-white/5">
                                    <Clock className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                                    <p className="text-white font-bold italic uppercase tracking-tighter">No active orders yet.</p>
                                    <p className="text-muted-foreground text-sm mt-2">Promote your gigs to get your first order!</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="gigs" className="space-y-6">
                                {services.isLoading ? (
                                    <Skeleton className="h-[200px] w-full rounded-2xl bg-white/5" />
                                ) : myServices.length > 0 ? (
                                    myServices.map((service) => (
                                        <div key={service.id} className="p-6 rounded-2xl bg-[#0D111C] border border-white/5 flex items-center justify-between group hover:border-primary/30 transition-all shadow-lg">
                                            <div className="flex items-center gap-6">
                                                <div className="h-16 w-24 rounded-xl bg-white/5 overflow-hidden border border-white/10">
                                                    {service.portfolio_urls?.[0] ? (
                                                        <img src={service.portfolio_urls[0]} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-primary/20 font-black">GIG</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-lg font-black text-white mb-1 uppercase tracking-tighter italic">{service.title}</div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-xs font-bold text-primary">₹{service.price}</div>
                                                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{service.category?.name || "General"}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                                <Button variant="outline" size="sm" className="rounded-lg border-white/10 bg-white/5 h-9 font-bold px-4 hover:bg-white/10">EDIT</Button>
                                                <Button variant="outline" size="sm" className="rounded-lg border-white/10 bg-red-500/10 text-red-500 h-9 font-bold px-4 hover:bg-red-500/20">DELETE</Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-16 text-center rounded-3xl border-2 border-dashed border-white/10">
                                        <Briefcase className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                                        <p className="text-white font-bold italic uppercase tracking-tighter">You haven't posted any gigs yet.</p>
                                        <Button asChild variant="link" className="text-primary font-black mt-2">
                                            <Link to="/freelancing/create">CREATE YOUR FIRST GIG</Link>
                                        </Button>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <section className="p-8 rounded-[2rem] bg-[#0D111C] border border-white/5 shadow-2xl">
                            <h3 className="text-sm font-black italic uppercase tracking-[0.2em] text-primary/60 mb-8 flex items-center gap-2">
                                <div className="h-4 w-1 bg-primary rounded-full" />
                                Profile Matrix
                            </h3>

                            <div className="flex items-center gap-4 mb-8">
                                <Avatar className="h-16 w-16 border-2 border-primary/20 shadow-xl">
                                    <AvatarImage src={freelancerProfile.data?.avatar_url} />
                                    <AvatarFallback className="bg-slate-800 text-xl font-black">{freelancerProfile.data?.full_name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="text-xl font-black text-white italic uppercase tracking-tighter">{freelancerProfile.data?.full_name || "Elite Agent"}</div>
                                    <div className="text-[10px] font-black text-primary uppercase tracking-widest">{freelancerProfile.data?.tagline || "Verified Pro"}</div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between mb-2 text-[10px] font-bold uppercase tracking-widest">
                                        <span className="text-muted-foreground">Response Power</span>
                                        <span className="text-primary">95%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <div className="h-full w-[95%] bg-gradient-to-r from-primary to-blue-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-5 rounded-2xl bg-black/40 border border-white/5 text-center shadow-inner">
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Status</div>
                                        <div className="text-lg font-black text-white italic uppercase tracking-tighter">ELITE</div>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-black/40 border border-white/5 text-center shadow-inner">
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Verified</div>
                                        <div className="flex justify-center">
                                            <CheckCircle className="h-6 w-6 text-primary fill-primary/10" />
                                        </div>
                                    </div>
                                </div>

                                <Button variant="outline" className="w-full rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 h-14 font-black italic tracking-tighter uppercase text-xs">
                                    <Settings className="h-4 w-4 mr-3" />
                                    RECONFIGURE PROFILE
                                </Button>
                            </div>
                        </section>

                        <div className="p-8 rounded-[2rem] bg-primary text-black shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                                <IndianRupee className="h-24 w-24" />
                            </div>
                            <h3 className="text-lg font-black italic tracking-tighter uppercase mb-2">Liquid Cash</h3>
                            <p className="text-sm font-medium mb-6 opacity-80">Accumulated for withdrawal: <span className="font-black">₹0</span></p>
                            <Button className="w-full rounded-2xl bg-black text-white hover:bg-neutral-900 h-14 font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl active:scale-95 transition-all">
                                WITHDRAWAL_REQ
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FreelancerDashboard;
