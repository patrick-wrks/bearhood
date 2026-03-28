"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
    <Drawer
      open
      onOpenChange={(next) => {
        if (!next) onOpenChange(false);
      }}
      direction="bottom"
      shouldScaleBackground={false}
    >
      <DrawerContent className="flex max-h-[min(90vh,720px)] flex-col gap-0 rounded-t-2xl border-border/80 bg-card p-0">
        <DrawerHeader className="relative shrink-0 border-b border-border/60 px-4 pb-3 pt-2 text-left">
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon-lg"
              className="absolute top-0.5 right-0.5"
              aria-label={t(locale, "eventModal.close")}
            >
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
          <DrawerTitle className="pr-10 text-lg font-semibold leading-tight">{title}</DrawerTitle>
          <DrawerDescription className="text-left text-muted-foreground">{description}</DrawerDescription>
        </DrawerHeader>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const locale = useLocale();
  const { authConfigured, refreshSession, passwordRecovery, clearPasswordRecovery } = useAuth();

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
    setTimeout(() => handleOpenChange(false), 1500);
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
            <Input
              id="reset-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              required
              minLength={6}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reset-confirm">{t(locale, "auth.confirmPassword")}</Label>
            <Input
              id="reset-confirm"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
              required
              minLength={6}
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
                <Input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  required
                  minLength={6}
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              {info && <p className="text-sm text-muted-foreground">{info}</p>}
              <Button type="submit" className="h-11 w-full" disabled={submitting}>
                {t(locale, "auth.submitLogin")}
              </Button>

              <div className="relative py-1">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                  {t(locale, "auth.orMagicLink")}
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full"
                disabled={submitting}
                onClick={() => {
                  resetFields();
                  setLoginMode("magic");
                }}
              >
                {t(locale, "auth.useMagicLink")}
              </Button>
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
              <Button
                type="button"
                variant="ghost"
                className="h-11 w-full"
                onClick={() => {
                  resetFields();
                  setLoginMode("password");
                }}
              >
                <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                {t(locale, "auth.usePassword")}
              </Button>
            </form>
          )}
        </TabsContent>

        <TabsContent value="signup" className="mt-4 space-y-4">
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
              <Input
                id="signup-password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                required
                minLength={6}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            {info && <p className="text-sm text-muted-foreground">{info}</p>}
            <Button type="submit" className="h-11 w-full" disabled={submitting}>
              {t(locale, "auth.submitSignup")}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </AuthResponsiveShell>
  );
}
