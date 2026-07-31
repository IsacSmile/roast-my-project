# 🔥 Roast My Project

> Your AI code reviewer with a sense of humor.

**Roast My Project** is a modern, high-performance web application designed to analyze your codebases (via GitHub repository URLs or uploaded project `.zip` archives) and deliver hilarious, brutally honest roasts alongside visual health scores, critical issue warnings, and actionable recommendation checklists.

---

## ✨ Features

- **🔥 Brutally Honest AI Roasts**: Funny, witty roasts generated for target codebases.
- **📊 Visual Health Score Gauge**: Color-coded 0–100 project health meter with status badges (*Needs Salvation*, *Dumpster Fire*, *Solid Codebase*).
- **⚠️ Critical Issues List**: Categorized list of code smells, security risks, missing configs, and debug logs.
- **✅ Actionable Recommendations**: Concrete improvement plans to upgrade your codebase.
- **🔄 Dual Input Mode**: Analyze public GitHub repository URLs or drop project `.zip` archives (UI simulated analysis).
- **⚡ Preset Shortcut Buttons**: 1-click test presets (*Legacy Spaghetti Monolith*, *Overengineered Todo App*, *3 AM Hackathon Build*).
- **🎨 Glassmorphism & Linear/Vercel Aesthetics**: Ultra-clean dark theme built with Tailwind CSS.
- **🔄 4-Directional MarqueeBar System**: Reusable marquee component supporting `top`, `bottom`, `left`, `right`, and `below-hero` positions with edge fade masks.

---

## 🛠️ Tech Stack

- **Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Lucide Icons, Custom Keyframe Animations
- **Architecture**: Modular component structure with separated data layer (`src/data/mockAnalysis.ts`) and service layer (`src/services/projectService.ts`)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/IsacSmile/roast-my-project.git
cd roast-my-project
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 🔌 Real LLM Integration Guide

To connect **Roast My Project** to a live LLM API (OpenAI GPT-4o, Google Gemini, or Claude), refer to our detailed step-by-step guide in [API_INTEGRATION.md](./API_INTEGRATION.md).

---

## 📄 Credits & Author

- **Idea**: ChatGPT
- **Built by**: Antigravity
- **Final Touch & Author**: **FAIZ IMAM** ([@IsacSmile](https://github.com/IsacSmile))
