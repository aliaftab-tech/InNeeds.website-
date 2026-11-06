# Task Assignment: Worker 1 - Full Refactoring & Cleanup Implementation

**Role**: Full Refactoring & Code Cleanup Worker
**Working Directory**: d:\InNeeds website\.agents\teamwork\teamwork_worker_1
**Target Repository**: d:\InNeeds website
**Reference 1**: d:\InNeeds website\.agents\teamwork\ORIGINAL_REQUEST.md
**Reference 2**: d:\InNeeds website\.agents\teamwork\orchestrator_1\PROJECT.md
**Reference 3 (Dead Code Recipe)**: d:\InNeeds website\.agents\teamwork\teamwork_explorer_r1_1\handoff.md
**Reference 4 (Shared Data & Tooling Recipe)**: d:\InNeeds website\.agents\teamwork\teamwork_explorer_r1_2\handoff.md
**Reference 5 (Page Modularization Recipe)**: d:\InNeeds website\.agents\teamwork\teamwork_explorer_r1_3\handoff.md

## Objective
Execute the full refactoring, cleanup, and modularization of the repository according to the 3 Explorer handoff recipes.

## Write Ownership
You own and may modify:
- `package.json`
- `package-lock.json`
- `eslint.config.mjs`
- `public/*` (deletion of 28 unreferenced assets only)
- Root files (`generate_*.js`, `InNeeds *.png` - deletion)
- `src/app/globals.css`
- `src/app/page.tsx`
- `src/components/HowItWorks.tsx`
- `src/components/HeroCarousel.tsx`
- `src/components/BottomCarousel.tsx`
- `src/components/Footer.tsx`
- `src/components/Navbar.tsx` (new)
- `src/components/HeroSection.tsx` (new)
- `src/components/CircularStat.tsx` (new)
- `src/components/TrustImpact.tsx` (new)
- `src/components/TrustedBy.tsx` (new)
- `src/components/CategoriesSection.tsx` (new)
- `src/components/CampaignsGrid.tsx` (new)
- `src/components/ShowcaseBento.tsx` (new)
- `src/data/categories.ts` (new)
- `tests/tier3-interactions.test.mjs`

DO NOT TOUCH: `src/components/skeletons/*` (especially `FooterSkeleton.tsx`).

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Verification Requirements
You must execute:
1. `npx tsc --noEmit`
2. `npm run build`
3. `npm run lint`
4. `node tests/run-e2e.mjs`
Report actual outputs in `handoff.md`.


## 2026-11-06T15:02:42Z
You are teamwork_worker assigned to execute the full repository cleanup, refactoring, and modularization for InNeeds website.

Your working directory is: d:\InNeeds website\.agents\teamwork\teamwork_worker_1

You MUST read:
1. ORIGINAL_REQUEST.md: d:\InNeeds website\.agents\teamwork\ORIGINAL_REQUEST.md
2. DISPATCH.md: d:\InNeeds website\.agents\teamwork\teamwork_worker_1\DISPATCH.md
3. PROJECT.md: d:\InNeeds website\.agents\teamwork\orchestrator_1\PROJECT.md
4. Explorer R1.1 Recipe: d:\InNeeds website\.agents\teamwork\teamwork_explorer_r1_1\handoff.md
5. Explorer R1.2 Recipe: d:\InNeeds website\.agents\teamwork\teamwork_explorer_r1_2\handoff.md
6. Explorer R1.3 Recipe: d:\InNeeds website\.agents\teamwork\teamwork_explorer_r1_3\handoff.md
