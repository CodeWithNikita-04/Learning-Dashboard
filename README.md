# LearnSpace — Student Learning Dashboard

A frontend internship assignment project. Built a dark-themed student dashboard with a bento grid layout, live Supabase data, and Framer Motion animations.

**Live demo:** _deploy to Vercel and paste the link here_

---

## What this is

A dashboard where students can see their active courses, learning streak, and activity graph. The course data is fetched from Supabase so it's actually dynamic, not hardcoded.

## Tech stack

- **Next.js 15** (App Router)
- **Supabase** for the database
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **TypeScript** throughout
- **Lucide React** for icons

---

## Setup

### 1. Clone and install

```bash
git clone https://github.com/your-username/learning-dashboard
cd learning-dashboard
npm install
```

### 2. Create a Supabase project

Go to [supabase.com](https://supabase.com), create a free project, then in the SQL editor run:

```sql
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null,
  icon_name text not null,
  created_at timestamp with time zone default now()
);

insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Code2'),
  ('Next.js Fundamentals', 60, 'Layers'),
  ('TypeScript Essentials', 90, 'FileCode'),
  ('UI Animation with Framer Motion', 45, 'Sparkles');
```

### 3. Add environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Then open `.env.local` and add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Supabase → Settings → API.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/dashboard`.

---

## Architecture choices

### Why Server Components for data fetching?

I kept all Supabase calls in Server Components (`app/dashboard/page.tsx`) so the data is fetched before anything reaches the browser. This means no loading spinners for the initial data, no client-side API calls leaking env variables, and better performance overall. The Supabase anon key is technically public but keeping it server-side felt cleaner.

The flow is:
1. User hits `/dashboard`
2. Next.js shows `loading.tsx` (skeleton UI) instantly
3. Server Component fetches from Supabase in the background
4. Suspense boundary swaps the skeleton for real content

### Why Framer Motion?

Honestly, I could have done basic CSS transitions but the assignment required spring physics, and Framer Motion makes that way easier. The `type: "spring"` config with `stiffness: 300, damping: 20` gives a natural bounce that feels better than any CSS cubic-bezier I'd pick manually.

The stagger effect on bento tiles uses a `staggerChildren` variant on the container — each tile animates in 80ms after the previous one. It's a small thing but it makes the dashboard feel polished.

I also used `layoutId="sidebar-active-bg"` for the sidebar highlight — this is probably my favorite part of the project. The active indicator smoothly slides between nav items instead of just blinking on/off.

### Server/client split

The tricky part was that Framer Motion's `motion` components need `'use client'`. So the Server Component (`page.tsx`) fetches data, then passes it to `BentoGrid.tsx` which is a client component that handles all the animations. No data fetching on the client side.

```
page.tsx (Server) → fetches courses → passes as props
BentoGrid.tsx (Client) → receives courses → renders with animations
CourseCard.tsx (Client) → receives single course → animates
```

### Challenges

The `@supabase/ssr` package cookie handling was a bit confusing at first. The `setAll` inside Server Components throws errors sometimes because you can't set cookies in RSC during rendering — wrapping it in a try/catch fixed it, which is actually what the Supabase docs recommend.

Getting the sidebar to collapse smoothly without content jumping was annoying. Eventually settled on animating only `width` with `overflow: hidden` and using `AnimatePresence` to fade text in/out separately.

---

## Deployment

Push to GitHub, then import the repo in [Vercel](https://vercel.com). Add the two Supabase env variables in Vercel's project settings under Environment Variables and it should just work.

Don't commit `.env.local` — it's in `.gitignore` already.
