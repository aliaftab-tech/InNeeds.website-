# Handoff Report — Route Mapping & App Router Survey (R1)

## 1. Observation

### 1.1 Router Architecture & Directory Structure
- Project uses **Next.js 16.3.6** with React 19.2.8 and Tailwind CSS v4 (`package.json:16,17,28`).
- Directory check confirms Next.js **App Router** is located at `d:\InNeeds website\src\app`.
  - `Test-Path app` returned `False`.
  - `Test-Path pages, src\pages` returned `False`, `False`.
  - Root route directory is `src/app`.

### 1.2 Route and Layout Inventory
Running `Get-ChildItem -Path src\app -Recurse` and `npm run build` confirms:
- **Root Layout**: `src/app/layout.tsx` (lines 16-29) defines `RootLayout`, wrapping `<html>`, `<body className="${inter.variable} font-sans antialiased">`, `{children}`, and `<Footer />`.
- **Root Page**: `src/app/page.tsx` (lines 1-639) defines `"use client"` homepage (`/`).
- **Static Route Handlers**:
  - `src/app/apple-icon.png` (Static `/apple-icon.png`)
  - `src/app/icon.png` (Static `/icon.png`)
- **Nested Routes / Route Groups**: None exist. There are no subdirectories inside `src/app/`.
- Verbatim `next build` route table:
  ```
  Route (app)
  ┌ ○ /
  ├ ○ /_not-found
  ├ ○ /apple-icon.png
  └ ○ /icon.png

  ○ (Static) prerendered as static content
  ```

### 1.3 Navigational Links to Unimplemented Routes
Search for `href` across `src/` revealed several internal links pointing to prospective routes:
- `/campaigns` (`src/app/page.tsx:122,186,538,619`)
- `/categories` (`src/app/page.tsx:324`)
- `/signin` (`src/app/page.tsx:150`)
- `/apply` (`src/app/page.tsx:570`)
- `/partner` (`src/app/page.tsx:628`)
Currently, none of these 5 routes have corresponding folder structures or `page.tsx` files. Navigating to them resolves to `/_not-found`.

### 1.4 Loading States & Suspense Audit
- `Get-ChildItem -Path src -Filter "loading.*" -Recurse` returned **empty** (no `loading.tsx` exists).
- `Select-String -Path "src\**\*.tsx" -Pattern 'Suspense'` returned **empty** (no React `Suspense` boundaries exist).

### 1.5 Server vs. Client Components & Data Fetching
- `src/app/layout.tsx`: **Server Component** (RSC). Synchronous layout. Imports `<Footer />` from `@/components/Footer`.
- `src/app/page.tsx`: **Client Component** (`"use client"` on line 1). Uses `useState`, `useEffect`, `useRef`.
- `src/components/HeroCarousel.tsx`: **Client Component** (`"use client"`).
- `src/components/BottomCarousel.tsx`: **Client Component** (`"use client"`). Uses `framer-motion` hooks.
- `src/components/HowItWorks.tsx`: **Client Component** (`"use client"`).
- `src/components/Footer.tsx`: **Client Component** (`"use client"`).
- **Data Fetching**: Zero asynchronous data fetches (`fetch()`, database queries, or server actions) exist in the project. All data (categories, statistics, campaign cards) is hardcoded into frontend constants.

### 1.6 Structural Breakdown of Main Page Sections
Inspection of `src/app/page.tsx` (lines 108-638) reveals 8 discrete visual sections:
1. **Navbar** (`lines 110-170`): Sticky top navigation bar with mobile search/menu, desktop links, center logo, and "Sign In" button. *(Crucial: Rendered inside `page.tsx`, NOT inside `layout.tsx`)*.
2. **Hero Section** (`lines 173-224`): Radial glow background, 2-line headline, pill CTA button, 3D curved carousel (`<HeroCarousel />` with 7 cards on desktop, 4 on mobile), and 3-column features bar.
3. **Trust & Impact Banner** (`lines 227-265`): Dark forest green background (`bg-[#0b291a]`), "100% VERIFIED CAUSES" pill badge, large headline, subtitle, and 3 circular animated counter circles (`CircularStat`).
4. **Trusted By Marquee** (`lines 269-310`): Header label and horizontal scrolling logo strip with 5 organization marks.
5. **How It Works** (`lines 313` & `src/components/HowItWorks.tsx:13-348`): Top SVG arch dome divider, 5 floating circular badges, header text, and 3 horizontal step blocks with mockup cards.
6. **Categories of Impact** (`lines 315-332` & `src/components/BottomCarousel.tsx`): Section header, "Choose Your Impact" CTA, and 3D cylindrical rotating Coverflow carousel (14 cards).
7. **Featured Campaigns** (`lines 335-543`): Section title, filter dropdown, left/right navigation arrows, and asymmetric 4-card grid (2 wide cards, 2 square cards) with progress bars and donation statistics.
8. **Bottom Showcase Cards** (`lines 547-635`): 5-column asymmetric container (Far-left stack, Left tall card, Center play-button card, Right tall card, Far-right stack).
9. **Footer** (`src/components/Footer.tsx`): Rendered in `RootLayout` (`src/app/layout.tsx:25`) below `{children}`.

---

## 2. Logic Chain

1. **Routing Framework Determination**:
   - Because `src/app/` contains `layout.tsx` and `page.tsx`, and no `pages/` or `src/pages/` directories exist, the application strictly adheres to the Next.js App Router standard (Observation 1.1 & 1.2).
2. **Route Hierarchy & Inheritance**:
   - Next.js App Router convention dictates that a `loading.tsx` file placed in an App Router segment wraps the child `page.tsx` inside a React `<Suspense fallback={<Loading />}>` boundary within that segment's `layout.tsx`.
   - Because `src/app/` has only one existing route (`/`), creating `src/app/loading.tsx` directly satisfies the root route loading state requirement.
   - Any prospective child routes (e.g. `/campaigns`) will inherit `src/app/loading.tsx` by default unless overridden by their own `loading.tsx`.
3. **Navbar Placement Implication**:
   - The top navigation bar is coded inside `src/app/page.tsx:110-170`, not in `src/app/layout.tsx`.
   - Therefore, during a route-level loading state, `{children}` is replaced by `<Loading />`. If `<Loading />` does not include a navbar skeleton, the viewport top would be blank during load.
   - Thus, `loading.tsx` must include a top Navbar skeleton placeholder matching `page.tsx`'s navbar dimensions (`h-[73px]` approx, max-w-[1700px]) to prevent layout shifts (CLS).
4. **Footer Persistence Implication**:
   - `<Footer />` is rendered inside `src/app/layout.tsx:25` after `{children}`.
   - Therefore, while `src/app/loading.tsx` is displayed as the `{children}` fallback, `<Footer />` remains rendered below it.
   - Consequently, `loading.tsx` does NOT need to skeletonize the footer, as the actual footer is already in the DOM.
5. **Styling and Theme Integration**:
   - The project uses Tailwind CSS v4 (`src/app/globals.css:1`).
   - The color scheme comprises white/slate surfaces with emerald/forest-green accents (`#0a5228`, `#32a338`, `#0b291a`, `#c0f058`).
   - Skeletons on white sections must use `bg-slate-200` / `bg-slate-100` with `animate-pulse`.
   - Skeletons on the dark Trust & Impact section (`bg-[#0b291a]`) must use `bg-white/10` or `bg-emerald-900/40` with `animate-pulse` to maintain visual continuity.

---

## 3. Caveats

1. **Pre-existing ESLint Errors**:
   - Running `npm run lint` reported 11 pre-existing errors in `generate_icon.js`, `generate_rounded_favicon.js`, `page.tsx` (unescaped apostrophe on line 582), `BottomCarousel.tsx` (explicit `any`), and `Footer.tsx` (`<a>` instead of `<Link>`).
   - However, `npm run build` succeeds cleanly with exit code 0 and 0 TypeScript errors. Any new files created (such as `loading.tsx` and skeleton components) must maintain 100% clean TypeScript and ESLint standards so they do not add to existing warnings.
2. **Absence of Real Asynchronous Delays**:
   - Currently, `src/app/page.tsx` is fully static and client-side with no async promises. In Next.js SSG, the page renders immediately unless client transitions or artificial delays occur.
   - Next.js route-level `loading.tsx` will be bundled, statically prerendered, and ready to trigger on any navigation transition or when async boundaries/streaming are introduced.
3. **Unimplemented Prospective Subroutes**:
   - Navigation links exist to `/campaigns`, `/categories`, `/signin`, `/apply`, `/partner`.
   - If downstream tasks choose to create these pages, each can either inherit `src/app/loading.tsx` or have a dedicated `loading.tsx` inside its respective folder.

---

## 4. Conclusion

1. **Router Architecture**: Next.js 16.3.6 App Router under `src/app/`.
2. **Current Routes**: Exactly one active route: `/` (`src/app/page.tsx`), plus static metadata icon routes (`/apple-icon.png`, `/icon.png`).
3. **Existing Loading States**: None exist (0 `loading.tsx` files, 0 `Suspense` tags).
4. **Exact Location for Route-Level Loading State**:
   - **`src/app/loading.tsx`** must be created to provide the root route skeleton fallback for `/`.
5. **Main Section Skeleton Components Needed**:
   To satisfy R1 and R2, `src/app/loading.tsx` (or modular components in `src/components/skeletons/`) must provide pulse/shimmer skeletons for the 8 main sections of `src/app/page.tsx`:
   1. `NavbarSkeleton`: sticky top bar with logo, links, and search/sign-in placeholders.
   2. `HeroSkeleton`: headline, CTA pill, 3D curved carousel card placeholders, and 3-column features bar.
   3. `TrustImpactSkeleton`: dark green container (`bg-[#0b291a]`) with badge, headline, and 3 circular stat rings (`rounded-full`).
   4. `TrustedBySkeleton`: marquee strip with 5 logo placeholders.
   5. `HowItWorksSkeleton`: arch dome divider, circular badges, and 3 step card containers.
   6. `CategoriesSkeleton`: title, CTA, and carousel card silhouette.
   7. `CampaignsSkeleton`: filter dropdown, arrows, and 4 asymmetric campaign cards with progress bar placeholders.
   8. `BottomCardsSkeleton`: 5 asymmetric card stack layout.

---

## 5. Verification Method

1. **Filesystem Route Verification**:
   - Check directory: `Get-ChildItem -Path "src\app"` to inspect `layout.tsx`, `page.tsx`, and verify `loading.tsx`.
2. **Build Verification**:
   - Run `npm run build` from `d:\InNeeds website`.
   - Verify that Next.js registers `src/app/loading.tsx` without build or TypeScript errors.
3. **Route Loading Verification**:
   - Run `npm run dev` and navigate to `http://localhost:3000`.
   - In browser developer tools, enable network throttling (e.g. Slow 4G) or inspect the exported `loading.tsx` component in Next.js React DevTools to verify that the skeleton layout matches the exact visual structure of the home page sections with Tailwind `animate-pulse`.
