"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { CalendarDays, MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { formatEventDate, getDaysFromToday } from "@/lib/utils";
import type { EventItem } from "@/lib/types";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import { localizedShortDescription, localizedTitle } from "@/lib/events";

const AUTOPLAY_MS = 5000;

type HeroSliderProps = {
  events: EventItem[];
  onExploreEvent: (event: EventItem) => void;
};

export function HeroSlider({ events, onExploreEvent }: HeroSliderProps) {
  const locale = useLocale();
  const featuredEvents = React.useMemo(() => {
    const featured = events.filter((event) => event.isFeatured);
    const upcoming = featured
      .filter((event) => getDaysFromToday(event.date) >= 0)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const recentEnded = featured
      .filter((event) => {
        const daysFromToday = getDaysFromToday(event.date);
        return daysFromToday < 0 && daysFromToday >= -7;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return [...upcoming, ...recentEnded].slice(0, 5);
  }, [events]);
  const plugin = React.useRef(
    Autoplay({
      delay: AUTOPLAY_MS,
      stopOnInteraction: true,
    }),
  );
  if (featuredEvents.length === 0) {
    return null;
  }

  return (
    <div>
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
        aria-label={t(locale, "hero.carouselLabel")}
      >
        <CarouselContent>
          {featuredEvents.map((event) => {
            const daysFromToday = getDaysFromToday(event.date);
            const daysRemainingLabel =
              daysFromToday > 0
                ? t(
                    locale,
                    daysFromToday === 1 ? "hero.daysRemaining.one" : "hero.daysRemaining.other",
                  ).replace("{count}", String(daysFromToday))
                : daysFromToday === 0
                  ? t(locale, "hero.daysRemaining.today")
                  : t(locale, "hero.daysRemaining.ended");

            return (
              <CarouselItem key={event.id}>
                <article className="relative overflow-hidden rounded-2xl border border-border/80">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="h-[60vh] min-h-[340px] w-full object-cover md:h-[70vh] md:min-h-[480px]"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:from-black/65 md:via-black/25" />

                  <div className="absolute inset-0 flex items-end p-8 md:p-14">
                    <div className="max-w-2xl space-y-5">
                      <p className="inline-flex rounded-full border border-white/50 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {t(locale, "hero.featuredEvent")}
                      </p>
                      <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md md:text-5xl">
                        {localizedTitle(event, locale)}
                      </h1>
                      <p className="max-w-xl text-sm text-zinc-100 md:text-base">{localizedShortDescription(event, locale)}</p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-200 md:text-sm">
                        <p className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 shrink-0 text-white" aria-hidden />
                          {formatEventDate(event.date, locale)} • {daysRemainingLabel}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 shrink-0 text-white" aria-hidden />
                          {event.location}
                        </p>
                      </div>
                      <Button
                        size="lg"
                        type="button"
                        className="touch-manipulation bg-white text-black hover:bg-white/90"
                        onClick={() => onExploreEvent(event)}
                      >
                        {t(locale, "hero.exploreEvent")}
                      </Button>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
