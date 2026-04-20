"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import { subscribeToNewsletter } from "@/lib/newsletter";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function NewsletterSection() {
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      toast.error(t(locale, "newsletter.invalid"));
      return;
    }
    setSubmitting(true);
    const { error } = await subscribeToNewsletter(trimmed, locale);
    setSubmitting(false);
    if (error) {
      toast.error(t(locale, "newsletter.error"));
      return;
    }
    toast.success(t(locale, "newsletter.success"));
    setEmail("");
  };

  return (
    <section
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-hidden bg-primary py-16 text-primary-foreground md:py-20"
      aria-labelledby="newsletter-heading"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">
            {t(locale, "newsletter.sectionLabel")}
          </p>
          <h2 id="newsletter-heading" className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            {t(locale, "newsletter.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-primary-foreground/90 md:text-base">
            {t(locale, "newsletter.description")}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:mx-auto sm:flex-row sm:items-stretch"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            {t(locale, "newsletter.placeholder")}
          </label>
          <Input
            id="newsletter-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder={t(locale, "newsletter.placeholder")}
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="h-12 min-h-12 border-primary-foreground/25 bg-primary-foreground/10 text-base text-primary-foreground placeholder:text-primary-foreground/55 focus-visible:ring-primary-foreground/40 md:flex-1"
          />
          <Button
            type="submit"
            size="lg"
            variant="secondary"
            disabled={submitting}
            className="h-12 min-h-12 shrink-0 touch-manipulation px-8 font-semibold"
          >
            {submitting ? t(locale, "newsletter.submitting") : t(locale, "newsletter.submit")}
          </Button>
        </form>
      </div>
    </section>
  );
}
