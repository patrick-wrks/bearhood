# techstack.md

## Framework & Runtime
- Next.js `16.2.1` (App Router, `output: "export"` static export)
- React `19.2.4`
- React DOM `19.2.4`
- TypeScript `5`
- Node/Build runtime: `node-version: 22` (GitHub Actions)
- Routing/UI composition: `app/` directory with `layout.tsx` and `page.tsx`

## Styling & UI Kit
- Tailwind CSS `^4` (via `@tailwindcss/postcss` + `app/globals.css` imports)
- shadcn/ui (`shadcn` package; styles imported from `app/globals.css`)
- base component library: `@base-ui/react`
- `clsx`
- `tailwind-merge`
- `class-variance-authority`
- `date-fns` (date handling in UI)
- Animation helpers: `tw-animate-css`
- `cmdk` (command palette-style UI)
- `vaul` (drawer/sheet-like UI primitives)
- `sonner` (toast notifications)

## Backend / Data Services
- Supabase (`@supabase/supabase-js`)
- Client initialization: `lib/supabase.ts` (`createClient`)
- Data access: `lib/events.ts` queries `public.events` via `.from("events").select("*")`
- Fallback behavior: if `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are missing or query fails, the app uses built-in `demoEvents`

## Icons / UX Libraries
- `lucide-react` (icons)
- `embla-carousel-react` (hero/event carousel)
- `embla-carousel-autoplay` (carousel autoplay)
- `react-day-picker` (calendar UI)
- `input-otp` (OTP input UI)

## Theming
- `next-themes` (theme handling; dark mode support)
- CSS theme variables defined in `app/globals.css` (uses `.dark` class)

## Tooling & Quality
- ESLint: `eslint` `^9` + `eslint-config-next` `16.2.1`

## CI/CD & Deployment
- GitHub Actions (`.github/workflows/deploy.yml`)
- Build: `npm run lint` then `npm run build`
- Deploy: static site artifact from `./out` to GitHub Pages via `actions/deploy-pages`

## Environment Variables
- `.env.local.example`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## npm Scripts
- `npm run dev` (Next dev server)
- `npm run build` (Next build, produces static export due to `next.config.ts`)
- `npm run start` (Next start)
- `npm run lint` (eslint)

## Source References (for future AI)
- `next.config.ts` (static export + basePath/assetPrefix)
- `app/` (App Router + layout)
- `app/globals.css` (Tailwind + shadcn theme imports)
- `lib/supabase.ts` and `lib/events.ts` (Supabase client + queries)
- `components/ui/*` (shadcn-based UI components)

