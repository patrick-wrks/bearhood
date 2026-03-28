"use client";

import { useState } from "react";
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
import { signInWithEmail, signUpWithEmail } from "@/lib/supabase-auth";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";

type AuthModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const locale = useLocale();
  const { authConfigured, refreshSession } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const resetMessages = () => {
    setError(null);
    setInfo(null);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      resetMessages();
      setEmail("");
      setPassword("");
    }
    onOpenChange(next);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    if (!authConfigured) {
      setError(t(locale, "auth.supabaseMissing"));
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
    resetMessages();
    if (!authConfigured) {
      setError(t(locale, "auth.supabaseMissing"));
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
    await refreshSession();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t(locale, "auth.title")}</DialogTitle>
          <DialogDescription>{t(locale, "auth.description")}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{t(locale, "auth.tabLogin")}</TabsTrigger>
            <TabsTrigger value="signup">{t(locale, "auth.tabSignup")}</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-4 space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="auth-email-login">{t(locale, "auth.email")}</Label>
                <Input
                  id="auth-email-login"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="auth-password-login">{t(locale, "auth.password")}</Label>
                <Input
                  id="auth-password-login"
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
            </form>
          </TabsContent>

          <TabsContent value="signup" className="mt-4 space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="auth-email-signup">{t(locale, "auth.email")}</Label>
                <Input
                  id="auth-email-signup"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="auth-password-signup">{t(locale, "auth.password")}</Label>
                <Input
                  id="auth-password-signup"
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
