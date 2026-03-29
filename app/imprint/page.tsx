"use client";

import { LegalDocument } from "@/components/legal-document";
import { useLocale } from "@/lib/i18n/use-locale";
import { imprintContent } from "@/lib/legal/imprint";

export default function ImprintPage() {
  const locale = useLocale();
  return <LegalDocument content={imprintContent[locale]} />;
}
