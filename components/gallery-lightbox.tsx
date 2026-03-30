"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Flag, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import { useAuth } from "@/lib/auth-context";
import { useAuthModal } from "@/lib/auth-modal-context";
import { requestImageRemoval } from "@/lib/gallery-removal";
import type { GalleryImage } from "@/lib/galleries";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type GalleryLightboxProps = {
  images: GalleryImage[];
  gallerySlug: string;
  initialIndex: number;
  requestedIds: Set<string>;
  onRequestRemoval: (imageId: string) => void;
  onClose: () => void;
};

export function GalleryLightbox({
  images,
  gallerySlug,
  initialIndex,
  requestedIds,
  onRequestRemoval,
  onClose,
}: GalleryLightboxProps) {
  const locale = useLocale();
  const { user } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [index, setIndex] = useState(initialIndex);
  const [submitting, setSubmitting] = useState(false);
  const [loadedIndex, setLoadedIndex] = useState<number | null>(null);

  const imageLoaded = loadedIndex === index;
  const image = images[index];
  const isRequested = requestedIds.has(image.id);

  const goPrev = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : images.length - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (i < images.length - 1 ? i + 1 : 0));
  }, [images.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  async function handleRemoval() {
    if (!user) {
      openAuthModal();
      return;
    }
    setSubmitting(true);
    const { error } = await requestImageRemoval(
      image.id,
      gallerySlug,
      user.id,
    );
    if (error) {
      toast.error(error);
    } else {
      onRequestRemoval(image.id);
    }
    setSubmitting(false);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={image.id}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-3 top-3 z-10 rounded-full text-white hover:bg-white/20 hover:text-white"
        onClick={onClose}
        aria-label={t(locale, "gallery.closeLightbox")}
      >
        <X className="h-5 w-5" />
      </Button>

      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full text-white hover:bg-white/20 hover:text-white md:left-4"
            onClick={goPrev}
            aria-label={t(locale, "gallery.previousImage")}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full text-white hover:bg-white/20 hover:text-white md:right-4"
            onClick={goNext}
            aria-label={t(locale, "gallery.nextImage")}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      <div className="flex max-h-[90vh] max-w-[90vw] flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
          {!imageLoaded && (
            <Skeleton className="h-[50vh] w-[60vw] max-w-[600px] rounded-lg" />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={`${image.id}`}
            className={cn(
              "max-h-[75vh] max-w-full rounded-lg object-contain transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "absolute opacity-0",
            )}
            draggable={false}
            onLoad={() => setLoadedIndex(index)}
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="rounded-md bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white/80">
            {t(locale, "gallery.imageId")}: {image.id}
          </span>

          {isRequested ? (
            <div className="flex flex-col items-center gap-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-300">
                <Flag className="h-3 w-3" />
                {t(locale, "gallery.removalRequested")}
              </span>
              <p className="max-w-xs text-center text-xs text-white/50">
                {t(locale, "gallery.removalDescription")}
              </p>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-xs text-white/60 hover:bg-white/10 hover:text-white",
                submitting && "pointer-events-none opacity-50",
              )}
              onClick={() => void handleRemoval()}
              disabled={submitting}
            >
              <Flag className="mr-1.5 h-3 w-3" />
              {user
                ? t(locale, "gallery.requestRemoval")
                : t(locale, "gallery.signInToRequest")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
