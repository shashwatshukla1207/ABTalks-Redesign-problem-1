import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import LandingPage from "../app/page";
import DashboardPage from "../app/dashboard/page";
import ChallengeDayPage from "../app/day/12/page";
import ProfilePage from "../app/profile/page";
import LeaderboardPage from "../app/leaderboard/page";
import CommunityPage from "../app/community/page";

export default function App() {
  const [view, setView] = useState<"landing" | "dashboard" | "challenge" | "profile" | "leaderboard" | "community">("dashboard");

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#ededed] antialiased">
      {/* Top Floating View Switcher */}
      <div className="fixed top-2.5 right-2.5 z-50 flex items-center gap-1 bg-[#12121a]/90 backdrop-blur-xl border border-[#2d2d3f] p-1 rounded-xl text-[9px] sm:text-[10px] font-mono shadow-2xl shadow-black/80 max-w-[95vw] overflow-x-auto no-scrollbar">
        <button
          onClick={() => setView("landing")}
          className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
            view === "landing"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40"
              : "text-[#a1a1aa] hover:text-white hover:bg-white/5"
          }`}
        >
          Landing
        </button>
        <button
          onClick={() => setView("dashboard")}
          className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
            view === "dashboard"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40"
              : "text-[#a1a1aa] hover:text-white hover:bg-white/5"
          }`}
        >
          Dashboard ⚡
        </button>
        <button
          onClick={() => setView("challenge")}
          className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
            view === "challenge"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40"
              : "text-[#a1a1aa] hover:text-white hover:bg-white/5"
          }`}
        >
          Day 12
        </button>
        <button
          onClick={() => setView("profile")}
          className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
            view === "profile"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40"
              : "text-[#a1a1aa] hover:text-white hover:bg-white/5"
          }`}
        >
          Portfolio 💼
        </button>
        <button
          onClick={() => setView("leaderboard")}
          className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
            view === "leaderboard"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40"
              : "text-[#a1a1aa] hover:text-white hover:bg-white/5"
          }`}
        >
          Ranks 🏆
        </button>
        <button
          onClick={() => setView("community")}
          className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
            view === "community"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40"
              : "text-[#a1a1aa] hover:text-white hover:bg-white/5"
          }`}
        >
          Feed 🌐
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {view === "landing" ? (
            <LandingPage />
          ) : view === "dashboard" ? (
            <DashboardPage />
          ) : view === "challenge" ? (
            <ChallengeDayPage onBack={() => setView("dashboard")} />
          ) : view === "profile" ? (
            <ProfilePage />
          ) : view === "leaderboard" ? (
            <LeaderboardPage />
          ) : (
            <CommunityPage />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}


