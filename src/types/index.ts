export type IssueSeverity = 'critical' | 'warning' | 'info';

export interface ProjectIssue {
  id: string;
  category: string;
  severity: IssueSeverity;
  title: string;
  description: string;
}

export interface ProjectSuggestion {
  id: string;
  category: string;
  title: string;
  description: string;
}

export interface AnalysisResult {
  score: number;
  scoreLabel: string;
  roast: string;
  projectSummary: {
    projectName: string;
    detectedTech: string[];
    fileCountEstimate: number;
    linesOfCodeEstimate: string;
  };
  issues: string[] | ProjectIssue[];
  suggestions: string[] | ProjectSuggestion[];
}

export interface AnalyzeParams {
  type: 'url' | 'zip';
  value: string;
  fileName?: string;
  fileSize?: string;
}

export interface SamplePreset {
  id: string;
  name: string;
  tag: string;
  url: string;
  description: string;
}
