import type { Metadata } from "next";
import { EventsIndexView } from "@/components/events-index-view";

export const metadata: Metadata = {
  title: "Events | Bearhood",
  description: "Browse all upcoming Bearhood parties, socials, and festival drops.",
  openGraph: {
    title: "Events | Bearhood",
    description: "Browse all upcoming Bearhood parties, socials, and festival drops.",
    type: "website",
  },
};

export default function EventsIndexPage() {
  return <EventsIndexView />;
}
