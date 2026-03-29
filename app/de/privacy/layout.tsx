import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz | Bearhood",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten auf bearhood.de: Hosting, Supabase, lokale Einstellungen und Ihre Rechte.",
};

export default function PrivacyDeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
