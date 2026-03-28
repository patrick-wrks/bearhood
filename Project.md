# Project.md

## Project

**Bearhood** — Social-first event web app (Resident Advisor-style): discover gay bear events, **like**, **comment**, and **bookmark** events when signed in.

## Current Status

- **Overall:** Launch-ready MVP (static site + Supabase client for auth & responses).
- **Last updated:** 2026-03-28

## Primary Goals

1. List upcoming events with hero, grid, and detail modal.
2. Show **like** counts and **comment** counts per event.
3. Let authenticated users **like**, **comment on**, and **bookmark** events (client-side Supabase).
4. Ship on **GitHub Pages** with optional Supabase env (demo data + demo counts when unset).

## Milestones

1. **Done:** Email auth (sign up / log in / magic link / forgot + reset password), session via Supabase Auth.
2. **Done:** Social features (likes, comments, bookmarks) with RLS (documented in README).
3. **Done:** EN/DE UI copy, EUR pricing, locale-aware dates, mobile nav sheet, loading/empty states.
4. **Done:** Supabase project linked via CLI; schema migrations in `supabase/migrations/`.

## Roadmap (next 1-2 weeks)

- Set `NEXT_PUBLIC_SITE_URL` **GitHub Actions secret** (value: `https://patrick-wrks.github.io/bearhood`).
- Register redirect URLs in Supabase dashboard (see auth redirect setup below).
- Apply new migration `20260329120000_social_features.sql` via `supabase db push`.
- Point Resident Advisor social URL to real Bearhood RA profile (`NEXT_PUBLIC_SOCIAL_RESIDENT_ADVISOR_URL` or edit `lib/social-links.ts`).
- Optional: profiles table + username/avatar in UI.
- Monitor Supabase quotas and add rate limits if needed.

## Progress Notes

- **2026-03-29:** Replaced interested/going with like, comment, and bookmark features. New `event_likes`, `event_comments`, `event_bookmarks` tables + migration. `SocialActions` + `CommentSection` components.
- **2026-03-28:** Auth modal + navbar user menu; social actions on cards and modal; skeleton/empty states; UI Foundation link removed from public nav.
- **2026-03-28:** Added magic link sign-in, forgot password, and reset password flows. Added `NEXT_PUBLIC_SITE_URL` env var for redirect config.
- **2026-03-28:** Pre-launch fixes — `NEXT_PUBLIC_SITE_URL` added to CI workflow; `events` table RLS migration; deduplicated response-sync logic; Open Graph + Twitter Card meta tags; dynamic `html lang` attribute synced to locale; `Toaster` mounted in providers; renamed `SponserLogo` → `SponsorLogo`; removed unused scaffolding files.

## Auth email redirect setup (required once per environment)

For magic link, password reset, and sign-up confirmation emails to redirect back to the app correctly, two things must be configured once:

**1. Supabase dashboard → Authentication → URL Configuration → Redirect URLs** — add:
- `http://localhost:3000/**` (local dev)
- `https://patrick-wrks.github.io/bearhood/**` (GitHub Pages production)

**2. `NEXT_PUBLIC_SITE_URL` env var must be set:**
- In `.env.local` for local dev: `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- As a **GitHub Actions secret** for production: `NEXT_PUBLIC_SITE_URL=https://patrick-wrks.github.io/bearhood`

See `.env.local.example` for the full local setup template.

## Known infrastructure (read this first)

**For future AI sessions and collaborators:** The production GitHub repository already has the Supabase client credentials stored as **GitHub Actions repository secrets** (used by `.github/workflows/deploy.yml` at build time). You do **not** need to ask the maintainer to "add Supabase secrets" unless something is broken or they are setting up a **new** fork or repo.

- **Secret names (values are only in GitHub, never in this repo):** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **`NEXT_PUBLIC_SITE_URL`** also needs to be a GitHub Actions secret (value: `https://patrick-wrks.github.io/bearhood`)
- **Local dev** uses `.env.local` (see `.env.local.example`); that file is gitignored.
- **Supabase project:** `bearhood`, ref `xitzmarhnobazxbuthjy`, West EU (Ireland). Linked via CLI.
- **Schema migrations** live in `supabase/migrations/`. Apply with `supabase db push`.

## Backlog / Ideas

- Push / email reminders for bookmarked events.
- Organizer dashboard (separate app or Supabase dashboard + RLS).
- OAuth (Google/Apple) via Supabase.
- List view / filters by tag or date.

## Decisions & Constraints

- **Static export** + **GitHub Pages** (`output: "export"` in `next.config.ts`) — no Node server at runtime.
- **Supabase:** Auth + Postgres + RLS; all reads/writes from the browser with anon key (see README policies).
- **Fallback:** Demo events from `lib/events.ts` and demo response counts when Supabase env is missing or queries fail.

## Verification Checklist

- [x] `npm run dev` works locally (requires `.env.local` with Supabase keys)
- [x] `npm run build` succeeds
- [x] `npm run lint` passes (img-element warnings acceptable for remote/dynamic URLs)
- [x] GitHub Actions secrets for Supabase (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) — **configured on the repo**
- [x] `NEXT_PUBLIC_SITE_URL` added to `deploy.yml`
- [x] `events` table RLS + public select policy applied via `supabase db push`
- [x] `NEXT_PUBLIC_SITE_URL` secret set in GitHub Actions
- [x] Supabase dashboard → redirect URLs registered for local + production
- [ ] Deployed output renders correctly on GitHub Pages (`/bearhood` base path)
- [ ] Auth flows tested end-to-end: sign up, log in, magic link, forgot + reset password

## References

- `README.md`
- `.env.local.example`
- `.github/workflows/deploy.yml`
- `supabase/migrations/20260328120000_initial_schema.sql`
- `supabase/migrations/20260328140000_events_rls.sql`
- `supabase/migrations/20260329120000_social_features.sql`
