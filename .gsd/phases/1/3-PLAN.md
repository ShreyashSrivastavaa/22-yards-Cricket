---
phase: 1
plan: 3
wave: 2
---

# Plan 1.3: Core Layout & Navigation

## Objective
Implement the global shell of the application, including the Sidebar/Navigation, Dashboard-first layout, and responsive containers.

## Context
- .gsd/SPEC.md
- .gsd/ARCHITECTURE.md

## Tasks

<task type="auto">
  <name>Implement Global Shell</name>
  <files>src/components/layout/sidebar.tsx, src/app/layout.tsx</files>
  <action>
    Build a standard 'Intelligence Dashboard' layout:
    - Sticky sidebar with links: Dashboard, Players, Matches, Teams, Fantasy.
    - Top search bar for quick player lookup.
    - Content area with card-based grid support.
    Apply dark-mode primarily.
  </action>
  <verify>check /dashboard page</verify>
  <done>Global navigation is functional and responsive.</done>
</task>

<task type="auto">
  <name>Create Basic Dashboard Home</name>
  <files>src/app/page.tsx</files>
  <action>
    Set up the main analytics landing page:
    - High-level KPI cards (Total Players, Upcoming Matches, Top Performers).
    - 'Live' data tickers (simulated).
    - Placeholder cards for trending analytics.
  </action>
  <verify>open root URL</verify>
  <done>Dashboard provides a 360-view of the project's data points.</done>
</task>

## Success Criteria
- [ ] Root page showing Dashboard KPIs.
- [ ] Sidebar navigation allowing easy view switching.
