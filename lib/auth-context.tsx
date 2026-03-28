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
  /** True after a password-recovery email link is clicked. Modal listens to open reset form. */
  passwordRecovery: boolean;
  clearPasswordRecovery: () => void;
  signOut: () => Promise<{ error: string | null }>;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [passwordRecovery, setPasswordRecovery] = useState(false);
  const authConfigured = isAuthAvailable();

  const clearPasswordRecovery = useCallback(() => setPasswordRecovery(false), []);

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

    const { unsubscribe } = onAuthStateChange((event, nextSession) => {
      if (event === "PASSWORD_RECOVERY") {
        setPasswordRecovery(true);
        setSession(nextSession);
        setUser(nextSession?.user ?? null);
        setLoading(false);
      } else {
        if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
          setPasswordRecovery(false);
        }
        setSession(nextSession);
        setUser(nextSession?.user ?? null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [authConfigured]);

  const signOut = useCallback(async () => {
    const result = await signOutUser();
    setUser(null);
    setSession(null);
    setPasswordRecovery(false);
    return result;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      authConfigured,
      passwordRecovery,
      clearPasswordRecovery,
      signOut,
      refreshSession,
    }),
    [user, session, loading, authConfigured, passwordRecovery, clearPasswordRecovery, signOut, refreshSession],
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
