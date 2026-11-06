import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BottomCarousel from "@/components/BottomCarousel";

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-white border-t border-slate-100 overflow-x-clip" id="categories">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 mb-12 text-center">
        <div className="inline-block bg-[#32a338]/15 text-[#0a5228] font-extrabold text-xs px-4 py-1.5 rounded-sm mb-4 uppercase tracking-wider">
          Our Focus Areas
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Categories of Impact</h2>
        <p className="mt-4 text-slate-600 text-lg font-medium max-w-2xl mx-auto">
          Discover the various ways you can make a meaningful difference across different communities and verified
          causes.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/categories"
            className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-full font-extrabold hover:bg-emerald-700 transition-colors shadow-xl hover:shadow-2xl"
          >
            Choose Your Impact <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <div className="-mx-4 md:-mx-6 lg:-mx-8">
        <BottomCarousel />
      </div>
    </section>
  );
}
