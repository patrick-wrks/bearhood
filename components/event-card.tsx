import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EventItem } from "@/lib/types";
import { formatEventDate } from "@/lib/utils";

type EventCardProps = {
  event: EventItem;
  onSelect: (event: EventItem) => void;
};

export function EventCard({ event, onSelect }: EventCardProps) {
  return (
    <Card
      role="button"
      tabIndex={0}
      className="group overflow-hidden border-border/80 bg-card/80 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20"
      onClick={() => onSelect(event)}
      onKeyDown={(evt) => evt.key === "Enter" && onSelect(event)}
    >
      <div className="relative">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <CardHeader>
        <CardTitle className="text-xl">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="line-clamp-2 text-sm text-muted-foreground">{event.shortDescription}</p>
        <div className="space-y-2 text-xs text-muted-foreground">
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            {formatEventDate(event.date)}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
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
    </Card>
  );
}
