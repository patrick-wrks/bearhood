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
    id: "naughty-club-edition",
    title: "Naughty! club edition",
    shortDescription: "Naked Industries meets raw desire in dim industrial light.",
    description:
      "Naked Industries <br>Worker-Attitude meets raw desire. Boots on concrete, harness on skin, helmets, suspenders, and industrial vibes in the dim light. Masculine, direct, uncompromising. Here, there is sweat, play, and work—on the body, in the gaze, in the tension between closeness and dominance..<br>Dress it rugged. Wear it proud.",
    date: "2026-03-29T18:00:00+02:00",
    location:
      "Club Culture Houze Görlitzerstraße 71, 10997 Berlin.",
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80",
    isFeatured: true,
    capacity: 300,
    price: 0,
    tags: ["cruising", "fetish"],
  },
  {
    id: "bearoke",
    title: "Bearoke",
    shortDescription:
      "A legendary Bearhood tradition is back: BEARAOKE with karaoke + box hopping.",
    description:
      "Eine legendäre Tradition aus der Zeit lange vor Corona ist zurück!<br><br>Am Gründonnerstag feiern wir die Wiederbelebung von BEARAOKE – laut, herzlich und herrlich ungezwungen.<br><br>Jeder darf mitsingen.<br>Such dir deinen Lieblingssong aus, schnapp dir das Mikro oder sing einfach aus vollem Herzen mit – ganz egal, ob du Bühnenprofi bist oder nur unter der Dusche übst. Hier geht es um Spaß, Gemeinschaft und gute Vibes.<br><br>Durch den Abend führt euch u. a. Monnica Bearvisky mit Charme, Humor und Glamour durch die Bühnenshow.<br><br>✨ Was euch erwartet:<br>Karaoke-Bühnenshow & kostenloses Box-Hopping<br>Optionale Bierflat für 25 €, vor Ort erhältlich 🍺<br>Kostenfreie Garderobe<br>Darkroom für alle, die nach dem Singen noch andere Töne anschlagen wollen<br>Offene, respektvolle Atmosphäre<br>Ob alte BEARAOKE-Stimmen oder neue Gesichter: Komm vorbei, sing dich frei und erlebe mit uns das Comeback einer echten Tradition.<br>Weitere Infos folgen – wir freuen uns auf euch!<br>__________________________________<br><br>A legendary Bearhood tradition from long before COVID is finally back!<br><br>This Maundy Thursday, we’re bringing BEARAOKE back to life – loud, warm-hearted and wonderfully unapologetic.<br><br>Everyone is welcome to sing.<br>Pick your favorite song, grab the mic or simply sing along at the top of your lungs – whether you’re a stage pro or a shower singer. It’s all about fun, community and good vibes.<br><br>Hosted on stage by the fabulous Monnica Bearvisky, guiding you through the night with charm, humor and a touch of glam.<br><br>✨ What to expect:<br>Karaoke stage show & free box hopping<br>Optional beer flat for €25, available on site 🍺<br>Free cloakroom<br>Darkroom for those who want to explore deeper tones later on<br>An open, respectful and welcoming atmosphere<br>Whether you’ve been part of BEARAOKE back in the day or are joining for the first time: Come together, sing it out and celebrate the return of a true tradition.<br>More info coming soon – we can’t wait to see you!",
    date: "2026-04-02T20:00:00+02:00",
    location:
      "Monster Ronson's Ichiban Karaoke, Warschauer Straße 34, 10243 Berlin",
    imageUrl:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=80",
    isFeatured: true,
    capacity: 400,
    price: 0,
    tags: ["party", "social", "cruising"],
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

  if (error || !data || data.length === 0) {
    return demoEvents;
  }

  return data.map((event) => mapSupabaseEvent(event as SupabaseEvent));
}
