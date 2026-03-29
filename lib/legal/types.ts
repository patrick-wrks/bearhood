import type { Locale } from "@/lib/i18n/locales";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export type LegalDocumentContent = {
  title: string;
  intro?: string;
  sections: LegalSection[];
};

export type LocalizedLegalContent = Record<Locale, LegalDocumentContent>;
