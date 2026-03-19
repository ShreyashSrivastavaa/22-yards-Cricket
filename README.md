# 🏏 22 Yards: Cricket Intelligence Platform

**High-fidelity match simulations and performance analytics engine.**

"22 Yards" is a technical successor to traditional cricket trackers, moving from simple score counting to deep-tier match intelligence and historical analysis. It is designed for serious analysts and fantasy strategists, prioritizing data density and system resilience.

---

## Why I built this

Cricket data APIs are fundamentally unreliable — rate limits, key expirations, and sudden provider changes break consumer-facing apps overnight. I engineered this system to ensure that the data source is an implementation detail, not a hard dependency. By prioritizing a local intelligence engine, the platform survives provider outages and operates with zero latency.

---

## Core Architecture

### Local Intelligence Engine
The platform is powered by a high-performance local processing engine in `lib/localData.js`. It performs real-time, on-demand aggregation of multi-season, ball-by-ball IPL datasets (2022-2025). This ensures:
- **Zero-Latency Analytics**: Local file access for sub-millisecond data retrieval.
- **Provider Resilience**: Fully decoupled from unstable external APIs via the **Adapter Pattern** in `CricketDataService`.
- **100% Uptime**: Self-sufficient offline operation using high-fidelity raw data in `datasets/`.

### System Features
- **Adapter pattern** — Data access is abstracted through a consistent interface, allowing providers (API → CSV → DB) to be swapped with zero impact on the application logic.
- **Scorecard Reconstruction** — Aggregates raw ball states into full innings scorecards, ensuring consistency across disparate data sources.
- **Prisma + Supabase** — Schema is managed as code with versioned migrations, preventing environment drift.
- **AI Daily Picks** — Driven by actual performance metrics (SR, Average, Fantasy Score) processed through the local engine.

---

## Technical Stack

- **Foundation**: Next.js 14+ (App Router), React 19.
- **Persistence**: Prisma ORM, PostgreSQL, Supabase.
- **UI Architecture**: Tailwind CSS 4, ShadCN UI, Recharts.
- **Infrastructure**: Lucide React, PapaParse (Data orchestration).

---

## Getting Started

1. **Clone and Install**:
   ```bash
   git clone https://github.com/ShreyashSrivastavaa/22-yards-Cricket
   cd 22-yards-Cricket
   npm install
   ```

2. **Environment Setup**:
   Copy `.env.example` to `.env.local` and configure your database and Supabase credentials.

3. **Database Sync**:
   ```bash
   npx prisma db push
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

---

## Project Structure

```
├── adapters/          # Data source abstraction layer
├── app/               # Next.js App Router (pages & API)
├── components/        # Scalable UI core
├── datasets/          # 17,500+ rows of ball-by-ball CSV data
├── hooks/             # Custom React lifecycle hooks
├── lib/               # Utilities & Intelligence Engine
├── prisma/            # Schema definition & Migrations
└── scripts/           # Data processing & pre-build orchestration
```

---
*Senior Backend Engineering Portfolio Project — Built by Shreyash Srivastava.*
