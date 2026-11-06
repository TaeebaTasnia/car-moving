import React from 'react';
import { atelierSound } from '../utils/soundEffects';

interface AtelierFooterProps {
  onTabChange: (tab: 'experience' | 'breakdown' | 'codebase') => void;
  onOpenInquiry: () => void;
}

export const AtelierFooter: React.FC<AtelierFooterProps> = ({ onTabChange, onOpenInquiry }) => {
  return (
    <footer className="w-full border-t border-white/10 bg-zinc-950 py-12 px-6 lg:px-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded border border-white/20 bg-zinc-900 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
              <path d="M12 2L2 19h20L12 2zm0 6l5 9H7l5-9z" />
            </svg>
          </div>
          <div>
            <span className="font-display tracking-[0.3em] text-white font-bold block">
              VANTARE ATELIER
            </span>
            <span className="text-[10px] text-zinc-500 font-mono block">
              BESPOKE AUTOMOTIVE COACHBUILDER · EST. 2013
            </span>
          </div>
        </div>

        <div className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-wider">
          <button
            onClick={() => {
              onTabChange('experience');
              atelierSound.playClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors"
          >
            Live Hero
          </button>
          <button
            onClick={() => {
              onTabChange('breakdown');
              atelierSound.playClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors"
          >
            Transition Breakdown
          </button>
          <button
            onClick={() => {
              onTabChange('codebase');
              atelierSound.playClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors"
          >
            Full Codebase
          </button>
          <button
            onClick={() => {
              onOpenInquiry();
              atelierSound.playClick();
            }}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            Private Commission
          </button>
        </div>

        <div className="text-[10px] font-mono text-zinc-500 text-center md:text-right">
          <div>Crafted from MotionSites AI ("car-atelier" transition)</div>
          <div className="mt-0.5">© 2026 Vantare Atelier · All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};
