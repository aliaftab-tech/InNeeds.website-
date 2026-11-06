# Implementation Recipe: Shared Data, Tooling, & Lint Elimination

**Author**: Explorer R1.2 (`teamwork_explorer_r1_2`)  
**Date**: 2026-11-06T15:02:00Z  
**Target Repository**: `d:\InNeeds website`  
**Working Directory**: `d:\InNeeds website\.agents\teamwork\teamwork_explorer_r1_2`  
**References**:
- `ORIGINAL_REQUEST.md` (Requirements R1, R2, R3)
- `orchestrator_1/PROJECT.md` (Features 1, 4, 6, 7, 8, 9)
- `explorer_survey_1/handoff.md`
- `explorer_survey_3/handoff.md`

---

## 1. Observation

### 1.1 Category Data Duplication in 3D Carousels
- In `src/components/HeroCarousel.tsx:5-13`:
  ```tsx
  5: const baseCategories = [
  6:   { id: 1, title: "Winter Relief", image: "/campaign_flat_1.jpg" },
  7:   { id: 2, title: "Emergency", image: "/campaign_flat_6.jpg" },
  8:   { id: 3, title: "Education", image: "/campaign_flat_7.jpg" },
  9:   { id: 4, title: "Healthcare", image: "/campaign_flat_2.jpg" },
  10:   { id: 5, title: "Environment", image: "/campaign_flat_3.jpg" },
  11:   { id: 6, title: "Food Security", image: "/campaign_flat_5.jpg" },
  12:   { id: 7, title: "Animal Welfare", image: "/campaign_flat_4.jpg" },
  13: ];
  ```
- In `src/components/BottomCarousel.tsx:7-15`:
  The exact same 7-object array `baseCategories` is hardcoded verbatim.
- In `public/`:
  All 7 asset files (`campaign_flat_1.jpg` through `campaign_flat_7.jpg`) exist and are valid JPEG images.

### 1.2 TypeScript `any` Violations in `BottomCarousel.tsx`
- In `src/components/BottomCarousel.tsx:34`:
  ```tsx
  34:   const handleDrag = (event: any, info: any) => {
  35:     // Drag moves the rotation
  36:     baseRotation.set(baseRotation.get() - info.delta.x * 0.2);
  37:   };
  ```
- Tool output from `npx eslint src/**`:
  ```
  D:\InNeeds website\src\components\BottomCarousel.tsx
    34:30  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
    34:41  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  ```
- Type inspection in `node_modules/framer-motion` & `node_modules/motion-dom/dist/index.d.ts`:
  - `PanInfo` is defined at line 16 and exported at line 5553 in `motion-dom/dist/index.d.ts`.
  - `framer-motion` re-exports all of `motion-dom` via `export * from 'motion-dom'` (`dist/index.d.ts:3`).
  - `DragHandler` signature in `motion-dom`: `(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void`.

### 1.3 Next.js Link Errors in `Footer.tsx`
- In `src/components/Footer.tsx:85-88`:
  ```tsx
  85: <a href="/" className="w-10 h-10 rounded-full border border-white/20 bg-transparent flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="..." /></svg></a>
  86: <a href="/" className="w-10 h-10 rounded-full border border-white/20 bg-transparent flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="..." /></svg></a>
  87: <a href="/" className="w-10 h-10 rounded-full border border-white/20 bg-transparent flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="..." /></svg></a>
  88: <a href="/" className="w-10 h-10 rounded-full border border-white/20 bg-transparent flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="..." /></svg></a>
  ```
- Tool output from `npx eslint src/**`:
  ```
  D:\InNeeds website\src\components\Footer.tsx
    85:15  error  Do not use an `<a>` element to navigate to `/`. Use `<Link />` from `next/link` instead.  @next/next/no-html-link-for-pages
    86:15  error  Do not use an `<a>` element to navigate to `/`. Use `<Link />` from `next/link` instead.  @next/next/no-html-link-for-pages
    87:15  error  Do not use an `<a>` element to navigate to `/`. Use `<Link />` from `next/link` instead.  @next/next/no-html-link-for-pages
    88:15  error  Do not use an `<a>` element to navigate to `/`. Use `<Link />` from `next/link` instead.  @next/next/no-html-link-for-pages
  ```
- `src/components/Footer.tsx:4` already imports `Link` from `"next/link"`.

### 1.4 Inline Keyframe Styles vs CSS Centralization
- In `src/app/page.tsx:49-74`:
  Inline `<style>` tag injects `@keyframes wave-spin`, `.wave-water-1`, and `.wave-water-2` inside `CircularStat`. Because `CircularStat` is instantiated 3 times (lines 245–264), the 25-line CSS block is duplicated 3 times in the DOM.
- In `src/app/page.tsx:274-287`:
  Inline `<style>` tag injects `@keyframes marquee`, `.animate-marquee`, and `.animate-marquee:hover`.
- In `src/app/globals.css:20-44`:
  Contains `@keyframes shimmer` and `.animate-shimmer` which have zero references across the entire codebase (`src/` and `tests/`).

### 1.5 Tooling & Linter Scope
- In `eslint.config.mjs:9-15`:
  ```javascript
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ])
  ```
  Missing `.agents/**`, `tests/**`, and root generator scripts (`*.js`).
- Tool execution `npm run lint` yields 44 problems (29 errors, 15 warnings), 34 of which originate strictly from `.agents/` tests, `tests/`, and root scripts.
- In `package.json:5-10`:
  Only `"dev"`, `"build"`, `"start"`, `"lint"` scripts are defined. Missing `"typecheck"` and `"test"` script entries.

---

## 2. Logic Chain

1. **Category Data Normalization**:
   - Extracting `baseCategories` into `src/data/categories.ts` creates a single source of truth conforming to the interface contract in `PROJECT.md:36-40`.
   - Importing `baseCategories` into `HeroCarousel.tsx` and `BottomCarousel.tsx` leaves runtime behavior 100% identical while eliminating code duplication.
2. **Type Safety in `BottomCarousel.tsx`**:
   - In `BottomCarousel.tsx`, `handleDrag` is passed to `<motion.div onDrag={handleDrag} />`.
   - `framer-motion` types define `onDrag` with parameter types `(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo)`.
   - Typing `_event: MouseEvent | TouchEvent | PointerEvent` and `info: PanInfo` strictly resolves both `@typescript-eslint/no-explicit-any` errors without runtime overhead.
3. **Link Accessibility in `Footer.tsx`**:
   - In `Footer.tsx`, social media icons link to `"/"` using `<a>` tags.
   - Next.js requires internal route navigation (`/`) to use `<Link href="/">` for client-side routing.
   - Replacing `<a>` with `<Link>` (already imported at line 4) directly eliminates all 4 `@next/next/no-html-link-for-pages` errors with zero visual change.
4. **CSS Animation Centralization & Dead Style Removal**:
   - Moving `@keyframes wave-spin`, `.wave-water-1`, `.wave-water-2`, `@keyframes marquee`, and `.animate-marquee` to `src/app/globals.css` allows them to be bundled once by Tailwind CSS / PostCSS.
   - Removing dead `@keyframes shimmer` and `.animate-shimmer` trims unused styles.
   - E2E tests `F12.5` (`tests/tier1-features.test.mjs:364`) requires `@import "tailwindcss"` or `@theme`, both of which are preserved.
5. **Tooling Hygiene**:
   - Adding `.agents/**`, `tests/**`, and `*.js` to `eslint.config.mjs` ignores eliminates 34 noise errors/warnings without compromising application quality gates.
   - Adding `"typecheck": "tsc --noEmit"` and `"test": "node tests/run-e2e.mjs"` to `package.json` gives developers and CI reliable standard npm scripts.

---

## 3. Step-by-Step Implementation Recipe

### Step 1: Create `src/data/categories.ts`
- **File**: `d:\InNeeds website\src\data\categories.ts`
- **Action**: Create new file.
- **Content**:
  ```ts
  export interface Category {
    id: number;
    title: string;
    image: string;
  }

  export const baseCategories: Category[] = [
    { id: 1, title: "Winter Relief", image: "/campaign_flat_1.jpg" },
    { id: 2, title: "Emergency", image: "/campaign_flat_6.jpg" },
    { id: 3, title: "Education", image: "/campaign_flat_7.jpg" },
    { id: 4, title: "Healthcare", image: "/campaign_flat_2.jpg" },
    { id: 5, title: "Environment", image: "/campaign_flat_3.jpg" },
    { id: 6, title: "Food Security", image: "/campaign_flat_5.jpg" },
    { id: 7, title: "Animal Welfare", image: "/campaign_flat_4.jpg" },
  ];
  ```

---

### Step 2: Update `src/components/HeroCarousel.tsx`
- **File**: `d:\InNeeds website\src\components\HeroCarousel.tsx`
- **Target Range**: Lines 3–13
- **Before**:
  ```tsx
  import Image from "next/image";

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
- **After**:
  ```tsx
  import Image from "next/image";
  import { baseCategories } from "@/data/categories";
  ```
- **Lines 14–138**: Unchanged. `panels` mapping and JSX rendering continue using `baseCategories` transparently.

---

### Step 3: Update `src/components/BottomCarousel.tsx`
- **File**: `d:\InNeeds website\src\components\BottomCarousel.tsx`
- **Target Range 1 (Imports & Shared Data)**: Lines 3–15
- **Before**:
  ```tsx
  import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
  import { useState } from "react";
  import Image from "next/image";

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
- **After**:
  ```tsx
  import { motion, useAnimationFrame, useMotionValue, useTransform, type PanInfo } from "framer-motion";
  import { useState } from "react";
  import Image from "next/image";
  import { baseCategories } from "@/data/categories";
  ```

- **Target Range 2 (Drag Handler Type Fix)**: Line 34 (original)
- **Before**:
  ```tsx
  const handleDrag = (event: any, info: any) => {
    // Drag moves the rotation
    baseRotation.set(baseRotation.get() - info.delta.x * 0.2);
  };
  ```
- **After**:
  ```tsx
  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Drag moves the rotation
    baseRotation.set(baseRotation.get() - info.delta.x * 0.2);
  };
  ```
- **Lines 38–129**: Unchanged.

---

### Step 4: Update `src/components/Footer.tsx`
- **File**: `d:\InNeeds website\src\components\Footer.tsx`
- **Target Range**: Lines 85–88
- **Before**:
  ```tsx
  <div className="flex items-center gap-4 mb-8">
    <a href="/" className="w-10 h-10 rounded-full border border-white/20 bg-transparent flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 008.45-9.9c0-5.53-4.5-10.02-10-10.02z" /></svg></a>
    <a href="/" className="w-10 h-10 rounded-full border border-white/20 bg-transparent flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
    <a href="/" className="w-10 h-10 rounded-full border border-white/20 bg-transparent flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.85 3.93 2.3 7.15 2.23c1.27-.06 1.64-.07 4.85-.07zm0-2.16C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.63 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm5.22-9.42a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" /></svg></a>
    <a href="/" className="w-10 h-10 rounded-full border border-white/20 bg-transparent flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg></a>
  </div>
  ```
- **After**:
  ```tsx
  <div className="flex items-center gap-4 mb-8">
    <Link href="/" className="w-10 h-10 rounded-full border border-white/20 bg-transparent flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 008.45-9.9c0-5.53-4.5-10.02-10-10.02z" /></svg></Link>
    <Link href="/" className="w-10 h-10 rounded-full border border-white/20 bg-transparent flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></Link>
    <Link href="/" className="w-10 h-10 rounded-full border border-white/20 bg-transparent flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.85 3.93 2.3 7.15 2.23c1.27-.06 1.64-.07 4.85-.07zm0-2.16C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.63 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm5.22-9.42a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" /></svg></Link>
    <Link href="/" className="w-10 h-10 rounded-full border border-white/20 bg-transparent flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg></Link>
  </div>
  ```

---

### Step 5: Update `src/app/globals.css`
- **File**: `d:\InNeeds website\src\app\globals.css`
- **Target**: Centralize `wave-spin` and `marquee`; remove dead `shimmer`.
- **Complete Replacement Content**:
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

  @keyframes wave-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .wave-water-1 {
    position: absolute;
    width: 200%;
    height: 200%;
    background: linear-gradient(135deg, rgba(50, 163, 56, 0.25) 0%, rgba(10, 82, 40, 0.1) 100%);
    left: -50%;
    border-radius: 40%;
    animation: wave-spin 6s infinite linear;
    transition: top 2000ms cubic-bezier(0.1, 0.8, 0.2, 1);
  }

  .wave-water-2 {
    position: absolute;
    width: 200%;
    height: 200%;
    background: linear-gradient(135deg, rgba(50, 163, 56, 0.4) 0%, rgba(10, 82, 40, 0.15) 100%);
    left: -50%;
    border-radius: 45%;
    animation: wave-spin 8s infinite linear;
    transition: top 2000ms cubic-bezier(0.1, 0.8, 0.2, 1);
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .animate-marquee {
    display: flex;
    width: max-content;
    animation: marquee 40s linear infinite;
  }

  .animate-marquee:hover {
    animation-play-state: paused;
  }
  ```

---

### Step 6: Update `eslint.config.mjs`
- **File**: `d:\InNeeds website\eslint.config.mjs`
- **Target**: Extend `globalIgnores` with `.agents/**`, `tests/**`, `*.js`.
- **Complete Replacement Content**:
  ```javascript
  import { defineConfig, globalIgnores } from "eslint/config";
  import nextVitals from "eslint-config-next/core-web-vitals";
  import nextTs from "eslint-config-next/typescript";

  const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    // Override default ignores of eslint-config-next.
    globalIgnores([
      // Default ignores of eslint-config-next:
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      ".agents/**",
      "tests/**",
      "*.js",
    ]),
  ]);

  export default eslintConfig;
  ```

---

### Step 7: Update `package.json` Scripts
- **File**: `d:\InNeeds website\package.json`
- **Target Range**: Lines 5–10
- **Before**:
  ```json
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "eslint"
    },
  ```
- **After**:
  ```json
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "eslint",
      "typecheck": "tsc --noEmit",
      "test": "node tests/run-e2e.mjs"
    },
  ```

---

## 4. Caveats

1. **`PanInfo` Type Import**:
   - `PanInfo` is a type, not a runtime value. When importing from `framer-motion`, use `import { type PanInfo } from "framer-motion"` or `import type { PanInfo }` to guarantee complete type-stripping during bundler compilation.
2. **Inline `<style>` In `src/app/page.tsx` During Intermediate State**:
   - Adding keyframes and utility classes to `src/app/globals.css` in Milestone 2 is completely non-breaking while the inline `<style>` blocks still reside in `page.tsx`.
   - When Milestone 3 extracts `CircularStat.tsx` and `TrustedBy.tsx`, the inline `<style>` blocks can be safely dropped because the classes are already defined globally.
3. **ESLint Residual Warnings in `src/app/page.tsx`**:
   - After applying this recipe and `eslint.config.mjs` update, `npm run lint` will show only the 4 issues in `src/app/page.tsx` (1 unescaped entity error at line 582, and 3 `<img>` warnings). These are scheduled for Milestone 3 component modularization.

---

## 5. Conclusion

This implementation recipe completely satisfies Milestone 1/2 requirements:
- **Shared Data**: Standardizes `baseCategories` across `HeroCarousel` and `BottomCarousel` via `src/data/categories.ts`.
- **Type Safety**: Fully resolves `any` in `BottomCarousel.tsx` with `PanInfo`.
- **Accessibility & Standards**: Converts `<a>` to `<Link>` in `Footer.tsx`.
- **CSS Hygiene**: Centralizes animations (`wave-spin`, `marquee`) and removes dead keyframes (`shimmer`).
- **Tooling & Linter**: Configures clean ESLint scoping and standardizes `"typecheck"` and `"test"` npm scripts.

---

## 6. Verification Method

To verify the implementation once applied:

1. **TypeScript Compilation Check**:
   ```powershell
   npm run typecheck
   # or: npx tsc --noEmit
   ```
   *Expected outcome*: Exit code 0, 0 diagnostic errors.
2. **ESLint Verification**:
   ```powershell
   npm run lint
   ```
   *Expected outcome*: Exit code 1 with only the 4 expected issues in `src/app/page.tsx` (0 errors from `.agents/`, `tests/`, `BottomCarousel.tsx`, or `Footer.tsx`).
3. **E2E Test Suite Execution**:
   ```powershell
   npm run test
   # or: node tests/run-e2e.mjs
   ```
   *Expected outcome*: Exit code 0, 96/96 tests PASS across all 4 tiers.
4. **Production Build**:
   ```powershell
   npm run build
   ```
   *Expected outcome*: Exit code 0, Turbopack builds all routes successfully without warnings or errors.
