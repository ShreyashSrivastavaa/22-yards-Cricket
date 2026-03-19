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

## Getting Started

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
