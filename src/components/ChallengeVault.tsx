import React, { useState } from 'react';
import { Search, Lock, CheckCircle2, Play, ChevronRight, Filter, Sparkles, Trophy, BookOpen, Clock } from 'lucide-react';
import { DailyChallenge, UserProgress } from '../types';

interface ChallengeVaultProps {
  challenges: DailyChallenge[];
  userProgress: UserProgress;
  onOpenWorkspaceWithDay: (day: number) => void;
}

export const ChallengeVault: React.FC<ChallengeVaultProps> = ({
  challenges,
  userProgress,
  onOpenWorkspaceWithDay
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Arrays & Hashing', 'Dynamic Programming', 'Graphs', 'Binary Search', 'Design & Linked List', 'System Design & Algorithms'];

  const filteredChallenges = challenges.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          c.companies.some(comp => comp.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDifficulty = selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-300">
      {/* Sprint Roadmap Banner */}
      <div className="bg-[#111111] border border-[#222222] rounded-3xl p-5 sm:p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
            Complete Curriculum
          </span>
          <span className="text-xs text-[#71717a] font-mono">
            {userProgress.completedDays.length} / 60 Solved
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          60-Day Engineering Vault
        </h2>
        <p className="text-xs text-[#a1a1aa] leading-relaxed">
          Curated DSA & System Design roadmap structured for Indian college placements at Google, Uber, Flipkart, Atlassian, and top startups.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#71717a] absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by topic, company (e.g. Google, DP, Binary Search)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#111111] border border-[#222222] rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder-[#52525b] focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>

        {/* Difficulty Pill Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDifficulty === diff
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-[#141414] text-[#a1a1aa] border border-[#222222] hover:border-[#333333]'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        {/* Category Pill Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-black font-bold'
                  : 'bg-[#141414] text-[#71717a] border border-[#222222] hover:text-[#a1a1aa]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 60-Day Challenge List */}
      <div className="space-y-3">
        {filteredChallenges.map((challenge) => {
          const isCompleted = userProgress.completedDays.includes(challenge.day);
          const isUnlocked = challenge.unlocked || isCompleted;

          return (
            <div
              key={challenge.day}
              className={`bg-[#111111] border rounded-2xl p-4 transition-all ${
                isCompleted
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : challenge.day === 14
                  ? 'border-indigo-500/50 bg-indigo-500/5 shadow-lg shadow-indigo-500/5'
                  : 'border-[#222222] hover:border-[#333333]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Day Badge */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs font-mono shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : isUnlocked
                      ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                      : 'bg-[#18181b] text-[#52525b] border border-[#27272a]'
                  }`}>
                    D{challenge.day}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.2 rounded border ${
                        challenge.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        challenge.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}>
                        {challenge.difficulty}
                      </span>
                      <span className="text-[10px] text-[#71717a]">{challenge.category}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white leading-snug">
                      {challenge.title}
                    </h3>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="shrink-0 pt-1">
                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" /> Solved
                    </span>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => onOpenWorkspaceWithDay(challenge.day)}
                      className="flex items-center gap-1 text-[10px] font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded-full transition-colors shadow-sm"
                    >
                      <Play className="w-3 h-3 fill-white" /> Solve
                    </button>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] text-[#52525b] bg-[#18181b] px-2.5 py-1 rounded-full border border-[#27272a]">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  )}
                </div>
              </div>

              {/* Tags & Companies */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#1a1a1a] text-[10px] text-[#71717a]">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {challenge.tags.map((tag, idx) => (
                    <span key={idx} className="bg-[#181818] text-[#a1a1aa] px-2 py-0.5 rounded text-[9px]">
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-indigo-400 font-medium">+{challenge.xp} XP</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
