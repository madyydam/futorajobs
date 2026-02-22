import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRole = async (userId: string) => {
    try {
      // Fetch with a timeout to prevent hanging
      const fetchPromise = supabase
        .from('profiles')
        .select('role, user_role') // Select both to be safe
        .eq('user_id', userId)
        .maybeSingle();

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 5000)
      );

      const result = await Promise.race([fetchPromise, timeoutPromise]);
      const { data, error } = result as {
        data: { role: string | null; user_role: string | null } | null;
        error: unknown
      };

      if (!error && data) {
        setRole(data.role || data.user_role || 'user');
        return true;
      }
      setRole('user');
      return false;
    } catch (err) {
      console.error("Auth: Error resolving identity:", err);
      setRole('user');
      return false;
    }
  };

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchRole(session.user.id);
        } else {
          setRole(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initialize();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (event === 'SIGNED_OUT' || event === 'USER_UPDATED' || !session) {
          setRole(null);
        } else if (session?.user) {
          await fetchRole(session.user.id);
        }

        if (mounted) {
          setLoading(false);
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

  const isAdmin = role === 'super_admin' || role === 'content_admin' || role === 'hiring_admin';

  return { user, session, role, isAdmin, loading, signOut };
};