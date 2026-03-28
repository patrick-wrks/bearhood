# Project.md

## Project

**Bearhood** — Social-first event web app (Resident Advisor–style): discover gay bear events, see **interested** / **going** counts, and save your own status when signed in.

## Current Status

- **Overall:** Launch-ready MVP (static site + Supabase client for auth & responses).
- **Last updated:** 2026-03-28

## Primary Goals

1. List upcoming events with hero, grid, and detail modal.
2. Show aggregate **interested** and **attending (going)** counts per event.
3. Let authenticated users set/clear their status (client-side Supabase).
4. Ship on **GitHub Pages** with optional Supabase env (demo data + demo counts when unset).

## Milestones

1. **Done:** Email auth (sign up / log in), session via Supabase Auth.
2. **Done:** `event_responses` integration with RLS (documented in README).
3. **Done:** EN/DE UI copy, EUR pricing, locale-aware dates, mobile nav sheet, loading/empty states.

## Roadmap (next 1–2 weeks)

- Point footer social URLs to real Bearhood profiles (`NEXT_PUBLIC_SOCIAL_*` or edit `lib/social-links.ts`).
- Optional: profiles table + username/avatar in UI.
- Optional: Edge Functions or hosted API if you outgrow pure client writes.
- Monitor Supabase quotas and add rate limits if needed.

## Progress Notes

- **2026-03-28:** Auth modal + navbar user menu; `ResponseButtons` on cards and modal; `event_responses` helpers with demo fallbacks; skeleton/empty states; UI Foundation link removed from public nav (route still exists for devs).

## Backlog / Ideas

- Push / email reminders for events users marked “going”.
- Organizer dashboard (separate app or Supabase dashboard + RLS).
- OAuth (Google/Apple) via Supabase.
- List view / filters by tag or date.

## Decisions & Constraints

- **Static export** + **GitHub Pages** (`output: "export"` in `next.config.ts`) — no Node server at runtime.
- **Supabase:** Auth + Postgres + RLS; all reads/writes from the browser with anon key (see README policies).
- **Fallback:** Demo events from `lib/events.ts` and demo response counts when Supabase env is missing or queries fail.

## Verification Checklist

- [x] `npm run dev` works locally
- [x] `npm run build` succeeds
- [x] `npm run lint` passes (img-element warnings acceptable for remote/dynamic URLs)
- [ ] Deployed output renders correctly on GitHub Pages (`/bearhood` base path)
- [ ] Supabase: run README SQL, confirm auth + `event_responses` work end-to-end

## References

- `README.md`
- `.env.local.example`
- `.github/workflows/deploy.yml`
