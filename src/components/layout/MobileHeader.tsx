import { Link } from "react-router-dom";
import { Moon, Sun, LogOut, MessageSquare, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

interface MobileHeaderProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

export function MobileHeader({ isDark, setIsDark }: MobileHeaderProps) {
  const { user, signOut } = useAuth();

  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 md:hidden bg-card border-b border-border h-16"
    >
      <div className="flex items-center justify-between px-4 h-full">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">C</span>
          </div>
          <span className="text-lg font-semibold text-foreground">
            <span className="text-primary">Career</span> OS
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to="/community"
            className="p-2 rounded-lg hover:bg-accent transition-colors text-foreground"
          >
            <Globe className="h-5 w-5" />
          </Link>

          <Link
            to="/chat"
            className="p-2 rounded-lg hover:bg-accent transition-colors text-foreground"
          >
            <MessageSquare className="h-5 w-5" />
          </Link>

          {user && (
            <button
              onClick={() => signOut()}
              className="p-2 rounded-lg hover:bg-accent transition-colors text-destructive"
            >
              <LogOut className="h-5 w-5" />
            </button>
          )}

          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-foreground" />
            ) : (
              <Moon className="h-5 w-5 text-foreground" />
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
