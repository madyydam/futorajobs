import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PlayCircle, Briefcase, User, GraduationCap, Zap } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", label: "Skills", icon: PlayCircle },
  { path: "/internships", label: "Internships", icon: GraduationCap },
  { path: "/jobs", label: "Jobs", icon: Briefcase },
  { path: "/freelancing", label: "Freelancing", icon: Zap },
  { path: "/profile", label: "Profile", icon: User },
];

export function MobileBottomNav() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border safe-area-inset-bottom"
    >
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[56px]",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <div className="relative">
                <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute -inset-2 bg-primary/10 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
