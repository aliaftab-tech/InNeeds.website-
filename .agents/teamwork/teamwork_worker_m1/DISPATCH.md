## 2026-11-06T11:30:42Z
You are teamwork_worker_m1.
Your working directory is: d:\InNeeds website\.agents\teamwork\teamwork_worker_m1\

MANDATORY FIRST STEP:
Read the user request file at:
d:\InNeeds website\.agents\teamwork\ORIGINAL_REQUEST.md

Read the project specification at:
d:\InNeeds website\.agents\teamwork\orchestrator\PROJECT.md

Read the explorer findings at:
- d:\InNeeds website\.agents\teamwork\teamwork_explorer_survey_1\handoff.md
- d:\InNeeds website\.agents\teamwork\teamwork_explorer_survey_2\handoff.md
- d:\InNeeds website\.agents\teamwork\teamwork_explorer_survey_3\handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

EXCLUSIVE FILE OWNERSHIP:
You exclusively own and may create/edit these files:
- src/components/ui/skeleton.tsx
- src/components/skeletons/NavbarSkeleton.tsx
- src/components/skeletons/HeroSectionSkeleton.tsx
- src/components/skeletons/TrustImpactSkeleton.tsx
- src/components/skeletons/TrustedBySkeleton.tsx
- src/components/skeletons/HowItWorksSkeleton.tsx
- src/components/skeletons/CategoriesSkeleton.tsx
- src/components/skeletons/CampaignsGridSkeleton.tsx
- src/components/skeletons/ShowcaseBentoSkeleton.tsx
- src/components/skeletons/FooterSkeleton.tsx
- src/components/skeletons/index.ts
- src/app/loading.tsx
- src/app/globals.css (only if adding shimmer keyframe animation)
DO NOT touch any other files without explicit need.

TASK SPECIFICATIONS:
1. Base Skeleton Primitive:
   Create `src/components/ui/skeleton.tsx` using `cn()` from `@/lib/utils`.
   Support `variant="light" | "dark" | "card"`:
   - "light": `bg-slate-200/80` with pulse/shimmer
   - "dark": `bg-white/10` with border `border-white/10`
   - "card": `bg-slate-100 border border-slate-200/60`
   Ensure `animate-pulse` and/or shimmer effects are supported.
2. Section Skeletons:
   Implement each section skeleton in `src/components/skeletons/` matching the exact visual structure, dimensions, and grid column spans documented in `handoff.md` of survey explorer 2:
   - `NavbarSkeleton.tsx`: Sticky top, h-[72px], left links, center logo+brand, right links & Sign In pill button.
   - `HeroSectionSkeleton.tsx`: Centered 2-line title, CTA pill button, curved carousel card silhouettes, 3-column feature strip.
   - `TrustImpactSkeleton.tsx`: Dark green `bg-[#0b291a]`, pill badge, headline, 3 circular stat dial rings (`w-24 h-24 md:w-40 md:h-40 rounded-full bg-white/10 border-2 border-white/20`) with labels below.
   - `TrustedBySkeleton.tsx`: Caption bar, 5 logo placeholders with gradient masks.
   - `HowItWorksSkeleton.tsx`: Light sage `bg-[#f6f9f6]`, top arch divider, 3 step grid rows (step number badge, title, description on left; mockup card on right).
   - `CategoriesSkeleton.tsx`: Badge, headline, CTA button, card strip silhouette.
   - `CampaignsGridSkeleton.tsx`: Title, filter dropdown pill, navigation buttons, asymmetric 4-card bento grid (2 wide `md:col-span-2`, 2 square `md:col-span-1`) with progress bars.
   - `ShowcaseBentoSkeleton.tsx`: 5-column cluster (far-left stack, left tall, center video card with play button, right tall, far-right stack) with asymmetric corner radiuses (`rounded-tr-[4rem]`, `rounded-tl-[4rem]`).
   - `FooterSkeleton.tsx`: Dark `#0b291a`, newsletter form, 5 columns of link lists, bottom bar.
   - `index.ts`: Export all skeletons cleanly.
3. Route-Level loading.tsx:
   Implement `src/app/loading.tsx` to compose the full page skeleton:
   - Renders `NavbarSkeleton` at top (since `<nav>` is inside `page.tsx`).
   - Renders `HeroSectionSkeleton`, `TrustImpactSkeleton`, etc.
   - Does NOT render `FooterSkeleton` because `src/app/layout.tsx` already renders `<Footer />` below `{children}`!
4. Theme and Animation:
   Ensure Tailwind `animate-pulse` or shimmer animation is active on all skeleton elements.
   Ensure dark sections use `bg-white/10` and light sections use `bg-slate-200/80`.
5. Build Verification:
   Run `npx tsc --noEmit` and `npm run build` and ensure exit code 0 with zero errors.

OUTPUT:
- Write progress to: d:\InNeeds website\.agents\teamwork\teamwork_worker_m1\progress.md
- Write final handoff report to: d:\InNeeds website\.agents\teamwork\teamwork_worker_m1\handoff.md
  Document exact build commands, outputs, files changed, and verification proof.
- Send completion message to orchestrator when finished.
