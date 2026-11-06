# Test Infrastructure & Specification: Skeleton Loading UI

## 1. Overview & Objectives

This document defines the automated End-to-End (E2E) and integration test infrastructure for the InNeeds Website Skeleton Loading UI. The goal of this test suite is to provide opaque-box, regression-proof verification that all route transitions, component skeletons, visual theme tokens, layout rules, and build pipelines adhere strictly to the project requirements defined in `PROJECT.md` and `ORIGINAL_REQUEST.md`.

The test infrastructure adopts a **Dual-Track 4-Tier Testing Methodology**:
- **Dual-Track**: Synthesizes static contract inspection, structural AST token verification, component integration, and production runtime build artifact validation.
- **4-Tier Architecture**:
  - **Tier 1: Feature Coverage**: Comprehensive contract and structural validation for all features (F1 through F13), requiring at least 5 discrete test cases per feature (>=65 feature tests).
  - **Tier 2: Boundary & Corner Cases**: Edge cases including dark/light theme contrast isolation, animation token continuity, asymmetric column span matching, circular geometry constraints, and layout collision prevention (e.g., zero duplicate footers).
  - **Tier 3: Cross-Feature Interactions**: Pairwise module composition, barrel exports, integration between `loading.tsx` and `layout.tsx`, zero TypeScript errors (`tsc --noEmit`), and build compilation (`npm run build`).
  - **Tier 4: Real-World Application Scenarios**: Synthetic route transition simulation, Next.js Suspense boundary behavior, Cumulative Layout Shift (CLS) dimensional alignment, and production build artifact verification.

---

## 2. Feature Inventory & Test Mapping

| Feature ID | Feature Name | Target Source Files | Target Test Module | Minimum Cases |
|------------|--------------|---------------------|--------------------|---------------|
| **F1** | Base Skeleton Primitive | `src/components/ui/skeleton.tsx` | `tests/tier1-features.test.mjs` | 5 |
| **F2** | Navbar Skeleton | `src/components/skeletons/NavbarSkeleton.tsx` | `tests/tier1-features.test.mjs` | 5 |
| **F3** | Hero Section Skeleton | `src/components/skeletons/HeroSectionSkeleton.tsx` | `tests/tier1-features.test.mjs` | 5 |
| **F4** | Trust & Impact Skeleton | `src/components/skeletons/TrustImpactSkeleton.tsx` | `tests/tier1-features.test.mjs` | 5 |
| **F5** | Trusted By Marquee Skeleton | `src/components/skeletons/TrustedBySkeleton.tsx` | `tests/tier1-features.test.mjs` | 5 |
| **F6** | How It Works Skeleton | `src/components/skeletons/HowItWorksSkeleton.tsx` | `tests/tier1-features.test.mjs` | 5 |
| **F7** | Categories Skeleton | `src/components/skeletons/CategoriesSkeleton.tsx` | `tests/tier1-features.test.mjs` | 5 |
| **F8** | Campaigns Bento Grid Skeleton | `src/components/skeletons/CampaignsGridSkeleton.tsx` | `tests/tier1-features.test.mjs` | 5 |
| **F9** | Showcase Bento Strip Skeleton | `src/components/skeletons/ShowcaseBentoSkeleton.tsx` | `tests/tier1-features.test.mjs` | 5 |
| **F10** | Standalone Footer Skeleton | `src/components/skeletons/FooterSkeleton.tsx` | `tests/tier1-features.test.mjs` | 5 |
| **F11** | Route-Level loading.tsx | `src/app/loading.tsx` | `tests/tier1-features.test.mjs` | 5 |
| **F12** | Theme & Animation Integration | `src/app/globals.css`, skeleton components | `tests/tier1-features.test.mjs` | 5 |
| **F13** | Build & TypeScript Integrity | Entire project (`tsconfig.json`, `package.json`) | `tests/tier1-features.test.mjs` | 5 |

---

## 3. Authoritative Expected Output Derivation Sources

Every test assertion is grounded in authoritative specifications:
1. **User Request & Requirements**: `d:\InNeeds website\.agents\teamwork\ORIGINAL_REQUEST.md` (R1: Route-level & section loading, R2: Theme & animation matching).
2. **Project Specification & Architecture**: `d:\InNeeds website\.agents\teamwork\orchestrator\PROJECT.md` (Interface contracts, layout hierarchy, and feature inventory).
3. **Architectural Surveys**:
   - `teamwork_explorer_survey_1/handoff.md`: Next.js App Router hierarchy, `layout.tsx` footer placement, and `page.tsx` navbar placement.
   - `teamwork_explorer_survey_2/handoff.md`: Section component dimensions, 4-card bento grid columns (`md:col-span-2`, `md:col-span-1`), circular dial dimensions (`w-24`, `w-40`, `rounded-full`), and showcase bento curves.
   - `teamwork_explorer_survey_3/handoff.md`: Tailwind v4 tokens (`bg-slate-200/80`, `bg-white/10`, `border-white/10`, `animate-pulse`), zero-dependency primitive pattern, TypeScript compilation contracts.

---

## 4. Test Suite Structure

```
tests/
├── run-e2e.mjs                 # Master test orchestrator and CLI reporter
├── tier1-features.test.mjs     # Tier 1: Unit & Feature Coverage (F1-F13, >=65 cases)
├── tier2-boundary.test.mjs     # Tier 2: Boundary, Contrast, Layout, & Corner Cases
├── tier3-interactions.test.mjs # Tier 3: Pairwise Integration, Layout Composition & Compilers
├── tier4-scenarios.test.mjs    # Tier 4: Simulated Navigation, Suspense & Production Artifacts
└── test-utils.mjs              # Reusable file readers, token matchers, AST/Regex validators
```

---

## 5. Test Execution Instructions

### Running the Entire Suite
To run all 4 tiers with the formatted summary reporter:
```powershell
node tests/run-e2e.mjs
```

### Running Individual Tiers via Native Node Test Runner
Node.js 24 native test runner can also execute individual test files:
```powershell
node --test tests/tier1-features.test.mjs
node --test tests/tier2-boundary.test.mjs
node --test tests/tier3-interactions.test.mjs
node --test tests/tier4-scenarios.test.mjs
```

### Verifying TypeScript & Production Builds Directly
```powershell
npx tsc --noEmit
npm run build
```

---

## 6. Tier Breakdown and Test Matrices

### Tier 1: Feature Coverage (>=5 test cases per feature for F1-F13)
- **F1 (Base Primitive)**:
  1. Primitive file `src/components/ui/skeleton.tsx` exists.
  2. Exports named component `Skeleton`.
  3. Supports `variant="light"` defaulting or styling with `bg-slate-200`.
  4. Supports `variant="dark"` styling with `bg-white/10`.
  5. Supports `variant="card"` styling with `bg-slate-100` / `border`.
  6. Accepts and merges custom `className` via `cn()`.
- **F2 (Navbar Skeleton)**:
  1. File `src/components/skeletons/NavbarSkeleton.tsx` exists.
  2. Exports named function `NavbarSkeleton`.
  3. Includes sticky top container (`sticky top-0`).
  4. Matches height constraint (`h-[72px]` or `h-[73px]`).
  5. Includes navigation link placeholders, center logo placeholder, and Sign In pill.
- **F3 (Hero Section Skeleton)**:
  1. File `src/components/skeletons/HeroSectionSkeleton.tsx` exists.
  2. Exports named function `HeroSectionSkeleton`.
  3. Contains headline placeholders (2-line structure).
  4. Contains explore CTA button pill placeholder (`rounded-full`).
  5. Contains carousel silhouette placeholder container and 3-column features bar.
- **F4 (Trust & Impact Skeleton)**:
  1. File `src/components/skeletons/TrustImpactSkeleton.tsx` exists.
  2. Exports named function `TrustImpactSkeleton`.
  3. Features dark green background (`bg-[#0b291a]`).
  4. Features "100% VERIFIED CAUSES" badge placeholder.
  5. Features 3 circular stat dial rings with `rounded-full` and radial dimensions (`w-24`, `w-40`).
- **F5 (Trusted By Marquee Skeleton)**:
  1. File `src/components/skeletons/TrustedBySkeleton.tsx` exists.
  2. Exports named function `TrustedBySkeleton`.
  3. Features caption bar placeholder.
  4. Features 5 distinct logo placeholders.
  5. Implements horizontal layout with gradient fade masks or overflow container.
- **F6 (How It Works Skeleton)**:
  1. File `src/components/skeletons/HowItWorksSkeleton.tsx` exists.
  2. Exports named function `HowItWorksSkeleton`.
  3. Features sage background container (`bg-[#f6f9f6]`).
  4. Features top SVG dome arch divider.
  5. Features 3 step grid rows with step number badges (`w-7 h-7 rounded-full`) and mockup card containers.
- **F7 (Categories Skeleton)**:
  1. File `src/components/skeletons/CategoriesSkeleton.tsx` exists.
  2. Exports named function `CategoriesSkeleton`.
  3. Features category section badge placeholder.
  4. Features headline and CTA button pill placeholder.
  5. Features cylindrical card strip placeholder layout.
- **F8 (Campaigns Bento Grid Skeleton)**:
  1. File `src/components/skeletons/CampaignsGridSkeleton.tsx` exists.
  2. Exports named function `CampaignsGridSkeleton`.
  3. Features section header and filter dropdown pill.
  4. Implements asymmetric bento grid using 3 columns with `col-span-2` and `col-span-1`.
  5. Features progress bar placeholders (`h-1.5` or `h-2`) and circular nav button placeholders.
- **F9 (Showcase Bento Strip Skeleton)**:
  1. File `src/components/skeletons/ShowcaseBentoSkeleton.tsx` exists.
  2. Exports named function `ShowcaseBentoSkeleton`.
  3. Features 5-column cluster layout.
  4. Implements asymmetric rounded corners (`rounded-tr-[4rem]`, `rounded-tl-[4rem]`).
  5. Features center card with circular play button placeholder (`rounded-full`).
- **F10 (Standalone Footer Skeleton)**:
  1. File `src/components/skeletons/FooterSkeleton.tsx` exists.
  2. Exports named function `FooterSkeleton`.
  3. Features dark background (`bg-[#0b291a]`).
  4. Features newsletter input and button placeholders.
  5. Features 5 link columns and bottom copyright/payment bar.
- **F11 (Route-Level loading.tsx)**:
  1. File `src/app/loading.tsx` exists.
  2. Exports default function `Loading`.
  3. Includes `NavbarSkeleton` at the root of the loading UI.
  4. Composes main page section skeletons in vertical order.
  5. Strictly omits `FooterSkeleton` to avoid DOM duplication with `layout.tsx`.
- **F12 (Theme & Animation Integration)**:
  1. Utilizes Tailwind `animate-pulse` or shimmer classes across skeleton elements.
  2. Light section skeletons use `bg-slate-200` or `bg-slate-200/80`.
  3. Dark section skeletons use `bg-white/10` and `border-white/10`.
  4. Sage section skeleton uses `bg-[#f6f9f6]`.
  5. No visual clashes: dark sections do NOT use hardcoded opaque light gray `bg-slate-200` blocks for main surfaces.
- **F13 (Build & TypeScript Integrity)**:
  1. All skeleton files export valid TypeScript types / components.
  2. Imports use valid paths (`@/components/...` or relative).
  3. `npx tsc --noEmit` validates with 0 errors.
  4. `npm run build` compiles successfully.
  5. Next.js manifest recognizes static route `/` and loading boundary.

### Tier 2: Boundary & Corner Cases
- Contrast boundaries: Verify contrast ratios between dark section containers (`#0b291a`) and child skeleton elements (`bg-white/10`).
- Responsive boundary: Verify responsive breakpoint classes (`md:`, `lg:`) are present for grid spans, heights, and circle dimensions.
- Zero-gap layout boundary: Verify `loading.tsx` maintains sticky top navbar and identical max-widths (`max-w-[1700px]`, `max-w-[1600px]`, `max-w-7xl`).
- Dynamic props boundary: Verify base `Skeleton` handles arbitrary extra HTML attributes (`data-*`, `aria-hidden`, `id`, `style`).

### Tier 3: Cross-Feature Interactions & Combinations
- Layout integration: `src/app/layout.tsx` mounts `{children}` and `<Footer />`; `src/app/loading.tsx` fulfills Next.js Suspense contract without nesting another `<html>` or `<body>`.
- Barrel export integration: `src/components/skeletons/index.ts` re-exports all 9 section skeletons cleanly.
- Primitive reuse: Section skeletons either consume `<Skeleton />` primitive or share standardized Tailwind utility classes.
- Full TypeScript compiler execution: Real execution of `tsc --noEmit`.
- Full Next.js production build execution: Real execution of `npm run build`.

### Tier 4: Real-World Application Scenarios
- Next.js App Router Suspense contract compliance: `loading.tsx` is synchronous/stateless and avoids unhandled asynchronous deadlocks.
- Cumulative Layout Shift (CLS) mitigation: Skeleton heights and padding closely approximate final rendered components (`page.tsx`, `HowItWorks.tsx`, `HeroCarousel.tsx`).
- Production build artifact verification: Inspection of `.next` build output (server manifests, static routes).

---

## 7. Reporting & Diagnostics

The test runner produces structured terminal output:
1. Individual test case pass/fail markers (`PASS` / `FAIL`) with timing.
2. Grouped summary by Tier.
3. Feature-by-feature coverage table.
4. Total test counts, passed, failed, and execution duration.
5. Actionable error diagnostics for any failed assertion.
