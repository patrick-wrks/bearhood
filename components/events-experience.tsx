"use client";

import { useCallback, useEffect, useState } from "react";
import { EventGrid } from "@/components/event-grid";
import { HeroSlider } from "@/components/hero-slider";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { demoEvents, getEvents } from "@/lib/events";
import type { EventItem, EventSocialCounts } from "@/lib/types";
import { EventModal } from "@/components/event-modal";
import { PartnersSection } from "@/components/partners-section";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import { useAuth } from "@/lib/auth-context";
import {
  getBulkEventSocialCounts,
  getUserLikedEventIds,
  getUserBookmarkedEventIds,
} from "@/lib/event-social";

export function EventsExperience() {
  const locale = useLocale();
  const { user, authConfigured } = useAuth();
  const [events, setEvents] = useState<EventItem[]>(demoEvents);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [countsById, setCountsById] = useState<Record<string, EventSocialCounts>>({});
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectEvent = (event: EventItem) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

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
      setEventsLoading(true);
      const fetchedEvents = await getEvents();
      if (cancelled) return;
      setEvents(fetchedEvents);
      setEventsLoading(false);

      await syncSocial(fetchedEvents.map((e) => e.id));
    })();

    return () => { cancelled = true; };
  }, [syncSocial]);

  const handleSocialUpdated = useCallback(
    () => syncSocial(events.map((e) => e.id)),
    [events, syncSocial],
  );

  const empty = !eventsLoading && events.length === 0;

  return (
    <>
      <section
        className="-mx-4 rounded-2xl bg-muted/35 px-4 py-10 md:-mx-0 md:px-6 md:py-14"
        aria-label={t(locale, "events.heroSectionLabel")}
      >
        {eventsLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-[min(40vh,280px)] w-full rounded-2xl md:h-[min(56vh,520px)]" />
            <div className="flex justify-center gap-2">
              <Skeleton className="h-2.5 w-2.5 rounded-full" />
              <Skeleton className="h-2.5 w-8 rounded-full" />
              <Skeleton className="h-2.5 w-2.5 rounded-full" />
            </div>
          </div>
        ) : empty ? null : (
          <HeroSlider events={events} onExploreEvent={handleSelectEvent} />
        )}
      </section>

      <PartnersSection />

      <section id="events" className="mt-12 space-y-4 md:mt-20 md:space-y-5">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {t(locale, "events.upcomingParties")}
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
          {t(locale, "events.upcomingPartiesDescription")}
        </p>
        <Separator className="my-4 md:my-6" />

        {eventsLoading ? (
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
            onSelectEvent={handleSelectEvent}
            countsById={countsById}
            likedIds={likedIds}
            bookmarkedIds={bookmarkedIds}
            userId={user?.id ?? null}
            authConfigured={authConfigured}
            onSocialUpdated={handleSocialUpdated}
          />
        )}
      </section>

      <EventModal
        key={`${selectedEvent?.id ?? "none"}-${isModalOpen ? "open" : "closed"}`}
        event={selectedEvent}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        counts={
          selectedEvent
            ? (countsById[selectedEvent.id] ?? { likes: 0, comments: 0 })
            : { likes: 0, comments: 0 }
        }
        liked={selectedEvent ? likedIds.has(selectedEvent.id) : false}
        bookmarked={selectedEvent ? bookmarkedIds.has(selectedEvent.id) : false}
        userId={user?.id ?? null}
        authConfigured={authConfigured}
        onSocialUpdated={handleSocialUpdated}
      />
    </>
  );
}
