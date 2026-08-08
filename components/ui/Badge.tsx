import React from "react";
import { cn } from "@/lib/utils";
import { Flame, Zap, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "error" | "xp" | "streak" | "neutral" | "outline";
  size?: "sm" | "md";
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "neutral",
  size = "md",
  icon,
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center gap-1.5 font-semibold rounded-full select-none whitespace-nowrap";

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  };

  const variants = {
    neutral: "bg-[#18181b] text-[#a1a1aa] border border-[#27272a]",
    outline: "bg-transparent text-[#a1a1aa] border border-[#27272a]",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    error: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
    xp: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono",
    streak: "bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm shadow-amber-500/10",
  };

  const defaultIcons = {
    success: <CheckCircle2 className="w-3 h-3 text-emerald-400" />,
    warning: <AlertTriangle className="w-3 h-3 text-amber-400" />,
    error: <XCircle className="w-3 h-3 text-rose-400" />,
    xp: <Zap className="w-3 h-3 text-indigo-400 fill-indigo-400/20" />,
    streak: <Flame className="w-3 h-3 text-amber-400 fill-amber-400/30 animate-pulse" />,
    neutral: null,
    outline: null,
  };

  return (
    <span
      className={cn(baseStyles, sizes[size], variants[variant], className)}
      {...props}
    >
      {icon ?? defaultIcons[variant]}
      <span>{children}</span>
    </span>
  );
};
