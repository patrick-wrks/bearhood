export type Locale = "en" | "de";

export const SUPPORTED_LOCALES: Locale[] = ["en", "de"];
export const DEFAULT_LOCALE: Locale = "en";

const BASE_PATH_SEGMENT = "bearhood";

export function normalizePathname(pathname: string): string {
  const basePrefix = `/${BASE_PATH_SEGMENT}`;

  if (pathname === basePrefix) return "/";
  if (pathname.startsWith(`${basePrefix}/`)) return pathname.slice(basePrefix.length);

  return pathname;
}

export function localeFromPathname(pathname: string): Locale {
  const normalized = normalizePathname(pathname);

  if (normalized.startsWith("/de")) return "de";
  if (normalized.startsWith("/en")) return "en";

  return DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname: string): string {
  const normalized = normalizePathname(pathname);

  return normalized.replace(/^\/(en|de)(?=\/|$)/, "") || "/";
}

