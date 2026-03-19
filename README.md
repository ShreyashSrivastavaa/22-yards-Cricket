# 🏏 22 Yards — Cricket Stats Tracker

A full-stack cricket statistics platform for tracking scores,
player profiles, and match history across IPL 2022–2025.

> Built to survive API outages — fully functional offline using
> a local ball-by-ball dataset.

---

## Why I built this

Cricket data APIs are unreliable — rate limits, key expirations,
and provider changes break apps overnight. I wanted a system where
the data source was an implementation detail, not a dependency.
That's the adapter pattern in action.

---

## Architecture

- **Adapter pattern** — all data access goes through a consistent
  interface. Swapping providers (API → CSV → DB) = changing one file,
  not rewriting the app.

- **Local dataset** — migrated from RapidAPI to a local ball-by-ball
  IPL CSV dataset (2022–2025). Zero rate-limit risk, works offline,
  deploy anywhere.

- **Prisma + Supabase** — schema managed as code with versioned
  migrations. No manual SQL, no environment drift.

- **Next.js App Router** — server components handle data-heavy pages
  (standings, match history). Client components scoped only to
  interactive elements.

- **Auth** — Supabase Auth with middleware-level route protection.

---

## Stack

`Next.js 14` · `Prisma` · `Supabase` · `Tailwind CSS` · `JavaScript`

---

## Running locally
```bash
git clone https://github.com/ShreyashSrivastavaa/22-yards-Cricket
cd 22-yards-Cricket
npm install
cp .env.example .env   # add your Supabase keys
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure
```
├── adapters/          # Data source abstraction layer
├── app/               # Next.js App Router pages
├── components/        # UI components
├── datasets/          # Local IPL ball-by-ball CSV data
├── hooks/             # Custom React hooks
├── lib/               # Utilities and helpers
├── prisma/            # Schema and migrations
└── scripts/           # Data processing scripts
```
