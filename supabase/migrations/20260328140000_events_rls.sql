-- Enable RLS on events and allow public read access via anon key.
-- Write access is intentionally omitted; events are managed via
-- Supabase dashboard / SQL editor, not from the client.

alter table public.events enable row level security;

drop policy if exists "Public events are viewable by everyone" on public.events;
create policy "Public events are viewable by everyone"
  on public.events for select
  using (true);
