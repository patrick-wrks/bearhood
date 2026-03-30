"use client";

import { useState } from "react";
import Link from "next/link";
import { Camera } from "lucide-react";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import {
  getAllGalleries,
  localizedTitle,
  localizedDescription,
} from "@/lib/galleries";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function GalleryIndexPage() {
  const locale = useLocale();
  const galleries = getAllGalleries();
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-16">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {t(locale, "gallery.pageTitle")}
        </h1>
        <p className="mt-2 text-base text-muted-foreground md:text-lg">
          {t(locale, "gallery.pageDescription")}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleries.map((gallery) => (
          <Link
            key={gallery.slug}
            href={`/${locale}/gallery/${gallery.slug}`}
            className="group relative overflow-hidden rounded-xl border border-border/60 bg-card/50 transition-all hover:border-border hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {!loaded[gallery.slug] && (
                <Skeleton className="absolute inset-0 z-10 rounded-none" />
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gallery.coverImage}
                alt={localizedTitle(gallery, locale)}
                className={cn(
                  "h-full w-full object-cover transition-all duration-300 group-hover:scale-105",
                  loaded[gallery.slug] ? "opacity-100" : "opacity-0",
                )}
                loading="lazy"
                onLoad={() =>
                  setLoaded((prev) => ({ ...prev, [gallery.slug]: true }))
                }
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold tracking-tight">
                {localizedTitle(gallery, locale)}
              </h2>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {localizedDescription(gallery, locale)}
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Camera className="h-3.5 w-3.5" />
                <span>
                  {gallery.images.length} {t(locale, "gallery.photos")}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
