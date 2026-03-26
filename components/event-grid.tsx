"use client";

import { useState } from "react";
import { EventCard } from "@/components/event-card";
import { EventModal } from "@/components/event-modal";
import type { EventItem } from "@/lib/types";

type EventGridProps = {
  events: EventItem[];
};

export function EventGrid({ events }: EventGridProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectEvent = (event: EventItem) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} onSelect={handleSelectEvent} />
        ))}
      </div>
      <EventModal event={selectedEvent} open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
