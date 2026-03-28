import { supabase, hasSupabaseConfig } from "@/lib/supabase";

export type Profile = {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
};

export async function getProfile(userId: string): Promise<Profile | null> {
  if (!supabase || !hasSupabaseConfig) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, avatar_url, created_at")
    .eq("id", userId)
    .single();

  if (error || !data) return null;
  return data as Profile;
}

export async function updateProfile(
  userId: string,
  updates: { username?: string; avatar_url?: string | null },
): Promise<{ error: string | null }> {
  if (!supabase || !hasSupabaseConfig) {
    return { error: "Supabase is not configured." };
  }

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId);

  return { error: error?.message ?? null };
}

const AVATAR_BUCKET = "avatars";

export async function uploadAvatar(
  userId: string,
  file: File,
): Promise<{ url: string | null; error: string | null }> {
  if (!supabase || !hasSupabaseConfig) {
    return { url: null, error: "Supabase is not configured." };
  }

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${userId}/avatar.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type });

  if (uploadError) {
    return { url: null, error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path);

  const urlWithCacheBust = `${publicUrl}?t=${Date.now()}`;

  return { url: urlWithCacheBust, error: null };
}

export async function removeAvatar(
  userId: string,
): Promise<{ error: string | null }> {
  if (!supabase || !hasSupabaseConfig) {
    return { error: "Supabase is not configured." };
  }

  const { data: files } = await supabase.storage
    .from(AVATAR_BUCKET)
    .list(userId);

  if (files && files.length > 0) {
    const paths = files.map((f) => `${userId}/${f.name}`);
    const { error } = await supabase.storage
      .from(AVATAR_BUCKET)
      .remove(paths);
    if (error) return { error: error.message };
  }

  return { error: null };
}
