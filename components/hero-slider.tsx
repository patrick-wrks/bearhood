"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { CalendarDays, MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn, formatEventDate } from "@/lib/utils";
import type { EventItem } from "@/lib/types";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";

const AUTOPLAY_MS = 5000;

type HeroSliderProps = {
  events: EventItem[];
  onExploreEvent: (event: EventItem) => void;
};

export function HeroSlider({ events, onExploreEvent }: HeroSliderProps) {
  const locale = useLocale();
  const featuredEvents = events.filter((event) => event.isFeatured).slice(0, 5);
  const plugin = React.useRef(
    Autoplay({
      delay: AUTOPLAY_MS,
      stopOnInteraction: true,
    }),
  );
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!carouselApi) return;

    const updateSelectedIndex = () => {
      setSelectedIndex(carouselApi.selectedScrollSnap());
    };

    updateSelectedIndex();
    carouselApi.on("select", updateSelectedIndex);
    carouselApi.on("reInit", updateSelectedIndex);

    return () => {
      carouselApi.off("select", updateSelectedIndex);
      carouselApi.off("reInit", updateSelectedIndex);
    };
  }, [carouselApi]);

  const slideCount = carouselApi?.scrollSnapList().length ?? featuredEvents.length;

  if (featuredEvents.length === 0) {
    return null;
  }

  return (
    <div>
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        setApi={setCarouselApi}
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
        aria-label={t(locale, "hero.carouselLabel")}
      >
        <CarouselContent>
          {featuredEvents.map((event) => (
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
                      {event.title}
                    </h1>
                    <p className="max-w-xl text-sm text-zinc-100 md:text-base">{event.shortDescription}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-200 md:text-sm">
                      <p className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 shrink-0 text-white" aria-hidden />
                        {formatEventDate(event.date, locale)}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0 text-white" aria-hidden />
                        {event.location}
                      </p>
                    </div>
                    <Button
                      size="lg"
                      type="button"
                      className="touch-manipulation"
                      onClick={() => onExploreEvent(event)}
                    >
                      {t(locale, "hero.exploreEvent")}
                    </Button>
                  </div>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-3 flex flex-col items-center gap-2">
        <div
          className="flex items-center justify-center gap-1"
          role="tablist"
          aria-label={t(locale, "hero.slidePickerLabel")}
        >
          {Array.from({ length: slideCount }).map((_, i) => {
            const isActive = i === selectedIndex;

            return (
              <button
                key={i}
                type="button"
                aria-label={`${t(locale, "hero.goToSlide")} ${i + 1}`}
                aria-current={isActive ? "true" : undefined}
                className="flex h-11 min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                onClick={() => carouselApi?.scrollTo(i)}
              >
                <span
                  className={cn(
                    "block rounded-full border border-white/70 transition-[width,background-color] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                    isActive ? "h-2.5 w-8 bg-white/90" : "h-2.5 w-2.5 bg-white/20 hover:bg-white/40",
                  )}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>

        <div
          className="h-1 w-full max-w-xs overflow-hidden rounded-full bg-white/25"
          aria-hidden
        >
          <div
            key={selectedIndex}
            className="hero-autoplay-bar-fill bg-white/90"
            style={
              {
                "--hero-autoplay-ms": `${AUTOPLAY_MS}ms`,
              } as React.CSSProperties
            }
          />
        </div>
      </div>
    </div>
  );
}
