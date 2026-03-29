"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import logo from "@BearhoodAssets/Logo.png";
import textLogo from "@BearhoodAssets/bearhood-textbased-Logo.webp";
import { useLocale, useLocalePathSansPrefix } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import { useAuth } from "@/lib/auth-context";
import { useAuthModal } from "@/lib/auth-modal-context";
import type { Locale } from "@/lib/i18n/locales";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function userInitials(email: string | undefined): string {
  if (!email) return "?";
  const part = email.split("@")[0] ?? email;
  return part.slice(0, 2).toUpperCase();
}

type NavbarLanguageSwitchProps = {
  locale: Locale;
  enHref: string;
  deHref: string;
  vertical?: boolean;
  onNavigate?: () => void;
};

function NavbarLanguageSwitch({
  locale,
  enHref,
  deHref,
  vertical,
  onNavigate,
}: NavbarLanguageSwitchProps) {
  return (
    <div
      className={[
        "flex rounded-full border border-border/80 bg-background/60 p-1",
        vertical ? "flex-col" : "items-center gap-1",
      ].join(" ")}
      role="tablist"
      aria-label="Language"
    >
      <Link
        href={enHref}
        aria-current={locale === "en" ? "page" : undefined}
        className={[
          "rounded-full px-2 py-1 text-xs font-medium transition-colors",
          locale === "en" ? "bg-primary/15 text-foreground" : "text-muted-foreground",
          "hover:text-foreground",
        ].join(" ")}
        title={t(locale, "language.english")}
        onClick={onNavigate}
      >
        EN
      </Link>
      <Link
        href={deHref}
        aria-current={locale === "de" ? "page" : undefined}
        className={[
          "rounded-full px-2 py-1 text-xs font-medium transition-colors",
          locale === "de" ? "bg-primary/15 text-foreground" : "text-muted-foreground",
          "hover:text-foreground",
        ].join(" ")}
        title={t(locale, "language.german")}
        onClick={onNavigate}
      >
        DE
      </Link>
    </div>
  );
}

function NavbarThemeToggle({ locale }: { locale: Locale }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        className="rounded-full"
        disabled
        aria-hidden
      >
        <Sun className="h-4 w-4 opacity-40" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      className="rounded-full"
      aria-label={t(locale, "navbar.themeToggle")}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

export function Navbar() {
  const locale = useLocale();
  const pathSansLocalePrefix = useLocalePathSansPrefix();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const rest = pathSansLocalePrefix === "/" ? "" : pathSansLocalePrefix;
  const enHref = `/en${rest}`;
  const deHref = `/de${rest}`;
  const homeHref = `/${locale}`;
  const eventsHref = `${homeHref}#events`;
  const aboutHref = `${homeHref}#about`;
  const faqHref = `${homeHref}#faq`;
  const contactHref = `/${locale}/contact`;
  const galleryHref = `/${locale}/gallery`;
  const accountHref = `/${locale}/account`;

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, closeMobile]);

  const desktopNavLinkClass =
    "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground";

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Link
          className="flex shrink-0 items-center gap-2 text-lg font-semibold tracking-wide"
          href={homeHref}
        >
          <Image
            src={logo}
            alt="Bearhood"
            width={28}
            height={28}
            priority
            className="h-7 w-7"
          />
          <Image
            src={textLogo}
            alt="Bearhood"
            height={20}
            className="h-5 w-auto"
          />
        </Link>

        <div className="hidden min-w-0 flex-1 justify-center md:flex">
          <nav
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 lg:gap-x-8"
            aria-label={t(locale, "navbar.mobileMenuTitle")}
          >
            <Link href={eventsHref} className={desktopNavLinkClass}>
              {t(locale, "navbar.events")}
            </Link>
            <Link href={aboutHref} className={desktopNavLinkClass}>
              {t(locale, "navbar.about")}
            </Link>
            <Link href={faqHref} className={desktopNavLinkClass}>
              {t(locale, "footer.linkFaq")}
            </Link>
            <Link href={contactHref} className={desktopNavLinkClass}>
              {t(locale, "navbar.contact")}
            </Link>
            <Link href={galleryHref} className={desktopNavLinkClass}>
              {t(locale, "navbar.gallery")}
            </Link>
            <Link href={accountHref} className={desktopNavLinkClass}>
              {t(locale, "navbar.account")}
            </Link>
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden md:block">
            <NavbarLanguageSwitch locale={locale} enHref={enHref} deHref={deHref} />
          </div>

          <div className="hidden md:block">
            <NavbarThemeToggle locale={locale} />
          </div>

          {!loading && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon-sm"
                    className="hidden md:inline-flex rounded-full p-0"
                    aria-label={t(locale, "navbar.account")}
                  />
                }
              >
                <Avatar size="sm" className="size-7">
                  <AvatarFallback className="text-xs">
                    {userInitials(user.email)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-48">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="truncate font-normal">
                    {user.email}
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push(accountHref)}>
                  {t(locale, "navbar.account")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => {
                    void signOut();
                  }}
                >
                  {t(locale, "navbar.signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size="sm"
              className="hidden md:inline-flex"
              disabled={loading}
              onClick={() => openAuthModal()}
            >
              {t(locale, "navbar.signIn")}
            </Button>
          )}

          <Button
            size="icon"
            variant="outline"
            className="md:hidden"
            aria-label={t(locale, "navbar.mobileMenu")}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Inline collapsible mobile menu */}
      <div
        id="mobile-nav-panel"
        ref={panelRef}
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out md:hidden",
          mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0">
          <div className="border-t border-border/60 px-4 pb-5 pt-3">
            <nav className="flex flex-col gap-1" aria-label={t(locale, "navbar.mobileMenuTitle")}>
              <Link
                href={eventsHref}
                onClick={closeMobile}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "default" }),
                  "h-11 w-full touch-manipulation justify-start rounded-lg px-3 text-base",
                )}
              >
                {t(locale, "navbar.events")}
              </Link>
              <Link
                href={aboutHref}
                onClick={closeMobile}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "default" }),
                  "h-11 w-full touch-manipulation justify-start rounded-lg px-3 text-base",
                )}
              >
                {t(locale, "navbar.about")}
              </Link>
              <Link
                href={faqHref}
                onClick={closeMobile}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "default" }),
                  "h-11 w-full touch-manipulation justify-start rounded-lg px-3 text-base",
                )}
              >
                {t(locale, "footer.linkFaq")}
              </Link>
              <Link
                href={contactHref}
                onClick={closeMobile}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "default" }),
                  "h-11 w-full touch-manipulation justify-start rounded-lg px-3 text-base",
                )}
              >
                {t(locale, "navbar.contact")}
              </Link>
              <Link
                href={galleryHref}
                onClick={closeMobile}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "default" }),
                  "h-11 w-full touch-manipulation justify-start rounded-lg px-3 text-base",
                )}
              >
                {t(locale, "navbar.gallery")}
              </Link>
            </nav>

            <div className="mt-4 flex items-center gap-3">
              <NavbarLanguageSwitch
                locale={locale}
                enHref={enHref}
                deHref={deHref}
                onNavigate={closeMobile}
              />
              <NavbarThemeToggle locale={locale} />
            </div>

            <div className="mt-4">
              {!loading && user ? (
                <div className="space-y-3">
                  <p className="truncate text-sm text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2">
                    <Link
                      href={accountHref}
                      onClick={closeMobile}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                      )}
                    >
                      {t(locale, "navbar.account")}
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        void signOut();
                        closeMobile();
                      }}
                    >
                      {t(locale, "navbar.signOut")}
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  className="w-full"
                  size="sm"
                  disabled={loading}
                  onClick={() => {
                    closeMobile();
                    openAuthModal();
                  }}
                >
                  {t(locale, "navbar.signIn")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
