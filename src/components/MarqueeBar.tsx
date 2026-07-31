import React from 'react';

export type MarqueePosition = 'top' | 'bottom' | 'left' | 'right' | 'below-hero';

export interface MarqueeBarProps {
  position?: MarqueePosition;
  speed?: number; // duration in seconds (default 30)
  className?: string;
}

export const MarqueeBar: React.FC<MarqueeBarProps> = ({
  position = 'below-hero',
  speed = 30,
  className = ''
}) => {
  const isVertical = position === 'left' || position === 'right';

  // Text unit content
  const renderContentItem = () => (
    <div
      className={`flex items-center text-xs font-mono tracking-wider uppercase text-zinc-400 shrink-0 ${
        isVertical ? 'flex-col space-y-6 py-4 [writing-mode:vertical-rl]' : 'space-x-6 px-4'
      }`}
    >
      <span>Roast My Project</span>
      <span className="text-zinc-700">•</span>
      <span>Your AI Code Reviewer With A Sense Of Humor</span>
      <span className="text-zinc-700">•</span>
      <span>Conceived By ChatGPT</span>
      <span className="text-zinc-700">•</span>
      <span>Orchestrated By Antigravity</span>
      <span className="text-zinc-700">•</span>
      <span>
        Masterminded By{' '}
        <strong className="font-bold text-orange-400 tracking-widest text-sm">
          FAIZ IMAM
        </strong>
      </span>
      <span className="text-zinc-700">{isVertical ? '│' : '•'}</span>
    </div>
  );

  // Position-specific container styling & direction mapping
  const getPositionConfig = () => {
    switch (position) {
      case 'top':
        return {
          wrapper: 'fixed top-0 left-0 w-full z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md py-2 overflow-hidden select-none group [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
          animationClass: 'animate-marquee-left-to-right'
        };
      case 'bottom':
        return {
          wrapper: 'fixed bottom-0 left-0 w-full z-40 border-t border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md py-2 overflow-hidden select-none group [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
          animationClass: 'animate-marquee-right-to-left'
        };
      case 'left':
        return {
          wrapper: 'fixed top-0 left-0 h-full w-10 z-40 border-r border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md flex justify-center items-center overflow-hidden select-none group hidden lg:flex [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]',
          animationClass: 'animate-marquee-bottom-to-top'
        };
      case 'right':
        return {
          wrapper: 'fixed top-0 right-0 h-full w-10 z-40 border-l border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md flex justify-center items-center overflow-hidden select-none group hidden lg:flex [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]',
          animationClass: 'animate-marquee-top-to-bottom'
        };
      case 'below-hero':
      default:
        return {
          wrapper: 'w-full border-y border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm py-2.5 overflow-hidden select-none group transition-colors hover:border-zinc-700/80 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]',
          animationClass: 'animate-marquee-right-to-left'
        };
    }
  };

  const { wrapper, animationClass } = getPositionConfig();

  return (
    <aside
      className={`${wrapper} ${className}`}
      style={{ '--marquee-speed': `${speed}s` } as React.CSSProperties}
    >
      <div className={animationClass}>
        {renderContentItem()}
        {renderContentItem()}
        {renderContentItem()}
        {renderContentItem()}
      </div>
    </aside>
  );
};
