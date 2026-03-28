/**
 * Override via env for production (e.g. NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL).
 * Defaults are neutral placeholders until real profiles are set.
 */
export const socialLinks = {
  instagram:
    typeof process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL === "string" &&
    process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL
      ? process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL
      : "https://www.instagram.com",
  youtube:
    typeof process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE_URL === "string" &&
    process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE_URL
      ? process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE_URL
      : "https://www.youtube.com",
  tiktok:
    typeof process.env.NEXT_PUBLIC_SOCIAL_TIKTOK_URL === "string" &&
    process.env.NEXT_PUBLIC_SOCIAL_TIKTOK_URL
      ? process.env.NEXT_PUBLIC_SOCIAL_TIKTOK_URL
      : "https://www.tiktok.com",
} as const;
