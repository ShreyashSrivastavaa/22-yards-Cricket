---
phase: 1
plan: 2
wave: 2
---

# Plan 1.2: Database Modeling & Mock Seeding

## Objective
Design a normalized PostgreSQL schema to handle match, player, and team analytics. Implement seed scripts to populate the database with high-fidelity mock data.

## Context
- .gsd/SPEC.md
- .gsd/ARCHITECTURE.md

## Tasks

<task type="auto">
  <name>Design Schema (SQL)</name>
  <files>prisma/schema.prisma or supabase/migrations/</files>
  <action>
    Create a normalized schema for:
    - `Players`: Basic info + nested analytics JSON/relational stats.
    - `Teams`: Name, logo, stats.
    - `Matches`: Pre/Post match data.
    - `BallByBall`: Optional but preferred for drill-down.
    Include views for aggregated stats (phase-wise, matchups).
  </action>
  <verify>check SQL/Prisma file</verify>
  <done>Schema design covers all features in SPEC.md.</done>
</task>

<task type="auto">
  <name>Create Seeding Script</name>
  <files>prisma/seed.ts or scripts/seed-db.ts</files>
  <action>
    Develop a script to inject structured mock data:
    - 50+ Players with full analytical attributes.
    - 10 Teams.
    - 20 Recent Matches with scorecard data.
    - Fantasy-relevant stats (consistency, differentials).
  </action>
  <verify>run seed command</verify>
  <done>DB populated with consistent, rich mock data.</done>
</task>

## Success Criteria
- [ ] Fully documented ERD or Schema file.
- [ ] Database populated with test data ready for UI development.
