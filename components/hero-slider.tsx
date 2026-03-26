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
import type { EventItem } from "@/lib/types";
import { formatEventDate } from "@/lib/utils";

type HeroSliderProps = {
  events: EventItem[];
  onExploreEvent: (event: EventItem) => void;
};

export function HeroSlider({ events, onExploreEvent }: HeroSliderProps) {
  const featuredEvents = events.filter((event) => event.isFeatured).slice(0, 5);
  const plugin = React.useRef(
    Autoplay({
      delay: 5000,
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
      >
        <CarouselContent>
          {featuredEvents.map((event) => (
            <CarouselItem key={event.id}>
              <article className="relative overflow-hidden rounded-2xl border border-border/80">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="h-[56vh] min-h-[400px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/20" />

                <div className="absolute inset-0 flex items-end p-6 md:p-10">
                  <div className="max-w-2xl space-y-4">
                    <p className="inline-flex rounded-full border border-white/50 bg-black/60 px-3 py-1 text-xs font-medium text-white">
                      Featured Event
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                      {event.title}
                    </h1>
                    <p className="text-sm text-zinc-200 md:text-base">{event.shortDescription}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-200 md:text-sm">
                      <p className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-white" />
                        {formatEventDate(event.date)}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-white" />
                        {event.location}
                      </p>
                    </div>
                    <Button
                      size="lg"
                      type="button"
                      onClick={() => onExploreEvent(event)}
                    >
                      Explore Event
                    </Button>
                  </div>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-3 flex justify-center gap-2">
        {Array.from({ length: slideCount }).map((_, i) => {
          const isActive = i === selectedIndex;

          return (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={isActive ? "true" : undefined}
              className={[
                "h-2.5 w-2.5 rounded-full border border-white/70 transition-all duration-300",
                isActive ? "bg-white/90 w-8" : "bg-white/20 hover:bg-white/40",
              ].join(" ")}
              onClick={() => carouselApi?.scrollTo(i)}
            />
          );
        })}
      </div>
    </div>
  );
}
