# Task Assignment: Explorer R1.1 - Dead Code & Asset Elimination Recipe

**Role**: Dead Code Removal Planner
**Working Directory**: d:\InNeeds website\.agents\teamwork\teamwork_explorer_r1_1
**Target Repository**: d:\InNeeds website
**Reference 1**: d:\InNeeds website\.agents\teamwork\ORIGINAL_REQUEST.md
**Reference 2**: d:\InNeeds website\.agents\teamwork\orchestrator_1\PROJECT.md
**Reference 3**: d:\InNeeds website\.agents\teamwork\explorer_survey_2\handoff.md

## Objective
Design the exact, step-by-step modification and deletion plan for dead and unreferenced code:
1. `package.json`: Removal of `"gsap": "^3.15.0"`.
2. Obsolete root files: Deletion of `generate_icon.js`, `generate_rounded_favicon.js`, `InNeeds logo.png`, `InNeeds website favicon.png`.
3. Unreferenced static assets: Deletion of the 28 identified unreferenced assets in `public/`.
4. `src/app/globals.css`: Removal of unused `@keyframes shimmer` and `.animate-shimmer`.
5. `src/components/HowItWorks.tsx`: Removal of rogue backtick literal ` `` ` on line 334.
6. `tests/tier3-interactions.test.mjs`: Removal of unused `barrelContent` on line 58.

## Constraints
- Read-only investigation — do NOT edit source files.
- Ensure `FooterSkeleton.tsx` is NOT touched (required by 8 tests).
- Detail the exact files, lines, and commands for the Worker to execute.
- Write your report to `d:\InNeeds website\.agents\teamwork\teamwork_explorer_r1_1\handoff.md`.


## 2026-11-06T14:53:38Z
You are teamwork_explorer assigned to Milestone 1: Dead Code & Asset Elimination Planning.

Your working directory is: d:\InNeeds website\.agents\teamwork\teamwork_explorer_r1_1
You MUST read:
1. ORIGINAL_REQUEST.md: d:\InNeeds website\.agents\teamwork\ORIGINAL_REQUEST.md
2. DISPATCH.md: d:\InNeeds website\.agents\teamwork\teamwork_explorer_r1_1\DISPATCH.md
3. PROJECT.md: d:\InNeeds website\.agents\teamwork\orchestrator_1\PROJECT.md
4. Survey Report: d:\InNeeds website\.agents\teamwork\explorer_survey_2\handoff.md

Your task:
- Formulate the exact, comprehensive step-by-step implementation recipe for removing dead code, obsolete root scripts, duplicate root images, 28 unreferenced public assets, dead CSS keyframes, and rogue syntax.
- Detail the exact files, lines to remove or change, and safety boundaries (e.g. keeping FooterSkeleton).
- Write your findings to: d:\InNeeds website\.agents\teamwork\teamwork_explorer_r1_1\handoff.md
- Update your progress in: d:\InNeeds website\.agents\teamwork\teamwork_explorer_r1_1\progress.md
- When complete, send a message to orchestrator (conversation ID: 20678e70-c223-4d85-b409-35ee75e0d398).
