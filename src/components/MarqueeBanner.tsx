import React from 'react';

export const MarqueeBanner: React.FC = () => {
  const contentItem = (
    <div className="flex items-center space-x-6 px-4 text-xs font-mono tracking-wider uppercase text-zinc-400 shrink-0">
      <span>Roast My Project</span>
      <span className="text-zinc-700">—</span>
      <span>Your AI Code Reviewer With A Sense Of Humor</span>
      <span className="text-zinc-700">•</span>
      <span>Built By Antigravity</span>
      <span className="text-zinc-700">•</span>
      <span>Idea By ChatGPT</span>
      <span className="text-zinc-700">•</span>
      <span>
        Final Touch By{' '}
        <strong className="font-bold text-orange-400 tracking-widest">
          FAIZ IMAM
        </strong>
      </span>
      <span className="text-zinc-700 px-2">•</span>
    </div>
  );

  return (
    <div className="w-full border-y border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm py-2.5 overflow-hidden select-none group transition-colors hover:border-zinc-700/80">
      <div className="animate-marquee flex whitespace-nowrap">
        {contentItem}
        {contentItem}
        {contentItem}
        {contentItem}
      </div>
    </div>
  );
};
