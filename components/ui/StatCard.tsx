import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  change?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  highlight?: boolean;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  change,
  highlight = false,
  className,
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        "p-4 rounded-2xl border transition-all relative overflow-hidden",
        highlight
          ? "bg-gradient-to-br from-indigo-950/40 via-[#0c0c0c] to-[#0c0c0c] border-indigo-500/30"
          : "bg-[#0c0c0c] border-[#1f1f1f]",
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-[#a1a1aa] tracking-wide">{label}</span>
        {icon && <div className="text-[#a1a1aa] p-1.5 bg-[#141414] rounded-xl border border-[#222222]">{icon}</div>}
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-2xl font-extrabold text-white font-mono tracking-tight">{value}</span>
        {change && (
          <span
            className={cn(
              "text-[10px] font-semibold px-1.5 py-0.5 rounded-full border",
              change.trend === "up" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
              change.trend === "down" && "bg-rose-500/10 text-rose-400 border-rose-500/20",
              change.trend === "neutral" && "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
            )}
          >
            {change.value}
          </span>
        )}
      </div>
    </motion.div>
  );
};
