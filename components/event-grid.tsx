"use client";

import { EventCard } from "@/components/event-card";
import type { EventItem, EventResponseCounts, ResponseStatus } from "@/lib/types";

type EventGridProps = {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  countsById: Record<string, EventResponseCounts>;
  userResponses: Record<string, ResponseStatus>;
  userId: string | null;
  authConfigured: boolean;
  onResponseUpdated: () => void | Promise<void>;
};

export function EventGrid({
  events,
  onSelectEvent,
  countsById,
  userResponses,
  userId,
  authConfigured,
  onResponseUpdated,
}: EventGridProps) {
  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-2 md:hidden snap-x snap-mandatory">
        {events.map((event) => (
          <div
            key={event.id}
            className="w-[85vw] max-w-[420px] flex-shrink-0 snap-start"
          >
            <EventCard
              event={event}
              onSelect={onSelectEvent}
              counts={countsById[event.id] ?? { interested: 0, attending: 0 }}
              userResponse={userResponses[event.id] ?? null}
              userId={userId}
              authConfigured={authConfigured}
              onResponseUpdated={onResponseUpdated}
            />
          </div>
        ))}
      </div>

      <div className="hidden md:grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onSelect={onSelectEvent}
            counts={countsById[event.id] ?? { interested: 0, attending: 0 }}
            userResponse={userResponses[event.id] ?? null}
            userId={userId}
            authConfigured={authConfigured}
            onResponseUpdated={onResponseUpdated}
          />
        ))}
      </div>
    </>
  );
}
