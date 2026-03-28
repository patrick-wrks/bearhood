"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import type { EventResponseCounts, ResponseStatus } from "@/lib/types";
import {
  removeEventResponse,
  setEventResponse,
} from "@/lib/event-responses";
import { useAuthModal } from "@/lib/auth-modal-context";

type ResponseButtonsProps = {
  eventId: string;
  counts: EventResponseCounts;
  userResponse: ResponseStatus | null;
  userId: string | null;
  authConfigured: boolean;
  /** Compact: single line stats + smaller buttons for cards */
  compact?: boolean;
  onOpenAuth?: () => void;
  onUpdated?: () => void | Promise<void>;
};

export function ResponseButtons({
  eventId,
  counts,
  userResponse,
  userId,
  authConfigured,
  compact,
  onOpenAuth,
  onUpdated,
}: ResponseButtonsProps) {
  const locale = useLocale();
  const { openAuthModal } = useAuthModal();
  const requestLogin = onOpenAuth ?? (() => openAuthModal());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const statsLine = `${counts.interested} ${t(locale, "response.statInterested")} · ${counts.attending} ${t(locale, "response.statGoing")}`;

  const handleStatus = async (status: ResponseStatus) => {
    setError(null);
    if (!userId || !authConfigured) {
      requestLogin();
      return;
    }

    setBusy(true);
    try {
      if (userResponse === status) {
        const { error: err } = await removeEventResponse(userId, eventId);
        if (err) setError(t(locale, "response.error"));
      } else {
        const { error: err } = await setEventResponse(userId, eventId, status);
        if (err) setError(t(locale, "response.error"));
      }
      await onUpdated?.();
    } finally {
      setBusy(false);
    }
  };

  const canMutate = Boolean(userId && authConfigured);

  if (compact) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground">{statsLine}</p>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant={userResponse === "interested" ? "default" : "outline"}
            disabled={busy || !canMutate}
            className="text-xs"
            onClick={() => void handleStatus("interested")}
          >
            {busy ? t(locale, "response.updating") : t(locale, "response.interested")}
          </Button>
          <Button
            type="button"
            size="sm"
            variant={userResponse === "attending" ? "default" : "outline"}
            disabled={busy || !canMutate}
            className="text-xs"
            onClick={() => void handleStatus("attending")}
          >
            {busy ? t(locale, "response.updating") : t(locale, "response.attending")}
          </Button>
        </div>
        {!canMutate && (
          <button
            type="button"
            className="text-left text-xs font-medium text-primary underline-offset-4 hover:underline"
            onClick={requestLogin}
          >
            {t(locale, "response.loginToRespond")}
          </button>
        )}
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-lg border border-border/80 bg-muted/30 p-4">
      <p className="text-sm text-muted-foreground">{statsLine}</p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          variant={userResponse === "interested" ? "default" : "outline"}
          className="sm:flex-1"
          disabled={busy || !canMutate}
          onClick={() => void handleStatus("interested")}
        >
          {busy ? t(locale, "response.updating") : t(locale, "response.interested")}
        </Button>
        <Button
          type="button"
          variant={userResponse === "attending" ? "default" : "outline"}
          className="sm:flex-1"
          disabled={busy || !canMutate}
          onClick={() => void handleStatus("attending")}
        >
          {busy ? t(locale, "response.updating") : t(locale, "response.attending")}
        </Button>
      </div>
      {!canMutate && (
        <button
          type="button"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          onClick={requestLogin}
        >
          {t(locale, "response.loginToRespond")}
        </button>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
