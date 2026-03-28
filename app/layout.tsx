import type { Metadata, Viewport } from "next";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://patrick-wrks.github.io/bearhood";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

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
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg"
            >
              Skip to content
            </a>
            <Navbar />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
