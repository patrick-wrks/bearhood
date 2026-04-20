"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, CalendarPlus, MapPin, Ticket, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { EventItem, EventSocialCounts } from "@/lib/types";
import { downloadIcsFile, formatEventDate, formatEventPriceEur, formatEventTime } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import { localizedDescription, localizedShortDescription, localizedTitle } from "@/lib/events";
import { SocialActions } from "@/components/social-actions";
import { CommentSection } from "@/components/comment-section";
import { useAuth } from "@/lib/auth-context";
import {
  getBulkEventSocialCounts,
  getUserBookmarkedEventIds,
  getUserLikedEventIds,
} from "@/lib/event-social";

type EventDetailViewProps = {
  event: EventItem;
};

const emptyCounts: EventSocialCounts = { likes: 0, comments: 0, interested: 0 };

export function EventDetailView({ event }: EventDetailViewProps) {
  const locale = useLocale();
  const { user, authConfigured } = useAuth();
  const [counts, setCounts] = useState<EventSocialCounts>(emptyCounts);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const title = localizedTitle(event, locale);
  const shortDescription = localizedShortDescription(event, locale);
  const paragraphs = localizedDescription(event, locale)
    .split(/<br\s*\/?>/gi)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  const priceInfo = formatEventPriceEur(locale, event.price);
  const ticketUrl = event.ticketUrl;

  const syncSocial = useCallback(async () => {
    const nextCounts = await getBulkEventSocialCounts([event.id]);
    setCounts(nextCounts[event.id] ?? emptyCounts);

    if (user?.id && authConfigured) {
      const [likedSet, bookmarkedSet] = await Promise.all([
        getUserLikedEventIds(user.id, [event.id]),
        getUserBookmarkedEventIds(user.id, [event.id]),
      ]);
      setLiked(likedSet.has(event.id));
      setBookmarked(bookmarkedSet.has(event.id));
    } else {
      setLiked(false);
      setBookmarked(false);
    }
  }, [event.id, user?.id, authConfigured, user]);

  useEffect(() => {
    void syncSocial();
  }, [syncSocial]);

  const scrollToComments = () => {
    document.getElementById("comments")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <article className="mx-auto w-full max-w-5xl px-4 pb-16 pt-4 md:px-6 md:pt-6">
      <Link
        href={`/${locale}/events`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        {t(locale, "eventDetail.backToEvents")}
      </Link>

      <section className="relative mt-5 overflow-hidden rounded-2xl border border-border/80">
        <img
          src={event.heroImageUrl ?? event.imageUrl}
          alt={title}
          className="h-[45vh] min-h-[320px] w-full object-cover md:h-[60vh] md:min-h-[460px]"
          fetchPriority="high"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent md:from-black/70 md:via-black/20" />
        <div className="absolute inset-0 flex items-end p-6 md:p-12">
          <div className="max-w-3xl space-y-4">
            {event.logoUrl && (
              <img
                src={event.logoUrl}
                alt=""
                className="h-16 w-auto max-w-[60%] object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] md:h-20"
              />
            )}
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-white drop-shadow-md md:text-5xl">
              {title}
            </h1>
            <p className="max-w-2xl text-sm text-zinc-100 md:text-base">{shortDescription}</p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-10 md:mt-12 md:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <p className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              {formatEventDate(event.date, locale)} · {formatEventTime(event.date, locale)}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              {event.location}
            </p>
            <p className="flex items-center gap-2">
              <Ticket className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              {priceInfo.isFree ? t(locale, "eventModal.free") : priceInfo.formatted}
            </p>
            <p className="flex items-center gap-2">
              <Users className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              {t(locale, "eventModal.capacity")} {event.capacity}
            </p>
          </div>

          <Separator />

          <div className="space-y-4 text-base leading-7 text-foreground/90">
            {paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {event.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-4 md:sticky md:top-24 md:self-start">
          <div className="space-y-3 rounded-xl border border-border/80 bg-card/80 p-5">
            <Button
              size="lg"
              className="w-full"
              disabled={!ticketUrl}
              onClick={() => {
                if (!ticketUrl) return;
                window.open(ticketUrl, "_blank", "noopener,noreferrer");
              }}
            >
              {t(locale, "eventModal.getTickets")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => downloadIcsFile(event)}
            >
              <CalendarPlus className="mr-2 h-4 w-4" aria-hidden />
              {t(locale, "eventModal.addToCalendar")}
            </Button>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/80 p-3">
            <SocialActions
              eventId={event.id}
              counts={counts}
              liked={liked}
              bookmarked={bookmarked}
              userId={user?.id ?? null}
              authConfigured={authConfigured}
              onUpdated={syncSocial}
              onCommentClick={scrollToComments}
            />
          </div>
        </aside>
      </section>

      <section id="comments" className="mt-14 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {t(locale, "eventDetail.comments")}
        </h2>
        <div className="mt-5">
          <CommentSection
            eventId={event.id}
            userId={user?.id ?? null}
            authConfigured={authConfigured}
            onCommentAdded={syncSocial}
          />
        </div>
      </section>
    </article>
  );
}
