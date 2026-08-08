import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md";
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className,
  size = "md",
}) => {
  const switchWidths = {
    sm: "w-9 h-5",
    md: "w-11 h-6",
  };

  const handleSize = {
    sm: "w-3.5 h-3.5",
    md: "w-4.5 h-4.5",
  };

  const handlePositions = {
    sm: { on: 18, off: 3 },
    md: { on: 22, off: 3 },
  };

  return (
    <label
      className={cn(
        "inline-flex items-center gap-3 cursor-pointer select-none",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <div
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          "relative rounded-full transition-colors p-0.5 flex items-center border border-white/10",
          switchWidths[size],
          checked ? "bg-indigo-600 border-indigo-500" : "bg-[#18181b] border-[#27272a]"
        )}
      >
        <motion.div
          animate={{
            x: checked ? handlePositions[size].on : handlePositions[size].off,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "bg-white rounded-full shadow-md",
            handleSize[size]
          )}
        />
      </div>
      {label && <span className="text-xs font-medium text-[#ededed]">{label}</span>}
    </label>
  );
};
