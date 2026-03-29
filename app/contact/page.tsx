"use client";

import { useRef, useState } from "react";
import { Loader2, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import { submitContactMessage } from "@/lib/contact";
import { socialLinks } from "@/lib/social-links";
import {
  InstagramIcon,
  FacebookIcon,
  EventbriteIcon,
  ResidentAdvisorIcon,
} from "@/components/footer-social-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const socialIconClass =
  "rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function ContactPage() {
  const locale = useLocale();

  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (honeypot) {
      toast.success(t(locale, "contact.formSuccess"));
      return;
    }

    if (!formRef.current?.reportValidity()) return;

    setSubmitting(true);
    const { error } = await submitContactMessage({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    if (error) {
      toast.error(t(locale, "contact.formError"));
    } else {
      toast.success(t(locale, "contact.formSuccess"));
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }
    setSubmitting(false);
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-16">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {t(locale, "contact.pageTitle")}
        </h1>
        <p className="mt-2 text-base text-muted-foreground md:text-lg">
          {t(locale, "contact.pageDescription")}
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Content */}
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              {t(locale, "contact.contentTitle")}
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {t(locale, "contact.contentBody")}
            </p>
          </div>

          <Separator className="bg-border/60" />

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">{t(locale, "contact.emailLabel")}</p>
              <a
                href={`mailto:${t(locale, "contact.emailValue")}`}
                className="mt-1 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                {t(locale, "contact.emailValue")}
              </a>
            </div>

            <div>
              <p className="text-sm font-medium">{t(locale, "contact.socialLabel")}</p>
              <div className="mt-2 flex flex-wrap items-center gap-1">
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(locale, "footer.socialInstagram")}
                  className={cn(socialIconClass, "touch-manipulation")}
                >
                  <InstagramIcon />
                </a>
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(locale, "footer.socialFacebook")}
                  className={cn(socialIconClass, "touch-manipulation")}
                >
                  <FacebookIcon />
                </a>
                <a
                  href={socialLinks.eventbrite}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(locale, "footer.socialEventbrite")}
                  className={cn(socialIconClass, "touch-manipulation")}
                >
                  <EventbriteIcon />
                </a>
                <a
                  href={socialLinks.residentAdvisor}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(locale, "footer.socialResidentAdvisor")}
                  className={cn(socialIconClass, "touch-manipulation")}
                >
                  <ResidentAdvisorIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card className="border-border/60 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 md:p-8">
            <form ref={formRef} onSubmit={(e) => void handleSubmit(e)} className="space-y-5" noValidate={false}>
              {/* Honeypot — invisible to humans, auto-filled by bots */}
              <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-name">{t(locale, "contact.formName")}</Label>
                <Input
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t(locale, "contact.formNamePlaceholder")}
                  required
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">{t(locale, "contact.formEmail")}</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t(locale, "contact.formEmailPlaceholder")}
                  required
                  maxLength={200}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-subject">{t(locale, "contact.formSubject")}</Label>
                <Input
                  id="contact-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={t(locale, "contact.formSubjectPlaceholder")}
                  required
                  maxLength={200}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message">{t(locale, "contact.formMessage")}</Label>
                <Textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t(locale, "contact.formMessagePlaceholder")}
                  required
                  maxLength={2000}
                  className="min-h-32"
                />
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                    {t(locale, "contact.formSubmitting")}
                  </>
                ) : (
                  <>
                    <Send className="mr-1.5 h-4 w-4" />
                    {t(locale, "contact.formSubmit")}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
