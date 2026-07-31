import React, { useState, useRef } from 'react';
import { FolderGit2, Upload, Flame, FolderArchive, ArrowRight, CheckCircle, AlertCircle, Sparkles, Radiation } from 'lucide-react';
import type { AnalyzeParams, SamplePreset, RoastIntensity } from '../types';
import { SAMPLE_PRESETS } from '../data/mockAnalysis';

interface UploadCardProps {
  onAnalyze: (params: AnalyzeParams) => void;
  disabled?: boolean;
}

export const UploadCard: React.FC<UploadCardProps> = ({ onAnalyze, disabled = false }) => {
  const [activeTab, setActiveTab] = useState<'url' | 'zip'>('url');
  const [githubUrl, setGithubUrl] = useState('');
  const [intensity, setIntensity] = useState<RoastIntensity>('brutal');
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.zip')) {
        setErrorMsg('Please select a valid .zip archive');
        return;
      }
      setErrorMsg(null);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      setSelectedFile({
        name: file.name,
        size: `${sizeMb} MB`
      });
    }
  };

  const handleSelectPreset = (preset: SamplePreset) => {
    setActiveTab('url');
    setGithubUrl(preset.url);
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (activeTab === 'url') {
      if (!githubUrl.trim()) {
        setErrorMsg('Please enter a GitHub repository URL or choose a preset below.');
        return;
      }
      if (!githubUrl.includes('github.com')) {
        setErrorMsg('Please provide a valid github.com repository URL.');
        return;
      }
      onAnalyze({
        type: 'url',
        value: githubUrl.trim(),
        intensity
      });
    } else {
      if (!selectedFile) {
        setErrorMsg('Please upload a ZIP file to analyze.');
        return;
      }
      onAnalyze({
        type: 'zip',
        value: selectedFile.name,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        intensity
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-6">
      <div className="relative bg-zinc-900/90 rounded-2xl border border-zinc-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-all duration-300">
        
        {/* Glow corner element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Tab Switchers */}
        <div className="flex items-center space-x-2 p-1.5 bg-zinc-950/80 rounded-xl border border-zinc-800/80 mb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab('url');
              setErrorMsg(null);
            }}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'url'
                ? 'bg-zinc-800 text-white shadow-md border border-zinc-700/50'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
          >
            <FolderGit2 className="w-4 h-4 text-orange-400" />
            <span>GitHub Repository</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('zip');
              setErrorMsg(null);
            }}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'zip'
                ? 'bg-zinc-800 text-white shadow-md border border-zinc-700/50'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
          >
            <FolderArchive className="w-4 h-4 text-amber-400" />
            <span>Upload ZIP (UI Only)</span>
          </button>
        </div>

        {/* Form Controls */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {activeTab === 'url' ? (
            <div className="space-y-3">
              <label htmlFor="github-url-input" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                GitHub Repository URL
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 pointer-events-none text-zinc-500">
                  <FolderGit2 className="w-5 h-5 text-orange-400" />
                </div>
                <input
                  id="github-url-input"
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username/repository-name"
                  className="w-full pl-12 pr-4 py-3.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/80 transition-all font-mono"
                  disabled={disabled}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                Select Project ZIP Archive
              </label>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".zip"
                className="hidden"
                disabled={disabled}
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center space-y-3 ${
                  selectedFile
                    ? 'border-orange-500/60 bg-orange-500/5'
                    : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950/60 hover:bg-zinc-950'
                }`}
              >
                {selectedFile ? (
                  <>
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-mono text-zinc-200 font-semibold">
                      {selectedFile.name}
                    </div>
                    <div className="text-xs text-zinc-500">
                      Size: {selectedFile.size} • Ready for analysis
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Upload className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="text-sm font-medium text-zinc-300">
                      Click to choose or drag & drop project .zip archive
                    </div>
                    <div className="text-xs text-zinc-500">
                      (UI demonstration only — no files leave your browser)
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Roast Intensity Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center justify-between">
              <span>Roast Intensity Level</span>
              <span className="text-[10px] text-orange-400">Choose severity</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setIntensity('mild')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                  intensity === 'mild'
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-md'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mild 🌶️</span>
              </button>

              <button
                type="button"
                onClick={() => setIntensity('brutal')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                  intensity === 'brutal'
                    ? 'bg-orange-500/15 border-orange-500/60 text-orange-400 shadow-md'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>Brutal 🔥</span>
              </button>

              <button
                type="button"
                onClick={() => setIntensity('nuclear')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                  intensity === 'nuclear'
                    ? 'bg-red-500/20 border-red-500/60 text-red-400 shadow-md'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950'
                }`}
              >
                <Radiation className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                <span>Nuclear ☢️</span>
              </button>
            </div>
          </div>

          {/* Error message alert */}
          {errorMsg && (
            <div className="flex items-center space-x-2 text-red-400 text-xs font-mono bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Sample Preset Shortcut Buttons */}
          <div className="pt-2">
            <div className="text-xs font-mono text-zinc-500 mb-2">Or try an example repository:</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {SAMPLE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className="text-left p-2.5 rounded-lg bg-zinc-950/60 hover:bg-zinc-950 border border-zinc-800/80 hover:border-orange-500/50 group transition-all"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-300 group-hover:text-orange-400">
                    <span>{preset.name}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[10px] text-zinc-500 truncate mt-0.5">{preset.tag}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={disabled}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-base shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 active:scale-[0.99] transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Flame className="w-5 h-5" />
            <span>Analyze Project 🔥</span>
          </button>
        </form>

      </div>
    </div>
  );
};
