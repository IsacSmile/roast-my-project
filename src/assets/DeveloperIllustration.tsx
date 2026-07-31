import React from 'react';

interface IllustrationProps {
  className?: string;
}

export const DeveloperIllustration: React.FC<IllustrationProps> = ({ className = "w-full max-w-lg h-auto" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background glow circle */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/20 via-red-500/10 to-amber-500/20 rounded-full blur-3xl -z-10 animate-pulse" />

      <svg
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-2xl select-none"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="bgGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>
          <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>
          <linearGradient id="characterSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="deskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#27272a" />
            <stop offset="50%" stopColor="#3f3f46" />
            <stop offset="100%" stopColor="#27272a" />
          </linearGradient>
        </defs>

        {/* Ambient grid lines in SVG background */}
        <g opacity="0.15" stroke="#3f3f46" strokeWidth="1">
          <line x1="100" y1="100" x2="700" y2="100" strokeDasharray="6 6" />
          <line x1="100" y1="200" x2="700" y2="200" strokeDasharray="6 6" />
          <line x1="100" y1="300" x2="700" y2="300" strokeDasharray="6 6" />
          <line x1="100" y1="400" x2="700" y2="400" strokeDasharray="6 6" />
          <line x1="200" y1="50" x2="200" y2="450" strokeDasharray="6 6" />
          <line x1="400" y1="50" x2="400" y2="450" strokeDasharray="6 6" />
          <line x1="600" y1="50" x2="600" y2="450" strokeDasharray="6 6" />
        </g>

        {/* Desk Surface */}
        <rect x="120" y="440" width="560" height="16" rx="8" fill="url(#deskGrad)" stroke="#52525b" strokeWidth="1.5" />
        <rect x="160" y="456" width="30" height="110" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
        <rect x="610" y="456" width="30" height="110" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />

        {/* Coffee Mug with Flame Logo */}
        <rect x="170" y="390" width="36" height="50" rx="6" fill="#27272a" stroke="#f97316" strokeWidth="2" />
        <path d="M206 402 C216 402 216 428 206 428" stroke="#f97316" strokeWidth="3" fill="none" />
        {/* Steam */}
        <path d="M182 380 Q180 370 185 360" stroke="#f97316" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
        <path d="M192 382 Q190 372 195 362" stroke="#f97316" strokeWidth="2" opacity="0.4" strokeLinecap="round" />

        {/* Monitor Base & Stand */}
        <ellipse cx="400" cy="435" rx="70" ry="10" fill="#18181b" stroke="#52525b" strokeWidth="2" />
        <rect x="388" y="360" width="24" height="75" fill="#27272a" stroke="#3f3f46" strokeWidth="1.5" />

        {/* Main Monitor Screen */}
        <rect x="220" y="140" width="360" height="230" rx="16" fill="url(#screenGrad)" stroke="#f97316" strokeWidth="3" />
        <rect x="232" y="152" width="336" height="206" rx="10" fill="#09090b" stroke="#27272a" strokeWidth="1" />

        {/* Window controls bar */}
        <circle cx="250" cy="168" r="5" fill="#ef4444" />
        <circle cx="266" cy="168" r="5" fill="#f59e0b" />
        <circle cx="282" cy="168" r="5" fill="#10b981" />
        <text x="305" y="172" fill="#71717a" fontSize="12" fontFamily="monospace">App.tsx — 🔥 Code on Fire</text>

        {/* Code editor mockup lines */}
        <rect x="250" y="195" width="140" height="8" rx="4" fill="#f97316" opacity="0.9" />
        <rect x="400" y="195" width="90" height="8" rx="4" fill="#ef4444" opacity="0.7" />
        <rect x="250" y="215" width="220" height="8" rx="4" fill="#3f3f46" />
        <rect x="250" y="235" width="80" height="8" rx="4" fill="#10b981" opacity="0.8" />
        <rect x="340" y="235" width="120" height="8" rx="4" fill="#3f3f46" />

        {/* Burning flame inside screen */}
        <g transform="translate(470, 245)">
          <path
            d="M 20 50 C 5 40 0 25 10 10 C 15 25 25 25 25 15 C 35 25 35 40 20 50 Z"
            fill="url(#flameGrad)"
            className="animate-pulse"
          />
        </g>

        {/* Console output error warning in editor */}
        <rect x="250" y="260" width="290" height="80" rx="8" fill="#18181b" stroke="#ef4444" strokeWidth="1.5" />
        <text x="265" y="282" fill="#ef4444" fontSize="11" fontFamily="monospace" fontWeight="bold">⚠️ 15 console.log("debug") found</text>
        <text x="265" y="300" fill="#f97316" fontSize="11" fontFamily="monospace">🔥 Score: 78/100 (Needs Help)</text>
        <text x="265" y="322" fill="#a1a1aa" fontSize="11" fontFamily="monospace">"3 final files... non of them final."</text>

        {/* Developer Character Silhouette sitting in chair */}
        {/* Chair Backrest */}
        <rect x="575" y="260" width="30" height="150" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
        {/* Developer Head */}
        <circle cx="530" cy="300" r="32" fill="#27272a" stroke="#f97316" strokeWidth="2" />
        {/* Headphones */}
        <path d="M500 295 A 32 32 0 0 1 560 295" stroke="#f97316" strokeWidth="4" fill="none" />
        <rect x="495" y="290" width="10" height="20" rx="4" fill="#ef4444" />
        <rect x="555" y="290" width="10" height="20" rx="4" fill="#ef4444" />

        {/* Developer Body / Hoodie */}
        <path d="M480 380 C480 340 500 330 530 330 C560 330 580 340 580 380 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
        {/* Hands on keyboard */}
        <ellipse cx="440" cy="410" rx="20" ry="8" fill="#3f3f46" />

        {/* Keyboard on desk */}
        <rect x="330" y="422" width="140" height="12" rx="4" fill="#18181b" stroke="#52525b" strokeWidth="1" />
        {/* Mouse */}
        <ellipse cx="495" cy="428" rx="8" ry="12" fill="#27272a" stroke="#52525b" strokeWidth="1" />

        {/* Floating AI Roast Badges with animation feel */}
        <g transform="translate(100, 110)">
          <rect x="0" y="0" width="150" height="42" rx="21" fill="#18181b" stroke="#f97316" strokeWidth="1.5" />
          <text x="20" y="26" fill="#f97316" fontSize="13" fontWeight="bold" fontFamily="sans-serif">🔥 AI Roast Active</text>
        </g>

        <g transform="translate(560, 90)">
          <rect x="0" y="0" width="140" height="40" rx="20" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
          <text x="18" y="25" fill="#10b981" fontSize="13" fontWeight="bold" fontFamily="sans-serif">⚡ Ready to Audit</text>
        </g>
      </svg>
    </div>
  );
};
