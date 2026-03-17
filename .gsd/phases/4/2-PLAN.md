---
phase: 4
plan: 2
wave: 2
depends_on: ["1"]
---

# Plan 4.2: AI Match Simulation Engine

## Objective
Build an AI-powered match simulation tool that runs heuristic-based probability models to predict match outcomes, key turning points, and projected scores.

## Context
- .gsd/SPEC.md
- prisma/schema.prisma

## Tasks

<task type="auto">
  <name>Create Simulation Dashboard</name>
  <files>app/simulate/page.tsx</files>
  <action>
    Build the Simulation Engine layout:
    - Team 1 vs Team 2 selector.
    - Venue selection (impacts batting/bowling bias).
    - "Run Simulation" button that triggers the engine.
    - Results display: Projected Score, Win Probability, Key Moments.
  </action>
  <verify>navigate to /simulate</verify>
  <done>Simulation page renders and produces results on demand.</done>
</task>

<task type="auto">
  <name>Implement Simulation Engine</name>
  <files>lib/simulation-engine.ts</files>
  <action>
    Develop a Monte Carlo-lite heuristic engine:
    - Input: Team1, Team2, Venue.
    - Factors: Team strength scores, venue batting/bowling bias, recent form.
    - Output: Projected 1st/2nd innings scores, win probability, key player impact.
    - Uses weighted randomization for realistic variance.
  </action>
  <verify>run engine and validate output structure</verify>
  <done>Engine produces varied, realistic simulation results.</done>
</task>

## Success Criteria
- [ ] Functional match simulator with team and venue selection.
- [ ] Heuristic-based projected scores and win probability.
- [ ] Visual results dashboard with key moment highlights.
