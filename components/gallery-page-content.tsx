"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Camera } from "lucide-react";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import {
  getGalleryBySlug,
  localizedTitle,
  localizedDescription,
} from "@/lib/galleries";
import { getUserRemovalRequests } from "@/lib/gallery-removal";
import { useAuth } from "@/lib/auth-context";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { cn } from "@/lib/utils";

export function GalleryPageContent({ slug }: { slug: string }) {
  const locale = useLocale();
  const { user } = useAuth();
  const gallery = getGalleryBySlug(slug);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [requestedIds, setRequestedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user || !gallery) return;
    let cancelled = false;
    getUserRemovalRequests(gallery.slug).then((ids) => {
      if (!cancelled) setRequestedIds(ids);
    });
    return () => {
      cancelled = true;
    };
  }, [user, gallery]);

  const handleRequestRemoval = useCallback((imageId: string) => {
    setRequestedIds((prev) => new Set(prev).add(imageId));
  }, []);

  if (!gallery) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-16">
        <p className="text-muted-foreground">Gallery not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-16">
      <Link
        href={`/${locale}/gallery`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {t(locale, "gallery.backToGallery")}
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {localizedTitle(gallery, locale)}
        </h1>
        <p className="mt-2 text-base text-muted-foreground md:text-lg">
          {localizedDescription(gallery, locale)}
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Camera className="h-4 w-4" />
          <span>
            {gallery.images.length} {t(locale, "gallery.photos")}
          </span>
        </div>
      </div>

      <div className="columns-2 gap-3 sm:columns-3 md:columns-4 lg:gap-4">
        {gallery.images.map((image, i) => (
          <button
            key={image.id}
            type="button"
            className={cn(
              "group relative mb-3 block w-full overflow-hidden rounded-lg lg:mb-4",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
            onClick={() => setLightboxIndex(i)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.id}
              className="w-full rounded-lg object-cover transition-transform duration-200 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-end rounded-lg bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
              <span className="px-2.5 pb-2.5 text-xs font-medium text-white/90">
                {image.id}
              </span>
            </div>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={gallery.images}
          gallerySlug={gallery.slug}
          initialIndex={lightboxIndex}
          requestedIds={requestedIds}
          onRequestRemoval={handleRequestRemoval}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
