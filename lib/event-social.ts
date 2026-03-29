import { hasSupabaseConfig, supabase } from "@/lib/supabase";
import type { EventComment, EventSocialCounts } from "@/lib/types";

const demoSocialCounts: Record<string, EventSocialCounts> = {
  "naughty-club-edition": { likes: 34, comments: 8, interested: 19 },
  bearoke: { likes: 72, comments: 15, interested: 48 },
};

export function getDemoSocialCounts(eventId: string): EventSocialCounts {
  return demoSocialCounts[eventId] ?? { likes: 0, comments: 0, interested: 0 };
}

const demoComments: Record<string, EventComment[]> = {
  bearoke: [
    {
      id: "demo-1",
      userId: "demo-user-1",
      eventId: "bearoke",
      content: "Can't wait for this one! Last time was amazing.",
      createdAt: "2026-03-25T14:30:00Z",
      profile: { username: "BearMike", avatarUrl: null },
    },
    {
      id: "demo-2",
      userId: "demo-user-2",
      eventId: "bearoke",
      content: "Who's coming? Let's meet up before the show!",
      createdAt: "2026-03-26T09:15:00Z",
      profile: { username: "DJ_Marco", avatarUrl: null },
    },
  ],
};

// ---------------------------------------------------------------------------
// Likes
// ---------------------------------------------------------------------------

export async function getBulkEventSocialCounts(
  eventIds: string[],
): Promise<Record<string, EventSocialCounts>> {
  const result: Record<string, EventSocialCounts> = {};
  for (const id of eventIds) {
    result[id] = { likes: 0, comments: 0, interested: 0 };
  }

  if (!hasSupabaseConfig || !supabase || eventIds.length === 0) {
    for (const id of eventIds) {
      result[id] = getDemoSocialCounts(id);
    }
    return result;
  }

  const [likesRes, commentsRes, bookmarksRes] = await Promise.all([
    supabase.from("event_likes").select("event_id").in("event_id", eventIds),
    supabase
      .from("event_comments")
      .select("event_id")
      .in("event_id", eventIds),
    supabase
      .from("event_bookmarks")
      .select("event_id")
      .in("event_id", eventIds),
  ]);

  if (likesRes.data) {
    for (const row of likesRes.data as { event_id: string }[]) {
      const bucket = result[row.event_id];
      if (bucket) bucket.likes += 1;
    }
  }

  if (commentsRes.data) {
    for (const row of commentsRes.data as { event_id: string }[]) {
      const bucket = result[row.event_id];
      if (bucket) bucket.comments += 1;
    }
  }

  if (bookmarksRes.data) {
    for (const row of bookmarksRes.data as { event_id: string }[]) {
      const bucket = result[row.event_id];
      if (bucket) bucket.interested += 1;
    }
  }

  return result;
}

export async function getUserLikedEventIds(
  userId: string,
  eventIds: string[],
): Promise<Set<string>> {
  if (!hasSupabaseConfig || !supabase || eventIds.length === 0) {
    return new Set();
  }

  const { data, error } = await supabase
    .from("event_likes")
    .select("event_id")
    .eq("user_id", userId)
    .in("event_id", eventIds);

  if (error || !data) return new Set();
  return new Set((data as { event_id: string }[]).map((r) => r.event_id));
}

export async function getUserBookmarkedEventIds(
  userId: string,
  eventIds: string[],
): Promise<Set<string>> {
  if (!hasSupabaseConfig || !supabase || eventIds.length === 0) {
    return new Set();
  }

  const { data, error } = await supabase
    .from("event_bookmarks")
    .select("event_id")
    .eq("user_id", userId)
    .in("event_id", eventIds);

  if (error || !data) return new Set();
  return new Set((data as { event_id: string }[]).map((r) => r.event_id));
}

export async function toggleEventLike(
  userId: string,
  eventId: string,
  currentlyLiked: boolean,
): Promise<{ error: string | null }> {
  if (!hasSupabaseConfig || !supabase) {
    return { error: "Supabase is not configured." };
  }

  if (currentlyLiked) {
    const { error } = await supabase
      .from("event_likes")
      .delete()
      .eq("user_id", userId)
      .eq("event_id", eventId);
    return { error: error?.message ?? null };
  }

  const { error } = await supabase
    .from("event_likes")
    .upsert({ user_id: userId, event_id: eventId }, { onConflict: "user_id,event_id" });
  return { error: error?.message ?? null };
}

export async function toggleEventBookmark(
  userId: string,
  eventId: string,
  currentlyBookmarked: boolean,
): Promise<{ error: string | null }> {
  if (!hasSupabaseConfig || !supabase) {
    return { error: "Supabase is not configured." };
  }

  if (currentlyBookmarked) {
    const { error } = await supabase
      .from("event_bookmarks")
      .delete()
      .eq("user_id", userId)
      .eq("event_id", eventId);
    return { error: error?.message ?? null };
  }

  const { error } = await supabase
    .from("event_bookmarks")
    .upsert({ user_id: userId, event_id: eventId }, { onConflict: "user_id,event_id" });
  return { error: error?.message ?? null };
}

// ---------------------------------------------------------------------------
// Comments
// ---------------------------------------------------------------------------

export async function getEventComments(
  eventId: string,
): Promise<EventComment[]> {
  if (!hasSupabaseConfig || !supabase) {
    return demoComments[eventId] ?? [];
  }

  const { data, error } = await supabase
    .from("event_comments")
    .select("id, user_id, event_id, content, created_at, profiles(username, avatar_url)")
    .eq("event_id", eventId)
    .order("created_at", { ascending: true });

  if (error || !data) {
    return demoComments[eventId] ?? [];
  }

  type CommentRow = {
    id: string;
    user_id: string;
    event_id: string;
    content: string;
    created_at: string;
    profiles: { username: string | null; avatar_url: string | null }[] | { username: string | null; avatar_url: string | null } | null;
  };

  return (data as unknown as CommentRow[]).map((row) => {
    const p = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles;
    return {
      id: row.id,
      userId: row.user_id,
      eventId: row.event_id,
      content: row.content,
      createdAt: row.created_at,
      profile: p
        ? { username: p.username, avatarUrl: p.avatar_url }
        : undefined,
    };
  });
}

export async function addEventComment(
  userId: string,
  eventId: string,
  content: string,
): Promise<{ error: string | null }> {
  if (!hasSupabaseConfig || !supabase) {
    return { error: "Supabase is not configured." };
  }

  const trimmed = content.trim();
  if (!trimmed || trimmed.length > 500) {
    return { error: "Comment must be between 1 and 500 characters." };
  }

  const { error } = await supabase
    .from("event_comments")
    .insert({ user_id: userId, event_id: eventId, content: trimmed });

  return { error: error?.message ?? null };
}
