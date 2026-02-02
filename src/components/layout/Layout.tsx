import { useState, useEffect } from "react";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { MobileHeader } from "./MobileHeader";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Apply theme class to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <DesktopSidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      {/* Mobile Header */}
      <MobileHeader isDark={isDark} setIsDark={setIsDark} />

      {/* Mobile Bottom Nav */}
      <MobileBottomNav />

      {/* Main Content */}
      <motion.main
        initial={false}
        animate={{
          marginLeft: typeof window !== "undefined" && window.innerWidth >= 768 
            ? (sidebarCollapsed ? 80 : 256) 
            : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="min-h-screen pt-16 pb-20 md:pt-0 md:pb-0"
        style={{
          marginLeft: typeof window !== "undefined" && window.innerWidth >= 768 
            ? (sidebarCollapsed ? 80 : 256) 
            : 0,
        }}
      >
        <div className="p-4 md:p-8">
          {children}
        </div>
      </motion.main>
    </div>
  );
}
