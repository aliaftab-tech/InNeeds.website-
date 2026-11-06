import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark" | "card";
}

/**
 * Base Skeleton Primitive
 * Provides responsive pulse/shimmer placeholders with theme-aware variants.
 */
export function Skeleton({
  className,
  variant = "light",
  ...props
}: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading..."
      className={cn(
        "animate-pulse rounded-md",
        variant === "light" && "bg-slate-200/80",
        variant === "dark" && "bg-white/10 border border-white/10",
        variant === "card" && "bg-slate-100 border border-slate-200/60",
        className
      )}
      {...props}
    />
  );
}
