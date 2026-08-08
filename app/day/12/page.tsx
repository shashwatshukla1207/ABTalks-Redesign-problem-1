"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  Flame,
  Zap,
  Clock,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Github,
  Linkedin,
  BookOpen,
  Code2,
  ChevronDown,
  ChevronUp,
  Share2,
  Send,
  Lock,
  RotateCcw,
  ShieldCheck,
  AlertCircle,
  Trophy,
  ArrowRight,
  FileCode,
  Terminal,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LinearProgress } from "@/components/ui/Progress";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Modal } from "@/components/ui/Modal";
import { Toast } from "@/components/ui/Toast";
import { TopAppBar } from "@/components/layout/MobileNav";

// Motivational Quotes
const MOTIVATIONAL_QUOTES = [
  "\"First, solve the problem. Then, write the code.\" – John Johnson",
  "\"Experience is the name everyone gives to their mistakes.\" – Oscar Wilde",
  "\"Code is like humor. When you have to explain it, it’s bad.\" – Cory House",
  "\"Simplicity is prerequisite for reliability.\" – Edsger W. Dijkstra",
  "\"Talk is cheap. Show me the code.\" – Linus Torvalds",
];

export default function ChallengeDayPage({ onBack }: { onBack?: () => void }) {
  // Step Checklist State
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
  });

  // URL Input States
  const [githubRepoUrl, setGithubRepoUrl] = useState("https://github.com/rahul-s/express-rate-limiter");
  const [githubCommitUrl, setGithubCommitUrl] = useState("https://github.com/rahul-s/express-rate-limiter/commit/7f3a9d1");
  const [linkedinPostUrl, setLinkedinPostUrl] = useState("https://linkedin.com/posts/rahuls-day12-proof");

  // Code Block State
  const [isCodeExpanded, setIsCodeExpanded] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);

  // AI LinkedIn Generator State
  const [aiPostText, setAiPostText] = useState("");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [copiedAiPost, setCopiedAiPost] = useState(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<{ title: string; type: "success" | "error" | "info" } | null>(null);

  // Quote State
  const [quoteIdx] = useState(() => Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length));

  // Calculate Progress Percentage
  const totalSteps = 4;
  const finishedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((finishedCount / totalSteps) * 100);

  // Toggle Step Check
  const toggleStep = (stepNum: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNum]: !prev[stepNum],
    }));
  };

  // Sample Starter Code Block
  const codeSnippet = `const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

// Define Sliding Window Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Too Many Requests',
    message: 'You have exceeded the rate limit of 100 requests per 15 minutes.'
  }
});

// Apply rate limiting middleware to all /api routes
app.use('/api/', apiLimiter);

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(3000, () => console.log('Server running on port 3000'));`;

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Generate AI LinkedIn Post
  const handleGenerateAiPost = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setAiPostText(
        `🚀 Day 12 of 60: Shipped Rate-Limited REST API in Node.js & Redis!\n\nToday's challenge was protecting production endpoints against brute-force attacks and DDoS abuse using sliding-window rate limiters.\n\nKey Engineering Takeaways:\n• Configured Express middleware for IP tracking\n• Handled 429 HTTP status edge cases & headers\n• Tested with 1,000+ concurrent benchmark requests\n\nGitHub Repo: ${githubRepoUrl || "https://github.com/rahul-s/express-rate-limiter"}\n\nSpecial thanks to @ABTalks 60-Day Sprint!\n\n#NodeJS #Backend #WebDev #BuildInPublic #SoftwareEngineering #ProofOfWork`
      );
      setIsGeneratingAi(false);
      setToastMessage({
        title: "LinkedIn Post Generated! ✨",
        type: "success",
      });
    }, 1200);
  };

  const copyAiPostToClipboard = () => {
    navigator.clipboard.writeText(aiPostText);
    setCopiedAiPost(true);
    setTimeout(() => setCopiedAiPost(false), 2000);
  };

  // Submit Proof Action
  const handleSubmitProof = () => {
    if (!githubRepoUrl.includes("github.com")) {
      setToastMessage({
        title: "Invalid GitHub URL",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setShowSuccessModal(true);
      setToastMessage({
        title: "Proof Verified & Merged! +120 XP",
        type: "success",
      });
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed] font-sans flex flex-col pb-28 selection:bg-indigo-500/30">
      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          title={toastMessage.title}
          type={toastMessage.type}
          isVisible={!!toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-xl border-b border-[#1f1f28] px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-xl bg-[#14141c] border border-[#22222e] text-[#a1a1aa] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[10px] font-mono text-indigo-400 font-bold block">
                DAY 12 OF 60
              </span>
              <h1 className="text-xs font-bold text-white">Rate-Limited REST API</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold">
              <Flame className="w-3.5 h-3.5 fill-amber-400/40" />
              <span>14d</span>
            </div>

            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono text-xs font-bold">
              <Zap className="w-3.5 h-3.5 fill-indigo-400" />
              <span>+120 XP</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 px-4 pt-4 space-y-5 max-w-md mx-auto w-full">
        {/* SECTION 1: CHALLENGE OVERVIEW CARD */}
        <Card variant="gradient" className="p-5 border-indigo-500/30 bg-[#0c0c14] space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="warning" size="sm">
              Intermediate
            </Badge>

            <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1aa]">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>45 Mins</span>
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-extrabold text-white tracking-tight">
              Build a Rate-Limited REST API using Node.js
            </h2>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Protect API infrastructure from rate abuse, DDoS attacks, and unauthorized spamming using Express middleware.
            </p>
          </div>

          {/* Skills Covered */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {["Node.js", "Express", "REST API", "Middleware", "Rate Limiting", "Security"].map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 bg-[#14141c] border border-[#222230] rounded-lg text-[10px] font-mono text-[#ededed]"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="space-y-1 pt-1 border-t border-[#181822]">
            <div className="flex justify-between items-center text-[10px] font-mono text-[#a1a1aa]">
              <span>Checklist Progress</span>
              <span className="text-indigo-400 font-bold">{progressPercent}% Completed</span>
            </div>
            <LinearProgress value={progressPercent} colorClass="bg-indigo-500" height={6} />
          </div>
        </Card>

        {/* SECTION 2: MOTIVATIONAL QUOTE */}
        <Card variant="default" className="p-3.5 border-[#1f1f28] bg-[#08080c] text-center space-y-1">
          <p className="text-xs text-[#a1a1aa] italic">{MOTIVATIONAL_QUOTES[quoteIdx]}</p>
        </Card>

        {/* SECTION 3: LEARNING OUTCOMES */}
        <Card variant="default" className="p-4 space-y-3 border-[#1f1f28] bg-[#08080c]">
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Core Learning Outcomes
          </h3>

          <ul className="space-y-2 text-xs text-[#a1a1aa]">
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Understand Express middleware execution lifecycle</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Protect REST endpoints against high-volume IP requests</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Construct standard HTTP 429 response structures & headers</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Write automated test suites simulating rate limit breaches</span>
            </li>
          </ul>
        </Card>

        {/* SECTION 4: STEP-BY-STEP INSTRUCTIONS & CHECKLIST */}
        <Card variant="default" className="p-4 space-y-4 border-[#1f1f28] bg-[#08080c]">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-indigo-400" />
              Step-by-Step Build Guide
            </h3>
            <span className="text-[10px] text-indigo-400 font-mono font-bold">
              {finishedCount}/{totalSteps} Steps
            </span>
          </div>

          <div className="space-y-3">
            {/* Step 1 */}
            <div
              onClick={() => toggleStep(1)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                completedSteps[1]
                  ? "bg-indigo-500/10 border-indigo-500/30 text-white"
                  : "bg-[#101018] border-[#1f1f28] text-[#a1a1aa]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-indigo-400">
                  STEP 1: INITIALIZE PROJECT
                </span>
                <Checkbox checked={!!completedSteps[1]} onChange={() => {}} />
              </div>
              <p className="text-xs font-medium leading-relaxed">
                Run <code className="bg-[#181822] px-1.5 py-0.5 rounded text-indigo-300 font-mono text-[11px]">npm init -y</code> and install express + express-rate-limit.
              </p>
            </div>

            {/* Step 2 */}
            <div
              onClick={() => toggleStep(2)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                completedSteps[2]
                  ? "bg-indigo-500/10 border-indigo-500/30 text-white"
                  : "bg-[#101018] border-[#1f1f28] text-[#a1a1aa]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-indigo-400">
                  STEP 2: CONFIGURE MIDDLEWARE
                </span>
                <Checkbox checked={!!completedSteps[2]} onChange={() => {}} />
              </div>
              <p className="text-xs font-medium leading-relaxed">
                Create a 15-minute window limiter allowing max 100 requests per IP address.
              </p>
            </div>

            {/* Step 3 */}
            <div
              onClick={() => toggleStep(3)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                completedSteps[3]
                  ? "bg-indigo-500/10 border-indigo-500/30 text-white"
                  : "bg-[#101018] border-[#1f1f28] text-[#a1a1aa]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-indigo-400">
                  STEP 3: TEST 429 RESPONSES
                </span>
                <Checkbox checked={!!completedSteps[3]} onChange={() => {}} />
              </div>
              <p className="text-xs font-medium leading-relaxed">
                Send 101 requests using curl or Postman to confirm 429 Too Many Requests status.
              </p>
            </div>

            {/* Step 4 */}
            <div
              onClick={() => toggleStep(4)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                completedSteps[4]
                  ? "bg-indigo-500/10 border-indigo-500/30 text-white"
                  : "bg-[#101018] border-[#1f1f28] text-[#a1a1aa]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-indigo-400">
                  STEP 4: PUSH TO GITHUB
                </span>
                <Checkbox checked={!!completedSteps[4]} onChange={() => {}} />
              </div>
              <p className="text-xs font-medium leading-relaxed">
                Commit changes with message <code className="bg-[#181822] px-1.5 py-0.5 rounded text-indigo-300 font-mono text-[11px]">feat: add rate limiter</code> and push.
              </p>
            </div>
          </div>
        </Card>

        {/* SECTION 5: STARTER CODE BLOCK */}
        <Card variant="glass" className="p-4 space-y-3 border-[#1f1f28] bg-[#0c0c10]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-white">Starter Reference Code</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyCodeToClipboard}
                className="px-2 py-1 rounded-lg bg-[#181822] border border-[#272736] text-[10px] text-[#a1a1aa] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCode ? "Copied!" : "Copy"}</span>
              </button>

              <button
                onClick={() => setIsCodeExpanded(!isCodeExpanded)}
                className="p-1 rounded-lg bg-[#181822] border border-[#272736] text-[#a1a1aa] hover:text-white cursor-pointer"
              >
                {isCodeExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isCodeExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <pre className="p-3 bg-[#050508] border border-[#181822] rounded-xl text-[10px] font-mono text-indigo-200 overflow-x-auto leading-relaxed">
                  <code>{codeSnippet}</code>
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* SECTION 6: CURATED RESOURCES */}
        <Card variant="default" className="p-4 space-y-3 border-[#1f1f28] bg-[#08080c]">
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-purple-400" />
            Recommended Resources
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <a
              href="https://expressjs.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-[#101018] border border-[#1f1f28] hover:border-indigo-500/40 transition-all flex items-center justify-between text-[#a1a1aa] hover:text-white"
            >
              <span>Express.js Docs</span>
              <ExternalLink className="w-3 h-3 text-indigo-400" />
            </a>

            <a
              href="https://npmjs.com/package/express-rate-limit"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-[#101018] border border-[#1f1f28] hover:border-indigo-500/40 transition-all flex items-center justify-between text-[#a1a1aa] hover:text-white"
            >
              <span>Rate Limit Package</span>
              <ExternalLink className="w-3 h-3 text-indigo-400" />
            </a>
          </div>
        </Card>

        {/* SECTION 7: AI LINKEDIN POST GENERATOR */}
        <Card variant="gradient" className="p-4 space-y-3 border-purple-500/30 bg-[#0e0a16]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h3 className="text-xs font-bold text-white">AI LinkedIn Assistant</h3>
            </div>
            <Badge variant="xp" size="sm">Auto-Draft</Badge>
          </div>

          <p className="text-[11px] text-[#a1a1aa]">
            Generate a recruiter-optimized post summarizing your Day 12 implementation.
          </p>

          <Button
            variant="secondary"
            onClick={handleGenerateAiPost}
            isLoading={isGeneratingAi}
            className="w-full text-xs font-bold bg-[#1a1428] border-purple-500/30 text-purple-300 hover:bg-[#221a35]"
            leftIcon={<Sparkles className="w-3.5 h-3.5 text-purple-400" />}
          >
            ✨ Generate LinkedIn Post
          </Button>

          {aiPostText && (
            <div className="space-y-2 pt-2 border-t border-purple-500/20">
              <textarea
                value={aiPostText}
                onChange={(e) => setAiPostText(e.target.value)}
                rows={6}
                className="w-full bg-[#08060c] text-[#ededed] p-3 rounded-xl border border-purple-500/30 text-[11px] font-mono leading-relaxed focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <div className="flex items-center justify-between text-[10px] text-[#a1a1aa]">
                <span>{aiPostText.length} Characters</span>
                <button
                  onClick={copyAiPostToClipboard}
                  className="px-3 py-1 rounded-lg bg-purple-600 text-white font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedAiPost ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedAiPost ? "Copied!" : "Copy Post"}</span>
                </button>
              </div>
            </div>
          )}
        </Card>

        {/* SECTION 8: PROOF SUBMISSION FORM */}
        <Card variant="gradient" className="p-5 space-y-4 border-indigo-500/40 bg-[#0a0a12]">
          <div className="flex items-center justify-between border-b border-[#181822] pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold text-white">Submit Day 12 Proof</h3>
            </div>
            <Badge variant="streak" size="sm">+120 XP</Badge>
          </div>

          <div className="space-y-3">
            <Input
              label="GitHub Repository URL *"
              value={githubRepoUrl}
              onChange={(e) => setGithubRepoUrl(e.target.value)}
              leftIcon={<Github className="w-4 h-4 text-white" />}
              placeholder="https://github.com/username/repo"
            />

            <Input
              label="GitHub Commit URL *"
              value={githubCommitUrl}
              onChange={(e) => setGithubCommitUrl(e.target.value)}
              leftIcon={<FileCode className="w-4 h-4 text-emerald-400" />}
              placeholder="https://github.com/username/repo/commit/..."
            />

            <Input
              label="LinkedIn Post URL (Optional)"
              value={linkedinPostUrl}
              onChange={(e) => setLinkedinPostUrl(e.target.value)}
              leftIcon={<Linkedin className="w-4 h-4 text-sky-400" />}
              placeholder="https://linkedin.com/posts/..."
            />
          </div>

          <Button
            variant="primary"
            onClick={handleSubmitProof}
            isLoading={isSubmitting}
            disabled={isSubmitted}
            className={`w-full font-bold text-xs py-4 shadow-xl border-none ${
              isSubmitted
                ? "bg-emerald-600 text-white cursor-default"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30"
            }`}
            leftIcon={isSubmitted ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4" />}
          >
            {isSubmitted ? "Proof Verified & Merged ✓" : "Submit Today's Proof (+120 XP)"}
          </Button>
        </Card>

        {/* SECTION 9: NEXT DAY PREVIEW (UNLOCKED UPON SUBMISSION) */}
        <Card variant="default" className="p-4 space-y-2 border-[#1f1f28] bg-[#08080c]">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[10px] text-indigo-400 font-bold">NEXT UP: DAY 13</span>
            <Badge variant={isSubmitted ? "success" : "neutral"} size="sm">
              {isSubmitted ? "Unlocked" : "Locked"}
            </Badge>
          </div>

          <h4 className="text-xs font-bold text-white flex items-center gap-2">
            {!isSubmitted && <Lock className="w-3.5 h-3.5 text-[#71717a]" />}
            Binary Search Tree Visualizer Engine
          </h4>

          <p className="text-[11px] text-[#a1a1aa]">
            Build an interactive visualizer for self-balancing binary search trees with step-by-step state rendering.
          </p>
        </Card>
      </main>

      {/* SUCCESS MODAL */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="🎉 Day 12 Completed!"
        description="Your proof-of-work has been verified by the automated build runner."
        maxWidth="sm"
        footer={
          <Button
            variant="primary"
            onClick={() => setShowSuccessModal(false)}
            className="w-full bg-indigo-600 text-white font-bold text-xs"
          >
            Continue to Day 13 Preview
          </Button>
        }
      >
        <div className="text-center space-y-4 py-2">
          <div className="w-16 h-16 rounded-3xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 mx-auto flex items-center justify-center text-2xl font-bold shadow-xl shadow-indigo-500/20 animate-bounce">
            ⚡
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">+120 XP Earned!</h3>
            <p className="text-xs text-[#a1a1aa]">
              Streak extended to <strong className="text-amber-400">15 Days</strong>! Recruiter readiness increased to <strong className="text-emerald-400">80%</strong>.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
