-- Bearhood: events, profiles (signup trigger), event_responses (interested / attending)
-- Matches README schema; safe to run once per environment via `supabase db push`.

-- ---------------------------------------------------------------------------
-- events
-- ---------------------------------------------------------------------------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  short_description text not null,
  date timestamptz not null,
  location text not null,
  image_url text not null,
  ticket_url text,
  learn_more_url text,
  is_featured boolean not null default false,
  capacity integer not null default 0,
  price numeric(10,2) not null default 0,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.events add column if not exists ticket_url text;
alter table public.events add column if not exists learn_more_url text;

-- ---------------------------------------------------------------------------
-- profiles (+ RLS + trigger on new auth user)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- event_responses
-- ---------------------------------------------------------------------------
create table if not exists public.event_responses (
  user_id uuid not null references auth.users(id) on delete cascade,
  event_id text not null,
  status text not null check (status in ('interested', 'attending')),
  created_at timestamptz not null default now(),
  primary key (user_id, event_id)
);

alter table public.event_responses enable row level security;

drop policy if exists "Anyone can read event responses" on public.event_responses;
create policy "Anyone can read event responses"
  on public.event_responses for select
  using (true);

drop policy if exists "Authenticated users insert own responses" on public.event_responses;
create policy "Authenticated users insert own responses"
  on public.event_responses for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users update own responses" on public.event_responses;
create policy "Users update own responses"
  on public.event_responses for update
  using (auth.uid() = user_id);

drop policy if exists "Users delete own responses" on public.event_responses;
create policy "Users delete own responses"
  on public.event_responses for delete
  using (auth.uid() = user_id);
