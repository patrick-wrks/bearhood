alter table public.events
  add column if not exists title_de text,
  add column if not exists description_de text,
  add column if not exists short_description_de text;
