"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  Github,
  Linkedin,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  GitCommit,
  Globe,
  Building2,
  Trophy,
  Users,
  Check,
  ExternalLink,
  Star,
  Zap,
  TrendingUp,
  Flame,
  Code2,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  Award,
  Activity,
  FileCode2,
  Share2,
  Lock,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LinearProgress } from "@/components/ui/Progress";
import { TopAppBar } from "@/components/layout/MobileNav";

// Counter Hook for smooth numerical animation
function AnimatedCounter({ from = 0, to, duration = 1.5, suffix = "" }: { from?: number; to: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      setCount(Math.floor(easeProgress * (to - from) + from));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [from, to, duration]);

  return <>{count}{suffix}</>;
}

// Recruiter Companies
const RECRUITERS = [
  { name: "Google", icon: "G" },
  { name: "Microsoft", icon: "MS" },
  { name: "Amazon", icon: "AMZN" },
  { name: "Adobe", icon: "ADB" },
  { name: "Atlassian", icon: "ATL" },
  { name: "Oracle", icon: "ORCL" },
  { name: "Infosys", icon: "INFY" },
  { name: "TCS", icon: "TCS" },
];

// Track Data
const TRACKS = [
  {
    id: "fullstack",
    title: "Full Stack Engineering",
    icon: <Layers className="w-5 h-5 text-indigo-400" />,
    difficulty: "Intermediate",
    duration: "60 Days (120 hrs)",
    description: "Master modern Web architecture, scalable APIs, database design, and production deployment pipelines.",
    careerOutcome: "SDE-1 / Full Stack Engineer (₹12 - ₹24 LPA)",
    progress: 88,
    skills: ["Next.js 15", "TypeScript", "PostgreSQL", "Redis", "Docker", "Tailwind CSS"],
    sampleProjects: [
      "Distributed Rate Limiter Middleware",
      "Real-time Collaborative Canvas",
      "Production SaaS with Stripe & Webhooks",
    ],
    accentGradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  },
  {
    id: "aiml",
    title: "AI & ML Systems",
    icon: <Cpu className="w-5 h-5 text-purple-400" />,
    difficulty: "Advanced",
    duration: "60 Days (140 hrs)",
    description: "Build LLM applications, RAG pipelines, vector search engines, and fine-tune open-weights models.",
    careerOutcome: "AI Engineer / ML Infra Engineer (₹15 - ₹30 LPA)",
    progress: 92,
    skills: ["Python", "PyTorch", "LangChain", "Pinecone", "Gemini API", "FastAPI"],
    sampleProjects: [
      "Enterprise RAG Document Search Engine",
      "Autonomous Code Review Bot with Gemini",
      "Multimodal Video Summarizer Pipeline",
    ],
    accentGradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    id: "systems",
    title: "Systems & Backend",
    icon: <Terminal className="w-5 h-5 text-emerald-400" />,
    difficulty: "Advanced",
    duration: "60 Days (150 hrs)",
    description: "Deep-dive into low-level concurrency, distributed storage, memory allocators, and gRPC microservices.",
    careerOutcome: "Backend / Infrastructure SDE (₹14 - ₹28 LPA)",
    progress: 85,
    skills: ["Go / Rust", "gRPC", "Kafka", "Linux Internals", "Distributed KV Store"],
    sampleProjects: [
      "High-Throughput In-Memory Cache (Go)",
      "Distributed Message Queue Protocol",
      "Custom HTTP/2 Web Server from Scratch",
    ],
    accentGradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
];

// Success Transformations
const TRANSFORMATIONS = [
  {
    id: "1",
    name: "Aman Verma",
    role: "Frontend Engineer @ Razorpay",
    college: "Tier-3 Engineering College (Batch '25)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    before: {
      projects: "0 Production Apps",
      github: "Blank White Calendar",
      linkedin: "120 Connections (Inactive)",
      offers: "Unplaced / Rejected in Campus Round",
    },
    after: {
      projects: "60 Verifiable Daily Builds",
      github: "58-Day Green Streak (342 Commits)",
      linkedin: "1.2M+ Reach & Recruiter DMs",
      offers: "₹18 LPA Off-Campus SDE-1 Offer",
    },
    quote: "My Razorpay interviewer skipped my resume and opened my GitHub repo directly during the tech round.",
  },
  {
    id: "2",
    name: "Priya Sharma",
    role: "AI Systems Engineer @ Mindtickle",
    college: "State Tech University (Batch '24)",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    before: {
      projects: "Generic College Library App",
      github: "2 Commits in 4 Years",
      linkedin: "No Posts",
      offers: "Mass Recruiter Call ($3.6 LPA)",
    },
    after: {
      projects: "Production RAG Vector Pipeline",
      github: "60-Day Unbroken Streak",
      linkedin: "850K+ Tech Impressions",
      offers: "Direct Outreach Offer (₹22 LPA)",
    },
    quote: "Posting my daily RAG benchmarks on LinkedIn got me inbound interview calls from 4 YC startups.",
  },
];

// GitHub Contribution Square Grid Generator Data
const CONTRIBUTION_WEEKS = Array.from({ length: 16 }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => {
    // Generate realistic contribution levels (0 to 4)
    const isHigh = (w * 7 + d) % 5 === 0 || (w * 7 + d) % 3 === 0;
    const isMedium = (w * 7 + d) % 2 === 0;
    return isHigh ? Math.floor(Math.random() * 2) + 3 : isMedium ? Math.floor(Math.random() * 2) + 1 : 0;
  })
);

export default function LandingPage() {
  const [selectedTrack, setSelectedTrack] = useState("fullstack");
  const [joinedCohort, setJoinedCohort] = useState(false);
  const [activeTab, setActiveTab] = useState<"before" | "after">("after");

  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed] font-sans flex flex-col pb-28 selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Top Header Navigation */}
      <TopAppBar
        title="ABTalks"
        streakCount={14}
        userName="Rahul S."
        rightActions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setJoinedCohort(true)}
            className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white border-none shadow-md shadow-indigo-600/20 font-bold"
          >
            {joinedCohort ? "Applied ✓" : "Apply Now"}
          </Button>
        }
      />

      {/* SECTION 1: HERO */}
      <section className="relative px-4 pt-10 pb-12 flex flex-col items-center text-center overflow-hidden">
        {/* Multi-layered Gradient Ambient Glow */}
        <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[340px] h-[340px] bg-gradient-to-tr from-indigo-600/25 via-purple-600/20 to-pink-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-40 right-[-60px] w-48 h-48 bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Floating Decorative Elements */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 left-4 hidden sm:block p-2 rounded-2xl bg-[#0e0e12]/80 border border-white/10 backdrop-blur-md shadow-xl text-[10px] text-indigo-300 font-mono"
        >
          git push origin main ✨
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-28 right-4 hidden sm:block p-2 rounded-2xl bg-[#0e0e12]/80 border border-white/10 backdrop-blur-md shadow-xl text-[10px] text-emerald-300 font-mono"
        >
          Verified PR Merged 🚀
        </motion.div>

        {/* Cohort Status Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="xp" className="mb-5 py-1.5 px-3.5 bg-indigo-500/10 border-indigo-500/30 text-indigo-300 shadow-sm shadow-indigo-500/10 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>Cohort #08 Open • Starts Aug 15 • 120 Seats</span>
          </Badge>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.12] max-w-lg"
        >
          60 Days of <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            Proof-of-Work
          </span>{" "}
          to Become Recruiter Ready
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed max-w-sm"
        >
          Bypass 500-resume blackholes. Build production systems daily, publish verified GitHub commits, and let senior engineering managers reach out directly.
        </motion.p>

        {/* Hero Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-7 flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => setJoinedCohort(true)}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-600/30 border-none font-bold py-4 text-xs"
          >
            {joinedCohort ? "Spot Reserved ✓" : "Join Next Cohort"}
          </Button>

          <a href="#tracks" className="w-full">
            <Button variant="secondary" size="lg" className="w-full text-xs font-semibold py-4 border-[#22222a] bg-[#0c0c10]">
              Explore Tracks
            </Button>
          </a>
        </motion.div>

        {/* Live Code Preview Interactive Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 w-full max-w-sm"
        >
          <Card variant="gradient" className="p-4 border-indigo-500/30 bg-[#0c0c10]/90 backdrop-blur-xl shadow-2xl text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#1c1c28]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
                <span className="text-[10px] font-mono text-[#71717a] ml-1">daily-commit-v58.ts</span>
              </div>
              <Badge variant="streak" size="sm">
                Day 58/60
              </Badge>
            </div>
            <div className="pt-3 font-mono text-[11px] space-y-2">
              <div className="text-purple-300 font-medium">
                <span className="text-indigo-400">export async function</span> handleEviction(key: string) &#123;
              </div>
              <div className="pl-4 text-[#a1a1aa] text-[10px]">
                const node = this.cache.get(key);
                <br />
                if (node) this.lruList.moveToHead(node);
              </div>
              <div className="text-purple-300">&#125;</div>

              <div className="pt-2 flex items-center justify-between text-[10px] border-t border-[#181822]">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 24/24 Tests Passed
                </span>
                <span className="text-indigo-400 font-bold font-mono">+150 XP</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* SECTION 2: STATS COUNTERS */}
      <section className="px-4 py-6 border-y border-[#1a1a22] bg-[#08080c]">
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto text-center">
          <div className="p-2 space-y-0.5">
            <span className="text-2xl font-black text-white font-mono block tracking-tight">
              <AnimatedCounter to={12400} suffix="+" />
            </span>
            <span className="text-[10px] font-semibold text-[#71717a] uppercase tracking-wider block">
              Active Builders
            </span>
          </div>

          <div className="p-2 space-y-0.5 border-x border-[#1a1a22]">
            <span className="text-2xl font-black text-indigo-400 font-mono block tracking-tight">
              <AnimatedCounter to={520} suffix="K+" />
            </span>
            <span className="text-[10px] font-semibold text-[#71717a] uppercase tracking-wider block">
              GitHub Commits
            </span>
          </div>

          <div className="p-2 space-y-0.5">
            <span className="text-2xl font-black text-emerald-400 font-mono block tracking-tight">
              <AnimatedCounter to={84} suffix="%" />
            </span>
            <span className="text-[10px] font-semibold text-[#71717a] uppercase tracking-wider block">
              Completion Rate
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 3: RECRUITER SHOWCASE */}
      <section className="px-4 py-8 text-center space-y-4 max-w-md mx-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#71717a]">
          Graduates Hired By Engineers From
        </p>
        <div className="grid grid-cols-4 gap-2.5 opacity-75">
          {RECRUITERS.map((comp) => (
            <div
              key={comp.name}
              className="p-2.5 rounded-xl bg-[#0c0c10] border border-[#1f1f28] flex flex-col items-center justify-center gap-1 hover:border-indigo-500/40 hover:bg-[#12121a] transition-all cursor-default"
            >
              <span className="text-xs font-black tracking-tight text-white">{comp.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: 3-STEP JOURNEY */}
      <section className="px-4 py-10 space-y-6 max-w-md mx-auto">
        <div className="text-center space-y-1">
          <Badge variant="neutral" className="mb-2">Execution Engine</Badge>
          <h2 className="text-xl font-bold text-white tracking-tight">
            How The 60-Day Sprint Works
          </h2>
          <p className="text-xs text-[#a1a1aa]">
            Structured daily iterations designed for non-stop momentum.
          </p>
        </div>

        <div className="space-y-3">
          <Card variant="glass" className="p-4 flex items-start gap-3.5 border-[#1c1c26] hover:border-indigo-500/30 transition-all">
            <div className="w-8 h-8 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0">
              01
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-white flex items-center gap-2">
                Pick a Domain Track <Badge variant="xp" size="sm">Step 1</Badge>
              </h3>
              <p className="text-[11px] text-[#a1a1aa] leading-relaxed">
                Select Full Stack, AI Systems, or Backend Infrastructure matching your career goals.
              </p>
            </div>
          </Card>

          <Card variant="glass" className="p-4 flex items-start gap-3.5 border-[#1c1c26] hover:border-purple-500/30 transition-all">
            <div className="w-8 h-8 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold text-xs flex items-center justify-center shrink-0">
              02
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-white flex items-center gap-2">
                Build & Commit Daily <Badge variant="streak" size="sm">Step 2</Badge>
              </h3>
              <p className="text-[11px] text-[#a1a1aa] leading-relaxed">
                Unlock daily 90-minute real-world tasks. Write code, pass automated unit tests, and commit.
              </p>
            </div>
          </Card>

          <Card variant="glass" className="p-4 flex items-start gap-3.5 border-[#1c1c26] hover:border-emerald-500/30 transition-all">
            <div className="w-8 h-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
              03
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-white flex items-center gap-2">
                Automated Public Proof <Badge variant="success" size="sm">Step 3</Badge>
              </h3>
              <p className="text-[11px] text-[#a1a1aa] leading-relaxed">
                Your progress automatically generates verified GitHub contribution streaks & recruiter-facing posts.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* SECTION 5: TRACK EXPLORER */}
      <section id="tracks" className="px-4 py-10 space-y-6 max-w-md mx-auto">
        <div className="text-center space-y-1">
          <Badge variant="xp" className="mb-2">Domain Specialization</Badge>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Curated 60-Day Sprint Tracks
          </h2>
          <p className="text-xs text-[#a1a1aa]">
            Production-grade curricula designed with senior staff engineers.
          </p>
        </div>

        {/* Track Tabs */}
        <div className="flex gap-2 p-1 bg-[#0c0c10] border border-[#1f1f28] rounded-2xl overflow-x-auto no-scrollbar">
          {TRACKS.map((track) => (
            <button
              key={track.id}
              onClick={() => setSelectedTrack(track.id)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                selectedTrack === track.id
                  ? "bg-[#1c1c28] text-white border border-[#2d2d3f] shadow-md"
                  : "text-[#71717a] hover:text-[#a1a1aa]"
              }`}
            >
              {track.icon}
              <span>{track.title.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Selected Track Deep-Dive Card */}
        {TRACKS.filter((t) => t.id === selectedTrack).map((track) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card variant="gradient" className="p-5 space-y-5 border-indigo-500/30 bg-[#0c0c12]">
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#14141c] rounded-2xl border border-[#222230]">
                    {track.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{track.title}</h3>
                    <span className="text-[10px] text-[#a1a1aa] font-mono">{track.duration}</span>
                  </div>
                </div>
                <Badge className={track.badgeColor} size="sm">
                  {track.difficulty}
                </Badge>
              </div>

              <p className="text-xs text-[#a1a1aa] leading-relaxed">{track.description}</p>

              {/* Completion Rate & Progress */}
              <div className="space-y-1.5 bg-[#08080d] p-3 rounded-xl border border-[#181822]">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-[#a1a1aa]">Track Completion Index</span>
                  <span className="text-emerald-400 font-bold">{track.progress}%</span>
                </div>
                <LinearProgress value={track.progress} colorClass="bg-gradient-to-r from-indigo-500 to-purple-500" height={6} />
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <span className="text-[10px] font-semibold text-[#71717a] uppercase tracking-wider block">
                  Core Skills & Tools
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {track.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 bg-[#14141c] border border-[#222230] rounded-lg text-[10px] font-mono text-[#ededed]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sample Projects */}
              <div className="space-y-2 pt-2 border-t border-[#181822]">
                <span className="text-[10px] font-semibold text-[#71717a] uppercase tracking-wider block">
                  Projects Built During Sprint
                </span>
                <ul className="space-y-2">
                  {track.sampleProjects.map((project) => (
                    <li key={project} className="text-xs text-[#ededed] flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{project}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Career Outcome */}
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-0.5 text-left">
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Expected Career Outcome
                </span>
                <p className="text-xs font-bold text-white">{track.careerOutcome}</p>
              </div>

              <Button
                variant="primary"
                onClick={() => setJoinedCohort(true)}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3.5 shadow-lg shadow-indigo-600/20 border-none"
              >
                Apply for {track.title} Track
              </Button>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* SECTION 6: STUDENT SUCCESS BEFORE & AFTER */}
      <section className="px-4 py-10 space-y-6 max-w-md mx-auto">
        <div className="text-center space-y-1">
          <Badge variant="streak" className="mb-2">Proven Impact</Badge>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Before & After Transformation
          </h2>
          <p className="text-xs text-[#a1a1aa]">
            See how public proof changes student hiring trajectories.
          </p>
        </div>

        {/* Transformation Toggle */}
        <div className="flex justify-center p-1 bg-[#0c0c10] border border-[#1f1f28] rounded-2xl">
          <button
            onClick={() => setActiveTab("before")}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === "before" ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" : "text-[#71717a]"
            }`}
          >
            Traditional Path (Before)
          </button>
          <button
            onClick={() => setActiveTab("after")}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === "after" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "text-[#71717a]"
            }`}
          >
            ABTalks Proof (After)
          </button>
        </div>

        {/* Before / After Detail Cards */}
        <AnimatePresence mode="wait">
          {activeTab === "before" ? (
            <motion.div
              key="before-tab"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Card variant="default" className="p-5 space-y-3 border-rose-500/30 bg-[#120a0b]">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs border-b border-rose-500/20 pb-2">
                  <Lock className="w-4 h-4" />
                  <span>Traditional Student Profile</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#a1a1aa]">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                    <span><strong>Projects:</strong> 0 production apps (Only basic tutorials)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                    <span><strong>GitHub:</strong> Empty white grid, no commits or PRs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                    <span><strong>LinkedIn:</strong> Low reach, generic resume uploads</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                    <span><strong>Hiring Result:</strong> Rejected by ATS / Unfiltered cold emails</span>
                  </li>
                </ul>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="after-tab"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Card variant="gradient" className="p-5 space-y-3 border-emerald-500/30 bg-[#0a1410]">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs border-b border-emerald-500/20 pb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>ABTalks 60-Day Verified Graduate</span>
                </div>
                <ul className="space-y-2.5 text-xs text-white">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Projects:</strong> 60 daily production-grade builds</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>GitHub:</strong> Unbroken 60-day green commit heatmap</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>LinkedIn:</strong> 1M+ tech post impressions & inbound recruiter messages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Hiring Result:</strong> Direct SDE-1 interviews & ₹18-24 LPA offers</span>
                  </li>
                </ul>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Student Testimonials Carousel */}
        <div className="space-y-3 pt-2">
          {TRANSFORMATIONS.map((student) => (
            <Card key={student.id} variant="elevated" className="p-4 space-y-3 border-[#1f1f28]">
              <div className="flex items-center gap-3">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#333333]"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{student.name}</h4>
                  <p className="text-[11px] font-semibold text-emerald-400">{student.role}</p>
                </div>
              </div>
              <p className="text-xs text-[#a1a1aa] italic leading-relaxed">
                "{student.quote}"
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION 7: PROOF OF WORK SHOWCASE (GITHUB TIMELINE) */}
      <section className="px-4 py-10 space-y-6 max-w-md mx-auto">
        <div className="text-center space-y-1">
          <Badge variant="neutral" className="mb-2">Verified Artifacts</Badge>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Live GitHub Contribution Grid
          </h2>
          <p className="text-xs text-[#a1a1aa]">
            Your activity speaks louder than keywords on a PDF.
          </p>
        </div>

        {/* GitHub Green Grid Box */}
        <Card variant="glass" className="p-4 space-y-3 border-[#1f1f28]">
          <div className="flex items-center justify-between text-xs font-mono text-[#a1a1aa]">
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4 text-white" />
              <span>rahul-s / 342 commits in 2026</span>
            </div>
            <span className="text-emerald-400 font-bold">60 Day Streak</span>
          </div>

          {/* Grid Squares */}
          <div className="p-2.5 bg-[#08080c] rounded-xl border border-[#181822] overflow-x-auto no-scrollbar">
            <div className="grid grid-flow-col grid-rows-7 gap-1 w-max">
              {CONTRIBUTION_WEEKS.map((week, wIdx) =>
                week.map((level, dIdx) => {
                  const colors = [
                    "bg-[#16161e]",
                    "bg-emerald-950/60 border border-emerald-800/30",
                    "bg-emerald-700/70",
                    "bg-emerald-500",
                    "bg-emerald-400 shadow-sm shadow-emerald-400/50",
                  ];
                  return (
                    <div
                      key={`${wIdx}-${dIdx}`}
                      className={`w-2.5 h-2.5 rounded-sm ${colors[level]}`}
                    />
                  );
                })
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#71717a] pt-1">
            <span>Less</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-sm bg-[#16161e]" />
              <span className="w-2 h-2 rounded-sm bg-emerald-950" />
              <span className="w-2 h-2 rounded-sm bg-emerald-700" />
              <span className="w-2 h-2 rounded-sm bg-emerald-500" />
              <span className="w-2 h-2 rounded-sm bg-emerald-400" />
            </div>
            <span>More</span>
          </div>
        </Card>
      </section>

      {/* SECTION 8: FINAL BOTTOM CTA CARD */}
      <section className="px-4 py-8 text-center max-w-md mx-auto">
        <div className="p-6 rounded-3xl bg-gradient-to-b from-[#12121e] via-[#0c0c12] to-[#08080c] border border-indigo-500/30 space-y-4 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          <Badge variant="streak" className="mx-auto">
            Cohort #08 Enrolling Now
          </Badge>

          <h2 className="text-2xl font-black text-white tracking-tight">
            Stop Sending Resumes. <br /> Start Building Proof.
          </h2>

          <p className="text-xs text-[#a1a1aa] leading-relaxed">
            Join 12,000+ ambitious engineering students turning daily discipline into high-paying engineering offers.
          </p>

          <Button
            variant="primary"
            size="lg"
            onClick={() => setJoinedCohort(true)}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 shadow-xl shadow-indigo-600/30 border-none text-xs"
          >
            {joinedCohort ? "Application Submitted ✓" : "Apply for Cohort #08"}
          </Button>

          <p className="text-[10px] text-[#71717a]">
            100% Free for Eligible Engineering Students
          </p>
        </div>
      </section>

      {/* SECTION 9: STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 max-w-7xl mx-auto bg-[#08080d]/95 backdrop-blur-2xl border-t border-[#1f1f28] p-3 px-4 flex items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-white block">Cohort #08</span>
          <span className="text-[10px] text-emerald-400 font-mono font-semibold">120 Seats Left • Aug 15</span>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setJoinedCohort(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-5 py-2.5 font-bold shadow-lg shadow-indigo-600/25 border-none"
        >
          {joinedCohort ? "Reserved ✓" : "Join Cohort"}
        </Button>
      </div>
    </div>
  );
}
