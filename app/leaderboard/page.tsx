"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy,
  Flame,
  Zap,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Award,
  Crown,
  Medal,
  ShieldCheck,
  ChevronRight,
  Star,
  Users,
  Code2,
  Building2,
  Calendar,
  Layers,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LinearProgress } from "@/components/ui/Progress";
import { Avatar } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";

interface LeaderboardStudent {
  rank: number;
  rankChange?: string;
  name: string;
  track: string;
  college: string;
  xp: number;
  streak: number;
  avatar: string;
  score: number;
  badge?: string;
  isUser?: boolean;
  projects?: number;
}

// Podium Top 3 Data
const PODIUM_STUDENTS: LeaderboardStudent[] = [
  {
    rank: 1,
    rankChange: "MAX",
    name: "Aarav Sharma",
    track: "Full Stack",
    college: "IIT Bombay",
    xp: 4850,
    streak: 34,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    score: 96,
    badge: "Gold Medalist",
  },
  {
    rank: 2,
    rankChange: "+1",
    name: "Priya Patel",
    track: "AI Systems",
    college: "BITS Pilani",
    xp: 4620,
    streak: 32,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    score: 94,
    badge: "Silver Builder",
  },
  {
    rank: 3,
    rankChange: "+3",
    name: "Rahul Sharma (You)",
    track: "Full Stack",
    college: "State Tech Univ",
    xp: 4250,
    streak: 14,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
    score: 88,
    badge: "Bronze Finisher",
    isUser: true,
  },
];

// Leaderboard Students List
const LEADERBOARD_LIST: LeaderboardStudent[] = [
  ...PODIUM_STUDENTS,
  {
    rank: 4,
    rankChange: "+2",
    name: "Vikram R.",
    track: "Systems Eng",
    college: "DTU Delhi",
    xp: 3980,
    streak: 28,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    score: 85,
    projects: 42,
  },
  {
    rank: 5,
    rankChange: "-1",
    name: "Ananya Iyer",
    track: "Full Stack",
    college: "NIT Trichy",
    xp: 3750,
    streak: 21,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    score: 82,
    projects: 38,
  },
  {
    rank: 6,
    rankChange: "+4",
    name: "Rohan Kulkarni",
    track: "AI Systems",
    college: "COEP Pune",
    xp: 3610,
    streak: 19,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    score: 80,
    projects: 35,
  },
  {
    rank: 7,
    rankChange: "NEW",
    name: "Sneha Reddy",
    track: "Full Stack",
    college: "JNTU Hyderabad",
    xp: 3420,
    streak: 17,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    score: 78,
    projects: 30,
  },
];

// Live Ticker Events
const TICKER_EVENTS = [
  "🔥 Riya completed Day 28 (Redis Eviction)",
  "⚡ Aman earned +150 XP in AI Systems",
  "🏆 Rahul unlocked Recruiter Ready Status",
  "💎 Priya crossed 30-Day Commit Streak",
];

export default function LeaderboardPage() {
  const [filterCategory, setFilterCategory] = useState("overall");
  const [trackFilter, setTrackFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = LEADERBOARD_LIST.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.college.toLowerCase().includes(searchQuery.toLowerCase());

    if (trackFilter === "all") return matchesSearch;
    if (trackFilter === "fullstack") return matchesSearch && student.track.includes("Full Stack");
    if (trackFilter === "aiml") return matchesSearch && student.track.includes("AI");
    if (trackFilter === "systems") return matchesSearch && student.track.includes("Systems");
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed] font-sans flex flex-col pb-32 selection:bg-indigo-500/30">
      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-xl border-b border-[#1f1f28] px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-yellow-400 font-bold block">
                COHORT #08 RANKS
              </span>
              <h1 className="text-xs font-bold text-white">Global Leaderboard</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="streak" size="sm">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>12,400 Builders</span>
            </Badge>
          </div>
        </div>
      </header>

      {/* LIVE TICKER BANNER */}
      <div className="bg-[#0c0c14] border-b border-[#1f1f28] py-2 px-4 overflow-hidden">
        <div className="max-w-md mx-auto flex items-center gap-2 text-[11px] text-indigo-300 font-mono">
          <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-bold text-[9px] uppercase tracking-wider shrink-0">
            LIVE
          </span>
          <div className="w-full overflow-hidden whitespace-nowrap">
            <span className="inline-block animate-marquee font-medium">
              {TICKER_EVENTS.join("   •   ")}
            </span>
          </div>
        </div>
      </div>

      <main className="flex-1 px-4 pt-4 space-y-5 max-w-md mx-auto w-full">
        {/* SEARCH BAR */}
        <Input
          placeholder="Search student or college..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4 text-[#71717a]" />}
        />

        {/* TIME & CATEGORY FILTERS */}
        <div className="space-y-2">
          <div className="flex gap-1.5 p-1 bg-[#0c0c10] border border-[#1f1f28] rounded-2xl overflow-x-auto no-scrollbar text-xs">
            {["overall", "weekly", "monthly", "college"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`flex-1 py-1.5 px-3 rounded-xl font-semibold capitalize transition-all cursor-pointer ${
                  filterCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-[#71717a] hover:text-[#a1a1aa]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* TRACK FILTER CHIPS */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar text-[10px]">
            {[
              { id: "all", label: "All Tracks" },
              { id: "fullstack", label: "Full Stack" },
              { id: "aiml", label: "AI/ML" },
              { id: "systems", label: "Systems" },
            ].map((trk) => (
              <button
                key={trk.id}
                onClick={() => setTrackFilter(trk.id)}
                className={`py-1 px-2.5 rounded-lg border font-mono transition-all cursor-pointer ${
                  trackFilter === trk.id
                    ? "bg-[#1f1f2e] text-indigo-300 border-indigo-500/40 font-bold"
                    : "bg-[#0c0c10] text-[#71717a] border-[#1f1f28]"
                }`}
              >
                {trk.label}
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 1: PODIUM (TOP 3 SHOWCASE) */}
        <div className="pt-2 pb-1">
          <Card variant="gradient" className="p-4 border-amber-500/30 bg-[#0e0c08] space-y-4 relative overflow-hidden">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                HALL OF FAME
              </span>
              <h2 className="text-sm font-bold text-white">Top Cohort #08 Leaders</h2>
            </div>

            {/* Podium Columns */}
            <div className="flex items-end justify-center gap-2 pt-2">
              {/* Rank 2 - Silver */}
              <div className="flex-1 flex flex-col items-center text-center space-y-1">
                <Avatar src={PODIUM_STUDENTS[1].avatar} fallback="PP" size="md" className="ring-2 ring-slate-400" />
                <span className="text-[10px] font-bold text-white truncate max-w-[80px]">
                  {PODIUM_STUDENTS[1].name}
                </span>
                <span className="text-[9px] text-slate-400 font-mono font-bold">
                  {PODIUM_STUDENTS[1].xp} XP
                </span>
                <div className="w-full bg-[#1c1c28] border border-slate-500/40 rounded-t-xl py-3 flex flex-col items-center justify-center">
                  <Medal className="w-5 h-5 text-slate-300" />
                  <span className="text-xs font-black text-slate-200 mt-1">#2</span>
                </div>
              </div>

              {/* Rank 1 - Gold (Center, Taller) */}
              <div className="flex-1 flex flex-col items-center text-center space-y-1 -mt-4">
                <div className="relative">
                  <Avatar src={PODIUM_STUDENTS[0].avatar} fallback="AS" size="lg" className="ring-2 ring-amber-400" />
                  <Crown className="w-4 h-4 text-amber-400 absolute -top-3 left-1/2 -translate-x-1/2 animate-bounce" />
                </div>
                <span className="text-[11px] font-extrabold text-amber-300 truncate max-w-[90px]">
                  {PODIUM_STUDENTS[0].name}
                </span>
                <span className="text-[9px] text-amber-400 font-mono font-bold">
                  {PODIUM_STUDENTS[0].xp} XP
                </span>
                <div className="w-full bg-gradient-to-b from-amber-500/30 to-[#1c1a10] border border-amber-500/50 rounded-t-xl py-5 flex flex-col items-center justify-center shadow-lg shadow-amber-500/10">
                  <Trophy className="w-6 h-6 text-amber-400" />
                  <span className="text-sm font-black text-amber-300 mt-1">#1</span>
                </div>
              </div>

              {/* Rank 3 - Bronze */}
              <div className="flex-1 flex flex-col items-center text-center space-y-1">
                <Avatar src={PODIUM_STUDENTS[2].avatar} fallback="RS" size="md" className="ring-2 ring-amber-700" />
                <span className="text-[10px] font-bold text-white truncate max-w-[80px]">
                  {PODIUM_STUDENTS[2].name}
                </span>
                <span className="text-[9px] text-amber-600 font-mono font-bold">
                  {PODIUM_STUDENTS[2].xp} XP
                </span>
                <div className="w-full bg-[#1a1410] border border-amber-700/40 rounded-t-xl py-2 flex flex-col items-center justify-center">
                  <Award className="w-5 h-5 text-amber-600" />
                  <span className="text-xs font-black text-amber-500 mt-1">#3</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* SECTION 2: FULL LEADERBOARD LIST */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-white flex items-center justify-between">
            <span>Rankings ({filteredStudents.length} Students)</span>
            <span className="text-[10px] text-[#71717a] font-mono">Updated 5 mins ago</span>
          </h3>

          <div className="space-y-2">
            {filteredStudents.map((st) => (
              <Card
                key={st.rank}
                variant="default"
                className={`p-3 flex items-center justify-between text-xs transition-all border-[#1f1f28] ${
                  st.isUser
                    ? "bg-indigo-600/15 border-indigo-500/40 shadow-lg shadow-indigo-600/10"
                    : "bg-[#0c0c10]"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Rank & Movement */}
                  <div className="flex flex-col items-center min-w-[28px]">
                    <span className="font-mono font-black text-xs text-white">#{st.rank}</span>
                    {st.rankChange && (
                      <span
                        className={`text-[9px] font-mono font-bold flex items-center ${
                          st.rankChange.startsWith("+")
                            ? "text-emerald-400"
                            : st.rankChange.startsWith("-")
                            ? "text-rose-400"
                            : "text-amber-400"
                        }`}
                      >
                        {st.rankChange}
                      </span>
                    )}
                  </div>

                  <Avatar src={st.avatar} fallback={st.name} size="md" />

                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      {st.name}
                      {st.isUser && <Badge variant="xp" size="sm" className="py-0 px-1 text-[8px]">YOU</Badge>}
                    </h4>
                    <p className="text-[10px] text-[#a1a1aa]">{st.college} • {st.track}</p>
                  </div>
                </div>

                {/* XP & Streak */}
                <div className="text-right space-y-0.5 font-mono">
                  <span className="text-indigo-400 font-bold block text-xs">{st.xp} XP</span>
                  <span className="text-amber-400 font-semibold text-[10px] flex items-center justify-end gap-0.5">
                    <Flame className="w-3 h-3 fill-amber-400/40" />
                    {st.streak}d
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* SECTION 3: COMMUNITY CHALLENGES */}
        <Card variant="gradient" className="p-4 space-y-3 border-indigo-500/30 bg-[#0a0a14]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-bold text-white">Weekend Mini Hackathon</h3>
            </div>
            <Badge variant="warning" size="sm">Active</Badge>
          </div>

          <p className="text-xs text-[#a1a1aa] leading-relaxed">
            Build a Rate Limiting Middleware in Rust or Go. Top 3 submissions receive recruiter priority badges.
          </p>

          <div className="flex items-center justify-between text-[11px] pt-1 font-mono border-t border-[#181822]">
            <span className="text-emerald-400 font-bold">+500 XP Pool</span>
            <span className="text-indigo-300 font-semibold">Ends in 22 Hours</span>
          </div>
        </Card>
      </main>

      {/* STICKY YOUR RANK BOTTOM CARD */}
      <div className="fixed bottom-0 left-0 right-0 z-40 max-w-7xl mx-auto bg-[#08080d]/95 backdrop-blur-2xl border-t border-[#1f1f28] p-3 px-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 font-black text-sm flex items-center justify-center">
              #3
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Rahul Sharma (You)</span>
              <span className="text-[10px] text-indigo-400 font-mono">4,250 XP • 14 Day Streak</span>
            </div>
          </div>

          <div className="text-right space-y-0.5">
            <span className="text-[10px] font-mono text-emerald-400 font-bold block">
              +370 XP to #2
            </span>
            <span className="text-[9px] text-[#71717a]">Keep building!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
