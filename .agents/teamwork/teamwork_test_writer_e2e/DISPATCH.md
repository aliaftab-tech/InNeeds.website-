## 2026-11-06T11:30:53Z
You are teamwork_test_writer_e2e.
Your working directory is: d:\InNeeds website\.agents\teamwork\teamwork_test_writer_e2e\

MANDATORY FIRST STEP:
Read the user request file at:
d:\InNeeds website\.agents\teamwork\ORIGINAL_REQUEST.md

Read the project specification at:
d:\InNeeds website\.agents\teamwork\orchestrator\PROJECT.md

OBJECTIVE:
Build a comprehensive, opaque-box E2E testing suite for the Skeleton Loading UI across the InNeeds website, following the Dual-Track 4-tier testing methodology:
- Tier 1: Feature Coverage (>=5 test cases per feature for F1-F13)
  - Verify route-level `loading.tsx` presence and default export.
  - Verify existence and export of each section skeleton (`NavbarSkeleton`, `HeroSectionSkeleton`, `TrustImpactSkeleton`, `TrustedBySkeleton`, `HowItWorksSkeleton`, `CategoriesSkeleton`, `CampaignsGridSkeleton`, `ShowcaseBentoSkeleton`, `FooterSkeleton`).
  - Verify base `Skeleton` primitive supports `light`, `dark`, and `card` variants.
- Tier 2: Boundary & Corner Cases (>=5 test cases per feature)
  - Verify dark theme contrast classes (`bg-white/10`, `border-white/10`) on `TrustImpactSkeleton`.
  - Verify light theme classes (`bg-slate-200`) on light section skeletons.
  - Verify `animate-pulse` or shimmer classes are present on skeleton elements.
  - Verify asymmetric column classes (`col-span-2`, `col-span-1`) in `CampaignsGridSkeleton`.
  - Verify circular dimensions (`rounded-full`, `w-24`, `w-40`) in `TrustImpactSkeleton`.
  - Verify layout rules: `loading.tsx` includes navbar skeleton and does NOT duplicate `<Footer />`.
- Tier 3: Cross-Feature Interactions & Combinations (pairwise coverage)
  - Verify `loading.tsx` integration with `src/app/layout.tsx`.
  - Verify zero TypeScript compiler errors (`npx tsc --noEmit`).
  - Verify production build compilation (`npm run build`).
- Tier 4: Real-World Application Scenarios
  - Simulated route navigation and loading fallback rendering.
  - Production build artifact verification.

EXCLUSIVE FILE OWNERSHIP:
You own:
- `tests/` directory (e.g., test scripts, test runner, test assertions)
- `TEST_INFRA.md` at `d:\InNeeds website\TEST_INFRA.md`
- `TEST_READY.md` at `d:\InNeeds website\TEST_READY.md`
DO NOT modify any implementation source code in `src/`.

OUTPUT:
1. Create `d:\InNeeds website\TEST_INFRA.md` documenting test architecture, feature inventory mapping, and runner instructions.
2. Implement automated runnable test suite in `tests/` (e.g. `node tests/run-e2e.mjs` or `npm test` if configured) that executes all tiers and outputs structured pass/fail results.
3. Execute the tests to establish baseline.
4. When complete, publish `d:\InNeeds website\TEST_READY.md`.
5. Write handoff report in `d:\InNeeds website\.agents\teamwork\teamwork_test_writer_e2e\handoff.md`.
6. Send completion message to orchestrator.
