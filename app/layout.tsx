import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProviders } from "@/components/app-providers";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bearhood | Social Media Event Brand",
  description: "Explore upcoming Bearhood events, festival drops, and community socials.",
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
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
