"use client";

import { Separator } from "@/components/ui/separator";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";

export function BrandStatement() {
  const locale = useLocale();

  return (
    <section
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-hidden bg-muted/30 py-16 md:py-20"
      aria-labelledby="brand-heading"
    >
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Bearhood
        </p>
        <h2
          id="brand-heading"
          className="text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.5rem] lg:leading-tight"
        >
          {t(locale, "brand.title")}
        </h2>
        <Separator className="mx-auto my-8 max-w-xs bg-border/80" />
        <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg md:leading-relaxed">
          {t(locale, "brand.subtitle")}
        </p>
      </div>
    </section>
  );
}
