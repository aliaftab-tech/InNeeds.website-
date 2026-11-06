import { Skeleton } from "@/components/ui/skeleton";

/**
 * HeroSectionSkeleton
 * Matches the headline, CTA button, 3D perspective carousel card arc, and 3-column features strip.
 */
export function HeroSectionSkeleton() {
  return (
    <section className="relative pt-12 pb-16 px-4 md:px-6 w-full overflow-x-clip">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-[radial-gradient(ellipse_at_center,_#E9F7EC_0%,_transparent_70%)] -z-10 pointer-events-none" />

      {/* Headline & CTA Area */}
      <div className="relative flex flex-col items-center justify-center text-center mb-4 z-10 translate-y-6">
        <Skeleton className="h-10 md:h-12 lg:h-14 w-3/4 max-w-2xl mb-3" />
        <Skeleton className="h-10 md:h-12 lg:h-14 w-1/2 max-w-md mb-8" />
        <Skeleton className="w-52 h-12 rounded-full mt-2" />
      </div>

      {/* Curved 3D Carousel Silhouette Arc */}
      <div className="-mx-4 md:-mx-6 lg:-mx-8 my-8 md:my-14 overflow-hidden">
        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-5 px-4 h-[180px] sm:h-[260px] md:h-[320px] lg:h-[350px]">
          {/* Card 1 - Outer Left (Desktop) */}
          <div className="hidden xl:block w-[130px] h-[170px] rounded-[18px] shrink-0 transform -rotate-6 opacity-40">
            <Skeleton className="w-full h-full rounded-[18px]" />
          </div>
          {/* Card 2 - Left (Tablet/Desktop) */}
          <div className="hidden md:block w-[145px] h-[190px] lg:w-[155px] lg:h-[205px] rounded-[18px] shrink-0 transform -rotate-3 opacity-60">
            <Skeleton className="w-full h-full rounded-[18px]" />
          </div>
          {/* Card 3 - Mid-Left */}
          <div className="w-[90px] h-[115px] sm:w-[130px] sm:h-[165px] md:w-[160px] md:h-[210px] rounded-[12px] md:rounded-[18px] shrink-0 opacity-80">
            <Skeleton className="w-full h-full rounded-[12px] md:rounded-[18px]" />
          </div>
          {/* Card 4 - Center Highlighted */}
          <div className="w-[100px] h-[130px] sm:w-[150px] sm:h-[195px] md:w-[185px] md:h-[240px] rounded-[14px] md:rounded-[20px] shrink-0 shadow-lg ring-2 ring-emerald-500/20">
            <Skeleton className="w-full h-full rounded-[14px] md:rounded-[20px]" />
          </div>
          {/* Card 5 - Mid-Right */}
          <div className="w-[90px] h-[115px] sm:w-[130px] sm:h-[165px] md:w-[160px] md:h-[210px] rounded-[12px] md:rounded-[18px] shrink-0 opacity-80">
            <Skeleton className="w-full h-full rounded-[12px] md:rounded-[18px]" />
          </div>
          {/* Card 6 - Right (Tablet/Desktop) */}
          <div className="hidden md:block w-[145px] h-[190px] lg:w-[155px] lg:h-[205px] rounded-[18px] shrink-0 transform rotate-3 opacity-60">
            <Skeleton className="w-full h-full rounded-[18px]" />
          </div>
          {/* Card 7 - Outer Right (Desktop) */}
          <div className="hidden xl:block w-[130px] h-[170px] rounded-[18px] shrink-0 transform rotate-6 opacity-40">
            <Skeleton className="w-full h-full rounded-[18px]" />
          </div>
        </div>
      </div>

      {/* 3-Column Features Bar */}
      <div className="mt-4 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 divide-y md:divide-y-0 md:divide-x divide-slate-200">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex flex-col items-center text-center px-6 pt-6 md:pt-0">
            <Skeleton className="w-36 h-5 mb-3" />
            <Skeleton className="w-full h-3 mb-1.5" />
            <Skeleton className="w-4/5 h-3" />
          </div>
        ))}
      </div>
    </section>
  );
}
