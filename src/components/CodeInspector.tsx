import React, { useState } from 'react';
import { Terminal, Code, Flame } from 'lucide-react';
import type { CodeSnippet } from '../types';

interface CodeInspectorProps {
  snippets: CodeSnippet[];
}

export const CodeInspector: React.FC<CodeInspectorProps> = ({ snippets }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!snippets || snippets.length === 0) return null;

  const currentSnippet = snippets[activeTab] || snippets[0];

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-orange-500" />
          <span>Live Code Inspector 🎯</span>
        </h3>
        
        {/* File Tabs */}
        <div className="flex items-center space-x-1.5 p-1 bg-zinc-950 rounded-lg border border-zinc-800 overflow-x-auto">
          {snippets.map((snippet, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition cursor-pointer flex items-center space-x-1.5 ${
                activeTab === idx
                  ? 'bg-zinc-800 text-orange-400 border border-zinc-700/60 shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>{snippet.fileName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Code Display Box */}
      <div className="relative bg-zinc-950 border border-zinc-800/90 rounded-xl overflow-hidden font-mono text-xs">
        {/* Top bar controls */}
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/60 border-b border-zinc-800/80 text-[11px] text-zinc-500">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-zinc-400 font-semibold ml-2">{currentSnippet.fileName}</span>
          </div>
          <span className="uppercase text-[10px] tracking-widest text-zinc-500">{currentSnippet.language}</span>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-x-auto text-zinc-300 leading-relaxed max-h-72 whitespace-pre">
          {currentSnippet.code}
        </div>

        {/* Line Comment Roast Box */}
        {currentSnippet.roastComment && (
          <div className="p-3 bg-orange-500/10 border-t border-orange-500/20 text-orange-300 text-xs font-mono flex items-center space-x-2">
            <Flame className="w-4 h-4 text-orange-400 shrink-0" />
            <span>{currentSnippet.roastComment}</span>
          </div>
        )}
      </div>
    </div>
  );
};
