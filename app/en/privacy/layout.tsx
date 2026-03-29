import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Bearhood",
  description:
    "How Bearhood handles personal data: website hosting, Supabase account features, local preferences, and your rights.",
};

export default function PrivacyEnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
