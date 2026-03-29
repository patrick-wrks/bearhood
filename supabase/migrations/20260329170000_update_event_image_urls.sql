-- Point event image columns at Supabase Storage public URLs.

UPDATE public.events
SET
  image_url    = 'https://xitzmarhnobazxbuthjy.supabase.co/storage/v1/object/public/event-images/naughty-club-edition/banner.webp',
  logo_url     = 'https://xitzmarhnobazxbuthjy.supabase.co/storage/v1/object/public/event-images/naughty-club-edition/logo.webp',
  hero_image_url = 'https://xitzmarhnobazxbuthjy.supabase.co/storage/v1/object/public/event-images/naughty-club-edition/hero.webp'
WHERE id = 'naughty-club-edition';

UPDATE public.events
SET
  image_url    = 'https://xitzmarhnobazxbuthjy.supabase.co/storage/v1/object/public/event-images/bearoke/banner.webp',
  logo_url     = 'https://xitzmarhnobazxbuthjy.supabase.co/storage/v1/object/public/event-images/bearoke/logo.webp',
  hero_image_url = 'https://xitzmarhnobazxbuthjy.supabase.co/storage/v1/object/public/event-images/bearoke/hero.webp'
WHERE id = 'bearoke';
