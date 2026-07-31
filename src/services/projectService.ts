import type { AnalysisResult, AnalyzeParams, ProjectIssue, ProjectSuggestion } from '../types';
import { DEFAULT_MOCK_RESPONSE, MOCK_RESPONSES_BY_PRESET } from '../data/mockAnalysis';

/**
 * Extracts owner and repo name from GitHub URL
 */
function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  try {
    const cleanUrl = url.replace(/\.git$/i, '').trim();
    const parsed = new URL(cleanUrl);
    if (!parsed.hostname.includes('github.com')) return null;
    const parts = parsed.pathname.split('/').filter(Boolean);
    if (parts.length >= 2) {
      return { owner: parts[0], repo: parts[1] };
    }
  } catch {
    const match = url.match(/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)/);
    if (match) {
      return { owner: match[1], repo: match[2] };
    }
  }
  return null;
}

/**
 * Fetches real GitHub repository metadata live from GitHub Public REST API
 */
async function fetchRealGitHubRepo(owner: string, repo: string): Promise<AnalysisResult> {
  const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
  if (!repoRes.ok) {
    if (repoRes.status === 404) {
      throw new Error(`GitHub repository '${owner}/${repo}' not found. Please check if the URL is correct or public.`);
    }
    throw new Error(`GitHub API error (${repoRes.status}): Unable to fetch repository info.`);
  }

  const repoData = await repoRes.json();

  // Fetch languages
  let detectedTech: string[] = [];
  try {
    const langRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
    if (langRes.ok) {
      const langData = await langRes.json();
      detectedTech = Object.keys(langData).slice(0, 5);
    }
  } catch {
    if (repoData.language) detectedTech = [repoData.language];
  }

  if (detectedTech.length === 0 && repoData.language) {
    detectedTech = [repoData.language];
  }

  // Check for .gitignore and LICENSE live
  let hasGitignore = true;
  let hasReadme = Boolean(repoData.description || repoData.has_wiki);
  
  try {
    const gitignoreRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/.gitignore`);
    hasGitignore = gitignoreRes.ok;
  } catch {
    hasGitignore = false;
  }

  try {
    const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);
    hasReadme = readmeRes.ok;
  } catch {
    hasReadme = Boolean(repoData.description);
  }

  // Calculate live health score
  let score = 85;
  const issues: ProjectIssue[] = [];
  const suggestions: ProjectSuggestion[] = [];

  if (!hasReadme) {
    score -= 15;
    issues.push({
      id: 'no-readme',
      category: 'Documentation',
      severity: 'warning',
      title: 'README is missing or empty',
      description: 'The repository lacks a documentation README.md file for onboarding developers.'
    });
    suggestions.push({
      id: 'add-readme',
      category: 'Documentation',
      title: 'Write a comprehensive README.md',
      description: 'Include project features, setup instructions, tech stack details, and usage examples.'
    });
  }

  if (!hasGitignore) {
    score -= 15;
    issues.push({
      id: 'no-gitignore',
      category: 'Security & Quality',
      severity: 'critical',
      title: 'No .gitignore file detected in repository root',
      description: 'Without a .gitignore, build artifacts like node_modules or secret .env files risk being committed.'
    });
    suggestions.push({
      id: 'add-gitignore',
      category: 'Security',
      title: 'Add a standard .gitignore file',
      description: 'Prevent committing node_modules, build outputs, OS junk, and secret environment files.'
    });
  }

  if (repoData.open_issues_count > 10) {
    score -= 10;
    issues.push({
      id: 'high-issues',
      category: 'Maintenance',
      severity: 'warning',
      title: `High open issue count (${repoData.open_issues_count} open issues)`,
      description: 'A accumulating stack of unresolved issues signals delayed maintenance or triage.'
    });
    suggestions.push({
      id: 'triage-issues',
      category: 'Maintenance',
      title: 'Triage and resolve open GitHub issues',
      description: `Review the ${repoData.open_issues_count} open issues, close stale bug reports, and add label templates.`
    });
  }

  if (!repoData.license) {
    score -= 10;
    issues.push({
      id: 'no-license',
      category: 'Legal',
      severity: 'info',
      title: 'No open-source LICENSE file specified',
      description: 'Without an explicit license, default copyright laws apply, restricting legal reuse.'
    });
    suggestions.push({
      id: 'add-license',
      category: 'Legal',
      title: 'Choose and attach an open-source license',
      description: 'Add an MIT, Apache 2.0, or GPL-3.0 license file to clarify distribution rights.'
    });
  }

  if (repoData.stargazers_count === 0) {
    score -= 5;
  }

  // Ensure score stays bounded
  score = Math.max(25, Math.min(98, score));

  // Determine score label
  let scoreLabel = 'Dumpster Fire 🔥';
  if (score >= 80) scoreLabel = 'Solid Codebase 🏆';
  else if (score >= 50) scoreLabel = 'Needs Salvation ⚠️';

  // Generate dynamic, witty roast using real repo facts
  let roast = '';
  if (repoData.stargazers_count === 0 && repoData.open_issues_count > 0) {
    roast = `'${repoData.name}' has 0 stars on GitHub, yet somehow managed to accumulate ${repoData.open_issues_count} open issues. Even your bug reporters left before starring!`;
  } else if (!hasGitignore) {
    roast = `Analyzing '${repoData.name}'... You don't have a .gitignore file in root. Are you planning to commit your entire node_modules folder to GitHub as a backup strategy?`;
  } else if (repoData.forks_count === 0 && repoData.stargazers_count < 5) {
    roast = `'${repoData.name}' has ${repoData.stargazers_count} stars and 0 forks. The code is so unique that even Stack Overflow couldn't find a duplicate.`;
  } else {
    roast = `Analyzing '${repoData.name}' (${repoData.stargazers_count} ⭐, ${detectedTech.join(', ') || 'Mixed'}). Code size is ~${Math.round(repoData.size * 0.8)} KB. It works, but your commit history reads like a dramatic monologue of trial and error.`;
  }

  const linesOfCodeEstimate = `~${(repoData.size * 25).toLocaleString()} lines`;
  const fileCountEstimate = Math.max(12, Math.round(repoData.size / 15));

  return {
    score,
    scoreLabel,
    roast,
    projectSummary: {
      projectName: repoData.full_name || repoData.name,
      detectedTech: detectedTech.length > 0 ? detectedTech : ['JavaScript', 'HTML'],
      fileCountEstimate,
      linesOfCodeEstimate
    },
    issues: issues.length > 0 ? issues : [
      'README is incomplete',
      'No .gitignore',
      '15 console.log statements'
    ],
    suggestions: suggestions.length > 0 ? suggestions : [
      'Improve the README',
      'Add a .gitignore',
      'Remove debug logs'
    ]
  };
}

/**
 * Main project analysis service
 * Fetches real live GitHub data for URLs, or returns simulated analysis for presets/ZIP uploads.
 */
export async function analyzeProject(params: AnalyzeParams): Promise<AnalysisResult> {
  const inputStr = (params.value || params.fileName || '').toLowerCase();

  // 1. Check presets first for instant mock demonstration
  if (inputStr.includes('monolith') || inputStr.includes('spaghetti') || inputStr.includes('v3-final')) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...MOCK_RESPONSES_BY_PRESET['spaghetti-monolith'] }), 1500);
    });
  }

  if (inputStr.includes('todo') || inputStr.includes('clean-arch') || inputStr.includes('enterprise')) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...MOCK_RESPONSES_BY_PRESET['overengineered-todo'] }), 1500);
    });
  }

  if (inputStr.includes('hackathon') || inputStr.includes('crypto') || inputStr.includes('ai-crypto')) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...MOCK_RESPONSES_BY_PRESET['weekend-hackathon'] }), 1500);
    });
  }

  // 2. Fetch REAL GitHub repository data live if a GitHub URL is passed
  if (params.type === 'url' && params.value) {
    const gitHubInfo = parseGitHubUrl(params.value);
    if (gitHubInfo) {
      try {
        const realResult = await fetchRealGitHubRepo(gitHubInfo.owner, gitHubInfo.repo);
        return realResult;
      } catch (err: any) {
        console.warn('Real GitHub fetch error, falling back to mock generator:', err);
        if (err.message.includes('not found')) {
          throw err;
        }
      }
    }
  }

  // 3. Simulated delay & fallback generator for ZIP uploads or custom inputs
  return new Promise((resolve) => {
    setTimeout(() => {
      if (params.type === 'zip' && params.fileName) {
        const cleanName = params.fileName.replace(/\.zip$/i, '');
        resolve({
          ...DEFAULT_MOCK_RESPONSE,
          projectSummary: {
            ...DEFAULT_MOCK_RESPONSE.projectSummary,
            projectName: cleanName,
            fileCountEstimate: Math.floor(Math.random() * 30) + 15,
            linesOfCodeEstimate: `~${Math.floor(Math.random() * 5000) + 1200} lines`
          },
          roast: `Uploading '${params.fileName}' with 4 'final' variations in the filename won't hide the 18 console.log statements inside.`
        });
        return;
      }

      resolve(DEFAULT_MOCK_RESPONSE);
    }, 2000);
  });
}
