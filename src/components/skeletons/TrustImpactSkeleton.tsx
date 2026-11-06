import { Skeleton } from "@/components/ui/skeleton";

/**
 * TrustImpactSkeleton
 * Dark green (#0b291a) background container with verified badge, headline, and 3 circular dial placeholders.
 */
export function TrustImpactSkeleton() {
  return (
    <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-[#0b291a] flex flex-col items-center justify-center text-center px-6">
      {/* Pill Badge */}
      <Skeleton
        variant="dark"
        className="w-44 h-7 rounded-sm mb-6 bg-white/10"
      />

      {/* Main Heading */}
      <Skeleton
        variant="dark"
        className="h-10 md:h-12 lg:h-14 w-3/4 max-w-3xl mb-3 bg-white/15"
      />
      <Skeleton
        variant="dark"
        className="h-10 md:h-12 lg:h-14 w-1/2 max-w-xl mb-6 bg-white/15"
      />

      {/* Subtext */}
      <Skeleton
        variant="dark"
        className="h-4 w-full max-w-2xl mb-2.5 bg-white/10"
      />
      <Skeleton
        variant="dark"
        className="h-4 w-3/4 max-w-xl mb-16 lg:mb-20 bg-white/10"
      />

      {/* 3 Circular Stat Dials */}
      <div className="flex flex-row justify-center items-start gap-4 md:gap-24 lg:gap-32 w-full max-w-[1200px]">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center text-center">
            {/* Circular Dial Ring */}
            <div className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mb-4 md:mb-6 animate-pulse">
              <Skeleton
                variant="dark"
                className="w-10 h-6 md:w-16 md:h-10 bg-white/15"
              />
            </div>
            {/* Label below */}
            <Skeleton
              variant="dark"
              className="w-24 md:w-32 h-3.5 mb-1.5 bg-white/10"
            />
            <Skeleton
              variant="dark"
              className="w-16 md:w-24 h-3.5 bg-white/10"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
