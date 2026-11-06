import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustImpact from "@/components/TrustImpact";
import TrustedBy from "@/components/TrustedBy";
import HowItWorks from "@/components/HowItWorks";
import CategoriesSection from "@/components/CategoriesSection";
import CampaignsGrid from "@/components/CampaignsGrid";
import ShowcaseBento from "@/components/ShowcaseBento";

/**
 * InNeeds Home Landing Page
 * Modular section assembly strictly aligned with the skeleton loading hierarchy.
 * Preserves responsive container max-width constraints for CLS mitigation:
 * - Top Navigation: max-w-[1700px]
 * - Trusted By Marquee: max-w-[1600px]
 * - Categories Carousel: max-w-[1600px]
 * - Campaigns Bento Grid: max-w-[1600px]
 * - Showcase Bento Cluster: max-w-[1800px]
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-200 selection:text-slate-900 font-sans overflow-x-clip">
      <Navbar />
      <main>
        <HeroSection />
        <TrustImpact />
        <TrustedBy />
        <HowItWorks />
        <CategoriesSection />
        <CampaignsGrid />
        <ShowcaseBento />
      </main>
    </div>
  );
}
