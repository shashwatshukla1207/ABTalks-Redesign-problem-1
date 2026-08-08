import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  id?: string;
  type?: "success" | "error" | "warning" | "info";
  title: React.ReactNode;
  message?: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  type = "info",
  title,
  message,
  isVisible,
  onClose,
  duration = 4000,
}) => {
  React.useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <XCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-400 shrink-0" />,
  };

  const borders = {
    success: "border-emerald-500/30 bg-[#0d1512]",
    error: "border-rose-500/30 bg-[#170e0f]",
    warning: "border-amber-500/30 bg-[#17140b]",
    info: "border-indigo-500/30 bg-[#0d0e1a]",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={cn(
            "fixed top-4 left-4 right-4 z-50 max-w-sm mx-auto p-4 rounded-2xl border shadow-xl flex items-start gap-3 text-xs text-[#ededed]",
            borders[type]
          )}
        >
          {icons[type]}
          <div className="flex-1 pr-2">
            <h4 className="font-semibold text-white text-xs">{title}</h4>
            {message && <p className="text-[#a1a1aa] mt-0.5">{message}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-[#71717a] hover:text-white transition-colors cursor-pointer p-0.5"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
