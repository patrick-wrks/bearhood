"use client";

import { useEffect, useState } from "react";
import { CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLocale } from "@/lib/i18n/use-locale";
import { t, type MessageKey } from "@/lib/i18n/messages";
import { useInViewOnce } from "@/lib/use-in-view-once";
import { cn } from "@/lib/utils";

function useAnimatedCount(target: number, active: boolean, durationMs = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    let start: number | null = null;

    const step = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start;
      const t = Math.min(elapsed / durationMs, 1);
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(target * eased));
      if (t < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, durationMs]);

  return active ? value : 0;
}

type StatDef = {
  labelKey: MessageKey;
  value: number;
  suffix?: string;
};

const STATS: StatDef[] = [
  { labelKey: "stats.events", value: 48, suffix: "+" },
  { labelKey: "stats.members", value: 1200, suffix: "+" },
  { labelKey: "stats.cities", value: 6, suffix: "+" },
  { labelKey: "stats.partners", value: 14, suffix: "+" },
];

function StatCard({
  labelKey,
  target,
  suffix,
  active,
}: {
  labelKey: MessageKey;
  target: number;
  suffix?: string;
  active: boolean;
}) {
  const locale = useLocale();
  const n = useAnimatedCount(target, active);

  return (
    <Card className="border-border/80 bg-card/90 shadow-sm">
      <CardContent className="flex flex-col gap-1 px-5 py-6 text-center md:px-6">
        <p className="text-3xl font-bold tabular-nums tracking-tight md:text-4xl">
          {n}
          {suffix ?? ""}
        </p>
        <p className="text-sm font-medium text-muted-foreground">{t(locale, labelKey)}</p>
      </CardContent>
    </Card>
  );
}

export function CommunityStats() {
  const locale = useLocale();
  const { ref, inView } = useInViewOnce();

  return (
    <section
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-hidden border-y border-border/60 bg-muted/35 py-16 md:py-20"
      aria-labelledby="stats-heading"
    >
      <div ref={ref} className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {t(locale, "stats.sectionLabel")}
            </p>
            <h2 id="stats-heading" className="text-3xl font-bold tracking-tight md:text-4xl">
              {t(locale, "stats.title")}
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              {t(locale, "stats.description")}
            </p>
          </div>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-11 min-h-11 shrink-0 touch-manipulation gap-2 self-start md:self-auto",
                  )}
                  aria-label={t(locale, "stats.tooltip")}
                />
              }
            >
              <CircleHelp className="h-4 w-4" aria-hidden />
              <span className="text-xs font-medium">{t(locale, "stats.sectionLabel")}</span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs text-center">
              {t(locale, "stats.tooltip")}
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <StatCard
              key={s.labelKey}
              labelKey={s.labelKey}
              target={s.value}
              suffix={s.suffix}
              active={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
