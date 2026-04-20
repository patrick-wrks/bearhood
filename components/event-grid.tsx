"use client";

import type { CSSProperties, ReactNode } from "react";
import { EventCard } from "@/components/event-card";
import type { EventItem, EventSocialCounts } from "@/lib/types";
import { useInViewOnce } from "@/lib/use-in-view-once";
import { cn } from "@/lib/utils";

type EventGridProps = {
  events: EventItem[];
  countsById: Record<string, EventSocialCounts>;
  likedIds: Set<string>;
  bookmarkedIds: Set<string>;
  userId: string | null;
  authConfigured: boolean;
  onSocialUpdated: () => void | Promise<void>;
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
  countsById,
  likedIds,
  bookmarkedIds,
  userId,
  authConfigured,
  onSocialUpdated,
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
              counts={countsById[event.id] ?? { likes: 0, comments: 0, interested: 0 }}
              liked={likedIds.has(event.id)}
              bookmarked={bookmarkedIds.has(event.id)}
              userId={userId}
              authConfigured={authConfigured}
              onSocialUpdated={onSocialUpdated}
            />
          </EventGridReveal>
        ))}
      </div>

      <div className="hidden gap-6 md:grid sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <EventGridReveal key={event.id} index={index}>
            <EventCard
              event={event}
              counts={countsById[event.id] ?? { likes: 0, comments: 0, interested: 0 }}
              liked={likedIds.has(event.id)}
              bookmarked={bookmarkedIds.has(event.id)}
              userId={userId}
              authConfigured={authConfigured}
              onSocialUpdated={onSocialUpdated}
            />
          </EventGridReveal>
        ))}
      </div>
    </>
  );
}
