/**
 * Override via env for production (e.g. NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL).
 * Defaults point to Bearhood Berlin profiles; env wins when set.
 */
function envUrl(key: string, fallback: string): string {
  const v = process.env[key];
  return typeof v === "string" && v.length > 0 ? v : fallback;
}

export const socialLinks = {
  instagram: envUrl(
    "NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL",
    "https://www.instagram.com/bearhoodberlin/",
  ),
  facebook: envUrl(
    "NEXT_PUBLIC_SOCIAL_FACEBOOK_URL",
    "https://www.facebook.com/bearhoodberlin",
  ),
  eventbrite: envUrl(
    "NEXT_PUBLIC_SOCIAL_EVENTBRITE_URL",
    "https://www.eventbrite.de/o/bearhood-berlin-46125221123",
  ),
  // TODO: replace fallback with actual Bearhood RA profile URL once available
  residentAdvisor: envUrl("NEXT_PUBLIC_SOCIAL_RESIDENT_ADVISOR_URL", "https://ra.co"),
} as const;
