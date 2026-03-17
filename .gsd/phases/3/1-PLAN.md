---
phase: 3
plan: 1
wave: 1
---

# Plan 3.1: Matchups Heatmaps & Stats

## Objective
Implement a specialized Matchups Engine that allows users to compare Batter vs Bowler head-to-head stats using interactive heatmaps and metrics (Phase, Delivery Type).

## Context
- .gsd/SPEC.md
- prisma/schema.prisma

## Tasks

<task type="auto">
  <name>Create Matchups Page Shell</name>
  <files>app/matchups/page.tsx</files>
  <action>
    Build the Matchups Explorer layout:
    - Side-by-side selection for Batter and Bowler.
    - Summary Dashboard (Runs, Balls, Dismissals, Strike Rate).
    - Integration with a heatmap component.
  </action>
  <verify>navigate to /matchups</verify>
  <done>Head-to-head shell is responsive and interactive.</done>
</task>

<task type="auto">
  <name>Implement Matchup Heatmap</name>
  <files>components/analytics/matchup-heatmap.tsx</files>
  <action>
    Create a grid-based visualization showing performance by zone or over-block:
    - X-Axis: Length (Short, Good, Full).
    - Y-Axis: Line (Outside Off, Stumps, Down Leg).
    - Color-coded by Strike Rate / Wicket Probability.
  </action>
  <verify>check heatmap on matchups page</verify>
  <done>Interactive heatmap correctly visualizes spatial performance data.</done>
</task>

## Success Criteria
- [ ] Fully interactive head-to-head comparison engine.
- [ ] Visual heatmap representation of matchups.
- [ ] Historical record filtering (Season, Venue).
