import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { ShieldCheck, Activity, Lock, ArrowRight, Loader2, User, Key, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const AdminLogin = () => {
    const navigate = useNavigate();
    const { isAdmin, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVerified, setIsVerified] = useState(false);

    // Early redirect if already logged in as admin
    useEffect(() => {
        if (!authLoading && isAdmin) {
            navigate("/admin");
        }
    }, [isAdmin, authLoading, navigate]);

    // Real-time Admin Identity Scanning
    useEffect(() => {
        const checkAdminIdentity = async () => {
            if (email.length < 5 || !email.includes('@')) {
                setIsVerified(false);
                return;
            }

            const { data, error } = await supabase
                .from('profiles')
                .select('role')
                .eq('email', email)
                .single();

            if (!error && data && ['super_admin', 'content_admin', 'hiring_admin'].includes(data.role)) {
                setIsVerified(true);
            } else {
                setIsVerified(false);
            }
        };

        const timer = setTimeout(checkAdminIdentity, 500);
        return () => clearTimeout(timer);
    }, [email]);

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (authError) {
            toast.error(authError.message);
            setLoading(false);
            return;
        }

        // Double check role after auth
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('user_id', authData.user.id)
            .single();

        if (!profile || !['super_admin', 'content_admin', 'hiring_admin'].includes(profile.role)) {
            toast.error("Unauthorized. Admin access revoked for this session.");
            await supabase.auth.signOut();
            setLoading(false);
            return;
        }

        toast.success("Gate Verified. Entering Mission Control.");
        navigate("/admin");
    };

    return (
        <motion.div
            animate={{
                backgroundColor: isVerified ? "rgb(2, 44, 34)" : "rgb(10, 10, 10)",
                transition: { duration: 0.8 }
            }}
            className="min-h-screen flex flex-col items-center justify-center p-6 text-white overflow-hidden relative"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            <div className={isVerified ? "absolute inset-0 bg-[linear-gradient(to_right,#10b98112_1px,transparent_1px),linear-gradient(to_bottom,#10b98112_1px,transparent_1px)] bg-[size:24px_24px]" : "absolute inset-0 bg-[linear-gradient(to_right,#ef444412_1px,transparent_1px),linear-gradient(to_bottom,#ef444412_1px,transparent_1px)] bg-[size:24px_24px]"}></div>

            {/* Glowing Orbs */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] blur-[120px] rounded-full transition-all duration-1000 ${isVerified ? 'bg-emerald-500/20' : 'bg-red-500/10'}`}></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Branding */}
                <div className="flex flex-col items-center mb-10">
                    <motion.div
                        animate={{
                            backgroundColor: isVerified ? "rgb(16, 185, 129)" : "rgb(50, 50, 50)",
                            boxShadow: isVerified ? "0 0 50px rgba(16, 185, 129, 0.4)" : "0 0 20px rgba(0,0,0,0.5)"
                        }}
                        className="h-20 w-20 rounded-2xl flex items-center justify-center mb-6"
                    >
                        {isVerified ? (
                            <ShieldCheck className="h-12 w-12 text-black" />
                        ) : (
                            <ShieldAlert className="h-12 w-12 text-white/50" />
                        )}
                    </motion.div>
                    <h1 className="text-3xl font-black tracking-tighter italic">FUTORA <span className={isVerified ? "text-emerald-500" : "text-white/40"}>OS</span></h1>
                    <p className="text-neutral-500 mt-2 text-[10px] uppercase font-bold tracking-[0.4em]">System Governance Interface</p>
                </div>

                {/* Login Form */}
                <form
                    onSubmit={handleAdminLogin}
                    className={`border p-8 rounded-3xl shadow-2xl relative overflow-hidden transition-all duration-700 backdrop-blur-xl ${isVerified ? 'border-emerald-500/50 bg-neutral-900/80' : 'border-white/10 bg-neutral-900/60'}`}
                >
                    <div className="absolute top-0 right-0 p-6 opacity-20">
                        {isVerified ? <Lock className="h-5 w-5 text-emerald-500" /> : <Lock className="h-5 w-5" />}
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Identity Identifier</Label>
                            <div className="relative group">
                                <User className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${isVerified ? 'text-emerald-500' : 'text-neutral-500'}`} />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@futora.network"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`pl-10 h-12 bg-black/50 border-white/5 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all ${isVerified ? 'border-emerald-500/30' : ''}`}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Access Key</Label>
                            <div className="relative group">
                                <Key className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${isVerified ? 'text-emerald-500' : 'text-neutral-500'}`} />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`pl-10 h-12 bg-black/50 border-white/5 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all ${isVerified ? 'border-emerald-500/30' : ''}`}
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading || !isVerified}
                            className={`w-full h-14 text-sm font-black uppercase tracking-[0.2em] transition-all duration-500 ${isVerified ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'bg-neutral-800 text-white/30 cursor-not-allowed'}`}
                        >
                            {loading ? (
                                <Loader2 className="h-6 w-6 animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    {isVerified ? "ACCESS SYSTEM" : "WAITING FOR IDENTITY"}
                                    <ArrowRight className="h-5 w-5" />
                                </span>
                            )}
                        </Button>
                    </div>
                </form>

                <div className="mt-8 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2 opacity-30">
                        <div className={`h-1.5 w-1.5 rounded-full ${isVerified ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-500'}`}></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Verifying Identity</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-30">
                        <div className={`h-1.5 w-1.5 rounded-full ${isVerified ? 'bg-emerald-500' : 'bg-neutral-500'}`}></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Encrypted Tunnel</span>
                    </div>
                </div>
            </motion.div>

            {/* Matrix Decoration */}
            <AnimatePresence>
                {isVerified && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 pointer-events-none z-0"
                    >
                        <div className="absolute top-0 right-10 bottom-0 w-px bg-emerald-500/20"></div>
                        <div className="absolute top-0 left-10 bottom-0 w-px bg-emerald-500/20"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute bottom-8 left-8 flex items-center gap-3 opacity-20">
                <div className={`h-2 w-2 rounded-full ${isVerified ? 'bg-emerald-500 animate-pulse outline outline-offset-4 outline-emerald-500/30' : 'bg-red-500'}`}></div>
                <span className="text-[9px] font-mono tracking-widest uppercase italic">Secured by Futora Shield v4.0.2</span>
            </div>
        </motion.div>
    );
};

export default AdminLogin;
