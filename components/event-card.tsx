"use client";

import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EventItem, EventSocialCounts } from "@/lib/types";
import { formatEventDate } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/use-locale";
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
    <Card className="group flex h-full flex-col overflow-hidden border-border/80 bg-card/80 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20">
      <button
        type="button"
        className={cn(
          "text-left",
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
            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-xl">{event.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pb-4">
          <p className="line-clamp-2 text-sm text-muted-foreground">{event.shortDescription}</p>
          <div className="space-y-2 text-xs text-muted-foreground">
            <p className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              {formatEventDate(event.date, locale)}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              {event.location}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {event.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="capitalize">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </button>

      <CardContent className="mt-auto border-t border-border/60 pt-3 pb-3">
        <div
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
      </CardContent>
    </Card>
  );
}
