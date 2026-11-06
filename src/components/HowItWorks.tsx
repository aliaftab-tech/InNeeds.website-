"use client";

import Image from "next/image";
import {
  ShieldCheck,
  Lightbulb,
  Pencil,
  Landmark
} from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="bg-[#f6f9f6] pb-12 sm:pb-16 md:pb-20 border-b border-[#e2eae3] relative overflow-hidden" id="how-it-works">

      {/* ================= TOP DEEP DOME ARCH DIVIDER ================= */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none -mt-px">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 sm:h-16 md:h-20 lg:h-24 block"
          preserveAspectRatio="none"
        >
          {/* White cutout from upper section (corners tilt steeply downwards) */}
          <path d="M 0,0 L 0,95 A 720 90 0 0 1 1440,95 L 1440,0 Z" fill="#ffffff" />
          {/* Defined lightgrey dome arch border */}
          <path d="M 0,95 A 720 90 0 0 1 1440,95" stroke="#e2eae3" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* ================= HERO BANNER CONTAINER WITH RESPONSIVE SIDES BADGES ================= */}
      <div className="relative max-w-5xl mx-auto px-12 sm:px-16 md:px-20 text-center z-10 pt-2 sm:pt-4 md:pt-6 pb-4">

        {/* --- LEFT BADGES (VISIBLE ON MOBILE & DESKTOP) --- */}

        {/* 1. TOP-LEFT BADGE: "CHANGE THE WORLD" */}
        <div className="absolute top-1 left-0 sm:left-2 md:left-4 rotate-[-10deg] hover:rotate-0 transition-transform duration-300 drop-shadow-md select-none pointer-events-none">
          <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-22 lg:h-22 rounded-full bg-[#1b3b27] border-[1.5px] sm:border-2 border-[#32a338] p-0.5 sm:p-1 flex items-center justify-center relative shadow-md">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path id="curve-tl" d="M 15 50 A 35 35 0 0 1 85 50" fill="none" />
              <text className="text-[7.5px] font-black fill-emerald-200 uppercase tracking-[0.18em]">
                <textPath href="#curve-tl" startOffset="50%" textAnchor="middle">
                  Change The World
                </textPath>
              </text>
              <circle cx="50" cy="42" r="11" fill="#f97316" />
              <polygon points="25,75 50,48 75,75" fill="#0f2618" />
              <polygon points="45,75 62,56 80,75" fill="#143320" />
              <polygon points="42,57 50,48 58,57 54,60 50,58 46,60" fill="#ffffff" opacity="0.9" />
            </svg>
          </div>
        </div>

        {/* 2. BOTTOM-LEFT BADGE: "PUT PEOPLE FIRST" */}
        <div className="absolute bottom-2 left-0 sm:left-2 md:left-4 rotate-[12deg] hover:rotate-0 transition-transform duration-300 drop-shadow-md select-none pointer-events-none">
          <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-22 lg:h-22 rounded-full bg-[#1c221e] border-[1.5px] sm:border-2 border-[#eab308] p-0.5 sm:p-1 flex items-center justify-center relative shadow-md">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path id="curve-bl" d="M 15 50 A 35 35 0 0 1 85 50" fill="none" />
              <text className="text-[7px] font-black fill-amber-300 uppercase tracking-[0.2em]">
                <textPath href="#curve-bl" startOffset="50%" textAnchor="middle">
                  Put People First
                </textPath>
              </text>
              <circle cx="50" cy="56" r="22" fill="#facc15" />
              <path d="M 32 75 C 32 68 40 64 50 64 C 60 64 68 68 68 75 Z" fill="#141815" />
              <polygon points="48,58 50,48 52,58" fill="#141815" />
              <polygon points="44,61 46,52 48,61" fill="#141815" />
              <polygon points="52,61 54,52 56,61" fill="#141815" />
            </svg>
          </div>
        </div>

        {/* --- RIGHT BADGES (VISIBLE ON MOBILE & DESKTOP) --- */}

        {/* 3. TOP-RIGHT BADGE: "TRANSPARENT GIVING" */}
        <div className="absolute top-1 right-0 sm:right-2 md:right-4 rotate-[14deg] hover:rotate-0 transition-transform duration-300 drop-shadow-md select-none pointer-events-none">
          <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-22 lg:h-22 rounded-full bg-[#13302b] border-[1.5px] sm:border-2 border-[#38bdf8] p-0.5 sm:p-1 flex items-center justify-center relative shadow-md">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path id="curve-tr" d="M 15 50 A 35 35 0 0 1 85 50" fill="none" />
              <text className="text-[7px] font-black fill-sky-200 uppercase tracking-[0.18em]">
                <textPath href="#curve-tr" startOffset="50%" textAnchor="middle">
                  Transparent Giving
                </textPath>
              </text>
              <path d="M 35 72 L 40 56 Q 50 54 60 56 L 65 72 Q 50 75 35 72 Z" fill="#d97706" />
              <ellipse cx="50" cy="56" rx="10" ry="3" fill="#f59e0b" />
              <path d="M 50 56 Q 44 44 38 42 Q 46 44 50 56" fill="#22c55e" />
              <path d="M 50 56 Q 56 42 62 44 Q 54 46 50 56" fill="#16a34a" />
            </svg>
          </div>
        </div>

        {/* 4. MIDDLE-RIGHT BADGE: "100% AUDITABLE" */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-1 md:right-3 rotate-[-8deg] hover:rotate-0 transition-transform duration-300 drop-shadow-md select-none pointer-events-none">
          <div className="w-10 h-10 sm:w-13 sm:h-13 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-full bg-[#202720] border-[1.5px] sm:border-2 border-[#86efac] p-0.5 sm:p-1 flex items-center justify-center relative shadow-md">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path id="curve-mr" d="M 15 50 A 35 35 0 0 1 85 50" fill="none" />
              <text className="text-[6.5px] font-black fill-emerald-300 uppercase tracking-[0.2em]">
                <textPath href="#curve-mr" startOffset="50%" textAnchor="middle">
                  100% Auditable
                </textPath>
              </text>
              <path d="M 50 32 L 66 38 V 52 C 66 62 50 70 50 70 C 50 70 34 62 34 52 V 38 Z" fill="#15803d" />
              <path d="M 44 50 L 48 54 L 57 44" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        </div>

        {/* 5. BOTTOM-RIGHT BADGE: "WORK TOGETHER" */}
        <div className="absolute bottom-2 right-0 sm:right-2 md:right-4 rotate-[8deg] hover:rotate-0 transition-transform duration-300 drop-shadow-md select-none pointer-events-none">
          <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-22 lg:h-22 rounded-full bg-[#1f2824] border-[1.5px] sm:border-2 border-[#f87171] p-0.5 sm:p-1 flex items-center justify-center relative shadow-md">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path id="curve-br" d="M 15 50 A 35 35 0 0 1 85 50" fill="none" />
              <text className="text-[7.5px] font-black fill-rose-200 uppercase tracking-[0.18em]">
                <textPath href="#curve-br" startOffset="50%" textAnchor="middle">
                  Work Together
                </textPath>
              </text>
              <circle cx="42" cy="50" r="7" fill="#f87171" />
              <circle cx="58" cy="50" r="7" fill="#38bdf8" />
              <path d="M 32 72 Q 42 60 50 60 Q 58 60 68 72 Z" fill="#334155" />
            </svg>
          </div>
        </div>

        {/* --- CENTER TEXT CONTENT --- */}
        <div className="max-w-2xl mx-auto">
          {/* Balanced Headline (Crisp on Mobile & Desktop) */}
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-[3.25rem] font-black text-[#141414] tracking-tight uppercase leading-[1.12]">
            Fundraising on InNeeds. <br />
            Easy, Powerful, and Trusted.
          </h2>

          {/* Clean Subheading */}
          <p className="mt-3 sm:mt-4 md:mt-5 text-slate-600 text-xs sm:text-sm md:text-base font-medium max-w-lg mx-auto leading-relaxed">
            We are on a mission to make transparent giving effortless. Create your fundraiser, rally compassionate donors, and track every single dollar directly to the cause.
          </p>
        </div>

      </div>

      {/* ================= COMPACT SCROLLING 3 STEPS ================= */}
      <div className="max-w-[1250px] mx-auto px-6 lg:px-12 mt-10 md:mt-14 pt-8 md:pt-12 border-t border-[#e2eae3] relative z-10 space-y-8 md:space-y-12">

        {/* ---------------- STEP 01: CREATE IN MINUTES ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="w-7 h-7 rounded-full bg-[#22c55e] text-slate-950 font-black text-xs flex items-center justify-center mb-3 shadow-sm">
              01
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-[#141414] leading-[1.08] tracking-tight mb-2.5">
              Use our tools to create your fundraiser
            </h3>
            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed max-w-sm">
              You’ll be guided by prompts to add fundraiser details and set your goal. Make updates anytime.
            </p>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-black/10 h-[260px] sm:h-[300px] md:h-[330px] bg-slate-900 group">
              <Image
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
                alt="Scenic Meadow"
                fill
                className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/25"></div>

              {/* Exact Card 1 Mockup */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-5 shadow-[0_16px_40px_rgba(0,0,0,0.3)] w-full max-w-[310px] space-y-3 anim-float-card transition-all duration-300 hover:shadow-2xl">

                  {/* Title */}
                  <div className="text-sm font-black text-slate-900 tracking-tight">
                    Set your starting goal
                  </div>

                  {/* Goal Input Field */}
                  <div className="border border-slate-200 rounded-xl p-2.5 flex items-center gap-2 bg-white shadow-inner">
                    <span className="font-black text-slate-900 text-sm">$</span>
                    <div className="w-24 h-3 bg-slate-200/90 rounded-full"></div>
                  </div>

                  {/* Dark Forest Green Tip Box */}
                  <div className="bg-[#1b3d27] text-white rounded-2xl p-3.5 text-center flex flex-col items-center justify-center shadow-md">
                    <Lightbulb className="w-4 h-4 text-[#86efac] mb-1.5" />
                    <p className="text-xs font-semibold text-emerald-50 leading-snug">
                      Fundraisers like yours typically aim to raise $2,000 or more
                    </p>
                  </div>

                  {/* Skeleton Lines */}
                  <div className="space-y-1.5 pt-0.5">
                    <div className="w-28 h-2 bg-slate-200/80 rounded-full"></div>
                    <div className="w-16 h-2 bg-slate-200/50 rounded-full"></div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- STEP 02: REACH DONORS BY SHARING ---------------- */}
        <div className="pt-8 md:pt-10 border-t border-[#e2eae3] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="w-7 h-7 rounded-full bg-[#22c55e] text-slate-950 font-black text-xs flex items-center justify-center mb-3 shadow-sm">
              02
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-[#141414] leading-[1.08] tracking-tight mb-2.5">
              Reach donors by sharing
            </h3>
            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed max-w-sm">
              Share your fundraiser link and use the resources in your dashboard to gain momentum.
            </p>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-black/10 h-[260px] sm:h-[300px] md:h-[330px] bg-slate-900 group">
              <Image
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80"
                alt="Scenic Mountain"
                fill
                className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/25"></div>

              {/* Exact Image 2 Card Asset Floating in 3D */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="relative w-[260px] sm:w-[285px] md:w-[305px] aspect-[509/519] anim-float-card filter drop-shadow-[0_16px_35px_rgba(0,0,0,0.4)] hover:scale-105 transition-all duration-300">
                  <Image
                    src="/social-share-transparent.png"
                    alt="Ready to share"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- STEP 03: SECURE TRANSFERS ---------------- */}
        <div className="pt-8 md:pt-10 border-t border-[#e2eae3] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="w-7 h-7 rounded-full bg-[#22c55e] text-slate-950 font-black text-xs flex items-center justify-center mb-3 shadow-sm">
              03
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-[#141414] leading-[1.08] tracking-tight mb-2.5">
              Securely receive funds
            </h3>
            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed max-w-sm">
              Add your bank information, or invite your fundraiser beneficiary to add theirs, and start receiving funds.
            </p>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-black/10 h-[260px] sm:h-[300px] md:h-[330px] bg-slate-900 group">
              <Image
                src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80"
                alt="Scenic Nature"
                fill
                className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/25"></div>

              {/* Exact Card 3 Mockup */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-5 shadow-[0_16px_40px_rgba(0,0,0,0.3)] w-full max-w-[310px] space-y-3 anim-float-card transition-all duration-300 hover:shadow-2xl">

                  {/* Header: Transfers + Daily Pencil */}
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 text-sm">Transfers</span>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-2 bg-slate-200/80 rounded-full"></div>
                      <div className="text-[10px] font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <span>Daily</span>
                        <Pencil className="w-2.5 h-2.5 text-slate-500" />
                      </div>
                    </div>
                  </div>

                  {/* Lime/Neon Green Expected Box */}
                  <div className="bg-[#B7F498] rounded-2xl p-3 text-slate-950 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border border-slate-900/30 flex items-center justify-center">
                        <ShieldCheck className="w-3.5 h-3.5 text-slate-900" />
                      </div>
                      <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-950">$1,500</span>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] font-extrabold uppercase tracking-wider text-slate-700">Expected</div>
                      <div className="text-xs font-black text-slate-900">Nov 6</div>
                    </div>
                  </div>

                  {/* Bank Account */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center justify-between shadow-inner">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-slate-700" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">•••• 6720</div>
                        <div className="text-[10px] text-slate-500 font-medium">Bank account</div>
                      </div>
                    </div>
                    <Pencil className="w-3 h-3 text-slate-400" />
                  </div>

                  {/* Activity Placeholder */}
                  <div className="pt-0.5">
                    <div className="text-xs font-black text-slate-800 mb-1">Activity</div>
                    <div className="flex items-center justify-between">
                      <div className="w-20 h-2 bg-slate-200 rounded-full"></div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-slate-600">$</span>
                        <div className="w-8 h-2 bg-slate-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
