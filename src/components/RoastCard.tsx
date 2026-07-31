import React, { useState, useRef } from 'react';
import { Flame, Copy, Check, Quote, Share2, RefreshCw, Download, Camera } from 'lucide-react';
import { toPng } from 'html-to-image';

interface RoastCardProps {
  roast: string;
  alternativeRoasts?: string[];
  projectName?: string;
  intensity?: string;
}

export const RoastCard: React.FC<RoastCardProps> = ({
  roast: initialRoast,
  alternativeRoasts = [],
  projectName,
  intensity = 'brutal'
}) => {
  const [currentRoast, setCurrentRoast] = useState(initialRoast);
  const [altIndex, setAltIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const allRoasts = [initialRoast, ...alternativeRoasts];

  const handleReRoast = () => {
    if (allRoasts.length > 1) {
      const nextIdx = (altIndex + 1) % allRoasts.length;
      setAltIndex(nextIdx);
      setCurrentRoast(allRoasts[nextIdx]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`🔥 Roast for ${projectName || 'my project'}: "${currentRoast}" - via Roast My Project`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPng = async () => {
    if (!cardRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `roast-${projectName || 'project'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export card image:', err);
    } finally {
      setExporting(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Roast My Project',
        text: `🔥 AI Roast for ${projectName || 'my project'}: "${currentRoast}"`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-orange-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden group transition-all"
    >
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all pointer-events-none" />

      {/* Top Badge & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center space-x-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
            <span>🔥 Official AI Roast</span>
          </div>

          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-400">
            {intensity}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {allRoasts.length > 1 && (
            <button
              onClick={handleReRoast}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-xs font-semibold text-orange-300 transition cursor-pointer"
              title="Generate alternative roast variant"
            >
              <RefreshCw className="w-3.5 h-3.5 text-orange-400" />
              <span>Re-Roast 🔥</span>
            </button>
          )}

          <button
            onClick={handleExportPng}
            disabled={exporting}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-medium text-zinc-300 hover:text-white transition cursor-pointer disabled:opacity-50"
            title="Download PNG Card Image for Socials"
          >
            {exporting ? (
              <Download className="w-3.5 h-3.5 animate-bounce text-amber-400" />
            ) : (
              <Camera className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span className="hidden sm:inline">Export PNG</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-medium text-zinc-300 transition cursor-pointer"
            title="Copy roast text"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-medium text-zinc-300 transition cursor-pointer"
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
          "{currentRoast}"
        </p>
        {projectName && (
          <p className="text-xs font-mono text-zinc-400 pt-1">
            Target Project: <span className="text-orange-400 font-semibold">{projectName}</span>
          </p>
        )}
      </div>

    </div>
  );
};
