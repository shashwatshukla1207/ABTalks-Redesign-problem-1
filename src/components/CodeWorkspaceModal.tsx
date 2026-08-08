import React, { useState } from 'react';
import { X, Play, Send, Check, AlertCircle, Clock, Cpu, Sparkles, ChevronDown, RotateCcw, Copy, HelpCircle, BookOpen, Flame, ThumbsUp, Code } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DailyChallenge, Language, TestCase, UserProgress, CommunitySolution } from '../types';
import { MOCK_COMMUNITY_SOLUTIONS } from '../data/mockData';

interface CodeWorkspaceModalProps {
  challenge: DailyChallenge;
  userProgress: UserProgress;
  onClose: () => void;
  onCompleteChallenge: (day: number, xp: number, code: string, language: Language) => void;
}

export const CodeWorkspaceModal: React.FC<CodeWorkspaceModalProps> = ({
  challenge,
  userProgress,
  onClose,
  onCompleteChallenge
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('python');
  const [code, setCode] = useState<string>(challenge.initialCode[selectedLanguage] || '');
  const [activeTab, setActiveTab] = useState<'description' | 'testcases' | 'hints' | 'solutions'>('description');
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  
  // Execution state
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<{
    status: 'idle' | 'passed' | 'failed';
    runtimeMs?: number;
    memoryMb?: number;
    message?: string;
    casesPassed?: number;
    totalCases?: number;
  }>({ status: 'idle' });

  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang);
    setCode(challenge.initialCode[lang] || '');
  };

  const toggleHint = (index: number) => {
    if (revealedHints.includes(index)) {
      setRevealedHints(revealedHints.filter(i => i !== index));
    } else {
      setRevealedHints([...revealedHints, index]);
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTestResults({ status: 'idle' });

    setTimeout(() => {
      setIsRunning(false);
      const isSuccess = code.length > 20 && !code.includes('# Write your solution here');
      setTestResults({
        status: isSuccess ? 'passed' : 'failed',
        runtimeMs: Math.floor(Math.random() * 25) + 12,
        memoryMb: Number((Math.random() * 3 + 12).toFixed(1)),
        casesPassed: isSuccess ? challenge.testCases.length : 1,
        totalCases: challenge.testCases.length,
        message: isSuccess
          ? 'All sample test cases passed successfully!'
          : 'Output mismatch on Test Case 2. Expected 142, got None.'
      });
    }, 1200);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      // Trigger celebratory confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#f59e0b', '#22c55e', '#ffffff']
      });

      onCompleteChallenge(challenge.day, challenge.xp, code, selectedLanguage);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-hidden animate-in fade-in duration-200">
      <div className="w-full max-w-4xl h-[92vh] sm:h-[88vh] bg-[#0c0c0c] border border-[#222222] rounded-3xl overflow-hidden flex flex-col shadow-2xl relative">
        {/* Workspace Top Header */}
        <div className="bg-[#111111] border-b border-[#222222] px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 font-mono font-bold text-xs flex items-center justify-center">
              D{challenge.day}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white leading-none">
                  {challenge.title}
                </h2>
                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                  challenge.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                  challenge.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                  'bg-rose-500/10 text-rose-400 border-rose-500/20'
                }`}>
                  {challenge.difficulty}
                </span>
              </div>
              <p className="text-[10px] text-[#71717a]">{challenge.category} • +{challenge.xp} XP Reward</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Dropdown */}
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value as Language)}
              className="bg-[#1a1a1a] border border-[#333333] text-xs font-mono text-indigo-300 rounded-xl px-2.5 py-1 focus:outline-none cursor-pointer"
            >
              <option value="python">Python 3</option>
              <option value="cpp">C++ 20</option>
              <option value="java">Java 17</option>
              <option value="javascript">JavaScript ES6</option>
            </select>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-[#18181b] border border-[#27272a] text-[#71717a] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Headers for Left Panel View */}
        <div className="flex border-b border-[#222222] bg-[#080808] text-xs px-2 shrink-0 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('description')}
            className={`py-2.5 px-4 font-semibold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'description'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-[#71717a] hover:text-[#a1a1aa]'
            }`}
          >
            Problem
          </button>
          <button
            onClick={() => setActiveTab('testcases')}
            className={`py-2.5 px-4 font-semibold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'testcases'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-[#71717a] hover:text-[#a1a1aa]'
            }`}
          >
            Test Cases ({challenge.testCases.length})
          </button>
          <button
            onClick={() => setActiveTab('hints')}
            className={`py-2.5 px-4 font-semibold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'hints'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-[#71717a] hover:text-[#a1a1aa]'
            }`}
          >
            Hints ({challenge.hints.length})
          </button>
          <button
            onClick={() => setActiveTab('solutions')}
            className={`py-2.5 px-4 font-semibold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'solutions'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-[#71717a] hover:text-[#a1a1aa]'
            }`}
          >
            Solutions
          </button>
        </div>

        {/* Split View Container: Left Problem Spec / Right Code Editor */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
          {/* Left Panel - Tab Contents */}
          <div className="p-4 overflow-y-auto space-y-4 border-b md:border-b-0 md:border-r border-[#222222] bg-[#0a0a0a]">
            {activeTab === 'description' && (
              <div className="space-y-4 text-xs text-[#d4d4d8]">
                <div>
                  <h4 className="text-[10px] text-[#71717a] uppercase font-bold tracking-wider mb-2">Description</h4>
                  <p className="leading-relaxed text-[#a1a1aa] whitespace-pre-line">{challenge.description}</p>
                </div>

                <div>
                  <h4 className="text-[10px] text-[#71717a] uppercase font-bold tracking-wider mb-2">Examples</h4>
                  <div className="bg-[#141414] border border-[#222222] rounded-xl p-3 font-mono text-[11px] space-y-1">
                    <p className="text-indigo-300"><span className="text-[#71717a]">Input:</span> {challenge.inputExample}</p>
                    <p className="text-emerald-400"><span className="text-[#71717a]">Output:</span> {challenge.outputExample}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] text-[#71717a] uppercase font-bold tracking-wider mb-2">Constraints</h4>
                  <ul className="list-disc list-inside space-y-1 font-mono text-[11px] text-[#a1a1aa]">
                    {challenge.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'testcases' && (
              <div className="space-y-3">
                <h4 className="text-[10px] text-[#71717a] uppercase font-bold tracking-wider">Sample Test Cases</h4>
                {challenge.testCases.map((tc, idx) => (
                  <div key={tc.id} className="bg-[#141414] border border-[#222222] rounded-xl p-3 font-mono text-xs space-y-2">
                    <div className="flex justify-between text-[10px] text-[#71717a]">
                      <span>Case {idx + 1}</span>
                      <span className="text-emerald-400 font-bold">Public</span>
                    </div>
                    <div>
                      <span className="text-[#71717a] block text-[10px]">Input:</span>
                      <span className="text-indigo-300">{tc.input}</span>
                    </div>
                    <div>
                      <span className="text-[#71717a] block text-[10px]">Expected Output:</span>
                      <span className="text-emerald-400">{tc.expectedOutput}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'hints' && (
              <div className="space-y-3">
                <h4 className="text-[10px] text-[#71717a] uppercase font-bold tracking-wider">Algorithmic Hints</h4>
                {challenge.hints.map((hint, idx) => (
                  <div key={idx} className="bg-[#141414] border border-[#222222] rounded-xl p-3 text-xs">
                    <button
                      onClick={() => toggleHint(idx)}
                      className="w-full text-left flex items-center justify-between font-bold text-indigo-400"
                    >
                      <span>Hint {idx + 1}</span>
                      <span className="text-[10px] bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        {revealedHints.includes(idx) ? 'Hide' : 'Reveal'}
                      </span>
                    </button>
                    {revealedHints.includes(idx) && (
                      <p className="mt-2 text-[#a1a1aa] leading-relaxed animate-in fade-in">
                        {hint}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'solutions' && (
              <div className="space-y-3">
                <h4 className="text-[10px] text-[#71717a] uppercase font-bold tracking-wider">Community Submissions</h4>
                {MOCK_COMMUNITY_SOLUTIONS.map(sol => (
                  <div key={sol.id} className="bg-[#141414] border border-[#222222] rounded-xl p-3 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={sol.authorAvatar} className="w-6 h-6 rounded-full object-cover" />
                        <span className="font-semibold text-white">{sol.author}</span>
                        <span className="text-[9px] text-indigo-400 font-mono">({sol.college})</span>
                      </div>
                      <span className="text-[10px] text-[#71717a]">{sol.createdAt}</span>
                    </div>
                    <p className="text-[11px] text-[#a1a1aa]">{sol.explanation}</p>
                    <pre className="bg-[#080808] p-2 rounded border border-[#222] font-mono text-[10px] text-indigo-300 overflow-x-auto">
                      {sol.code}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Panel - Code Editor Canvas */}
          <div className="flex flex-col bg-[#050505] p-3">
            <div className="flex justify-between items-center text-[11px] text-[#71717a] mb-2 font-mono">
              <span className="flex items-center gap-1 text-indigo-400">
                <Code className="w-3.5 h-3.5" /> main.{selectedLanguage === 'python' ? 'py' : selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage === 'java' ? 'java' : 'js'}
              </span>
              <button
                onClick={() => setCode(challenge.initialCode[selectedLanguage] || '')}
                className="hover:text-white flex items-center gap-1"
                title="Reset Code Template"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Code Textarea with JetBrains Mono Styling */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full flex-1 bg-[#09090b] text-[#e4e4e7] font-mono text-xs sm:text-sm p-3.5 rounded-2xl border border-[#222222] focus:border-indigo-500/50 focus:outline-none resize-none leading-relaxed tracking-wide"
              spellCheck={false}
            />

            {/* Execution Result Box */}
            {testResults.status !== 'idle' && (
              <div className={`mt-3 p-3 rounded-2xl border font-mono text-xs animate-in fade-in ${
                testResults.status === 'passed'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
              }`}>
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="flex items-center gap-1.5">
                    {testResults.status === 'passed' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {testResults.status === 'passed' ? 'All Sample Cases Passed!' : 'Execution Failed'}
                  </span>
                  <span className="text-[10px] opacity-80">
                    {testResults.casesPassed}/{testResults.totalCases} Passed
                  </span>
                </div>
                <div className="flex gap-4 text-[10px] opacity-90 pt-1">
                  <span>Runtime: {testResults.runtimeMs} ms</span>
                  <span>Memory: {testResults.memoryMb} MB</span>
                </div>
              </div>
            )}

            {/* Bottom Action Bar */}
            <div className="flex items-center justify-between gap-3 pt-3 mt-1">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="flex-1 bg-[#18181b] hover:bg-[#27272a] text-white font-bold py-2.5 rounded-xl text-xs border border-[#27272a] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isRunning ? 'Running...' : 'Run Test Cases'}</span>
              </button>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Evaluating...' : 'Submit (+150 XP)'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
