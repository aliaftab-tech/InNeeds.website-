"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full z-50 sticky top-0 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-lg border-b border-slate-100 shadow-sm"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1700px] px-6 py-4 lg:px-12 flex items-center justify-between">
        {/* MOBILE SEARCH ICON (Left) */}
        <div className="lg:hidden flex-1 flex justify-start">
          <button className="text-slate-900 hover:text-[#32a338] transition-colors" aria-label="Search">
            <Search className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* LEFT LINKS (Desktop Only) */}
        <div className="hidden lg:flex items-center gap-8 text-sm md:text-base font-bold text-slate-800 flex-1 justify-start">
          <Link href="#campaigns" className="hover:text-[#32a338] transition-colors">
            Campaigns
          </Link>
          <Link href="#how-it-works" className="hover:text-[#32a338] transition-colors">
            How It Works
          </Link>
          <Link href="#for-ngos" className="hover:text-[#32a338] transition-colors">
            For NGOs
          </Link>
        </div>

        {/* CENTER LOGO */}
        <div className="flex justify-center flex-shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <Link href="/" className="flex items-center gap-2 lg:gap-3 hover:scale-105 transition-transform duration-300">
            <div className="relative w-10 h-10 lg:w-14 lg:h-14">
              <Image
                src="/transparent.png"
                alt="InNeeds Logo"
                fill
                sizes="(max-width: 768px) 150px, 200px"
                className="object-contain"
              />
            </div>
            <span className="text-2xl lg:text-4xl font-extrabold tracking-tight">
              <span className="text-[#0a5228]">In</span>
              <span className="text-[#32a338]">Needs</span>
            </span>
          </Link>
        </div>

        {/* RIGHT LINKS & ACTIONS (Desktop Only) */}
        <div className="hidden lg:flex items-center gap-4 lg:gap-6 flex-1 justify-end">
          <div className="flex items-center gap-8 text-sm md:text-base font-bold text-slate-800 mr-2">
            <Link href="#app" className="hover:text-[#32a338] transition-colors">
              Get the App
            </Link>
            <Link href="#about" className="hover:text-[#32a338] transition-colors">
              About Us
            </Link>
          </div>
          <button className="text-slate-900 hover:text-[#32a338] transition-colors" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          <Link
            href="/signin"
            className={`border-2 border-[#0a5228] px-5 py-2.5 lg:px-7 rounded-full text-sm md:text-base font-bold transition-all whitespace-nowrap ${
              isScrolled
                ? "bg-[#0a5228] text-white hover:bg-[#073d1e]"
                : "text-[#0a5228] hover:bg-[#0a5228] hover:text-white"
            }`}
          >
            Sign In
          </Link>
        </div>

        {/* MOBILE HAMBURGER MENU (Right) */}
        <div className="lg:hidden flex-1 flex justify-end">
          <button className="text-slate-900 hover:text-[#32a338] transition-colors" aria-label="Open menu">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
