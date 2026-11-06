# Survey Phase 1: Architecture, Dependencies, and Build Infrastructure

## 1. Observation

### 1.1 Project Specification & Manifest
- **Path**: `d:\InNeeds website\package.json`
- **Application Name & Version**: `inneeds-web` v0.1.0 (private repository).
- **Runtime Stack**:
  - `next`: `16.3.6` (Next.js App Router with Turbopack enabled)
  - `react`: `19.2.8`
  - `react-dom`: `19.2.8`
  - `tailwindcss`: `^4` with `@tailwindcss/postcss`: `^4`
  - `typescript`: `^5` (target ES2017, bundler module resolution, strict mode enabled)
  - `framer-motion`: `^13.4.4`
  - `gsap`: `^3.15.0`
  - `lucide-react`: `^1.48.0`
  - `clsx`: `^2.1.1` & `tailwind-merge`: `^3.7.0`
- **Scripts Defined in package.json**:
  - `"dev"`: `"next dev"`
  - `"build"`: `"next build"`
  - `"start"`: `"next start"`
  - `"lint"`: `"eslint"`
  - *Note*: No `"test"` or `"typecheck"` script entry is currently defined in `package.json`.

### 1.2 Build & Baseline Verification Health
- **Build (`npm run build`)**:
  - Command: `npm run build`
  - Execution Output:
    ```
    ▲ Next.js 16.3.6 (Turbopack)
    ✓ Running next.config.ts took 136ms
    ✓ Compiled successfully in 5.2s
    ✓ Generating static pages using 6 workers (5/5) in 7.2s
    Finalizing page optimization ...
    Route (app)
    ┌ ○ /
    ├ ○ /_not-found
    ├ ○ /apple-icon.png
    └ ○ /icon.png
    ```
  - Exit code: `0` (Success). All static routes prerendered without errors.
- **Typecheck (`npx tsc --noEmit`)**:
  - Command: `npx tsc --noEmit`
  - Exit code: `0` (Success). 0 diagnostic errors reported across the codebase.
- **E2E / Integration Suite (`node tests/run-e2e.mjs`)**:
  - Command: `node tests/run-e2e.mjs`
  - Suite Breakdown:
    - Tier 1 (Feature Coverage F1-F13): 72 passed, 0 failed.
    - Tier 2 (Boundary & Corner Cases): 13 passed, 0 failed.
    - Tier 3 (Cross-Feature Interactions): 6 passed, 0 failed.
    - Tier 4 (Real-World Scenarios): 5 passed, 0 failed.
  - Overall Result: 96 passed, 0 failed, 96 total. Execution time: ~103.87s. Exit code: `0` (Success).
- **Linter (`npm run lint` / `npx eslint`)**:
  - Command: `npm run lint`
  - Exit code: `1` (Failure). 44 problems (29 errors, 15 warnings).
  - Verbatim error distribution:
    1. `.agents/teamwork/teamwork_challenger_1/adversarial_stress_test.cjs` & `.mjs`: 18 errors (`@typescript-eslint/no-require-imports`) + 2 warnings (`'clicked' is assigned a value but never used`).
    2. `.agents/teamwork/teamwork_challenger_2/adversarial_layout_test.mjs`: 9 warnings (`'pageMatch'`, `'liveMatch'`, `'liveHeader'` unused).
    3. `generate_icon.js` & `generate_rounded_favicon.js`: 4 errors (`@typescript-eslint/no-require-imports`).
    4. `src/app/page.tsx`:
       - Line 582:101: `error: ' can be escaped with &apos;, &lsquo;, &#39;, &rsquo; react/no-unescaped-entities`
       - Lines 578:13, 603:13, 615:15: 3 warnings (`@next/next/no-img-element: Using <img> could result in slower LCP and higher bandwidth. Consider using <Image /> from next/image`).
    5. `src/components/BottomCarousel.tsx`:
       - Line 34:30 and 34:41: 2 errors (`@typescript-eslint/no-explicit-any: Unexpected any. Specify a different type`).
    6. `src/components/Footer.tsx`:
       - Lines 85:15, 86:15, 87:15, 88:15: 4 errors (`@next/next/no-html-link-for-pages: Do not use an <a> element to navigate to /. Use <Link /> from next/link instead`).
    7. `tests/tier3-interactions.test.mjs`:
       - Line 58:9: 1 warning (`@typescript-eslint/no-unused-vars: 'barrelContent' is assigned a value but never used`).

### 1.3 Key Configurations
- **`tsconfig.json`**:
  - Module: `"esnext"`, Module Resolution: `"bundler"`.
  - Path alias: `"@/*": ["./src/*"]`.
  - Includes: `next-env.d.ts`, `**/*.ts`, `**/*.tsx`, `.next/types/**/*.ts`, `.next/dev/types/**/*.ts`, `**/*.mts`. Excludes: `node_modules`.
- **`next.config.ts`**:
  - Configures `images.remotePatterns` for `images.unsplash.com`.
- **`eslint.config.mjs`**:
  - Flat config using `defineConfig` with `nextVitals` and `nextTs`.
  - Currently ignores only `.next/**`, `out/**`, `build/**`, `next-env.d.ts`. Missing ignores for `.agents/**`, tooling scripts, and test files.
- **`postcss.config.mjs`**:
  - Configures `@tailwindcss/postcss`.
- **`src/app/globals.css`**:
  - Imports `tailwindcss`. Defines `@theme { --font-sans: var(--font-inter); }`.
  - Defines keyframes: `floatCard`, `shimmer`, along with utility classes `.anim-float-card` and `.animate-shimmer`.

### 1.4 Directory Layout & Architectural Map
```
d:\InNeeds website\
├── public/                     # 38 static assets (campaign banners, logo SVGs/PNGs)
├── src/
│   ├── app/                    # Next.js App Router root
│   │   ├── apple-icon.png      # Next.js auto metadata icon
│   │   ├── icon.png            # Next.js auto metadata favicon
│   │   ├── globals.css         # Tailwind v4 import & custom keyframe animations
│   │   ├── layout.tsx          # Root layout (Inter font, metadata, children, & global <Footer />)
│   │   ├── loading.tsx         # Route suspense skeleton hierarchy (Navbar + 7 section skeletons)
│   │   └── page.tsx            # Full landing page (639 lines, "use client", 8 UI sections)
│   ├── components/
│   │   ├── BottomCarousel.tsx  # 3D interactive cylinder carousel using framer-motion
│   │   ├── Footer.tsx          # Global 5-column footer with newsletter & accordions
│   │   ├── HeroCarousel.tsx    # 3D perspective hero carousel
│   │   ├── HowItWorks.tsx      # 3-step feature section with top SVG dome arch divider & badges
│   │   ├── skeletons/          # 9 skeleton section components + index.ts barrel export
│   │   └── ui/
│   │       └── skeleton.tsx    # Base Skeleton primitive (variant="light" | "dark" | "card")
│   └── lib/
│       └── utils.ts            # cn() class merge helper (clsx + tailwind-merge)
├── tests/                      # 4-tier E2E and regression test suite (96 tests)
│   ├── run-e2e.mjs             # Test runner
│   ├── test-utils.mjs          # AST/regex/file test helpers
│   ├── tier1-features.test.mjs # 72 tests
│   ├── tier2-boundary.test.mjs # 13 tests
│   ├── tier3-interactions.test.mjs # 6 tests
│   └── tier4-scenarios.test.mjs    # 5 tests
├── generate_icon.js            # Standalone icon generator (sharp)
├── generate_rounded_favicon.js # Standalone favicon generator (sharp)
├── InNeeds logo.png            # Redundant root image (888KB, unused, identical to public/logo.png)
└── InNeeds website favicon.png # Redundant root image (777KB, unused)
```

### 1.5 Redundant and Dead Artifacts Identified
1. **Root PNG files**:
   - `d:\InNeeds website\InNeeds logo.png` (888,049 bytes): Exact duplicate of `public/logo.png` (888,049 bytes). Root files are not served by Next.js static routing.
   - `d:\InNeeds website\InNeeds website favicon.png` (777,153 bytes): Raw asset unreferenced in code. Next.js uses `src/app/icon.png`, `src/app/apple-icon.png`, or `public/favicon.png`.
2. **Root Generator Scripts**:
   - `generate_icon.js` & `generate_rounded_favicon.js`: One-off utility scripts requiring `sharp`. They trigger ESLint CJS require errors and are not part of build or runtime.

---

## 2. Logic Chain

1. **Observation**: `package.json` specifies `"build": "next build"` and `"lint": "eslint"`, but lacks explicit `"typecheck"` and `"test"` script commands.
   - **Inference**: The orchestrator and workers must use `npm run build`, `npx tsc --noEmit`, and `node tests/run-e2e.mjs` for complete regression verification. Adding `"typecheck": "tsc --noEmit"` and `"test": "node tests/run-e2e.mjs"` to `package.json` scripts will standardize project tooling without breaking changes.
2. **Observation**: `npm run build` and `npx tsc --noEmit` pass with exit code `0`, and `node tests/run-e2e.mjs` passes 96/96 tests.
   - **Inference**: The core Next.js application, TypeScript contracts, and E2E skeleton suite are completely sound and ready for safe additive refactoring.
3. **Observation**: `npm run lint` fails with 44 problems (29 errors), but 22 of those errors originate in `.agents/**` and root generator scripts (`generate_icon.js`, `generate_rounded_favicon.js`). Only 7 errors and 4 warnings reside within actual `src/` files.
   - **Inference**: 
     - Updating `eslint.config.mjs` to add `globalIgnores([".agents/**", "generate_*.js"])` immediately eliminates 22 false-positive errors.
     - Fixing the 7 real errors in `src/` (`src/app/page.tsx:582` entity escape, `src/components/BottomCarousel.tsx:34` any types, and `src/components/Footer.tsx:85-88` Next Link elements) will restore the codebase to a 100% clean baseline (`0 errors`).
4. **Observation**: `InNeeds logo.png` and `InNeeds website favicon.png` exist in the root folder, totaling ~1.66MB, but Next.js only serves assets from `public/`.
   - **Inference**: These root PNGs are obsolete leftovers that can safely be removed during Phase 2 cleanup.
5. **Observation**: `src/app/layout.tsx` globally renders `<Footer />` below `{children}`, while `src/app/loading.tsx` renders `NavbarSkeleton` followed by 7 section skeletons, strictly avoiding `FooterSkeleton`.
   - **Inference**: Architectural boundary between layout and route loading is well-defined. Any refactoring must strictly preserve this composition to avoid duplicate footers during route transitions.

---

## 3. Caveats

1. **Tests run duration**: Running the complete E2E test runner (`node tests/run-e2e.mjs`) takes ~103 seconds because it runs full production build verification (`runBuildWithRetry`) in Tier 3. Fast feedback cycles during refactoring should use `npx tsc --noEmit` and Tier 1 unit tests (`node tests/tier1-features.test.mjs`), reserving `node tests/run-e2e.mjs` for milestone gates.
2. **Tailwind v4 Configuration**: The project uses Tailwind CSS v4 without a traditional `tailwind.config.js`. Theme tokens are declared directly in CSS via `@theme` directives in `src/app/globals.css`.
3. **GSAP Dependency**: `gsap` is listed in `package.json` dependencies (`^3.15.0`), but no imports of `gsap` were observed in `src/app/` or `src/components/`. Further investigation in Phase 2 should determine whether GSAP is intended for future animations or represents an unused dependency.

---

## 4. Conclusion

The repository is a Next.js 16.3.6 App Router application with React 19, TypeScript strict mode, Tailwind CSS v4, and a 4-tier E2E test suite (96 tests).
- Baseline Build: **HEALTHY** (`npm run build` exits 0).
- Baseline Typecheck: **HEALTHY** (`npx tsc --noEmit` exits 0).
- Baseline E2E Suite: **HEALTHY** (`node tests/run-e2e.mjs` passes 96/96).
- Baseline Lint: **FAILING** (44 problems, mostly caused by un-ignored `.agents/` and tooling files, plus 7 localized syntax/type issues in `src/`).

The architecture is clean, highly modular, and well-structured for the upcoming dead-code elimination and code-quality refactoring phases.

---

## 5. Verification Method

To independently verify all findings in this survey, run the following commands in sequence:

1. **Verify TypeScript compilation**:
   ```powershell
   npx tsc --noEmit
   ```
   *Expected outcome*: Exit code 0, no output.

2. **Verify Production Next.js Build**:
   ```powershell
   npm run build
   ```
   *Expected outcome*: Exit code 0, Turbopack builds `/`, `/_not-found`, `/apple-icon.png`, `/icon.png`.

3. **Verify E2E Test Suite**:
   ```powershell
   node tests/run-e2e.mjs
   ```
   *Expected outcome*: Exit code 0, 96/96 tests PASS across Tiers 1-4.

4. **Verify ESLint Status & Error Distribution**:
   ```powershell
   npm run lint
   ```
   *Expected outcome*: Exit code 1, reporting 44 problems (29 errors, 15 warnings).

5. **Verify File Layout & Boundaries**:
   - Inspect `src/app/layout.tsx` (contains `<Footer />` below `{children}`).
   - Inspect `src/app/loading.tsx` (contains `NavbarSkeleton` and 7 section skeletons, no `FooterSkeleton`).
   - Inspect root directory (`InNeeds logo.png` and `InNeeds website favicon.png` redundancy).
