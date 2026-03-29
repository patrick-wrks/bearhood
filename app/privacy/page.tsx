"use client";

import { LegalDocument } from "@/components/legal-document";
import { useLocale } from "@/lib/i18n/use-locale";
import { privacyContent } from "@/lib/legal/privacy";

export default function PrivacyPage() {
  const locale = useLocale();
  return <LegalDocument content={privacyContent[locale]} />;
}
