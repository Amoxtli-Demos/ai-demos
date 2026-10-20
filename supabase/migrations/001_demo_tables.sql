-- Tablas de las demos de AMOXTLI. Se separan por demo para no mezclar datos.
create table if not exists public.demo_leads (
  id uuid primary key,
  created_at timestamptz not null default now(),
  nombre text not null,
  empresa text not null default '',
  email text not null,
  telefono text not null default '',
  servicio text not null,
  mensaje text not null default '',
  estado text not null default 'nuevo' check (estado in ('nuevo','contacto','cerrado'))
);

create table if not exists public.demo_citas (
  id uuid primary key,
  created_at timestamptz not null default now(),
  nombre text not null,
  telefono text not null,
  servicio text not null,
  dia date not null,
  hora text not null,
  unique (dia, hora)
);

-- Solo el servidor (service role) accede. Sin políticas = ningún acceso público.
alter table public.demo_leads enable row level security;
alter table public.demo_citas enable row level security;
