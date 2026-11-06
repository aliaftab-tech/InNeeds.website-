"use client";

import { useState, useEffect, useRef } from "react";

export interface CircularStatProps {
  numericValue: number;
  prefix?: string;
  suffix?: string;
  label: React.ReactNode;
  percentage: number;
}

export default function CircularStat({
  numericValue,
  prefix = "",
  suffix = "",
  label,
  percentage,
}: CircularStatProps) {
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

  const targetTop = isVisible ? 120 - percentage * 1.4 : 120;

  return (
    <div ref={circleRef} className="flex flex-col items-center text-center">
      {/* Premium Apple-style shadow and refined border */}
      <div className="relative flex items-center justify-center w-24 h-24 md:w-40 md:h-40 mb-3 md:mb-6 group rounded-full bg-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08),_0_0_15px_rgba(0,0,0,0.03)] border-2 border-white overflow-hidden ring-1 ring-slate-100/50">
        {/* Wavy Water Fills */}
        <div className="wave-water-1" style={{ top: `${targetTop}%` }}></div>
        <div className="wave-water-2" style={{ top: `${targetTop + 3}%` }}></div>

        {/* Value Text */}
        <div className="absolute flex flex-col items-center justify-center z-10 w-full px-1 md:px-2">
          <span className="text-xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {prefix}
            {count}
            <span className="text-[#32a338]">{suffix}</span>
          </span>
        </div>
      </div>
      <p className="text-emerald-50/80 text-[10px] md:text-sm font-semibold leading-tight md:leading-relaxed max-w-[100px] md:max-w-[200px] z-10 relative mt-2 md:mt-4">
        {label}
      </p>
    </div>
  );
}
