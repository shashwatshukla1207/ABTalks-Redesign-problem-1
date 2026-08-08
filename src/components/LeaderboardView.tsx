import React, { useState } from 'react';
import { Trophy, Search, Flame, School, Medal, ChevronRight, Users, Sparkles, Shield } from 'lucide-react';
import { LeaderboardEntry, CollegeLeaderboardEntry, UserProgress } from '../types';

interface LeaderboardViewProps {
  individualLeaderboard: LeaderboardEntry[];
  collegeLeaderboard: CollegeLeaderboardEntry[];
  userProgress: UserProgress;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  individualLeaderboard,
  collegeLeaderboard,
  userProgress
}) => {
  const [viewMode, setViewMode] = useState<'individual' | 'college'>('individual');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIndividual = individualLeaderboard.filter(e => {
    const matchesTier = selectedTier === 'All' || e.collegeTier === selectedTier;
    const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.college.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const filteredCollege = collegeLeaderboard.filter(c => {
    const matchesTier = selectedTier === 'All' || c.tier === selectedTier;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-[#111111] border border-[#222222] rounded-3xl p-5 sm:p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-amber-400 uppercase tracking-widest font-bold bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
            All India Standings
          </span>
          <span className="text-xs text-[#71717a] font-mono">
            Updated Real-time
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Pan-India Coder Leaderboard
        </h2>
        <p className="text-xs text-[#a1a1aa]">
          Compete against engineering students across Tier-1, Tier-2, and Tier-3 Indian colleges.
        </p>
      </div>

      {/* Mode Switcher (Individual vs College) */}
      <div className="bg-[#111111] border border-[#222222] rounded-2xl p-1.5 flex gap-1">
        <button
          onClick={() => setViewMode('individual')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            viewMode === 'individual'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
              : 'text-[#71717a] hover:text-[#a1a1aa]'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Individual Coders</span>
        </button>

        <button
          onClick={() => setViewMode('college')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            viewMode === 'college'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
              : 'text-[#71717a] hover:text-[#a1a1aa]'
          }`}
        >
          <School className="w-3.5 h-3.5" />
          <span>Colleges & Tiers</span>
        </button>
      </div>

      {/* Tier Filter Pills & Search */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#71717a] absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder={viewMode === 'individual' ? "Search student or college..." : "Search college name..."}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#111111] border border-[#222222] rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder-[#52525b] focus:outline-none focus:border-indigo-500/50"
          />
        </div>

        <div className="flex gap-2">
          {['All', 'Tier 1', 'Tier 2', 'Tier 3'].map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedTier === tier
                  ? 'bg-white text-black font-bold'
                  : 'bg-[#141414] text-[#a1a1aa] border border-[#222222] hover:border-[#333]'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Individual Leaderboard List */}
      {viewMode === 'individual' ? (
        <div className="space-y-2.5">
          {filteredIndividual.map((entry) => (
            <div
              key={entry.id}
              className={`bg-[#111111] border rounded-2xl p-3.5 flex items-center justify-between transition-all ${
                entry.isCurrentUser
                  ? 'border-indigo-500/50 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
                  : entry.rank === 1
                  ? 'border-amber-500/40 bg-amber-500/5'
                  : 'border-[#222222] hover:border-[#333]'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Rank Badge */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                  entry.rank === 1 ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30' :
                  entry.rank === 2 ? 'bg-zinc-300 text-black' :
                  entry.rank === 3 ? 'bg-amber-700 text-white' :
                  'bg-[#18181b] text-[#71717a] border border-[#27272a]'
                }`}>
                  #{entry.rank}
                </div>

                <img src={entry.avatar} alt={entry.name} className="w-9 h-9 rounded-full object-cover border border-[#333]" />

                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-white">{entry.name}</p>
                    <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.2 rounded border border-indigo-500/20 font-medium">
                      {entry.collegeTier}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#71717a]">{entry.college}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-right">
                <div>
                  <p className="text-xs font-bold text-indigo-300 font-mono">{entry.xp} XP</p>
                  <p className="text-[9px] text-[#71717a]">{entry.solvedCount} Solved</p>
                </div>
                <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2 py-1 rounded-full border border-amber-500/20 text-xs font-bold font-mono">
                  <Flame className="w-3 h-3 fill-amber-500" /> {entry.streak}d
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* College Leaderboard List */
        <div className="space-y-2.5">
          {filteredCollege.map((col) => (
            <div key={col.id} className="bg-[#111111] border border-[#222222] rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#18181b] text-[#a1a1aa] border border-[#27272a] font-mono font-bold text-xs flex items-center justify-center">
                  #{col.rank}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-white">{col.name}</h3>
                    <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.2 rounded border border-indigo-500/20 font-medium">
                      {col.tier}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#71717a]">
                    Top Coder: <span className="text-indigo-300 font-medium">{col.topCoder}</span> • {col.studentCount} Students
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs font-bold text-indigo-300 font-mono">{(col.totalXp / 1000).toFixed(0)}k Total XP</p>
                <p className="text-[10px] text-[#71717a]">Avg Streak: {col.avgStreak}d</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sticky User Position Banner */}
      <div className="fixed bottom-16 left-0 right-0 z-30 max-w-md mx-auto px-4 sm:max-w-none">
        <div className="bg-[#18181b]/95 backdrop-blur-xl border border-indigo-500/40 rounded-2xl p-3 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              #{userProgress.rank}
            </div>
            <div>
              <p className="text-xs font-bold text-white">Your National Rank</p>
              <p className="text-[10px] text-[#a1a1aa]">{userProgress.college} • Tier 1</p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-indigo-300 font-bold">
            <span>{userProgress.totalXp} XP</span>
            <span className="text-amber-400 flex items-center gap-0.5">
              <Flame className="w-3.5 h-3.5 fill-amber-500" /> {userProgress.streakCount}d
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
