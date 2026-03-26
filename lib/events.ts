import { hasSupabaseConfig, supabase } from "@/lib/supabase";
import type { EventItem } from "@/lib/types";

type SupabaseEvent = {
  id: string;
  title: string;
  description: string;
  short_description: string;
  date: string;
  location: string;
  image_url: string;
  is_featured: boolean;
  capacity: number;
  price: number;
  tags: string[];
};

export const demoEvents: EventItem[] = [
  {
    id: "1",
    title: "Bearhood Night Market",
    shortDescription: "Street food, neon visuals, and live DJ sets.",
    description:
      "An open-air evening market packed with local vendors, immersive light installations, and back-to-back DJ performances curated by Bearhood.",
    date: "2026-05-14T19:30:00.000Z",
    location: "Riverfront District, Austin",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80",
    isFeatured: true,
    capacity: 500,
    price: 25,
    tags: ["music", "food", "nightlife"],
  },
  {
    id: "2",
    title: "Forest Pulse Festival",
    shortDescription: "A one-night forest stage with visual storytelling.",
    description:
      "Escape into a curated woodland venue featuring electronic artists, projection mapping, and interactive zones that blend sound and nature.",
    date: "2026-06-21T20:00:00.000Z",
    location: "Pine Ridge Grounds, Portland",
    imageUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=80",
    isFeatured: true,
    capacity: 1200,
    price: 49,
    tags: ["festival", "electronic", "outdoor"],
  },
  {
    id: "3",
    title: "Bearhood Creator Social",
    shortDescription: "Meet creatives, founders, and storytellers.",
    description:
      "A casual networking event built for creators and operators in media, design, and music. Expect panel chats, short showcases, and after-hours sessions.",
    date: "2026-04-28T18:00:00.000Z",
    location: "Studio Nine, Los Angeles",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
    isFeatured: false,
    capacity: 220,
    price: 15,
    tags: ["networking", "creative", "community"],
  },
  {
    id: "4",
    title: "Midnight Rooftop Sessions",
    shortDescription: "Late-night city views and curated house music.",
    description:
      "A premium rooftop session with rising producers, cinematic lighting, and skyline visuals designed for a high-energy yet intimate social vibe.",
    date: "2026-07-03T23:00:00.000Z",
    location: "Skyline Deck, Chicago",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80",
    isFeatured: false,
    capacity: 300,
    price: 35,
    tags: ["music", "rooftop", "social"],
  },
];

function mapSupabaseEvent(event: SupabaseEvent): EventItem {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    shortDescription: event.short_description,
    date: event.date,
    location: event.location,
    imageUrl: event.image_url,
    isFeatured: event.is_featured,
    capacity: event.capacity,
    price: Number(event.price),
    tags: event.tags ?? [],
  };
}

export async function getEvents(): Promise<EventItem[]> {
  if (!hasSupabaseConfig || !supabase) {
    return demoEvents;
  }

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  if (error || !data) {
    return demoEvents;
  }

  return data.map((event) => mapSupabaseEvent(event as SupabaseEvent));
}
