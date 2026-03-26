"use client";

import { useEffect, useState } from "react";
import { EventGrid } from "@/components/event-grid";
import { HeroSlider } from "@/components/hero-slider";
import { Separator } from "@/components/ui/separator";
import { demoEvents, getEvents } from "@/lib/events";
import type { EventItem } from "@/lib/types";
import { EventModal } from "@/components/event-modal";

export function EventsExperience() {
  const [events, setEvents] = useState<EventItem[]>(demoEvents);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectEvent = (event: EventItem) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

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
      <HeroSlider events={events} onExploreEvent={handleSelectEvent} />

      <section id="events" className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Upcoming Parties
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
          Discover the next wave of Bearhood experiences. Tap any event card to view details,
          lineups, and attendance info.
        </p>
        <Separator className="my-4" />
        <EventGrid events={events} onSelectEvent={handleSelectEvent} />
      </section>

      <EventModal
        key={`${selectedEvent?.id ?? "none"}-${isModalOpen ? "open" : "closed"}`}
        event={selectedEvent}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
