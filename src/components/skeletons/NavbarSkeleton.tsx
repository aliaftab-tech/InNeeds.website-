import { Skeleton } from "@/components/ui/skeleton";

/**
 * NavbarSkeleton
 * Replicates the sticky top navigation bar (h-[72px], max-w-[1700px]) with mobile/desktop placeholders.
 */
export function NavbarSkeleton() {
  return (
    <nav className="w-full z-50 sticky top-0 bg-white border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="mx-auto max-w-[1700px] px-6 py-4 lg:px-12 flex items-center justify-between h-[72px]">
        {/* Mobile Search Icon Placeholder (Left) */}
        <div className="lg:hidden flex-1 flex justify-start">
          <Skeleton className="w-6 h-6 rounded-md" />
        </div>

        {/* Desktop Left Links */}
        <div className="hidden lg:flex items-center gap-8 flex-1 justify-start">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Center Brand / Logo */}
        <div className="flex justify-center flex-shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <div className="flex items-center gap-2 lg:gap-3">
            <Skeleton className="w-10 h-10 lg:w-14 lg:h-14 rounded-full" />
            <Skeleton className="w-28 lg:w-32 h-7 lg:h-8 rounded-md" />
          </div>
        </div>

        {/* Desktop Right Links & Sign In Button */}
        <div className="hidden lg:flex items-center gap-4 lg:gap-6 flex-1 justify-end">
          <div className="flex items-center gap-8 mr-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="w-5 h-5 rounded-md" />
          <Skeleton className="w-24 h-10 rounded-full" />
        </div>

        {/* Mobile Hamburger Menu Placeholder (Right) */}
        <div className="lg:hidden flex-1 flex justify-end">
          <Skeleton className="w-7 h-7 rounded-md" />
        </div>
      </div>
    </nav>
  );
}
