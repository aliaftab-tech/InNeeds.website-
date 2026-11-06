import { HeartHandshake, ShieldCheck } from "lucide-react";

export default function TrustedBy() {
  return (
    <section className="py-16 bg-white overflow-hidden relative border-t border-slate-100">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 mb-12">
        <p className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-[0.25em]">
          Trusted by leading organizations
        </p>
      </div>

      {/* Fading Edges */}
      <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      <div className="animate-marquee py-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex gap-16 md:gap-32 px-8 md:px-16 items-center opacity-60 hover:opacity-100 transition-opacity duration-500"
          >
            <span className="text-3xl font-extrabold tracking-tight text-slate-400 hover:text-slate-900 transition-colors duration-300 cursor-pointer">
              stripe
            </span>
            <span className="text-3xl font-extrabold italic text-slate-400 hover:text-slate-900 transition-colors duration-300 cursor-pointer">
              PayPal
            </span>
            <div className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors duration-300 cursor-pointer">
              <HeartHandshake className="w-8 h-8" />
              <span className="text-2xl font-bold">GlobalNGO</span>
            </div>
            <span className="text-2xl font-bold text-slate-400 hover:text-slate-900 transition-colors duration-300 cursor-pointer">
              EduCare Foundation
            </span>
            <div className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors duration-300 cursor-pointer">
              <ShieldCheck className="w-8 h-8" />
              <span className="text-2xl font-bold">VerifiedCharity</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
