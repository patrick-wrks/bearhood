import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | Bearhood",
  description:
    "Impressum und rechtliche Hinweise zu Bearhood: Anbieterkennzeichnung, Haftung, Urheberrecht und externe Links.",
};

export default function ImprintDeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
