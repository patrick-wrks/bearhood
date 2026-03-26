"use client";

import { useMemo, useState } from "react";
import { CalendarDays, MapPin, Ticket } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { EventItem } from "@/lib/types";
import { formatEventDate, formatEventTime } from "@/lib/utils";

type EventModalProps = {
  event: EventItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EventModal({ event, open, onOpenChange }: EventModalProps) {
  const descriptionText = useMemo(() => {
    if (!event) return "";
    // Supabase/demo content may include <br> tags. Convert them to real line breaks.
    return event.description.replace(/<br\s*\/?>/gi, "\n");
  }, [event]);

  const [expanded, setExpanded] = useState(false);

  const needsReadMore = descriptionText.replace(/\s+/g, " ").length > 220;

  if (!event) return null;

  const ticketUrl = event.ticketUrl;
  const learnMoreUrl = event.learnMoreUrl ?? event.ticketUrl;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border/80 bg-card sm:max-w-2xl">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-56 w-full rounded-md object-cover"
        />
        <DialogHeader>
          <DialogTitle className="text-2xl">{event.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {event.shortDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <p
              className={[
                "text-sm leading-7 text-foreground/90 whitespace-pre-line",
                expanded ? "" : "line-clamp-6",
              ].join(" ")}
            >
              {descriptionText}
            </p>

            {needsReadMore && (
              <button
                type="button"
                className="text-sm font-medium text-foreground/90 underline underline-offset-4 hover:text-foreground"
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>

          <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <p className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              {formatEventDate(event.date)} {formatEventTime(event.date)}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {event.location}
            </p>
            <p className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-primary" />
              ${event.price} - Capacity {event.capacity}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="capitalize">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="sm:flex-1"
              disabled={!ticketUrl}
              onClick={() => {
                if (!ticketUrl) return;
                window.open(ticketUrl, "_blank", "noopener,noreferrer");
              }}
            >
              Get Tickets
            </Button>
            <Button
              variant="outline"
              className="sm:flex-1"
              disabled={!learnMoreUrl}
              onClick={() => {
                if (!learnMoreUrl) return;
                window.open(learnMoreUrl, "_blank", "noopener,noreferrer");
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
