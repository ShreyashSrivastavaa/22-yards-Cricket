---
phase: 2
plan: 2
wave: 1
---

# Plan 2.2: Match Intelligence & Win Probability Engine

## Objective
Implement a Match Intelligence dashboard that visualizes win probability fluctuations and provides a strategic overview of ongoing or past matches.

## Context
- .gsd/SPEC.md
- prisma/schema.prisma
- components/analytics/player-charts.tsx (for pattern reference)

## Tasks

<task type="auto">
  <name>Create Match Intelligence Page</name>
  <files>src/app/matches/[id]/page.tsx</files>
  <action>
    Build the Match Intelligence layout:
    - Scoreboard Header (Live/Result).
    - Win Probability Line Chart (Recharts).
    - Innings-by-Innings Summary Cards.
    - Placeholder for Over-by-Over Analysis.
  </action>
  <verify>navigate to /matches/1</verify>
  <done>Match Intelligence UI renders with probability trends.</done>
</task>

<task type="auto">
  <name>Implement Win Probability Chart</name>
  <files>src/components/analytics/win-prob-chart.tsx</files>
  <action>
    Create a specialized AreaChart/LineChart in Recharts:
    - Y-Axis: 0% to 100% Win Probability.
    - X-Axis: Overs (0-20 or 0-50).
    - Dual-line support for both teams.
  </action>
  <verify>check probability chart in match page</verify>
  <done>Win probability fluctuations are clearly visualized.</done>
</task>

## Success Criteria
- [ ] Visualization of win probability across a match duration.
- [ ] Responsive match dashboard shell.
