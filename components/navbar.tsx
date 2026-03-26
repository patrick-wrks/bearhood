"use client";

import { CalendarDays, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-2 text-lg font-semibold tracking-wide" href="/">
          <CalendarDays className="h-5 w-5 text-primary" />
          <span>BEARHOOD</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#events" className="transition-colors hover:text-foreground">
            Events
          </a>
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
