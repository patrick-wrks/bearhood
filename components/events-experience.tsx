"use client";

import { useCallback, useEffect, useState } from "react";
import { EventGrid } from "@/components/event-grid";
import { HeroSlider } from "@/components/hero-slider";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { demoEvents, getEvents } from "@/lib/events";
import type { EventItem, EventResponseCounts, ResponseStatus } from "@/lib/types";
import { EventModal } from "@/components/event-modal";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import { useAuth } from "@/lib/auth-context";
import {
  getBulkEventResponseCounts,
  getUserResponsesForEvents,
} from "@/lib/event-responses";

export function EventsExperience() {
  const locale = useLocale();
  const { user, authConfigured } = useAuth();
  const [events, setEvents] = useState<EventItem[]>(demoEvents);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [countsById, setCountsById] = useState<Record<string, EventResponseCounts>>({});
  const [userResponses, setUserResponses] = useState<Record<string, ResponseStatus>>({});
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectEvent = (event: EventItem) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      setEventsLoading(true);
      const fetchedEvents = await getEvents();
      if (isMounted) {
        setEvents(fetchedEvents);
        setEventsLoading(false);
      }
    };

    void loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const syncResponses = useCallback(async () => {
    const ids = events.map((e) => e.id);
    if (ids.length === 0) {
      setCountsById({});
      setUserResponses({});
      return;
    }

    const nextCounts = await getBulkEventResponseCounts(ids);
    setCountsById(nextCounts);

    if (user?.id && authConfigured) {
      const mine = await getUserResponsesForEvents(user.id, ids);
      setUserResponses(mine);
    } else {
      setUserResponses({});
    }
  }, [events, user, authConfigured]);

  useEffect(() => {
    const ac = new AbortController();

    void (async () => {
      const ids = events.map((e) => e.id);
      if (ids.length === 0) {
        if (!ac.signal.aborted) {
          setCountsById({});
          setUserResponses({});
        }
        return;
      }

      const nextCounts = await getBulkEventResponseCounts(ids);
      if (ac.signal.aborted) return;
      setCountsById(nextCounts);

      if (user?.id && authConfigured) {
        const mine = await getUserResponsesForEvents(user.id, ids);
        if (ac.signal.aborted) return;
        setUserResponses(mine);
      } else if (!ac.signal.aborted) {
        setUserResponses({});
      }
    })();

    return () => ac.abort();
  }, [events, user, authConfigured]);

  const empty = !eventsLoading && events.length === 0;

  return (
    <>
      {eventsLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-[min(56vh,520px)] w-full rounded-2xl" />
          <div className="flex justify-center gap-2">
            <Skeleton className="h-2.5 w-2.5 rounded-full" />
            <Skeleton className="h-2.5 w-8 rounded-full" />
            <Skeleton className="h-2.5 w-2.5 rounded-full" />
          </div>
        </div>
      ) : empty ? null : (
        <HeroSlider events={events} onExploreEvent={handleSelectEvent} />
      )}

      <section id="events" className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {t(locale, "events.upcomingParties")}
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
          {t(locale, "events.upcomingPartiesDescription")}
        </p>
        <Separator className="my-4" />

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
            userResponses={userResponses}
            userId={user?.id ?? null}
            authConfigured={authConfigured}
            onResponseUpdated={syncResponses}
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
            ? (countsById[selectedEvent.id] ?? { interested: 0, attending: 0 })
            : { interested: 0, attending: 0 }
        }
        userResponse={selectedEvent ? (userResponses[selectedEvent.id] ?? null) : null}
        userId={user?.id ?? null}
        authConfigured={authConfigured}
        onResponseUpdated={syncResponses}
      />
    </>
  );
}
