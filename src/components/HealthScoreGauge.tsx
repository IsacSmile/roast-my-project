import React from 'react';
import { Activity, Flame, ShieldAlert, Award } from 'lucide-react';

interface HealthScoreGaugeProps {
  score: number;
  label?: string;
}

export const HealthScoreGauge: React.FC<HealthScoreGaugeProps> = ({ score, label }) => {
  // Determine color theme based on score
  let strokeColor = '#ef4444'; // Red
  let badgeBg = 'bg-red-500/10 border-red-500/30 text-red-400';
  let ratingLabel = label || 'Dumpster Fire 🔥';

  if (score >= 80) {
    strokeColor = '#10b981'; // Green
    badgeBg = 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
    if (!label) ratingLabel = 'Solid Codebase 🏆';
  } else if (score >= 50) {
    strokeColor = '#f59e0b'; // Amber
    badgeBg = 'bg-amber-500/10 border-amber-500/30 text-amber-400';
    if (!label) ratingLabel = 'Needs Salvation ⚠️';
  }

  // Radial SVG math
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col items-center justify-center text-center space-y-4">
      
      {/* Header Label */}
      <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-zinc-400">
        <Activity className="w-4 h-4 text-orange-400" />
        <span>Project Health Score</span>
      </div>

      {/* Radial Gauge */}
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          {/* Background Ring */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#27272a"
            strokeWidth="10"
            fill="transparent"
          />
          {/* Animated Value Ring */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke={strokeColor}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Score Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
            {score}
          </span>
          <span className="text-[10px] text-zinc-400 font-mono">/ 100</span>
        </div>
      </div>

      {/* Status Badge */}
      <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${badgeBg}`}>
        {score >= 80 ? (
          <Award className="w-3.5 h-3.5" />
        ) : score >= 50 ? (
          <Flame className="w-3.5 h-3.5" />
        ) : (
          <ShieldAlert className="w-3.5 h-3.5" />
        )}
        <span>{ratingLabel}</span>
      </div>

    </div>
  );
};
