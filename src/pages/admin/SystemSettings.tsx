import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Settings, Shield, Zap, Database, Activity, RefreshCw, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const SystemSettings = () => {
    const queryClient = useQueryClient();
    const [localConfig, setLocalConfig] = useState({
        maintenance_mode: false,
        ai_engine_enabled: true,
        rls_monitoring_enabled: true,
        global_search_enabled: true
    });

    // Fetch Settings
    const { data: settings, isLoading } = useQuery({
        queryKey: ['admin-settings'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('admin_settings')
                .select('*')
                .limit(1)
                .single();

            if (error) {
                // If table doesn't exist yet or is empty, return default
                if (error.code === 'PGRST116' || error.message?.includes('does not exist')) {
                    return null;
                }
                throw error;
            }
            return data;
        }
    });

    // Update local state when data loads
    useEffect(() => {
        if (settings) {
            setLocalConfig({
                maintenance_mode: settings.maintenance_mode,
                ai_engine_enabled: settings.ai_engine_enabled,
                rls_monitoring_enabled: settings.rls_monitoring_enabled,
                global_search_enabled: settings.global_search_enabled
            });
        }
    }, [settings]);

    const updateMutation = useMutation({
        mutationFn: async (newConfig: typeof localConfig) => {
            // Check if row exists, handling the case where settings might be null initially
            if (settings?.id) {
                const { error } = await supabase
                    .from('admin_settings')
                    .update(newConfig)
                    .eq('id', settings.id);
                if (error) throw error;
            } else {
                // Create if missing
                const { error } = await supabase
                    .from('admin_settings')
                    .insert([newConfig]);
                if (error) throw error;
            }
        },
        onSuccess: () => {
            toast.success("System Configuration Updated");
            queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
        },
        onError: () => {
            toast.error("Failed to commit changes. Database migration may be missing.");
        }
    });

    const handleToggle = (key: keyof typeof localConfig) => {
        setLocalConfig(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleCommit = () => {
        updateMutation.mutate(localConfig);
    };

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-[calc(100vh-100px)]">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 text-primary uppercase text-[10px] font-black tracking-[0.4em] mb-3">
                            <Settings className="h-4 w-4" />
                            Kernel Configuration
                        </div>
                        <h1 className="text-4xl font-black text-foreground tracking-tighter italic uppercase">System <span className="text-primary/40 dark:text-primary/60">Settings</span></h1>
                        <p className="text-muted-foreground mt-3 font-medium text-sm">Fine-tune the platform's core logic and security parameters.</p>
                    </div>

                    <button
                        onClick={handleCommit}
                        disabled={updateMutation.isPending}
                        className="h-14 px-8 rounded-2xl bg-primary text-black transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {updateMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        COMMIT CHANGES
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Security Vector */}
                    <div className="p-8 rounded-[2rem] bg-card border border-border backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/10">
                                <Shield className="h-5 w-5" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground tracking-tight">Security Protocol</h3>
                        </div>

                        <div className="space-y-4">
                            {[
                                { id: 'maintenance_mode', label: 'Maintenance Mode', icon: Zap, desc: 'Redirect all non-admin traffic to static holding page.' },
                                { id: 'rls_monitoring_enabled', label: 'Real-time RLS Audit', icon: Shield, desc: 'Stream database security violations to admin logs.' }
                            ].map((item) => (
                                <div key={item.id} className="p-6 rounded-2xl bg-muted/30 border border-border flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                        <div>
                                            <div className="text-sm font-bold text-foreground">{item.label}</div>
                                            <div className="text-[10px] text-muted-foreground font-medium">{item.desc}</div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleToggle(item.id as keyof typeof localConfig)}
                                        className={cn(
                                            "w-12 h-6 rounded-full relative transition-all duration-300",
                                            localConfig[item.id as keyof typeof localConfig] ? "bg-primary" : "bg-muted"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300",
                                            localConfig[item.id as keyof typeof localConfig] ? "left-7" : "left-1"
                                        )} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Intelligence Vector */}
                    <div className="p-8 rounded-[2rem] bg-card border border-border backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/10">
                                <Activity className="h-5 w-5" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground tracking-tight">Intelligence Engine</h3>
                        </div>

                        <div className="space-y-4">
                            {[
                                { id: 'ai_engine_enabled', label: 'AI Readiness Analysis', icon: RefreshCw, desc: 'Auto-calculate competency scores on every event.' },
                                { id: 'global_search_enabled', label: 'Semantic Search Hub', icon: Database, desc: 'Enable vector-based global search across the platform.' }
                            ].map((item) => (
                                <div key={item.id} className="p-6 rounded-2xl bg-muted/30 border border-border flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                        <div>
                                            <div className="text-sm font-bold text-foreground">{item.label}</div>
                                            <div className="text-[10px] text-muted-foreground font-medium">{item.desc}</div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleToggle(item.id as keyof typeof localConfig)}
                                        className={cn(
                                            "w-12 h-6 rounded-full relative transition-all duration-300",
                                            localConfig[item.id as keyof typeof localConfig] ? "bg-primary" : "bg-muted"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300",
                                            localConfig[item.id as keyof typeof localConfig] ? "left-7" : "left-1"
                                        )} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AdminLayout>
    );
};

export default SystemSettings;
