import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetailView } from "@/components/event-detail-view";
import { demoEvents, getEvents } from "@/lib/events";

export async function generateStaticParams() {
  return demoEvents.map((event) => ({ slug: event.id }));
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const events = await getEvents();
  const event = events.find((e) => e.id === slug);
  if (!event) return {};

  return {
    title: `${event.title} | Bearhood`,
    description: event.shortDescription,
    openGraph: {
      title: event.title,
      description: event.shortDescription,
      images: event.imageUrl ? [{ url: event.imageUrl }] : undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.shortDescription,
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const events = await getEvents();
  const event = events.find((e) => e.id === slug);
  if (!event) notFound();

  return <EventDetailView event={event} />;
}
