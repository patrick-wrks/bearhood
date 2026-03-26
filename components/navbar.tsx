"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import logo from "@BearhoodAssets/Logo.png";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-2 text-lg font-semibold tracking-wide" href="/">
          <Image
            src={logo}
            alt="Bearhood"
            width={28}
            height={28}
            priority
            className="h-7 w-7"
          />
          <span>BEARHOOD</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#events" className="transition-colors hover:text-foreground">
            Events
          </a>
          <Link href="/ui-foundation" className="transition-colors hover:text-foreground">
            UI Foundation
          </Link>
          <a href="#about" className="transition-colors hover:text-foreground">
            About
          </a>
          <a href="#contact" className="transition-colors hover:text-foreground">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button size="sm" className="hidden md:inline-flex">
            Join Waitlist
          </Button>
          <Button size="icon" variant="outline" className="md:hidden" aria-label="Menu">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
