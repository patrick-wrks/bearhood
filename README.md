# Bearhood - Social Media Event Brand Web App

Bearhood is a social-first event website built with Next.js and Supabase. Users browse events (hero + grid + detail modal), see **how many people are interested vs. going**, and—when logged in—save their own status. Think **Resident Advisor–style** discovery with lightweight “social” signals.

## Stack

- Next.js (App Router, TypeScript, static export)
- Supabase Auth + Postgres (`@supabase/supabase-js`)
- shadcn/ui + Tailwind CSS
- Lucide React icons
- GitHub Actions for CI/CD
- GitHub Pages for static hosting

## Features

- Hero slider for featured events, responsive event grid, event detail modal
- **Interested** / **Going** counts on every card and in the modal; authenticated users can toggle (stored in `event_responses`)
- Email **sign up / log in** (Supabase Auth)
- EN/DE UI strings, EUR price formatting, locale-aware dates
- Mobile slide-out navigation + auth entry points
- Skeleton loading and empty state for events
- Supabase-backed `events` with fallback **demo events** when env is missing or the query fails
- Demo **response counts** when Supabase is not configured (static preview only)

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment file and fill values (optional for demo mode):

```bash
cp .env.local.example .env.local
```

3. Start development:

```bash
npm run dev
```

Open `http://localhost:3000`.

### Auth & social URLs

- In the Supabase dashboard, enable **Email** under Authentication → Providers.
- Optional: set `NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL`, `NEXT_PUBLIC_SOCIAL_YOUTUBE_URL`, `NEXT_PUBLIC_SOCIAL_TIKTOK_URL` for footer links (see `.env.local.example`).

## Supabase schema

### Option A: CLI migrations (recommended)

This repo is linked to your Supabase project (`supabase link`). Apply the same schema as below with:

```bash
supabase db push
```

Migrations live in [`supabase/migrations/`](supabase/migrations/). The initial file is `20260328120000_initial_schema.sql`.

### Option B: SQL Editor

Run these in the Supabase SQL Editor (order matters).

### Events (with ticket / learn-more links)

```sql
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
```

The app maps rows to `EventItem` in [`lib/events.ts`](lib/events.ts). `event_responses.event_id` is **text** so it can match either a UUID string from Supabase or demo ids like `bearoke`.

### Profiles (optional, for future avatar/username UI)

```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row when a user signs up
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
```

### Event responses (interested / attending)

```sql
create table if not exists public.event_responses (
  user_id uuid not null references auth.users(id) on delete cascade,
  event_id text not null,
  status text not null check (status in ('interested', 'attending')),
  created_at timestamptz not null default now(),
  primary key (user_id, event_id)
);

alter table public.event_responses enable row level security;

create policy "Anyone can read event responses"
  on public.event_responses for select
  using (true);

create policy "Authenticated users insert own responses"
  on public.event_responses for insert
  with check (auth.uid() = user_id);

create policy "Users update own responses"
  on public.event_responses for update
  using (auth.uid() = user_id);

create policy "Users delete own responses"
  on public.event_responses for delete
  using (auth.uid() = user_id);
```

### Example event seed

```sql
insert into public.events
  (title, description, short_description, date, location, image_url, is_featured, capacity, price, tags)
values
  (
    'Bearhood Night Market',
    'An open-air evening market packed with local vendors, immersive light installations, and DJ performances.',
    'Street food, neon visuals, and live DJ sets.',
    '2026-05-14T19:30:00Z',
    'Riverfront District, Austin',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
    true,
    500,
    25,
    array['music', 'food', 'nightlife']
  );
```

## GitHub Actions + GitHub Pages

### Required repository settings

1. In GitHub repo settings, enable **Pages** and set source to **GitHub Actions**.
2. Add repository secrets:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Workflow behavior

On each push to `main`, workflow `.github/workflows/deploy.yml`:

1. Installs dependencies
2. Runs lint
3. Builds static export (`out/`)
4. Deploys to GitHub Pages

## Notes on static export

- `next.config.ts` uses `output: "export"`, production `basePath` / `assetPrefix` for `/bearhood`, and `images.unoptimized: true`.
- Event lists and response counts are loaded **in the browser** via Supabase.
- If env vars are missing or queries fail, the app uses built-in demo events and demo response counts.

See also [`Project.md`](Project.md) for status and verification checklist.
