import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface LinearProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  showValue?: boolean;
  colorClass?: string;
  height?: number;
}

export const LinearProgress: React.FC<LinearProgressProps> = ({
  value,
  max = 100,
  showValue = false,
  colorClass = "bg-indigo-500",
  height = 8,
  className,
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full space-y-1.5", className)} {...props}>
      {showValue && (
        <div className="flex justify-between items-center text-xs font-mono text-[#a1a1aa]">
          <span>Progress</span>
          <span className="font-semibold text-white">{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className="w-full bg-[#18181b] rounded-full overflow-hidden border border-[#27272a]/50 p-0.5"
        style={{ height: height + 4 }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn("h-full rounded-full transition-all", colorClass)}
        />
      </div>
    </div>
  );
};

export interface CircularProgressProps extends React.SVGProps<SVGSVGElement> {
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
  colorClass?: string;
}

export const CircularProgressRing: React.FC<CircularProgressProps> = ({
  value,
  size = 64,
  strokeWidth = 6,
  showValue = true,
  colorClass = "text-indigo-500",
  className,
  ...props
}) => {
  const percentage = Math.min(Math.max(value, 0), 100);
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={cn("-rotate-90 transform", className)}
        {...props}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-[#18181b]"
        />
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeLinecap="round"
          fill="none"
          className={colorClass}
        />
      </svg>
      {showValue && (
        <span className="absolute text-xs font-bold font-mono text-white">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
};
