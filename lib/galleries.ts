import type { Locale } from "@/lib/i18n/locales";

export type GalleryImage = {
  id: string;
  src: string;
};

export type Gallery = {
  slug: string;
  title: string;
  titleDe: string;
  date: string;
  description: string;
  descriptionDe: string;
  coverImage: string;
  idPrefix: string;
  images: GalleryImage[];
};

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://xitzmarhnobazxbuthjy.supabase.co";

function storageUrl(bucket: string, path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}

function buildImages(
  slug: string,
  prefix: string,
  numbers: number[],
): GalleryImage[] {
  return numbers.map((n) => ({
    id: `${prefix}-${String(n).padStart(3, "0")}`,
    src: storageUrl("gallery", `${slug}/sparkle-${n}.webp`),
  }));
}

const SPARKLE_IMAGE_NUMBERS = [
  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 35, 36, 37, 38, 39, 40, 42, 43, 44,
  51, 55, 61, 69, 76, 83, 90, 100, 103, 111, 117, 124, 128, 137, 144, 150,
  158, 165, 173, 180, 186, 194, 200, 208, 216, 222, 227, 236, 239, 247, 256,
  262, 270, 275, 282, 289, 298, 301, 311, 316,
];

const galleries: Gallery[] = [
  {
    slug: "sparkle-spectacle",
    title: "Sparkle Spectacle",
    titleDe: "Sparkle Spectacle",
    date: "2025-12-14",
    description:
      "Relive the magic of Sparkle Spectacle — a night of glitter, beats, and unforgettable moments.",
    descriptionDe:
      "Erlebe die Magie von Sparkle Spectacle noch einmal — eine Nacht voller Glitzer, Beats und unvergesslicher Momente.",
    coverImage: storageUrl(
      "gallery",
      "sparkle-spectacle/sparkle-42.webp",
    ),
    idPrefix: "SS",
    images: buildImages("sparkle-spectacle", "SS", SPARKLE_IMAGE_NUMBERS),
  },
];

export function getAllGalleries(): Gallery[] {
  return galleries;
}

export function getGalleryBySlug(slug: string): Gallery | undefined {
  return galleries.find((g) => g.slug === slug);
}

export function localizedTitle(gallery: Gallery, locale: Locale): string {
  return locale === "de" && gallery.titleDe
    ? gallery.titleDe
    : gallery.title;
}

export function localizedDescription(
  gallery: Gallery,
  locale: Locale,
): string {
  return locale === "de" && gallery.descriptionDe
    ? gallery.descriptionDe
    : gallery.description;
}
