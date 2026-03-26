"use client";

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

type EventModalProps = {
  event: EventItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EventModal({ event, open, onOpenChange }: EventModalProps) {
  if (!event) {
    return null;
  }

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
          <p className="text-sm leading-7 text-foreground/90">{event.description}</p>

          <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <p className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              {new Date(event.date).toLocaleString()}
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
            <Button className="sm:flex-1">Get Tickets</Button>
            <Button variant="outline" className="sm:flex-1">
              Learn More
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
