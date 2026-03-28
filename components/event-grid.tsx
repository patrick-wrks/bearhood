"use client";

import type { CSSProperties, ReactNode } from "react";
import { EventCard } from "@/components/event-card";
import type { EventItem, EventResponseCounts, ResponseStatus } from "@/lib/types";
import { useInViewOnce } from "@/lib/use-in-view-once";
import { cn } from "@/lib/utils";

type EventGridProps = {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  countsById: Record<string, EventResponseCounts>;
  userResponses: Record<string, ResponseStatus>;
  userId: string | null;
  authConfigured: boolean;
  onResponseUpdated: () => void | Promise<void>;
};

function EventGridReveal({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: ReactNode;
}) {
  const { ref, inView } = useInViewOnce();

  const style = inView
    ? ({
        "--reveal-delay": `${Math.min(index * 55, 400)}ms`,
      } as CSSProperties)
    : undefined;

  return (
    <div
      ref={ref}
      className={cn(
        !inView && "translate-y-3 opacity-0",
        inView && "event-card-reveal-ready",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

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
      <div className="flex gap-4 overflow-x-auto overscroll-x-contain pb-2 md:hidden snap-x snap-mandatory scrollbar-none [-webkit-overflow-scrolling:touch]">
        {events.map((event, index) => (
          <EventGridReveal
            key={event.id}
            index={index}
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
          </EventGridReveal>
        ))}
      </div>

      <div className="hidden gap-6 md:grid sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <EventGridReveal key={event.id} index={index}>
            <EventCard
              event={event}
              onSelect={onSelectEvent}
              counts={countsById[event.id] ?? { interested: 0, attending: 0 }}
              userResponse={userResponses[event.id] ?? null}
              userId={userId}
              authConfigured={authConfigured}
              onResponseUpdated={onResponseUpdated}
            />
          </EventGridReveal>
        ))}
      </div>
    </>
  );
}
