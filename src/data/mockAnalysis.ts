import type { AnalysisResult, SamplePreset } from '../types';

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'spaghetti-monolith',
    name: 'Legacy Spaghetti Monolith',
    tag: 'Extreme Chaos',
    url: 'https://github.com/developer/my-epic-startup-v3-final',
    description: '3,000 line index.js, inline CSS, zero tests, 14 console.logs per second.'
  },
  {
    id: 'overengineered-todo',
    name: 'Overengineered Todo App',
    tag: 'Enterprise Architecture',
    url: 'https://github.com/architect/enterprise-todo-clean-arch',
    description: '45 micro-abstractions, Redux, RxJS & custom dependency injection for a checkbox list.'
  },
  {
    id: 'weekend-hackathon',
    name: '3 AM Hackathon Build',
    tag: 'Held by Tape',
    url: 'https://github.com/hackathon-warrior/ai-crypto-web3-roast',
    description: 'Hardcoded API keys, commit message: "asdfghjkl", 94% dead code.'
  }
];

export const DEFAULT_MOCK_RESPONSE: AnalysisResult = {
  score: 78,
  scoreLabel: 'Needs Salvation',
  roast: "Your project has three 'final' files. Apparently none of them were final.",
  projectSummary: {
    projectName: 'my-awesome-project',
    detectedTech: ['React', 'TypeScript', 'Node.js', 'CSS Modules'],
    fileCountEstimate: 42,
    linesOfCodeEstimate: '~4,800 lines'
  },
  issues: [
    'README is incomplete',
    'No .gitignore',
    '15 console.log statements'
  ],
  suggestions: [
    'Improve the README',
    'Add a .gitignore',
    'Remove debug logs'
  ]
};

export const MOCK_RESPONSES_BY_PRESET: Record<string, AnalysisResult> = {
  'spaghetti-monolith': {
    score: 42,
    scoreLabel: 'Dumpster Fire 🔥',
    roast: "Your main component is longer than the Terms of Service nobody reads. You have a 3,000-line `App.tsx` where state updates trigger global mass recalculations.",
    projectSummary: {
      projectName: 'my-epic-startup-v3-final',
      detectedTech: ['JavaScript', 'jQuery', 'Inline CSS', 'HTML5'],
      fileCountEstimate: 18,
      linesOfCodeEstimate: '~12,400 lines'
    },
    issues: [
      'App.tsx is over 3,000 lines long with zero component separation',
      'Hardcoded API credentials committed in line 142',
      'No .gitignore file (node_modules committed to git repository!)',
      '74 `console.log("here 123")` statements scattered across files',
      'Zero test coverage or unit test setups'
    ],
    suggestions: [
      'Extract mega-components into modular sub-components',
      'Move secret API keys immediately into .env environment files',
      'Add a robust .gitignore file to strip node_modules from repository',
      'Purge all debug console.logs using an ESLint rule or automated build plugin',
      'Set up Vitest or Jest for critical business logic testing'
    ]
  },
  'overengineered-todo': {
    score: 64,
    scoreLabel: 'Architectural Overkill 🏗️',
    roast: "You built a NASA launch control system just to toggle a checkbox on a Todo list. You have 14 layers of abstraction for a feature that takes 5 lines of React state.",
    projectSummary: {
      projectName: 'enterprise-todo-clean-arch',
      detectedTech: ['TypeScript', 'React', 'Redux Toolkit', 'RxJS', 'GraphQL'],
      fileCountEstimate: 142,
      linesOfCodeEstimate: '~8,900 lines'
    },
    issues: [
      '45 interfaces created for a simple 3-item list data structure',
      'Overused `any` type overrides in clean architecture adapter layer',
      'Bundle size exceeds 4.2MB for a static todo app demo',
      'Excessive boilerplate making simple additions take 6 file modifications',
      'Complex RxJS observables created where simple React state would suffice'
    ],
    suggestions: [
      'Simplify dependency injection and delete redundant interface definitions',
      'Replace global state store with React useState or Zustand for local state',
      'Optimize bundle size by tree-shaking unused enterprise dependencies',
      'Refactor deep nested folder trees (domain/usecases/adapters/presenters)',
      'Document architectural decisions so newcomers don’t get lost'
    ]
  },
  'weekend-hackathon': {
    score: 51,
    scoreLabel: 'Held By Duct Tape 🩹',
    roast: "This codebase looks like it was written at 3:45 AM during a caffeinated panic. Your latest commit message is literally 'please work I want to sleep'.",
    projectSummary: {
      projectName: 'ai-crypto-web3-roast',
      detectedTech: ['Next.js', 'Tailwind CSS', 'OpenAI SDK', 'TypeScript'],
      fileCountEstimate: 29,
      linesOfCodeEstimate: '~3,100 lines'
    },
    issues: [
      'README still contains default create-next-app boilerplate template',
      'Multiple catch blocks with empty error handlers swallowing failures silently',
      'Unused dependencies like lodash and moment.js adding unnecessary bloat',
      'Missing TypeScript types (over 80 implicit `any` warnings on build)',
      'Inconsistent formatting mixing tabs and 4 spaces across files'
    ],
    suggestions: [
      'Write a proper README with project features, setup guide, and screenshots',
      'Add robust error handling and user feedback toasts instead of silent catches',
      'Run `depcheck` or `npm prune` to purge unused dependencies',
      'Strictly enable TypeScript `noImplicitAny` compiler flag',
      'Format codebase uniformly using Prettier and ESLint'
    ]
  }
};
