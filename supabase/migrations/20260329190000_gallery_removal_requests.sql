-- Gallery image removal requests
create table if not exists public.gallery_removal_requests (
  id uuid primary key default gen_random_uuid(),
  image_id text not null,
  gallery_slug text not null,
  user_id uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  unique (image_id, user_id)
);

alter table public.gallery_removal_requests enable row level security;

-- Authenticated users can submit removal requests
create policy "Authenticated users can insert removal requests"
  on public.gallery_removal_requests
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Users can read their own requests (to restore button state)
create policy "Users can read own removal requests"
  on public.gallery_removal_requests
  for select
  to authenticated
  using (auth.uid() = user_id);
