"use client";

import { Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useLocale } from "@/lib/i18n/use-locale";
import { t, type MessageKey } from "@/lib/i18n/messages";
import { cn } from "@/lib/utils";

type QuoteDef = {
  quoteKey: MessageKey;
  authorKey: MessageKey;
  initials: string;
};

const QUOTES: QuoteDef[] = [
  { quoteKey: "testimonials.q1", authorKey: "testimonials.a1", initials: "AL" },
  { quoteKey: "testimonials.q2", authorKey: "testimonials.a2", initials: "JO" },
  { quoteKey: "testimonials.q3", authorKey: "testimonials.a3", initials: "SA" },
];

export function TestimonialsSection() {
  const locale = useLocale();

  return (
    <section
      className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-20"
      aria-labelledby="testimonials-heading"
    >
      <div className="mb-10 max-w-2xl space-y-3 md:mb-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {t(locale, "testimonials.sectionLabel")}
        </p>
        <h2 id="testimonials-heading" className="text-3xl font-bold tracking-tight md:text-4xl">
          {t(locale, "testimonials.title")}
        </h2>
        <p className="text-base text-muted-foreground md:text-lg">
          {t(locale, "testimonials.description")}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {QUOTES.map((item, i) => (
          <Card
            key={item.quoteKey}
            className={cn(
              "border-border/80 bg-card/80 shadow-sm transition-shadow hover:shadow-md",
              i === 1 && "md:-translate-y-1 md:shadow-md",
            )}
          >
            <CardContent className="flex flex-col gap-5 p-6">
              <Quote className="h-8 w-8 text-primary/70" aria-hidden />
              <blockquote className="flex-1 text-sm leading-relaxed text-foreground md:text-[0.95rem]">
                &ldquo;{t(locale, item.quoteKey)}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 border-t border-border/60 pt-4">
                <Avatar className="size-10">
                  <AvatarFallback className="text-xs font-semibold">{item.initials}</AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{t(locale, item.authorKey)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
