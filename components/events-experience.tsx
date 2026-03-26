"use client";

import { useEffect, useState } from "react";
import { EventGrid } from "@/components/event-grid";
import { HeroSlider } from "@/components/hero-slider";
import { Separator } from "@/components/ui/separator";
import { demoEvents, getEvents } from "@/lib/events";
import type { EventItem } from "@/lib/types";

export function EventsExperience() {
  const [events, setEvents] = useState<EventItem[]>(demoEvents);

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      const fetchedEvents = await getEvents();
      if (isMounted) {
        setEvents(fetchedEvents);
      }
    };

    void loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <HeroSlider events={events} />

      <section id="events" className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Upcoming Events</h2>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
          Discover the next wave of Bearhood experiences. Tap any event card to view details,
          lineups, and attendance info.
        </p>
        <Separator className="my-4" />
        <EventGrid events={events} />
      </section>
    </>
  );
}
