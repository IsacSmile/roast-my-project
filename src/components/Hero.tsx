import React from 'react';
import { Flame, ShieldAlert, Zap } from 'lucide-react';
import { DeveloperIllustration } from '../assets/DeveloperIllustration';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-8 pb-12 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Text & Hero Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold tracking-wide uppercase shadow-sm backdrop-blur-sm">
              <Flame className="w-4 h-4 animate-bounce text-orange-500" />
              <span>Brutally Honest Code Review</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Roast My{' '}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-red-500 bg-clip-text text-transparent drop-shadow-sm">
                Project
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Your AI code reviewer with a sense of humor.
            </p>

            {/* Sub-features pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-zinc-400 font-mono">
              <div className="flex items-center space-x-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Instant Feedback</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                <span>Zero Mercy</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>Hilarious Roasts</span>
              </div>
            </div>

          </div>

          {/* Right Column: Developer Illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <DeveloperIllustration className="w-full max-w-md lg:max-w-full" />
          </div>

        </div>
      </div>
    </section>
  );
};
