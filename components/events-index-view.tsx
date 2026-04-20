"use client";

import { useCallback, useEffect, useState } from "react";
import { EventGrid } from "@/components/event-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { demoEvents, getEvents } from "@/lib/events";
import type { EventItem, EventSocialCounts } from "@/lib/types";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import { useAuth } from "@/lib/auth-context";
import {
  getBulkEventSocialCounts,
  getUserBookmarkedEventIds,
  getUserLikedEventIds,
} from "@/lib/event-social";

export function EventsIndexView() {
  const locale = useLocale();
  const { user, authConfigured } = useAuth();
  const [events, setEvents] = useState<EventItem[]>(demoEvents);
  const [loading, setLoading] = useState(true);
  const [countsById, setCountsById] = useState<Record<string, EventSocialCounts>>({});
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const syncSocial = useCallback(async (ids: string[]) => {
    if (ids.length === 0) {
      setCountsById({});
      setLikedIds(new Set());
      setBookmarkedIds(new Set());
      return;
    }

    const nextCounts = await getBulkEventSocialCounts(ids);
    setCountsById(nextCounts);

    if (user?.id && authConfigured) {
      const [liked, bookmarked] = await Promise.all([
        getUserLikedEventIds(user.id, ids),
        getUserBookmarkedEventIds(user.id, ids),
      ]);
      setLikedIds(liked);
      setBookmarkedIds(bookmarked);
    } else {
      setLikedIds(new Set());
      setBookmarkedIds(new Set());
    }
  }, [user, authConfigured]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      setLoading(true);
      const fetched = await getEvents();
      if (cancelled) return;
      setEvents(fetched);
      setLoading(false);
      await syncSocial(fetched.map((e) => e.id));
    })();
    return () => {
      cancelled = true;
    };
  }, [syncSocial]);

  const handleSocialUpdated = useCallback(
    () => syncSocial(events.map((e) => e.id)),
    [events, syncSocial],
  );

  const empty = !loading && events.length === 0;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-8 pb-16 md:px-6 md:pt-12">
      <header className="space-y-3">
        <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
          {t(locale, "eventsIndex.title")}
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          {t(locale, "eventsIndex.description")}
        </p>
      </header>

      <div className="mt-10">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[420px] w-full rounded-xl" />
            ))}
          </div>
        ) : empty ? (
          <p className="rounded-xl border border-dashed border-border/80 bg-muted/20 px-6 py-12 text-center text-sm text-muted-foreground">
            {t(locale, "events.empty")}
          </p>
        ) : (
          <EventGrid
            events={events}
            countsById={countsById}
            likedIds={likedIds}
            bookmarkedIds={bookmarkedIds}
            userId={user?.id ?? null}
            authConfigured={authConfigured}
            onSocialUpdated={handleSocialUpdated}
          />
        )}
      </div>
    </section>
  );
}
