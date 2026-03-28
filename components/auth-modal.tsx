"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
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

type View = "auth" | "forgot" | "reset";

type AuthModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

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

  // When a password-recovery email link is clicked, defer switching to
  // the reset view so we don't call setState synchronously inside an effect.
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

  // --- Login (password) ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!authConfigured) { notConfiguredError(); return; }
    setSubmitting(true);
    const { error: err } = await signInWithEmail(email, password);
    setSubmitting(false);
    if (err) { setError(err); return; }
    await refreshSession();
    handleOpenChange(false);
  };

  // --- Sign up ---
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!authConfigured) { notConfiguredError(); return; }
    setSubmitting(true);
    const { error: err } = await signUpWithEmail(email, password);
    setSubmitting(false);
    if (err) { setError(err); return; }
    setInfo(t(locale, "auth.checkEmail"));
  };

  // --- Magic link ---
  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!authConfigured) { notConfiguredError(); return; }
    setSubmitting(true);
    const { error: err } = await signInWithMagicLink(email);
    setSubmitting(false);
    if (err) { setError(err); return; }
    setInfo(t(locale, "auth.magicLinkSent"));
  };

  // --- Forgot password ---
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!authConfigured) { notConfiguredError(); return; }
    setSubmitting(true);
    const { error: err } = await sendPasswordResetEmail(email);
    setSubmitting(false);
    if (err) { setError(err); return; }
    setInfo(t(locale, "auth.resetLinkSent"));
  };

  // --- Set new password ---
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (password !== confirmPassword) {
      setError(t(locale, "auth.passwordsNoMatch"));
      return;
    }
    if (!authConfigured) { notConfiguredError(); return; }
    setSubmitting(true);
    const { error: err } = await updateUserPassword(password);
    setSubmitting(false);
    if (err) { setError(err); return; }
    clearPasswordRecovery();
    setInfo(t(locale, "auth.passwordUpdated"));
    await refreshSession();
    setTimeout(() => handleOpenChange(false), 1500);
  };

  // ------------------------------------------------------------------
  // Render: Set new password (view = "reset")
  // ------------------------------------------------------------------
  if (view === "reset") {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t(locale, "auth.resetPasswordTitle")}</DialogTitle>
            <DialogDescription>{t(locale, "auth.resetPasswordDescription")}</DialogDescription>
          </DialogHeader>
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
            <Button type="submit" className="w-full" disabled={submitting}>
              {t(locale, "auth.submitNewPassword")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  // ------------------------------------------------------------------
  // Render: Forgot password (view = "forgot")
  // ------------------------------------------------------------------
  if (view === "forgot") {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t(locale, "auth.forgotPasswordTitle")}</DialogTitle>
            <DialogDescription>{t(locale, "auth.forgotPasswordDescription")}</DialogDescription>
          </DialogHeader>
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
            <Button type="submit" className="w-full" disabled={submitting}>
              {t(locale, "auth.submitResetLink")}
            </Button>
          </form>
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            onClick={() => { resetFields(); setView("auth"); }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t(locale, "auth.backToLogin")}
          </button>
        </DialogContent>
      </Dialog>
    );
  }

  // ------------------------------------------------------------------
  // Render: Main auth (view = "auth") — login + signup tabs
  // ------------------------------------------------------------------
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t(locale, "auth.title")}</DialogTitle>
          <DialogDescription>{t(locale, "auth.description")}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full" onValueChange={() => resetFields()}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{t(locale, "auth.tabLogin")}</TabsTrigger>
            <TabsTrigger value="signup">{t(locale, "auth.tabSignup")}</TabsTrigger>
          </TabsList>

          {/* ----- LOGIN TAB ----- */}
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">{t(locale, "auth.password")}</Label>
                    <button
                      type="button"
                      className="text-xs text-muted-foreground underline-offset-4 hover:underline hover:text-foreground"
                      onClick={() => { resetFields(); setView("forgot"); }}
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
                <Button type="submit" className="w-full" disabled={submitting}>
                  {t(locale, "auth.submitLogin")}
                </Button>

                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-popover px-2 text-xs text-muted-foreground">
                    {t(locale, "auth.orMagicLink")}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={submitting}
                  onClick={() => { resetFields(); setLoginMode("magic"); }}
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
                <Button type="submit" className="w-full" disabled={submitting}>
                  {t(locale, "auth.submitMagicLink")}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => { resetFields(); setLoginMode("password"); }}
                >
                  <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                  {t(locale, "auth.usePassword")}
                </Button>
              </form>
            )}
          </TabsContent>

          {/* ----- SIGN UP TAB ----- */}
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
              <Button type="submit" className="w-full" disabled={submitting}>
                {t(locale, "auth.submitSignup")}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
