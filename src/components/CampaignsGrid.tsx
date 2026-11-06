"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ShieldCheck,
  Target,
  Megaphone,
  Zap,
} from "lucide-react";

export default function CampaignsGrid() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <section className="py-24 bg-white" id="campaigns">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col mb-12 gap-8">
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-extrabold text-[#1a1a1a] tracking-tight leading-tight">
            Discover fundraisers inspired by what you care about
          </h2>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2.5 text-sm font-bold text-[#1a1a1a] hover:bg-gray-50 transition-colors"
              >
                Happening worldwide{" "}
                <ChevronDown
                  className={`w-4 h-4 text-[#1a1a1a] transition-transform duration-300 ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isFilterOpen && (
                <div className="absolute top-full left-0 mt-3 w-80 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 z-50 overflow-hidden transform-gpu origin-top-left transition-all duration-200">
                  <div className="p-3 flex flex-col gap-1">
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="flex items-start gap-4 p-3 hover:bg-[#f6f6f6] rounded-xl transition-colors text-left"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#f6f6f6] flex items-center justify-center text-[#1a1a1a]">
                        <Target className="w-5 h-5" strokeWidth={2.5} />
                      </div>
                      <div className="mt-0.5">
                        <div className="font-bold text-[#1a1a1a] mb-0.5">Close to goal</div>
                        <div className="text-[13px] text-gray-500 leading-snug">
                          Fundraisers within 5% of their goal
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="flex items-start gap-4 p-3 hover:bg-[#f6f6f6] rounded-xl transition-colors text-left"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#f6f6f6] flex items-center justify-center text-[#1a1a1a]">
                        <Megaphone className="w-5 h-5" strokeWidth={2.5} />
                      </div>
                      <div className="mt-0.5">
                        <div className="font-bold text-[#1a1a1a] mb-0.5">Just launched</div>
                        <div className="text-[13px] text-gray-500 leading-snug">
                          Fundraisers started in the last two days
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="flex items-start gap-4 p-3 hover:bg-[#f6f6f6] rounded-xl transition-colors text-left"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#f6f6f6] flex items-center justify-center text-[#1a1a1a]">
                        <Zap className="w-5 h-5" strokeWidth={2.5} />
                      </div>
                      <div className="mt-0.5">
                        <div className="font-bold text-[#1a1a1a] mb-0.5">Needs momentum</div>
                        <div className="text-[13px] text-gray-500 leading-snug">
                          Fundraisers that need a little boost
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors hover:text-slate-900"
                aria-label="Previous campaigns"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors hover:text-slate-900"
                aria-label="Next campaigns"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - Top Left (Wide) */}
          <div className="md:col-span-2 relative rounded-[28px] overflow-hidden group min-h-[200px] md:min-h-[280px] lg:min-h-[300px] ring-1 ring-inset ring-white/20 shadow-xl">
            <Image
              src="/child_protection_1790596242292.jpg"
              alt="Campaign"
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent"></div>

            <div className="absolute top-4 left-4 md:top-5 md:left-5 bg-white/20 backdrop-blur-md text-[9px] md:text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 text-white shadow-sm border border-white/20">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Verified
            </div>

            <div className="absolute inset-0 p-4 md:p-5 lg:p-8 flex flex-col justify-end">
              <div className="flex justify-between items-end gap-3 md:gap-4">
                <div className="max-w-xl">
                  <span className="text-emerald-400 font-extrabold text-[9px] md:text-[10px] lg:text-xs uppercase tracking-wider mb-1.5 md:mb-2 block">
                    Education
                  </span>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-extrabold text-white mb-1.5 leading-tight">
                    School Supplies for Village Community
                  </h3>
                  <p className="text-slate-300 text-[11px] md:text-xs lg:text-sm line-clamp-2 font-medium">
                    Providing essential learning materials for 200 students to complete their academic year.
                  </p>
                </div>
                <button
                  className="bg-white text-slate-900 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full flex-shrink-0 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-emerald-500/20"
                  aria-label="View campaign details"
                >
                  <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                </button>
              </div>

              <div className="mt-4 md:mt-6">
                <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden backdrop-blur-sm">
                  <div className="bg-emerald-400 h-full rounded-full w-[65%]"></div>
                </div>
                <div className="flex justify-between text-[9px] md:text-[10px] lg:text-xs font-bold mt-2.5 text-white/90">
                  <span>$3,250 raised</span>
                  <span>of $5k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Top Right (Square) */}
          <div className="md:col-span-1 relative rounded-[28px] overflow-hidden group min-h-[200px] md:min-h-[280px] lg:min-h-[300px] ring-1 ring-inset ring-white/20 shadow-xl">
            <Image
              src="/edu_schoolgirl_1790596211832.jpg"
              alt="Campaign"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-slate-900/10"></div>

            <div className="absolute inset-0 p-4 md:p-5 lg:p-6 flex flex-col justify-end">
              <div className="flex justify-between items-end gap-2">
                <div>
                  <span className="text-blue-400 font-extrabold text-[9px] md:text-[10px] uppercase tracking-wider mb-1.5 block">
                    Medical
                  </span>
                  <h3 className="text-base md:text-lg lg:text-xl font-extrabold text-white mb-1.5 leading-tight">
                    Emergency Surgery
                  </h3>
                </div>
                <button
                  className="bg-white/20 backdrop-blur-md border border-white/20 text-white w-8 h-8 md:w-9 md:h-9 rounded-full flex-shrink-0 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all duration-300"
                  aria-label="View campaign details"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-slate-300 text-[11px] md:text-xs line-clamp-2 font-medium mt-1 mb-3 md:mb-5">
                Urgent medical assistance needed for a verified patient.
              </p>

              <div>
                <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden backdrop-blur-sm">
                  <div className="bg-blue-400 h-full rounded-full w-[85%]"></div>
                </div>
                <div className="flex justify-between text-[9px] md:text-[10px] font-bold mt-2.5 text-white/90">
                  <span>$8,500</span>
                  <span>$10k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - Bottom Left (Square) */}
          <div className="md:col-span-1 relative rounded-[28px] overflow-hidden group min-h-[200px] md:min-h-[280px] lg:min-h-[300px] ring-1 ring-inset ring-white/20 shadow-xl">
            <Image
              src="/home_family_1790596228028.jpg"
              alt="Campaign"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-slate-900/10"></div>

            <div className="absolute inset-0 p-4 md:p-5 lg:p-6 flex flex-col justify-end">
              <div className="flex justify-between items-end gap-2">
                <div>
                  <span className="text-amber-400 font-extrabold text-[9px] md:text-[10px] uppercase tracking-wider mb-1.5 block">
                    Community
                  </span>
                  <h3 className="text-base md:text-lg lg:text-xl font-extrabold text-white mb-1.5 leading-tight">
                    Clean Water Init.
                  </h3>
                </div>
                <button
                  className="bg-white/20 backdrop-blur-md border border-white/20 text-white w-8 h-8 md:w-9 md:h-9 rounded-full flex-shrink-0 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all duration-300"
                  aria-label="View campaign details"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-slate-300 text-[11px] md:text-xs line-clamp-2 font-medium mt-1 mb-3 md:mb-5">
                Installing solar-powered water pumps in rural regions.
              </p>

              <div>
                <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden backdrop-blur-sm">
                  <div className="bg-amber-400 h-full rounded-full w-[30%]"></div>
                </div>
                <div className="flex justify-between text-[9px] md:text-[10px] font-bold mt-2.5 text-white/90">
                  <span>$4,500</span>
                  <span>$15k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 - Bottom Right (Wide) */}
          <div className="md:col-span-2 relative rounded-[28px] overflow-hidden group min-h-[200px] md:min-h-[280px] lg:min-h-[300px] ring-1 ring-inset ring-white/20 shadow-xl">
            <Image
              src="/animal_rescue_1790596260846.jpg"
              alt="Campaign"
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent"></div>

            <div className="absolute top-4 left-4 md:top-5 md:left-5 bg-white/20 backdrop-blur-md text-[9px] md:text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 text-white shadow-sm border border-white/20">
              <ShieldCheck className="w-3 h-3 text-purple-400" /> Verified
            </div>

            <div className="absolute inset-0 p-4 md:p-5 lg:p-8 flex flex-col justify-end">
              <div className="flex justify-between items-end gap-3 md:gap-4">
                <div className="max-w-xl">
                  <span className="text-purple-400 font-extrabold text-[9px] md:text-[10px] lg:text-xs uppercase tracking-wider mb-1.5 md:mb-2 block">
                    Animal Rescue
                  </span>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-extrabold text-white mb-1.5 leading-tight">
                    Wildlife Habitat Restoration
                  </h3>
                  <p className="text-slate-300 text-[11px] md:text-xs lg:text-sm line-clamp-2 font-medium">
                    Rebuilding natural habitats and providing medical care for animals affected by recent wildfires.
                  </p>
                </div>
                <button
                  className="bg-white text-slate-900 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full flex-shrink-0 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-emerald-500/20"
                  aria-label="View campaign details"
                >
                  <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                </button>
              </div>

              <div className="mt-4 md:mt-6">
                <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden backdrop-blur-sm">
                  <div className="bg-purple-400 h-full rounded-full w-[45%]"></div>
                </div>
                <div className="flex justify-between text-[9px] md:text-[10px] lg:text-xs font-bold mt-2.5 text-white/90">
                  <span>$9,000 raised</span>
                  <span>of $20k</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/campaigns"
            className="md:hidden flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-full font-extrabold hover:bg-emerald-700 transition-colors shadow-xl hover:shadow-2xl"
          >
            View all campaigns <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
