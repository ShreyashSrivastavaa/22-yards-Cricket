# SPEC.md — 22 Yards Cricket Intelligence Platform

> **Status**: `FINALIZED`
>
> ⚠️ **Planning Lock**: No code may be written until this spec is marked `FINALIZED`.

## Vision
To build a world-class, data-heavy, analytics-first Cricket Intelligence Platform that provides deep insights, match intelligence, and fantasy tools for serious cricket fans and analysts. This is a successor to the "22 Yards" prototype, moving to a modern, scalable full-stack architecture.

## Goals
1. **Analytics-First** — Provide granular phase-wise, matchup, and trend analytics.
2. **Interactive Intelligence** — Enable pre-match and post-match simulations and visualizations.
3. **Fantasy Mastery** — Offer data-driven tools for Dream11 and other fantasy platforms.
4. **Scalable Architecture** — Use Next.js, PostgreSQL, and Redis for a production-ready system.

## Non-Goals (Out of Scope)
- No live streaming of matches.
- No real-money gambling/betting.
- No social networking features (initially).

## Constraints
- **Stack**: Next.js (App Router), Tailwind CSS, ShadCN UI, Recharts.
- **Backend**: Next.js API Routes / Node.js + Express.
- **Storage**: PostgreSQL (Primary), Redis (Caching).
- **Data**: Initial release using high-fidelity mock/seed data with clear interfaces for future API integration.

## Success Criteria
- [ ] Fully functional Dashboard with rich visualizations (Recharts).
- [ ] Advanced Player Profile pages with phase-wise stats.
- [ ] Pre-match analysis engine with Win Probability and Suggested XI.
- [ ] Responsive, Dark-mode first UI using ShadCN.
- [ ] Persistent user dashboards and personalization.

## Technical Requirements

| Requirement | Priority | Notes |
|-------------|----------|-------|
| Match Intelligence | Must-have | Pre/Post match analysis, probability graphs |
| Player Analytics | Must-have | Phase-wise stats, Pac/Spin matchups |
| Team Analytics | Must-have | Best XI engine, strength/weakness analysis |
| AI Predictions | Should-have | Heuristic/ML probability models |
| Fantasy Tools | Must-have | Suggested teams, diff picks |
| Data Explorer | Should-have | Cross-player comparison, custom queries |
| Matchups Engine | Must-have | Batter vs Bowler head-to-head |

---

*Last updated: 2026-03-17*
