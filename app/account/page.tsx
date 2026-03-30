"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Loader2, LogOut, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { useAuthModal } from "@/lib/auth-modal-context";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import {
  getProfile,
  updateProfile,
  uploadAvatar,
  removeAvatar,
} from "@/lib/profiles";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function userInitials(email: string | undefined): string {
  if (!email) return "?";
  const part = email.split("@")[0] ?? email;
  return part.slice(0, 2).toUpperCase();
}

export default function AccountPage() {
  const locale = useLocale();
  const { user, loading: authLoading, signOut } = useAuth();
  const { openAuthModal } = useAuthModal();

  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loadedUserId, setLoadedUserId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const profileLoaded = loadedUserId === user?.id;

  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    getProfile(user.id).then((profile) => {
      if (cancelled) return;
      if (profile) {
        setDisplayName(profile.username ?? "");
        setAvatarUrl(profile.avatar_url);
      }
      setLoadedUserId(user.id);
    });

    return () => {
      cancelled = true;
    };
  }, [user]);

  async function handleAvatarUpload(file: File) {
    if (!user) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error(t(locale, "account.error"));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error(t(locale, "account.avatarHint"));
      return;
    }

    setUploadingAvatar(true);
    const { url, error } = await uploadAvatar(user.id, file);

    if (error || !url) {
      toast.error(error ?? t(locale, "account.error"));
      setUploadingAvatar(false);
      return;
    }

    const { error: updateError } = await updateProfile(user.id, {
      avatar_url: url,
    });

    if (updateError) {
      toast.error(updateError);
    } else {
      setAvatarUrl(url);
      toast.success(t(locale, "account.saved"));
    }
    setUploadingAvatar(false);
  }

  async function handleRemoveAvatar() {
    if (!user) return;
    setUploadingAvatar(true);

    const { error: rmError } = await removeAvatar(user.id);
    if (rmError) {
      toast.error(rmError);
      setUploadingAvatar(false);
      return;
    }

    const { error: updateError } = await updateProfile(user.id, {
      avatar_url: null,
    });

    if (updateError) {
      toast.error(updateError);
    } else {
      setAvatarUrl(null);
      toast.success(t(locale, "account.saved"));
    }
    setUploadingAvatar(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    const { error } = await updateProfile(user.id, {
      username: displayName.trim() || undefined,
    });

    if (error) {
      toast.error(error);
    } else {
      toast.success(t(locale, "account.saved"));
    }
    setSaving(false);
  }

  if (authLoading || (user && !profileLoaded)) {
    return (
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-24 md:px-6">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-24 text-center md:px-6">
        <p className="text-muted-foreground">{t(locale, "account.notSignedIn")}</p>
        <Button onClick={() => openAuthModal()}>{t(locale, "navbar.signIn")}</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-10 md:px-6 md:py-16">
      <h1 className="text-2xl font-semibold tracking-tight">
        {t(locale, "account.title")}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {t(locale, "account.description")}
      </p>

      {/* Avatar section */}
      <div className="mt-8">
        <Label>{t(locale, "account.profilePicture")}</Label>
        <div className="mt-3 flex items-center gap-5">
          <div className="relative">
            <Avatar size="lg" className="size-20">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={displayName || "Avatar"} />
              ) : null}
              <AvatarFallback className="text-xl">
                {displayName
                  ? displayName.slice(0, 2).toUpperCase()
                  : userInitials(user.email)}
              </AvatarFallback>
            </Avatar>

            {uploadingAvatar && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background/70">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={uploadingAvatar}
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="mr-1.5 h-3.5 w-3.5" />
                {t(locale, "account.uploadPhoto")}
              </Button>

              {avatarUrl && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={uploadingAvatar}
                  onClick={() => void handleRemoveAvatar()}
                >
                  <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                  {t(locale, "account.removePhoto")}
                </Button>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              {t(locale, "account.avatarHint")}
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_TYPES.join(",")}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleAvatarUpload(file);
                e.target.value = "";
              }}
            />
          </div>
        </div>
      </div>

      {/* Name form */}
      <form onSubmit={(e) => void handleSave(e)} className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="display-name">{t(locale, "account.displayName")}</Label>
          <Input
            id="display-name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder={t(locale, "account.displayNamePlaceholder")}
            maxLength={50}
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                {t(locale, "account.saving")}
              </>
            ) : (
              t(locale, "account.save")
            )}
          </Button>
        </div>
      </form>

      {/* Email (read-only info) */}
      <div className="mt-8 rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
        <p className="text-xs font-medium text-muted-foreground">
          {t(locale, "auth.email")}
        </p>
        <p className="mt-0.5 text-sm">{user.email}</p>
      </div>

      <div className="mt-6">
        <Button
          type="button"
          variant="outline"
          className="text-destructive hover:text-destructive"
          onClick={() => {
            void signOut();
          }}
        >
          <LogOut className="mr-1.5 h-4 w-4" />
          {t(locale, "navbar.signOut")}
        </Button>
      </div>
    </div>
  );
}
