"use client";

import Image from "next/image";

const baseCategories = [
  { id: 1, title: "Winter Relief", image: "/campaign_flat_1.jpg" },
  { id: 2, title: "Emergency", image: "/campaign_flat_6.jpg" },
  { id: 3, title: "Education", image: "/campaign_flat_7.jpg" },
  { id: 4, title: "Healthcare", image: "/campaign_flat_2.jpg" },
  { id: 5, title: "Environment", image: "/campaign_flat_3.jpg" },
  { id: 6, title: "Food Security", image: "/campaign_flat_5.jpg" },
  { id: 7, title: "Animal Welfare", image: "/campaign_flat_4.jpg" },
];

const R_u = 500;
const T_u = 480;
const P_u = 600;
const step = 20; // degrees

// Mobile Configuration (under 768px, raw pixels)
const mobileR = 260;
const mobileT = 260;
const mobileP = 375;
const mobileStep = 22; // degrees

const panels = baseCategories.map((panel, i) => {
  // Reversing the angle calculation so i=0 renders on the LEFT and i=6 renders on the RIGHT
  const angle = (3 - i) * step;
  
  // For 4 perfectly symmetrical cards on mobile, shift the center point to 3.5
  const mobileAngle = (3.5 - i) * mobileStep;

  // We show exactly 4 cards on mobile (indices 2, 3, 4, 5)
  const isMobileHidden = i === 0 || i === 1 || i === 6;
  const displayClass = isMobileHidden ? "hidden md:block" : "block";

  // Distance from center (index 3) for stagger animation
  const distFromCenter = Math.abs(3 - i);
  const animDelay = `${320 + (distFromCenter * 80)}ms`;

  return {
    ...panel,
    displayClass,
    animDelay,
    mobileTransform: `rotateY(${mobileAngle}deg) translateZ(${-mobileR}px)`,
    desktopTransform: `rotateY(${angle}deg) translateZ(calc(${-R_u} * var(--u)))`,
  };
});

export default function HeroCarousel() {
  return (
    <div
      className="w-full flex flex-col items-center justify-center overflow-x-hidden py-16"
      style={{ "--u": "max(0.55px, calc(100vw / 1920))" } as React.CSSProperties}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        .perspective-container {
          perspective: ${mobileP}px;
          height: 180px;
        }
        .ring-container {
          transform: translateZ(${mobileT}px);
        }
        .panel-base {
          width: 90px;
          height: 115px;
          border-radius: 12px;
        }
        
        @media (min-width: 768px) {
          .perspective-container {
            perspective: calc(${P_u} * var(--u));
            height: calc(350 * var(--u));
          }
          .ring-container {
            transform: translateZ(calc(${T_u} * var(--u)));
          }
          .panel-base {
            width: calc(160 * var(--u));
            height: calc(200 * var(--u));
            border-radius: calc(18 * var(--u));
          }
        }
        
        ${panels.map(p => `
          .panel-${p.id} { transform: ${p.mobileTransform}; }
          @media (min-width: 768px) {
            .panel-${p.id} { transform: ${p.desktopTransform}; }
          }
        `).join('\n')}
      `}} />

      <div className="relative w-full flex items-center justify-center animate-fade-in-up perspective-container">
        <div
          className="relative flex items-center justify-center w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center ring-container"
            style={{ transformStyle: "preserve-3d" }}
          >
            {panels.map((panel) => (
              <div
                key={panel.id}
                className={`absolute overflow-hidden shadow-2xl shadow-slate-900/30 group bg-slate-200 transition-all duration-700 ease-out hover:shadow-3xl hover:shadow-emerald-900/40 panel-base panel-${panel.id} ${panel.displayClass} motion-safe:animate-fade-in-up`}
                style={{
                  transformOrigin: "center center",
                  backfaceVisibility: "hidden",
                  animationDelay: panel.animDelay,
                  animationFillMode: 'both'
                }}
              >
                <Image
                  src={panel.image}
                  alt={panel.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

                {/* Hover Pill */}
                <div className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                  <div className="px-2 py-1 md:px-5 md:py-2.5 bg-white/95 backdrop-blur-md text-slate-900 text-[10px] md:text-sm font-bold rounded-full shadow-lg whitespace-nowrap">
                    {panel.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
