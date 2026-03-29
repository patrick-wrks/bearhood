-- Alter events.id from uuid to text so code-side overrides in
-- mapSupabaseEvent can match by human-readable slug (e.g. "naughty-club-edition").
-- Related tables (event_likes, event_comments, event_bookmarks) already use text for event_id.

ALTER TABLE public.events ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.events ALTER COLUMN id TYPE text USING id::text;

-- Seed the two launch events that match the demo data in lib/events.ts.
-- image_url is a placeholder; the Next.js app overrides it with local assets
-- for these known IDs (see mapSupabaseEvent).

INSERT INTO public.events (id, title, description, short_description, date, location, image_url, ticket_url, learn_more_url, is_featured, capacity, price, tags)
VALUES
  (
    'naughty-club-edition',
    'Naughty! club edition',
    'Naked Industries<br><br>Worker attitude meets raw desire. Boots on concrete, harness on skin, helmets, suspenders, and industrial vibes in the dim light. Masculine, direct, uncompromising. Here, there is sweat, play, and work — on the body, in the gaze, in the tension between closeness and dominance.<br><br>Dress it rugged. Wear it proud.',
    'Naked Industries meets raw desire in dim industrial light.',
    '2026-03-29T18:00:00+02:00',
    'Club Culture Houze, Görlitzer Str. 71, 10997 Berlin',
    'placeholder',
    'https://www.club-culture-houze.de/Veranstaltung/b-2/?instance_id=38619',
    'https://www.club-culture-houze.de/Veranstaltung/b-2/?instance_id=38619',
    true,
    300,
    0,
    ARRAY['cruising', 'fetish']
  ),
  (
    'bearoke',
    'Bearaoke',
    E'A legendary Bearhood tradition from long before COVID is finally back!<br><br>This Maundy Thursday, we\u2019re bringing BEARAOKE back to life \u2013 loud, warm-hearted and wonderfully unapologetic.<br><br>Everyone is welcome to sing. Pick your favorite song, grab the mic or simply sing along at the top of your lungs \u2013 whether you\u2019re a stage pro or a shower singer. It\u2019s all about fun, community and good vibes.<br><br>Hosted on stage by the fabulous Monnica Bearvisky, guiding you through the night with charm, humor and a touch of glam.<br><br>\u2728 What to expect:<br>\u2022 Karaoke stage show & free box hopping<br>\u2022 Optional beer flat for \u20ac25, available on site \ud83c\udf7a<br>\u2022 Free cloakroom<br>\u2022 Darkroom for those who want to explore deeper tones later on<br>\u2022 An open, respectful and welcoming atmosphere<br><br>Whether you\u2019ve been part of BEARAOKE back in the day or are joining for the first time: come together, sing it out and celebrate the return of a true tradition.<br><br>More info coming soon \u2013 we can\u2019t wait to see you!',
    E'A legendary Bearhood tradition is back: BEARAOKE \u2013 karaoke, box hopping, and good vibes.',
    '2026-04-02T20:00:00+02:00',
    E'Monster Ronson\u2019s Ichiban Karaoke, Warschauer Str. 34, 10243 Berlin',
    'placeholder',
    'https://www.eventbrite.de/e/bearaoke-the-return-tickets-1982241454551?aff=web',
    'https://www.eventbrite.de/e/bearaoke-the-return-tickets-1982241454551?aff=web',
    true,
    400,
    0,
    ARRAY['party', 'social', 'cruising']
  )
ON CONFLICT (id) DO NOTHING;
