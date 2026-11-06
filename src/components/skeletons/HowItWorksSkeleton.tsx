import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * HowItWorksSkeleton
 * Light sage container (bg-[#f6f9f6]) with SVG arch divider, floating badge stamps, and 3-step grid rows.
 */
export function HowItWorksSkeleton() {
  const steps = [
    { num: "01", titleWidth: "w-4/5", subWidth: "w-3/5" },
    { num: "02", titleWidth: "w-3/4", subWidth: "w-2/3" },
    { num: "03", titleWidth: "w-4/5", subWidth: "w-1/2" },
  ];

  return (
    <section
      className="bg-[#f6f9f6] pb-12 sm:pb-16 md:pb-20 border-b border-[#e2eae3] relative overflow-hidden"
      id="how-it-works"
    >
      {/* Top Deep Dome Arch Divider */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none -mt-px">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 sm:h-16 md:h-20 lg:h-24 block"
          preserveAspectRatio="none"
        >
          <path
            d="M 0,0 L 0,95 A 720 90 0 0 1 1440,95 L 1440,0 Z"
            fill="#ffffff"
          />
          <path
            d="M 0,95 A 720 90 0 0 1 1440,95"
            stroke="#e2eae3"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Hero Banner Container with Floating Stamp Badges */}
      <div className="relative max-w-5xl mx-auto px-12 sm:px-16 md:px-20 text-center z-10 pt-2 sm:pt-4 md:pt-6 pb-4">
        {/* Floating Badges */}
        <Skeleton className="absolute top-1 left-0 sm:left-2 md:left-4 w-11 h-11 sm:w-14 sm:h-14 md:w-18 md:h-18 rounded-full opacity-40 bg-emerald-700/20" />
        <Skeleton className="absolute bottom-2 left-0 sm:left-2 md:left-4 w-11 h-11 sm:w-14 sm:h-14 md:w-18 md:h-18 rounded-full opacity-40 bg-amber-600/20" />
        <Skeleton className="absolute top-1 right-0 sm:right-2 md:right-4 w-11 h-11 sm:w-14 sm:h-14 md:w-18 md:h-18 rounded-full opacity-40 bg-sky-600/20" />
        <Skeleton className="absolute bottom-2 right-0 sm:right-2 md:right-4 w-11 h-11 sm:w-14 sm:h-14 md:w-18 md:h-18 rounded-full opacity-40 bg-slate-600/20" />

        {/* Center Text Header */}
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <Skeleton className="w-3/4 max-w-xl h-8 sm:h-10 md:h-12 mb-2.5" />
          <Skeleton className="w-1/2 max-w-md h-8 sm:h-10 md:h-12 mb-4" />
          <Skeleton className="w-full max-w-lg h-4 mb-2" />
          <Skeleton className="w-4/5 max-w-md h-4" />
        </div>
      </div>

      {/* 3 Steps Grid */}
      <div className="max-w-[1250px] mx-auto px-6 lg:px-12 mt-10 md:mt-14 pt-8 md:pt-12 border-t border-[#e2eae3] relative z-10 space-y-8 md:space-y-12">
        {steps.map((step, idx) => (
          <div
            key={step.num}
            className={cn(
              "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch",
              idx > 0 && "pt-8 md:pt-10 border-t border-[#e2eae3]"
            )}
          >
            {/* Left Column (Step info) */}
            <div className="lg:col-span-5 flex flex-col justify-between py-1 md:py-2 self-stretch">
              <div>
                <Skeleton className="w-7 h-7 rounded-full mb-3.5 bg-emerald-500/30" />
                <Skeleton className={cn("h-8 sm:h-10 md:h-11 mb-2.5", step.titleWidth)} />
                <Skeleton className={cn("h-8 sm:h-10 md:h-11 mb-6", step.subWidth)} />
              </div>
              <div className="space-y-2 mt-6 lg:mt-auto">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-4/5 h-4" />
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-black/10 h-[260px] sm:h-[300px] md:h-[330px] bg-slate-200/90 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl md:rounded-3xl p-5 shadow-xl w-full max-w-[310px] space-y-3">
                  <Skeleton className="w-36 h-4 mb-2" />
                  <Skeleton className="w-full h-10 rounded-xl bg-slate-100" />
                  <Skeleton className="w-full h-14 rounded-2xl bg-emerald-900/10" />
                  <div className="space-y-1.5 pt-1">
                    <Skeleton className="w-28 h-2" />
                    <Skeleton className="w-16 h-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
