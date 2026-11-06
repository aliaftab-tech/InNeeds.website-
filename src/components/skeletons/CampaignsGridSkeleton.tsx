import { Skeleton } from "@/components/ui/skeleton";

/**
 * CampaignsGridSkeleton
 * Asymmetric 4-card bento grid (2 wide md:col-span-2, 2 square md:col-span-1) with progress bars and filter pills.
 */
export function CampaignsGridSkeleton() {
  return (
    <section className="py-24 bg-white" id="campaigns">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header Controls */}
        <div className="flex flex-col mb-12 gap-8">
          <Skeleton className="w-3/4 max-w-2xl h-8 md:h-10 rounded-lg" />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Skeleton className="w-48 h-10 rounded-full" />
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
          </div>
        </div>

        {/* 4-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - Top Left (Wide md:col-span-2) */}
          <div className="md:col-span-2 relative rounded-[28px] overflow-hidden min-h-[220px] md:min-h-[280px] lg:min-h-[300px] bg-slate-200/90 p-4 md:p-6 lg:p-8 flex flex-col justify-between shadow-lg">
            <div className="flex justify-between items-start">
              <Skeleton className="w-20 h-6 rounded-full bg-white/40" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end gap-4">
                <div className="max-w-xl space-y-2">
                  <Skeleton className="w-20 h-3 rounded bg-emerald-700/20" />
                  <Skeleton className="w-3/4 max-w-md h-6 rounded bg-slate-300/90" />
                  <Skeleton className="w-full max-w-lg h-3.5 rounded" />
                </div>
                <Skeleton className="w-10 h-10 rounded-full shrink-0 bg-white/60" />
              </div>
              <div className="space-y-2">
                <Skeleton className="w-full h-1.5 rounded-full bg-white/40" />
                <div className="flex justify-between">
                  <Skeleton className="w-20 h-3 rounded" />
                  <Skeleton className="w-14 h-3 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Top Right (Square md:col-span-1) */}
          <div className="md:col-span-1 relative rounded-[28px] overflow-hidden min-h-[220px] md:min-h-[280px] lg:min-h-[300px] bg-slate-200/90 p-4 md:p-6 flex flex-col justify-end shadow-lg space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Skeleton className="w-16 h-3 rounded bg-blue-600/20" />
                <Skeleton className="w-9 h-9 rounded-full bg-white/50" />
              </div>
              <Skeleton className="w-3/4 h-5 rounded bg-slate-300/90" />
              <Skeleton className="w-full h-3 rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="w-full h-1.5 rounded-full bg-white/40" />
              <div className="flex justify-between">
                <Skeleton className="w-16 h-3 rounded" />
                <Skeleton className="w-12 h-3 rounded" />
              </div>
            </div>
          </div>

          {/* Card 3 - Bottom Left (Square md:col-span-1) */}
          <div className="md:col-span-1 relative rounded-[28px] overflow-hidden min-h-[220px] md:min-h-[280px] lg:min-h-[300px] bg-slate-200/90 p-4 md:p-6 flex flex-col justify-end shadow-lg space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Skeleton className="w-16 h-3 rounded bg-amber-600/20" />
                <Skeleton className="w-9 h-9 rounded-full bg-white/50" />
              </div>
              <Skeleton className="w-3/4 h-5 rounded bg-slate-300/90" />
              <Skeleton className="w-full h-3 rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="w-full h-1.5 rounded-full bg-white/40" />
              <div className="flex justify-between">
                <Skeleton className="w-16 h-3 rounded" />
                <Skeleton className="w-12 h-3 rounded" />
              </div>
            </div>
          </div>

          {/* Card 4 - Bottom Right (Wide md:col-span-2) */}
          <div className="md:col-span-2 relative rounded-[28px] overflow-hidden min-h-[220px] md:min-h-[280px] lg:min-h-[300px] bg-slate-200/90 p-4 md:p-6 lg:p-8 flex flex-col justify-between shadow-lg">
            <div className="flex justify-between items-start">
              <Skeleton className="w-20 h-6 rounded-full bg-white/40" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end gap-4">
                <div className="max-w-xl space-y-2">
                  <Skeleton className="w-24 h-3 rounded bg-purple-700/20" />
                  <Skeleton className="w-3/4 max-w-md h-6 rounded bg-slate-300/90" />
                  <Skeleton className="w-full max-w-lg h-3.5 rounded" />
                </div>
                <Skeleton className="w-10 h-10 rounded-full shrink-0 bg-white/60" />
              </div>
              <div className="space-y-2">
                <Skeleton className="w-full h-1.5 rounded-full bg-white/40" />
                <div className="flex justify-between">
                  <Skeleton className="w-20 h-3 rounded" />
                  <Skeleton className="w-14 h-3 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View All CTA Button */}
        <div className="mt-12 flex justify-center md:hidden">
          <Skeleton className="w-52 h-12 rounded-full" />
        </div>
      </div>
    </section>
  );
}
