import { supabase, hasSupabaseConfig } from "@/lib/supabase";

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function submitContactMessage(
  payload: ContactPayload,
): Promise<{ error: string | null }> {
  if (!supabase || !hasSupabaseConfig) {
    return { error: "Supabase is not configured." };
  }

  const { error } = await supabase.from("contact_messages").insert({
    name: payload.name.trim(),
    email: payload.email.trim(),
    subject: payload.subject.trim(),
    message: payload.message.trim(),
  });

  return { error: error?.message ?? null };
}
