-- CarSpot Seed Data
-- Run after schema.sql

insert into public.cars (make, model, year, category, rarity, base_xp) values
  ('Toyota',      'Camry',         2022, 'Daily',    'Common',    25),
  ('Honda',       'Civic',         2023, 'Daily',    'Common',    25),
  ('Toyota',      'Corolla',       2022, 'Daily',    'Common',    25),
  ('Honda',       'Accord',        2023, 'Daily',    'Common',    30),
  ('Ford',        'F-150',         2022, 'Truck',    'Common',    30),
  ('Chevrolet',   'Silverado',     2022, 'Truck',    'Common',    30),
  ('Ford',        'Mustang GT',    2023, 'Muscle',   'Rare',      75),
  ('Chevrolet',   'Camaro SS',     2022, 'Muscle',   'Rare',      80),
  ('Dodge',       'Challenger SRT',2022, 'Muscle',   'Rare',      80),
  ('Subaru',      'WRX STI',       2021, 'JDM',      'Rare',      80),
  ('Mitsubishi',  'Lancer Evo X',  2015, 'JDM',      'Rare',      85),
  ('Honda',       'Civic Type R',  2023, 'JDM',      'Rare',      85),
  ('BMW',         'M3',            2023, 'Sport',    'Rare',      85),
  ('Audi',        'RS6',           2022, 'Sport',    'Rare',      90),
  ('Mercedes',    'AMG C63',       2022, 'Sport',    'Rare',      90),
  ('Nissan',      'GT-R',          2020, 'JDM',      'Rare',      90),
  ('Porsche',     '911 GT3',       2023, 'Supercar', 'Legendary', 200),
  ('Porsche',     'Cayman GT4',    2022, 'Supercar', 'Legendary', 175),
  ('Ferrari',     '488 Pista',     2020, 'Exotic',   'Legendary', 250),
  ('Ferrari',     'SF90 Stradale', 2022, 'Exotic',   'Legendary', 350),
  ('Lamborghini', 'Huracan',       2022, 'Exotic',   'Legendary', 300),
  ('Lamborghini', 'Urus',          2022, 'Exotic',   'Legendary', 200),
  ('McLaren',     '720S',          2021, 'Supercar', 'Legendary', 275),
  ('McLaren',     'Senna',         2019, 'Hypercar', 'Legendary', 400),
  ('Bugatti',     'Chiron',        2021, 'Hypercar', 'Legendary', 500),
  ('Koenigsegg',  'Jesko',         2023, 'Hypercar', 'Legendary', 500),
  ('Pagani',      'Huayra',        2021, 'Hypercar', 'Legendary', 500)
on conflict (make, model, year) do nothing;

-- Sample weekly challenges
insert into public.challenges (title, description, xp_reward, target_count, challenge_type, target_value, expires_at) values
  ('First Spot',      'Spot your first car',                50,  1, 'spot_count',    null,        now() + interval '7 days'),
  ('Spotted 5',       'Spot 5 cars total',                 100,  5, 'spot_count',    null,        now() + interval '7 days'),
  ('JDM Hunter',      'Spot 3 JDM cars',                   150,  3, 'spot_category', 'JDM',       now() + interval '7 days'),
  ('Rare Spotter',    'Spot a Rare car',                   100,  1, 'spot_rarity',   'Rare',      now() + interval '7 days'),
  ('Legendary Chase', 'Spot a Legendary car',              300,  1, 'spot_rarity',   'Legendary', now() + interval '7 days'),
  ('Speed Streak',    'Spot cars 3 days in a row',         200,  3, 'streak',         null,       now() + interval '7 days')
on conflict do nothing;
