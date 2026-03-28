"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth-context";
import { AuthModalProvider } from "@/lib/auth-modal-context";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AuthModalProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </AuthModalProvider>
    </AuthProvider>
  );
}
