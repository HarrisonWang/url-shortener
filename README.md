# URL Shortener

[English](README.md) | [中文](README.zh.md)

URL Shortener is a free tool designed to help users easily shorten long URLs. Our goal is to make URL shortening simple, fast, and efficient. Whether you're a marketer, developer, or anyone who needs to share links, URL Shortener can help you create concise, manageable links.

## About the Author

This website is built by [Harrison Wang](https://x.com/voywang) using [Cursor](https://www.cursor.com/) and theme originally by [Viggo](https://x.com/decohack).

## Features

- **Instant URL Shortening**: Quickly generate short links for any long URL.
- **Custom Short Links**: Create memorable and branded short URLs.
- **Analytics**: Track the performance of your shortened links.
- **Secure and Reliable**: Ensure safe redirection and link management.
- **Free to Use**: No cost associated with creating or managing short links.

## Installation and Running

### Prepare Supabase Project

Run the following SQL commands in your Supabase project to create the necessary tables:

```sql
create table
  public.links (
    id serial not null,
    url text null,
    slug text null,
    ua text null,
    ip text null,
    status integer null,
    created_at timestamp without time zone null default current_timestamp,
    constraint links_pkey primary key (id)
  ) tablespace pg_default;

create table
  public.logs (
    id serial not null,
    url text null,
    slug text null,
    referer text null,
    ua text null,
    ip text null,
    created_at timestamp without time zone null default current_timestamp,
    constraint logs_pkey primary key (id)
  ) tablespace pg_default;
```

### 1. Deploy to Vercel

Click the button below to deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FHarrisonWang%2Furl-shortener&env=NEXT_PUBLIC_SUPABASE_URL&env=NEXT_PUBLIC_SUPABASE_KEY&project-name=url-shortener&repository-name=url-shortener)

Configure the following environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_KEY`

### 2. Run Docker

#### 2.1. Clone the Repository

```bash
git clone https://github.com/harrisonwang/url-shortener.git
```

#### 2.2. Rename `.env.example` to `.env` and set environment variables

```bash
mv .env.example .env
```

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_KEY=
```

#### 2.3. Run Docker Container

```bash
docker compose up -d
```

#### 2.4. Access the Application

Open your browser and visit `http://localhost:3000`, you should be able to see the URL short link generator interface.

### 3. Run Locally

#### 3.1. Clone the Repository

```bash
git clone https://github.com/harrisonwang/url-shortener.git
```

#### 3.2. Install Dependencies

```bash
npm i
```

#### 3.3. Rename `.env.example` to `.env` and set environment variables

```bash
mv .env.example .env
```

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_KEY=
```

#### 3.4. Run the Development Server

```bash
npm run dev
```
