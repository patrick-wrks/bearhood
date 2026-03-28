"use client";

import { Camera, Music2, Play } from "lucide-react";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import { socialLinks } from "@/lib/social-links";

export function Footer() {
  const locale = useLocale();
  return (
    <footer
      id="contact"
      className="mt-16 border-t border-border/80 bg-card/30"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 md:px-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {t(locale, "footer.tagline")}
          </p>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-foreground"
            >
              <Camera className="h-5 w-5" />
            </a>
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-foreground"
            >
              <Play className="h-5 w-5" />
            </a>
            <a
              href={socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-foreground"
            >
              <Music2 className="h-5 w-5" />
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
