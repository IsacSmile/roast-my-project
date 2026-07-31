import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-zinc-800/80 bg-zinc-950 py-12 sm:py-16 text-center text-xs text-zinc-500 animate-fadeIn transition-opacity duration-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-normal tracking-wide text-zinc-400">
          Conceived by ChatGPT • Orchestrated by Antigravity • Brought to Life by <strong className="font-bold text-zinc-100">FAIZ IMAM</strong>
        </p>
      </div>
    </footer>
  );
};
