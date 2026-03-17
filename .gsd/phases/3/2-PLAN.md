---
phase: 3
plan: 2
wave: 2
depends_on: ["1"]
---

# Plan 3.2: Fantasy Tools (Suggested Team Generator)

## Objective
Implement a data-driven Fantasy Team Generator that suggests optimal Playing XI combinations based on credits, player form, and venue compatibility.

## Context
- .gsd/SPEC.md
- prisma/schema.prisma

## Tasks

<task type="auto">
  <name>Create Fantasy Dashboard Page</name>
  <files>app/fantasy/page.tsx</files>
  <action>
    Build the Fantasy Intelligence layout:
    - Featured Match Selection.
    - "Smart Picks" (Differential players, Must-haves).
    - Team Generator UI (Budget/Credit constraints).
  </action>
  <verify>navigate to /fantasy</verify>
  <done>Fantasy dashboard is accessible and displays smart picks.</done>
</task>

<task type="auto">
  <name>Implement Optimization Algorithm</name>
  <files>lib/fantasy-engine.ts</files>
  <action>
    Develop a heuristic-based selection algorithm:
    - Inputs: Match ID, Credits (100).
    - Logic: Maximize total 'formScore' while staying under credit cap.
    - Constraint: 1-4 WK, 3-6 Batter, 1-4 AR, 3-6 Bowler.
  </action>
  <verify>run generator and check team balance</verify>
  <done>Engine generates valid and statistically optimized fantasy lineups.</done>
</task>

## Success Criteria
- [ ] Functional "Suggested XI" generator for specific matches.
- [ ] Real-time credit validation and budget tracking.
- [ ] Differential pick highlight logic based on low ownership/high potential.
