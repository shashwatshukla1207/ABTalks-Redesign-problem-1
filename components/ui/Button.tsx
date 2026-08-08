import React from "react";
import { motion, HTMLMotionProps } from "motion/react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "icon";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-2xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 min-h-[44px] cursor-pointer select-none";

    const variants = {
      primary:
        "bg-white text-black font-bold shadow-lg shadow-white/5 hover:bg-zinc-200 active:bg-zinc-300",
      secondary:
        "bg-[#141414] text-white border border-[#222222] hover:bg-[#1a1a1a] hover:border-[#333333] active:bg-[#222222]",
      ghost:
        "bg-transparent text-[#a1a1aa] hover:text-white hover:bg-[#141414] active:bg-[#1a1a1a]",
      danger:
        "bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 active:bg-rose-500/30",
      icon:
        "bg-[#141414] text-[#a1a1aa] border border-[#222222] hover:text-white hover:border-[#333333] p-2.5",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 min-h-[36px]",
      md: "text-xs font-bold px-4 py-3 min-h-[44px]",
      lg: "text-sm font-bold px-6 py-4 min-h-[52px]",
      icon: "w-11 h-11 p-0 flex items-center justify-center rounded-2xl",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.96 }}
        className={cn(
          baseStyles,
          variants[variant],
          size === "icon" ? sizes.icon : sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current mr-2" />
        ) : leftIcon ? (
          <span className="mr-2 inline-flex shrink-0">{leftIcon}</span>
        ) : null}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="ml-2 inline-flex shrink-0">{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
