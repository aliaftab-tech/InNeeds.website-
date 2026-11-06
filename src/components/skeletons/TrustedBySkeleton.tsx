import { Skeleton } from "@/components/ui/skeleton";

/**
 * TrustedBySkeleton
 * Marquee strip skeleton with caption bar, side gradient masks, and 5 brand logo placeholders.
 */
export function TrustedBySkeleton() {
  return (
    <section className="py-16 bg-white overflow-hidden relative border-t border-slate-100">
      {/* Caption Bar */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 mb-12">
        <Skeleton className="w-64 h-3.5 mx-auto" />
      </div>

      {/* Gradient Fade Masks */}
      <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Logo Placeholders Strip */}
      <div className="flex gap-12 md:gap-24 lg:gap-32 px-8 md:px-16 items-center justify-center opacity-60 py-4 overflow-hidden">
        <Skeleton className="w-24 h-8 shrink-0 rounded-md" />
        <Skeleton className="w-28 h-8 shrink-0 rounded-md" />
        <div className="flex items-center gap-2 shrink-0">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-28 h-7 rounded-md" />
        </div>
        <Skeleton className="w-40 h-8 shrink-0 rounded-md" />
        <div className="flex items-center gap-2 shrink-0">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-28 h-7 rounded-md" />
        </div>
      </div>
    </section>
  );
}
