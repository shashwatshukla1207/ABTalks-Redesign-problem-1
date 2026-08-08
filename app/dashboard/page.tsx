"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Flame,
  Zap,
  Bell,
  Moon,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Github,
  Linkedin,
  Trophy,
  Award,
  Sparkles,
  Play,
  RotateCcw,
  Check,
  ChevronRight,
  ShieldCheck,
  Code2,
  Calendar,
  Layers,
  Settings,
  Share2,
  X,
  Lock,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LinearProgress, CircularProgressRing } from "@/components/ui/Progress";
import { Avatar } from "@/components/ui/Avatar";
import { StatCard } from "@/components/ui/StatCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { TopAppBar, BottomNav } from "@/components/layout/MobileNav";

// Types for State Simulations
type DashboardScenario =
  | "normal"
  | "day1"
  | "missed"
  | "recovered"
  | "submitted"
  | "lateNight";

// Mock Leaderboard Data
const LEADERBOARD_PREVIEW = [
  { rank: 1, name: "Aarav Sharma", track: "Full Stack", xp: 4850, streak: 34, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" },
  { rank: 2, name: "Priya Patel", track: "AI Systems", xp: 4620, streak: 32, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80" },
  { rank: 3, name: "Rahul S. (You)", track: "Full Stack", xp: 4250, streak: 14, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80", isUser: true },
  { rank: 4, name: "Vikram R.", track: "Systems", xp: 3980, streak: 28, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" },
  { rank: 5, name: "Ananya Iyer", track: "Full Stack", xp: 3750, streak: 21, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" },
];

// Mock Achievements Data
const ACHIEVEMENTS = [
  { id: "1", title: "7 Day Streak", icon: <Flame className="w-4 h-4 text-amber-400" />, desc: "Built 7 days without breaking streak", unlocked: true },
  { id: "2", title: "500 XP Club", icon: <Zap className="w-4 h-4 text-indigo-400" />, desc: "Earned 500 total XP points", unlocked: true },
  { id: "3", title: "First Project", icon: <Code2 className="w-4 h-4 text-emerald-400" />, desc: "Shipped day 1 API build", unlocked: true },
  { id: "4", title: "GitHub Connected", icon: <Github className="w-4 h-4 text-white" />, desc: "Verified GitHub commit hook", unlocked: true },
  { id: "5", title: "Top Performer", icon: <Trophy className="w-4 h-4 text-yellow-400" />, desc: "Ranked top 5% in cohort", unlocked: true },
  { id: "6", title: "Recruiter Ready", icon: <ShieldCheck className="w-4 h-4 text-purple-400" />, desc: "Crossed 75% readiness score", unlocked: false },
];

// Mock Recent Activity
const RECENT_ACTIVITY = [
  { id: "a1", type: "commit", title: "Pushed Rate Limiter Middleware", time: "2 hours ago", xp: "+150 XP", icon: <Github className="w-3.5 h-3.5 text-white" /> },
  { id: "a2", type: "linkedin", title: "Shared Day 13 System Architecture", time: "5 hours ago", xp: "+50 XP", icon: <Linkedin className="w-3.5 h-3.5 text-sky-400" /> },
  { id: "a3", type: "badge", title: "Unlocked '7 Day Streak' Shield", time: "1 day ago", xp: "+100 XP", icon: <Award className="w-3.5 h-3.5 text-amber-400" /> },
  { id: "a4", type: "task", title: "Passed 18/18 API Test Cases", time: "1 day ago", xp: "+150 XP", icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("home");
  const [scenario, setScenario] = useState<DashboardScenario>("normal");
  const [showLateBanner, setShowLateBanner] = useState(true);
  const [selectedDay, setSelectedDay] = useState<number | null>(14);

  // Scenario Adjustments
  const currentDay = scenario === "day1" ? 1 : scenario === "missed" ? 13 : 14;
  const streakCount = scenario === "day1" ? 1 : scenario === "missed" ? 0 : scenario === "recovered" ? 15 : 14;
  const isSubmitted = scenario === "submitted";
  const isLateNight = scenario === "lateNight";

  // Matrix Days Array (1 to 60)
  const matrixDays = Array.from({ length: 60 }, (_, i) => {
    const dayNum = i + 1;
    let status: "completed" | "current" | "upcoming" | "missed" | "recovered" = "upcoming";

    if (dayNum < currentDay) {
      if (scenario === "missed" && dayNum === 13) {
        status = "missed";
      } else if (scenario === "recovered" && dayNum === 13) {
        status = "recovered";
      } else {
        status = "completed";
      }
    } else if (dayNum === currentDay) {
      status = isSubmitted ? "completed" : "current";
    }

    return { dayNum, status };
  });

  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed] font-sans flex flex-col pb-28 selection:bg-indigo-500/30">
      {/* SECTION 1: HEADER & USER NAV */}
      <header className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-xl border-b border-[#1f1f28] px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <Avatar
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80"
              fallback="RS"
              size="md"
              status="online"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xs font-bold text-white">Rahul Sharma</h1>
                <Badge variant="xp" size="sm" className="py-0 px-1.5 text-[9px]">Lvl 4</Badge>
              </div>
              <span className="text-[10px] text-indigo-400 font-semibold font-mono block">
                Full Stack Track • Cohort #08
              </span>
            </div>
          </div>

          {/* XP & Streak Pills */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold shadow-sm shadow-amber-500/10">
              <Flame className="w-3.5 h-3.5 fill-amber-400/40 animate-pulse" />
              <span>{streakCount}d</span>
            </div>

            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono text-xs font-bold">
              <Zap className="w-3.5 h-3.5 fill-indigo-400/40" />
              <span>4,250</span>
            </div>

            <button className="p-2 rounded-xl bg-[#14141c] border border-[#22222e] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 pt-4 space-y-5 max-w-md mx-auto w-full">
        {/* SCENARIO TOGGLE PANEL (DEMO / EDGE CASES SWITCHER) */}
        <Card variant="glass" className="p-3 border-indigo-500/20 bg-[#0e0e14]/90 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-indigo-300">
            <span className="font-bold flex items-center gap-1">
              <RefreshCw className="w-3 h-3 text-indigo-400" /> Simulate State:
            </span>
            <span className="uppercase font-bold text-indigo-400">{scenario}</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-[10px]">
            <button
              onClick={() => setScenario("normal")}
              className={`py-1.5 px-2 rounded-lg border font-semibold transition-all ${
                scenario === "normal"
                  ? "bg-indigo-600 text-white border-indigo-500"
                  : "bg-[#14141c] text-[#a1a1aa] border-[#22222e]"
              }`}
            >
              Normal Day
            </button>

            <button
              onClick={() => setScenario("submitted")}
              className={`py-1.5 px-2 rounded-lg border font-semibold transition-all ${
                scenario === "submitted"
                  ? "bg-emerald-600 text-white border-emerald-500"
                  : "bg-[#14141c] text-[#a1a1aa] border-[#22222e]"
              }`}
            >
              Submitted
            </button>

            <button
              onClick={() => setScenario("missed")}
              className={`py-1.5 px-2 rounded-lg border font-semibold transition-all ${
                scenario === "missed"
                  ? "bg-rose-600 text-white border-rose-500"
                  : "bg-[#14141c] text-[#a1a1aa] border-[#22222e]"
              }`}
            >
              Missed Day
            </button>

            <button
              onClick={() => setScenario("recovered")}
              className={`py-1.5 px-2 rounded-lg border font-semibold transition-all ${
                scenario === "recovered"
                  ? "bg-cyan-600 text-white border-cyan-500"
                  : "bg-[#14141c] text-[#a1a1aa] border-[#22222e]"
              }`}
            >
              Shield Restored
            </button>

            <button
              onClick={() => setScenario("lateNight")}
              className={`py-1.5 px-2 rounded-lg border font-semibold transition-all ${
                scenario === "lateNight"
                  ? "bg-purple-600 text-white border-purple-500"
                  : "bg-[#14141c] text-[#a1a1aa] border-[#22222e]"
              }`}
            >
              Late Night
            </button>

            <button
              onClick={() => setScenario("day1")}
              className={`py-1.5 px-2 rounded-lg border font-semibold transition-all ${
                scenario === "day1"
                  ? "bg-amber-600 text-white border-amber-500"
                  : "bg-[#14141c] text-[#a1a1aa] border-[#22222e]"
              }`}
            >
              Day 1 Mode
            </button>
          </div>
        </Card>

        {/* SECTION 2: LATE NIGHT CODING BANNER */}
        {(isLateNight || showLateBanner) && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Card variant="gradient" className="p-3.5 border-purple-500/30 bg-[#0e0a16] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-xl text-purple-300 animate-pulse">
                    <Moon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      Late Night Coding Mode <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                    </h4>
                    <p className="text-[10px] text-[#a1a1aa] mt-0.5">
                      Submit today's proof before <strong>4:00 AM IST</strong> to protect your streak.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLateBanner(false)}
                  className="text-[#71717a] hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* SECTION 3: TODAY'S HERO CHALLENGE CARD */}
        <Card variant="gradient" className="p-5 border-indigo-500/40 bg-[#0c0c14] space-y-4 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Label */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono font-bold">
                DAY {currentDay} / 60
              </span>
              <Badge variant="warning" size="sm">Medium</Badge>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-indigo-400 font-bold">
              <Zap className="w-3.5 h-3.5 fill-indigo-400" />
              <span>+150 XP</span>
            </div>
          </div>

          {/* Challenge Title & Subtitle */}
          <div className="space-y-1">
            <h2 className="text-base font-extrabold text-white tracking-tight">
              {scenario === "day1"
                ? "Build & Deploy a Scalable Hello World API"
                : "Build a Rate-Limited REST API in Node.js & Redis"}
            </h2>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Implement a sliding-window token bucket algorithm to rate limit incoming user API requests.
            </p>
          </div>

          {/* Skills Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {["Node.js", "Redis", "TypeScript", "Middleware"].map((sk) => (
              <span key={sk} className="px-2 py-0.5 bg-[#14141c] border border-[#222230] rounded-md text-[10px] font-mono text-[#ededed]">
                {sk}
              </span>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between items-center text-[10px] font-mono text-[#a1a1aa]">
              <span>Test Suite Coverage</span>
              <span className="text-emerald-400 font-bold">{isSubmitted ? "100% Passed" : "18/24 Passed"}</span>
            </div>
            <LinearProgress value={isSubmitted ? 100 : 75} colorClass={isSubmitted ? "bg-emerald-500" : "bg-indigo-500"} height={6} />
          </div>

          {/* Main Action CTA */}
          <div className="pt-2">
            {isSubmitted ? (
              <Button
                variant="secondary"
                className="w-full bg-emerald-500/10 border-emerald-500/30 text-emerald-300 font-bold text-xs py-3.5 cursor-default"
                leftIcon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              >
                Day {currentDay} Submitted & Verified ✓
              </Button>
            ) : scenario === "missed" ? (
              <Button
                variant="primary"
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs py-3.5 shadow-lg shadow-rose-600/20"
                leftIcon={<ShieldCheck className="w-4 h-4" />}
              >
                Use Streak Freeze Shield to Recover
              </Button>
            ) : (
              <Button
                variant="primary"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3.5 shadow-xl shadow-indigo-600/30 border-none"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Continue Challenge (90 Mins)
              </Button>
            )}
          </div>
        </Card>

        {/* SECTION 4: 60-DAY CHALLENGE MATRIX */}
        <Card variant="default" className="p-4 space-y-3 border-[#1f1f28] bg-[#08080c]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-400" />
                60-Day Sprint Matrix
              </h3>
              <p className="text-[10px] text-[#71717a]">Tap any day to preview task artifacts.</p>
            </div>
            <Badge variant="streak" size="sm">
              {matrixDays.filter((d) => d.status === "completed" || d.status === "recovered").length}/60 Days
            </Badge>
          </div>

          {/* Grid Layout (10 x 6) */}
          <div className="grid grid-cols-10 gap-1.5 pt-2">
            {matrixDays.map((item) => {
              const isSelected = selectedDay === item.dayNum;
              return (
                <button
                  key={item.dayNum}
                  onClick={() => setSelectedDay(item.dayNum)}
                  className={`h-7 rounded-lg font-mono text-[10px] font-bold transition-all relative flex items-center justify-center cursor-pointer ${
                    item.status === "completed"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : item.status === "recovered"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                      : item.status === "current"
                      ? "bg-indigo-600 text-white border border-indigo-400 shadow-md shadow-indigo-500/50 animate-pulse"
                      : item.status === "missed"
                      ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                      : "bg-[#14141c] text-[#52525b] border border-[#1f1f28]"
                  } ${isSelected ? "ring-2 ring-white scale-105 z-10" : ""}`}
                >
                  {item.dayNum}
                </button>
              );
            })}
          </div>

          {/* Selected Day Info Popup */}
          {selectedDay && (
            <div className="p-3 bg-[#12121a] rounded-xl border border-[#222230] flex items-center justify-between text-xs pt-2 mt-1">
              <div>
                <span className="text-[10px] font-mono text-indigo-400 font-bold block">
                  DAY {selectedDay} DETAILS
                </span>
                <span className="text-white font-semibold">
                  {selectedDay <= currentDay ? "Rate Limited REST API" : "Upcoming System Architecture Task"}
                </span>
              </div>
              <Badge variant={selectedDay <= currentDay ? "success" : "neutral"} size="sm">
                {selectedDay <= currentDay ? "Verified" : "Locked"}
              </Badge>
            </div>
          )}
        </Card>

        {/* SECTION 5: RECRUITER READINESS RING CARD */}
        <Card variant="gradient" className="p-5 border-indigo-500/20 bg-[#0a0a10] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                Recruiter Readiness Index
              </h3>
              <p className="text-[10px] text-[#a1a1aa]">Calculated against top engineering hiring criteria.</p>
            </div>
            <Badge variant="xp" size="sm">Ready Score</Badge>
          </div>

          <div className="flex items-center gap-5 pt-1">
            <CircularProgressRing value={78} size={84} strokeWidth={8} colorClass="text-indigo-500" />

            <div className="space-y-2 flex-1 text-xs">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#a1a1aa]">GitHub Commits</span>
                <span className="text-emerald-400 font-bold font-mono">92/100</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#a1a1aa]">LinkedIn Reach</span>
                <span className="text-sky-400 font-bold font-mono">74/100</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#a1a1aa]">Project Complexity</span>
                <span className="text-indigo-400 font-bold font-mono">85/100</span>
              </div>
            </div>
          </div>
        </Card>

        {/* SECTION 6: DAILY STATS METRICS GRID */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Commits Pushed"
            value="342"
            icon={<Github className="w-4 h-4 text-white" />}
            change={{ value: "+12 this week", trend: "up" }}
          />
          <StatCard
            label="LinkedIn Reach"
            value="1.2M"
            icon={<Linkedin className="w-4 h-4 text-sky-400" />}
            change={{ value: "+45% views", trend: "up" }}
            highlight
          />
        </div>

        {/* SECTION 7: ACHIEVEMENTS BADGE SHOWCASE */}
        <Card variant="default" className="p-4 space-y-3 border-[#1f1f28] bg-[#08080c]">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              Earned Badges & Artifacts
            </h3>
            <span className="text-[10px] text-indigo-400 font-mono font-semibold">5/6 Unlocked</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {ACHIEVEMENTS.map((ach) => (
              <div
                key={ach.id}
                className={`p-2.5 rounded-xl border text-center space-y-1 transition-all ${
                  ach.unlocked
                    ? "bg-[#12121a] border-[#222230] text-white"
                    : "bg-[#0a0a0e] border-[#181820] text-[#52525b] opacity-50"
                }`}
              >
                <div className="p-1.5 rounded-lg bg-[#1a1a24] inline-flex items-center justify-center">
                  {ach.icon}
                </div>
                <span className="text-[10px] font-bold block truncate">{ach.title}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* SECTION 8: LEADERBOARD PREVIEW */}
        <Card variant="default" className="p-4 space-y-3 border-[#1f1f28] bg-[#08080c]">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-yellow-400" />
              Cohort Leaderboard
            </h3>
            <span className="text-[10px] text-indigo-400 font-mono font-semibold">Top 5 Students</span>
          </div>

          <div className="space-y-2">
            {LEADERBOARD_PREVIEW.map((st) => (
              <div
                key={st.rank}
                className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                  st.isUser
                    ? "bg-indigo-500/10 border-indigo-500/40 text-white font-bold"
                    : "bg-[#101018] border-[#1f1f28] text-[#a1a1aa]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-4 font-mono font-bold text-[11px] text-[#71717a]">#{st.rank}</span>
                  <Avatar src={st.avatar} fallback={st.name} size="sm" />
                  <div>
                    <span className="text-xs text-white font-bold block">{st.name}</span>
                    <span className="text-[9px] text-[#71717a]">{st.track} Track</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span className="text-amber-400 font-bold flex items-center gap-0.5">
                    <Flame className="w-3 h-3 fill-amber-400/40" />
                    {st.streak}d
                  </span>
                  <span className="text-indigo-400 font-bold">{st.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* SECTION 9: RECENT ACTIVITY TIMELINE */}
        <Card variant="default" className="p-4 space-y-3 border-[#1f1f28] bg-[#08080c]">
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-indigo-400" />
            Recent Activity Log
          </h3>

          <div className="space-y-3 pt-1">
            {RECENT_ACTIVITY.map((act) => (
              <div key={act.id} className="flex items-start justify-between gap-3 text-xs border-b border-[#181820] pb-2.5 last:border-none">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#14141c] border border-[#22222e] mt-0.5 shrink-0">
                    {act.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{act.title}</h4>
                    <span className="text-[10px] text-[#71717a]">{act.time}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400">{act.xp}</span>
              </div>
            ))}
          </div>
        </Card>
      </main>

      {/* SECTION 10: BOTTOM NAVIGATION BAR */}
      <BottomNav activeId={activeTab} onChange={setActiveTab} />
    </div>
  );
}
