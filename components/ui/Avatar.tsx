import React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "busy" | "away";
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  fallback = "AB",
  size = "md",
  status,
  className,
  ...props
}) => {
  const [imageError, setImageError] = React.useState(false);

  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-xs font-semibold",
    lg: "w-12 h-12 text-sm font-semibold",
    xl: "w-16 h-16 text-base font-bold",
  };

  const statusColors = {
    online: "bg-emerald-500",
    offline: "bg-zinc-500",
    busy: "bg-rose-500",
    away: "bg-amber-500",
  };

  return (
    <div className="relative inline-block select-none" {...props}>
      <div
        className={cn(
          "rounded-full overflow-hidden flex items-center justify-center bg-[#1c1c1f] text-white border border-[#2a2a2e] shrink-0 font-mono",
          sizes[size],
          className
        )}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{fallback.substring(0, 2).toUpperCase()}</span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-[#050505]",
            sizes[size] === sizes.sm ? "w-2.5 h-2.5" : "w-3 h-3",
            statusColors[status]
          )}
        />
      )}
    </div>
  );
};
