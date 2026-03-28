"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AuthModal } from "@/components/auth-modal";

type AuthModalContextValue = {
  openAuthModal: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

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
