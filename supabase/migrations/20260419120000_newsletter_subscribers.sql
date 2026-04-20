-- Newsletter subscribers
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  locale text not null default 'en' check (locale in ('en', 'de')),
  created_at timestamptz not null default now()
);

-- Anyone can insert (public newsletter form); only service_role can read/update/delete.
alter table public.newsletter_subscribers enable row level security;

create policy "Anyone can subscribe to newsletter"
  on public.newsletter_subscribers
  for insert
  to anon, authenticated
  with check (true);

create index if not exists idx_newsletter_subscribers_email
  on public.newsletter_subscribers (email);
