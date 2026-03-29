"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  CalendarDays,
  Heart,
  MessageSquare,
  PartyPopper,
  Tag,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/lib/i18n/use-locale";
import { t, type MessageKey } from "@/lib/i18n/messages";
import { useInViewOnce } from "@/lib/use-in-view-once";
import { cn } from "@/lib/utils";

type FeatureDef = {
  titleKey: MessageKey;
  bodyKey: MessageKey;
  badgeKey: MessageKey;
  icon: typeof PartyPopper;
};

const FEATURES: FeatureDef[] = [
  {
    titleKey: "features.celebrations.title",
    bodyKey: "features.celebrations.body",
    badgeKey: "features.celebrations.badge",
    icon: PartyPopper,
  },
  {
    titleKey: "features.hub.title",
    bodyKey: "features.hub.body",
    badgeKey: "features.hub.badge",
    icon: Users,
  },
  {
    titleKey: "features.experiences.title",
    bodyKey: "features.experiences.body",
    badgeKey: "features.experiences.badge",
    icon: MessageSquare,
  },
  {
    titleKey: "features.friendships.title",
    bodyKey: "features.friendships.body",
    badgeKey: "features.friendships.badge",
    icon: Heart,
  },
  {
    titleKey: "features.deals.title",
    bodyKey: "features.deals.body",
    badgeKey: "features.deals.badge",
    icon: Tag,
  },
  {
    titleKey: "features.calendar.title",
    bodyKey: "features.calendar.body",
    badgeKey: "features.calendar.badge",
    icon: CalendarDays,
  },
];

function FeatureReveal({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  const { ref, inView } = useInViewOnce();
  const style = inView
    ? ({ "--reveal-delay": `${Math.min(index * 55, 400)}ms` } as CSSProperties)
    : undefined;

  return (
    <div
      ref={ref}
      className={cn(
        !inView && "translate-y-3 opacity-0",
        inView && "event-card-reveal-ready",
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export function FeaturesSection() {
  const locale = useLocale();

  return (
    <section
      className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-20"
      aria-labelledby="features-heading"
    >
      <div className="mb-10 max-w-2xl space-y-3 md:mb-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {t(locale, "features.sectionLabel")}
        </p>
        <h2 id="features-heading" className="text-3xl font-bold tracking-tight md:text-4xl">
          {t(locale, "features.title")}
        </h2>
        <p className="text-base text-muted-foreground md:text-lg">
          {t(locale, "features.description")}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <FeatureReveal key={feature.titleKey} index={index}>
              <Card className="h-full border-border/80 bg-card/80 shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="space-y-3 pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <Badge variant="secondary" className="shrink-0 text-[10px] uppercase tracking-wide">
                      {t(locale, feature.badgeKey)}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-snug">{t(locale, feature.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm leading-relaxed">
                    {t(locale, feature.bodyKey)}
                  </CardDescription>
                </CardContent>
              </Card>
            </FeatureReveal>
          );
        })}
      </div>
    </section>
  );
}
