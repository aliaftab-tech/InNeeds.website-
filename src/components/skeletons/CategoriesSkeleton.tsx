import { Skeleton } from "@/components/ui/skeleton";

/**
 * CategoriesSkeleton
 * Badge, headline, CTA button, and 3D cylindrical coverflow card strip silhouette.
 */
export function CategoriesSkeleton() {
  return (
    <section className="py-24 bg-white border-t border-slate-100 overflow-x-clip" id="categories">
      {/* Header & CTA */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 mb-12 text-center flex flex-col items-center">
        <Skeleton className="w-36 h-6 rounded-sm mb-4 bg-emerald-100/80" />
        <Skeleton className="w-80 max-w-full h-10 md:h-12 mb-4" />
        <Skeleton className="w-full max-w-lg h-4 mb-2" />
        <Skeleton className="w-4/5 max-w-md h-4 mb-8" />
        <Skeleton className="w-48 h-12 rounded-full" />
      </div>

      {/* 3D Coverflow Card Strip Silhouette */}
      <div className="-mx-4 md:-mx-6 lg:-mx-8 overflow-hidden py-4">
        <div className="flex items-center justify-center gap-3 md:gap-6 px-4 h-[250px] sm:h-[300px] md:h-[380px] lg:h-[400px]">
          {/* Far Outer Left */}
          <div className="hidden 2xl:block w-[180px] h-[260px] rounded-[24px] shrink-0 opacity-30">
            <Skeleton className="w-full h-full rounded-[24px]" />
          </div>
          {/* Outer Left */}
          <div className="hidden xl:block w-[200px] h-[290px] rounded-[24px] shrink-0 opacity-50">
            <Skeleton className="w-full h-full rounded-[24px]" />
          </div>
          {/* Mid Left */}
          <div className="hidden md:block w-[220px] h-[320px] rounded-[24px] shrink-0 opacity-70">
            <Skeleton className="w-full h-full rounded-[24px]" />
          </div>
          {/* Center Card */}
          <div className="w-[180px] h-[250px] sm:w-[220px] sm:h-[300px] md:w-[260px] md:h-[360px] rounded-[20px] md:rounded-[24px] shrink-0 shadow-2xl">
            <Skeleton className="w-full h-full rounded-[20px] md:rounded-[24px]" />
          </div>
          {/* Mid Right */}
          <div className="hidden md:block w-[220px] h-[320px] rounded-[24px] shrink-0 opacity-70">
            <Skeleton className="w-full h-full rounded-[24px]" />
          </div>
          {/* Outer Right */}
          <div className="hidden xl:block w-[200px] h-[290px] rounded-[24px] shrink-0 opacity-50">
            <Skeleton className="w-full h-full rounded-[24px]" />
          </div>
          {/* Far Outer Right */}
          <div className="hidden 2xl:block w-[180px] h-[260px] rounded-[24px] shrink-0 opacity-30">
            <Skeleton className="w-full h-full rounded-[24px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
