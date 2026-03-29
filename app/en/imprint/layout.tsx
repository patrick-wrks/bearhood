import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Notice / Impressum | Bearhood",
  description:
    "Legal notice and imprint for Bearhood: responsible party, disclaimer, copyright, and third-party links.",
};

export default function ImprintEnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
