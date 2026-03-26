import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatEventDate(dateIso: string): string {
  const d = new Date(dateIso)

  // Example target: "Tue. 29. Mar"
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(d)
  const day = d.getDate()
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(d)

  return `${weekday}. ${day}. ${month}`
}

export function formatEventTime(dateIso: string): string {
  const d = new Date(dateIso)
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(d)
}
