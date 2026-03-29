"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLocale } from "@/lib/i18n/use-locale";
import { t, type MessageKey } from "@/lib/i18n/messages";

type FaqItem = {
  id: string;
  qKey: MessageKey;
  aKey: MessageKey;
};

const FAQ_ITEMS: FaqItem[] = [
  { id: "faq-1", qKey: "faq.q1", aKey: "faq.a1" },
  { id: "faq-2", qKey: "faq.q2", aKey: "faq.a2" },
  { id: "faq-3", qKey: "faq.q3", aKey: "faq.a3" },
  { id: "faq-4", qKey: "faq.q4", aKey: "faq.a4" },
  { id: "faq-5", qKey: "faq.q5", aKey: "faq.a5" },
  { id: "faq-6", qKey: "faq.q6", aKey: "faq.a6" },
];

export function FaqSection() {
  const locale = useLocale();

  return (
    <section
      id="faq"
      className="mx-auto w-full max-w-3xl px-4 py-16 md:px-6 md:py-20"
      aria-labelledby="faq-heading"
    >
      <div className="mb-10 space-y-3 text-center md:mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {t(locale, "faq.sectionLabel")}
        </p>
        <h2 id="faq-heading" className="text-3xl font-bold tracking-tight md:text-4xl">
          {t(locale, "faq.title")}
        </h2>
        <p className="mx-auto max-w-lg text-base text-muted-foreground">
          {t(locale, "faq.description")}
        </p>
      </div>

      <Accordion className="rounded-2xl border border-border/80 bg-card/60 px-4 py-2 shadow-sm md:px-6">
        {FAQ_ITEMS.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
              {t(locale, item.qKey)}
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground leading-relaxed">{t(locale, item.aKey)}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
