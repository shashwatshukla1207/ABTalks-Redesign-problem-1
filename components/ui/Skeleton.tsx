import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "card";
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({
  className,
  variant = "rectangular",
  ...props
}) => {
  const variants = {
    text: "h-3.5 w-full rounded-md",
    circular: "rounded-full w-10 h-10 shrink-0",
    rectangular: "rounded-xl w-full h-12",
    card: "rounded-2xl w-full h-32",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-[#1a1a1e] border border-[#222226]",
        variants[variant],
        className
      )}
      {...props}
    />
  );
};
