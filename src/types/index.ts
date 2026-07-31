export type IssueSeverity = 'critical' | 'warning' | 'info';
export type RoastIntensity = 'mild' | 'brutal' | 'nuclear';

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

export interface CodeSnippet {
  fileName: string;
  language: string;
  code: string;
  roastComment: string;
}

export interface AnalysisResult {
  score: number;
  scoreLabel: string;
  roast: string;
  alternativeRoasts?: string[];
  intensity?: RoastIntensity;
  developerAdvice?: string;
  projectSummary: {
    projectName: string;
    detectedTech: string[];
    fileCountEstimate: number;
    linesOfCodeEstimate: string;
    starsCount?: number;
    openIssuesCount?: number;
  };
  issues: string[] | ProjectIssue[];
  suggestions: string[] | ProjectSuggestion[];
  snippets?: CodeSnippet[];
}

export interface AnalyzeParams {
  type: 'url' | 'zip';
  value: string;
  fileName?: string;
  fileSize?: string;
  intensity?: RoastIntensity;
}

export interface SamplePreset {
  id: string;
  name: string;
  tag: string;
  url: string;
  description: string;
}
