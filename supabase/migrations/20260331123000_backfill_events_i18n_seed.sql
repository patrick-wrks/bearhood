update public.events
set
  title_de = 'Naughty! club edition',
  short_description_de = 'Naked Industries trifft auf rohes Verlangen im gedämpften Industrielicht.',
  description_de = 'Naked Industries<br><br>Worker-Attitude trifft auf rohes Verlangen. Stiefel auf Beton, Harness auf Haut, Helme, Hosenträger und industrieller Vibe im gedämpften Licht. Maskulin, direkt, kompromisslos. Hier wird geschwitzt, gespielt und gearbeitet – am Körper, im Blick, in der Spannung zwischen Nähe und Dominanz.<br><br>Zieh es rau an. Trag es stolz.'
where id = 'naughty-club-edition'
  and (title_de is null or short_description_de is null or description_de is null);

update public.events
set
  title_de = 'Bearaoke',
  short_description_de = 'Eine legendäre Bearhood-Tradition ist zurück: BEARAOKE – Karaoke, Box-Hopping und gute Vibes.',
  description_de = 'Eine legendäre Tradition aus der Zeit lange vor Corona ist zurück!<br><br>Am Gründonnerstag feiern wir die Wiederbelebung von BEARAOKE – laut, herzlich und herrlich ungezwungen.<br><br>Jeder darf mitsingen. Such dir deinen Lieblingssong aus, schnapp dir das Mikro oder sing einfach aus vollem Herzen mit – ganz egal, ob du Bühnenprofi bist oder nur unter der Dusche übst. Hier geht es um Spaß, Gemeinschaft und gute Vibes.<br><br>Durch den Abend führt euch u. a. Monnica Bearvisky mit Charme, Humor und Glamour durch die Bühnenshow.<br><br>✨ Was euch erwartet:<br>• Karaoke-Bühnenshow & kostenloses Box-Hopping<br>• Optionale Bierflat für 25 €, vor Ort erhältlich 🍺<br>• Kostenfreie Garderobe<br>• Darkroom für alle, die nach dem Singen noch andere Töne anschlagen wollen<br>• Offene, respektvolle Atmosphäre<br><br>Ob alte BEARAOKE-Stimmen oder neue Gesichter: Komm vorbei, sing dich frei und erlebe mit uns das Comeback einer echten Tradition.<br><br>Weitere Infos folgen – wir freuen uns auf euch!'
where id = 'bearoke'
  and (title_de is null or short_description_de is null or description_de is null);
