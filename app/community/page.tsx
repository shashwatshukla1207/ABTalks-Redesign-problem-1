"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  Sparkles,
  Github,
  Linkedin,
  ExternalLink,
  Flame,
  Zap,
  CheckCircle2,
  Award,
  Bell,
  Search,
  ThumbsUp,
  UserPlus,
  Star,
  Globe,
  Code2,
  ShieldCheck,
  Send,
  Check,
  RotateCcw,
  AlertCircle,
  Eye,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Toast } from "@/components/ui/Toast";

// Mock Community Feed Data
const INITIAL_FEED = [
  {
    id: "f1",
    author: {
      name: "Priya Patel",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      track: "AI Systems",
      day: 32,
    },
    title: "Shipped Vector Embedding Cache using Redis & HNSW",
    description: "Built a similarity search layer with <10ms nearest neighbor queries for LLM RAG pipelines. Benchmark code attached!",
    techStack: ["Python", "Redis", "FastAPI", "Docker"],
    githubUrl: "https://github.com/priya/vector-redis",
    linkedinUrl: "https://linkedin.com/posts/priya-day32",
    xp: "+180 XP",
    timeAgo: "15 mins ago",
    likes: 24,
    celebrates: 18,
    comments: 5,
    isLiked: false,
    isCelebrated: false,
    isBookmarked: false,
  },
  {
    id: "f2",
    author: {
      name: "Aarav Sharma",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      track: "Full Stack",
      day: 45,
    },
    title: "Realtime Multi-Cursor Canvas using WebSockets & CRDTs",
    description: "Solved state sync conflicts with Yjs and Express WebSockets! Tested with 50 simultaneous users on a single canvas.",
    techStack: ["Next.js", "WebSockets", "TypeScript", "Yjs"],
    githubUrl: "https://github.com/aarav/crdt-canvas",
    linkedinUrl: "https://linkedin.com/posts/aarav-day45",
    xp: "+200 XP",
    timeAgo: "1 hour ago",
    likes: 42,
    celebrates: 31,
    comments: 12,
    isLiked: true,
    isCelebrated: true,
    isBookmarked: true,
  },
];

// Peer Review Cards
const REVIEWS_QUEUE = [
  {
    id: "r1",
    author: "Vikram R.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    project: "Sliding Window Rate Limiter",
    day: 12,
    github: "https://github.com/vikram/rate-limiter",
    demo: "https://rate-limiter.vercel.app",
    status: "pending",
  },
];

// Suggested People
const SUGGESTED_BUILDERS = [
  {
    id: "u1",
    name: "Sneha Reddy",
    track: "Full Stack",
    streak: 17,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    isFollowing: false,
  },
  {
    id: "u2",
    name: "Ananya Iyer",
    track: "AI Systems",
    streak: 21,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    isFollowing: true,
  },
];

export default function CommunityPage() {
  const [feed, setFeed] = useState(INITIAL_FEED);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [followedState, setFollowedState] = useState<Record<string, boolean>>({ u2: true });

  // Toggle Feed Likes
  const handleToggleLike = (id: string) => {
    setFeed((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isLiked: !item.isLiked,
              likes: item.isLiked ? item.likes - 1 : item.likes + 1,
            }
          : item
      )
    );
  };

  const handleToggleCelebrate = (id: string) => {
    setFeed((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isCelebrated: !item.isCelebrated,
              celebrates: item.isCelebrated ? item.celebrates - 1 : item.celebrates + 1,
            }
          : item
      )
    );
  };

  const handleToggleBookmark = (id: string) => {
    setFeed((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isBookmarked: !item.isBookmarked,
            }
          : item
      )
    );
    setToastMsg("Post saved to your bookmarks! 🔖");
  };

  const toggleFollow = (id: string) => {
    setFollowedState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-purple-400 font-bold block">
                BUILDERS NETWORK
              </span>
              <h1 className="text-xs font-bold text-white">Community Feed</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNotificationCenter(true)}
              className="w-9 h-9 rounded-xl bg-[#14141c] border border-[#22222e] text-[#a1a1aa] hover:text-white flex items-center justify-center relative cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 pt-4 space-y-5 max-w-md mx-auto w-full">
        {/* SECTION 1: PROJECT OF THE DAY SPOTLIGHT */}
        <Card variant="gradient" className="p-4 border-amber-500/40 bg-[#0f0c08] space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                PROJECT OF THE DAY
              </span>
            </div>
            <Badge variant="warning" size="sm">Featured</Badge>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-extrabold text-white">
              AI-Powered SQL Query Performance Analyzer
            </h3>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Analyzes PostgreSQL query EXPLAIN plans and generates index recommendations in under 5 seconds.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#221c10] text-xs">
            <div className="flex items-center gap-2">
              <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" fallback="AS" size="sm" />
              <span className="text-white font-semibold text-xs">Aarav Sharma</span>
            </div>
            <span className="text-amber-400 font-mono font-bold text-xs">+200 XP</span>
          </div>
        </Card>

        {/* SECTION 2: PEER REVIEW QUEUE */}
        <Card variant="default" className="p-4 space-y-3 border-[#1f1f28] bg-[#08080c]">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Pending Peer Reviews
            </h3>
            <Badge variant="success" size="sm">1 Request</Badge>
          </div>

          {REVIEWS_QUEUE.map((rev) => (
            <div key={rev.id} className="p-3 bg-[#101018] rounded-xl border border-[#222230] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar src={rev.avatar} fallback={rev.author} size="sm" />
                  <div>
                    <span className="text-white font-bold block">{rev.author}</span>
                    <span className="text-[10px] text-[#71717a]">Day {rev.day} • {rev.project}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setToastMsg("Peer Review Approved! +20 XP awarded ⚡")}
                  className="w-full text-[11px] bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                >
                  Approve Proof
                </Button>

                <a href={rev.github} target="_blank" rel="noreferrer" className="w-full">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full text-[11px] bg-[#14141c] border-[#22222e] text-[#a1a1aa]"
                  >
                    View Code
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </Card>

        {/* SECTION 3: COMMUNITY FEED */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white flex items-center justify-between">
            <span>Live Activity Stream</span>
            <span className="text-[10px] text-indigo-400 font-mono">24 New Posts</span>
          </h3>

          {feed.map((post) => (
            <Card key={post.id} variant="elevated" className="p-4 space-y-3 border-[#1f1f28] bg-[#0c0c12]">
              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Avatar src={post.author.avatar} fallback={post.author.name} size="md" />
                  <div>
                    <h4 className="text-xs font-bold text-white">{post.author.name}</h4>
                    <p className="text-[10px] text-[#71717a]">
                      Day {post.author.day} • {post.author.track} • {post.timeAgo}
                    </p>
                  </div>
                </div>
                <Badge variant="xp" size="sm">{post.xp}</Badge>
              </div>

              {/* Title & Desc */}
              <div className="space-y-1">
                <h5 className="text-xs font-bold text-white leading-snug">{post.title}</h5>
                <p className="text-[11px] text-[#a1a1aa] leading-relaxed">{post.description}</p>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1">
                {post.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-[#14141e] border border-[#222230] rounded-md text-[10px] font-mono text-[#ededed]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Interactive Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-[#181822] text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleLike(post.id)}
                    className={`flex items-center gap-1 transition-colors cursor-pointer ${
                      post.isLiked ? "text-rose-500 font-bold" : "text-[#71717a] hover:text-white"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${post.isLiked ? "fill-rose-500" : ""}`} />
                    <span className="text-[10px]">{post.likes}</span>
                  </button>

                  <button
                    onClick={() => handleToggleCelebrate(post.id)}
                    className={`flex items-center gap-1 transition-colors cursor-pointer ${
                      post.isCelebrated ? "text-amber-400 font-bold" : "text-[#71717a] hover:text-white"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="text-[10px]">{post.celebrates}</span>
                  </button>

                  <button className="flex items-center gap-1 text-[#71717a] hover:text-white cursor-pointer">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span className="text-[10px]">{post.comments}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleBookmark(post.id)}
                    className={`p-1 rounded transition-colors cursor-pointer ${
                      post.isBookmarked ? "text-indigo-400" : "text-[#71717a] hover:text-white"
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${post.isBookmarked ? "fill-indigo-400" : ""}`} />
                  </button>

                  <a href={post.githubUrl} target="_blank" rel="noreferrer" className="text-[#71717a] hover:text-white">
                    <Github className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* SECTION 4: SUGGESTED BUILDERS */}
        <Card variant="default" className="p-4 space-y-3 border-[#1f1f28] bg-[#08080c]">
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
            <UserPlus className="w-4 h-4 text-indigo-400" />
            Recommended Peers
          </h3>

          <div className="space-y-2">
            {SUGGESTED_BUILDERS.map((b) => (
              <div key={b.id} className="p-2.5 bg-[#101018] rounded-xl border border-[#222230] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <Avatar src={b.avatar} fallback={b.name} size="md" />
                  <div>
                    <h4 className="text-xs font-bold text-white">{b.name}</h4>
                    <p className="text-[10px] text-[#71717a]">{b.track} • {b.streak}d streak</p>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => toggleFollow(b.id)}
                  className={`text-[10px] px-3 py-1 ${
                    followedState[b.id]
                      ? "bg-[#181824] text-[#a1a1aa] border-[#2a2a3a]"
                      : "bg-indigo-600 text-white border-none font-bold"
                  }`}
                >
                  {followedState[b.id] ? "Following" : "+ Follow"}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </main>

      {/* NOTIFICATIONS MODAL */}
      <Modal
        isOpen={showNotificationCenter}
        onClose={() => setShowNotificationCenter(false)}
        title="Community Notifications"
        description="Stay updated with peer reviews, recruiter views, and mentions."
        maxWidth="sm"
      >
        <div className="space-y-2 text-xs py-1">
          <div className="p-2.5 bg-[#101018] rounded-xl border border-[#222230] flex items-start gap-2.5">
            <Eye className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-semibold">Tech Lead at Razorpay viewed your profile!</p>
              <span className="text-[10px] text-[#71717a]">10 mins ago</span>
            </div>
          </div>

          <div className="p-2.5 bg-[#101018] rounded-xl border border-[#222230] flex items-start gap-2.5">
            <Heart className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-semibold">Priya Patel liked your Day 12 Rate Limiter submission.</p>
              <span className="text-[10px] text-[#71717a]">1 hour ago</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
