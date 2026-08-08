import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: React.ReactNode;
  badge?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: "pill" | "line";
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
  variant = "pill",
}) => {
  if (variant === "line") {
    return (
      <div className={cn("flex border-b border-[#222222] gap-6 overflow-x-auto no-scrollbar", className)}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                "pb-3 text-xs font-semibold relative transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2",
                isActive ? "text-white" : "text-[#71717a] hover:text-[#a1a1aa]"
              )}
            >
              <span>{tab.label}</span>
              {tab.badge}
              {isActive && (
                <motion.div
                  layoutId="activeTabLine"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex p-1 bg-[#0c0c0c] border border-[#1f1f1f] rounded-2xl gap-1 overflow-x-auto no-scrollbar",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap flex items-center gap-2 flex-1 justify-center min-h-[36px] cursor-pointer",
              isActive ? "text-white" : "text-[#71717a] hover:text-[#a1a1aa]"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-[#1e1e24] border border-[#2e2e38] rounded-xl shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
            {tab.badge && <span className="relative z-10">{tab.badge}</span>}
          </button>
        );
      })}
    </div>
  );
};
