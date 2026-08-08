import React, { useState, useEffect } from 'react';
import { Home, Compass, Trophy, User, Code, Shield, Flame, Clock, Sparkles, Smartphone, Monitor, BookOpen } from 'lucide-react';
import { UserProgress } from '../types';

interface NavigationProps {
  activeTab: 'home' | 'vault' | 'workspace' | 'leaderboard' | 'profile' | 'community';
  setActiveTab: (tab: 'home' | 'vault' | 'workspace' | 'leaderboard' | 'profile' | 'community') => void;
  userProgress: UserProgress;
  onOpenDesignSystem: () => void;
  isMobileFrameView: boolean;
  setIsMobileFrameView: (val: boolean) => void;
  onOpenWorkspace: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  userProgress,
  onOpenDesignSystem,
  isMobileFrameView,
  setIsMobileFrameView,
  onOpenWorkspace
}) => {
  const [timeLeft, setTimeLeft] = useState<string>('02:45:10');

  // Simulate Circadian Countdown to 9:00 PM IST
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const target = new Date();
      target.setHours(21, 0, 0, 0); // 9:00 PM IST
      if (now > target) {
        target.setDate(target.getDate() + 1);
      }
      const diff = Math.floor((target.getTime() - now.getTime()) / 1000);
      const h = String(Math.floor(diff / 3600)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
      const s = String(diff % 60).padStart(2, '0');
      setTimeLeft(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Top Header - Global App Navigation (Visible on both desktop & inside device frame) */}
      <header className="sticky top-0 z-40 bg-[#080808]/90 backdrop-blur-xl border-b border-[#222222] px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 flex items-center justify-center font-bold text-white text-base tracking-tighter shadow-lg shadow-indigo-500/20">
            AB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-white leading-none">ABTalks</h1>
              <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] font-semibold px-1.5 py-0.5 rounded tracking-wider uppercase">
                60-DAY SPRINT
              </span>
            </div>
            <p className="text-[10px] text-[#71717a] font-medium tracking-wide">
              Day {userProgress.completedDays.length} / 60 • {userProgress.college}
            </p>
          </div>
        </div>

        {/* Right Status Indicators & Tools */}
        <div className="flex items-center gap-2">
          {/* Circadian 9 PM Unlock Countdown Pill */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#141414] border border-[#222222] px-2.5 py-1 rounded-full text-xs text-[#a1a1aa]" title="Next Challenge Unlocks at 9:00 PM IST">
            <Clock className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span className="font-mono text-[11px] text-indigo-300 font-medium">{timeLeft}</span>
          </div>

          {/* Streak Flame Pill */}
          <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
            <span className="font-mono text-[12px]">{userProgress.streakCount}</span>
          </div>

          {/* Streak Freeze Shield Count */}
          <div className="flex items-center gap-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded-full text-xs font-semibold" title={`${userProgress.streakFreezeCount} Streak Freezes Equipped`}>
            <Shield className="w-3.5 h-3.5 fill-blue-500/30 text-blue-400" />
            <span className="font-mono text-[11px]">{userProgress.streakFreezeCount}</span>
          </div>

          {/* Device Toggle (Desktop Preview vs Mobile Frame) */}
          <button
            onClick={() => setIsMobileFrameView(!isMobileFrameView)}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141414] border border-[#222222] text-[11px] text-[#a1a1aa] hover:text-white hover:border-[#333] transition-colors"
            title="Toggle Mobile 390px Viewport Frame"
          >
            {isMobileFrameView ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-indigo-400" />
                <span>Full Layout</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
                <span>390px Mobile Frame</span>
              </>
            )}
          </button>

          {/* Design System Spec Button */}
          <button
            onClick={onOpenDesignSystem}
            className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all text-xs font-semibold flex items-center gap-1"
            title="Inspect ABTalks Design System Spec"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden xs:inline text-[10px] uppercase tracking-wider font-bold">Specs</span>
          </button>
        </div>
      </header>

      {/* Bottom Navigation Bar for Mobile-First Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-[#1a1a1a] flex items-center justify-around px-2 max-w-md mx-auto sm:max-w-none">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-xl ${
            activeTab === 'home' ? 'text-indigo-400 font-bold scale-105' : 'text-[#71717a] hover:text-[#a1a1aa]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-wider">Home</span>
        </button>

        <button
          onClick={() => setActiveTab('vault')}
          className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-xl ${
            activeTab === 'vault' ? 'text-indigo-400 font-bold scale-105' : 'text-[#71717a] hover:text-[#a1a1aa]'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-wider">Sprint</span>
        </button>

        {/* Floating Quick Solve Code Button */}
        <button
          onClick={onOpenWorkspace}
          className="flex flex-col items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white shadow-lg shadow-indigo-500/30 -mt-5 hover:scale-110 active:scale-95 transition-all border border-indigo-300/30"
          title="Open Daily Code Workspace"
        >
          <Code className="w-6 h-6" />
        </button>

        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-xl ${
            activeTab === 'leaderboard' ? 'text-indigo-400 font-bold scale-105' : 'text-[#71717a] hover:text-[#a1a1aa]'
          }`}
        >
          <Trophy className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-wider">Rank</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-xl ${
            activeTab === 'profile' ? 'text-indigo-400 font-bold scale-105' : 'text-[#71717a] hover:text-[#a1a1aa]'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-wider">Profile</span>
        </button>
      </nav>
    </>
  );
};
