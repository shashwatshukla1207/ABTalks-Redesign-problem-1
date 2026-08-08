import React from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className,
}) => {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-2.5 cursor-pointer select-none text-xs font-medium text-[#ededed]",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <div
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          "w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 min-h-[20px]",
          checked
            ? "bg-indigo-600 border-indigo-500 text-white"
            : "bg-[#0c0c0c] border-[#27272a] hover:border-[#3f3f46]"
        )}
      >
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </motion.div>
        )}
      </div>
      {label && <span>{label}</span>}
    </label>
  );
};
