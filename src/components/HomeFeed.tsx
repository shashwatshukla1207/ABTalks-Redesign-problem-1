import React, { useState, useEffect } from 'react';
import { Flame, Clock, Zap, Trophy, Shield, ChevronRight, Play, CheckCircle2, Lock, Sparkles, Award, Users, BookOpen, ExternalLink } from 'lucide-react';
import { UserProgress, DailyChallenge, LeaderboardEntry } from '../types';

interface HomeFeedProps {
  userProgress: UserProgress;
  todayChallenge: DailyChallenge;
  onOpenWorkspace: () => void;
  onNavigateToTab: (tab: 'vault' | 'leaderboard' | 'profile' | 'community') => void;
  topLeaderboard: LeaderboardEntry[];
}

export const HomeFeed: React.FC<HomeFeedProps> = ({
  userProgress,
  todayChallenge,
  onOpenWorkspace,
  onNavigateToTab,
  topLeaderboard
}) => {
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 45, seconds: 12 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const progressPercent = Math.min(100, Math.round((userProgress.currentXp / userProgress.nextLevelXp) * 100));

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-300">
      {/* Sprint Header Banner */}
      <div className="bg-[#111111] border border-[#222222] rounded-3xl p-5 sm:p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/5 blur-2xl pointer-events-none" />

        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[10px] text-[#71717a] uppercase tracking-widest font-bold mb-1">
              The 60-Day Engineering Sprint
            </p>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Day {userProgress.completedDays.length} <span className="text-indigo-400 font-normal">/ 60 Days</span>
            </h2>
          </div>

          {/* Streak Flame Badge */}
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full text-xs font-bold">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
            <span>{userProgress.streakCount} Day Streak</span>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="space-y-2 mb-2">
          <div className="flex justify-between text-xs text-[#a1a1aa]">
            <span className="font-medium text-white flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/20" /> Level {userProgress.level} Coder
            </span>
            <span className="font-mono text-[11px]">
              {userProgress.currentXp} / {userProgress.nextLevelXp} XP
            </span>
          </div>
          <div className="w-full bg-[#222222] h-2 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <p className="text-[11px] text-[#71717a] text-right font-mono">
          {userProgress.nextLevelXp - userProgress.currentXp} XP to Level {userProgress.level + 1}
        </p>
      </div>

      {/* Circadian Unlock & Today's Focus Challenge Card */}
      <div className="bg-[#141414] border border-[#222222] rounded-3xl p-5 sm:p-6 relative overflow-hidden shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <h4 className="text-[#71717a] text-[10px] uppercase tracking-widest font-bold">
              Today's Challenge • Unlocked at 9 PM IST
            </h4>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 font-mono">
            <Clock className="w-3 h-3" />
            <span>
              {String(countdown.hours).padStart(2, '0')}:{String(countdown.minutes).padStart(2, '0')}:{String(countdown.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20">
              {todayChallenge.difficulty}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              +{todayChallenge.xp} XP
            </span>
            <span className="text-xs text-[#71717a]">• {todayChallenge.category}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
            {todayChallenge.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#a1a1aa] line-clamp-2 leading-relaxed">
            {todayChallenge.description}
          </p>
        </div>

        {/* Company tags */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[10px] text-[#71717a] uppercase font-bold tracking-wider">Asked in:</span>
          <div className="flex flex-wrap gap-1.5">
            {todayChallenge.companies.map((company, idx) => (
              <span key={idx} className="bg-[#1f1f1f] border border-[#2a2a2a] text-[#d4d4d8] text-[10px] px-2 py-0.5 rounded-md">
                {company}
              </span>
            ))}
          </div>
        </div>

        {/* Start Daily Challenge CTA */}
        <button
          onClick={onOpenWorkspace}
          className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-3.5 rounded-2xl text-sm shadow-xl shadow-white/5 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <Play className="w-4 h-4 fill-black text-black group-hover:scale-110 transition-transform" />
          <span>Solve Today's Challenge (Day {todayChallenge.day})</span>
        </button>
      </div>

      {/* 60-Day Sprint Heatmap & Consistency Grid */}
      <div className="bg-[#111111] border border-[#222222] rounded-3xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              60-Day Consistency Grid
            </h4>
            <p className="text-[11px] text-[#71717a]">
              {userProgress.completedDays.length} of 60 Days Completed • {userProgress.maxStreak} Max Streak
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('vault')}
            className="text-[11px] text-indigo-400 font-bold hover:underline flex items-center gap-0.5"
          >
            <span>Full Vault</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 60 Boxes Grid */}
        <div className="grid grid-cols-10 gap-1.5 pt-2">
          {Array.from({ length: 60 }, (_, i) => {
            const dayNum = i + 1;
            const isCompleted = userProgress.completedDays.includes(dayNum);
            const isToday = dayNum === todayChallenge.day;

            return (
              <div
                key={dayNum}
                onClick={onOpenWorkspace}
                title={`Day ${dayNum}: ${isCompleted ? 'Completed (+XP)' : isToday ? 'Unlocked (Today)' : 'Locked'}`}
                className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-mono transition-all cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold'
                    : isToday
                    ? 'bg-indigo-500/30 text-indigo-300 border-2 border-indigo-500 font-bold animate-pulse'
                    : 'bg-[#18181b] text-[#52525b] border border-[#27272a] hover:border-[#3f3f46]'
                }`}
              >
                {dayNum}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[10px] text-[#71717a] pt-1">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500/40" /> Completed
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-indigo-500/30 border border-indigo-500" /> Today
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-[#18181b] border border-[#27272a]" /> Locked
            </span>
          </div>
          <span className="text-amber-400 font-medium flex items-center gap-1">
            <Shield className="w-3 h-3" /> {userProgress.streakFreezeCount} Freezes Equipped
          </span>
        </div>
      </div>

      {/* College & Peer Pulse Leaderboard Teaser */}
      <div className="bg-[#111111] border border-[#222222] rounded-3xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Peer Leaderboard ({userProgress.college})
            </h4>
            <p className="text-[11px] text-[#71717a]">
              Your Rank: <span className="text-indigo-400 font-bold">#{userProgress.rank}</span> in India
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('leaderboard')}
            className="text-[11px] text-indigo-400 font-bold hover:underline flex items-center gap-0.5"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {topLeaderboard.slice(0, 3).map((entry) => (
            <div
              key={entry.id}
              className="bg-[#161616] border border-[#222222] rounded-2xl p-3 flex items-center justify-between hover:border-[#333333] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={entry.avatar}
                    alt={entry.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#333]"
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-indigo-600 rounded-full text-[9px] font-bold text-white flex items-center justify-center border border-black">
                    #{entry.rank}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-white">{entry.name}</p>
                    <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.2 rounded border border-indigo-500/20 font-medium">
                      {entry.collegeTier}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#71717a]">
                    {entry.college} • {entry.xp} XP
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-xs font-bold flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  <Flame className="w-3 h-3 fill-amber-500" /> {entry.streak}d
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why 9 PM Circadian Unlock Mechanics */}
      <div className="bg-gradient-to-br from-[#121020] to-[#0c0c14] border border-indigo-500/20 rounded-3xl p-5 space-y-2 relative overflow-hidden">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>The Circadian 9 PM IST Mechanism</span>
        </div>
        <p className="text-xs text-[#a1a1aa] leading-relaxed">
          Every evening at 9:00 PM IST, 8,400+ students from Tier-1, Tier-2, and Tier-3 Indian colleges unlock the same daily challenge together. Solved within 30 minutes? Earn the coveted <span className="text-indigo-300 font-semibold">Night Owl 🦉</span> badge and +20% XP bonus!
        </p>
      </div>
    </div>
  );
};
