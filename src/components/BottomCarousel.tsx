"use client";

import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
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

// Duplicate to make the cylinder larger and the curve softer
const categories = [...baseCategories, ...baseCategories.map(c => ({ ...c, id: c.id + 7 }))];

export default function BottomCarousel() {
  const baseRotation = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useAnimationFrame((t, delta) => {
    if (!isHovered && !isDragging) {
      // Continuous slow rotation
      baseRotation.set(baseRotation.get() + delta * 0.015);
    }
  });

  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = () => setIsDragging(false);
  const handleDrag = (event: any, info: any) => {
    // Drag moves the rotation
    baseRotation.set(baseRotation.get() - info.delta.x * 0.2);
  };

  const TOTAL_ITEMS = categories.length;

  // The wrapper moves forward by RADIUS so the center item is at Z=0.
  // The items move backward by -RADIUS.
  // This creates a concave panoramic screen effect (like Coverflow).
  const rotateY = useTransform(baseRotation, (v) => `${v}deg`);

  return (
    <div className="w-full mt-12 mb-16 flex flex-col items-center justify-center overflow-hidden bottom-carousel-container">
      <style dangerouslySetInnerHTML={{
        __html: `
        .bottom-carousel-container {
          --carousel-z: -222px;
          --carousel-r: 222px;
        }
        .bottom-card {
          width: 85px;
          height: 120px;
          border-radius: 12px;
        }
        @media (min-width: 768px) {
          .bottom-carousel-container {
            --carousel-z: -651px;
            --carousel-r: 651px;
          }
          .bottom-card {
            width: 260px;
            height: 360px;
            border-radius: 24px;
          }
        }
        ${categories.map((c, i) => `
          .bottom-card-${i} {
            transform: rotateY(${(360 / TOTAL_ITEMS) * i}deg) translateZ(var(--carousel-r));
          }
        `).join('')}
        `
      }} />
      <div
        className="relative w-full h-[250px] md:h-[400px] flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <div style={{ transform: "translateZ(var(--carousel-z))", transformStyle: "preserve-3d" }} className="absolute inset-0 w-full h-full flex items-center justify-center">
          <motion.div
            className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{
              rotateY,
              transformStyle: "preserve-3d"
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrag={handleDrag}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {categories.map((category, index) => {
              return (
                <div
                  key={category.id}
                  className={`absolute overflow-hidden shadow-lg group bg-slate-200 bottom-card bottom-card-${index}`}
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Hover Pill */}
                  <div className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                    <div className="px-3 py-1.5 md:px-5 md:py-2.5 bg-white/95 backdrop-blur-md text-slate-900 text-[10px] md:text-sm font-bold rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.2)] whitespace-nowrap">
                      {category.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
