"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Linkedin,
  ExternalLink,
  Share2,
  Download,
  Calendar,
  CheckCircle2,
  Award,
  Flame,
  Zap,
  ShieldCheck,
  Building2,
  FileCode,
  Globe,
  Star,
  Eye,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Code2,
  Layers,
  Cpu,
  Terminal,
  Check,
  UserCheck,
  Clock,
  Send,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LinearProgress, CircularProgressRing } from "@/components/ui/Progress";
import { Avatar } from "@/components/ui/Avatar";
import { StatCard } from "@/components/ui/StatCard";
import { Modal } from "@/components/ui/Modal";
import { Toast } from "@/components/ui/Toast";

// Mock Top Projects Built in 60-Day Sprint
const FEATURED_PROJECTS = [
  {
    id: "p1",
    name: "Distributed Rate-Limiter Middleware",
    description: "Sliding-window token bucket limiter for Express and Redis capable of handling 10k RPS with <2ms latency.",
    techStack: ["Node.js", "Redis", "TypeScript", "Docker"],
    difficulty: "Advanced",
    timeTaken: "90 Mins",
    xp: "+150 XP",
    githubUrl: "https://github.com/rahul-s/express-rate-limiter",
    demoUrl: "https://rate-limiter-demo.vercel.app",
    linkedinUrl: "https://linkedin.com/posts/rahuls-day12-proof",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "p2",
    name: "Real-time Collaborative Canvas",
    description: "Multi-user CRDT vector canvas powered by WebSockets, Canvas API, and conflict-free replicated data types.",
    techStack: ["Next.js 15", "WebSockets", "Tailwind CSS", "Redis"],
    difficulty: "Advanced",
    timeTaken: "120 Mins",
    xp: "+200 XP",
    githubUrl: "https://github.com/rahul-s/crdt-canvas",
    demoUrl: "https://canvas-crdt.vercel.app",
    linkedinUrl: "https://linkedin.com/posts/rahuls-day25-proof",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "p3",
    name: "Production SaaS Billing System",
    description: "Stripe subscription webhooks engine with idempotency keys, prorated billing calculations, and usage meters.",
    techStack: ["TypeScript", "PostgreSQL", "Stripe", "Prisma"],
    difficulty: "Intermediate",
    timeTaken: "90 Mins",
    xp: "+150 XP",
    githubUrl: "https://github.com/rahul-s/saas-billing-engine",
    demoUrl: "https://saas-billing.vercel.app",
    linkedinUrl: "https://linkedin.com/posts/rahuls-day40-proof",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
  },
];

// Skills Matrix Data
const SKILLS_LIST = [
  { name: "TypeScript", level: "Expert", experience: "2 Yrs", projects: 42, color: "bg-blue-500/10 text-blue-400 border-blue-500/30" },
  { name: "Next.js 15", level: "Advanced", experience: "1.5 Yrs", projects: 38, color: "bg-zinc-500/10 text-white border-zinc-500/30" },
  { name: "Node.js", level: "Expert", experience: "2 Yrs", projects: 50, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
  { name: "PostgreSQL", level: "Advanced", experience: "1 Yr", projects: 28, color: "bg-sky-500/10 text-sky-400 border-sky-500/30" },
  { name: "Redis", level: "Advanced", experience: "1 Yr", projects: 22, color: "bg-rose-500/10 text-rose-400 border-rose-500/30" },
  { name: "Docker", level: "Intermediate", experience: "6 Mos", projects: 18, color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" },
  { name: "Tailwind CSS", level: "Expert", experience: "2 Yrs", projects: 60, color: "bg-teal-500/10 text-teal-400 border-teal-500/30" },
  { name: "Python", level: "Intermediate", experience: "1 Yr", projects: 15, color: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
];

// Achievements Showcase
const BADGES = [
  { id: "b1", title: "🔥 30 Day Streak", desc: "Maintained 30 consecutive daily commits", unlocked: true },
  { id: "b2", title: "🚀 Top 5% Finisher", desc: "Ranked in top 5% of cohort #08 builders", unlocked: true },
  { id: "b3", title: "⭐ Recruiter Favorite", desc: "Profile viewed by 15+ engineering leads", unlocked: true },
  { id: "b4", title: "⚡ 4,000+ XP Master", desc: "Crossed 4k XP milestone in 45 days", unlocked: true },
  { id: "b5", title: "💎 Open Source Contributor", desc: "Merged 3 open-source pull requests", unlocked: true },
  { id: "b6", title: "🏆 Challenge Finisher", desc: "Complete all 60 days of proof-of-work", unlocked: false },
];

// Engineering Timeline Events
const TIMELINE_EVENTS = [
  { date: "Day 60", title: "Recruiter Ready Status Achieved", desc: "Score reached 88/100 across GitHub, LinkedIn & Systems tests.", icon: <Award className="w-3.5 h-3.5 text-emerald-400" /> },
  { date: "Day 45", title: "1.2M LinkedIn Impressions", desc: "Post on Distributed Redis Eviction went viral among senior engineers.", icon: <Linkedin className="w-3.5 h-3.5 text-sky-400" /> },
  { date: "Day 30", title: "Halfway Milestone Crossed", desc: "Completed 30 consecutive production API builds without missing a day.", icon: <Flame className="w-3.5 h-3.5 text-amber-400" /> },
  { date: "Day 01", title: "Joined ABTalks Sprint Cohort #08", desc: "Enrolled in Full Stack Track with 250 fellow builders.", icon: <Zap className="w-3.5 h-3.5 text-indigo-400" /> },
];

export default function ProfilePage() {
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  // Generate 60-Day Matrix Grid Data
  const journeyDays = Array.from({ length: 60 }, (_, i) => {
    const dayNum = i + 1;
    let status: "completed" | "current" | "missed" | "recovered" | "upcoming" = "completed";
    if (dayNum === 58) status = "current";
    else if (dayNum > 58) status = "upcoming";
    else if (dayNum === 22) status = "recovered";
    return { dayNum, status, xp: 150 };
  });

  const handleCopyProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    setToastMsg("Portfolio URL copied to clipboard! 📋");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed] font-sans flex flex-col pb-32 selection:bg-indigo-500/30">
      {/* Toast Notification */}
      {toastMsg && (
        <Toast
          title={toastMsg}
          type="success"
          isVisible={!!toastMsg}
          onClose={() => setToastMsg(null)}
        />
      )}

      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-xl border-b border-[#1f1f28] px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-md shadow-indigo-600/20">
              RS
            </div>
            <div>
              <span className="text-[10px] font-mono text-indigo-400 font-bold block">
                PUBLIC RECRUITER PORTFOLIO
              </span>
              <h1 className="text-xs font-bold text-white">Rahul Sharma</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyProfile}
              className="px-2.5 py-1 rounded-xl bg-[#14141c] border border-[#22222e] text-[#a1a1aa] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 pt-5 space-y-5 max-w-md mx-auto w-full">
        {/* SECTION 1: HEADER USER PROFILE CARD */}
        <Card variant="gradient" className="p-5 border-indigo-500/30 bg-[#0c0c14] space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3.5">
              <Avatar
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
                fallback="RS"
                size="xl"
                className="ring-2 ring-indigo-500/50"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-base font-extrabold text-white">Rahul Sharma</h2>
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
                <p className="text-xs text-[#a1a1aa] flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                  Tier-3 Tech College ('25)
                </p>
                <p className="text-[10px] text-emerald-400 font-semibold font-mono">
                  Full Stack Track • Cohort #08
                </p>
              </div>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <Badge variant="success" size="sm">
              Verified 60-Day Builder
            </Badge>
            <Badge variant="streak" size="sm">
              58-Day Streak
            </Badge>
            <Badge variant="xp" size="sm">
              4,250 XP
            </Badge>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#181822]">
            <a
              href="https://github.com/rahul-s"
              target="_blank"
              rel="noreferrer"
              className="w-full"
            >
              <Button
                variant="secondary"
                size="sm"
                className="w-full text-xs bg-[#14141c] border-[#22222e] hover:bg-[#1a1a24]"
                leftIcon={<Github className="w-3.5 h-3.5 text-white" />}
              >
                GitHub Profile
              </Button>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-full"
            >
              <Button
                variant="secondary"
                size="sm"
                className="w-full text-xs bg-[#14141c] border-[#22222e] hover:bg-[#1a1a24]"
                leftIcon={<Linkedin className="w-3.5 h-3.5 text-sky-400" />}
              >
                LinkedIn Posts
              </Button>
            </a>
          </div>
        </Card>

        {/* SECTION 2: RECRUITER READINESS SCORE */}
        <Card variant="gradient" className="p-5 border-emerald-500/30 bg-[#0a120e] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                AUDITED BY ABTALKS VERIFIER
              </span>
              <h3 className="text-sm font-bold text-white">Recruiter Readiness Score</h3>
            </div>
            <Badge variant="success" font-mono size="sm">
              Top 3%
            </Badge>
          </div>

          <div className="flex items-center gap-5 pt-1">
            <CircularProgressRing value={88} size={92} strokeWidth={9} colorClass="text-emerald-400" />

            <div className="space-y-2 flex-1 text-xs">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#a1a1aa]">GitHub Commits</span>
                <span className="text-emerald-400 font-bold font-mono">95/100</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#a1a1aa]">LinkedIn Activity</span>
                <span className="text-sky-400 font-bold font-mono">82/100</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#a1a1aa]">Code Quality & Coverage</span>
                <span className="text-indigo-400 font-bold font-mono">88/100</span>
              </div>
            </div>
          </div>
        </Card>

        {/* SECTION 3: 60-DAY JOURNEY HEATMAP */}
        <Card variant="default" className="p-4 space-y-3 border-[#1f1f28] bg-[#08080c]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-400" />
                60-Day Sprint Calendar
              </h3>
              <p className="text-[10px] text-[#71717a]">Hover or tap day to inspect verified commit.</p>
            </div>
            <Badge variant="streak" size="sm">
              58/60 Days
            </Badge>
          </div>

          <div className="grid grid-cols-10 gap-1.5 pt-2">
            {journeyDays.map((d) => (
              <button
                key={d.dayNum}
                onClick={() => setHoveredDay(d.dayNum)}
                className={`h-7 rounded-lg font-mono text-[10px] font-bold transition-all relative flex items-center justify-center cursor-pointer ${
                  d.status === "completed"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : d.status === "recovered"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : d.status === "current"
                    ? "bg-indigo-600 text-white border border-indigo-400 animate-pulse"
                    : "bg-[#14141c] text-[#52525b] border border-[#1f1f28]"
                }`}
              >
                {d.dayNum}
              </button>
            ))}
          </div>

          {hoveredDay && (
            <div className="p-2.5 bg-[#101018] rounded-xl border border-[#222230] text-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-indigo-400 font-bold block">
                  DAY {hoveredDay} ARTIFACT
                </span>
                <span className="text-white font-semibold">
                  {hoveredDay <= 58 ? "Rate Limiting & Redis Eviction Engine" : "Upcoming Capstone"}
                </span>
              </div>
              <Badge variant={hoveredDay <= 58 ? "success" : "neutral"} size="sm">
                {hoveredDay <= 58 ? "+150 XP" : "Locked"}
              </Badge>
            </div>
          )}
        </Card>

        {/* SECTION 4: FEATURED PROJECTS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-indigo-400" />
              Featured Capstone Projects
            </h3>
            <span className="text-[10px] text-[#71717a]">3 Shipped Systems</span>
          </div>

          {FEATURED_PROJECTS.map((proj) => (
            <Card key={proj.id} variant="elevated" className="p-4 space-y-3 border-[#1f1f28] bg-[#0c0c12]">
              <div className="flex items-start justify-between gap-3">
                <img
                  src={proj.thumbnail}
                  alt={proj.name}
                  className="w-16 h-16 rounded-xl object-cover border border-[#222230] shrink-0"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">{proj.name}</h4>
                    <Badge variant="warning" size="sm">{proj.difficulty}</Badge>
                  </div>
                  <p className="text-[11px] text-[#a1a1aa] leading-relaxed line-clamp-2">
                    {proj.description}
                  </p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1">
                {proj.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-[#14141e] border border-[#222230] rounded-md text-[10px] font-mono text-[#ededed]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center justify-between pt-2 border-t border-[#181822] text-[11px]">
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <Github className="w-3.5 h-3.5" /> Source Code
                </a>

                <a
                  href={proj.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <Globe className="w-3.5 h-3.5" /> Live Demo <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </Card>
          ))}
        </div>

        {/* SECTION 5: SKILLS MATRIX */}
        <Card variant="default" className="p-4 space-y-3 border-[#1f1f28] bg-[#08080c]">
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-purple-400" />
            Verified Technical Skills
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {SKILLS_LIST.map((sk) => (
              <div
                key={sk.name}
                className="p-2.5 rounded-xl bg-[#101018] border border-[#1f1f28] space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{sk.name}</span>
                  <span className="text-[9px] font-mono text-indigo-400">{sk.level}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#71717a] font-mono">
                  <span>{sk.experience} Exp</span>
                  <span className="text-emerald-400">{sk.projects} Builds</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* SECTION 6: GITHUB & LINKEDIN IMPACT */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Total GitHub Commits"
            value="342"
            icon={<Github className="w-4 h-4 text-white" />}
            change={{ value: "58d streak", trend: "up" }}
          />

          <StatCard
            label="LinkedIn Impressions"
            value="1.2M"
            icon={<Linkedin className="w-4 h-4 text-sky-400" />}
            change={{ value: "+850 views", trend: "up" }}
            highlight
          />
        </div>

        {/* SECTION 7: EARNED ACHIEVEMENTS */}
        <Card variant="default" className="p-4 space-y-3 border-[#1f1f28] bg-[#08080c]">
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            Verified Badges
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {BADGES.map((b) => (
              <div
                key={b.id}
                className={`p-2.5 rounded-xl border space-y-1 ${
                  b.unlocked
                    ? "bg-[#12121a] border-[#222230] text-white"
                    : "bg-[#0a0a0e] border-[#181820] text-[#52525b] opacity-50"
                }`}
              >
                <span className="font-bold text-xs block">{b.title}</span>
                <p className="text-[10px] text-[#a1a1aa] leading-tight">{b.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* SECTION 8: ENGINEERING TIMELINE */}
        <Card variant="default" className="p-4 space-y-3 border-[#1f1f28] bg-[#08080c]">
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-indigo-400" />
            Proof-of-Work Timeline
          </h3>

          <div className="space-y-3 pt-1 border-l border-[#1f1f28] pl-3 ml-2">
            {TIMELINE_EVENTS.map((ev, idx) => (
              <div key={idx} className="relative space-y-0.5">
                <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-[#08080c]" />
                <span className="text-[9px] font-mono text-indigo-400 font-bold block">{ev.date}</span>
                <h4 className="text-xs font-bold text-white">{ev.title}</h4>
                <p className="text-[10px] text-[#a1a1aa] leading-relaxed">{ev.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </main>

      {/* RECRUITER ACTIONS STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 max-w-7xl mx-auto bg-[#08080d]/95 backdrop-blur-2xl border-t border-[#1f1f28] p-3 px-4 flex items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-white block">Rahul Sharma</span>
          <span className="text-[10px] text-emerald-400 font-mono font-semibold">Available for SDE-1</span>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowScheduleModal(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-5 py-2.5 font-bold shadow-lg shadow-indigo-600/25 border-none"
        >
          Schedule Interview
        </Button>
      </div>

      {/* SCHEDULE INTERVIEW MODAL */}
      <Modal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        title="Schedule Recruiter Interview"
        description="Direct message or schedule a technical discussion with Rahul."
        maxWidth="sm"
        footer={
          <Button
            variant="primary"
            onClick={() => {
              setShowScheduleModal(false);
              setToastMsg("Interview invite sent to Rahul! 🚀");
            }}
            className="w-full bg-indigo-600 text-white font-bold text-xs py-3"
          >
            Confirm Interview Request
          </Button>
        }
      >
        <div className="space-y-3 py-2 text-xs">
          <div className="p-3 bg-[#101018] rounded-xl border border-[#222230] space-y-1">
            <span className="text-[10px] font-mono text-indigo-400 font-bold block">RECRUITER AUDIT SUMMARY</span>
            <p className="text-white font-semibold">Score: 88/100 (Top 3% Builder)</p>
            <p className="text-[#a1a1aa] text-[11px]">Verified GitHub commits, 60 daily REST/Systems builds & LinkedIn posts.</p>
          </div>

          <div className="space-y-1 text-left">
            <label className="text-[10px] font-bold text-[#a1a1aa] uppercase">Company Name</label>
            <input
              type="text"
              placeholder="e.g. Razorpay, Google, Stripe"
              className="w-full bg-[#08080c] text-white p-2.5 rounded-xl border border-[#222230] text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
