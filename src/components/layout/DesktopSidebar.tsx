import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Briefcase, 
  GraduationCap, 
  PlusCircle, 
  User,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/jobs", label: "Jobs", icon: Briefcase },
  { path: "/internships", label: "Internships", icon: GraduationCap },
  { path: "/post", label: "Post", icon: PlusCircle },
  { path: "/profile", label: "Profile", icon: User },
];

interface DesktopSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

export function DesktopSidebar({ collapsed, setCollapsed, isDark, setIsDark }: DesktopSidebarProps) {
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="hidden md:flex fixed left-0 top-0 h-screen flex-col bg-sidebar border-r border-sidebar-border z-50"
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border h-16">
        <Link to="/" className="flex items-center gap-2 overflow-hidden">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-primary-foreground">F</span>
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-semibold text-foreground whitespace-nowrap"
            >
              Futora<span className="text-primary">Jobs</span>
            </motion.span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "sidebar-link",
                isActive && "active"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-sidebar-border space-y-2">
        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="sidebar-link w-full"
        >
          {isDark ? (
            <Sun className="h-5 w-5 shrink-0" />
          ) : (
            <Moon className="h-5 w-5 shrink-0" />
          )}
          {!collapsed && (
            <span className="whitespace-nowrap">
              {isDark ? "Light Mode" : "Dark Mode"}
            </span>
          )}
        </button>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="sidebar-link w-full"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5 shrink-0" />
          ) : (
            <ChevronLeft className="h-5 w-5 shrink-0" />
          )}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </motion.aside>
  );
}
