# Project: InNeeds Website Full-Repository Refactoring & Clean-Up

## Architecture
- Framework: Next.js 16.3.6 (Turbopack, App Router), React 19.2.8, TypeScript 5, Tailwind CSS v4.
- Target Root: `d:\InNeeds website`
- Routing: Single landing page at `src/app/page.tsx`, global layout at `src/app/layout.tsx`, loading suspense at `src/app/loading.tsx`.
- Component Hierarchy: `src/components/` (interactive 3D carousels, section components, skeleton loading states, UI primitives).
- Test Infrastructure: Dual-track 4-tier E2E suite at `tests/run-e2e.mjs` (96 tests covering feature contracts, boundaries, cross-feature interactions, and real-world scenarios).

## Feature Inventory
| # | Feature / Work Item | Description | Milestone | Source |
|---|---------------------|-------------|-----------|--------|
| 1 | Unused NPM Dependency Removal | Remove `gsap` (^3.15.0) from `package.json` (0 references in codebase) | M1 | explorer_survey_2 |
| 2 | Obsolete Root Files Removal | Delete `generate_icon.js`, `generate_rounded_favicon.js`, `InNeeds logo.png`, `InNeeds website favicon.png` (1.59 MB dead files) | M1 | explorer_survey_1, 2 |
| 3 | Unreferenced Public Assets Pruning | Delete 28 unreferenced static files in `public/` (12.62 MB dead assets) | M1 | explorer_survey_2 |
| 4 | Dead CSS Keyframes Removal | Remove unused `@keyframes shimmer` and `.animate-shimmer` from `src/app/globals.css` | M1 | explorer_survey_2 |
| 5 | Rogue Syntax & Dead Reads Cleanup | Remove ` `` ` backticks in `HowItWorks.tsx:334`, duplicate comment in `page.tsx:267`, unused `barrelContent` in `tests/tier3-interactions.test.mjs:58` | M1 | explorer_survey_2, 3 |
| 6 | Shared Category Data Extraction | Create `src/data/categories.ts` and replace duplicate `baseCategories` arrays in `HeroCarousel.tsx` and `BottomCarousel.tsx` | M2 | explorer_survey_2, 3 |
| 7 | TypeScript & ESLint Fixes in Existing Components | Fix `any` types in `BottomCarousel.tsx:34` (`PanInfo`), fix `<a href="/">` to `<Link>` in `Footer.tsx:85-88` | M2 | explorer_survey_1, 3 |
| 8 | Global CSS Animation Centralization | Move `@keyframes wave-spin` and `@keyframes marquee` into `src/app/globals.css` to prevent inline `<style>` DOM reinjection | M2 | explorer_survey_3 |
| 9 | Tooling & Linter Configuration | Add `.agents/**`, `tests/**`, root generator scripts to `globalIgnores` in `eslint.config.mjs`; add `"typecheck"` and `"test"` scripts to `package.json` | M2 | explorer_survey_1, 3 |
| 10 | Section Component Extraction | Modularize monolithic `src/app/page.tsx` into 1:1 symmetrical section components: `Navbar.tsx`, `HeroSection.tsx`, `TrustImpact.tsx` (with `CircularStat.tsx`), `TrustedBy.tsx`, `CategoriesSection.tsx`, `CampaignsGrid.tsx`, `ShowcaseBento.tsx` | M3 | explorer_survey_3 |
| 11 | Semantic Image & Entity Fixes in Showcase | In `ShowcaseBento.tsx`, replace raw `<img>` tags with `<Image fill sizes="..." />` and escape apostrophe in `child's` to `child&apos;s` | M3 | explorer_survey_1, 3 |
| 12 | Clean Page Assembly | Reassemble `src/app/page.tsx` cleanly under 50 lines while strictly maintaining `max-w-[1700px]`, `max-w-[1600px]`, and all UI Invariants I-1 through I-9 | M3 | explorer_survey_3 |
| 13 | Final Verification & Quality Gates | Execute `npm run build`, `npx tsc --noEmit`, `npm run lint` (0 errors, 0 warnings), `node tests/run-e2e.mjs` (96/96 pass), reviewer check, challenger check, and forensic audit | M4 | orchestrator |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Dead Code & Asset Elimination | Remove `gsap`, 4 root files, 28 public assets, dead CSS shimmer, rogue syntax | none | DONE |
| M2 | Code Quality, Shared Data & ESLint Standards | Extract `categories.ts`, fix Carousel types, fix Footer Links, move keyframes to globals.css, update eslint config & package scripts | M1 | DONE |
| M3 | Page Modularization & Component Architecture | Extract sections from `page.tsx` to modular components matching skeletons, fix Next Image & apostrophe, clean page.tsx | M2 | DONE |
| M4 | Final Regression Prevention & Integrity Audit | Full build, typecheck, lint, 96-test E2E execution, Reviewer, Challenger, and Forensic Auditor verification | M3 | DONE |

## Interface Contracts & Invariants
### Categories Data Contract
- File: `src/data/categories.ts`
- Export: `export interface Category { id: number; title: string; image: string; }`
- Export: `export const baseCategories: Category[] = [...]`

### UI Invariants (Strict Zero Visual Regression)
- **I-1 Navbar**: `max-w-[1700px]`, `px-6 py-4 lg:px-12`, `sticky top-0 z-50`. Scrolled: `bg-white/90 backdrop-blur-lg border-b border-slate-100 shadow-sm`. Logo: `In` `#0a5228`, `Needs` `#32a338`. Button: `rounded-full border-2 border-[#0a5228]`.
- **I-2 Hero**: Glow `bg-[radial-gradient(ellipse_at_center,_#E9F7EC_0%,_transparent_70%)]`. Headline `text-[#0f172a] font-[800]`. Features bar: 3-column divider strip.
- **I-3 Trust & Impact**: Background `bg-[#0b291a]`. Badge: `bg-white/10 text-emerald-100 border border-white/10 rounded-sm`. Container `max-w-[1200px]`. Stat dials: 1:1 aspect ratio (`w-24 h-24 md:w-40 md:h-40`), `rounded-full bg-white border-2 border-white`. Stats: `100%`, `24+`, `$100k`.
- **I-4 Trusted By Marquee**: Container `max-w-[1600px]`, `py-16 bg-white overflow-hidden relative border-t border-slate-100`. 40s linear infinite animation, pause on hover.
- **I-5 How It Works**: Container `bg-[#f6f9f6] border-b border-[#e2eae3]`, section ID `id="how-it-works"`. Top SVG dome arch divider. 5 rotated badges. 3 steps with numbers `01`, `02`, `03` in `bg-[#22c55e]`.
- **I-6 Categories**: Container `py-24 bg-white border-t border-slate-100 overflow-x-clip`, section ID `id="categories"`, `max-w-[1600px]`. 3D Coverflow drag carousel (14 cards).
- **I-7 Campaigns Bento**: Container `py-24 bg-white`, section ID `id="campaigns"`, `max-w-[1600px]`. Grid: `grid grid-cols-1 md:grid-cols-3 gap-6`. Cards `rounded-[28px]` or `rounded-3xl`. Card 1 & 4 `md:col-span-2`, Card 2 & 3 `md:col-span-1`.
- **I-8 Showcase Bento**: Container `max-w-[1800px]`. 5 Columns with asymmetric corner radii: Col 1 `rounded-tr-[4rem]`, Col 2 `rounded-tl-[4rem] aspect-[9/12]`, Col 3 `rounded-[3rem] aspect-[1/1.05]`, Col 4 `rounded-tl-[4rem] aspect-[9/12]`, Col 5 `rounded-tl-[4rem]`.
- **I-9 Footer**: Background `bg-[#0b291a] text-white pt-16 pb-8 border-t border-white/10`. Rendered in `layout.tsx` below `{children}`. Strictly not in `loading.tsx`.

## Code Layout
- `src/app/page.tsx`: Clean root page assembling sections.
- `src/components/`:
  - `Navbar.tsx` (extracted)
  - `HeroSection.tsx` (extracted)
  - `HeroCarousel.tsx` (existing, updated to use shared categories)
  - `TrustImpact.tsx` (extracted)
  - `CircularStat.tsx` (extracted)
  - `TrustedBy.tsx` (extracted)
  - `HowItWorks.tsx` (existing, syntax cleaned)
  - `CategoriesSection.tsx` (extracted)
  - `BottomCarousel.tsx` (existing, updated to use shared categories & typed)
  - `CampaignsGrid.tsx` (extracted)
  - `ShowcaseBento.tsx` (extracted, images & entities fixed)
  - `Footer.tsx` (existing, `<Link>` navigation fixed)
  - `skeletons/`: 9 skeletons + `index.ts` barrel export (PRESERVED)
  - `ui/skeleton.tsx`: Base primitive (PRESERVED)
- `src/data/categories.ts`: Shared category data.
- `src/app/globals.css`: Tailwind v4 import, keyframes (`floatCard`, `wave-spin`, `marquee`).
- `tests/`: 4-tier E2E suite (PRESERVED & PASSING).
