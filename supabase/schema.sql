-- CarSpot Database Schema
-- Run once in Supabase SQL Editor

create extension if not exists "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================
create type rarity as enum ('Common', 'Rare', 'Legendary');
create type challenge_type as enum ('spot_count', 'spot_rarity', 'spot_category', 'streak');

-- ============================================================
-- USERS (extends auth.users)
-- ============================================================
create table public.users (
  id              uuid primary key references auth.users(id) on delete cascade,
  username        text not null unique,
  avatar_url      text,
  xp              integer not null default 0,
  level           integer not null default 1,
  streak          integer not null default 0,
  last_spotted_at timestamptz,
  created_at      timestamptz not null default now()
);

alter table public.users enable row level security;
create policy "view any profile"   on public.users for select using (true);
create policy "update own profile" on public.users for update using (auth.uid() = id);
create policy "insert own profile" on public.users for insert with check (auth.uid() = id);

-- ============================================================
-- CARS (admin-managed catalogue)
-- ============================================================
create table public.cars (
  id         uuid primary key default uuid_generate_v4(),
  make       text not null,
  model      text not null,
  year       integer,
  category   text not null,   -- Supercar, JDM, Muscle, Exotic, Hypercar, Daily, Truck, Sport
  rarity     rarity not null default 'Common',
  image_url  text,
  base_xp    integer not null default 50,
  created_at timestamptz not null default now(),
  unique (make, model, year)
);

alter table public.cars enable row level security;
create policy "auth users view cars" on public.cars for select to authenticated using (true);

-- ============================================================
-- SIGHTINGS
-- ============================================================
create table public.sightings (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.users(id) on delete cascade,
  car_id      uuid references public.cars(id) on delete cascade,
  photo_url   text,
  lat         double precision,
  lng         double precision,
  confidence  numeric(5,2),
  created_at  timestamptz not null default now()
);

create index sightings_location_idx on public.sightings (lat, lng);
create index sightings_user_idx     on public.sightings (user_id, created_at desc);

alter table public.sightings enable row level security;
create policy "view all sightings"  on public.sightings for select to authenticated using (true);
create policy "insert own sightings" on public.sightings for insert to authenticated with check (auth.uid() = user_id);
create policy "delete own sightings" on public.sightings for delete using (auth.uid() = user_id);

-- ============================================================
-- GARAGE (deduplicated collection)
-- ============================================================
create table public.garage (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references public.users(id) on delete cascade,
  car_id           uuid not null references public.cars(id) on delete cascade,
  first_spotted_at timestamptz not null default now(),
  spot_count       integer not null default 1,
  unique (user_id, car_id)
);

create index garage_user_idx on public.garage (user_id);

alter table public.garage enable row level security;
create policy "view own garage"  on public.garage for select to authenticated using (auth.uid() = user_id);
create policy "insert garage"    on public.garage for insert to authenticated with check (auth.uid() = user_id);
create policy "update garage"    on public.garage for update using (auth.uid() = user_id);

-- ============================================================
-- CHALLENGES
-- ============================================================
create table public.challenges (
  id             uuid primary key default uuid_generate_v4(),
  title          text not null,
  description    text,
  xp_reward      integer not null default 100,
  target_count   integer not null default 1,
  challenge_type challenge_type not null,
  target_value   text,
  expires_at     timestamptz not null,
  created_at     timestamptz not null default now()
);

alter table public.challenges enable row level security;
create policy "view active challenges" on public.challenges for select using (expires_at > now());

-- ============================================================
-- USER_CHALLENGES
-- ============================================================
create table public.user_challenges (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.users(id) on delete cascade,
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  progress     integer not null default 0,
  completed_at timestamptz,
  created_at   timestamptz not null default now(),
  unique (user_id, challenge_id)
);

create index user_challenges_user_idx on public.user_challenges (user_id);

alter table public.user_challenges enable row level security;
create policy "view own challenge progress"  on public.user_challenges for select to authenticated using (auth.uid() = user_id);
create policy "insert challenge progress"    on public.user_challenges for insert to authenticated with check (auth.uid() = user_id);
create policy "update challenge progress"    on public.user_challenges for update using (auth.uid() = user_id);

-- ============================================================
-- STORAGE BUCKET
-- ============================================================
insert into storage.buckets (id, name, public)
  values ('sighting-photos', 'sighting-photos', true)
  on conflict do nothing;

create policy "anyone can view photos"
  on storage.objects for select
  using (bucket_id = 'sighting-photos');

create policy "auth users upload photos"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'sighting-photos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "users delete own photos"
  on storage.objects for delete
  using (bucket_id = 'sighting-photos' and (storage.foldername(name))[1] = auth.uid()::text);

-- ============================================================
-- REALTIME
-- ============================================================
alter publication supabase_realtime add table public.sightings;
alter publication supabase_realtime add table public.user_challenges;

-- ============================================================
-- SERVER-SIDE FUNCTIONS
-- ============================================================
create or replace function public.award_xp(p_user_id uuid, p_xp_amount integer)
returns void language plpgsql security definer as $$
declare
  new_xp    integer;
  new_level integer;
begin
  update public.users
    set xp = xp + p_xp_amount
    where id = p_user_id
    returning xp into new_xp;

  new_level := greatest(1, floor(sqrt(new_xp::float / 100))::integer + 1);

  update public.users
    set level = new_level
    where id = p_user_id;
end;
$$;

create or replace function public.upsert_garage(p_user_id uuid, p_car_id uuid)
returns void language plpgsql security definer as $$
begin
  insert into public.garage (user_id, car_id, first_spotted_at, spot_count)
    values (p_user_id, p_car_id, now(), 1)
  on conflict (user_id, car_id)
  do update set spot_count = garage.spot_count + 1;
end;
$$;
