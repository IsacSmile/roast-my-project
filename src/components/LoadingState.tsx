import React, { useEffect, useState } from 'react';
import { Flame, Cpu, Terminal, Sparkles } from 'lucide-react';

const LOADING_MESSAGES = [
  "🔍 Decompiling nested spaghetti code...",
  "💣 Counting redundant console.log statements...",
  "☕ Inspecting 3 'final' files in repository...",
  "🔥 Evaluating commit message quality...",
  "⚡ Preparing brutally honest AI verdict..."
];

export const LoadingState: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto my-12 p-8 bg-zinc-900/90 border border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-xl text-center space-y-6 animate-fadeIn">
      
      {/* Animated Glowing Flame Icon */}
      <div className="relative inline-flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 via-amber-500 to-red-600 rounded-full blur-xl opacity-60 animate-ping" />
        <div className="w-20 h-20 rounded-2xl bg-zinc-950 border border-orange-500/50 flex items-center justify-center shadow-inner relative">
          <Flame className="w-10 h-10 text-orange-500 animate-bounce" />
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white tracking-tight flex items-center justify-center space-x-2">
          <span>AI Code Scanner Active</span>
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
        </h3>
        <p className="text-xs text-zinc-400 font-mono">
          Simulating deep static analysis (2s delay)...
        </p>
      </div>

      {/* Scanning Progress Bar */}
      <div className="w-full max-w-md mx-auto bg-zinc-950 border border-zinc-800 h-2.5 rounded-full overflow-hidden p-0.5 relative">
        <div className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-red-500 rounded-full animate-pulse transition-all duration-300 w-full" />
      </div>

      {/* Dynamic Rotating Message Box */}
      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-zinc-950 rounded-lg border border-zinc-800 text-xs font-mono text-amber-400 min-h-[38px]">
        <Terminal className="w-4 h-4 text-orange-400 shrink-0" />
        <span className="transition-opacity duration-200">{LOADING_MESSAGES[msgIndex]}</span>
      </div>

      {/* Tech indicators */}
      <div className="flex items-center justify-center space-x-6 text-[11px] font-mono text-zinc-500 pt-2">
        <span className="flex items-center space-x-1">
          <Cpu className="w-3.5 h-3.5 text-zinc-400" />
          <span>AST Parser</span>
        </span>
        <span>•</span>
        <span>Security Linter</span>
        <span>•</span>
        <span>Roast Engine v1.0</span>
      </div>

    </div>
  );
};
