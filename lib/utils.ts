import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale } from "@/lib/i18n/locales";
import type { EventItem } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function localeToBcp47(locale: Locale): string {
  return locale === "de" ? "de-DE" : "en-US";
}

export function formatEventDate(dateIso: string, locale: Locale = "en"): string {
  const d = new Date(dateIso);
  const bcp = localeToBcp47(locale);

  const weekday = new Intl.DateTimeFormat(bcp, { weekday: "short" }).format(d);
  const day = d.getDate();
  const month = new Intl.DateTimeFormat(bcp, { month: "short" }).format(d);

  return `${weekday}. ${day}. ${month}`;
}

export function formatEventTime(dateIso: string, locale: Locale = "en"): string {
  const d = new Date(dateIso);
  const bcp = localeToBcp47(locale);
  return new Intl.DateTimeFormat(bcp, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(d);
}

export function formatEventPriceEur(
  locale: Locale,
  price: number,
): { isFree: true } | { isFree: false; formatted: string } {
  if (price === 0) {
    return { isFree: true };
  }
  const bcp = localeToBcp47(locale);
  return {
    isFree: false,
    formatted: new Intl.NumberFormat(bcp, {
      style: "currency",
      currency: "EUR",
    }).format(price),
  };
}

function toIcsDateUtc(dateIso: string): string {
  const d = new Date(dateIso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T` +
    `${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  );
}

const DEFAULT_DURATION_HOURS = 4;

export function downloadIcsFile(event: EventItem): void {
  const start = toIcsDateUtc(event.date);
  const endMs = new Date(event.date).getTime() + DEFAULT_DURATION_HOURS * 3_600_000;
  const end = toIcsDateUtc(new Date(endMs).toISOString());
  const now = toIcsDateUtc(new Date().toISOString());

  const description = event.shortDescription.replace(/\n/g, "\\n");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Bearhood//Event//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `DTSTAMP:${now}`,
    `UID:${event.id}@bearhood`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${event.location}`,
    ...(event.ticketUrl ? [`URL:${event.ticketUrl}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${event.title.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}.ics`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
