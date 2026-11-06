import Image from "next/image";
import Link from "next/link";

export default function ShowcaseBento() {
  return (
    <section className="py-24 bg-white w-full overflow-hidden">
      {/* CARDS CONTAINER */}
      <div className="relative z-10 mx-auto mt-20 flex flex-row items-end justify-start xl:justify-center gap-4 md:gap-6 w-full max-w-[1800px] px-4 md:px-8 xl:px-12 pb-12 overflow-x-auto xl:overflow-visible snap-x snap-mandatory">
        {/* FAR LEFT STACK */}
        <div className="flex flex-col gap-6 shrink-0 w-[260px] xl:w-[280px] 2xl:w-[320px] mx-auto xl:mx-0 snap-center">
          {/* Top Dark Green */}
          <div className="relative aspect-[4/5] bg-[#0d472c] rounded-[2rem] rounded-tr-[4rem] p-6 2xl:p-8 flex flex-col justify-between text-white shadow-xl">
            <div>
              <h3 className="text-3xl 2xl:text-4xl font-bold mb-3 2xl:mb-4 leading-tight">
                7 categories.
                <br />
                One verified platform.
              </h3>
              <p className="text-xs 2xl:text-sm text-white/80 leading-relaxed font-light">
                From education and healthcare to emergency relief — every cause on InNeeds is verified before it reaches
                a donor.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs 2xl:text-sm font-semibold tracking-wide">Donate now</span>
              <button
                className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-full bg-[#c0f058] flex items-center justify-center text-black hover:scale-105 transition-transform"
                aria-label="Donate now"
              >
                <svg className="w-4 h-4 2xl:w-5 2xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 19L19 5M19 5v10M19 5h-10" />
                </svg>
              </button>
            </div>
          </div>

          {/* Bottom Black Box */}
          <Link
            href="/apply"
            className="relative h-[100px] 2xl:h-[120px] bg-[#1a1a1a] rounded-[2rem] p-5 2xl:p-6 flex items-center gap-4 shadow-xl text-white hover:bg-black transition-colors group"
          >
            <svg
              className="w-8 h-8 2xl:w-10 2xl:h-10 text-white/80 shrink-0 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm 2xl:text-base font-medium leading-tight">
              Need help?
              <br />
              Apply for support
            </span>
          </Link>
        </div>

        {/* LEFT TALL BOX */}
        <div className="relative w-[280px] xl:w-[320px] 2xl:w-[360px] aspect-[9/12] bg-slate-200 rounded-[2.5rem] rounded-tl-[4rem] overflow-hidden shadow-2xl shrink-0 p-8 flex flex-col justify-end text-white mx-auto xl:mx-0 snap-center">
          <Image
            src="/student.jpg"
            alt="Student studying"
            fill
            sizes="(max-width: 1280px) 280px, (max-width: 1536px) 320px, 360px"
            className="object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/20 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
          <div className="relative z-20">
            <span className="text-sm 2xl:text-base font-medium opacity-90 ml-1">Education</span>
            <h3 className="text-2xl 2xl:text-3xl font-semibold leading-tight mt-2">
              Support a child&apos;s
              <br />
              education
            </h3>
          </div>
        </div>

        {/* CENTER BOX */}
        <div className="relative w-[240px] xl:w-[280px] 2xl:w-[320px] aspect-[1/1.05] bg-[#dce3de] rounded-[3rem] shadow-2xl shrink-0 p-8 2xl:p-10 flex flex-col justify-end mx-auto xl:mx-0 mt-16 xl:mt-0 snap-center">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 2xl:w-28 2xl:h-28 bg-white rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.1)] cursor-pointer hover:scale-105 transition-transform z-20 group">
            <svg
              className="w-8 h-8 2xl:w-10 2xl:h-10 text-slate-800 ml-2 group-hover:text-emerald-600 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>

          <h3 className="text-3xl 2xl:text-4xl font-bold text-slate-900 mb-8 text-center leading-tight tracking-tight">
            How InNeeds
            <br />
            verifies every cause
          </h3>
          <div className="flex items-center justify-between text-slate-900 px-2">
            <span className="text-[11px] 2xl:text-xs font-bold text-slate-700 tracking-wide uppercase">
              Watch how it works
            </span>
            <button
              className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white hover:scale-105 transition-transform"
              aria-label="Play video"
            >
              <svg className="w-4 h-4 2xl:w-5 2xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 19L19 5M19 5v10M19 5h-10" />
              </svg>
            </button>
          </div>
        </div>

        {/* RIGHT TALL BOX */}
        <div className="relative w-[280px] xl:w-[320px] 2xl:w-[360px] aspect-[9/12] bg-slate-200 rounded-[2.5rem] rounded-tl-[4rem] overflow-hidden shadow-2xl shrink-0 p-8 flex flex-col justify-end text-white mx-auto xl:mx-0 snap-center">
          <Image
            src="/emergency.jpg"
            alt="Emergency assistance"
            fill
            sizes="(max-width: 1280px) 280px, (max-width: 1536px) 320px, 360px"
            className="object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/20 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
          <div className="relative z-20">
            <span className="text-sm 2xl:text-base font-medium opacity-90 ml-1">Emergency Assistance</span>
            <h3 className="text-2xl 2xl:text-3xl font-semibold leading-tight mt-2">
              Urgent relief for
              <br />
              families in crisis
            </h3>
          </div>
        </div>

        {/* FAR RIGHT STACK */}
        <div className="flex flex-col gap-6 shrink-0 w-[260px] xl:w-[280px] 2xl:w-[320px] mx-auto xl:mx-0 snap-center">
          {/* Top Light Green */}
          <div className="relative aspect-[4/5] bg-[#c0f058] rounded-[2rem] rounded-tl-[4rem] overflow-hidden shadow-xl p-6 2xl:p-8 flex flex-col justify-between">
            <Image
              src="/hands.jpg"
              alt="Hands reaching"
              fill
              sizes="(max-width: 1280px) 260px, (max-width: 1536px) 280px, 320px"
              className="object-cover mix-blend-luminosity opacity-[0.85] z-0 grayscale"
            />

            <h3 className="text-2xl 2xl:text-3xl font-bold text-[#0d472c] leading-tight relative z-20">
              Explore all
              <br />
              categories
            </h3>

            <Link
              href="/campaigns"
              className="relative z-20 flex items-center justify-between text-[#0d472c] bg-white/30 backdrop-blur-md p-3 2xl:p-4 -mx-2 -mb-2 rounded-2xl hover:bg-white/40 transition-colors group"
            >
              <span className="text-[11px] 2xl:text-xs font-bold tracking-wide uppercase">Explore more</span>
              <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#c0f058] group-hover:scale-105 transition-transform">
                <svg className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 19L19 5M19 5v10M19 5h-10" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Bottom Dark Green Box */}
          <Link
            href="/partner"
            className="relative h-[100px] 2xl:h-[120px] bg-[#1e3427] rounded-[2rem] p-5 2xl:p-6 flex items-center gap-3 2xl:gap-4 shadow-xl text-white hover:bg-[#16271c] transition-colors group"
          >
            <svg
              className="w-8 h-8 2xl:w-10 2xl:h-10 text-[#c0f058] shrink-0 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-sm 2xl:text-base font-medium leading-tight">
              Are you an NGO?
              <br />
              Partner with us
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
