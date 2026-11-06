import React from 'react';
import { Volume2, VolumeX, Code2, Film, Sparkles } from 'lucide-react';
import { atelierSound } from '../utils/soundEffects';

interface AtelierHeaderProps {
  activeTab: 'experience' | 'breakdown' | 'codebase';
  onTabChange: (tab: 'experience' | 'breakdown' | 'codebase') => void;
  onOpenInquiry: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const AtelierHeader: React.FC<AtelierHeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenInquiry,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="relative z-40 w-full px-6 lg:px-12 py-5 border-b border-white/10 bg-black/80 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
      {/* Brand Monogram */}
      <div 
        onClick={() => {
          onTabChange('experience');
          atelierSound.playClick();
        }}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-8 h-8 rounded border border-white/20 bg-zinc-900/80 flex items-center justify-center transition-colors group-hover:border-red-500/60">
          <svg className="w-4 h-4 fill-white transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path d="M12 2L2 19h20L12 2zm0 6l5 9H7l5-9z" />
          </svg>
        </div>
        <div>
          <span className="font-display tracking-[0.35em] text-white font-bold text-sm block">
            VANTARE
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 block -mt-0.5">
            CAR ATELIER MOTION
          </span>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-zinc-900/90 rounded-full border border-white/10 text-xs">
        <button
          onClick={() => {
            onTabChange('experience');
            atelierSound.playClick();
          }}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-200 tracking-wider text-[11px] font-medium ${
            activeTab === 'experience'
              ? 'bg-white text-black shadow-lg font-semibold'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>LIVE HERO</span>
        </button>

        <button
          onClick={() => {
            onTabChange('breakdown');
            atelierSound.playClick();
          }}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-200 tracking-wider text-[11px] font-medium ${
            activeTab === 'breakdown'
              ? 'bg-white text-black shadow-lg font-semibold'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Film className="w-3.5 h-3.5" />
          <span>TRANSITION BREAKDOWN</span>
        </button>

        <button
          onClick={() => {
            onTabChange('codebase');
            atelierSound.playClick();
          }}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-200 tracking-wider text-[11px] font-medium ${
            activeTab === 'codebase'
              ? 'bg-white text-black shadow-lg font-semibold'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>CODEBASE & PROMPT</span>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-5">
        <button
          onClick={onToggleSound}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs font-mono"
          title={soundEnabled ? 'Mute synthesized audio' : 'Enable synthesized audio'}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-red-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-zinc-500" />
          )}
          <span className="hidden sm:inline text-[10px] tracking-widest uppercase">
            {soundEnabled ? 'SFX ON' : 'SFX OFF'}
          </span>
        </button>

        <button
          onClick={() => {
            onOpenInquiry();
            atelierSound.playClick();
          }}
          className="relative px-4 py-1.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-semibold tracking-widest uppercase rounded-full transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]"
        >
          BESPOKE INQUIRY
        </button>
      </div>
    </header>
  );
};
