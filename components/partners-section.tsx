"use client";

import boilerSponsor from "@BearhoodAssets/SponsorLogo/boiler.svg";
import gayroyalSponsor from "@BearhoodAssets/SponsorLogo/gayroyal.svg";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";

function sponsorSrc(asset: string | { src: string }): string {
  return typeof asset === "string" ? asset : asset.src;
}

export function PartnersSection() {
  const locale = useLocale();

  return (
    <section
      className="mt-4 md:mt-6"
      aria-label={t(locale, "events.partnersSectionLabel")}
    >
      <div className="rounded-2xl border border-border/70 bg-card/60 px-5 py-6 shadow-sm md:px-8 md:py-7">
        <p className="mb-5 text-center text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground md:text-left">
          {t(locale, "events.partners")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:justify-start md:gap-x-14">
          <a
            href="https://www.boilerberlin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="touch-manipulation rounded-lg p-2 opacity-90 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Boiler Berlin"
          >
            <img
              src={sponsorSrc(boilerSponsor)}
              alt=""
              className="h-10 w-auto max-w-[140px] object-contain dark:invert md:h-11"
            />
          </a>
          <a
            href="https://www.gayroyal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="touch-manipulation rounded-lg p-2 opacity-90 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="GayRoyal"
          >
            <img
              src={sponsorSrc(gayroyalSponsor)}
              alt=""
              className="h-10 w-auto max-w-[140px] object-contain dark:invert md:h-11"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
