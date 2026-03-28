"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import type { EventComment } from "@/lib/types";
import { addEventComment, getEventComments } from "@/lib/event-social";
import { useAuthModal } from "@/lib/auth-modal-context";

type CommentSectionProps = {
  eventId: string;
  userId: string | null;
  authConfigured: boolean;
  onCommentAdded?: () => void | Promise<void>;
};

function timeAgo(dateStr: string, locale: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return locale === "de" ? "gerade eben" : "just now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

function CommentBubble({
  comment,
  locale,
}: {
  comment: EventComment;
  locale: string;
}) {
  const name = comment.profile?.username || t(locale as "en" | "de", "social.anonymousUser");

  return (
    <div className="flex gap-3 py-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold uppercase text-muted-foreground">
        {name.charAt(0)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium">{name}</span>
          <span className="text-xs text-muted-foreground">
            {timeAgo(comment.createdAt, locale)}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-foreground/90 break-words">
          {comment.content}
        </p>
      </div>
    </div>
  );
}

export function CommentSection({
  eventId,
  userId,
  authConfigured,
  onCommentAdded,
}: CommentSectionProps) {
  const locale = useLocale();
  const { openAuthModal } = useAuthModal();
  const [comments, setComments] = useState<EventComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      setLoading(true);
      const data = await getEventComments(eventId);
      if (!cancelled) {
        setComments(data);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [eventId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);

  const handleSubmit = async () => {
    setError(null);
    if (!userId || !authConfigured) {
      openAuthModal();
      return;
    }
    const trimmed = input.trim();
    if (!trimmed) return;

    setSubmitting(true);
    try {
      const { error: err } = await addEventComment(userId, eventId, trimmed);
      if (err) {
        setError(t(locale, "social.commentError"));
      } else {
        setInput("");
        const refreshed = await getEventComments(eventId);
        setComments(refreshed);
        await onCommentAdded?.();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-3 rounded-lg border border-border/80 bg-muted/20 p-4">
      <h4 className="text-sm font-semibold">
        {t(locale, "social.comments")}
      </h4>

      <div
        ref={scrollRef}
        className="max-h-64 overflow-y-auto divide-y divide-border/60"
      >
        {loading ? (
          <p className="py-4 text-center text-xs text-muted-foreground">
            {t(locale, "social.loadingComments")}
          </p>
        ) : comments.length === 0 ? (
          <p className="py-4 text-center text-xs text-muted-foreground">
            {t(locale, "social.noComments")}
          </p>
        ) : (
          comments.map((c) => (
            <CommentBubble key={c.id} comment={c} locale={locale} />
          ))
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void handleSubmit();
            }
          }}
          placeholder={t(locale, "social.commentPlaceholder")}
          disabled={submitting}
          maxLength={500}
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
        />
        <Button
          type="button"
          size="sm"
          disabled={submitting || !input.trim()}
          className="min-h-9 px-3 touch-manipulation"
          onClick={() => void handleSubmit()}
          aria-label={t(locale, "social.sendComment")}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
