"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { CalendarDays, MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import type { EventItem } from "@/lib/types";

type HeroSliderProps = {
  events: EventItem[];
};

export function HeroSlider({ events }: HeroSliderProps) {
  const featuredEvents = events.filter((event) => event.isFeatured).slice(0, 5);
  const plugin = React.useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
    }),
  );

  if (featuredEvents.length === 0) {
    return null;
  }

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
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
                  <p className="inline-flex rounded-full border border-primary/40 bg-black/30 px-3 py-1 text-xs text-primary">
                    Featured Event
                  </p>
                  <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                    {event.title}
                  </h1>
                  <p className="text-sm text-zinc-200 md:text-base">{event.shortDescription}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-200 md:text-sm">
                    <p className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {event.location}
                    </p>
                  </div>
                  <Button size="lg">Explore Event</Button>
                </div>
              </div>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
