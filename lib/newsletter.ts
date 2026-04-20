import { hasSupabaseConfig, supabase } from "@/lib/supabase";
import type { Locale } from "@/lib/i18n/locales";

export async function subscribeToNewsletter(
  email: string,
  locale: Locale,
): Promise<{ error: string | null }> {
  if (!supabase || !hasSupabaseConfig) {
    return { error: "Supabase is not configured." };
  }

  const { error } = await supabase.from("newsletter_subscribers").insert({
    email: email.trim().toLowerCase(),
    locale,
  });

  // Treat duplicate email as success — don't leak subscriber existence.
  if (error && error.code === "23505") {
    return { error: null };
  }

  return { error: error?.message ?? null };
}
