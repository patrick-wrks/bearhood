-- Replace event_responses (interested/attending) with event_likes, event_comments, event_bookmarks.
-- Run via `supabase db push`.

-- ---------------------------------------------------------------------------
-- Drop old event_responses table
-- ---------------------------------------------------------------------------
drop table if exists public.event_responses;

-- ---------------------------------------------------------------------------
-- event_likes
-- ---------------------------------------------------------------------------
create table if not exists public.event_likes (
  user_id uuid not null references auth.users(id) on delete cascade,
  event_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, event_id)
);

alter table public.event_likes enable row level security;

create policy "Anyone can read event likes"
  on public.event_likes for select
  using (true);

create policy "Authenticated users insert own likes"
  on public.event_likes for insert
  with check (auth.uid() = user_id);

create policy "Users delete own likes"
  on public.event_likes for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- event_comments
-- ---------------------------------------------------------------------------
create table if not exists public.event_comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_id text not null,
  content text not null check (char_length(content) between 1 and 500),
  created_at timestamptz not null default now()
);

alter table public.event_comments enable row level security;

create policy "Anyone can read event comments"
  on public.event_comments for select
  using (true);

create policy "Authenticated users insert own comments"
  on public.event_comments for insert
  with check (auth.uid() = user_id);

create policy "Users delete own comments"
  on public.event_comments for delete
  using (auth.uid() = user_id);

create index if not exists idx_event_comments_event_id
  on public.event_comments (event_id, created_at);

-- ---------------------------------------------------------------------------
-- event_bookmarks
-- ---------------------------------------------------------------------------
create table if not exists public.event_bookmarks (
  user_id uuid not null references auth.users(id) on delete cascade,
  event_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, event_id)
);

alter table public.event_bookmarks enable row level security;

create policy "Users read own bookmarks"
  on public.event_bookmarks for select
  using (auth.uid() = user_id);

create policy "Authenticated users insert own bookmarks"
  on public.event_bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users delete own bookmarks"
  on public.event_bookmarks for delete
  using (auth.uid() = user_id);
