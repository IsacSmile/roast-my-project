# 🔌 API Integration Guide — Roast My Project

This guide provides a complete step-by-step walkthrough for replacing the dummy service (`src/services/projectService.ts`) with a real LLM API (OpenAI GPT-4o, Google Gemini, or Anthropic Claude).

---

## 📋 Table of Contents
1. [Prerequisites & API Key Setup](#1-prerequisites--api-key-setup)
2. [Creating the `.env` File](#2-creating-the-env-file)
3. [Installing the OpenAI SDK (Optional)](#3-installing-the-openai-sdk-optional)
4. [Updating `src/services/projectService.ts`](#4-updating-srcservicesprojectservicets)
5. [Crafting the System Prompt & JSON Mode](#5-crafting-the-system-prompt--json-mode)
6. [Handling Errors, Loading & Edge Cases](#6-handling-errors-loading--edge-cases)
7. [Security & Production Recommendations](#7-security--production-recommendations)

---

## 1. Prerequisites & API Key Setup

To perform real AI code analysis, you need an API key from an LLM provider:
- **OpenAI**: Sign up at [platform.openai.com](https://platform.openai.com/) and create a secret key under API Keys.
- **Google Gemini**: Obtain a key from [Google AI Studio](https://aistudio.google.com/).

---

## 2. Creating the `.env` File

Create a file named `.env` in the root of the project (same directory as `package.json`):

```env
# .env
VITE_OPENAI_API_KEY=sk-proj-your-actual-api-key-here
```

> ⚠️ **Important Security Rule**: Add `.env` to your `.gitignore` file immediately to prevent committing your API key to public repositories.

---

## 3. Installing the OpenAI SDK (Optional)

You can call OpenAI via direct `fetch()` or install the official SDK:

```bash
npm install openai
```

---

## 4. Updating `src/services/projectService.ts`

Replace the contents of [`src/services/projectService.ts`](file:///c:/Users/affan/OneDrive/Desktop/roast-my-project/src/services/projectService.ts) with the following real API implementation:

```typescript
import { AnalysisResult, AnalyzeParams } from '../types';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function analyzeProject(params: AnalyzeParams): Promise<AnalysisResult> {
  if (!OPENAI_API_KEY) {
    throw new Error('Missing VITE_OPENAI_API_KEY. Please set it in your .env file.');
  }

  // 1. Prepare target project description
  const projectInput = params.type === 'url'
    ? `GitHub Repository: ${params.value}`
    : `Uploaded ZIP file: ${params.fileName || params.value}`;

  // 2. Define strict system prompt with required JSON schema
  const systemPrompt = `You are a hilarious, brutally honest AI code reviewer with a sharp sense of humor. 
Analyze the target project and generate a JSON response strictly matching this structure:

{
  "score": 78,
  "scoreLabel": "Needs Salvation",
  "roast": "Your project has three 'final' files. Apparently none of them were final.",
  "projectSummary": {
    "projectName": "string",
    "detectedTech": ["React", "TypeScript"],
    "fileCountEstimate": 42,
    "linesOfCodeEstimate": "~4,800 lines"
  },
  "issues": [
    "README is incomplete",
    "No .gitignore",
    "15 console.log statements"
  ],
  "suggestions": [
    "Improve the README",
    "Add a .gitignore",
    "Remove debug logs"
  ]
}

Ensure "score" is an integer between 0 and 100.
The roast should be funny, witty, and relate to typical software development flaws.`;

  try {
    // 3. Make HTTP Request to OpenAI Chat Completions API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Please review and roast this project: ${projectInput}` }
        ],
        temperature: 0.8
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API error (${response.status})`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('Empty response from AI engine.');
    }

    // 4. Parse JSON Response
    const parsedResult: AnalysisResult = JSON.parse(content);
    return parsedResult;

  } catch (error: any) {
    console.error('Project analysis failed:', error);
    throw new Error(error.message || 'Failed to complete project roast.');
  }
}
```

---

## 5. Crafting the System Prompt & JSON Mode

OpenAI supports **Structured Outputs / JSON Mode** (`response_format: { type: "json_object" }`). This guarantees the AI returns valid JSON matching the format required by the UI components:

```json
{
  "score": 78,
  "scoreLabel": "Needs Salvation",
  "roast": "Your project has three 'final' files. Apparently none of them were final.",
  "issues": [
    "README is incomplete",
    "No .gitignore",
    "15 console.log statements"
  ],
  "suggestions": [
    "Improve the README",
    "Add a .gitignore",
    "Remove debug logs"
  ]
}
```

---

## 6. Handling Errors, Loading & Edge Cases

The UI components in this application are pre-equipped to handle:
- **Loading State**: `App.tsx` displays the `<LoadingState />` scanner component while waiting for `analyzeProject()` to resolve.
- **Network Errors**: Network timeouts or API key issues throw standard JavaScript `Error` objects, which trigger the `<App />` component's error state UI with a retry button.
- **Parsing Fallback**: Safe JSON parsing (`JSON.parse()`) ensures malformed outputs trigger human-readable error messages.

---

## 7. Security & Production Recommendations

> 🔒 **Client-Side vs Backend Proxy**

In a production environment, you should **never** expose API keys directly in client-side Vite applications (`import.meta.env.VITE_...`). Anyone inspecting browser network requests can extract client-side keys.

### Recommended Architecture for Production:
1. **Serverless Edge Function**: Create a Vercel/Netlify serverless function (e.g. `/api/roast`).
2. **Server-Side API Key**: Keep `OPENAI_API_KEY` stored securely in server environment variables.
3. **Client Call**: Front-end calls `/api/roast` -> Serverless Function calls OpenAI -> Returns JSON to Front-end.
