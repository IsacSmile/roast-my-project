import React from 'react';
import { AlertTriangle } from 'lucide-react';
import type { ProjectIssue } from '../types';

interface IssueItemProps {
  issue: string | ProjectIssue;
  index: number;
}

export const IssueItem: React.FC<IssueItemProps> = ({ issue, index }) => {
  const isObject = typeof issue !== 'string';
  const title = isObject ? (issue as ProjectIssue).title : issue;
  const description = isObject ? (issue as ProjectIssue).description : undefined;
  const category = isObject ? (issue as ProjectIssue).category : undefined;

  return (
    <div className="flex items-start space-x-3.5 p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-red-500/40 transition-all duration-200 group">
      <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
        <AlertTriangle className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
            {title}
          </span>
          {category && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
              {category}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-zinc-400 leading-relaxed font-normal">
            {description}
          </p>
        )}
      </div>

      <span className="text-xs font-mono text-zinc-600 select-none">
        #{index + 1}
      </span>
    </div>
  );
};
