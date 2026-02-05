import { useState, useEffect } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { motion } from "framer-motion";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("futorajobs-theme");
            return saved ? saved === "dark" : true; // Default to dark for Admin OS
        }
        return true;
    });

    // Sync theme class
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("futorajobs-theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("futorajobs-theme", "light");
        }
    }, [isDark]);

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
            <AdminSidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                isDark={isDark}
                setIsDark={setIsDark}
            />

            <motion.main
                initial={false}
                animate={{
                    marginLeft: collapsed ? 80 : 288,
                }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="min-h-screen p-6 md:p-12"
            >
                <div className="max-w-[1600px] mx-auto">
                    {children}
                </div>
            </motion.main>
        </div>
    );
}
