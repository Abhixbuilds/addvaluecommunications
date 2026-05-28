-- ============================================================
-- AddValue Communications — Supabase PostgreSQL Schema
-- Phase 5 | Run in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── ENUMS ─────────────────────────────────────────────────
create type user_role as enum ('client', 'admin', 'manager');
create type project_status as enum ('planning', 'active', 'review', 'completed', 'paused');
create type invoice_status as enum ('pending', 'paid', 'overdue', 'cancelled');
create type service_type as enum ('finance', 'advertisement', 'pr', 'marketing', 'insurance');

-- ── PROFILES ──────────────────────────────────────────────
-- One profile per Clerk user. Created automatically on first sign-in.
create table public.profiles (
  id                uuid primary key default uuid_generate_v4(),
  clerk_user_id     text unique not null,
  email             text not null,
  full_name         text,
  business_name     text,
  industry          text,
  phone             text,
  website           text,
  social_links      text,
  role              user_role not null default 'client',
  avatar_url        text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- RLS: Users can only read/update their own profile
alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

create policy "profiles_update_own" on public.profiles
  for update using (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Admin can read all profiles
create policy "profiles_select_admin" on public.profiles
  for select using (
    current_setting('request.jwt.claims', true)::json->'metadata'->>'role' = 'admin'
  );

-- ── PROJECTS ──────────────────────────────────────────────
create table public.projects (
  id              uuid primary key default uuid_generate_v4(),
  client_id       uuid not null references public.profiles(id) on delete cascade,
  name            text not null,
  service         service_type not null,
  subcategory     text not null,
  status          project_status not null default 'planning',
  progress        integer not null default 0 check (progress >= 0 and progress <= 100),
  start_date      date not null,
  due_date        date not null,
  manager_name    text,
  budget          bigint not null default 0, -- stored in paise (₹1 = 100 paise)
  color           text not null default '#38BDF8',
  last_update     text,
  tags            text[] not null default '{}',
  description     text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

alter table public.projects enable row level security;

-- Clients can read their own projects
create policy "projects_select_own" on public.projects
  for select using (
    client_id in (
      select id from public.profiles
      where clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );

-- Admins/managers can read all projects
create policy "projects_select_admin" on public.projects
  for select using (
    current_setting('request.jwt.claims', true)::json->'metadata'->>'role' in ('admin', 'manager')
  );

create policy "projects_all_admin" on public.projects
  for all using (
    current_setting('request.jwt.claims', true)::json->'metadata'->>'role' = 'admin'
  );

-- ── INVOICES ──────────────────────────────────────────────
create table public.invoices (
  id              uuid primary key default uuid_generate_v4(),
  project_id      uuid references public.projects(id) on delete set null,
  client_id       uuid not null references public.profiles(id) on delete cascade,
  invoice_number  text unique not null,           -- e.g. INV-2026-001
  amount          bigint not null,                -- in paise
  gst_amount      bigint not null default 0,      -- 18% GST
  total_amount    bigint not null,
  status          invoice_status not null default 'pending',
  package_name    text not null,
  payment_method  text,                           -- 'razorpay' | 'stripe'
  payment_id      text,                           -- Gateway transaction ID
  issued_date     date not null default current_date,
  due_date        date not null,
  paid_date       date,
  pdf_url         text,
  created_at      timestamptz not null default now()
);

alter table public.invoices enable row level security;

create policy "invoices_select_own" on public.invoices
  for select using (
    client_id in (
      select id from public.profiles
      where clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );

create policy "invoices_all_admin" on public.invoices
  for all using (
    current_setting('request.jwt.claims', true)::json->'metadata'->>'role' = 'admin'
  );

-- ── MESSAGES ──────────────────────────────────────────────
create table public.messages (
  id          uuid primary key default uuid_generate_v4(),
  project_id  uuid references public.projects(id) on delete cascade,
  sender_id   uuid not null references public.profiles(id) on delete cascade,
  receiver_id uuid not null references public.profiles(id) on delete cascade,
  content     text not null,
  is_read     boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table public.messages enable row level security;

create policy "messages_select_participants" on public.messages
  for select using (
    sender_id in (select id from public.profiles where clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub')
    or
    receiver_id in (select id from public.profiles where clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub')
  );

create policy "messages_insert_own" on public.messages
  for insert with check (
    sender_id in (select id from public.profiles where clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub')
  );

-- ── ONBOARDING SUBMISSIONS ────────────────────────────────
create table public.onboarding_submissions (
  id                  uuid primary key default uuid_generate_v4(),
  client_id           uuid references public.profiles(id) on delete set null,
  session_id          text not null,               -- Browser session identifier
  service             service_type not null,
  subcategory         text not null,
  business_name       text not null,
  industry            text not null,
  goals               text not null,
  budget              text not null,
  timeline            text not null,
  campaign_size       text not null,
  target_audience     text not null,
  existing_assets     text,
  additional_notes    text,
  recommendation_json jsonb,                       -- Stored AI recommendation
  created_at          timestamptz not null default now()
);

alter table public.onboarding_submissions enable row level security;

create policy "submissions_insert_anyone" on public.onboarding_submissions
  for insert with check (true); -- Anyone can submit

create policy "submissions_select_own" on public.onboarding_submissions
  for select using (
    client_id in (select id from public.profiles where clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub')
  );

create policy "submissions_all_admin" on public.onboarding_submissions
  for all using (
    current_setting('request.jwt.claims', true)::json->'metadata'->>'role' = 'admin'
  );

-- ── AUTO-UPDATE TRIGGERS ──────────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at before update on public.profiles
  for each row execute function update_updated_at();

create trigger projects_updated_at before update on public.projects
  for each row execute function update_updated_at();

-- ── INVOICE NUMBER SEQUENCE ───────────────────────────────
create sequence if not exists invoice_number_seq start 1;

create or replace function generate_invoice_number()
returns text as $$
begin
  return 'INV-' || to_char(current_date, 'YYYY') || '-' || lpad(nextval('invoice_number_seq')::text, 3, '0');
end;
$$ language plpgsql;

-- ── INDEXES ───────────────────────────────────────────────
create index idx_projects_client_id on public.projects(client_id);
create index idx_projects_status on public.projects(status);
create index idx_invoices_client_id on public.invoices(client_id);
create index idx_invoices_status on public.invoices(status);
create index idx_messages_receiver on public.messages(receiver_id, is_read);
create index idx_submissions_session on public.onboarding_submissions(session_id);

-- ============================================================
-- Run this file in Supabase SQL Editor:
-- supabase.com → Project → SQL Editor → New query → Paste → Run
-- ============================================================
