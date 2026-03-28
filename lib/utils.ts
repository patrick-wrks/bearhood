import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale } from "@/lib/i18n/locales";

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
