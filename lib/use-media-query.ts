"use client";

import { useSyncExternalStore } from "react";

/**
 * Matches Tailwind `md` (768px). SSR default: false (mobile-first).
 */
export function useIsDesktop(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(min-width: 768px)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(min-width: 768px)").matches,
    () => false,
  );
}
