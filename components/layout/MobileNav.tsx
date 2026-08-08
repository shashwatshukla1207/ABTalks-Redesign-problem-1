import React from "react";
import { motion } from "motion/react";
import { Home, Compass, Trophy, User, Flame, Bell, ChevronLeft, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";

// Top App Bar
export interface TopAppBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  streakCount?: number;
  userAvatar?: string;
  userName?: string;
  rightActions?: React.ReactNode;
  className?: string;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  title = "ABTalks",
  showBack = false,
  onBack,
  streakCount = 12,
  userAvatar,
  userName = "Rahul S.",
  rightActions,
  className,
}) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-[#050505]/80 backdrop-blur-xl border-b border-[#1f1f1f] px-4 py-3 flex items-center justify-between",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {showBack ? (
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-[#141414] border border-[#222222] text-[#a1a1aa] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-md shadow-indigo-600/20">
              AB
            </div>
            <span className="font-extrabold tracking-tight text-white text-sm">
              {title}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        {rightActions ? (
          rightActions
        ) : (
          <>
            <Badge variant="streak" size="md">
              <span>{streakCount}d</span>
            </Badge>

            <button
              className="w-9 h-9 rounded-xl bg-[#141414] border border-[#222222] text-[#a1a1aa] hover:text-white flex items-center justify-center relative cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-[#050505]" />
            </button>

            <Avatar src={userAvatar} fallback={userName} size="sm" />
          </>
        )}
      </div>
    </header>
  );
};

// Bottom Navigation Bar
export interface BottomNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number | string;
}

export interface BottomNavProps {
  items?: BottomNavItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  items,
  activeId,
  onChange,
  className,
}) => {
  const defaultItems: BottomNavItem[] = [
    { id: "home", label: "Sprint", icon: <Home className="w-5 h-5" /> },
    { id: "challenges", label: "Challenges", icon: <Compass className="w-5 h-5" /> },
    { id: "leaderboard", label: "Ranks", icon: <Trophy className="w-5 h-5" /> },
    { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  ];

  const navItems = items || defaultItems;

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 max-w-7xl mx-auto bg-[#08080a]/90 backdrop-blur-xl border-t border-[#1f1f1f] px-3 py-2 sm:py-2.5",
        className
      )}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={cn(
                "relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl min-w-[64px] min-h-[44px] cursor-pointer transition-colors",
                isActive ? "text-white font-bold" : "text-[#71717a] hover:text-[#a1a1aa]"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavGlow"
                  className="absolute inset-0 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div className="relative z-10">{item.icon}</div>
              <span className="text-[10px] tracking-tight mt-0.5 relative z-10 font-medium">
                {item.label}
              </span>
              {item.badge !== undefined && (
                <span className="absolute top-1 right-2 px-1.5 py-0.2 text-[9px] font-mono font-bold bg-indigo-500 text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

// Sticky CTA Footer (for challenge or action pages)
export interface StickyCTAFooterProps {
  primaryActionLabel: string;
  onPrimaryAction: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  infoText?: React.ReactNode;
  className?: string;
}

export const StickyCTAFooter: React.FC<StickyCTAFooterProps> = ({
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  isLoading = false,
  disabled = false,
  infoText,
  className,
}) => {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-30 max-w-7xl mx-auto bg-[#08080a]/95 backdrop-blur-2xl border-t border-[#1f1f1f] p-4 space-y-2",
        className
      )}
    >
      {infoText && (
        <div className="text-center text-[11px] text-[#a1a1aa] font-medium">
          {infoText}
        </div>
      )}
      <div className="flex items-center gap-3 max-w-md mx-auto">
        {secondaryActionLabel && onSecondaryAction && (
          <Button
            variant="secondary"
            onClick={onSecondaryAction}
            className="flex-1 text-xs"
          >
            {secondaryActionLabel}
          </Button>
        )}
        <Button
          variant="primary"
          onClick={onPrimaryAction}
          isLoading={isLoading}
          disabled={disabled}
          className="flex-1 text-xs py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25"
        >
          {primaryActionLabel}
        </Button>
      </div>
    </div>
  );
};
