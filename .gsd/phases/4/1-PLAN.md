---
phase: 4
plan: 1
wave: 1
---

# Plan 4.1: Cross-Player Comparison Tool

## Objective
Build a Data Explorer that allows users to compare 2-3 players side-by-side across key metrics using interactive charts and stat tables.

## Context
- .gsd/SPEC.md
- prisma/schema.prisma

## Tasks

<task type="auto">
  <name>Create Comparison Page</name>
  <files>app/compare/page.tsx</files>
  <action>
    Build the Data Explorer layout:
    - Multi-select player search bar (max 3 players).
    - Side-by-side stat cards: Runs, Wickets, Average, SR, Economy.
    - Overlay Radar Chart comparing skill distributions.
    - Bar Chart comparing phase-wise metrics.
  </action>
  <verify>navigate to /compare</verify>
  <done>Players can be selected and their stats are visualized side-by-side.</done>
</task>

<task type="auto">
  <name>Implement Comparison Charts</name>
  <files>components/analytics/comparison-charts.tsx</files>
  <action>
    Create reusable multi-player Recharts components:
    - Multi-Radar overlay: 2-3 player skill distributions on one chart.
    - Grouped Bar Chart: side-by-side phase-wise SR comparison.
    - Summary table with color-coded advantage indicators.
  </action>
  <verify>check overlay charts render with 2+ players</verify>
  <done>Comparison engine produces clear, accurate visual differentials.</done>
</task>

## Success Criteria
- [ ] Multi-player selection and comparison.
- [ ] Overlay radar and grouped bar chart visualizations.
- [ ] Clear stat advantage indicators.
