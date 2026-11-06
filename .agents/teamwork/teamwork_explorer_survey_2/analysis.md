# Page Structure & Main Section Skeletons Investigation

**Date**: 2026-11-06  
**Investigator**: teamwork_explorer_survey_2  
**Target Codebase**: `d:\InNeeds website`  

---

## 1. Executive Summary

This investigation analyzes the complete page structure, layout dimensions, component hierarchy, and main visible sections of the InNeeds website. Built on Next.js 16.3.6 (App Router), React 19, and Tailwind CSS v4, the current website is structured around a comprehensive high-fidelity landing page (`src/app/page.tsx`) accompanied by a persistent global footer (`src/components/Footer.tsx`) inside `src/app/layout.tsx`.

The page consists of 8 distinct visual sections on the main page, plus the sticky navigation bar and global footer. To satisfy **R1 (Route-level and main section skeleton loading)** and **R2 (Styling and theme integration)**, we define exact structural specifications, grid layouts, aspect ratios, card dimensions, avatar/icon placeholders, and text line counts for each section, along with recommended reusable skeleton components.

---

## 2. Component Hierarchy & Architecture Map

### 2.1 File Tree & Layout Boundaries
```
src/
├── app/
│   ├── layout.tsx         # RootLayout (Inter font, globals.css, renders <Footer /> globally)
│   ├── page.tsx           # Home page ("use client", holds <nav>, 7 main page sections)
│   ├── globals.css        # Tailwind CSS v4 import, custom @keyframes floatCard
│   ├── icon.png / apple-icon.png
├── components/
│   ├── HeroCarousel.tsx   # 3D radial perspective carousel with 7 categories
│   ├── BottomCarousel.tsx # 3D rotating cylinder Coverflow carousel with 14 category items
│   ├── HowItWorks.tsx     # 3-step guide with top dome arch, floating badges, interactive card mockups
│   └── Footer.tsx         # 5-column brand footer with newsletter, social icons, legal links
└── lib/
    └── utils.ts           # Utility functions (cn helper via clsx + twMerge)
```

### 2.2 Critical Layout & Hydration Findings
1. **Navbar inside `page.tsx` vs. Footer in `layout.tsx`**:
   - `src/app/layout.tsx` renders `{children}` followed by `<Footer />`.
   - `<nav>` is currently embedded directly inside `src/app/page.tsx` (lines 110–170).
   - **Crucial implication for `loading.tsx`**: When Next.js App Router renders `src/app/loading.tsx`, `{children}` is replaced by the loading fallback. Because `<nav>` is inside `page.tsx`, `loading.tsx` **must render a Navbar skeleton** at the top so the page doesn't have an empty header gap during route transitions.
   - Conversely, because `<Footer />` is rendered by `layout.tsx`, `src/app/loading.tsx` **should NOT render a Footer skeleton**; otherwise two footers would display simultaneously during loading!

2. **Linked Internal Routes**:
   `page.tsx` and `Footer.tsx` contain links to:
   - `/campaigns` (Explore campaigns / View all campaigns)
   - `/categories` (Categories of impact)
   - `/signin` (Sign in button)
   - `/apply` (Need help? Apply for support)
   - `/partner` (Are you an NGO? Partner with us)
   
   If route-level `loading.tsx` files are created for these subroutes, dedicated route skeletons tailored to their specific viewports will be needed.

---

## 3. Detailed Section-by-Section Structural Breakdown

### Section 0: Header & Navigation Bar (`<nav>`)
- **File**: `src/app/page.tsx:110-170`
- **Container Layout**:
  - `w-full z-50 sticky top-0 transition-all duration-300`
  - Unscrolled: `bg-white border-b border-transparent`
  - Scrolled: `bg-white/90 backdrop-blur-lg border-b border-slate-100 shadow-sm`
  - Inner wrapper: `mx-auto max-w-[1700px] px-6 py-4 lg:px-12 flex items-center justify-between`
- **Sub-elements & Dimensions**:
  - **Mobile Left**: `lg:hidden flex-1 flex justify-start` -> Search button (`w-6 h-6`, strokeWidth 2.5)
  - **Desktop Left**: `hidden lg:flex items-center gap-8 text-sm md:text-base font-bold text-slate-800 flex-1 justify-start` -> 3 links: "Campaigns" (~75px), "How It Works" (~95px), "For NGOs" (~65px)
  - **Center Brand**:
    - Mobile: `flex justify-center flex-shrink-0`
    - Desktop: `lg:absolute lg:left-1/2 lg:-translate-x-1/2`
    - Logo image: `relative w-10 h-10 lg:w-14 lg:h-14`
    - Brand text: `text-2xl lg:text-4xl font-extrabold tracking-tight` ("In" `#0a5228` + "Needs" `#32a338`), width ~110px mobile, ~140px desktop
  - **Desktop Right**: `hidden lg:flex items-center gap-4 lg:gap-6 flex-1 justify-end`
    - 2 links: "Get the App" (~80px), "About Us" (~70px)
    - Search icon button: `w-5 h-5`
    - "Sign In" pill button: `border-2 border-[#0a5228] px-5 py-2.5 lg:px-7 rounded-full text-sm md:text-base font-bold`, dimensions ~100px × 44px
  - **Mobile Right**: `lg:hidden flex-1 flex justify-end` -> Hamburger icon (`w-7 h-7`)

---

### Section 1: Hero Banner & 3D Carousel Section
- **File**: `src/app/page.tsx:172-224` & `src/components/HeroCarousel.tsx`
- **Container Layout**:
  - `relative pt-12 pb-16 px-4 md:px-6 w-full overflow-x-clip`
  - Ambient radial background glow: `w-[1000px] h-[800px] bg-[radial-gradient(ellipse_at_center,_#E9F7EC_0%,_transparent_70%)]`
- **Headline & Primary CTA**:
  - Heading: `h1` `text-[clamp(2.5rem,4.4vw,3.5rem)] md:text-[clamp(2.25rem,4.4vw,3.5rem)] font-[800] leading-[1.15] md:leading-[1.1] text-[#0f172a] max-w-4xl mx-auto px-2 text-center`
  - Text lines: 2 lines on desktop, ~3 lines on small screens
  - CTA Button: `mt-12 flex items-center justify-center` -> Pill button `pl-6 pr-1.5 py-1.5 rounded-full bg-slate-900 text-white font-extrabold shadow-lg` with embedded circular arrow badge (`w-9 h-9 rounded-full bg-white/10`)
- **3D Curved Carousel (`<HeroCarousel />`)**:
  - Container: `perspective-container py-16`
  - Height: `h-[180px]` (mobile), `calc(350 * var(--u))` (desktop, ~220px to 350px)
  - Card Panels (7 total categories):
    - Mobile visible: 4 cards, `width: 90px; height: 115px; border-radius: 12px;`
    - Desktop visible: 7 cards, `width: calc(160 * var(--u)); height: calc(200 * var(--u)); border-radius: calc(18 * var(--u));` (~160px × 200px)
    - 3D curved arc layout: `rotateY((3 - i) * 20deg) translateZ(...)`
- **3-Column Features Strip**:
  - Container: `mt-4 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 divide-y md:divide-y-0 md:divide-x divide-slate-200`
  - 3 feature items, each containing:
    - Title: `text-[1.05rem] font-[800] text-slate-800 tracking-tight mb-2` (e.g. "Every cause verified", "Transparent fund tracking", "Secure payments")
    - Body: `text-[13px] text-slate-400 font-medium leading-relaxed` (2 to 3 lines of copy, ~48px height)

---

### Section 2: Trust & Impact / Circular Stats Section
- **File**: `src/app/page.tsx:226-265`
- **Container Layout**:
  - Theme: Dark Forest Green `bg-[#0b291a] text-white pt-24 pb-16 lg:pt-32 lg:pb-24 flex flex-col items-center justify-center text-center px-6`
- **Header Elements**:
  - Pill Badge: `bg-white/10 text-emerald-100 border border-white/10 font-extrabold text-xs px-4 py-1.5 rounded-sm mb-6 uppercase tracking-wider backdrop-blur-sm` (width ~170px, height ~28px)
  - Heading: `text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6` (2 lines)
  - Subtext: `text-lg md:text-xl text-emerald-100/90 max-w-3xl mx-auto font-medium leading-relaxed mb-16 lg:mb-20` (3 lines)
- **Animated Circular Stats**:
  - Container: `flex flex-row justify-center items-start gap-4 md:gap-24 lg:gap-32 w-full max-w-[1200px]`
  - 3 Circular items:
    - Circle size: `w-24 h-24 md:w-40 md:h-40 rounded-full bg-white shadow-2xl border-2 border-white ring-1 ring-slate-100/50`
    - Metric text: `text-xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight`
    - Subtitle label below circle: `text-emerald-50/80 text-[10px] md:text-sm font-semibold leading-tight max-w-[100px] md:max-w-[200px] mt-2 md:mt-4` (2 lines)

---

### Section 3: Trusted By Marquee Strip
- **File**: `src/app/page.tsx:267-310`
- **Container Layout**:
  - `py-16 bg-white overflow-hidden relative border-t border-slate-100`
- **Header Caption**:
  - `text-center text-[11px] font-bold text-slate-400 uppercase tracking-[0.25em] mb-12`
- **Marquee Row**:
  - Infinite linear marquee animation, with gradient fade masks on left (`w-32 md:w-64 bg-gradient-to-r from-white`) and right (`bg-gradient-to-l from-white`)
  - 5 logos:
    - "stripe" (`text-3xl font-extrabold`)
    - "PayPal" (`text-3xl font-extrabold italic`)
    - "GlobalNGO" (HeartHandshake icon `w-8 h-8` + `text-2xl font-bold`)
    - "EduCare Foundation" (`text-2xl font-bold`)
    - "VerifiedCharity" (ShieldCheck icon `w-8 h-8` + `text-2xl font-bold`)

---

### Section 4: How It Works / Fundraising on InNeeds
- **File**: `src/components/HowItWorks.tsx`
- **Container Layout**:
  - `bg-[#f6f9f6] pb-12 sm:pb-16 md:pb-20 border-b border-[#e2eae3] relative overflow-hidden`
  - Top Dome Arch: SVG curve divider `viewBox="0 0 1440 100"` (`h-10 sm:h-16 md:h-20 lg:h-24`)
- **Hero Banner & Floating Badges**:
  - 5 decorative circular badges around the headline:
    - Top-left: "CHANGE THE WORLD" (`w-11 h-11` to `w-22 h-22`)
    - Bottom-left: "PUT PEOPLE FIRST" (`w-11 h-11` to `w-22 h-22`)
    - Top-right: "TRANSPARENT GIVING" (`w-11 h-11` to `w-22 h-22`)
    - Middle-right: "100% AUDITABLE" (`w-10 h-10` to `w-18 h-18`)
    - Bottom-right: "WORK TOGETHER" (`w-11 h-11` to `w-22 h-22`)
  - Center headline: `text-xl sm:text-3xl md:text-4xl lg:text-[3.25rem] font-black uppercase text-[#141414] leading-[1.12]` (2 lines)
  - Subheading: `text-slate-600 text-xs sm:text-sm md:text-base font-medium max-w-lg mx-auto leading-relaxed`
- **3-Step Process List**:
  - Container: `max-w-[1600px] mx-auto px-6 lg:px-12 mt-10 md:mt-14 pt-8 md:pt-12 border-t border-[#e2eae3] space-y-8 md:space-y-12`
  - Each step is a 12-column grid (`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch`):
    - **Left Column (`lg:col-span-5`)**:
      - Step number circle badge: `w-7 h-7 rounded-full bg-[#22c55e] text-slate-950 font-black text-xs` ("01", "02", "03")
      - Title: `text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-black uppercase text-[#141414] leading-[1.08] max-w-md`
      - Description: `text-slate-600 text-sm sm:text-base font-medium leading-relaxed max-w-md mt-6 lg:mt-auto` (2-3 lines)
    - **Right Visual Card (`lg:col-span-7`)**:
      - Shell: `h-[260px] sm:h-[300px] md:h-[330px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-black/10 bg-slate-900 relative` with background scenic imagery and dark overlay
      - Floating Mockup Card:
        - Step 1: Goal setting card (`w-full max-w-[310px] bg-white rounded-3xl p-5 space-y-3` with dollar input, dark green tip box, skeleton lines)
        - Step 2: Social share mockup card (`w-[260px] sm:w-[285px] md:w-[305px] aspect-[509/519]` floating card)
        - Step 3: Transfers mockup card (`w-full max-w-[310px] bg-white rounded-3xl p-5 space-y-3` with lime expected amount box, bank account row, activity line)

---

### Section 5: Categories of Impact / 3D Bottom Carousel
- **File**: `src/app/page.tsx:315-333` & `src/components/BottomCarousel.tsx`
- **Container Layout**:
  - `py-24 bg-white border-t border-slate-100 overflow-x-clip`
- **Header Elements**:
  - Badge: `bg-[#32a338]/15 text-[#0a5228] font-extrabold text-xs px-4 py-1.5 rounded-sm mb-4 uppercase tracking-wider`
  - Heading: `text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight`
  - Subtitle: `mt-4 text-slate-600 text-lg font-medium max-w-2xl mx-auto`
  - CTA Button: `mt-8 flex justify-center` -> Pill button `bg-slate-900 text-white px-8 py-3.5 rounded-full font-extrabold shadow-xl` with ArrowRight icon
- **3D Bottom Carousel Cylinder**:
  - Container: `w-full mt-12 mb-16 flex flex-col items-center justify-center overflow-hidden h-[250px] md:h-[400px]`
  - Perspective: `1000px`, 14 category panels duplicated for panoramic continuous rotation
  - Card Dimensions:
    - Mobile: `width: 85px; height: 120px; border-radius: 12px;`
    - Desktop: `width: 260px; height: 360px; border-radius: 24px;`

---

### Section 6: Below-the-Fold Bento Campaigns Grid
- **File**: `src/app/page.tsx:334-543`
- **Container Layout**:
  - `py-24 bg-white max-w-[1600px] mx-auto px-6 lg:px-12`
- **Header & Controls**:
  - Section Title: `text-2xl md:text-3xl lg:text-[36px] font-extrabold text-[#1a1a1a] tracking-tight leading-tight`
  - Filter & Controls Row:
    - Filter dropdown pill: "Happening worldwide" with ChevronDown (`border border-gray-300 rounded-full px-5 py-2.5 text-sm font-bold`)
    - Navigation arrow buttons: Left & Right circular buttons `w-10 h-10 rounded-full border border-slate-300`
- **Asymmetric 4-Card Bento Grid Layout**:
  - Grid: `grid grid-cols-1 md:grid-cols-3 gap-6`
  - **Card 1 (Top Left - Wide)**:
    - Grid span: `md:col-span-2 min-h-[200px] md:min-h-[280px] lg:min-h-[300px] rounded-[28px] overflow-hidden relative shadow-xl`
    - Top-left badge: `bg-white/20 backdrop-blur-md rounded-full px-2.5 py-1 text-[9px] md:text-[10px]` ("Verified" with ShieldCheck)
    - Bottom content overlay:
      - Category tag: `text-emerald-400 font-extrabold text-xs uppercase tracking-wider` ("Education")
      - Title: `text-lg md:text-xl lg:text-2xl font-extrabold text-white mb-1.5` ("School Supplies for Village Community")
      - Description: `text-slate-300 text-xs lg:text-sm line-clamp-2` (2 lines)
      - Action button: Circular arrow button `w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-white text-slate-900`
      - Progress bar: `w-full bg-white/20 rounded-full h-1` (fill 65%)
      - Raised text row: `$3,250 raised` of `$5k`
  - **Card 2 (Top Right - Square)**:
    - Grid span: `md:col-span-1 min-h-[200px] md:min-h-[280px] lg:min-h-[300px] rounded-[28px] overflow-hidden relative shadow-xl`
    - Bottom content: Category tag ("Medical"), Title ("Emergency Surgery"), circular button `w-8 h-8 md:w-9 md:h-9`, 2-line description, progress bar `h-1` (fill 85%), stats `$8,500` of `$10k`
  - **Card 3 (Bottom Left - Square)**:
    - Grid span: `md:col-span-1 min-h-[200px] md:min-h-[280px] lg:min-h-[300px] rounded-[28px] overflow-hidden relative shadow-xl`
    - Bottom content: Category tag ("Community"), Title ("Clean Water Init."), circular button, description, progress bar `h-1` (fill 30%), stats `$4,500` of `$15k`
  - **Card 4 (Bottom Right - Wide)**:
    - Grid span: `md:col-span-2 min-h-[200px] md:min-h-[280px] lg:min-h-[300px] rounded-[28px] overflow-hidden relative shadow-xl`
    - Top-left badge: "Verified" (purple)
    - Bottom content: Category tag ("Animal Rescue"), Title ("Wildlife Habitat Restoration"), description, circular button `w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12`, progress bar `h-1` (fill 45%), stats `$9,000 raised` of `$20k`
- **Mobile CTA**:
  - `md:hidden flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-full font-extrabold mt-12 mx-auto`

---

### Section 7: Bottom Bento Showcase / Callouts Strip
- **File**: `src/app/page.tsx:546-635`
- **Container Layout**:
  - `py-24 bg-white w-full overflow-hidden`
  - Cards Container: `relative z-10 mx-auto mt-20 flex flex-row items-end justify-start xl:justify-center gap-4 md:gap-6 w-full max-w-[1800px] px-4 md:px-8 xl:px-12 pb-12 overflow-x-auto xl:overflow-visible snap-x snap-mandatory`
- **5-Column Card Cluster**:
  1. **Far Left Stack** (`shrink-0 w-[260px] xl:w-[280px] 2xl:w-[320px] flex flex-col gap-6`):
     - Top Card: `aspect-[4/5] bg-[#0d472c] rounded-[2rem] rounded-tr-[4rem] p-6 2xl:p-8 flex flex-col justify-between text-white shadow-xl` (Title 2 lines, description 3 lines, button `w-10 h-10 2xl:w-12 2xl:h-12 bg-[#c0f058] rounded-full`)
     - Bottom Card: `h-[100px] 2xl:h-[120px] bg-[#1a1a1a] rounded-[2rem] p-5 2xl:p-6 flex items-center gap-4 shadow-xl text-white` (Icon `w-8 h-8` + 2 lines of text)
  2. **Left Tall Box** (`w-[280px] xl:w-[320px] 2xl:w-[360px] aspect-[9/12] bg-slate-200 rounded-[2.5rem] rounded-tl-[4rem] overflow-hidden shadow-2xl shrink-0 p-8 flex flex-col justify-end text-white`):
     - Background image + dark gradient + Category tag + Title 2 lines
  3. **Center Video Box** (`w-[240px] xl:w-[280px] 2xl:w-[320px] aspect-[1/1.05] bg-[#dce3de] rounded-[3rem] shadow-2xl shrink-0 p-8 2xl:p-10 flex flex-col justify-end mt-16 xl:mt-0 relative`):
     - Floating circular play button: `-top-12 left-1/2 -translate-x-1/2 w-24 h-24 2xl:w-28 2xl:h-28 bg-white rounded-full flex items-center justify-center shadow-lg`
     - Title 2 lines ("How InNeeds verifies every cause") + action row with circle button `w-10 h-10 2xl:w-12 2xl:h-12 bg-[#1a1a1a] rounded-full`
  4. **Right Tall Box** (`w-[280px] xl:w-[320px] 2xl:w-[360px] aspect-[9/12] bg-slate-200 rounded-[2.5rem] rounded-tl-[4rem] overflow-hidden shadow-2xl shrink-0 p-8 flex flex-col justify-end text-white`):
     - Background image + dark gradient + Category tag + Title 2 lines
  5. **Far Right Stack** (`shrink-0 w-[260px] xl:w-[280px] 2xl:w-[320px] flex flex-col gap-6`):
     - Top Card: `aspect-[4/5] bg-[#c0f058] rounded-[2rem] rounded-tl-[4rem] overflow-hidden shadow-xl p-6 2xl:p-8 flex flex-col justify-between text-[#0d472c]` (Title 2 lines + pill link bar with circle button `w-8 h-8 2xl:w-10 2xl:h-10 bg-[#1a1a1a] rounded-full`)
     - Bottom Card: `h-[100px] 2xl:h-[120px] bg-[#1e3427] rounded-[2rem] p-5 2xl:p-6 flex items-center gap-3 shadow-xl text-white` (Icon `w-8 h-8` + 2 lines of text)

---

### Section 8: Global Footer
- **File**: `src/components/Footer.tsx` (rendered inside `src/app/layout.tsx:25`)
- **Container Layout**:
  - `bg-[#0b291a] text-white pt-16 pb-8 border-t border-white/10`
  - Max width: `max-w-7xl mx-auto px-6 md:px-12 xl:px-16`
- **Newsletter Row**:
  - Left: Heading `text-2xl md:text-3xl font-bold` + Subtext `text-white/60 text-sm md:text-base`
  - Right: Form with email input (`px-6 py-4 rounded-full bg-white/5 border border-white/20 w-full sm:w-[300px]`) + Subscribe button (`bg-[#c0f058] text-[#0a5228] font-bold px-8 py-4 rounded-full`)
- **Divider**: `hr border-white/10 mb-12`
- **5-Column Link Grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-6 md:gap-x-12 lg:gap-8 mb-16`
  - Col 1 (Brand): Logo `w-10 h-10` + Title "InNeeds", 2 description lines, 4 social buttons `w-10 h-10 rounded-full border border-white/20`, 2 app store pills `h-10 px-4 rounded-lg`
  - Col 2 (Explore): Heading + 3 text links
  - Col 3 (Get Involved): Heading + 4 text links
  - Col 4 (Company): Heading + 4 text links
  - Col 5 (Legal): Heading + 4 text links
- **Bottom Bar**: `pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6`
  - Left: Copyright line ("© 2026 InNeeds. All rights reserved.")
  - Right: "Secure payments" badge + Lock icon + CreditCard & Wallet icons

---

## 4. Recommended Concrete Skeleton Components

To cleanly fulfill R1 and R2, we recommend creating a modular library of section skeleton components under `src/components/skeletons/` (or matching directory):

| Skeleton Component | File Path | Matches Section | Visual Layout |
|---|---|---|---|
| `NavbarSkeleton` | `src/components/skeletons/NavbarSkeleton.tsx` | Header Navigation | Sticky `h-[72px]`, left links, center logo+brand, right links & Sign In pill |
| `HeroSectionSkeleton` | `src/components/skeletons/HeroSectionSkeleton.tsx` | Section 1 (Hero) | Centered 2-line title, CTA button pill, 3D carousel arc cards, 3-column feature list |
| `StatsSectionSkeleton` | `src/components/skeletons/StatsSectionSkeleton.tsx` | Section 2 (Stats) | Dark `#0b291a` background, badge, 2-line title, 3 circular dial placeholders with labels |
| `TrustedBySkeleton` | `src/components/skeletons/TrustedBySkeleton.tsx` | Section 3 (Marquee) | Caption bar, 5 horizontal logo pill/icon placeholders |
| `HowItWorksSkeleton` | `src/components/skeletons/HowItWorksSkeleton.tsx` | Section 4 (How It Works) | Light sage `#f6f9f6` background, top arch, 3-step grid rows (left text, right card) |
| `CategoriesSkeleton` | `src/components/skeletons/CategoriesSkeleton.tsx` | Section 5 (Categories) | Badge, title, CTA button, 3D cylinder card row spread |
| `CampaignsGridSkeleton` | `src/components/skeletons/CampaignsGridSkeleton.tsx` | Section 6 (Campaigns) | Title, filter pills, 4-card asymmetric bento grid (2 wide, 2 square cards with progress bars) |
| `ShowcaseBentoSkeleton` | `src/components/skeletons/ShowcaseBentoSkeleton.tsx` | Section 7 (Showcase) | 5-column cluster (far-left stack, 2 tall cards, center card with play button, far-right stack) |
| `FooterSkeleton` | `src/components/skeletons/FooterSkeleton.tsx` | Global Footer | Dark `#0b291a` background, newsletter row, 5 columns of link lists, bottom bar |
| `HomeLoadingSkeleton` | `src/app/loading.tsx` | Route Loading | Composite page skeleton: NavbarSkeleton + HeroSectionSkeleton + StatsSectionSkeleton |

### 4.1 Theme-Aware Skeleton Tokens
- **Light Sections**: Use `bg-slate-200/80` or `bg-slate-100` with `animate-pulse` or shimmer gradient.
- **Dark Emerald Sections** (`#0b291a`, `#0d472c`): Use `bg-white/10` with `border border-white/10` and `animate-pulse` so the skeleton blends naturally with the dark theme without harsh contrast.
- **Light Sage Sections** (`#f6f9f6`): Use `bg-slate-200/90` over `#f6f9f6`.

---

## 5. Next Steps for Implementation Team
1. Create core primitive `Skeleton` helper if needed (`<div className={cn("animate-pulse rounded-md bg-slate-200", className)} />`).
2. Build the modular section skeletons mapped above.
3. Wire `src/app/loading.tsx` to display the above-the-fold and route loading states.
4. Ensure zero build errors with `npm run build`.
