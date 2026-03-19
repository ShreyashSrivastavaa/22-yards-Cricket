<<<<<<< HEAD
# 22 Yards: Cricket Intelligence Platform

**High-fidelity match simulations and performance analytics engine.**

"22 Yards" is a technical successor to traditional cricket trackers, moving from simple score counting to deep-tier match intelligence and historical analysis. It is designed for serious analysts and fantasy strategists, prioritizing data density and system resilience.

## Core Architecture

### Local Intelligence Engine
The platform is powered by a high-performance local processing engine in `lib/localData.js`. It performs real-time, on-demand aggregation of multi-season, ball-by-ball IPL datasets (2022-2025). This ensures:
- **Zero-Latency Analytics**: Local file access for sub-millisecond data retrieval.
- **Provider Resilience**: Fully decoupled from unstable external APIs via the **Adapter Pattern** in `CricketDataService`.
- **100% Uptime**: Self-sufficient offline operation using high-fidelity raw data in `datasets/`.

### Intelligence Layer
- **Scorecard Reconstruction**: Aggregates raw ball states (runs, extras, wickets) into full innings scorecards.
- **Form Analysis**: Trending and AI daily-picks driven by actual performance metrics (SR, Average, Fantasy Score) rather than simple heuristics.
- **Advanced Matchups**: (Incoming Phase 6) Batter vs Bowler head-to-head simulations.

## Technical Stack
- **Foundation**: Next.js 15+ (App Router), React 19.
- **Persistence**: Prisma ORM, PostgreSQL (Scalable), Supabase.
- **UI Architecture**: Tailwind CSS 4, ShadCN UI, Recharts (Analytical visualization).
- **Communication**: RabbitMQ (Planned for asynchronous event-driven simulations).

## Project Structure
- `app/api/`: RESTful services for match details, trending, and analytics.
- `lib/localData.js`: The heart of the local intelligence engine (CSV parsing & aggregation).
- `lib/cricket-data-service.js`: Unified service layer managing data source orchestration.
- `datasets/`: 17,500+ rows of raw, high-fidelity IPL ball-by-ball data.
=======
# 🏏 22 Yards — Cricket Stats Tracker
>>>>>>> a7047b1d9cd22cb7ea65d9b339cedc6e2565e24a

A full-stack cricket statistics platform for tracking scores,
player profiles, and match history across IPL 2022–2025.

<<<<<<< HEAD
1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   Configure `.env.local` with your database and Supabase credentials.

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Verify Intelligence Engine**:
   Load a match ID (e.g., `202501`) to see real-time scorecard reconstruction from the local dataset.

---
*Senior Backend Engineering Portfolio Project — Built by Shreyash Srivastava.*
=======
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
>>>>>>> a7047b1d9cd22cb7ea65d9b339cedc6e2565e24a
