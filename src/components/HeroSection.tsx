import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";

export default function HeroSection() {
  return (
    <section className="relative pt-12 pb-16 px-4 md:px-6 w-full overflow-x-clip">
      {/* Subtle Premium Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-[radial-gradient(ellipse_at_center,_#E9F7EC_0%,_transparent_70%)] -z-10 pointer-events-none"></div>

      {/* HEADLINE & BUTTON AREA */}
      <div className="relative flex flex-col items-center justify-center text-center mb-2 z-10 translate-y-8">
        {/* Headline */}
        <h1
          className="text-[clamp(2.5rem,4.4vw,3.5rem)] md:text-[clamp(2.25rem,4.4vw,3.5rem)] font-[800] leading-[1.15] md:leading-[1.1] tracking-tight md:tracking-[-0.02em] text-[#0f172a] max-w-4xl mx-auto px-2 relative motion-safe:animate-fade-in-up"
          style={{ animationFillMode: "both" }}
        >
          Great futures are built <br className="hidden md:block" /> with a small charity
        </h1>

        <div
          className="mt-12 flex items-center justify-center motion-safe:animate-fade-in-up"
          style={{ animationDelay: "80ms", animationFillMode: "both" }}
        >
          <Link
            href="/campaigns"
            className="flex items-center gap-3 bg-slate-900 text-white pl-6 pr-1.5 py-1.5 rounded-full font-extrabold hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
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
      <div
        className="mt-4 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 divide-y md:divide-y-0 md:divide-x divide-slate-200 motion-safe:animate-fade-in-up"
        style={{ animationDelay: "240ms", animationFillMode: "both" }}
      >
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
  );
}
