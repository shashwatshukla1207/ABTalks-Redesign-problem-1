import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface MetricCardProps {
  title: string;
  subtitle?: string;
  metric: string | number;
  unit?: string;
  progressValue?: number;
  footerText?: React.ReactNode;
  icon?: React.ReactNode;
  accentColor?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  subtitle,
  metric,
  unit,
  progressValue,
  footerText,
  icon,
  accentColor = "bg-indigo-500",
  className,
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        "p-4 sm:p-5 rounded-2xl bg-[#0c0c0c] border border-[#1f1f1f] space-y-3 relative overflow-hidden",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-xs font-semibold text-[#a1a1aa]">{title}</h4>
          {subtitle && <p className="text-[10px] text-[#71717a] mt-0.5">{subtitle}</p>}
        </div>
        {icon && (
          <div className="p-2 bg-[#141414] rounded-xl border border-[#222222] text-[#ededed]">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
          {metric}
        </span>
        {unit && <span className="text-xs font-medium text-[#71717a]">{unit}</span>}
      </div>

      {progressValue !== undefined && (
        <div className="space-y-1 pt-1">
          <div className="w-full bg-[#18181b] rounded-full h-1.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(Math.max(progressValue, 0), 100)}%` }}
              transition={{ duration: 0.8 }}
              className={cn("h-full rounded-full", accentColor)}
            />
          </div>
        </div>
      )}

      {footerText && (
        <div className="pt-2 border-t border-[#1a1a1e] text-[11px] text-[#a1a1aa] flex items-center justify-between">
          {footerText}
        </div>
      )}
    </motion.div>
  );
};
