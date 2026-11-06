# Comprehensive Route Mapping & Survey Analysis (R1)

## 1. Project Router Architecture
- **Framework**: Next.js 16.3.6 with React 19.2.8 and Tailwind CSS v4 (`@tailwindcss/postcss: ^4`, `tailwindcss: ^4`).
- **Router Paradigm**: **App Router** (`src/app/`).
  - No `pages/` or `src/pages/` directory exists.
  - No root-level `app/` directory exists (`Test-Path app` -> `False`).
  - All routing logic is resolved inside `d:\InNeeds website\src\app`.

---

## 2. Enumeration of Routes, Layouts, and Pages

### 2.1 Existing Route Filesystem Inventory
```
src/app/
├── apple-icon.png       (Metadata static route handler -> /apple-icon.png)
├── globals.css          (Global stylesheet with @import "tailwindcss" & @theme)
├── icon.png             (Metadata static route handler -> /icon.png)
├── layout.tsx           (RootLayout: wraps <html>, <body>, {children}, and <Footer />)
└── page.tsx             (Root Page: "/" route with "use client")
```

### 2.2 Route Table (Verified via `next build`)
| Path | Next.js Type | Component File | Rendering Type | Notes |
|------|-------------|----------------|----------------|-------|
| `/` | Page Route | `src/app/page.tsx` | Static (`○`) | Client Component (`"use client"`), 639 LOC |
| `/_not-found` | Framework Route | Next.js internal | Static (`○`) | Default 404 fallback |
| `/apple-icon.png` | Static Route | `src/app/apple-icon.png` | Static (`○`) | iOS Apple touch icon |
| `/icon.png` | Static Route | `src/app/icon.png` | Static (`○`) | Standard favicon |

### 2.3 Nested Routes / Route Groups / Layouts
- **Nested Routes**: None exist in the project currently.
- **Route Groups** (e.g., `(marketing)`, `(auth)`): None exist.
- **Layouts**: Exactly one layout exists: `src/app/layout.tsx` (`RootLayout`).

### 2.4 Navigational Links / Planned Subroutes
In `src/app/page.tsx` and `src/components/Footer.tsx`, several `Link` references exist to prospective subroutes:
- `/campaigns` (referenced in Hero CTA, Categories section, Campaigns section, Bottom far-right card)
- `/categories` (referenced in Categories of Impact CTA)
- `/signin` (referenced in Navbar action button)
- `/apply` (referenced in Bottom cards far-left box: "Need help? Apply for support")
- `/partner` (referenced in Bottom cards far-right box: "Are you an NGO? Partner with us")

*Note*: These routes currently have no corresponding `page.tsx` under `src/app/` and will render Next.js 404 until implemented.

---

## 3. Suspense & Loading State Audit
- **`loading.tsx` files**: Exactly **0** currently exist across the entire project (`Get-ChildItem -Path src -Filter "loading.*"` returns empty).
- **`Suspense` boundaries**: Exactly **0** `<Suspense>` components are used in `layout.tsx`, `page.tsx`, or any component in `src/components/` (`Select-String -Path "src\**\*.tsx" -Pattern 'Suspense'` returns empty).
- **Current Loading Behavior**:
  - Because `src/app/page.tsx` is static, navigation to `/` renders immediately once the bundle downloads.
  - However, during initial page load, cold starts, and client route transitions, there is no instant loading skeleton fallback.
  - Adding `src/app/loading.tsx` fulfills Next.js App Router route-level loading state conventions by automatically streaming fallback UI inside `RootLayout` (`<Suspense fallback={<Loading />}>{children}</Suspense>`).

---

## 4. Route-Level `loading.tsx` Target Locations for R1

To satisfy requirement R1 ("Implement route-level skeleton loading states using Next.js `loading.tsx` across the website's routes, and provide skeleton placeholders for main page sections"):

### Primary Required Location:
- **`src/app/loading.tsx`**
  - **Target Route**: Root route (`/`) and default fallback for any unhandled child routes inheriting `RootLayout`.
  - **Scope**: Replaces `{children}` in `src/app/layout.tsx`.
  - **Structure**: Must replicate the structural silhouette of all main sections of the home page.

### Optional Subroute Skeletons (if child routes are created downstream):
- If the implementation creates dummy or real pages for linked routes:
  - `src/app/campaigns/loading.tsx` (for `/campaigns`)
  - `src/app/categories/loading.tsx` (for `/categories`)
  - `src/app/signin/loading.tsx` (for `/signin`)
  - `src/app/apply/loading.tsx` (for `/apply`)
  - `src/app/partner/loading.tsx` (for `/partner`)
- If subroutes are NOT created as separate directories, `src/app/loading.tsx` acts as the universal route-level loading state for the application.

---

## 5. Main Page Section Architecture & Skeleton Specifications

The home page (`src/app/page.tsx`) consists of **8 distinct visual sections** (plus the RootLayout Footer):

| Section # | Section Name | Source Location | Client vs Server | Structural Characteristics & Elements to Skeletonize |
|-----------|--------------|-----------------|------------------|-----------------------------------------------------|
| 1 | **Navigation Bar** | `src/app/page.tsx:110-170` | Client (in `page.tsx`) | Sticky top header with max-w-[1700px]. Needs skeleton for: Mobile search / menu icons, 3 left desktop links, center logo (40-56px icon + text), 2 right desktop links, search icon, and rounded pill "Sign In" button. *Critical note: Navbar is inside `page.tsx`, not `layout.tsx`.* |
| 2 | **Hero Section** | `src/app/page.tsx:173-224` & `src/components/HeroCarousel.tsx` | Client | Subtle radial glow background. Headline skeleton (2 centered lines text), pill CTA button (`h-12 w-48 rounded-full`), 3D curved carousel skeleton (curved perspective container with 7 cards on desktop, 4 on mobile), and 3-column features bar (3 columns divided by borders, each with title & 2-line description). |
| 3 | **Trust & Impact Stats Banner** | `src/app/page.tsx:227-265` | Client | Deep forest green background (`bg-[#0b291a]`). Badge pill skeleton (`100% Verified Causes`), large headline (2 lines, white text), subtext (2 lines), and 3 circular counters (`w-24 h-24 md:w-40 md:h-40 rounded-full bg-white/10` with percentage/count value and description label). |
| 4 | **Trusted By Marquee** | `src/app/page.tsx:269-310` | Client | White background, upper label ("TRUSTED BY LEADING ORGANIZATIONS"), and marquee track with 5 brand logo placeholders (`stripe`, `PayPal`, `GlobalNGO`, `EduCare Foundation`, `VerifiedCharity`). |
| 5 | **How It Works** | `src/components/HowItWorks.tsx:13-348` | Client | Top SVG dome arch divider, title banner with 5 circular floating badge stamps, centered headline + subtitle, followed by 3 vertical step rows: each step has a 01/02/03 numbered circle, bold heading, description, and an accompanying right-hand visual preview card container (`h-[260px] to h-[330px]`) containing floating goal, social share, or bank transfer mockups. |
| 6 | **Categories of Impact** | `src/app/page.tsx:315-332` & `src/components/BottomCarousel.tsx` | Client | Section header: badge ("OUR FOCUS AREAS"), heading ("Categories of Impact"), description, "Choose Your Impact" pill CTA. Cylindrical 3D Coverflow carousel (`BottomCarousel`) with 14 rotating perspective cards (`260px * 360px` desktop). |
| 7 | **Featured Campaigns** | `src/app/page.tsx:335-543` | Client | Heading ("Discover fundraisers inspired by what you care about"), filter pill dropdown ("Happening worldwide") + prev/next round arrow buttons. Asymmetric 4-card grid (Card 1: 2-cols wide, Card 2: 1-col square, Card 3: 1-col square, Card 4: 2-cols wide). Each card has category tag, title, description, progress bar, raised amount, and circular arrow button. |
| 8 | **Bottom Showcase Cards** | `src/app/page.tsx:547-635` | Client | Asymmetric 5-column horizontal layout: Far-left stack (Dark green card + Black apply box), Left tall card (aspect 9/12), Center card (aspect 1/1.05 with circular play button), Right tall card (aspect 9/12), Far-right stack (Lime green card + Dark green partner box). |
| 9 | **Footer** | `src/components/Footer.tsx` | Client (rendered in `layout.tsx`) | Rendered by `RootLayout` (`src/app/layout.tsx:25`). Because it is in the root layout, it persists below `{children}`. During `loading.tsx`, the footer remains mounted. |

---

## 6. Server Components vs Client Components & Data Fetching Status

### Component Tree Classification
| File Path | Type | Directives / Hooks | Async Fetching? | Details |
|-----------|------|--------------------|-----------------|---------|
| `src/app/layout.tsx` | **Server Component** (RSC) | None | No async calls | Synchronous root layout rendering `<html>`, `<body>`, `{children}`, `<Footer />` |
| `src/app/page.tsx` | **Client Component** | `"use client"`, `useState`, `useEffect`, `useRef` | No async calls | Pure client component. State used for `isScrolled`, `isFilterOpen`, intersection observer for `CircularStat` |
| `src/components/HeroCarousel.tsx` | **Client Component** | `"use client"` | No async calls | Pure client component. 3D perspective transforms & dynamic CSS |
| `src/components/BottomCarousel.tsx` | **Client Component** | `"use client"`, Framer Motion (`useAnimationFrame`, `useMotionValue`, `useTransform`) | No async calls | 3D interactive cylinder rotation |
| `src/components/HowItWorks.tsx` | **Client Component** | `"use client"` | No async calls | Static visual step presentation |
| `src/components/Footer.tsx` | **Client Component** | `"use client"`, `useState` | No async calls | Accordion collapse state on mobile |

### Data Fetching Finding
- Currently, **zero external asynchronous network requests** (`fetch`, API endpoints, or database queries) exist in the codebase.
- All category data, stats, and campaign cards are hardcoded static data structures.
- Because `src/app/page.tsx` is `"use client"` without an async `Promise` suspend, in standard production SSG builds it hydrates immediately.
- Placing `src/app/loading.tsx` creates the standard Next.js Suspense boundary around the page, ensuring smooth transition states, future async data streaming support, and satisfying the acceptance criteria.

---

## 7. Recommendations for Downstream Implementation
1. **Root Skeleton Placement**: Create `src/app/loading.tsx` as a Server Component (or client component if required by animations, though pure Tailwind CSS `animate-pulse` works cleanly in Server Components).
2. **Modular Skeleton Structure**:
   - Construct modular skeleton sections (e.g. `NavbarSkeleton`, `HeroSkeleton`, `StatsSkeleton`, `HowItWorksSkeleton`, `CampaignsSkeleton`, `BottomCardsSkeleton`) or a unified `src/app/loading.tsx` referencing reusable primitives.
   - Match exact Tailwind utility classes (margins, paddings, max-widths, aspect ratios, rounded borders) to eliminate Layout Shift (CLS) when transitioning from skeleton to rendered DOM.
3. **Tailwind v4 Pulse / Shimmer Styling**:
   - Use standard Tailwind `animate-pulse` with slate tones (`bg-slate-200`, `bg-slate-100`, `bg-slate-300`) on white backgrounds.
   - For the dark forest green section (`bg-[#0b291a]`), use `bg-white/10` or `bg-emerald-900/40` with `animate-pulse` to match the dark theme aesthetic.
