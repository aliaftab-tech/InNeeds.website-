"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ChevronDown, Search, HeartHandshake, ShieldCheck, Target, Megaphone, Zap } from "lucide-react";
import HeroCarousel from "../components/HeroCarousel";
import BottomCarousel from "../components/BottomCarousel";

const CircularStat = ({ numericValue, prefix = "", suffix = "", label, percentage }: { numericValue: number, prefix?: string, suffix?: string, label: React.ReactNode, percentage: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const circleRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    if (circleRef.current) observer.observe(circleRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp: number | null = null;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * numericValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, numericValue]);

  const targetTop = isVisible ? 120 - (percentage * 1.4) : 120;

  return (
    <div ref={circleRef} className="flex flex-col items-center text-center">
      <style>{`
        .wave-water-1 {
          position: absolute;
          width: 200%;
          height: 200%;
          background: linear-gradient(135deg, rgba(50, 163, 56, 0.25) 0%, rgba(10, 82, 40, 0.1) 100%);
          left: -50%;
          border-radius: 40%;
          animation: wave-spin 6s infinite linear;
          transition: top 2000ms cubic-bezier(0.1, 0.8, 0.2, 1);
        }
        .wave-water-2 {
          position: absolute;
          width: 200%;
          height: 200%;
          background: linear-gradient(135deg, rgba(50, 163, 56, 0.4) 0%, rgba(10, 82, 40, 0.15) 100%);
          left: -50%;
          border-radius: 45%;
          animation: wave-spin 8s infinite linear;
          transition: top 2000ms cubic-bezier(0.1, 0.8, 0.2, 1);
        }
        @keyframes wave-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Premium Apple-style shadow and refined border */}
      <div className="relative flex items-center justify-center w-24 h-24 md:w-40 md:h-40 mb-3 md:mb-6 group rounded-full bg-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08),_0_0_15px_rgba(0,0,0,0.03)] border-2 border-white overflow-hidden ring-1 ring-slate-100/50">
        
        {/* Wavy Water Fills */}
        <div className="wave-water-1" style={{ top: `${targetTop}%` }}></div>
        <div className="wave-water-2" style={{ top: `${targetTop + 3}%` }}></div>
        
        {/* Value Text */}
        <div className="absolute flex flex-col items-center justify-center z-10 w-full px-1 md:px-2">
          <span className="text-xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {prefix}{count}<span className="text-[#32a338]">{suffix}</span>
          </span>
        </div>
      </div>
      <p className="text-emerald-50/80 text-[10px] md:text-sm font-semibold leading-tight md:leading-relaxed max-w-[100px] md:max-w-[200px] z-10 relative mt-2 md:mt-4">{label}</p>
    </div>
  );
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-200 selection:text-slate-900 font-sans overflow-x-clip">
      {/* NAVIGATION */}
      <nav className={`w-full z-50 sticky top-0 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-lg border-b border-slate-100 shadow-sm" : "bg-white border-b border-transparent"}`}>
        <div className="mx-auto max-w-[1700px] px-6 py-4 lg:px-12 flex items-center justify-between">

          {/* MOBILE SEARCH ICON (Left) */}
          <div className="lg:hidden flex-1 flex justify-start">
            <button className="text-slate-900 hover:text-[#32a338] transition-colors">
              <Search className="w-6 h-6" strokeWidth={2.5} />
            </button>
          </div>

          {/* LEFT LINKS (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-8 text-sm md:text-base font-bold text-slate-800 flex-1 justify-start">
            <Link href="#campaigns" className="hover:text-[#32a338] transition-colors">Campaigns</Link>
            <Link href="#how-it-works" className="hover:text-[#32a338] transition-colors">How It Works</Link>
            <Link href="#for-ngos" className="hover:text-[#32a338] transition-colors">For NGOs</Link>
          </div>

          {/* CENTER LOGO */}
          <div className="flex justify-center flex-shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <Link href="/" className="flex items-center gap-2 lg:gap-3 hover:scale-105 transition-transform duration-300">
              <div className="relative w-10 h-10 lg:w-14 lg:h-14">
                <Image src="/transparent.png" alt="InNeeds Logo" fill sizes="(max-width: 768px) 150px, 200px" className="object-contain" />
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
              <Link href="#app" className="hover:text-[#32a338] transition-colors">Get the App</Link>
              <Link href="#about" className="hover:text-[#32a338] transition-colors">About Us</Link>
            </div>
            <button className="text-slate-900 hover:text-[#32a338] transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/signin"
              className={`border-2 border-[#0a5228] px-5 py-2.5 lg:px-7 rounded-full text-sm md:text-base font-bold transition-all whitespace-nowrap ${isScrolled
                  ? "bg-[#0a5228] text-white hover:bg-[#073d1e]"
                  : "text-[#0a5228] hover:bg-[#0a5228] hover:text-white"
                }`}
            >
              Sign In
            </Link>
          </div>

          {/* MOBILE HAMBURGER MENU (Right) */}
          <div className="lg:hidden flex-1 flex justify-end">
            <button className="text-slate-900 hover:text-[#32a338] transition-colors">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 px-4 md:px-6 w-full overflow-x-clip">

        {/* Subtle Premium Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-[radial-gradient(ellipse_at_center,_#E9F7EC_0%,_transparent_70%)] -z-10 pointer-events-none"></div>

        {/* HEADLINE & BUTTON AREA */}
        <div className="relative flex flex-col items-center justify-center text-center mb-2 z-10 translate-y-8">
          {/* Headline */}
          <h1 className="text-[clamp(2.5rem,4.4vw,3.5rem)] md:text-[clamp(2.25rem,4.4vw,3.5rem)] font-[800] leading-[1.15] md:leading-[1.1] tracking-tight md:tracking-[-0.02em] text-[#0f172a] max-w-4xl mx-auto px-2 relative motion-safe:animate-fade-in-up" style={{ animationFillMode: 'both' }}>
            Great futures are built <br className="hidden md:block" /> with a small charity
          </h1>

          <div className="mt-12 flex items-center justify-center motion-safe:animate-fade-in-up" style={{ animationDelay: '80ms', animationFillMode: 'both' }}>
            <Link href="/campaigns" className="flex items-center gap-3 bg-slate-900 text-white pl-6 pr-1.5 py-1.5 rounded-full font-extrabold hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              <span>Explore campaigns</span>
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </Link>
          </div>
        </div>

        {/* 3D CURVED CAROUSEL */}
        <div className="-mx-4 md:-mx-6 lg:-mx-8">
          <HeroCarousel />
        </div>

        {/* 3-COLUMN FEATURES */}
        <div className="mt-4 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 divide-y md:divide-y-0 md:divide-x divide-slate-200 motion-safe:animate-fade-in-up" style={{ animationDelay: '240ms', animationFillMode: 'both' }}>
          <div className="flex flex-col items-center text-center px-6 pt-6 md:pt-0">
            <h3 className="text-[1.05rem] font-[800] text-slate-800 tracking-tight mb-2">Every cause verified</h3>
            <p className="text-[13px] text-slate-400 font-medium leading-relaxed">
              We thoroughly vet every organization and campaign to ensure your donations reach those who truly need them.
            </p>
          </div>

          <div className="flex flex-col items-center text-center px-6 pt-6 md:pt-0">
            <h3 className="text-[1.05rem] font-[800] text-slate-800 tracking-tight mb-2">Transparent fund tracking</h3>
            <p className="text-[13px] text-slate-400 font-medium leading-relaxed">
              See exactly where your money goes with detailed impact reports and financial transparency on every project.
            </p>
          </div>

          <div className="flex flex-col items-center text-center px-6 pt-6 md:pt-0">
            <h3 className="text-[1.05rem] font-[800] text-slate-800 tracking-tight mb-2">Secure payments</h3>
            <p className="text-[13px] text-slate-400 font-medium leading-relaxed">
              Your donations are protected with enterprise-grade encryption and processed through trusted payment gateways.
            </p>
          </div>
        </div>

      </section>

      {/* REMAINDER OF THE PAGE (TRUST / IMPACT SECTION) */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-[#0b291a] flex flex-col items-center justify-center text-center px-6">
        {/* Badge */}
        <div className="inline-block bg-white/10 text-emerald-100 border border-white/10 font-extrabold text-xs px-4 py-1.5 rounded-sm mb-6 uppercase tracking-wider backdrop-blur-sm">
          100% Verified Causes
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6">
          A new standard for transparent and honest giving.
        </h2>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-emerald-100/90 max-w-3xl mx-auto font-medium leading-relaxed mb-16 lg:mb-20">
          We are building a platform where every donation is fully trackable. Join our early movement to connect compassionate donors with verified causes, ensuring your impact reaches those who need it most.
        </p>

        {/* Animated Circles */}
        <div className="flex flex-row justify-center items-start gap-4 md:gap-24 lg:gap-32 w-full max-w-[1200px]">
          <CircularStat
            numericValue={100}
            suffix="%"
            percentage={100}
            label={<>Complete transparency in<br />every single donation</>}
          />
          <CircularStat
            numericValue={24}
            suffix="+"
            percentage={65}
            label={<>Verified partner NGOs<br />already onboarded</>}
          />
          <CircularStat
            numericValue={100}
            prefix="$"
            suffix="k"
            percentage={45}
            label={<>Our initial community<br />fundraising milestone</>}
          />
        </div>
      </section>

      {/* TRUSTED BY STRIP */}
      {/* TRUSTED BY STRIP */}
      <section className="py-16 bg-white overflow-hidden relative border-t border-slate-100">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 mb-12">
          <p className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-[0.25em]">Trusted by leading organizations</p>
        </div>

        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 40s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>

        {/* Fading Edges */}
        <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee py-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-16 md:gap-32 px-8 md:px-16 items-center opacity-60 hover:opacity-100 transition-opacity duration-500">
              <span className="text-3xl font-extrabold tracking-tight text-slate-400 hover:text-slate-900 transition-colors duration-300 cursor-pointer">stripe</span>
              <span className="text-3xl font-extrabold italic text-slate-400 hover:text-slate-900 transition-colors duration-300 cursor-pointer">PayPal</span>
              <div className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors duration-300 cursor-pointer">
                <HeartHandshake className="w-8 h-8" />
                <span className="text-2xl font-bold">GlobalNGO</span>
              </div>
              <span className="text-2xl font-bold text-slate-400 hover:text-slate-900 transition-colors duration-300 cursor-pointer">EduCare Foundation</span>
              <div className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors duration-300 cursor-pointer">
                <ShieldCheck className="w-8 h-8" />
                <span className="text-2xl font-bold">VerifiedCharity</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3D CAROUSEL SECTION (BOTTOM) */}
      <section className="py-24 bg-white border-t border-slate-100 overflow-x-clip" id="categories">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 mb-12 text-center">
          <div className="inline-block bg-[#32a338]/15 text-[#0a5228] font-extrabold text-xs px-4 py-1.5 rounded-sm mb-4 uppercase tracking-wider">
            Our Focus Areas
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Categories of Impact</h2>
          <p className="mt-4 text-slate-600 text-lg font-medium max-w-2xl mx-auto">Discover the various ways you can make a meaningful difference across different communities and verified causes.</p>
          <div className="mt-8 flex justify-center">
            <Link href="/categories" className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-full font-extrabold hover:bg-emerald-700 transition-colors shadow-xl hover:shadow-2xl">
              Choose Your Impact <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="-mx-4 md:-mx-6 lg:-mx-8">
          <BottomCarousel />
        </div>
      </section>

      {/* CAMPAIGNS BELOW THE FOLD */}
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
                  Happening worldwide <ChevronDown className={`w-4 h-4 text-[#1a1a1a] transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`} />
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
                          <div className="text-[13px] text-gray-500 leading-snug">Fundraisers within 5% of their goal</div>
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
                          <div className="text-[13px] text-gray-500 leading-snug">Fundraisers started in the last two days</div>
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
                          <div className="text-[13px] text-gray-500 leading-snug">Fundraisers that need a little boost</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors hover:text-slate-900">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors hover:text-slate-900">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 - Top Left (Wide) */}
            <div className="md:col-span-2 relative rounded-[28px] overflow-hidden group min-h-[200px] md:min-h-[280px] lg:min-h-[300px] ring-1 ring-inset ring-white/20 shadow-xl">
              <Image src="/child_protection_1790596242292.jpg" alt="Campaign" fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent"></div>
              
              <div className="absolute top-4 left-4 md:top-5 md:left-5 bg-white/20 backdrop-blur-md text-[9px] md:text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 text-white shadow-sm border border-white/20">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> Verified
              </div>

              <div className="absolute inset-0 p-4 md:p-5 lg:p-8 flex flex-col justify-end">
                <div className="flex justify-between items-end gap-3 md:gap-4">
                  <div className="max-w-xl">
                    <span className="text-emerald-400 font-extrabold text-[9px] md:text-[10px] lg:text-xs uppercase tracking-wider mb-1.5 md:mb-2 block">Education</span>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-extrabold text-white mb-1.5 leading-tight">School Supplies for Village Community</h3>
                    <p className="text-slate-300 text-[11px] md:text-xs lg:text-sm line-clamp-2 font-medium">Providing essential learning materials for 200 students to complete their academic year.</p>
                  </div>
                  <button className="bg-white text-slate-900 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full flex-shrink-0 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-emerald-500/20">
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
              <Image src="/edu_schoolgirl_1790596211832.jpg" alt="Campaign" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-slate-900/10"></div>
              
              <div className="absolute inset-0 p-4 md:p-5 lg:p-6 flex flex-col justify-end">
                <div className="flex justify-between items-end gap-2">
                  <div>
                    <span className="text-blue-400 font-extrabold text-[9px] md:text-[10px] uppercase tracking-wider mb-1.5 block">Medical</span>
                    <h3 className="text-base md:text-lg lg:text-xl font-extrabold text-white mb-1.5 leading-tight">Emergency Surgery</h3>
                  </div>
                  <button className="bg-white/20 backdrop-blur-md border border-white/20 text-white w-8 h-8 md:w-9 md:h-9 rounded-full flex-shrink-0 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-slate-300 text-[11px] md:text-xs line-clamp-2 font-medium mt-1 mb-3 md:mb-5">Urgent medical assistance needed for a verified patient.</p>
                
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
              <Image src="/home_family_1790596228028.jpg" alt="Campaign" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-slate-900/10"></div>
              
              <div className="absolute inset-0 p-4 md:p-5 lg:p-6 flex flex-col justify-end">
                <div className="flex justify-between items-end gap-2">
                  <div>
                    <span className="text-amber-400 font-extrabold text-[9px] md:text-[10px] uppercase tracking-wider mb-1.5 block">Community</span>
                    <h3 className="text-base md:text-lg lg:text-xl font-extrabold text-white mb-1.5 leading-tight">Clean Water Init.</h3>
                  </div>
                  <button className="bg-white/20 backdrop-blur-md border border-white/20 text-white w-8 h-8 md:w-9 md:h-9 rounded-full flex-shrink-0 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-slate-300 text-[11px] md:text-xs line-clamp-2 font-medium mt-1 mb-3 md:mb-5">Installing solar-powered water pumps in rural regions.</p>
                
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
              <Image src="/animal_rescue_1790596260846.jpg" alt="Campaign" fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent"></div>
              
              <div className="absolute top-4 left-4 md:top-5 md:left-5 bg-white/20 backdrop-blur-md text-[9px] md:text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 text-white shadow-sm border border-white/20">
                <ShieldCheck className="w-3 h-3 text-purple-400" /> Verified
              </div>

              <div className="absolute inset-0 p-4 md:p-5 lg:p-8 flex flex-col justify-end">
                <div className="flex justify-between items-end gap-3 md:gap-4">
                  <div className="max-w-xl">
                    <span className="text-purple-400 font-extrabold text-[9px] md:text-[10px] lg:text-xs uppercase tracking-wider mb-1.5 md:mb-2 block">Animal Rescue</span>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-extrabold text-white mb-1.5 leading-tight">Wildlife Habitat Restoration</h3>
                    <p className="text-slate-300 text-[11px] md:text-xs lg:text-sm line-clamp-2 font-medium">Rebuilding natural habitats and providing medical care for animals affected by recent wildfires.</p>
                  </div>
                  <button className="bg-white text-slate-900 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full flex-shrink-0 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-emerald-500/20">
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
            <Link href="/campaigns" className="md:hidden flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-full font-extrabold hover:bg-emerald-700 transition-colors shadow-xl hover:shadow-2xl">
              View all campaigns <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>


      {/* BOTTOM CARDS SECTION */}
      <section className="py-24 bg-white w-full overflow-hidden">
        {/* CARDS CONTAINER */}
        <div className="relative z-10 mx-auto mt-20 flex flex-row items-end justify-start xl:justify-center gap-4 md:gap-6 w-full max-w-[1800px] px-4 md:px-8 xl:px-12 pb-12 overflow-x-auto xl:overflow-visible snap-x snap-mandatory">

          {/* FAR LEFT STACK */}
          <div className="flex flex-col gap-6 shrink-0 w-[260px] xl:w-[280px] 2xl:w-[320px] mx-auto xl:mx-0 snap-center">
            {/* Top Dark Green */}
            <div className="relative aspect-[4/5] bg-[#0d472c] rounded-[2rem] rounded-tr-[4rem] p-6 2xl:p-8 flex flex-col justify-between text-white shadow-xl">
              <div>
                <h3 className="text-3xl 2xl:text-4xl font-bold mb-3 2xl:mb-4 leading-tight">7 categories.<br />One verified platform.</h3>
                <p className="text-xs 2xl:text-sm text-white/80 leading-relaxed font-light">
                  From education and healthcare to emergency relief — every cause on InNeeds is verified before it reaches a donor.
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs 2xl:text-sm font-semibold tracking-wide">Donate now</span>
                <button className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-full bg-[#c0f058] flex items-center justify-center text-black hover:scale-105 transition-transform">
                  <svg className="w-4 h-4 2xl:w-5 2xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 19L19 5M19 5v10M19 5h-10" /></svg>
                </button>
              </div>
            </div>

            {/* Bottom Black Box */}
            <Link href="/apply" className="relative h-[100px] 2xl:h-[120px] bg-[#1a1a1a] rounded-[2rem] p-5 2xl:p-6 flex items-center gap-4 shadow-xl text-white hover:bg-black transition-colors group">
              <svg className="w-8 h-8 2xl:w-10 2xl:h-10 text-white/80 shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-sm 2xl:text-base font-medium leading-tight">Need help?<br />Apply for support</span>
            </Link>
          </div>

          {/* LEFT TALL BOX */}
          <div className="relative w-[280px] xl:w-[320px] 2xl:w-[360px] aspect-[9/12] bg-slate-200 rounded-[2.5rem] rounded-tl-[4rem] overflow-hidden shadow-2xl shrink-0 p-8 flex flex-col justify-end text-white mx-auto xl:mx-0 snap-center">
            <img src="/student.jpg" alt="Student studying" className="absolute inset-0 w-full h-full object-cover z-0" />
            <div className="absolute inset-0 bg-black/20 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
            <div className="relative z-20">
              <span className="text-sm 2xl:text-base font-medium opacity-90 ml-1">Education</span>
              <h3 className="text-2xl 2xl:text-3xl font-semibold leading-tight mt-2">Support a child's<br />education</h3>
            </div>
          </div>

          {/* CENTER BOX */}
          <div className="relative w-[240px] xl:w-[280px] 2xl:w-[320px] aspect-[1/1.05] bg-[#dce3de] rounded-[3rem] shadow-2xl shrink-0 p-8 2xl:p-10 flex flex-col justify-end mx-auto xl:mx-0 mt-16 xl:mt-0 snap-center">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 2xl:w-28 2xl:h-28 bg-white rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.1)] cursor-pointer hover:scale-105 transition-transform z-20 group">
              <svg className="w-8 h-8 2xl:w-10 2xl:h-10 text-slate-800 ml-2 group-hover:text-emerald-600 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>

            <h3 className="text-3xl 2xl:text-4xl font-bold text-slate-900 mb-8 text-center leading-tight tracking-tight">How InNeeds<br />verifies every cause</h3>
            <div className="flex items-center justify-between text-slate-900 px-2">
              <span className="text-[11px] 2xl:text-xs font-bold text-slate-700 tracking-wide uppercase">Watch how it works</span>
              <button className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white hover:scale-105 transition-transform">
                <svg className="w-4 h-4 2xl:w-5 2xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 19L19 5M19 5v10M19 5h-10" /></svg>
              </button>
            </div>
          </div>

          {/* RIGHT TALL BOX */}
          <div className="relative w-[280px] xl:w-[320px] 2xl:w-[360px] aspect-[9/12] bg-slate-200 rounded-[2.5rem] rounded-tl-[4rem] overflow-hidden shadow-2xl shrink-0 p-8 flex flex-col justify-end text-white mx-auto xl:mx-0 snap-center">
            <img src="/emergency.jpg" alt="Emergency assistance" className="absolute inset-0 w-full h-full object-cover z-0" />
            <div className="absolute inset-0 bg-black/20 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
            <div className="relative z-20">
              <span className="text-sm 2xl:text-base font-medium opacity-90 ml-1">Emergency Assistance</span>
              <h3 className="text-2xl 2xl:text-3xl font-semibold leading-tight mt-2">Urgent relief for<br />families in crisis</h3>
            </div>
          </div>

          {/* FAR RIGHT STACK */}
          <div className="flex flex-col gap-6 shrink-0 w-[260px] xl:w-[280px] 2xl:w-[320px] mx-auto xl:mx-0 snap-center">
            {/* Top Light Green */}
            <div className="relative aspect-[4/5] bg-[#c0f058] rounded-[2rem] rounded-tl-[4rem] overflow-hidden shadow-xl p-6 2xl:p-8 flex flex-col justify-between">
              <img src="/hands.jpg" alt="Hands reaching" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-[0.85] z-0 grayscale" />

              <h3 className="text-2xl 2xl:text-3xl font-bold text-[#0d472c] leading-tight relative z-20">Explore all<br />categories</h3>

              <Link href="/campaigns" className="relative z-20 flex items-center justify-between text-[#0d472c] bg-white/30 backdrop-blur-md p-3 2xl:p-4 -mx-2 -mb-2 rounded-2xl hover:bg-white/40 transition-colors group">
                <span className="text-[11px] 2xl:text-xs font-bold tracking-wide uppercase">Explore more</span>
                <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#c0f058] group-hover:scale-105 transition-transform">
                  <svg className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 19L19 5M19 5v10M19 5h-10" /></svg>
                </div>
              </Link>
            </div>

            {/* Bottom Dark Green Box */}
            <Link href="/partner" className="relative h-[100px] 2xl:h-[120px] bg-[#1e3427] rounded-[2rem] p-5 2xl:p-6 flex items-center gap-3 2xl:gap-4 shadow-xl text-white hover:bg-[#16271c] transition-colors group">
              <svg className="w-8 h-8 2xl:w-10 2xl:h-10 text-[#c0f058] shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              <span className="text-sm 2xl:text-base font-medium leading-tight">Are you an NGO?<br />Partner with us</span>
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
