import React from 'react';
import { X, Sparkles, Code, Layers, Palette, Type, Grid, Flame, Clock, Shield, Smartphone, Eye } from 'lucide-react';

interface DesignSystemDrawerProps {
  onClose: () => void;
}

export const DesignSystemDrawer: React.FC<DesignSystemDrawerProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg h-full bg-[#080808] border-l border-[#222222] p-6 overflow-y-auto space-y-8 flex flex-col justify-between shadow-2xl">
        <div className="space-y-8">
          {/* Drawer Top Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#222222]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-base">
                AB
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">ABTalks Design System</h2>
                <p className="text-[10px] text-indigo-400 font-mono font-semibold uppercase tracking-widest">
                  Sophisticated Dark • Specification v1.0.4
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#141414] border border-[#222222] text-[#71717a] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section 1: Philosophy */}
          <div className="space-y-2">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-indigo-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> 1. Design Philosophy
            </h3>
            <p className="text-xs text-[#a1a1aa] leading-relaxed bg-[#111111] p-3.5 rounded-2xl border border-[#222222]">
              Precision-crafted for Indian college coders. Fusing the clinical efficiency of Linear with the gamified obsession of Duolingo and the contribution habits of GitHub.
            </p>
          </div>

          {/* Section 2: Color System */}
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-indigo-400 font-bold flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" /> 2. Color System
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-[#050505] border border-[#222222] p-2.5 rounded-xl flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-[#050505] border border-[#333]" />
                <div>
                  <p className="text-white font-bold text-[10px]">Background</p>
                  <p className="text-[9px] text-[#71717a]">#050505</p>
                </div>
              </div>

              <div className="bg-[#111111] border border-[#222222] p-2.5 rounded-xl flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-[#111111] border border-[#333]" />
                <div>
                  <p className="text-white font-bold text-[10px]">Surface Card</p>
                  <p className="text-[9px] text-[#71717a]">#111111</p>
                </div>
              </div>

              <div className="bg-[#111111] border border-[#222222] p-2.5 rounded-xl flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-[#6366f1]" />
                <div>
                  <p className="text-white font-bold text-[10px]">Indigo Primary</p>
                  <p className="text-[9px] text-[#71717a]">#6366F1</p>
                </div>
              </div>

              <div className="bg-[#111111] border border-[#222222] p-2.5 rounded-xl flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-[#f59e0b]" />
                <div>
                  <p className="text-white font-bold text-[10px]">Flame Orange</p>
                  <p className="text-[9px] text-[#71717a]">#F59E0B</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Typography System */}
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-indigo-400 font-bold flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5" /> 3. Typography Hierarchy
            </h3>
            <div className="bg-[#111111] border border-[#222222] p-3.5 rounded-2xl space-y-2 text-xs">
              <div>
                <p className="text-base font-bold text-white tracking-tight">Inter Sans Display (16px–24px)</p>
                <p className="text-[10px] text-[#71717a]">Primary headings and action buttons</p>
              </div>
              <div className="pt-2 border-t border-[#1f1f1f]">
                <p className="font-mono text-xs text-indigo-300">JetBrains Mono Code (11px–14px)</p>
                <p className="text-[10px] text-[#71717a]">Code workspace, test cases, and timers</p>
              </div>
            </div>
          </div>

          {/* Section 4: Gamification & Circadian Rules */}
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-indigo-400 font-bold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" /> 4. Gamification & Circadian Rules
            </h3>
            <ul className="space-y-2 text-xs text-[#a1a1aa]">
              <li className="bg-[#111111] p-2.5 rounded-xl border border-[#222222] flex items-start gap-2">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span><b>Circadian Unlock</b>: Daily challenges unlock synchronously at 9:00 PM IST across India.</span>
              </li>
              <li className="bg-[#111111] p-2.5 rounded-xl border border-[#222222] flex items-start gap-2">
                <Shield className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span><b>Streak Freeze Shield</b>: Shields prevent streak breaks during college semester exams.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-[#222222] text-[10px] text-[#52525b] uppercase tracking-widest text-center">
          ABTalks Mobile Architecture • Senior Product Engineer Edition
        </div>
      </div>
    </div>
  );
};
