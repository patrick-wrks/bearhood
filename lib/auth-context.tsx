"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import {
  getSession,
  isAuthAvailable,
  onAuthStateChange,
  signOut as signOutUser,
} from "@/lib/supabase-auth";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  authConfigured: boolean;
  signOut: () => Promise<{ error: string | null }>;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const authConfigured = isAuthAvailable();

  const refreshSession = useCallback(async () => {
    if (!authConfigured) {
      setUser(null);
      setSession(null);
      setLoading(false);
      return;
    }

    const next = await getSession();
    setSession(next);
    setUser(next?.user ?? null);
    setLoading(false);
  }, [authConfigured]);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      await Promise.resolve();
      if (cancelled) return;

      if (!authConfigured) {
        setUser(null);
        setSession(null);
        setLoading(false);
        return;
      }

      const next = await getSession();
      if (cancelled) return;
      setSession(next);
      setUser(next?.user ?? null);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [authConfigured]);

  useEffect(() => {
    if (!authConfigured) {
      return;
    }

    const { unsubscribe } = onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setLoading(false);
    });

    return unsubscribe;
  }, [authConfigured]);

  const signOut = useCallback(async () => {
    const result = await signOutUser();
    setUser(null);
    setSession(null);
    return result;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      authConfigured,
      signOut,
      refreshSession,
    }),
    [user, session, loading, authConfigured, signOut, refreshSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
