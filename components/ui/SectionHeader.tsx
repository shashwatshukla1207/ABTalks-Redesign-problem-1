import React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  action,
  badge,
  className,
}) => {
  return (
    <div className={cn("flex items-end justify-between gap-4 mb-4", className)}>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-white tracking-tight">{title}</h3>
          {badge}
        </div>
        {subtitle && <p className="text-xs text-[#a1a1aa]">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
