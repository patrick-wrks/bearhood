"use client";

import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";

export function AboutSection() {
  const locale = useLocale();

  return (
    <section
      id="about"
      className="space-y-3 rounded-2xl border border-border/80 bg-card/50 p-6"
    >
      <h3 className="text-xl font-semibold">{t(locale, "about.title")}</h3>
      <p className="text-sm leading-7 text-muted-foreground">{t(locale, "about.body")}</p>
    </section>
  );
}

