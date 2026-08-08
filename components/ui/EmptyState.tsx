import React from "react";
import { FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <FolderOpen className="w-8 h-8 text-[#52525b]" />,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-[#0c0c0c] border border-[#1f1f1f] space-y-3",
        className
      )}
    >
      <div className="p-3 bg-[#18181b] rounded-2xl border border-[#27272a] inline-flex items-center justify-center">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-white">{title}</h3>
        {description && (
          <p className="text-xs text-[#a1a1aa] max-w-xs mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
};
