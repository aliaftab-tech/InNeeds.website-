# Handoff Report: Milestone 1 — Dead Code & Asset Elimination Planning

**Author**: Explorer R1.1 (Dead Code & Asset Elimination Planner)  
**Date**: 2026-11-06T15:02:00Z  
**Target Repository**: `d:\InNeeds website`  
**Milestone**: Milestone 1 (M1) — Dead Code & Asset Elimination  
**Status**: COMPLETE / ACTIONABLE RECIPE READY FOR WORKER  

---

## 1. Observation

Direct, empirical observations were verified against the live repository across configuration files, source components, stylesheets, static asset directories, test suites, and linter outputs.

### 1.1 Unused NPM Package: `gsap` (`package.json:14`)
- **Manifest Observation**: `package.json` line 14:
  ```json
  "gsap": "^3.15.0",
  ```
- **Call-Site Sweep**: Full repository AST and regex sweep across `src/`, `tests/`, and root files:
  - Total call sites in active code: **0**.
  - Total imports or requires in tests: **0**.
  - Search command: `Get-ChildItem -Path "src","tests" -Recurse | Select-String -Pattern "gsap"` returned **zero lines**.

### 1.2 Obsolete Root Generator Scripts & Duplicate Drafts (4 files, 1.59 MB)
The root directory `d:\InNeeds website\` contains 4 dead files:
1. `generate_icon.js` (1,072 bytes):
   - Standalone generator script for `src/app/apple-icon.png`. Uses `const sharp = require('sharp');` which is not declared in `package.json`.
   - Never invoked by `next dev`, `next build`, or any test script.
   - Triggers ESLint errors: `1:15 error A require() style import is forbidden @typescript-eslint/no-require-imports`.
2. `generate_rounded_favicon.js` (1,558 bytes):
   - Standalone generator script for `src/app/icon.png`. Uses undeclared `sharp`.
   - Never invoked by build or test scripts.
   - Triggers ESLint errors: `1:15 error A require() style import is forbidden @typescript-eslint/no-require-imports`.
3. `InNeeds logo.png` (888,049 bytes ~ 867.2 KB):
   - Duplicate raw image of `public/logo.png`.
   - Next.js does not serve static files from project root. Zero references in `src/`, `tests/`, or metadata.
4. `InNeeds website favicon.png` (777,153 bytes ~ 758.9 KB):
   - Raw favicon draft. Next.js serves icons via `src/app/icon.png` or `public/favicon.png`. Zero references.
- **Total Root Dead File Footprint**: **1,667,832 bytes (1.59 MB)**.

### 1.3 Unreferenced Static Assets in `public/` (28 files, 12.62 MB)
Out of 45 static files residing in `d:\InNeeds website\public\`:
- Exactly **17 files are active** in `src/` and must be preserved.
- Exactly **28 files are completely unreferenced across the entire codebase**:

| # | Filename | Size | Original Context | Superseded By / Status |
|---|---|---|---|---|
| 1 | `carousel-animal.jpg` | 817.5 KB | Old carousel slide | `campaign_flat_4.jpg` |
| 2 | `carousel-child.jpg` | 798.1 KB | Old carousel slide | `campaign_flat_*.jpg` |
| 3 | `carousel-education.jpg` | 760.0 KB | Old carousel slide | `campaign_flat_7.jpg` |
| 4 | `carousel-emergency.jpg` | 923.8 KB | Old carousel slide | `campaign_flat_6.jpg` |
| 5 | `carousel-health.jpg` | 821.9 KB | Old carousel slide | `campaign_flat_2.jpg` |
| 6 | `carousel-home.jpg` | 882.2 KB | Old carousel slide | `campaign_flat_*.jpg` |
| 7 | `carousel-human-rights.jpg` | 935.8 KB | Old carousel slide | `campaign_flat_*.jpg` |
| 8 | `favicon-transparent.png` | 289.1 KB | Favicon draft | `src/app/icon.png` & `public/favicon.png` |
| 9 | `file.svg` | 0.4 KB | Default Next.js starter icon | Unused boilerplate |
| 10 | `globe.svg` | 1.0 KB | Default Next.js starter icon | Unused boilerplate |
| 11 | `hero-dark.jpg` | 583.3 KB | Old hero background draft | Unused |
| 12 | `hero-food.jpg` | 935.6 KB | Old hero card draft | Unused |
| 13 | `hero-image-professional.jpg` | 731.0 KB | Old hero card draft | Unused |
| 14 | `hero-image.jpg` | 627.3 KB | Old hero card draft | Unused |
| 15 | `hero-medical.jpg` | 663.2 KB | Old hero card draft | Unused |
| 16 | `hero-water.jpg` | 736.0 KB | Old hero card draft | Unused |
| 17 | `hero.jpg` | 615.4 KB | Old hero card draft | Unused |
| 18 | `inneeds_campaign_1.png` | 191.2 KB | Old campaigns asset | `campaign_flat_1.jpg` |
| 19 | `inneeds_campaign_2.png` | 136.4 KB | Old campaigns asset | `campaign_flat_2.jpg` |
| 20 | `inneeds_campaign_3.png` | 86.9 KB | Old campaigns asset | `campaign_flat_3.jpg` |
| 21 | `inneeds_campaign_4.png` | 80.3 KB | Old campaigns asset | `campaign_flat_4.jpg` |
| 22 | `inneeds_campaign_5.png` | 104.9 KB | Old campaigns asset | `campaign_flat_5.jpg` |
| 23 | `inneeds_campaign_6.png` | 132.5 KB | Old campaigns asset | `campaign_flat_6.jpg` |
| 24 | `inneeds_campaign_7.png` | 196.2 KB | Old campaigns asset | `campaign_flat_7.jpg` |
| 25 | `logo.png` | 867.2 KB | Old opaque logo draft | `transparent.png` |
| 26 | `next.svg` | 1.3 KB | Default Next.js starter icon | Unused boilerplate |
| 27 | `vercel.svg` | 0.1 KB | Default Next.js starter icon | Unused boilerplate |
| 28 | `window.svg` | 0.4 KB | Default Next.js starter icon | Unused boilerplate |

- **Total Dead Asset Footprint in `public/`**: **13,230,080 bytes (12.62 MB)**.
- **Active Assets in `public/` (STRICTLY PRESERVED - 17 files)**:
  `animal_rescue_1790596260846.jpg`, `campaign_flat_1.jpg`, `campaign_flat_2.jpg`, `campaign_flat_3.jpg`, `campaign_flat_4.jpg`, `campaign_flat_5.jpg`, `campaign_flat_6.jpg`, `campaign_flat_7.jpg`, `child_protection_1790596242292.jpg`, `edu_schoolgirl_1790596211832.jpg`, `emergency.jpg`, `favicon.png`, `hands.jpg`, `home_family_1790596228028.jpg`, `social-share-transparent.png`, `student.jpg`, `transparent.png`.

### 1.4 Dead CSS Keyframes & Utility Classes (`src/app/globals.css:20–44`)
- `src/app/globals.css` lines 20–44:
  ```css
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  .animate-shimmer {
    position: relative;
    overflow: hidden;
  }

  .animate-shimmer::after {
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0)
    );
    animation: shimmer 2s infinite;
    content: "";
  }
  ```
- **Call-Site Sweep**: Zero components or skeletons use `.animate-shimmer` or `shimmer`. All skeleton components uniformly use Tailwind's native `animate-pulse`.

### 1.5 Rogue Syntax Artifact (`src/components/HowItWorks.tsx:334`)
- `src/components/HowItWorks.tsx` lines 332–336:
  ```tsx
  332:                   </div>
  333: 
  334:                   ``                </div>
  335:               </div>
  336:             </div>
  ```
- Stray ES6 template backtick literal ` `` ` sits directly before `</div>`.

### 1.6 Duplicate Comment in `src/app/page.tsx:267–268`
- `src/app/page.tsx` lines 267–268:
  ```tsx
  267:       {/* TRUSTED BY STRIP */}
  268:       {/* TRUSTED BY STRIP */}
  ```
- Identical JSX comment rendered twice back-to-back.

### 1.7 Dead Read in Test Suite (`tests/tier3-interactions.test.mjs:58`)
- `tests/tier3-interactions.test.mjs` line 58:
  ```javascript
  57: suite.test('I1.4: Section skeletons consume base Skeleton primitive', () => {
  58:   const barrelContent = readFileContent('src/components/skeletons/index.ts');
  59:   const heroContent = readFileContent('src/components/skeletons/HeroSectionSkeleton.tsx');
  ```
- `barrelContent` is assigned by reading `index.ts`, but is never asserted or referenced in test `I1.4`, triggering an ESLint `@typescript-eslint/no-unused-vars` warning.

### 1.8 Baseline Test & Linter Status
- `node tests/run-e2e.mjs`: **96 tests run, 96 passed (100%), 0 failed**.
- `npx eslint`: 44 problems (including 4 errors in root generator scripts and 1 warning in `tests/tier3-interactions.test.mjs`).

---

## 2. Logic Chain

1. **`gsap` elimination safety**:
   - `gsap` is listed in `package.json:14` but has 0 call sites across all `.ts`, `.tsx`, `.mjs`, and `.json` files.
   - Next.js builds, compiles, and bundles without requiring `gsap`.
   - Running `npm uninstall gsap` removes the unused package from `dependencies` and cleans `node_modules` with zero side effects.
2. **Root generator and draft file deletion safety**:
   - `generate_icon.js` and `generate_rounded_favicon.js` were developer-time icon generation utilities that require `sharp` (not installed). Their deletion resolves 4 ESLint require errors immediately.
   - `InNeeds logo.png` and `InNeeds website favicon.png` sit in the root directory. Next.js App Router only serves assets from `public/` (via URL path `/file.ext`) or `src/app/` (for App Router metadata conventions like `icon.png`). They cannot be resolved by the browser.
3. **`public/` static asset pruning safety**:
   - The 28 identified files were individually searched against the full repository. Zero references were found.
   - The 17 active files in `public/` cover all hero images, carousel cards (`campaign_flat_1-7`), showcase bento cards, and brand logos (`transparent.png`, `favicon.png`).
   - Removing the 28 unreferenced files eliminates **12.62 MB** of dead weight without altering any visual layout or breaking any asset URLs.
4. **CSS shimmer rule removal safety**:
   - All skeleton components in `src/components/skeletons/` and `src/components/ui/skeleton.tsx` use Tailwind CSS v4's `animate-pulse` class.
   - Tests `F12.1` and `B3.1` check `skeleton.tsx` for `animate-pulse || shimmer`, which resolves true via `animate-pulse`.
   - Deleting `@keyframes shimmer` and `.animate-shimmer` from `src/app/globals.css` cleans up unused CSS without impacting runtime styling.
5. **Syntax cleanup safety**:
   - Removing ` `` ` in `HowItWorks.tsx:334` cleans up stray tokens in JSX without altering DOM hierarchy.
   - Removing the duplicate comment line in `page.tsx:268` cleans up visual noise.
   - Removing `barrelContent` in `tests/tier3-interactions.test.mjs:58` cleans up an unused assignment, eliminating an ESLint warning while leaving test `I1.4` assertions intact.

---

## 3. Caveats & Safety Boundaries

1. **CRITICAL SAFETY BOUNDARY — `FooterSkeleton.tsx` MUST NOT BE TOUCHED**:
   - `src/components/skeletons/FooterSkeleton.tsx` is NOT currently imported in `src/app/loading.tsx` (because `src/app/layout.tsx` renders `<Footer />` globally below `{children}`).
   - **Do NOT delete or rename `FooterSkeleton.tsx`**.
   - It is strictly verified by 8 E2E tests:
     - `tests/tier1-features.test.mjs:281` (F10.1: file existence)
     - `tests/tier1-features.test.mjs:286` (F10.2: named export)
     - `tests/tier1-features.test.mjs:291` (F10.3: `bg-[#0b291a]`)
     - `tests/tier1-features.test.mjs:297` (F10.4: newsletter placeholders)
     - `tests/tier1-features.test.mjs:301` (F10.5: 5-column link grid)
     - `tests/tier1-features.test.mjs:389` (F13.1: extension check)
     - `tests/tier1-features.test.mjs:415` (F13.3: barrel re-export)
     - `tests/tier2-boundary.test.mjs:13` (B1.2: dark theme isolation)
     - `tests/tier3-interactions.test.mjs:37` (I1.2: barrel completeness)
   - Removing `FooterSkeleton.tsx` would cause 8 immediate test failures.
2. **Strict Preservation of 17 Active `public/` Assets**:
   - Do NOT delete:
     1. `animal_rescue_1790596260846.jpg`
     2. `campaign_flat_1.jpg`
     3. `campaign_flat_2.jpg`
     4. `campaign_flat_3.jpg`
     5. `campaign_flat_4.jpg`
     6. `campaign_flat_5.jpg`
     7. `campaign_flat_6.jpg`
     8. `campaign_flat_7.jpg`
     9. `child_protection_1790596242292.jpg`
     10. `edu_schoolgirl_1790596211832.jpg`
     11. `emergency.jpg`
     12. `favicon.png`
     13. `hands.jpg`
     14. `home_family_1790596228028.jpg`
     15. `social-share-transparent.png`
     16. `student.jpg`
     17. `transparent.png`
3. **Preservation of `floatCard` animation in `src/app/globals.css`**:
   - `@keyframes floatCard` and `.anim-float-card` (lines 7–18) are actively used by `src/components/HowItWorks.tsx:282`. They must NOT be touched when removing `shimmer`.

---

## 4. Conclusion & Actionable Implementation Recipe

Below is the exact step-by-step recipe for the Worker agent to execute Milestone 1 with zero ambiguity.

### Step 1: Remove `gsap` Dependency
- **Action**: Run standard npm uninstall to remove `gsap` from `package.json` and `package-lock.json`.
- **Command**:
  ```powershell
  npm uninstall gsap
  ```
- **Target File Verification**:
  In `package.json`, verify `"gsap": "^3.15.0"` is gone and `package.json` remains valid JSON:
  ```json
    "dependencies": {
      "clsx": "^2.1.1",
      "framer-motion": "^13.4.4",
      "lucide-react": "^1.48.0",
      "next": "16.3.6",
      "react": "19.2.8",
      "react-dom": "19.2.8",
      "tailwind-merge": "^3.7.0"
    },
  ```

### Step 2: Delete Obsolete Root Files (4 files)
- **Action**: Delete the 2 obsolete generator scripts and 2 duplicate root images.
- **Command**:
  ```powershell
  Remove-Item -Path "generate_icon.js", "generate_rounded_favicon.js", "InNeeds logo.png", "InNeeds website favicon.png" -Force
  ```
- **Expected Result**: 4 files deleted (~1.59 MB freed).

### Step 3: Delete 28 Unreferenced Static Assets in `public/`
- **Action**: Delete the 28 unreferenced files from `d:\InNeeds website\public\`.
- **Command**:
  ```powershell
  $deadAssets = @(
    "public\carousel-animal.jpg",
    "public\carousel-child.jpg",
    "public\carousel-education.jpg",
    "public\carousel-emergency.jpg",
    "public\carousel-health.jpg",
    "public\carousel-home.jpg",
    "public\carousel-human-rights.jpg",
    "public\favicon-transparent.png",
    "public\file.svg",
    "public\globe.svg",
    "public\hero-dark.jpg",
    "public\hero-food.jpg",
    "public\hero-image-professional.jpg",
    "public\hero-image.jpg",
    "public\hero-medical.jpg",
    "public\hero-water.jpg",
    "public\hero.jpg",
    "public\inneeds_campaign_1.png",
    "public\inneeds_campaign_2.png",
    "public\inneeds_campaign_3.png",
    "public\inneeds_campaign_4.png",
    "public\inneeds_campaign_5.png",
    "public\inneeds_campaign_6.png",
    "public\inneeds_campaign_7.png",
    "public\logo.png",
    "public\next.svg",
    "public\vercel.svg",
    "public\window.svg"
  )
  Remove-Item -Path $deadAssets -Force
  ```
- **Expected Result**: 28 files deleted (~12.62 MB freed). Exactly 17 active files remain in `public/`.

### Step 4: Remove Dead CSS Shimmer from `src/app/globals.css`
- **File**: `d:\InNeeds website\src\app\globals.css`
- **Lines to Remove**: Lines 20–44.
- **Diff Specification**:
  ```diff
  --- src/app/globals.css
  +++ src/app/globals.css
  @@ -17,28 +17,3 @@
   .anim-float-card {
     animation: floatCard 5.5s ease-in-out infinite;
   }
  -
  -@keyframes shimmer {
  -  100% {
  -    transform: translateX(100%);
  -  }
  -}
  -
  -.animate-shimmer {
  -  position: relative;
  -  overflow: hidden;
  -}
  -
  -.animate-shimmer::after {
  -  position: absolute;
  -  inset: 0;
  -  transform: translateX(-100%);
  -  background-image: linear-gradient(
  -    90deg,
  -    rgba(255, 255, 255, 0) 0,
  -    rgba(255, 255, 255, 0.2) 20%,
  -    rgba(255, 255, 255, 0.5) 60%,
  -    rgba(255, 255, 255, 0)
  -  );
  -  animation: shimmer 2s infinite;
  -  content: "";
  -}
  ```
- **Final Target File Content (`src/app/globals.css`)**:
  ```css
  @import "tailwindcss";

  @theme {
    --font-sans: var(--font-inter);
  }

  @keyframes floatCard {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-6px);
    }
  }

  .anim-float-card {
    animation: floatCard 5.5s ease-in-out infinite;
  }
  ```

### Step 5: Remove Rogue Backtick Syntax from `src/components/HowItWorks.tsx`
- **File**: `d:\InNeeds website\src\components\HowItWorks.tsx`
- **Lines to Edit**: Lines 332–336.
- **Diff Specification**:
  ```diff
  --- src/components/HowItWorks.tsx
  +++ src/components/HowItWorks.tsx
  @@ -331,6 +331,5 @@
                       </div>
                     </div>
                   </div>
  -
  -                  ``                </div>
  +                </div>
               </div>
  ```

### Step 6: Remove Duplicate Comment from `src/app/page.tsx`
- **File**: `d:\InNeeds website\src\app\page.tsx`
- **Lines to Edit**: Lines 267–268.
- **Diff Specification**:
  ```diff
  --- src/app/page.tsx
  +++ src/app/page.tsx
  @@ -265,4 +265,3 @@
         </section>

         {/* TRUSTED BY STRIP */}
  -      {/* TRUSTED BY STRIP */}
         <section className="py-16 bg-white overflow-hidden relative border-t border-slate-100">
  ```

### Step 7: Remove Unused `barrelContent` Read from `tests/tier3-interactions.test.mjs`
- **File**: `d:\InNeeds website\tests\tier3-interactions.test.mjs`
- **Lines to Edit**: Line 58.
- **Diff Specification**:
  ```diff
  --- tests/tier3-interactions.test.mjs
  +++ tests/tier3-interactions.test.mjs
  @@ -56,3 +56,2 @@
   suite.test('I1.4: Section skeletons consume base Skeleton primitive', () => {
  -  const barrelContent = readFileContent('src/components/skeletons/index.ts');
     const heroContent = readFileContent('src/components/skeletons/HeroSectionSkeleton.tsx');
  ```

---

## 5. Verification Method

Following the execution of Steps 1 through 7, the Worker and Reviewer can independently verify repository integrity via the following commands:

### 5.1 Verification Commands
1. **Verify Asset Counts in `public/`**:
   ```powershell
   (Get-ChildItem "public").Count
   ```
   *Expected Output*: Exactly `17`.

2. **Verify Root Dead Files are Gone**:
   ```powershell
   Test-Path "generate_icon.js", "generate_rounded_favicon.js", "InNeeds logo.png", "InNeeds website favicon.png"
   ```
   *Expected Output*: `False False False False`.

3. **Verify Zero Stray Backticks in `HowItWorks.tsx`**:
   ```powershell
   Select-String -Path "src\components\HowItWorks.tsx" -Pattern "``"
   ```
   *Expected Output*: No match found (exit code 1).

4. **Verify TypeScript Compilation**:
   ```powershell
   npx tsc --noEmit
   ```
   *Expected Output*: Exit code 0 with zero diagnostics.

5. **Verify Full 4-Tier 96-Test E2E Test Suite**:
   ```powershell
   node tests/run-e2e.mjs
   ```
   *Expected Output*:
   - `Tier 1: Feature Coverage (F1 - F13)`: 72 passed, 0 failed.
   - `Tier 2: Boundary & Corner Cases`: 13 passed, 0 failed.
   - `Tier 3: Cross-Feature Interactions & Combinations`: 6 passed, 0 failed.
   - `Tier 4: Real-World Application Scenarios`: 5 passed, 0 failed.
   - `TOTAL`: 96 passed, 0 failed. Exit code 0.

6. **Verify Next.js Production Build**:
   ```powershell
   npm run build
   ```
   *Expected Output*: Turbopack build succeeds with zero errors.

### 5.2 Invalidation Conditions
- Any change to `FooterSkeleton.tsx` or its removal from `src/components/skeletons/index.ts`.
- Deletion of any of the 17 active static assets listed in Caveat 2.
- Removal of `@keyframes floatCard` or `.anim-float-card` from `globals.css`.
- Syntax error introduced into `package.json` JSON structure.
- Any test failure in `node tests/run-e2e.mjs`.
