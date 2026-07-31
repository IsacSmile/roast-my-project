import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MarqueeBar } from './components/MarqueeBar';
import { UploadCard } from './components/UploadCard';
import { LoadingState } from './components/LoadingState';
import { ResultsSection } from './components/ResultsSection';
import { Footer } from './components/Footer';
import { analyzeProject } from './services/projectService';
import type { AnalysisResult, AnalyzeParams } from './types';
import { AlertCircle } from 'lucide-react';

export function App() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'results' | 'error'>('idle');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAnalyze = async (params: AnalyzeParams) => {
    setStatus('loading');
    setErrorMsg(null);
    try {
      const result = await analyzeProject(params);
      setAnalysisResult(result);
      setStatus('results');
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to analyze project. Please try again.');
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setAnalysisResult(null);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-orange-500 selection:text-white flex flex-col antialiased">
      {/* Top Navbar */}
      <Header onHomeClick={handleReset} />

      {/* Hero & Marquee section */}
      {status !== 'results' && (
        <>
          <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <Hero />
          </div>
          <MarqueeBar position="below-hero" />
        </>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* State 1: IDLE */}
        {status === 'idle' && (
          <UploadCard onAnalyze={handleAnalyze} />
        )}

        {/* State 2: LOADING */}
        {status === 'loading' && (
          <LoadingState />
        )}

        {/* State 3: RESULTS */}
        {status === 'results' && analysisResult && (
          <ResultsSection result={analysisResult} onReset={handleReset} />
        )}

        {/* State 4: ERROR */}
        {status === 'error' && (
          <div className="max-w-md mx-auto my-12 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-center space-y-4">
            <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">Analysis Error</h3>
            <p className="text-xs text-zinc-400 font-mono">{errorMsg}</p>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition"
            >
              Try Again
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
