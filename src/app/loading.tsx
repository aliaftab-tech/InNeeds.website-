import {
  NavbarSkeleton,
  HeroSectionSkeleton,
  TrustImpactSkeleton,
  TrustedBySkeleton,
  HowItWorksSkeleton,
  CategoriesSkeleton,
  CampaignsGridSkeleton,
  ShowcaseBentoSkeleton,
} from "@/components/skeletons";

/**
 * Root Route Loading Fallback
 * Provides instant, zero-CLS skeleton placeholder matching all home page sections.
 * Note: FooterSkeleton is intentionally omitted because src/app/layout.tsx renders <Footer /> globally below {children}.
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-200 selection:text-slate-900 font-sans overflow-x-clip">
      {/* Top sticky Navigation Skeleton */}
      <NavbarSkeleton />

      {/* Full Page Section Skeletons */}
      <main>
        <HeroSectionSkeleton />
        <TrustImpactSkeleton />
        <TrustedBySkeleton />
        <HowItWorksSkeleton />
        <CategoriesSkeleton />
        <CampaignsGridSkeleton />
        <ShowcaseBentoSkeleton />
      </main>
    </div>
  );
}
