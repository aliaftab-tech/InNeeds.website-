# Project: InNeeds Skeleton Loading UI

## Architecture
- **Framework**: Next.js 16.3.6 (App Router with Turbopack), React 19.2.8.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`, dual-tone sectional theme (light sections `bg-white`/`bg-[#f6f9f6]`, dark emerald sections `bg-[#0b291a]`).
- **Layout Architecture**:
  - `src/app/layout.tsx` (RSC) wraps `{children}` followed by `<Footer />`.
  - `<nav>` is rendered inside `src/app/page.tsx` (Client Component).
  - Route-level `loading.tsx` (`src/app/loading.tsx`) serves as the automatic Next.js App Router Suspense boundary fallback for `{children}` during route transitions.
  - Skeletons are organized in `src/components/skeletons/` with a base primitive in `src/components/ui/skeleton.tsx` (or `src/components/skeletons/Skeleton.tsx`).

## Code Layout
- `src/components/ui/skeleton.tsx`: Base reusable `Skeleton` primitive with `variant="light" | "dark" | "card"` and Tailwind `animate-pulse` / shimmer support.
- `src/components/skeletons/NavbarSkeleton.tsx`: Top navigation bar skeleton.
- `src/components/skeletons/HeroSectionSkeleton.tsx`: Hero section & 3D carousel skeleton.
- `src/components/skeletons/TrustImpactSkeleton.tsx`: Dark emerald Trust & Impact circular stat skeleton.
- `src/components/skeletons/TrustedBySkeleton.tsx`: Trusted By marquee skeleton.
- `src/components/skeletons/HowItWorksSkeleton.tsx`: Sage background 3-step guide skeleton with top arch.
- `src/components/skeletons/CategoriesSkeleton.tsx`: Categories of Impact carousel skeleton.
- `src/components/skeletons/CampaignsGridSkeleton.tsx`: Asymmetric 4-card bento grid skeleton.
- `src/components/skeletons/ShowcaseBentoSkeleton.tsx`: 5-column showcase bento cluster skeleton.
- `src/components/skeletons/FooterSkeleton.tsx`: Standalone footer skeleton.
- `src/components/skeletons/index.ts`: Central barrel export for all skeleton components.
- `src/app/loading.tsx`: Route-level Next.js loading UI composing the section skeletons.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Base Skeleton Primitive | Reusable `Skeleton` component with variants (`light`, `dark`, `card`) and pulse/shimmer animation | M1 | Survey (Explorer 3) |
| F2 | Navbar Skeleton | Sticky header navigation skeleton with links, center logo+brand, and Sign In pill | M1 | Survey (Explorer 1 & 2) |
| F3 | Hero Section Skeleton | Centered 2-line title, CTA pill button, carousel arc silhouettes, and 3 feature columns | M1 | Survey (Explorer 2) |
| F4 | Trust & Impact Skeleton | Dark forest green (`bg-[#0b291a]`) container, badge, headline, and 3 circular stat dials | M1 | Survey (Explorer 2 & 3) |
| F5 | Trusted By Marquee Skeleton | Caption bar and 5 logo placeholders with gradient masks | M1 | Survey (Explorer 2) |
| F6 | How It Works Skeleton | Light sage (`bg-[#f6f9f6]`), top arch divider, floating badge stamps, and 3-step grid rows | M1 | Survey (Explorer 2) |
| F7 | Categories Skeleton | Badge, headline, CTA button, and 3D cylinder card strip silhouette | M1 | Survey (Explorer 2) |
| F8 | Campaigns Bento Grid Skeleton | Section header, filter dropdown, circle nav buttons, and 4-card asymmetric bento grid | M1 | Survey (Explorer 2) |
| F9 | Showcase Bento Strip Skeleton | 5-column cluster (far-left stack, 2 tall boxes, center box with play button, far-right stack) | M1 | Survey (Explorer 2) |
| F10 | Standalone Footer Skeleton | Dark `#0b291a` background, newsletter row, 5 link columns, bottom copyright/payment bar | M1 | Survey (Explorer 2) |
| F11 | Route-Level loading.tsx | Next.js App Router root loading fallback integrating section skeletons with zero CLS | M2 | Survey (Explorer 1 & 2) |
| F12 | Theme & Animation Integration | Dual-tone color matching (light `bg-slate-200/80`, dark `bg-white/10`) and pulse/shimmer animation | M1 & M2 | Survey (Explorer 3) |
| F13 | Build & TypeScript Integrity | Zero TypeScript errors, zero build regressions (`npm run build` succeeds) | M1, M2, M3 | Survey (Explorer 3) |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Modular Skeleton Library | Build base Skeleton primitive & all 9 section skeleton components (F1-F10, F12) | none | DONE |
| M2 | Route-Level loading.tsx Integration | Implement `src/app/loading.tsx` composing section skeletons with zero CLS (F11, F12, F13) | M1 | DONE |
| M3 | E2E Testing & Integrity Verification | Dual-track comprehensive test suite (Tiers 1-5) and forensic integrity audit | M1, M2 | DONE |

## Interface Contracts
### Skeleton Primitive (`src/components/ui/skeleton.tsx`)
```tsx
import { type HTMLAttributes } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark" | "card";
}
export function Skeleton(props: SkeletonProps): JSX.Element;
```

### Section Skeletons (`src/components/skeletons/index.ts`)
```tsx
export function NavbarSkeleton(): JSX.Element;
export function HeroSectionSkeleton(): JSX.Element;
export function TrustImpactSkeleton(): JSX.Element;
export function TrustedBySkeleton(): JSX.Element;
export function HowItWorksSkeleton(): JSX.Element;
export function CategoriesSkeleton(): JSX.Element;
export function CampaignsGridSkeleton(): JSX.Element;
export function ShowcaseBentoSkeleton(): JSX.Element;
export function FooterSkeleton(): JSX.Element;
```

### Route Loading Component (`src/app/loading.tsx`)
```tsx
export default function Loading(): JSX.Element;
```
