-- SOCSignals V2 Database Schema
-- Run this in your Supabase SQL Editor

-- 1. Profiles Table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  role text default 'user' check (role in ('admin','editor','author','user')),
  created_at timestamptz default now()
);

-- 2. Categories Table
create table categories (
  id serial primary key,
  name text unique not null,
  slug text unique not null,
  description text,
  color text default '#0d7ff2',
  created_at timestamptz default now()
);

-- 3. Articles Table
create table articles (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  slug text unique not null,
  excerpt text,
  cover_image text,
  content jsonb, -- Editor.js blocks
  category_id int references categories(id),
  tags text[],
  status text default 'draft' check (status in ('draft','published','scheduled','archived')),
  published_at timestamptz,
  scheduled_for timestamptz,
  read_time int,
  view_count int default 0,
  seo_title text,
  seo_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  search_vector tsvector generated always as (
    to_tsvector('english', coalesce(title,'') || ' ' || coalesce(excerpt,''))
  ) stored
);
create index articles_search_idx on articles using gin(search_vector);

-- 4. Comments Table (Threaded)
create table comments (
  id uuid default gen_random_uuid() primary key,
  article_id uuid references articles(id) on delete cascade not null,
  author_id uuid references profiles(id) on delete cascade not null,
  parent_id uuid references comments(id),
  content text not null,
  is_approved boolean default true,
  created_at timestamptz default now()
);

-- 5. Bookmarks Table
create table bookmarks (
  user_id uuid references profiles(id) on delete cascade not null,
  article_id uuid references articles(id) on delete cascade not null,
  created_at timestamptz default now(),
  primary key (user_id, article_id)
);

-- 6. Reactions Table (Emoji)
create table reactions (
  user_id uuid references profiles(id) on delete cascade not null,
  article_id uuid references articles(id) on delete cascade not null,
  emoji text not null,
  created_at timestamptz default now(),
  primary key (user_id, article_id)
);

-- 7. Category Subscriptions
create table category_subscriptions (
  user_id uuid references profiles(id) on delete cascade not null,
  category_id int references categories(id) on delete cascade not null,
  created_at timestamptz default now(),
  primary key (user_id, category_id)
);

-- 8. Audit Logs Table
create table audit_logs (
  id serial primary key,
  actor_id uuid references profiles(id),
  action text not null,
  target_type text,
  target_id text,
  metadata jsonb,
  created_at timestamptz default now()
);

-- SET UP ROW LEVEL SECURITY (RLS)

-- Profiles
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Categories
alter table categories enable row level security;
create policy "Categories are viewable by everyone." on categories for select using (true);

-- Articles
alter table articles enable row level security;
create policy "Published articles are viewable by everyone." on articles for select using (status = 'published');
create policy "Authors can view their own drafts." on articles for select using (auth.uid() = author_id);
create policy "Authors can insert their own articles." on articles for insert with check (auth.uid() = author_id);
create policy "Authors can update their own articles." on articles for update using (auth.uid() = author_id);

-- Comments
alter table comments enable row level security;
create policy "Approved comments are viewable by everyone." on comments for select using (is_approved = true);
create policy "Users can post comments." on comments for insert with check (auth.uid() = author_id);

-- Bookmarks
alter table bookmarks enable row level security;
create policy "Users can view own bookmarks." on bookmarks for select using (auth.uid() = user_id);
create policy "Users can modify own bookmarks." on bookmarks for all using (auth.uid() = user_id);

-- Reactions
alter table reactions enable row level security;
create policy "Reactions are viewable by everyone." on reactions for select using (true);
create policy "Users can modify own reactions." on reactions for all using (auth.uid() = user_id);

-- Audit Logs (Admin ONLY)
alter table audit_logs enable row level security;
-- Policy for admin would go here based on role in profiles
