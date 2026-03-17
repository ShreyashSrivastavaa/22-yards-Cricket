---
phase: 2
plan: 1
wave: 1
---

# Plan 2.1: Player Analytics UI & Recharts Integration

## Objective
Implement a deep-dive Player Profile page featuring phase-wise analytics (Powerplay/Middle/Death), Pac vs Spin splits, and performance trends using Recharts.

## Context
- .gsd/SPEC.md
- prisma/schema.prisma

## Tasks

<task type="auto">
  <name>Create Player Profile Shell</name>
  <files>app/players/[id]/page.tsx</files>
  <action>
    Build a rich player profile layout:
    - Header with player basics (Role, Team, Rating).
    - Tabs for: Overview, Analytics, Matchups, Form.
    - Import and render the &lt;PlayerCharts /&gt; component within the Analytics tab.
    - Integration-ready for backend data fetching.
  </action>
  <verify>navigate to /players/1</verify>
  <done>Player Profile UI is responsive and structured.</done>
</task>

<task type="auto">
  <name>Implement Analytics Visualizations</name>
  <files>components/analytics/player-charts.tsx</files>
  <action>
    Create reusable Recharts components for:
    - Radar Chart: Overall skill distribution.
    - Bar Chart: Phase-wise SR/RR.
    - Pie Chart: Pac vs Spin delivery distribution.
    - Pie Chart: Dismissal breakdown.
    Use mock data initially.
  </action>
  <verify>check charts in profile page</verify>
  <done>Charts render correctly with the project's 'Intelligence' design system.</done>
</task>

## Success Criteria
- [ ] Interactive charts on the Player Profile page.
- [ ] Tabbed navigation for different analytical lenses.
- [ ] Pac vs Spin performance distribution visualized.
