import React from 'react';
import { Flame, Sparkles, FolderGit2 } from 'lucide-react';

interface HeaderProps {
  onHomeClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
  return (
    <header className="w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={onHomeClick}
          type="button"
          className="flex items-center space-x-3 cursor-pointer group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-red-600 p-0.5 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent tracking-tight">
              Roast My Project
            </span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest -mt-1">
              AI Code Reviewer
            </span>
          </div>
        </button>

        {/* Action Badges & Links */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Powered by Mock AI Engine</span>
          </div>

          <a
            href="https://github.com/IsacSmile"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-all duration-200"
          >
            <FolderGit2 className="w-4 h-4 text-orange-400" />
            <span className="hidden xs:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
