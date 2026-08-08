import React from "react";
import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "elevated" | "glass" | "gradient";
  hoverable?: boolean;
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      hoverable = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = "rounded-2xl p-4 sm:p-5 relative overflow-hidden";

    const variants = {
      default: "bg-[#0c0c0c] border border-[#1f1f1f] text-[#ededed]",
      elevated:
        "bg-[#121212] border border-[#222222] shadow-2xl shadow-black/60 text-[#ededed]",
      glass:
        "bg-[#0c0c0c]/70 backdrop-blur-md border border-white/10 text-[#ededed]",
      gradient:
        "bg-[#0c0c0c] border border-transparent [background-clip:padding-box,_border-box] [background-origin:border-box] [background-image:linear-gradient(to_bottom_right,#0c0c0c,#0c0c0c),linear-gradient(to_bottom_right,rgba(99,102,241,0.4),rgba(236,72,153,0.1),rgba(255,255,255,0.05))]",
    };

    return (
      <motion.div
        ref={ref}
        whileHover={hoverable ? { y: -2, transition: { duration: 0.2 } } : undefined}
        whileTap={hoverable ? { scale: 0.99 } : undefined}
        className={cn(
          baseStyles,
          variants[variant],
          hoverable && "cursor-pointer transition-shadow hover:shadow-lg hover:shadow-indigo-500/5 hover:border-[#333333]",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";
