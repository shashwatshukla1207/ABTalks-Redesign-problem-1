import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Share2, Sparkles, Plus, Code, Search, Bookmark } from 'lucide-react';
import { CommunitySolution } from '../types';
import { MOCK_COMMUNITY_SOLUTIONS } from '../data/mockData';

export const CommunityView: React.FC = () => {
  const [solutions, setSolutions] = useState<CommunitySolution[]>(MOCK_COMMUNITY_SOLUTIONS);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostCode, setNewPostCode] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handleUpvote = (id: string) => {
    setSolutions(solutions.map(sol => {
      if (sol.id === id) {
        return {
          ...sol,
          upvotes: sol.isUpvoted ? sol.upvotes - 1 : sol.upvotes + 1,
          isUpvoted: !sol.isUpvoted
        };
      }
      return sol;
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim()) return;

    const newSol: CommunitySolution = {
      id: `post-${Date.now()}`,
      day: 14,
      title: newPostTitle,
      author: 'Rohan Sharma',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      college: 'IIT Delhi',
      language: 'python',
      code: newPostCode || '# Optimized solution logic here',
      explanation: 'Shared directly from ABTalks Daily Code Workspace.',
      upvotes: 1,
      commentsCount: 0,
      createdAt: 'Just now',
      isUpvoted: true
    };

    setSolutions([newSol, ...solutions]);
    setNewPostTitle('');
    setNewPostCode('');
    setIsPosting(false);
  };

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-300">
      {/* Community Header Banner */}
      <div className="bg-[#111111] border border-[#222222] rounded-3xl p-5 sm:p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
            Peer Peer-to-Peer Solutions
          </span>
          <button
            onClick={() => setIsPosting(!isPosting)}
            className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Share Solution</span>
          </button>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          ABTalks Coder Community
        </h2>
        <p className="text-xs text-[#a1a1aa]">
          Discuss optimal time complexities, interval DP tricks, and placement interview breakdowns with peers from top Indian colleges.
        </p>
      </div>

      {/* Share Solution Form Modal / Box */}
      {isPosting && (
        <form onSubmit={handleCreatePost} className="bg-[#111111] border border-indigo-500/40 rounded-3xl p-5 space-y-3 animate-in fade-in">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Share Your Day 14 Solution
          </h3>
          <input
            type="text"
            placeholder="Post Title (e.g. O(N^2) Space Optimized DP solution in C++)..."
            value={newPostTitle}
            onChange={e => setNewPostTitle(e.target.value)}
            className="w-full bg-[#161616] border border-[#222222] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            required
          />
          <textarea
            placeholder="Paste code or explanation snippet..."
            value={newPostCode}
            onChange={e => setNewPostCode(e.target.value)}
            className="w-full bg-[#161616] border border-[#222222] rounded-xl px-3 py-2 text-xs font-mono text-indigo-300 focus:outline-none focus:border-indigo-500 h-24"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsPosting(false)}
              className="text-xs text-[#71717a] hover:text-white px-3 py-1.5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-xs bg-indigo-600 text-white font-bold px-4 py-1.5 rounded-xl"
            >
              Post Solution
            </button>
          </div>
        </form>
      )}

      {/* Community Feed */}
      <div className="space-y-3">
        {solutions.map((sol) => (
          <div key={sol.id} className="bg-[#111111] border border-[#222222] rounded-2xl p-4 space-y-3 hover:border-[#333] transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={sol.authorAvatar} alt={sol.author} className="w-8 h-8 rounded-full object-cover border border-[#333]" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-white">{sol.author}</p>
                    <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.2 rounded border border-indigo-500/20 font-medium">
                      {sol.college}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#71717a]">{sol.createdAt} • Day {sol.day} Challenge</p>
                </div>
              </div>

              <span className="text-[10px] bg-[#18181b] border border-[#27272a] text-[#a1a1aa] px-2 py-0.5 rounded font-mono uppercase">
                {sol.language}
              </span>
            </div>

            <h3 className="text-sm font-bold text-white leading-snug">
              {sol.title}
            </h3>

            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              {sol.explanation}
            </p>

            <pre className="bg-[#080808] border border-[#222222] p-3 rounded-xl text-[11px] font-mono text-indigo-300 overflow-x-auto">
              {sol.code}
            </pre>

            <div className="flex items-center justify-between pt-2 border-t border-[#1a1a1a] text-xs text-[#71717a]">
              <button
                onClick={() => handleUpvote(sol.id)}
                className={`flex items-center gap-1.5 font-bold transition-colors cursor-pointer ${
                  sol.isUpvoted ? 'text-indigo-400' : 'hover:text-white'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${sol.isUpvoted ? 'fill-indigo-400' : ''}`} />
                <span>{sol.upvotes} Upvotes</span>
              </button>

              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{sol.commentsCount} Comments</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
