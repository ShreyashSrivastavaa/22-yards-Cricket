---
milestone: v1-Alpha-Analytics-Engine
version: 0.1.0
updated: 2026-03-17T16:05:00Z
---

# Roadmap

> **Current Phase:** 2 - Analytics & Intelligence (Core)
> **Status:** executing

## Must-Haves (from SPEC)

- [x] Next.js + Tailwind + ShadCN Foundation
- [x] Normalized PostgreSQL Schema (Players, Teams, matches, Innings)
- [x] Advanced Player Profile & Analytics Data Layer
- [ ] Match Intelligence Engine (Pre/Post match)

---

## Phases

### Phase 1: Project Foundation & Data Modeling
**Status:** ✅ Complete
**Objective:** Set up the Next.js project, database schema, and mock data injection.

**Plans:**
- [x] Plan 1.1: Next.js + UI Foundation (ShadCN, Dark Mode)
- [x] Plan 1.2: Database Modeling (SQL) & Mock Seeding
- [x] Plan 1.3: Core Layout & Navigation

---

### Phase 2: Analytics & Intelligence (Core)
**Status:** ✅ Complete
**Objective:** Build the Player Profile and Match Intelligence pages with rich charts.
**Depends on:** Phase 1

**Plans:**
- [x] Plan 2.1: Player Analytics UI (Recharts Integration)
- [x] Plan 2.2: Match Intelligence & Win Probability Engine
- [x] Plan 2.3: Team Analytics & Best XI Logic

---

### Phase 3: Matchups & Fantasy Tools
**Status:** ✅ Complete
**Objective:** Implement the Batter vs Bowler engine and Fantasy pick logic.
**Depends on:** Phase 2

**Plans:**
- [x] Plan 3.1: Matchups Heatmaps & Stats
- [x] Plan 3.2: Fantasy Tools (Suggested Team Generator)

---

### Phase 4: Data Explorer & AI Simulations
**Status:** ⏸️ On Hold (Pivoted to Live Data)
**Objective:** Advanced simulation and data comparison tools.
**Depends on:** Phase 5

---

### Phase 5: Live Data Architecture
**Status:** [/] executing
**Objective:** Replace hardcoded data with live API integrations & Supabase caching.
**Depends on:** Phase 3

**Plans:**
- [x] Plan 5.1: Supabase Cache & API Client Layer
- [x] Plan 5.2: API Route Handlers
- [x] Plan 5.3: Computed Metrics Engine
- [/] Plan 5.4: Frontend Data Layer Refactor

---

## Progress Summary

| Phase | Status | Plans | Complete |
|-------|--------|-------|----------|
| 1     | ✅     | 3/3   | 100%     |
| 2     | ✅     | 3/3   | 100%     |
| 3     | ✅     | 2/2   | 100%     |
| 5     | [/]    | 3/4   | 75%      |
| 4     | ⏸️     | 0/2   | —        |

---

## Timeline

| Phase | Started | Completed | Duration |
|-------|---------|-----------|----------|
| 1 | — | — | — |
| 2 | — | — | — |
| 3 | — | — | — |
| 4 | — | — | — |
