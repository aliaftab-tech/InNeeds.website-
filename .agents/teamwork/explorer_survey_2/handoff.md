# Handoff Report: Explorer Survey Phase 2 — Dead and Unused Code Analysis

**Author**: Explorer Survey 2 (Dead Code & Redundancy Investigator)  
**Date**: 2026-11-06T14:51:00Z  
**Target Repository**: `d:\InNeeds website`  
**Reference**: `ORIGINAL_REQUEST.md` (Requirement R1: Unused and Dead Code Elimination)  

---

## 1. Observation

A full-repository sweep of `d:\InNeeds website` was conducted across all files, configuration manifests, component trees, public static assets, styles, scripts, and test suites.

### 1.1 Unused NPM Package Dependencies (`package.json:11–20`)
- **Package**: `gsap` (`^3.15.0`) in `package.json:14`.
  - **Codebase Call-Sites**: Zero. A case-insensitive regex search `\bgsap\b` across all files in `src/`, `tests/`, and root configurations yielded **0 occurrences**.
  - **Test Suite References**: Zero. No test in `tests/*.mjs` imports, requires, or asserts `gsap`.
  - **Build Impact**: None. `gsap` is currently dead bundle weight.
- **Other Dependencies Checked**:
  - `clsx` (`^2.1.1`): Used in `src/lib/utils.ts:1`.
  - `tailwind-merge` (`^3.7.0`): Used in `src/lib/utils.ts:2`.
  - `framer-motion` (`^13.4.4`): Used in `src/components/BottomCarousel.tsx:3`.
  - `lucide-react` (`^1.48.0`): Used across `src/app/page.tsx:6`, `src/components/Footer.tsx:6`, and `src/components/HowItWorks.tsx:4-9`.
  - `next`, `react`, `react-dom`: Active runtime framework.

### 1.2 Phantom Dependency in Root Scripts
- `generate_icon.js:1` and `generate_rounded_favicon.js:1` declare `const sharp = require('sharp');`.
- `sharp` is **not declared** in `package.json` (`dependencies` or `devDependencies`).
- Neither script is registered in `package.json["scripts"]` (`dev`, `build`, `start`, `lint`).
- Running `npm run lint` raises `@typescript-eslint/no-require-imports` errors on both files.

### 1.3 Obsolete / Dead Root Files
The root project directory contains obsolete generator scripts and raw image files:
1. `generate_icon.js` (35 lines, 1,072 bytes):
   - Standalone sharp generator for `src/app/apple-icon.png`.
   - Never invoked by `next dev`, `next build`, CI, or test scripts.
2. `generate_rounded_favicon.js` (51 lines, 1,558 bytes):
   - Standalone sharp generator for `src/app/icon.png`.
   - Never invoked by build or test scripts.
3. `InNeeds logo.png` (888,049 bytes ~ 867.2 KB):
   - Bit-for-bit duplicate of `public/logo.png`.
   - Next.js does not serve static files from project root.
   - Zero references in `src/`, `tests/`, or configs.
4. `InNeeds website favicon.png` (777,153 bytes ~ 758.9 KB):
   - Raw favicon draft. Next.js serves icons via `src/app/icon.png` or `public/favicon.png`.
   - Zero references in `src/`, `tests/`, or configs.
- **Total Root Dead File Weight**: **1.59 MB**.

### 1.4 Unreferenced Static Assets in `public/` (12.62 MB)
Out of 45 static files residing in `d:\InNeeds website\public\`, exactly **17 files are active** in `src/`, and **28 files are completely unreferenced across the entire codebase**:

| # | Filename | Size | Type / Context | Verification Reference |
|---|---|---|---|---|
| 1 | `carousel-animal.jpg` | 817.5 KB | Obsolete carousel slide | Superseded by `campaign_flat_4.jpg` |
| 2 | `carousel-child.jpg` | 798.1 KB | Obsolete carousel slide | Superseded by `campaign_flat_*.jpg` |
| 3 | `carousel-education.jpg` | 760.0 KB | Obsolete carousel slide | Superseded by `campaign_flat_7.jpg` |
| 4 | `carousel-emergency.jpg` | 923.8 KB | Obsolete carousel slide | Superseded by `campaign_flat_6.jpg` |
| 5 | `carousel-health.jpg` | 821.9 KB | Obsolete carousel slide | Superseded by `campaign_flat_2.jpg` |
| 6 | `carousel-home.jpg` | 882.2 KB | Obsolete carousel slide | Superseded by `campaign_flat_*.jpg` |
| 7 | `carousel-human-rights.jpg` | 935.8 KB | Obsolete carousel slide | Superseded by `campaign_flat_*.jpg` |
| 8 | `favicon-transparent.png` | 289.1 KB | Obsolete favicon draft | Next uses `src/app/icon.png` & `public/favicon.png` |
| 9 | `file.svg` | 0.4 KB | Default Next.js boilerplate icon | Unused |
| 10 | `globe.svg` | 1.0 KB | Default Next.js boilerplate icon | Unused |
| 11 | `hero-dark.jpg` | 583.3 KB | Obsolete hero background draft | Unused |
| 12 | `hero-food.jpg` | 935.6 KB | Obsolete hero slide draft | Unused |
| 13 | `hero-image-professional.jpg`| 731.0 KB | Obsolete hero slide draft | Unused |
| 14 | `hero-image.jpg` | 627.3 KB | Obsolete hero slide draft | Unused |
| 15 | `hero-medical.jpg` | 663.2 KB | Obsolete hero slide draft | Unused |
| 16 | `hero-water.jpg` | 736.0 KB | Obsolete hero slide draft | Unused |
| 17 | `hero.jpg` | 615.4 KB | Obsolete hero slide draft | Unused |
| 18 | `inneeds_campaign_1.png` | 191.2 KB | Obsolete campaign card | Superseded by `campaign_flat_1.jpg` |
| 19 | `inneeds_campaign_2.png` | 136.4 KB | Obsolete campaign card | Superseded by `campaign_flat_2.jpg` |
| 20 | `inneeds_campaign_3.png` | 86.9 KB | Obsolete campaign card | Superseded by `campaign_flat_3.jpg` |
| 21 | `inneeds_campaign_4.png` | 80.3 KB | Obsolete campaign card | Superseded by `campaign_flat_4.jpg` |
| 22 | `inneeds_campaign_5.png` | 104.9 KB | Obsolete campaign card | Superseded by `campaign_flat_5.jpg` |
| 23 | `inneeds_campaign_6.png` | 132.5 KB | Obsolete campaign card | Superseded by `campaign_flat_6.jpg` |
| 24 | `inneeds_campaign_7.png` | 196.2 KB | Obsolete campaign card | Superseded by `campaign_flat_7.jpg` |
| 25 | `logo.png` | 867.2 KB | Obsolete opaque logo | Replaced in code by `transparent.png` |
| 26 | `next.svg` | 1.3 KB | Default Next.js boilerplate icon | Unused |
| 27 | `vercel.svg` | 0.1 KB | Default Next.js boilerplate icon | Unused |
| 28 | `window.svg` | 0.4 KB | Default Next.js boilerplate icon | Unused |

- **Total Unreferenced Assets Size in `public/`**: **12.62 MB** (13,230,080 bytes).
- **Combined Dead Asset Total (Root + `public/`)**: **14.21 MB**.

### 1.5 Dead CSS Keyframes & Utility Rules (`src/app/globals.css:20–44`)
- Lines 20–24:
  ```css
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
  ```
- Lines 26–44:
  ```css
  .animate-shimmer {
    position: relative;
    overflow: hidden;
  }
  .animate-shimmer::after {
    ...
    animation: shimmer 2s infinite;
    content: "";
  }
  ```
- **Verification**: Zero components in `src/` use `.animate-shimmer` or `shimmer`. All skeletons in `src/components/skeletons/` and `src/components/ui/skeleton.tsx` uniformly use Tailwind CSS's native `animate-pulse` class.

### 1.6 Dead Code Blocks, Syntax Artifacts & Unused Variables
1. **Accidental Syntax Literal in `src/components/HowItWorks.tsx:334`**:
   - Lines 333–335:
     ```tsx
     333:                   </div>
     334:                   ``                </div>
     335:               </div>
     ```
   - An empty ES6 template backtick literal (` `` `) is stranded as text in the JSX tree.
2. **Duplicate Comment in `src/app/page.tsx:267–268`**:
   - Lines 267–268:
     ```tsx
     267:       {/* TRUSTED BY STRIP */}
     268:       {/* TRUSTED BY STRIP */}
     ```
   - Identical comment block duplicated back-to-back.
3. **Dead Read in `tests/tier3-interactions.test.mjs:58`**:
   - Line 58:
     ```javascript
     const barrelContent = readFileContent('src/components/skeletons/index.ts');
     ```
   - `barrelContent` is assigned by reading `index.ts`, but is never checked, asserted, or referenced subsequently in test `I1.4`. Flagged as a warning by ESLint (`@typescript-eslint/no-unused-vars`).

### 1.7 Duplicate Data Structures (`HeroCarousel.tsx:5–13` & `BottomCarousel.tsx:7–15`)
- `src/components/HeroCarousel.tsx:5-13`:
  ```ts
  const baseCategories = [
    { id: 1, title: "Winter Relief", image: "/campaign_flat_1.jpg" },
    { id: 2, title: "Emergency", image: "/campaign_flat_6.jpg" },
    { id: 3, title: "Education", image: "/campaign_flat_7.jpg" },
    { id: 4, title: "Healthcare", image: "/campaign_flat_2.jpg" },
    { id: 5, title: "Environment", image: "/campaign_flat_3.jpg" },
    { id: 6, title: "Food Security", image: "/campaign_flat_5.jpg" },
    { id: 7, title: "Animal Welfare", image: "/campaign_flat_4.jpg" },
  ];
  ```
- `src/components/BottomCarousel.tsx:7-15`: Exactly identical data array copied verbatim.

### 1.8 Unused Runtime UI Component (`FooterSkeleton.tsx`)
- `src/components/skeletons/FooterSkeleton.tsx`:
  - `src/app/loading.tsx` intentionally avoids rendering `<FooterSkeleton />` because `src/app/layout.tsx:25` renders `<Footer />` globally below `{children}`.
  - However, `FooterSkeleton.tsx` is strictly tested by `tests/tier1-features.test.mjs:281-305` (F10.1–F10.5) and `tests/tier2-boundary.test.mjs:13-18` (B1.2).
  - Therefore, it is dead at runtime but **required by the test contract**.

---

## 2. Logic Chain

1. **Why `gsap` is safe to remove from `package.json`**:
   - Search across all `.ts`, `.tsx`, `.mjs`, `.json`, and `.css` files confirmed zero import or require statements for `gsap`.
   - Running `npm run build` without `gsap` will produce an identical client bundle with zero module resolution breakage.
2. **Why root `.png` and generator `.js` files are safe to remove**:
   - Next.js App Router static routing resolves assets only from `public/` (for `/file.ext`) or `src/app/` (for special metadata files like `icon.png` and `apple-icon.png`).
   - Files sitting directly in `d:\InNeeds website\` root (`InNeeds logo.png`, `InNeeds website favicon.png`) cannot be loaded by Next.js at runtime.
   - `generate_icon.js` and `generate_rounded_favicon.js` were temporary developer scripts used to bake `apple-icon.png` and `icon.png`. Now that the icons exist, the generator scripts are obsolete and trigger ESLint CJS require errors.
3. **Why the 28 `public/` assets are safe to prune**:
   - AST / regex verification across all files in `src/` and `tests/` confirmed 0 references to any of the 28 listed files.
   - Active components rely exclusively on `campaign_flat_1.jpg` through `campaign_flat_7.jpg`, `transparent.png`, `favicon.png`, `social-share-transparent.png`, `student.jpg`, `emergency.jpg`, `hands.jpg`, `child_protection_1790596242292.jpg`, `edu_schoolgirl_1790596211832.jpg`, `home_family_1790596228028.jpg`, and `animal_rescue_1790596260846.jpg`.
   - Removing the 28 unreferenced files eliminates 12.62 MB of dead static weight without affecting any page rendering, styles, or tests.
4. **Why `.animate-shimmer` in `src/app/globals.css` is safe to remove**:
   - In Next.js App Router, CSS keyframes and class rules in `globals.css` are bundled into the global CSS output.
   - Skeletons use `animate-pulse` from Tailwind.
   - Tests `F12.1` and `B3.1` check `src/components/ui/skeleton.tsx` for `animate-pulse`, passing independently of `globals.css`.
   - Removing `@keyframes shimmer` and `.animate-shimmer` cleans up unused stylesheet bloat.
5. **Why `HowItWorks.tsx:334` rogue syntax must be pruned**:
   - The `` `` `` backticks are a typo that injects empty template string tokens into the JSX virtual DOM right before the closing tag.
   - Removing it restores clean JSX syntax with zero layout alteration.

---

## 3. Caveats

1. **`FooterSkeleton.tsx` False-Positive Trap**:
   - While `FooterSkeleton` is completely unused in `src/app/loading.tsx`, **it must NOT be deleted**.
   - The E2E test suite (`tier1-features.test.mjs:281–305`, `tier1-features.test.mjs:389`, `tier1-features.test.mjs:415`, `tier2-boundary.test.mjs:13–18`, `tier3-interactions.test.mjs:37`) explicitly asserts that:
     1. `src/components/skeletons/FooterSkeleton.tsx` exists.
     2. It exports `FooterSkeleton`.
     3. It applies `bg-[#0b291a]`.
     4. It is re-exported in `src/components/skeletons/index.ts`.
   - Pruning `FooterSkeleton.tsx` would cause 8 E2E test failures.
2. **`package.json` Pruning Protocol**:
   - When removing `"gsap": "^3.15.0"` from `package.json`, `npm install` or `package-lock.json` sync should be verified against `npm run build` and `npx tsc --noEmit`.
3. **Asset Pruning Safety Boundary**:
   - Before deleting files in `public/`, ensure no dynamic path templates (e.g., `/${variable}.jpg`) are constructing filenames. Inspection of `page.tsx`, `HeroCarousel.tsx`, and `BottomCarousel.tsx` proved all image paths are static string literals.

---

## 4. Conclusion

The repository contains significant dead code and obsolete assets that can be safely eliminated:
1. **Unused Dependency**: `gsap` in `package.json` (0 references).
2. **Obsolete Root Files**: `generate_icon.js`, `generate_rounded_favicon.js`, `InNeeds logo.png`, `InNeeds website favicon.png` (1.59 MB dead files).
3. **Unreferenced Static Assets**: 28 files in `public/` totaling **12.62 MB**.
4. **Dead CSS**: `@keyframes shimmer` and `.animate-shimmer` in `src/app/globals.css:20-44`.
5. **Rogue Syntax & Dead Reads**:
   - Accidental backtick literal in `src/components/HowItWorks.tsx:334`.
   - Duplicate comment in `src/app/page.tsx:267-268`.
   - Unused `barrelContent` variable in `tests/tier3-interactions.test.mjs:58`.
6. **Data Duplication**: `baseCategories` array duplicated between `HeroCarousel.tsx` and `BottomCarousel.tsx`.

Pruning these items will save over **14.2 MB** of repository bloat, eliminate ESLint errors, and streamline build artifacts with **zero breaking changes** and **100% test preservation**.

---

## 5. Verification Method

To independently verify the dead code analysis:

1. **Verify `gsap` has zero call sites**:
   ```powershell
   Get-ChildItem -Path "src","tests" -Recurse | Select-String -Pattern "gsap"
   ```
   *Expected*: No matching lines found.

2. **Verify the 28 `public/` assets have zero call sites**:
   ```powershell
   node -e "
   const fs = require('fs');
   const path = require('path');
   const unused = ['carousel-animal.jpg','carousel-child.jpg','carousel-education.jpg','carousel-emergency.jpg','carousel-health.jpg','carousel-home.jpg','carousel-human-rights.jpg','favicon-transparent.png','file.svg','globe.svg','hero-dark.jpg','hero-food.jpg','hero-image-professional.jpg','hero-image.jpg','hero-medical.jpg','hero-water.jpg','hero.jpg','inneeds_campaign_1.png','inneeds_campaign_2.png','inneeds_campaign_3.png','inneeds_campaign_4.png','inneeds_campaign_5.png','inneeds_campaign_6.png','inneeds_campaign_7.png','logo.png','next.svg','vercel.svg','window.svg'];
   function walk(d) {
     let files = [];
     for (const f of fs.readdirSync(d)) {
       if (f === 'node_modules' || f === '.next' || f === '.git' || f === '.agents') continue;
       const p = path.join(d, f);
       if (fs.statSync(p).isDirectory()) files = files.concat(walk(p));
       else files.push(p);
     }
     return files;
   }
   const allFiles = walk('.');
   const hits = {};
   for (const f of allFiles) {
     if (f.startsWith('public')) continue;
     const content = fs.readFileSync(f, 'utf8');
     for (const u of unused) {
       if (content.includes(u)) { (hits[u] = hits[u] || []).push(f); }
     }
   }
   console.log('Hits outside public/:', hits);
   "
   ```
   *Expected*: `Hits outside public/: {}` (Zero references).

3. **Verify `.animate-shimmer` has zero call sites in `src/`**:
   ```powershell
   Get-ChildItem -Path "src" -Recurse | Select-String -Pattern "animate-shimmer"
   ```
   *Expected*: Only declared in `src\app\globals.css`.

4. **Verify `HowItWorks.tsx:334` rogue syntax**:
   ```powershell
   Get-Content "src\components\HowItWorks.tsx" | Select-String -Pattern "``"
   ```
   *Expected*: Matches line 334.

5. **Verify full test suite and build stability**:
   ```powershell
   npx tsc --noEmit
   node tests/run-e2e.mjs
   ```
   *Expected*: `tsc` exits 0, all 96 E2E tests pass.
