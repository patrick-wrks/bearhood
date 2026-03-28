import { hasSupabaseConfig, supabase } from "@/lib/supabase";
import type { EventResponseCounts, ResponseStatus } from "@/lib/types";

/** In-memory demo counts when Supabase is unavailable (static demo only). */
const demoCounts: Record<string, EventResponseCounts> = {
  "naughty-club-edition": { interested: 24, attending: 11 },
  bearoke: { interested: 56, attending: 31 },
};

export function getDemoResponseCounts(eventId: string): EventResponseCounts {
  return demoCounts[eventId] ?? { interested: 0, attending: 0 };
}

/**
 * Fetch response counts for many events in one query (client-side aggregate).
 */
export async function getBulkEventResponseCounts(
  eventIds: string[],
): Promise<Record<string, EventResponseCounts>> {
  const initial: Record<string, EventResponseCounts> = {};
  for (const id of eventIds) {
    initial[id] = { interested: 0, attending: 0 };
  }

  if (!hasSupabaseConfig || !supabase || eventIds.length === 0) {
    for (const id of eventIds) {
      initial[id] = getDemoResponseCounts(id);
    }
    return initial;
  }

  const { data, error } = await supabase
    .from("event_responses")
    .select("event_id, status")
    .in("event_id", eventIds);

  if (error || !data) {
    for (const id of eventIds) {
      initial[id] = getDemoResponseCounts(id);
    }
    return initial;
  }

  for (const row of data as { event_id: string; status: string }[]) {
    const bucket = initial[row.event_id];
    if (!bucket) continue;
    if (row.status === "interested") bucket.interested += 1;
    if (row.status === "attending") bucket.attending += 1;
  }

  return initial;
}

export async function getUserEventResponse(
  userId: string,
  eventId: string,
): Promise<ResponseStatus | null> {
  if (!hasSupabaseConfig || !supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("event_responses")
    .select("status")
    .eq("user_id", userId)
    .eq("event_id", eventId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  const status = (data as { status: string }).status;
  if (status === "interested" || status === "attending") {
    return status;
  }
  return null;
}

/** Current user's response per event id (only when Supabase + user exist). */
export async function getUserResponsesForEvents(
  userId: string,
  eventIds: string[],
): Promise<Record<string, ResponseStatus>> {
  const out: Record<string, ResponseStatus> = {};
  if (!hasSupabaseConfig || !supabase || eventIds.length === 0) {
    return out;
  }

  const { data, error } = await supabase
    .from("event_responses")
    .select("event_id, status")
    .eq("user_id", userId)
    .in("event_id", eventIds);

  if (error || !data) {
    return out;
  }

  for (const row of data as { event_id: string; status: string }[]) {
    if (row.status === "interested" || row.status === "attending") {
      out[row.event_id] = row.status;
    }
  }

  return out;
}

export async function setEventResponse(
  userId: string,
  eventId: string,
  status: ResponseStatus,
): Promise<{ error: string | null }> {
  if (!hasSupabaseConfig || !supabase) {
    return { error: "Supabase is not configured." };
  }

  const { error } = await supabase.from("event_responses").upsert(
    {
      user_id: userId,
      event_id: eventId,
      status,
    },
    { onConflict: "user_id,event_id" },
  );

  return { error: error?.message ?? null };
}

export async function removeEventResponse(
  userId: string,
  eventId: string,
): Promise<{ error: string | null }> {
  if (!hasSupabaseConfig || !supabase) {
    return { error: "Supabase is not configured." };
  }

  const { error } = await supabase
    .from("event_responses")
    .delete()
    .eq("user_id", userId)
    .eq("event_id", eventId);

  return { error: error?.message ?? null };
}
