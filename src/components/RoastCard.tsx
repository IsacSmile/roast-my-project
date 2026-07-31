import React, { useState } from 'react';
import { Flame, Copy, Check, Quote, Share2 } from 'lucide-react';

interface RoastCardProps {
  roast: string;
  projectName?: string;
}

export const RoastCard: React.FC<RoastCardProps> = ({ roast, projectName }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`🔥 Roast for ${projectName || 'my project'}: "${roast}" - via Roast My Project`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Roast My Project',
        text: `🔥 AI Roast: "${roast}"`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-orange-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden group">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all pointer-events-none" />

      {/* Top Badge & Action Buttons */}
      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
          <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
          <span>🔥 Official AI Roast</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-medium text-zinc-300 transition"
            title="Copy roast to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Roast</span>
              </>
            )}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-medium text-zinc-300 transition"
            title="Share roast"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Main Roast Quote Box */}
      <div className="relative pl-6 border-l-4 border-orange-500 space-y-3">
        <Quote className="absolute -top-3 -left-3 w-6 h-6 text-orange-500/20" />
        <p className="text-xl sm:text-2xl font-semibold text-zinc-100 leading-snug tracking-tight italic">
          "{roast}"
        </p>
        {projectName && (
          <p className="text-xs font-mono text-zinc-400">
            Target Project: <span className="text-orange-400 font-semibold">{projectName}</span>
          </p>
        )}
      </div>

    </div>
  );
};
