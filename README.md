# Bearhood - Social Media Event Brand Web App

Bearhood is a social-first event website built with Next.js and Supabase. It features a dynamic hero banner slider, interactive event cards, and event detail modals with a playful yet sleek visual style.

## Stack

- Next.js (App Router, TypeScript)
- Supabase (`@supabase/supabase-js`)
- shadcn/ui + Tailwind CSS
- Lucide React icons
- GitHub Actions for CI/CD
- GitHub Pages for static hosting

## Features

- Hero banner slider for featured events
- Responsive event card grid
- Click-to-open event detail modal
- Supabase integration with fallback demo data
- Dark, modern, playful design system

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment file and fill values:

```bash
cp .env.local.example .env.local
```

3. Start development:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Supabase schema

Use this SQL in Supabase SQL Editor:

```sql
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  short_description text not null,
  date timestamptz not null,
  location text not null,
  image_url text not null,
  is_featured boolean not null default false,
  capacity integer not null default 0,
  price numeric(10,2) not null default 0,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);
```

Example seed row:

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

This project is configured for static export and GitHub Pages deployment.

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

- `next.config.ts` uses:
  - `output: "export"`
  - `images.unoptimized: true`
- Data is fetched client-side from Supabase.
- If env vars are missing or query fails, the app uses built-in demo events.
