# Task Assignment: Explorer R1.2 - Shared Data, Tooling, & Lint Elimination Recipe

**Role**: Shared Data & Tooling Standards Planner
**Working Directory**: d:\InNeeds website\.agents\teamwork\teamwork_explorer_r1_2
**Target Repository**: d:\InNeeds website
**Reference 1**: d:\InNeeds website\.agents\teamwork\ORIGINAL_REQUEST.md
**Reference 2**: d:\InNeeds website\.agents\teamwork\orchestrator_1\PROJECT.md
**Reference 3**: d:\InNeeds website\.agents\teamwork\explorer_survey_1\handoff.md
**Reference 4**: d:\InNeeds website\.agents\teamwork\explorer_survey_3\handoff.md

## Objective
Design the exact, step-by-step modification plan for shared constants, tooling, and ESLint cleanup:
1. `src/data/categories.ts`: Specification for newly created shared categories module (`Category` interface and `baseCategories` array).
2. `src/components/HeroCarousel.tsx` & `src/components/BottomCarousel.tsx`: Import `baseCategories` from `@/data/categories` instead of duplicating.
3. `src/components/BottomCarousel.tsx`: Fix `(event: any, info: any)` on line 34 with `PanInfo` from `framer-motion`.
4. `src/components/Footer.tsx`: Replace `<a href="/">` with `<Link href="/">` on social links (lines 85-88).
5. `src/app/globals.css`: Centralize `@keyframes wave-spin` and `@keyframes marquee`.
6. `eslint.config.mjs`: Add `globalIgnores` for `.agents/**`, `tests/**`, and root scripts so linting checks only production application code.
7. `package.json`: Add `"typecheck": "tsc --noEmit"` and `"test": "node tests/run-e2e.mjs"`.

## Constraints
- Read-only investigation — do NOT edit source files.
- Ensure strict TypeScript typing and zero breaking changes.
- Write your report to `d:\InNeeds website\.agents\teamwork\teamwork_explorer_r1_2\handoff.md`.


## 2026-11-06T14:53:47Z
Message from orchestrator (20678e70-c223-4d85-b409-35ee75e0d398):
You are teamwork_explorer assigned to Milestone 1: Shared Data, Tooling, & Lint Elimination Planning.

Your working directory is: d:\InNeeds website\.agents\teamwork\teamwork_explorer_r1_2
You MUST read:
1. ORIGINAL_REQUEST.md: d:\InNeeds website\.agents\teamwork\ORIGINAL_REQUEST.md
2. DISPATCH.md: d:\InNeeds website\.agents\teamwork\teamwork_explorer_r1_2\DISPATCH.md
3. PROJECT.md: d:\InNeeds website\.agents\teamwork\orchestrator_1\PROJECT.md
4. Survey Report: d:\InNeeds website\.agents\teamwork\explorer_survey_1\handoff.md
5. Survey Report: d:\InNeeds website\.agents\teamwork\explorer_survey_3\handoff.md

Your task:
- Formulate the exact, step-by-step implementation recipe for creating `src/data/categories.ts`, updating `HeroCarousel.tsx` & `BottomCarousel.tsx`, fixing types in `BottomCarousel.tsx`, fixing `<Link>` in `Footer.tsx`, centralizing `@keyframes wave-spin` & `@keyframes marquee` in `src/app/globals.css`, and updating `eslint.config.mjs` and `package.json`.
- Write your findings to: d:\InNeeds website\.agents\teamwork\teamwork_explorer_r1_2\handoff.md
- Update your progress in: d:\InNeeds website\.agents\teamwork\teamwork_explorer_r1_2\progress.md
- When complete, send a message to orchestrator (conversation ID: 20678e70-c223-4d85-b409-35ee75e0d398).
