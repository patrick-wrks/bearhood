"use client";

import { useMemo, useState } from "react";
import { CalendarDays, MapPin, Ticket, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { EventItem, EventResponseCounts, ResponseStatus } from "@/lib/types";
import { formatEventDate, formatEventPriceEur, formatEventTime } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import { ResponseButtons } from "@/components/response-buttons";
import { useIsDesktop } from "@/lib/use-media-query";

type EventModalProps = {
  event: EventItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  counts: EventResponseCounts;
  userResponse: ResponseStatus | null;
  userId: string | null;
  authConfigured: boolean;
  onResponseUpdated: () => void | Promise<void>;
};

type EventModalBodyProps = {
  event: EventItem;
  descriptionText: string;
  expanded: boolean;
  setExpanded: (v: boolean | ((b: boolean) => boolean)) => void;
  needsReadMore: boolean;
  priceInfo: ReturnType<typeof formatEventPriceEur>;
  counts: EventResponseCounts;
  userResponse: ResponseStatus | null;
  userId: string | null;
  authConfigured: boolean;
  onResponseUpdated: () => void | Promise<void>;
  /** When true, omit bottom ticket buttons (shown in drawer footer). */
  omitBottomActions?: boolean;
  imageClassName?: string;
  /** When false, skip hero image (e.g. desktop dialog renders image + header separately). */
  includeImage?: boolean;
};

function EventModalBody({
  event,
  descriptionText,
  expanded,
  setExpanded,
  needsReadMore,
  priceInfo,
  counts,
  userResponse,
  userId,
  authConfigured,
  onResponseUpdated,
  omitBottomActions,
  imageClassName,
  includeImage = true,
}: EventModalBodyProps) {
  const locale = useLocale();
  const ticketUrl = event.ticketUrl;
  const learnMoreUrl = event.learnMoreUrl ?? event.ticketUrl;

  return (
    <>
      {includeImage && (
        <img
          src={event.imageUrl}
          alt={event.title}
          loading="lazy"
          decoding="async"
          className={imageClassName ?? "h-56 w-full rounded-md object-cover"}
        />
      )}
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
              className="rounded-md text-sm font-medium text-foreground/90 underline underline-offset-4 ring-offset-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? t(locale, "eventModal.showLess") : t(locale, "eventModal.readMore")}
            </button>
          )}
        </div>

        <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            {formatEventDate(event.date, locale)} {formatEventTime(event.date, locale)}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            {event.location}
          </p>
          <p className="flex items-center gap-2 sm:col-span-2">
            <Ticket className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            {priceInfo.isFree ? (
              <>
                {t(locale, "eventModal.free")} · {t(locale, "eventModal.capacity")}{" "}
                {event.capacity}
              </>
            ) : (
              <>
                {priceInfo.formatted} · {t(locale, "eventModal.capacity")} {event.capacity}
              </>
            )}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="capitalize">
              {tag}
            </Badge>
          ))}
        </div>

        <ResponseButtons
          eventId={event.id}
          counts={counts}
          userResponse={userResponse}
          userId={userId}
          authConfigured={authConfigured}
          onUpdated={onResponseUpdated}
        />

        {!omitBottomActions && (
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="sm:flex-1"
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
              className="sm:flex-1"
              disabled={!learnMoreUrl}
              onClick={() => {
                if (!learnMoreUrl) return;
                window.open(learnMoreUrl, "_blank", "noopener,noreferrer");
              }}
            >
              {t(locale, "eventModal.learnMore")}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export function EventModal({
  event,
  open,
  onOpenChange,
  counts,
  userResponse,
  userId,
  authConfigured,
  onResponseUpdated,
}: EventModalProps) {
  const locale = useLocale();
  const isDesktop = useIsDesktop();

  const descriptionText = useMemo(() => {
    if (!event) return "";
    return event.description.replace(/<br\s*\/?>/gi, "\n");
  }, [event]);

  const [expanded, setExpanded] = useState(false);
  const needsReadMore = descriptionText.replace(/\s+/g, " ").length > 220;
  const priceInfo = event ? formatEventPriceEur(locale, event.price) : { isFree: true, formatted: "" };

  if (!event) return null;

  const ticketUrl = event.ticketUrl;
  const learnMoreUrl = event.learnMoreUrl ?? event.ticketUrl;

  const handleDrawerOpenChange = (next: boolean) => {
    if (!next) onOpenChange(false);
  };

  const handleDialogOpenChange = (next: boolean) => {
    onOpenChange(next);
  };

  return (
    <>
      {/* Mobile: bottom sheet */}
      <Drawer
        open={open && !isDesktop}
        onOpenChange={handleDrawerOpenChange}
        direction="bottom"
        shouldScaleBackground={false}
      >
        <DrawerContent className="flex max-h-[min(92vh,900px)] flex-col gap-0 rounded-t-2xl border-border/80 bg-card p-0 [&>div:first-child]:shrink-0">
          <DrawerHeader className="relative shrink-0 border-b border-border/60 px-4 pb-3 pt-2 text-left">
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 shrink-0"
                aria-label={t(locale, "eventModal.close")}
              >
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
            <DrawerTitle className="pr-10 text-xl font-semibold leading-tight">
              {event.title}
            </DrawerTitle>
            <DrawerDescription className="text-left text-muted-foreground">
              {event.shortDescription}
            </DrawerDescription>
          </DrawerHeader>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-4">
            <EventModalBody
              event={event}
              descriptionText={descriptionText}
              expanded={expanded}
              setExpanded={setExpanded}
              needsReadMore={needsReadMore}
              priceInfo={priceInfo}
              counts={counts}
              userResponse={userResponse}
              userId={userId}
              authConfigured={authConfigured}
              onResponseUpdated={onResponseUpdated}
              omitBottomActions
              imageClassName="h-44 w-full rounded-lg object-cover"
            />
          </div>

          <DrawerFooter className="shrink-0 border-t border-border/80 bg-card/95 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_40px_-12px_rgba(0,0,0,0.12)]">
            <Button
              className="h-12 w-full text-base font-semibold"
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
              className="h-11 w-full"
              disabled={!learnMoreUrl}
              onClick={() => {
                if (!learnMoreUrl) return;
                window.open(learnMoreUrl, "_blank", "noopener,noreferrer");
              }}
            >
              {t(locale, "eventModal.learnMore")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Desktop: centered dialog */}
      <Dialog open={open && isDesktop} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-border/80 bg-card sm:max-w-2xl">
          <img
            src={event.imageUrl}
            alt={event.title}
            loading="lazy"
            decoding="async"
            className="h-56 w-full rounded-md object-cover"
          />
          <DialogHeader>
            <DialogTitle className="text-2xl">{event.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {event.shortDescription}
            </DialogDescription>
          </DialogHeader>

          <EventModalBody
            event={event}
            descriptionText={descriptionText}
            expanded={expanded}
            setExpanded={setExpanded}
            needsReadMore={needsReadMore}
            priceInfo={priceInfo}
            counts={counts}
            userResponse={userResponse}
            userId={userId}
            authConfigured={authConfigured}
            onResponseUpdated={onResponseUpdated}
            omitBottomActions={false}
            includeImage={false}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
