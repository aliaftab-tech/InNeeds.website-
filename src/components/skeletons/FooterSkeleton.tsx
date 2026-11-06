import { Skeleton } from "@/components/ui/skeleton";

/**
 * FooterSkeleton
 * Dark (#0b291a) background container with newsletter form, 5 columns of link lists, and bottom copyright/payment bar.
 */
export function FooterSkeleton() {
  return (
    <footer className="bg-[#0b291a] text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
        {/* Newsletter Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12">
          <div className="mb-6 lg:mb-0 text-center lg:text-left">
            <Skeleton variant="dark" className="w-72 h-8 mb-2" />
            <Skeleton variant="dark" className="w-96 max-w-full h-4" />
          </div>
          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <Skeleton
              variant="dark"
              className="w-full sm:w-[300px] h-12 rounded-full"
            />
            <Skeleton
              variant="dark"
              className="w-36 h-12 rounded-full bg-[#c0f058]/30"
            />
          </div>
        </div>

        {/* Divider */}
        <hr className="border-white/10 mb-12" />

        {/* 5 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-8 md:gap-x-12 lg:gap-8 mb-16">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <div className="flex items-center gap-2 mb-6">
              <Skeleton variant="dark" className="w-10 h-10 rounded-full" />
              <Skeleton variant="dark" className="w-24 h-7" />
            </div>
            <Skeleton variant="dark" className="w-48 h-3.5 mb-2" />
            <Skeleton variant="dark" className="w-40 h-3.5 mb-8" />

            {/* Social Icons */}
            <div className="flex items-center gap-3 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  variant="dark"
                  className="w-10 h-10 rounded-full"
                />
              ))}
            </div>

            {/* App Store Badges */}
            <div className="flex gap-3">
              <Skeleton variant="dark" className="w-24 h-10 rounded-lg" />
              <Skeleton variant="dark" className="w-24 h-10 rounded-lg" />
            </div>
          </div>

          {/* Columns 2-5: Link Sections */}
          {[
            { title: "Explore", rows: 3 },
            { title: "Get Involved", rows: 4 },
            { title: "Company", rows: 4 },
            { title: "Legal", rows: 4 },
          ].map((col, index) => (
            <div key={index} className="space-y-4">
              <Skeleton variant="dark" className="w-24 h-4 mb-6" />
              {Array.from({ length: col.rows }).map((_, rIdx) => (
                <Skeleton
                  key={rIdx}
                  variant="dark"
                  className="w-28 h-3.5 mb-3"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <Skeleton variant="dark" className="w-48 h-3.5" />
          <div className="flex items-center gap-6">
            <Skeleton variant="dark" className="w-32 h-4" />
            <Skeleton variant="dark" className="w-16 h-5" />
          </div>
        </div>
      </div>
    </footer>
  );
}
