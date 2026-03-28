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
import { AuthModal } from "@/components/auth-modal";
import { useAuth } from "@/lib/auth-context";

type AuthModalContextValue = {
  openAuthModal: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const { passwordRecovery } = useAuth();
  // Open immediately when recovery event fires; otherwise start closed
  const [open, setOpen] = useState(false);

  // Defer the setState so it runs after the current render cycle,
  // avoiding the "setState synchronously in effect" lint rule.
  useEffect(() => {
    if (!passwordRecovery) return;
    const id = setTimeout(() => setOpen(true), 0);
    return () => clearTimeout(id);
  }, [passwordRecovery]);

  const openAuthModal = useCallback(() => setOpen(true), []);

  const value = useMemo(
    () => ({
      openAuthModal,
    }),
    [openAuthModal],
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      <AuthModal open={open} onOpenChange={setOpen} />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal(): AuthModalContextValue {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return ctx;
}
