---
phase: 2
plan: 3
wave: 1
---

# Plan 2.3: Team Analytics & Best XI Logic

## Objective
Implement a Team Analytics dashboard that evaluates team balance (Batting vs Bowling) and provides an algorithmic 'Best XI' selector based on player ratings and roles.

## Context
- .gsd/SPEC.md
- prisma/schema.prisma

## Tasks

<task type="auto">
  <name>Create Team Analytics Page</name>
  <files>app/teams/[id]/page.tsx</files>
  <action>
    Build the Team Analytics layout:
    - Team Header (Logo, Strength Score).
    - Squad List with Roles & Ratings.
    - Import and render &lt;TeamBalanceChart /&gt; and &lt;BestXIList /&gt;.
    - Integration-ready for backend data fetching.
  </action>
  <verify>navigate to /teams/1</verify>
  <done>Team Analytics UI renders with squad composition.</done>
</task>

<task type="auto">
  <name>Refine Best XI Selector Logic</name>
  <files>components/analytics/best-xi-list.tsx</files>
  <action>
    Update the component to handle role-based selection:
    - Logic to pick: 2 Openers, 3-4 Middle Order, 1 Finisher, 1 Keeper, 3-4 Bowlers.
    - Tie-breaking using 'overallRating'.
    - stylized grid display with role icons (lucide-react).
  </action>
  <verify>check Best XI section in team page shows a balanced side</verify>
  <done>Algorithmic Best XI is correctly calculated and displayed.</done>
</task>

## Success Criteria
- [ ] Visualization of team strengths and weaknesses using Radar charts.
- [ ] Automated Best XI selection logic using role-balanced heuristics.
- [ ] Clean, responsive layout for individual team dashboards.
