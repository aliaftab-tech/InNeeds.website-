# Handoff Report: Page Structure & Section Skeletons Investigation

**Author**: `teamwork_explorer_survey_2`  
**Date**: 2026-11-06T11:28:00Z  
**Target Project**: `d:\InNeeds website`  
**Working Directory**: `d:\InNeeds website\.agents\teamwork\teamwork_explorer_survey_2`  

---

## 1. Observation

Direct examination of the repository confirmed the following structural layout and file hierarchy:

### 1.1 Application Entry & Layout
- **Root Layout (`src/app/layout.tsx:1-30`)**:
  - Sets up Inter font (`const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })`).
  - Line 23-26:
    ```tsx
    <body className={`${inter.variable} font-sans antialiased`}>
      {children}
      <Footer />
    </body>
    ```
  - `<Footer />` is rendered globally in `RootLayout`.
  - Notice that `<nav>` is **NOT** inside `RootLayout`.

- **Home Page (`src/app/page.tsx:1-639`)**:
  - Declared as `"use client"`.
  - Contains embedded sticky navigation bar (`lines 110-170`), followed by 7 visible content sections.

### 1.2 Breakdown of Visible Sections & Components

| Section | Component / Location | Container & Visual Dimensions | Key Elements & Placeholder Specs |
|---|---|---|---|
| **Header / Nav** | `src/app/page.tsx:110-170` | Sticky top, `h-[72px]`, `max-w-[1700px]`, `px-6 py-4 lg:px-12` | - Desktop Left: 3 text links (`h-4 w-20`, `h-4 w-24`, `h-4 w-16`)<br>- Center: Logo (`w-10 h-10 lg:w-14 lg:h-14`) + Brand text (`w-28 h-8`)<br>- Desktop Right: 2 text links (`h-4 w-20`, `h-4 w-16`) + Search (`w-5 h-5`) + Sign In pill (`w-24 h-10 rounded-full`)<br>- Mobile: Left Search icon (`w-6 h-6`), Right Hamburger (`w-7 h-7`) |
| **Hero & 3D Carousel** | `src/app/page.tsx:172-224` & `src/components/HeroCarousel.tsx:1-138` | `pt-12 pb-16 px-4 md:px-6 w-full`, radial glow backdrop `1000px × 800px` | - Headline: `h1` 2 lines (`h-10 md:h-12 w-3/4 max-w-2xl` & `w-1/2 max-w-md`)<br>- CTA Button: Pill `w-52 h-12 rounded-full`<br>- 3D Carousel: `h-[180px]` mobile (4 cards `90px × 115px`, `rounded-[12px]`), `h-[300px]-350px` desktop (7 cards `160px × 200px`, `rounded-[18px]`) in perspective arc<br>- 3 Features: `grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl` with title (`w-36 h-5`) + 2-3 body lines (`h-3 w-full`, `h-3 w-4/5`) |
| **Stats / Impact** | `src/app/page.tsx:226-265` | Dark green `bg-[#0b291a] text-white pt-24 pb-16 lg:pt-32 lg:pb-24` | - Badge: `w-44 h-7 rounded-sm bg-white/10`<br>- Heading: 2 lines `w-3/4 max-w-3xl h-12 bg-white/15`<br>- Subtext: 2 lines `w-full max-w-2xl h-4 bg-white/10`<br>- 3 Circular Dials: `w-24 h-24 md:w-40 md:h-40 rounded-full bg-white/10 border-2 border-white/20` with 2 label lines below (`w-28 h-3.5 bg-white/10`) |
| **Trusted By Strip** | `src/app/page.tsx:267-310` | `py-16 bg-white border-t border-slate-100 overflow-hidden` | - Caption: `w-64 h-3 bg-slate-200 mx-auto mb-12`<br>- Marquee strip: 5 logo placeholders (`w-24 h-8`, `w-28 h-8`, `w-36 h-8`, `w-40 h-8`, `w-36 h-8`) with fade masks |
| **How It Works** | `src/components/HowItWorks.tsx:1-351` | Sage `bg-[#f6f9f6] pb-12 sm:pb-20 border-b border-[#e2eae3]`, SVG dome arch at top (`h-10 md:h-24`) | - Header: Headline 2 lines (`w-3/4 max-w-xl h-10`), subtitle 2 lines (`w-full max-w-lg h-4`), 5 floating badge stamp silhouettes (`w-12 h-12` to `w-20 h-20`)<br>- 3 Step Rows: `grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pt-8 border-t border-[#e2eae3]`:<br>  - Left (`col-span-5`): Number badge (`w-7 h-7 rounded-full`), Title 2 lines (`w-4/5 h-8`), Description 2 lines (`w-full h-4`)<br>  - Right (`col-span-7`): Card container `h-[260px] md:h-[330px] rounded-2xl md:rounded-3xl bg-slate-200` with centered mockup box (`w-72 h-48 bg-white/70 rounded-2xl`) |
| **Categories of Impact** | `src/app/page.tsx:315-333` & `src/components/BottomCarousel.tsx:1-129` | `py-24 bg-white border-t border-slate-100` | - Badge: `w-36 h-6 rounded bg-slate-200`<br>- Heading: `w-80 h-10 rounded bg-slate-200`<br>- Subtitle: 2 lines `w-full max-w-lg h-4`<br>- CTA Button: Pill `w-48 h-12 rounded-full`<br>- 3D Carousel Cylinder: `h-[250px] md:h-[400px]` with cards (mobile `85px × 120px rounded-[12px]`, desktop `260px × 360px rounded-[24px]`) |
| **Campaigns Bento Grid** | `src/app/page.tsx:334-543` | `py-24 bg-white max-w-[1600px] mx-auto px-6 lg:px-12` | - Header: Title (`w-3/4 max-w-xl h-8`), filter dropdown pill (`w-48 h-10 rounded-full`), 2 navigation circle buttons (`w-10 h-10 rounded-full`)<br>- Asymmetric 4-card Bento Grid (`grid-cols-1 md:grid-cols-3 gap-6`):<br>  - Card 1: Wide (`md:col-span-2 min-h-[280px] lg:min-h-[300px] rounded-[28px] bg-slate-200`) with Verified badge, Category, Title, description, circle button (`w-10 h-10`), progress bar (`h-1.5`), stats row<br>  - Card 2: Square (`md:col-span-1 min-h-[280px] lg:min-h-[300px] rounded-[28px] bg-slate-200`)<br>  - Card 3: Square (`md:col-span-1 min-h-[280px] lg:min-h-[300px] rounded-[28px] bg-slate-200`)<br>  - Card 4: Wide (`md:col-span-2 min-h-[280px] lg:min-h-[300px] rounded-[28px] bg-slate-200`)<br>- Mobile CTA: Pill `w-52 h-12 rounded-full mt-12` |
| **Showcase Bento Strip** | `src/app/page.tsx:546-635` | `py-24 bg-white overflow-hidden`, horizontal scroll/flex row `max-w-[1800px]` | - 5-Column Cluster (`gap-4 md:gap-6 items-end`):<br>  1. Far-Left Stack: Top card `w-[280px] aspect-[4/5] rounded-[2rem] rounded-tr-[4rem] bg-slate-200`, Bottom card `w-[280px] h-[100px] rounded-[2rem] bg-slate-200`<br>  2. Left Tall Box: `w-[280px] md:w-[320px] aspect-[9/12] rounded-[2.5rem] rounded-tl-[4rem] bg-slate-200`<br>  3. Center Box: `w-[240px] md:w-[280px] aspect-[1/1.05] rounded-[3rem] bg-slate-200` with floating circular play button `-top-12 w-24 h-24 rounded-full bg-white`<br>  4. Right Tall Box: `w-[280px] md:w-[320px] aspect-[9/12] rounded-[2.5rem] rounded-tl-[4rem] bg-slate-200`<br>  5. Far-Right Stack: Top card `w-[280px] aspect-[4/5] rounded-[2rem] rounded-tl-[4rem] bg-slate-200`, Bottom card `w-[280px] h-[100px] rounded-[2rem] bg-slate-200` |
| **Footer** | `src/components/Footer.tsx:1-172` | `bg-[#0b291a] text-white pt-16 pb-8 border-t border-white/10 max-w-7xl mx-auto` | - Newsletter: Heading (`w-72 h-8 bg-white/15`), Subtitle (`w-96 h-4 bg-white/10`), Input (`w-72 h-12 rounded-full bg-white/10`), Button (`w-36 h-12 rounded-full bg-white/20`)<br>- 5 Columns: Brand col (logo `w-10 h-10`, 2 lines, 4 circle icons `w-10 h-10`, 2 app pills), 4 navigation cols (headings `w-24 h-4`, 3-4 links `w-28 h-3.5`)<br>- Bottom Bar: Copyright (`w-48 h-3`), payment badges (`w-32 h-4`) |

---

## 2. Logic Chain

1. **Premise 1 (App Router Layout Structure)**: `src/app/layout.tsx` wraps `{children}` with `<Footer />` (lines 23-26). It does not wrap with `<nav>`.
2. **Premise 2 (Navbar Placement)**: `<nav>` is placed inside `src/app/page.tsx` (lines 110-170).
3. **Inference 1**: When Next.js App Router renders `src/app/loading.tsx` during page route transitions, `{children}` is replaced by `loading.tsx` while `<Footer />` remains rendered.
4. **Conclusion 1 (Navbar in Loading)**: Therefore, `src/app/loading.tsx` **must include a Navbar skeleton** at the top to prevent layout shift and blank header gaps.
5. **Conclusion 2 (No Duplicate Footer in Loading)**: `src/app/loading.tsx` **must NOT include a Footer skeleton**, as `layout.tsx` already renders the real `<Footer />`.
6. **Premise 3 (Theme Contrast Requirements - R2)**:
   - Several sections use dark green backgrounds (`bg-[#0b291a]` for Stats section and Bento card stack).
   - Standard light grey skeletons (`bg-slate-200`) placed on `#0b291a` produce glaring, high-contrast visual flashing.
7. **Conclusion 3 (Theme-Aware Skeleton Tokens)**:
   - Light sections (Hero, Trusted By, Categories, Campaigns, Showcase): use `bg-slate-200/80` with `animate-pulse`.
   - Dark emerald sections: use `bg-white/10` or `bg-emerald-900/40` with `border border-white/10` and `animate-pulse`.
   - Sage sections (How It Works): use `bg-slate-200/90` over `#f6f9f6`.
8. **Premise 4 (Bento Grid Fidelity)**:
   - The Campaigns grid is an asymmetric 4-card bento grid (`grid-cols-1 md:grid-cols-3`): Card 1 (`col-span-2`), Card 2 (`col-span-1`), Card 3 (`col-span-1`), Card 4 (`col-span-2`).
   - The Showcase strip is a 5-column horizontal layout with specialized asymmetric rounded corners (`rounded-tr-[4rem]`, `rounded-tl-[4rem]`).
9. **Conclusion 4 (Component Recommendation)**:
   Matching section skeleton components must replicate these exact column spans, aspect ratios, and corner radiuses to avoid Cumulative Layout Shift (CLS) when real components mount.

---

## 3. Caveats

1. **Subroutes Not Yet Created**: Currently, only `src/app/page.tsx` exists as a page route. Routes like `/campaigns`, `/categories`, `/signin`, `/apply`, and `/partner` are linked in anchors and buttons, but do not yet have corresponding route directories (`src/app/campaigns/page.tsx`, etc.). If those routes are created in subsequent milestones, their respective `loading.tsx` files can reuse the modular section skeletons defined here.
2. **Carousel Fallbacks**: Both `HeroCarousel` and `BottomCarousel` use 3D CSS transforms and Framer Motion. Skeleton placeholders should render flat or gently curved 2D card strips matching the outer container heights (`180px`/`350px` and `250px`/`400px`) rather than attempting heavy 3D math during loading states.
3. **No Code Written**: Per our read-only explorer role, no source code files or components were modified or added. All findings are purely analytical.

---

## 4. Conclusion

We recommend creating the following modular section skeleton placeholder components under `src/components/skeletons/`:
1. `NavbarSkeleton.tsx` (`h-[72px]`, left links, center logo+text, right links & Sign In pill).
2. `HeroSectionSkeleton.tsx` (centered 2-line headline, CTA pill, carousel card strip, 3-column features).
3. `StatsSectionSkeleton.tsx` (dark `#0b291a` background, badge, headline, 3 circular water dials with labels).
4. `TrustedBySkeleton.tsx` (caption, 5 logo placeholders with fade masks).
5. `HowItWorksSkeleton.tsx` (sage `#f6f9f6`, top arch, 3-step grid rows with left text and right card container).
6. `CategoriesSkeleton.tsx` (badge, title, CTA button, card strip spread).
7. `CampaignsGridSkeleton.tsx` (title, filter pills, 4-card asymmetric bento grid: 2 wide + 2 square cards with progress bars and stats).
8. `ShowcaseBentoSkeleton.tsx` (5-column cluster with asymmetric corner radiuses).
9. `FooterSkeleton.tsx` (dark `#0b291a`, newsletter row, 5 columns, bottom bar).
10. `src/app/loading.tsx` (Route-level loading state combining `NavbarSkeleton` + `HeroSectionSkeleton` + `StatsSectionSkeleton`).

---

## 5. Verification Method

To independently verify these findings and layouts:
1. **Inspect Layout & Nav placement**:
   ```powershell
   Select-String -Path "src/app/layout.tsx" -Pattern "<Footer|<nav"
   Select-String -Path "src/app/page.tsx" -Pattern "<nav|<Footer"
   ```
   *Expected result*: `<Footer />` is found in `layout.tsx:25`; `<nav>` is found in `page.tsx:110`.
2. **Inspect Bento Grid classes**:
   ```powershell
   Select-String -Path "src/app/page.tsx" -Pattern "grid-cols-1 md:grid-cols-3 gap-6"
   ```
   *Expected result*: Confirms the 3-column asymmetric campaign grid.
3. **Inspect 3D Carousel heights & card dimensions**:
   ```powershell
   Select-String -Path "src/components/HeroCarousel.tsx" -Pattern "perspective-container|panel-base"
   Select-String -Path "src/components/BottomCarousel.tsx" -Pattern "bottom-card|h-\[250px\]"
   ```
4. **Build verification**:
   ```powershell
   npm run build
   ```
   *Expected result*: Compiles with zero errors.
