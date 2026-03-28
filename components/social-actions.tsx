"use client";

import { useState } from "react";
import { Heart, MessageCircle, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import type { EventSocialCounts } from "@/lib/types";
import { toggleEventLike, toggleEventBookmark } from "@/lib/event-social";
import { useAuthModal } from "@/lib/auth-modal-context";
import { cn } from "@/lib/utils";

type SocialActionsProps = {
  eventId: string;
  counts: EventSocialCounts;
  liked: boolean;
  bookmarked: boolean;
  userId: string | null;
  authConfigured: boolean;
  onUpdated?: () => void | Promise<void>;
  onCommentClick?: () => void;
};

export function SocialActions({
  eventId,
  counts,
  liked,
  bookmarked,
  userId,
  authConfigured,
  onUpdated,
  onCommentClick,
}: SocialActionsProps) {
  const locale = useLocale();
  const { openAuthModal } = useAuthModal();
  const [busy, setBusy] = useState(false);
  const [likeAnim, setLikeAnim] = useState(false);
  const [bookmarkAnim, setBookmarkAnim] = useState(false);

  const requireAuth = () => {
    if (!userId || !authConfigured) {
      openAuthModal();
      return true;
    }
    return false;
  };

  const handleLike = async () => {
    if (requireAuth()) return;
    setBusy(true);
    try {
      const { error } = await toggleEventLike(userId!, eventId, liked);
      if (!error) {
        setLikeAnim(true);
        window.setTimeout(() => setLikeAnim(false), 300);
      }
      await onUpdated?.();
    } finally {
      setBusy(false);
    }
  };

  const handleBookmark = async () => {
    if (requireAuth()) return;
    setBusy(true);
    try {
      const { error } = await toggleEventBookmark(userId!, eventId, bookmarked);
      if (!error) {
        setBookmarkAnim(true);
        window.setTimeout(() => setBookmarkAnim(false), 300);
      }
      await onUpdated?.();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={busy}
        className={cn(
          "gap-1.5 px-2.5 min-h-9 touch-manipulation",
          likeAnim && "social-btn-pulse",
        )}
        onClick={() => void handleLike()}
        aria-label={t(locale, "social.like")}
      >
        <Heart
          className={cn(
            "h-[18px] w-[18px] transition-colors",
            liked ? "fill-red-500 text-red-500" : "text-muted-foreground",
          )}
        />
        {counts.likes > 0 && (
          <span className="text-xs tabular-nums text-muted-foreground">
            {counts.likes}
          </span>
        )}
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="gap-1.5 px-2.5 min-h-9 touch-manipulation"
        onClick={onCommentClick}
        aria-label={t(locale, "social.comment")}
      >
        <MessageCircle className="h-[18px] w-[18px] text-muted-foreground" />
        {counts.comments > 0 && (
          <span className="text-xs tabular-nums text-muted-foreground">
            {counts.comments}
          </span>
        )}
      </Button>

      <div className="ml-auto">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={busy}
          className={cn(
            "px-2.5 min-h-9 touch-manipulation",
            bookmarkAnim && "social-btn-pulse",
          )}
          onClick={() => void handleBookmark()}
          aria-label={t(locale, "social.bookmark")}
        >
          <Bookmark
            className={cn(
              "h-[18px] w-[18px] transition-colors",
              bookmarked
                ? "fill-foreground text-foreground"
                : "text-muted-foreground",
            )}
          />
        </Button>
      </div>
    </div>
  );
}
