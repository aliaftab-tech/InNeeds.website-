import { Skeleton } from "@/components/ui/skeleton";

/**
 * ShowcaseBentoSkeleton
 * 5-column cluster (far-left stack, left tall, center video card with play button, right tall, far-right stack)
 * replicating asymmetric corner radiuses (rounded-tr-[4rem], rounded-tl-[4rem]).
 */
export function ShowcaseBentoSkeleton() {
  return (
    <section className="py-24 bg-white w-full overflow-hidden">
      {/* 5-Column Cards Horizontal Flex/Scroll Strip */}
      <div className="relative z-10 mx-auto mt-20 flex flex-row items-end justify-start xl:justify-center gap-4 md:gap-6 w-full max-w-[1800px] px-4 md:px-8 xl:px-12 pb-12 overflow-x-auto xl:overflow-visible snap-x snap-mandatory">
        {/* 1. Far Left Stack */}
        <div className="flex flex-col gap-6 shrink-0 w-[260px] xl:w-[280px] 2xl:w-[320px] mx-auto xl:mx-0 snap-center">
          {/* Top Card (rounded-tr-[4rem]) */}
          <div className="relative aspect-[4/5] bg-slate-200/90 rounded-[2rem] rounded-tr-[4rem] p-6 2xl:p-8 flex flex-col justify-between shadow-xl animate-pulse">
            <div>
              <Skeleton className="w-4/5 h-8 mb-2 bg-slate-300/80" />
              <Skeleton className="w-3/5 h-8 mb-4 bg-slate-300/80" />
              <Skeleton className="w-full h-3 mb-1.5" />
              <Skeleton className="w-4/5 h-3" />
            </div>
            <div className="flex items-center justify-between mt-4">
              <Skeleton className="w-20 h-4 rounded" />
              <Skeleton className="w-10 h-10 rounded-full bg-[#c0f058]/40" />
            </div>
          </div>

          {/* Bottom Box */}
          <div className="relative h-[100px] 2xl:h-[120px] bg-slate-200/90 rounded-[2rem] p-5 2xl:p-6 flex items-center gap-4 shadow-xl animate-pulse">
            <Skeleton className="w-8 h-8 rounded-full shrink-0 bg-slate-300/80" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="w-24 h-4 rounded" />
              <Skeleton className="w-32 h-4 rounded" />
            </div>
          </div>
        </div>

        {/* 2. Left Tall Box (aspect-[9/12], rounded-tl-[4rem]) */}
        <div className="relative w-[280px] xl:w-[320px] 2xl:w-[360px] aspect-[9/12] bg-slate-200/90 rounded-[2.5rem] rounded-tl-[4rem] shadow-2xl shrink-0 p-8 flex flex-col justify-end mx-auto xl:mx-0 snap-center animate-pulse">
          <div className="space-y-2">
            <Skeleton className="w-20 h-4 rounded bg-slate-300/80" />
            <Skeleton className="w-3/4 h-7 rounded bg-slate-300/80" />
            <Skeleton className="w-1/2 h-7 rounded bg-slate-300/80" />
          </div>
        </div>

        {/* 3. Center Box (aspect-[1/1.05], rounded-[3rem] with top play button) */}
        <div className="relative w-[240px] xl:w-[280px] 2xl:w-[320px] aspect-[1/1.05] bg-slate-200/90 rounded-[3rem] shadow-2xl shrink-0 p-8 2xl:p-10 flex flex-col justify-end mx-auto xl:mx-0 mt-16 xl:mt-0 snap-center animate-pulse">
          {/* Floating Play Button */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 2xl:w-28 2xl:h-28 bg-white rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
            <Skeleton className="w-10 h-10 rounded-full bg-slate-300/80" />
          </div>

          <div className="mb-8 text-center space-y-2">
            <Skeleton className="w-3/4 h-7 mx-auto rounded bg-slate-300/80" />
            <Skeleton className="w-1/2 h-7 mx-auto rounded bg-slate-300/80" />
          </div>

          <div className="flex items-center justify-between px-2">
            <Skeleton className="w-28 h-3.5 rounded" />
            <Skeleton className="w-10 h-10 rounded-full bg-slate-300/80" />
          </div>
        </div>

        {/* 4. Right Tall Box (aspect-[9/12], rounded-tl-[4rem]) */}
        <div className="relative w-[280px] xl:w-[320px] 2xl:w-[360px] aspect-[9/12] bg-slate-200/90 rounded-[2.5rem] rounded-tl-[4rem] shadow-2xl shrink-0 p-8 flex flex-col justify-end mx-auto xl:mx-0 snap-center animate-pulse">
          <div className="space-y-2">
            <Skeleton className="w-24 h-4 rounded bg-slate-300/80" />
            <Skeleton className="w-3/4 h-7 rounded bg-slate-300/80" />
            <Skeleton className="w-1/2 h-7 rounded bg-slate-300/80" />
          </div>
        </div>

        {/* 5. Far Right Stack */}
        <div className="flex flex-col gap-6 shrink-0 w-[260px] xl:w-[280px] 2xl:w-[320px] mx-auto xl:mx-0 snap-center">
          {/* Top Card (rounded-tl-[4rem]) */}
          <div className="relative aspect-[4/5] bg-slate-200/90 rounded-[2rem] rounded-tl-[4rem] p-6 2xl:p-8 flex flex-col justify-between shadow-xl animate-pulse">
            <div className="space-y-2">
              <Skeleton className="w-3/4 h-8 rounded bg-slate-300/80" />
              <Skeleton className="w-1/2 h-8 rounded bg-slate-300/80" />
            </div>

            <div className="p-3 2xl:p-4 rounded-2xl bg-white/40 flex items-center justify-between">
              <Skeleton className="w-24 h-3.5 rounded" />
              <Skeleton className="w-8 h-8 rounded-full bg-[#c0f058]/40" />
            </div>
          </div>

          {/* Bottom Dark Box */}
          <div className="relative h-[100px] 2xl:h-[120px] bg-slate-200/90 rounded-[2rem] p-5 2xl:p-6 flex items-center gap-3 2xl:gap-4 shadow-xl animate-pulse">
            <Skeleton className="w-8 h-8 rounded-full shrink-0 bg-slate-300/80" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="w-24 h-4 rounded" />
              <Skeleton className="w-32 h-4 rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
