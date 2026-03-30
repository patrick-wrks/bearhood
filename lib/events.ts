import { hasSupabaseConfig, supabase } from "@/lib/supabase";
import type { EventItem } from "@/lib/types";
import type { Locale } from "@/lib/i18n/locales";

import bannerNaughty from "@BearhoodAssets/Banner-Naughty-2.webp";
import bannerNaughtyText from "@BearhoodAssets/Banner-Naughty-2_text.webp";
import bannerBearaoke from "@BearhoodAssets/Banner-Bearaoke.webp";
import bannerBearaokeText from "@BearhoodAssets/Banner-Bearaoke_text.webp";
import logoNaughty from "@BearhoodAssets/NaughtyLogo.webp";
import logoBearaoke from "@BearhoodAssets/BearaokeLogo.webp";

function assetToSrc(asset: { src: string } | string): string {
  return typeof asset === "string" ? asset : asset.src;
}

export function localizedDescription(event: EventItem, locale: Locale): string {
  return (locale === "de" && event.descriptionDe) || event.description;
}

export function localizedTitle(event: EventItem, locale: Locale): string {
  return (locale === "de" && event.titleDe) || event.title;
}

export function localizedShortDescription(event: EventItem, locale: Locale): string {
  return (locale === "de" && event.shortDescriptionDe) || event.shortDescription;
}

type SupabaseEvent = {
  id: string;
  title: string;
  title_de?: string;
  description: string;
  description_de?: string;
  short_description: string;
  short_description_de?: string;
  date: string;
  location: string;
  image_url: string;
  logo_url?: string;
  hero_image_url?: string;
  ticket_url?: string;
  learn_more_url?: string;
  is_featured: boolean;
  capacity: number;
  price: number;
  tags: string[];
};

export const demoEvents: EventItem[] = [
  {
    id: "naughty-club-edition",
    title: "Naughty! club edition",
    titleDe: "Naughty! club edition",
    shortDescription:
      "Naked Industries meets raw desire in dim industrial light.",
    shortDescriptionDe:
      "Naked Industries trifft auf rohes Verlangen im ged\u00e4mpften Industrielicht.",
    description:
      "Naked Industries<br><br>Worker attitude meets raw desire. Boots on concrete, harness on skin, helmets, suspenders, and industrial vibes in the dim light. Masculine, direct, uncompromising. Here, there is sweat, play, and work \u2014 on the body, in the gaze, in the tension between closeness and dominance.<br><br>Dress it rugged. Wear it proud.",
    descriptionDe:
      "Naked Industries<br><br>Worker-Attitude trifft auf rohes Verlangen. Stiefel auf Beton, Harness auf Haut, Helme, Hosentr\u00e4ger und industrieller Vibe im ged\u00e4mpften Licht. Maskulin, direkt, kompromisslos. Hier wird geschwitzt, gespielt und gearbeitet \u2013 am K\u00f6rper, im Blick, in der Spannung zwischen N\u00e4he und Dominanz.<br><br>Zieh es rau an. Trag es stolz.",
    date: "2026-03-29T18:00:00+02:00",
    location: "Club Culture Houze, G\u00f6rlitzer Str. 71, 10997 Berlin",
    imageUrl: assetToSrc(bannerNaughty),
    logoUrl: assetToSrc(logoNaughty),
    heroImageUrl: assetToSrc(bannerNaughtyText),
    ticketUrl:
      "https://www.club-culture-houze.de/Veranstaltung/b-2/?instance_id=38619",
    learnMoreUrl:
      "https://www.club-culture-houze.de/Veranstaltung/b-2/?instance_id=38619",
    isFeatured: true,
    capacity: 300,
    price: 0,
    tags: ["cruising", "fetish"],
  },
  {
    id: "bearoke",
    title: "Bearaoke",
    titleDe: "Bearaoke",
    shortDescription:
      "A legendary Bearhood tradition is back: BEARAOKE \u2013 karaoke, box hopping, and good vibes.",
    shortDescriptionDe:
      "Eine legend\u00e4re Bearhood-Tradition ist zur\u00fcck: BEARAOKE \u2013 Karaoke, Box-Hopping und gute Vibes.",
    description:
      "A legendary Bearhood tradition from long before COVID is finally back!<br><br>This Maundy Thursday, we\u2019re bringing BEARAOKE back to life \u2013 loud, warm-hearted and wonderfully unapologetic.<br><br>Everyone is welcome to sing. Pick your favorite song, grab the mic or simply sing along at the top of your lungs \u2013 whether you\u2019re a stage pro or a shower singer. It\u2019s all about fun, community and good vibes.<br><br>Hosted on stage by the fabulous Monnica Bearvisky, guiding you through the night with charm, humor and a touch of glam.<br><br>\u2728 What to expect:<br>\u2022 Karaoke stage show & free box hopping<br>\u2022 Optional beer flat for \u20ac25, available on site \ud83c\udf7a<br>\u2022 Free cloakroom<br>\u2022 Darkroom for those who want to explore deeper tones later on<br>\u2022 An open, respectful and welcoming atmosphere<br><br>Whether you\u2019ve been part of BEARAOKE back in the day or are joining for the first time: come together, sing it out and celebrate the return of a true tradition.<br><br>More info coming soon \u2013 we can\u2019t wait to see you!",
    descriptionDe:
      "Eine legend\u00e4re Tradition aus der Zeit lange vor Corona ist zur\u00fcck!<br><br>Am Gr\u00fcndonnerstag feiern wir die Wiederbelebung von BEARAOKE \u2013 laut, herzlich und herrlich ungezwungen.<br><br>Jeder darf mitsingen. Such dir deinen Lieblingssong aus, schnapp dir das Mikro oder sing einfach aus vollem Herzen mit \u2013 ganz egal, ob du B\u00fchnenprofi bist oder nur unter der Dusche \u00fcbst. Hier geht es um Spa\u00df, Gemeinschaft und gute Vibes.<br><br>Durch den Abend f\u00fchrt euch u.\u00a0a. Monnica Bearvisky mit Charme, Humor und Glamour durch die B\u00fchnenshow.<br><br>\u2728 Was euch erwartet:<br>\u2022 Karaoke-B\u00fchnenshow & kostenloses Box-Hopping<br>\u2022 Optionale Bierflat f\u00fcr 25\u00a0\u20ac, vor Ort erh\u00e4ltlich \ud83c\udf7a<br>\u2022 Kostenfreie Garderobe<br>\u2022 Darkroom f\u00fcr alle, die nach dem Singen noch andere T\u00f6ne anschlagen wollen<br>\u2022 Offene, respektvolle Atmosph\u00e4re<br><br>Ob alte BEARAOKE-Stimmen oder neue Gesichter: Komm vorbei, sing dich frei und erlebe mit uns das Comeback einer echten Tradition.<br><br>Weitere Infos folgen \u2013 wir freuen uns auf euch!",
    date: "2026-04-02T20:00:00+02:00",
    location:
      "Monster Ronson\u2019s Ichiban Karaoke, Warschauer Str. 34, 10243 Berlin",
    imageUrl: assetToSrc(bannerBearaoke),
    logoUrl: assetToSrc(logoBearaoke),
    heroImageUrl: assetToSrc(bannerBearaokeText),
    ticketUrl:
      "https://www.eventbrite.de/e/bearaoke-the-return-tickets-1982241454551?aff=web",
    learnMoreUrl:
      "https://www.eventbrite.de/e/bearaoke-the-return-tickets-1982241454551?aff=web",
    isFeatured: true,
    capacity: 400,
    price: 0,
    tags: ["party", "social", "cruising"],
  },
];

function mapSupabaseEvent(event: SupabaseEvent): EventItem {
  const demoMatch = demoEvents.find((demoEvent) => demoEvent.id === event.id);

  return {
    id: event.id,
    title: event.title,
    titleDe: event.title_de ?? demoMatch?.titleDe,
    description: event.description,
    descriptionDe: event.description_de ?? demoMatch?.descriptionDe,
    shortDescription: event.short_description,
    shortDescriptionDe: event.short_description_de ?? demoMatch?.shortDescriptionDe,
    date: event.date,
    location: event.location,
    imageUrl: event.image_url,
    logoUrl: event.logo_url,
    heroImageUrl: event.hero_image_url,
    ticketUrl: event.ticket_url,
    learnMoreUrl: event.learn_more_url,
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
