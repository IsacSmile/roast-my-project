import type { AnalysisResult, AnalyzeParams } from '../types';
import { DEFAULT_MOCK_RESPONSE, MOCK_RESPONSES_BY_PRESET } from '../data/mockAnalysis';

/**
 * Simulates analyzing a project (GitHub repo or ZIP upload)
 * Returns mock analysis data after a 2-second (2000ms) delay using a Promise.
 */
export async function analyzeProject(params: AnalyzeParams): Promise<AnalysisResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Check if URL or filename matches any known preset or pattern
      const inputStr = (params.value || params.fileName || '').toLowerCase();

      if (inputStr.includes('monolith') || inputStr.includes('spaghetti') || inputStr.includes('v3-final')) {
        resolve({
          ...MOCK_RESPONSES_BY_PRESET['spaghetti-monolith']
        });
        return;
      }

      if (inputStr.includes('todo') || inputStr.includes('clean-arch') || inputStr.includes('enterprise')) {
        resolve({
          ...MOCK_RESPONSES_BY_PRESET['overengineered-todo']
        });
        return;
      }

      if (inputStr.includes('hackathon') || inputStr.includes('crypto') || inputStr.includes('ai-crypto')) {
        resolve({
          ...MOCK_RESPONSES_BY_PRESET['weekend-hackathon']
        });
        return;
      }

      // If custom ZIP file provided
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

      // If custom GitHub repository URL provided
      if (params.type === 'url' && params.value) {
        const repoParts = params.value.split('/').filter(Boolean);
        const repoName = repoParts[repoParts.length - 1] || 'custom-repository';
        resolve({
          ...DEFAULT_MOCK_RESPONSE,
          projectSummary: {
            ...DEFAULT_MOCK_RESPONSE.projectSummary,
            projectName: repoName,
            fileCountEstimate: 36,
            linesOfCodeEstimate: '~4,200 lines'
          },
          roast: `Analyzing '${repoName}'... Your commit history shows 12 commits titled 'fix bug' and 5 titled 'wip'. The code quality reflects that exact level of enthusiasm.`
        });
        return;
      }

      // Default standard mock response
      resolve(DEFAULT_MOCK_RESPONSE);
    }, 2000);
  });
}
