import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Briefcase, User, PlusCircle, Home } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/jobs", label: "Jobs", icon: Briefcase },
  { path: "/post-job", label: "Post Job", icon: PlusCircle },
  { path: "/profile", label: "Profile", icon: User },
];

export function Navbar() {
  const location = useLocation();

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 hidden md:block"
      >
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="glass-card flex items-center justify-between px-6 py-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">F</span>
              </div>
              <span className="text-lg font-semibold text-foreground">
                Futora<span className="gradient-text">Jobs</span>
              </span>
            </Link>

            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 rounded-lg bg-primary/10 -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Nav */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-4"
      >
        <div className="glass-card flex items-center justify-around py-3 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "drop-shadow-[0_0_8px_hsl(185,80%,50%)]")} />
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="mobile-indicator"
                    className="absolute inset-0 rounded-xl bg-primary/10 -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
