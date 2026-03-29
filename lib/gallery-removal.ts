import { supabase, hasSupabaseConfig } from "@/lib/supabase";

export async function requestImageRemoval(
  imageId: string,
  gallerySlug: string,
  userId: string,
): Promise<{ error: string | null }> {
  if (!supabase || !hasSupabaseConfig) {
    return { error: "Supabase is not configured." };
  }

  const { error } = await supabase.from("gallery_removal_requests").insert({
    image_id: imageId,
    gallery_slug: gallerySlug,
    user_id: userId,
  });

  if (error?.code === "23505") {
    return { error: null };
  }

  return { error: error?.message ?? null };
}

export async function getUserRemovalRequests(
  gallerySlug: string,
): Promise<Set<string>> {
  if (!supabase || !hasSupabaseConfig) {
    return new Set();
  }

  const { data } = await supabase
    .from("gallery_removal_requests")
    .select("image_id")
    .eq("gallery_slug", gallerySlug);

  return new Set((data ?? []).map((r) => r.image_id as string));
}
