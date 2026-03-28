"use client";

import Link from "next/link";
import { Camera } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import { socialLinks } from "@/lib/social-links";
import { cn } from "@/lib/utils";

export function AboutSection() {
  const locale = useLocale();

  return (
    <section
      id="about"
      className="relative left-1/2 mt-16 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-hidden border-y border-border/60 bg-muted/40 py-16 md:mt-20 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between md:gap-12 md:px-6">
        <div className="max-w-xl space-y-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t(locale, "about.title")}</h2>
          <p className="text-base leading-8 text-muted-foreground md:text-lg md:leading-9">
            {t(locale, "about.body")}
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm md:max-w-sm">
          <p className="text-sm text-muted-foreground">{t(locale, "about.followHint")}</p>
          <Link
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "inline-flex h-12 w-full touch-manipulation items-center justify-center gap-2 sm:w-auto",
            )}
          >
            <Camera className="h-5 w-5 shrink-0" aria-hidden />
            {t(locale, "about.followCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
