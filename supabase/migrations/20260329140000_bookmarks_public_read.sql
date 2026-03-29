-- Make event_bookmarks readable by everyone so the "interested" count is
-- visible to all visitors, matching the behaviour of event_likes/event_comments.

drop policy if exists "Users read own bookmarks" on public.event_bookmarks;

create policy "Anyone can read event bookmarks"
  on public.event_bookmarks for select
  using (true);
