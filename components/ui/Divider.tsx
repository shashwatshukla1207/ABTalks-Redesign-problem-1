import React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps {
  label?: React.ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export const Divider: React.FC<DividerProps> = ({
  label,
  className,
  orientation = "horizontal",
}) => {
  if (orientation === "vertical") {
    return (
      <div
        className={cn("w-px bg-[#1f1f1f] self-stretch min-h-[16px]", className)}
      />
    );
  }

  if (label) {
    return (
      <div className={cn("relative flex items-center my-4", className)}>
        <div className="flex-grow border-t border-[#1f1f1f]" />
        <span className="shrink px-3 text-[10px] font-semibold text-[#71717a] uppercase tracking-wider bg-[#050505]">
          {label}
        </span>
        <div className="flex-grow border-t border-[#1f1f1f]" />
      </div>
    );
  }

  return <div className={cn("w-full border-t border-[#1f1f1f] my-4", className)} />;
};
