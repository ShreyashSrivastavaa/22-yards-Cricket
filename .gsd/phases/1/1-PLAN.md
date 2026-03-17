---
phase: 1
plan: 1
wave: 1
---

# Plan 1.1: Next.js + UI Foundation

## Objective
Bootstrap the Next.js application with the required styling and UI components (Tailwind CSS, ShadCN UI) and set up the default Dark Mode theme.

## Context
- .gsd/SPEC.md
- .gsd/ARCHITECTURE.md

## Tasks

<task type="auto">
  <name>Bootstrap Next.js App</name>
  <files>package.json, tailwind.config.ts, tsconfig.json</files>
  <action>
    Run `npx create-next-app@latest . --typescript --tailwind --eslint --app --use-npm --no-src-dir --import-alias "@/*"`. 
    Choose defaults for other options.
    Ensure it initializes in the root.
  </action>
  <verify>npm run dev (check if server starts)</verify>
  <done>Next.js welcome page is renderable.</done>
</task>

<task type="auto">
  <name>Install & Configure ShadCN UI</name>
  <files>components.json, src/app/layout.tsx</files>
  <action>
    Run `npx shadcn-ui@latest init`. 
    Configure with:
    - Style: New York
    - Base Color: Zinc
    - CSS Variables: Yes
    Ensure layout.tsx is updated for dark mode by default.
  </action>
  <verify>test shadcn button component</verify>
  <done>ShadCN components are usable in the project.</done>
</task>

## Success Criteria
- [ ] Next.js app running on localhost:3000.
- [ ] ShadCN initialized and working.
- [ ] Tailwind configured.
