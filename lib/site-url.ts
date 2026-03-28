/**
 * Returns the public root URL of the app for use in auth email redirects.
 *
 * Priority:
 *  1. NEXT_PUBLIC_SITE_URL env var (set in .env.local and GitHub Actions secrets)
 *  2. Inferred from the browser's current location at runtime
 *
 * For GitHub Pages the correct value is:
 *   https://<username>.github.io/<reponame>
 * e.g. https://patrick-wrks.github.io/bearhood
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    // In dev/local: just use the origin (e.g. http://localhost:3000)
    // Works for standard single-origin local dev. If basePath is set in
    // next.config.ts for production but not locally this is correct.
    return window.location.origin;
  }

  return "";
}
