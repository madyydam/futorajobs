import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

const ADMIN_ROLES = new Set(["super_admin", "curriculum_admin", "hiring_admin", "support_admin"]);

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Ref-based fetch to avoid stale closure in the auth change listener
  const fetchRole = useRef(async (userId: string): Promise<void> => {
    try {
      const fetchPromise = supabase
        .from("profiles")
        .select("role")
        .eq("user_id", userId)
        .maybeSingle();

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 5000)
      );

      const result = await Promise.race([fetchPromise, timeoutPromise]);
      const { data, error } = result as { data: { role: string | null } | null; error: unknown };

      setRole(!error && data ? (data.role ?? "user") : "user");
    } catch (err) {
      if ((err as Error)?.message !== "Timeout") {
        console.error("Auth: Error resolving identity:", err);
      }
      setRole("user");
    }
  });

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchRole.current(session.user.id);
        } else {
          setRole(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initialize();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (event === "SIGNED_OUT" || !session) {
          setRole(null);
          if (mounted) setLoading(false);
        } else if (session?.user) {
          await fetchRole.current(session.user.id);
          if (mounted) setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setRole(null);
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error("Auth: Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = ADMIN_ROLES.has(role ?? "");

  return { user, session, role, isAdmin, loading, signOut };
};