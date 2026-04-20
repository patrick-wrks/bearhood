"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth-context";
import {
  sendPasswordResetEmail,
  signInWithEmail,
  signInWithMagicLink,
  signUpWithEmail,
  updateUserPassword,
} from "@/lib/supabase-auth";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import { useIsDesktop } from "@/lib/use-media-query";
import type { Locale } from "@/lib/i18n/locales";

type View = "auth" | "forgot" | "reset";

type AuthModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function AuthResponsiveShell({
  open,
  onOpenChange,
  title,
  description,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const locale = useLocale();
  const isDesktop = useIsDesktop();

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  useEffect(() => {
    if (!open || isDesktop) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, isDesktop, close]);

  useEffect(() => {
    if (!open || isDesktop) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, isDesktop]);

  if (!open) return null;

  if (isDesktop) {
    return (
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-background"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="flex shrink-0 items-start justify-between border-b border-border/60 px-4 pb-3 pt-3">
        <div className="min-w-0 flex-1 pr-10">
          <h2 className="text-lg font-semibold leading-tight">{title}</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        </div>
        <Button
          variant="ghost"
          size="icon-lg"
          className="shrink-0"
          aria-label={t(locale, "eventModal.close")}
          onClick={close}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        {children}
      </div>
    </div>
  );
}

function PasswordInput({
  id,
  locale,
  autoComplete,
  value,
  onChange,
  minLength = 6,
}: {
  id: string;
  locale: Locale;
  autoComplete: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minLength?: number;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        required
        minLength={minLength}
        className="pr-10"
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground"
        aria-label={t(locale, visible ? "auth.hidePassword" : "auth.showPassword")}
        onClick={() => setVisible((v) => !v)}
        tabIndex={-1}
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const locale = useLocale();
  const router = useRouter();
  const { authConfigured, refreshSession, passwordRecovery, clearPasswordRecovery } = useAuth();

  const accountPath = locale === "en" ? "/account" : `/${locale}/account`;

  const [view, setView] = useState<View>("auth");
  const [loginMode, setLoginMode] = useState<"password" | "magic">("password");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
    setInfo(null);
  };

  useEffect(() => {
    if (!open || !passwordRecovery) return;
    const id = setTimeout(() => {
      setView("reset");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError(null);
      setInfo(null);
    }, 0);
    return () => clearTimeout(id);
  }, [open, passwordRecovery]);

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      resetFields();
      setView("auth");
      setLoginMode("password");
      if (passwordRecovery) clearPasswordRecovery();
    }
    onOpenChange(next);
  };

  const notConfiguredError = () => {
    setError(t(locale, "auth.supabaseMissing"));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!authConfigured) {
      notConfiguredError();
      return;
    }
    setSubmitting(true);
    const { error: err } = await signInWithEmail(email, password);
    setSubmitting(false);
    if (err) {
      setError(err);
      return;
    }
    await refreshSession();
    handleOpenChange(false);
    router.push(accountPath);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!authConfigured) {
      notConfiguredError();
      return;
    }
    setSubmitting(true);
    const { error: err } = await signUpWithEmail(email, password);
    setSubmitting(false);
    if (err) {
      setError(err);
      return;
    }
    setInfo(t(locale, "auth.checkEmail"));
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!authConfigured) {
      notConfiguredError();
      return;
    }
    setSubmitting(true);
    const { error: err } = await signInWithMagicLink(email);
    setSubmitting(false);
    if (err) {
      setError(err);
      return;
    }
    setInfo(t(locale, "auth.magicLinkSent"));
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!authConfigured) {
      notConfiguredError();
      return;
    }
    setSubmitting(true);
    const { error: err } = await sendPasswordResetEmail(email);
    setSubmitting(false);
    if (err) {
      setError(err);
      return;
    }
    setInfo(t(locale, "auth.resetLinkSent"));
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (password !== confirmPassword) {
      setError(t(locale, "auth.passwordsNoMatch"));
      return;
    }
    if (!authConfigured) {
      notConfiguredError();
      return;
    }
    setSubmitting(true);
    const { error: err } = await updateUserPassword(password);
    setSubmitting(false);
    if (err) {
      setError(err);
      return;
    }
    clearPasswordRecovery();
    setInfo(t(locale, "auth.passwordUpdated"));
    await refreshSession();
    setTimeout(() => {
      handleOpenChange(false);
      router.push(accountPath);
    }, 1500);
  };

  if (view === "reset") {
    return (
      <AuthResponsiveShell
        open={open}
        onOpenChange={handleOpenChange}
        title={t(locale, "auth.resetPasswordTitle")}
        description={t(locale, "auth.resetPasswordDescription")}
      >
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reset-password">{t(locale, "auth.newPassword")}</Label>
            <PasswordInput
              id="reset-password"
              locale={locale}
              autoComplete="new-password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reset-confirm">{t(locale, "auth.confirmPassword")}</Label>
            <PasswordInput
              id="reset-confirm"
              locale={locale}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          {info && <p className="text-sm text-muted-foreground">{info}</p>}
          <Button type="submit" className="h-11 w-full" disabled={submitting}>
            {t(locale, "auth.submitNewPassword")}
          </Button>
        </form>
      </AuthResponsiveShell>
    );
  }

  if (view === "forgot") {
    return (
      <AuthResponsiveShell
        open={open}
        onOpenChange={handleOpenChange}
        title={t(locale, "auth.forgotPasswordTitle")}
        description={t(locale, "auth.forgotPasswordDescription")}
      >
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="forgot-email">{t(locale, "auth.email")}</Label>
            <Input
              id="forgot-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          {info && <p className="text-sm text-muted-foreground">{info}</p>}
          <Button type="submit" className="h-11 w-full" disabled={submitting}>
            {t(locale, "auth.submitResetLink")}
          </Button>
        </form>
        <button
          type="button"
          className="mt-4 flex min-h-11 w-full items-center gap-1.5 rounded-md text-sm text-muted-foreground ring-offset-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onClick={() => {
            resetFields();
            setView("auth");
          }}
        >
          <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
          {t(locale, "auth.backToLogin")}
        </button>
      </AuthResponsiveShell>
    );
  }

  return (
    <AuthResponsiveShell
      open={open}
      onOpenChange={handleOpenChange}
      title={t(locale, "auth.title")}
      description={t(locale, "auth.description")}
    >
      <Tabs defaultValue="login" className="w-full" onValueChange={() => resetFields()}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">{t(locale, "auth.tabLogin")}</TabsTrigger>
          <TabsTrigger value="signup">{t(locale, "auth.tabSignup")}</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="mt-4 space-y-4">
          {loginMode === "password" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">{t(locale, "auth.email")}</Label>
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="login-password">{t(locale, "auth.password")}</Label>
                  <button
                    type="button"
                    className="text-xs text-muted-foreground underline-offset-4 hover:underline hover:text-foreground"
                    onClick={() => {
                      resetFields();
                      setView("forgot");
                    }}
                  >
                    {t(locale, "auth.forgotPassword")}
                  </button>
                </div>
                <PasswordInput
                  id="login-password"
                  locale={locale}
                  autoComplete="current-password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              {info && <p className="text-sm text-muted-foreground">{info}</p>}
              <Button type="submit" className="h-11 w-full" disabled={submitting}>
                {t(locale, "auth.submitLogin")}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                {t(locale, "auth.orMagicLink")}{" "}
                <button
                  type="button"
                  className="underline underline-offset-4 hover:text-foreground"
                  onClick={() => {
                    resetFields();
                    setLoginMode("magic");
                  }}
                >
                  {t(locale, "auth.useMagicLink")}
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="magic-email">{t(locale, "auth.email")}</Label>
                <Input
                  id="magic-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              {info && <p className="text-sm text-muted-foreground">{info}</p>}
              <Button type="submit" className="h-11 w-full" disabled={submitting}>
                {t(locale, "auth.submitMagicLink")}
              </Button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-1.5 text-xs text-muted-foreground underline-offset-4 hover:text-foreground"
                onClick={() => {
                  resetFields();
                  setLoginMode("password");
                }}
              >
                <ArrowLeft className="h-3 w-3 shrink-0" />
                {t(locale, "auth.usePassword")}
              </button>
            </form>
          )}
        </TabsContent>

        <TabsContent value="signup" className="mt-4 space-y-4">
          {info ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">{info}</p>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">{t(locale, "auth.email")}</Label>
                <Input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">{t(locale, "auth.password")}</Label>
                <PasswordInput
                  id="signup-password"
                  locale={locale}
                  autoComplete="new-password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="h-11 w-full" disabled={submitting}>
                {t(locale, "auth.submitSignup")}
              </Button>
            </form>
          )}
        </TabsContent>
      </Tabs>
    </AuthResponsiveShell>
  );
}
