"use client";

import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import { socialLinks } from "@/lib/social-links";
import {
  EventbriteIcon,
  FacebookIcon,
  InstagramIcon,
  ResidentAdvisorIcon,
} from "@/components/footer-social-icons";
import { cn } from "@/lib/utils";

const linkClass =
  "rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Footer() {
  const locale = useLocale();
  return (
    <footer
      id="contact"
      className="mt-16 border-t border-border/80 bg-card/30"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 md:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {t(locale, "footer.tagline")}
          </p>
          <div className="flex flex-wrap items-center gap-1 sm:justify-end">
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
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Bearhood. {t(locale, "footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
