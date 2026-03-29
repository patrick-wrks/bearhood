"use client";

import boilerSponsor from "@BearhoodAssets/SponsorLogo/boiler.svg";
import gayroyalSponsor from "@BearhoodAssets/SponsorLogo/gayroyal.svg";
import dickwirtinSponsor from "@BearhoodAssets/SponsorLogo/dickwirtin.svg";
import woofSponsor from "@BearhoodAssets/SponsorLogo/woof.svg";
import metropolSponsor from "@BearhoodAssets/SponsorLogo/metropol.svg";
import clubCultureSponsor from "@BearhoodAssets/SponsorLogo/clubculturehouse.svg";
import saunaBoilerSponsor from "@BearhoodAssets/SponsorLogo/sauna-boiler.svg";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";

function sponsorSrc(asset: string | { src: string }): string {
  return typeof asset === "string" ? asset : asset.src;
}

const sponsors = [
  { logo: boilerSponsor, label: "Boiler Berlin", href: "https://www.boilerberlin.com" },
  { logo: gayroyalSponsor, label: "GayRoyal", href: "https://www.gayroyal.com" },
  { logo: dickwirtinSponsor, label: "Die Dickwirtin", href: "https://www.facebook.com/diedickwirtin/" },
  { logo: woofSponsor, label: "Woof Berlin", href: "https://www.woofberlin.com" },
  { logo: metropolSponsor, label: "Metropol", href: "https://www.metropol-berlin.de" },
  { logo: clubCultureSponsor, label: "Club Culture Houze", href: "https://www.club-culture-houze.de" },
  { logo: saunaBoilerSponsor, label: "Boiler Sauna", href: "https://www.boilerberlin.com" },
];

function SponsorLink({ sponsor }: { sponsor: (typeof sponsors)[number] }) {
  return (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 touch-manipulation rounded-lg px-5 py-2 opacity-80 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={sponsor.label}
    >
      <img
        src={sponsorSrc(sponsor.logo)}
        alt=""
        className="h-10 w-auto max-w-[140px] object-contain dark:invert md:h-11"
      />
    </a>
  );
}

export function PartnersSection() {
  const locale = useLocale();

  return (
    <section
      className="mt-4 md:mt-6"
      aria-label={t(locale, "events.partnersSectionLabel")}
    >
      <div className="rounded-2xl border border-border/70 bg-card/60 py-6 shadow-sm md:py-7">
        <p className="mb-5 px-5 text-center text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground md:px-8 md:text-left">
          {t(locale, "events.partners")}
        </p>
        <div className="marquee-container overflow-hidden">
          <div className="marquee-track flex w-max items-center" style={{ "--marquee-duration": "25s" } as React.CSSProperties}>
            {sponsors.map((s) => (
              <SponsorLink key={`a-${s.label}`} sponsor={s} />
            ))}
            {sponsors.map((s) => (
              <SponsorLink key={`b-${s.label}`} sponsor={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
