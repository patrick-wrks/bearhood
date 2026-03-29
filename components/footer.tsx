"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import { socialLinks } from "@/lib/social-links";
import {
  EventbriteIcon,
  FacebookIcon,
  InstagramIcon,
  ResidentAdvisorIcon,
} from "@/components/footer-social-icons";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const linkClass =
  "rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const footerLinkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm";

export function Footer() {
  const locale = useLocale();
  const homeHref = `/${locale}`;
  const eventsHref = `${homeHref}#events`;
  const aboutHref = `${homeHref}#about`;
  const faqHref = `${homeHref}#faq`;

  const contactHref = `/${locale}/contact`;

  return (
    <footer className="mt-16 border-t border-border/80 bg-card/30">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-1">
            <p className="text-sm font-semibold text-foreground">{t(locale, "footer.navCommunity")}</p>
            <nav className="flex flex-col gap-2" aria-label={t(locale, "footer.navCommunity")}>
              <Link href={eventsHref} className={cn(footerLinkClass, "inline-flex min-h-11 items-center py-1 touch-manipulation")}>
                {t(locale, "footer.linkEvents")}
              </Link>
              <Link href={aboutHref} className={cn(footerLinkClass, "inline-flex min-h-11 items-center py-1 touch-manipulation")}>
                {t(locale, "footer.linkAbout")}
              </Link>
              <Link href={faqHref} className={cn(footerLinkClass, "inline-flex min-h-11 items-center py-1 touch-manipulation")}>
                {t(locale, "footer.linkFaq")}
              </Link>
              <Link href={contactHref} className={cn(footerLinkClass, "inline-flex min-h-11 items-center py-1 touch-manipulation")}>
                {t(locale, "footer.linkContact")}
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">{t(locale, "footer.navLegal")}</p>
            <nav className="flex flex-col gap-2" aria-label={t(locale, "footer.navLegal")}>
              <Link
                href={`/${locale}/privacy/`}
                className={cn(footerLinkClass, "inline-flex min-h-11 items-center py-1 touch-manipulation")}
              >
                {t(locale, "footer.linkPrivacy")}
              </Link>
              <Link
                href={`/${locale}/imprint/`}
                className={cn(footerLinkClass, "inline-flex min-h-11 items-center py-1 touch-manipulation")}
              >
                {t(locale, "footer.linkImprint")}
              </Link>
            </nav>
          </div>

          <div className="space-y-3 lg:col-span-1">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(locale, "footer.tagline")}
            </p>
            <div className="flex flex-wrap items-center gap-1">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(locale, "footer.socialInstagram")}
                className={cn(linkClass, "touch-manipulation")}
              >
                <InstagramIcon />
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(locale, "footer.socialFacebook")}
                className={cn(linkClass, "touch-manipulation")}
              >
                <FacebookIcon />
              </a>
              <a
                href={socialLinks.eventbrite}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(locale, "footer.socialEventbrite")}
                className={cn(linkClass, "touch-manipulation")}
              >
                <EventbriteIcon />
              </a>
              <a
                href={socialLinks.residentAdvisor}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(locale, "footer.socialResidentAdvisor")}
                className={cn(linkClass, "touch-manipulation")}
              >
                <ResidentAdvisorIcon />
              </a>
            </div>
          </div>
        </div>

        <Separator className="bg-border/60" />

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Bearhood. {t(locale, "footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
