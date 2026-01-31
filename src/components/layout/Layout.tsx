import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen animated-bg">
      {/* Noise texture */}
      <div className="noise-overlay" />
      
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <Navbar />
      
      <main className="relative z-10 pt-24 pb-24 md:pb-8">
        {children}
      </main>
    </div>
  );
}
