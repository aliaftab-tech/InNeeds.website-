# Task Assignment: Challenger 2 - Layout Invariants & CSS Boundary Testing

**Role**: Layout & UI Invariants Stress Tester
**Working Directory**: d:\InNeeds website\.agents\teamwork\teamwork_challenger_2
**Target Repository**: d:\InNeeds website
**Reference 1**: d:\InNeeds website\.agents\teamwork\ORIGINAL_REQUEST.md
**Reference 2**: d:\InNeeds website\.agents\teamwork\orchestrator_1\PROJECT.md
**Reference 3**: d:\InNeeds website\.agents\teamwork\teamwork_worker_1\handoff.md

## Objective
Empirically stress-test the UI styling, layout containers, and CSS contracts:
1. Write and execute test scripts in your working directory to assert:
   - UI Invariants I-1 through I-9: container widths (`max-w-[1700px]`, `max-w-[1600px]`, `max-w-[1800px]`, `max-w-[1200px]`), background colors (`bg-[#0b291a]`, `bg-[#f6f9f6]`), asymmetric bento corner radii, and keyframe animations.
   - Skeletons: Verify that all 9 skeleton components in `src/components/skeletons/` match their section counterparts with zero CLS discrepancies.
   - Zero-regression in build artifacts (`.next/build-manifest.json` and static chunks).
2. Run `npm run test` (`node tests/run-e2e.mjs`).
3. Issue your verdict: `APPROVE` or `REQUEST_CHANGES` in `handoff.md`.


## 2026-11-06T15:21:18Z
[Message] timestamp=2026-11-06T15:21:18Z sender=20678e70-c223-4d85-b409-35ee75e0d398 priority=MESSAGE_PRIORITY_HIGH content=You are teamwork_challenger assigned to Challenger 2 (Layout Invariants & CSS Boundary Testing).

Your working directory is: d:\InNeeds website\.agents\teamwork\teamwork_challenger_2
You MUST read:
1. ORIGINAL_REQUEST.md: d:\InNeeds website\.agents\teamwork\ORIGINAL_REQUEST.md
2. DISPATCH.md: d:\InNeeds website\.agents\teamwork\teamwork_challenger_2\DISPATCH.md
3. PROJECT.md: d:\InNeeds website\.agents\teamwork\orchestrator_1\PROJECT.md
4. Worker 1 Handoff: d:\InNeeds website\.agents\teamwork\teamwork_worker_1\handoff.md

Your task:
- Empirically stress-test UI styling, layout containers, and CSS contracts.
- Write and run adversarial checks in your working directory to assert:
  - UI Invariants I-1 through I-9
  - Skeleton alignment with modular components (zero CLS)
  - Turbopack build manifest and chunk integrity
- Execute: `npm run test` (`node tests/run-e2e.mjs`).
- Write your adversarial test results and verdict (APPROVE or REQUEST_CHANGES) in: d:\InNeeds website\.agents\teamwork\teamwork_challenger_2\handoff.md.
- Send a message to orchestrator (conversation ID: 20678e70-c223-4d85-b409-35ee75e0d398).
