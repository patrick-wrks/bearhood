"use client";

import { usePathname } from "next/navigation";
import {
  localeFromPathname,
  normalizePathname,
  stripLocalePrefix,
  type Locale,
} from "./locales";

export function useLocale(): Locale {
  const pathname = usePathname();
  return localeFromPathname(pathname);
}

export function useLocalePathSansPrefix(): string {
  const pathname = usePathname();

  // Keep the pathname stable for building links (no locale prefix, no basePath segment).
  // Example: /bearhood/de/ui-foundation -> /ui-foundation
  const normalized = normalizePathname(pathname);
  return stripLocalePrefix(normalized);
}

