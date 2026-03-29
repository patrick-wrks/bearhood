"use client";

import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { EventItem, EventSocialCounts } from "@/lib/types";
import { formatEventDate } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/use-locale";
import { localizedShortDescription } from "@/lib/events";
import { SocialActions } from "@/components/social-actions";
import { cn } from "@/lib/utils";

type EventCardProps = {
  event: EventItem;
  onSelect: (event: EventItem) => void;
  counts: EventSocialCounts;
  liked: boolean;
  bookmarked: boolean;
  userId: string | null;
  authConfigured: boolean;
  onSocialUpdated: () => void | Promise<void>;
};

export function EventCard({
  event,
  onSelect,
  counts,
  liked,
  bookmarked,
  userId,
  authConfigured,
  onSocialUpdated,
}: EventCardProps) {
  const locale = useLocale();

  return (
    <Card className="group flex h-full flex-col gap-0 overflow-hidden border-border/80 bg-card/80 p-0 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20">
      <button
        type="button"
        className={cn(
          "flex flex-1 flex-col text-left",
          "rounded-t-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
        onClick={() => onSelect(event)}
        onKeyDown={(evt) => evt.key === "Enter" && onSelect(event)}
      >
        <div className="relative">
          <img
            src={event.imageUrl}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
          {event.logoUrl && (
            <img
              src={event.logoUrl}
              alt={event.title}
              className="pointer-events-none absolute inset-0 m-auto h-24 w-auto max-w-[70%] object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            />
          )}
        </div>

        <CardHeader className="px-4 pb-0 pt-4">
          <CardTitle className="text-lg font-semibold leading-snug">{event.title}</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-2">
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {localizedShortDescription(event, locale)}
          </p>

          <div className="space-y-1.5 text-xs text-muted-foreground">
            <p className="flex items-center gap-2">
              <CalendarDays className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
              {formatEventDate(event.date, locale)}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
              <span className="line-clamp-1">{event.location}</span>
            </p>
          </div>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {event.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[11px] capitalize">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </button>

      <CardFooter className="border-t-0 bg-transparent px-4 py-2.5">
        <div
          className="w-full"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          role="presentation"
        >
          <SocialActions
            eventId={event.id}
            counts={counts}
            liked={liked}
            bookmarked={bookmarked}
            userId={userId}
            authConfigured={authConfigured}
            onUpdated={onSocialUpdated}
            onCommentClick={() => onSelect(event)}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
