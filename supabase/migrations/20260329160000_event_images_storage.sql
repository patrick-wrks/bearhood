-- Public storage bucket for event images (banners, logos, hero images).
-- Upload via `supabase storage cp <file> ss:///event-images/<file>`.

INSERT INTO storage.buckets (id, name, public)
VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Event images are publicly accessible" ON storage.objects;
CREATE POLICY "Event images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'event-images');

-- Allow service-role and authenticated uploads (admin workflow).
DROP POLICY IF EXISTS "Authenticated users can upload event images" ON storage.objects;
CREATE POLICY "Authenticated users can upload event images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'event-images');

DROP POLICY IF EXISTS "Authenticated users can update event images" ON storage.objects;
CREATE POLICY "Authenticated users can update event images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'event-images');

DROP POLICY IF EXISTS "Authenticated users can delete event images" ON storage.objects;
CREATE POLICY "Authenticated users can delete event images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'event-images');

-- Add logo_url and hero_image_url columns to events table.
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS logo_url text;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS hero_image_url text;
