import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AppProviders } from "@/components/app-providers";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://patrick-wrks.github.io/bearhood";

export const metadata: Metadata = {
  title: "Bearhood | Social Media Event Brand",
  description: "Explore upcoming Bearhood events, festival drops, and community socials.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Bearhood | Social Media Event Brand",
    description: "Discover the next wave of bear community events — parties, socials, and immersive nights.",
    url: siteUrl,
    siteName: "Bearhood",
    locale: "en",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Bearhood | Social Media Event Brand",
    description: "Discover the next wave of bear community events — parties, socials, and immersive nights.",
  },
  icons: {
    icon: {
      url: "/favicon.png",
      type: "image/png",
    },
    shortcut: {
      url: "/favicon.png",
      type: "image/png",
    },
    apple: {
      url: "/apple-touch-icon.png",
      type: "image/png",
      sizes: "180x180",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full font-sans">
        <AppProviders>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
