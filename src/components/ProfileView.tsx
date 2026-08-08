import React, { useState } from 'react';
import { Shield, Award, Flame, Zap, CheckCircle2, RotateCcw, Sparkles, ExternalLink, Code, School, ChevronRight, Calendar } from 'lucide-react';
import { UserProgress, Badge } from '../types';
import { ALL_BADGES } from '../data/mockData';

interface ProfileViewProps {
  userProgress: UserProgress;
  onBuyStreakFreeze: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProgress,
  onBuyStreakFreeze
}) => {
  const [activeTab, setActiveTab] = useState<'badges' | 'history'>('badges');

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-300">
      {/* Profile Identity Card */}
      <div className="bg-[#111111] border border-[#222222] rounded-3xl p-5 sm:p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4">
          <img
            src={userProgress.avatar}
            alt={userProgress.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-xl"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-white">{userProgress.name}</h2>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono font-bold">
                Lvl {userProgress.level}
              </span>
            </div>
            <p className="text-xs text-[#a1a1aa] flex items-center gap-1.5 mt-0.5">
              <School className="w-3.5 h-3.5 text-indigo-400" />
              <span>{userProgress.college} ({userProgress.collegeTier}) • Batch of {userProgress.gradYear}</span>
            </p>
            <p className="text-[10px] text-[#71717a] font-mono mt-1">
              National Rank: #{userProgress.rank}
            </p>
          </div>
        </div>

        {/* 4 Primary Metric Stat Blocks */}
        <div className="grid grid-cols-4 gap-2 pt-5 border-t border-[#222222] mt-5">
          <div className="bg-[#161616] border border-[#222222] rounded-2xl p-2.5 text-center">
            <span className="text-[9px] text-[#71717a] uppercase font-bold tracking-wider block mb-1">Streak</span>
            <span className="text-sm sm:text-base font-mono font-bold text-amber-400 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 fill-amber-500" /> {userProgress.streakCount}d
            </span>
          </div>

          <div className="bg-[#161616] border border-[#222222] rounded-2xl p-2.5 text-center">
            <span className="text-[9px] text-[#71717a] uppercase font-bold tracking-wider block mb-1">Solved</span>
            <span className="text-sm sm:text-base font-mono font-bold text-emerald-400">
              {userProgress.completedDays.length}/60
            </span>
          </div>

          <div className="bg-[#161616] border border-[#222222] rounded-2xl p-2.5 text-center">
            <span className="text-[9px] text-[#71717a] uppercase font-bold tracking-wider block mb-1">Total XP</span>
            <span className="text-sm sm:text-base font-mono font-bold text-indigo-400">
              {userProgress.totalXp}
            </span>
          </div>

          <div className="bg-[#161616] border border-[#222222] rounded-2xl p-2.5 text-center">
            <span className="text-[9px] text-[#71717a] uppercase font-bold tracking-wider block mb-1">Freezes</span>
            <span className="text-sm sm:text-base font-mono font-bold text-blue-400 flex items-center justify-center gap-1">
              <Shield className="w-4 h-4 fill-blue-500/30" /> {userProgress.streakFreezeCount}
            </span>
          </div>
        </div>
      </div>

      {/* Streak Freeze Shield Inventory & Purchase */}
      <div className="bg-[#111111] border border-blue-500/30 rounded-3xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400 fill-blue-500/20" />
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Streak Freeze Inventory ({userProgress.streakFreezeCount} Equipped)
              </h3>
              <p className="text-[11px] text-[#71717a]">
                Protect your streak during college exams or offline hackathons!
              </p>
            </div>
          </div>
          <button
            onClick={onBuyStreakFreeze}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition-all shadow-md shadow-blue-600/20 whitespace-nowrap cursor-pointer"
          >
            Buy 1 (+300 XP)
          </button>
        </div>
      </div>

      {/* Tabs: Badges Showcase vs Submission History */}
      <div className="space-y-4">
        <div className="flex border-b border-[#222222] text-xs">
          <button
            onClick={() => setActiveTab('badges')}
            className={`pb-2 px-4 font-bold transition-all border-b-2 ${
              activeTab === 'badges'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-[#71717a] hover:text-[#a1a1aa]'
            }`}
          >
            Unlocked Badges ({ALL_BADGES.filter(b => b.isUnlocked).length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-2 px-4 font-bold transition-all border-b-2 ${
              activeTab === 'history'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-[#71717a] hover:text-[#a1a1aa]'
            }`}
          >
            Submission Log ({userProgress.submissions.length})
          </button>
        </div>

        {activeTab === 'badges' ? (
          <div className="grid grid-cols-2 gap-3">
            {ALL_BADGES.map((badge) => (
              <div
                key={badge.id}
                className={`bg-[#111111] border rounded-2xl p-4 space-y-2 transition-all ${
                  badge.isUnlocked
                    ? 'border-indigo-500/40 bg-indigo-500/5'
                    : 'border-[#222222] opacity-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{badge.icon}</span>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                    badge.isUnlocked
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-bold'
                      : 'bg-[#18181b] text-[#52525b] border-[#27272a]'
                  }`}>
                    {badge.isUnlocked ? badge.unlockedAt : 'Locked'}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{badge.name}</h4>
                  <p className="text-[10px] text-[#71717a] leading-relaxed mt-0.5">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {userProgress.submissions.map((sub) => (
              <div key={sub.id} className="bg-[#111111] border border-[#222222] rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Day {sub.day}: {sub.title}
                  </span>
                  <span className="text-[10px] text-[#71717a] font-mono">{sub.submittedAt}</span>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-[#71717a] font-mono">
                  <span>Language: <span className="text-indigo-300 font-bold uppercase">{sub.language}</span></span>
                  <span>Runtime: <span className="text-emerald-400">{sub.runtimeMs} ms</span></span>
                  <span>Memory: {sub.memoryMb} MB</span>
                </div>

                <pre className="bg-[#080808] border border-[#222222] p-2.5 rounded-xl text-[10px] font-mono text-indigo-300 overflow-x-auto">
                  {sub.code}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
