import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, Sparkles, Terminal } from 'lucide-react';
import { CODEBASE_SNIPPETS, CodeFile } from '../data/codebaseSnippets';
import { atelierSound } from '../utils/soundEffects';

export const CodebaseExplorer: React.FC = () => {
  const [activeFile, setActiveFile] = useState<CodeFile>(CODEBASE_SNIPPETS[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    atelierSound.playClick(1100);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    atelierSound.playClick(1200);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-8">
      {/* Codebase Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] uppercase font-mono tracking-[0.25em] text-red-400 bg-red-950/40 border border-red-500/20 inline-block mb-3">
          COMPLETE PRODUCTION SOURCE CODE
        </span>
        <h1 className="font-serif-editorial text-4xl sm:text-6xl text-white font-normal tracking-tight">
          Vantare Atelier Codebase
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
          Production-ready, modular React + Tailwind + Motion source files and the full copy-paste MotionSites AI generation prompt.
        </p>
      </div>

      {/* Code Explorer Interface */}
      <div className="border border-white/10 rounded-3xl bg-[#09090b] overflow-hidden shadow-2xl flex flex-col">
        {/* Top File Bar */}
        <div className="px-4 py-3 bg-zinc-950 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
          {/* File Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {CODEBASE_SNIPPETS.map((file) => {
              const isActive = activeFile.name === file.name;
              return (
                <button
                  key={file.name}
                  onClick={() => {
                    setActiveFile(file);
                    atelierSound.playClick();
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 ${
                    isActive
                      ? 'bg-zinc-800 text-white font-semibold shadow-inner border border-white/15'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <FileCode className={`w-3.5 h-3.5 ${isActive ? 'text-red-400' : 'text-zinc-500'}`} />
                  <span>{file.name}</span>
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium tracking-wide transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs font-medium tracking-wide transition-all"
              title="Download File"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* File Description Bar */}
        <div className="px-6 py-2.5 bg-zinc-900/60 border-b border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>{activeFile.description}</span>
          <span className="text-[10px] uppercase text-zinc-500">
            {activeFile.language.toUpperCase()} · UTF-8
          </span>
        </div>

        {/* Code Content Area */}
        <div className="relative p-6 bg-[#050505] overflow-x-auto max-h-[600px] text-xs font-mono text-zinc-300 leading-relaxed">
          <pre className="whitespace-pre">
            <code>{activeFile.content}</code>
          </pre>
        </div>
      </div>

      {/* Integration Guide Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-6 rounded-2xl border border-white/10 bg-zinc-950/60">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center mb-3">
            <Terminal className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">1. Install Motion & Lucide</h3>
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            Standard Vite + Tailwind setup. Run <code className="text-zinc-200 bg-zinc-900 px-1 py-0.5 rounded">npm i motion lucide-react</code> to enable spring physics.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-zinc-950/60">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center mb-3">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">2. Zero-Asset Audio Engine</h3>
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            The sound engine is 100% synthesized through the browser Web Audio API, so there are no heavy MP3/WAV assets to load.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-zinc-950/60">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center mb-3">
            <FileCode className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">3. MotionSites AI Prompt</h3>
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            Copy the <code className="text-zinc-200 bg-zinc-900 px-1 py-0.5 rounded">MotionSitesPrompt.md</code> file directly into Claude, Cursor, Lovable, or Bolt.new.
          </p>
        </div>
      </div>
    </div>
  );
};
