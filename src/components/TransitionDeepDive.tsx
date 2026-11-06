import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TRANSITION_PHASES } from '../data/atelierData';
import { TransitionPhase } from '../types/atelier';
import { Camera, Sparkles, Layers, Sliders, Play, CheckCircle2, ArrowRight } from 'lucide-react';
import { atelierSound } from '../utils/soundEffects';

interface TransitionDeepDiveProps {
  onJumpToTime?: (time: number) => void;
}

export const TransitionDeepDive: React.FC<TransitionDeepDiveProps> = ({ onJumpToTime }) => {
  const [selectedPhase, setSelectedPhase] = useState<TransitionPhase>(TRANSITION_PHASES[0]);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12">
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-[10px] uppercase font-mono tracking-[0.25em] text-red-400 bg-red-950/40 border border-red-500/20 inline-block mb-3">
          CHOREOGRAPHY & MOTION ARCHITECTURE
        </span>
        <h1 className="font-serif-editorial text-4xl sm:text-6xl text-white font-normal tracking-tight">
          Anatomy of the Car Atelier Transition
        </h1>
        <p className="mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
          A forensic breakdown of the transition exhibited in <strong className="text-white">MotionSites AI (?prompt=car-atelier)</strong> — an ultra-luxury editorial automotive experience fusing volumetric lighting, camera z-axis dolly zoom, physics-tethered card ribbons, and macro craftsmanship cinematography.
        </p>
      </div>

      {/* Phase Selection Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {TRANSITION_PHASES.map((phase, idx) => {
          const isSelected = selectedPhase.id === phase.id;
          return (
            <button
              key={phase.id}
              onClick={() => {
                setSelectedPhase(phase);
                atelierSound.playClick(800 + idx * 80);
                onJumpToTime?.(phase.timeStart);
              }}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'border-red-500 bg-zinc-900/90 shadow-[0_0_25px_rgba(239,68,68,0.2)]'
                  : 'border-white/10 bg-zinc-950/60 hover:border-white/25 hover:bg-zinc-900/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-widest text-red-400 font-bold">
                    {phase.badge}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {phase.timeRange}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white leading-snug line-clamp-1">
                  {phase.title.split(':')[1] || phase.title}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
                <span className="font-mono text-[10px]">Inspect Stage</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-red-400 translate-x-1' : ''}`} />
              </div>

              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-500 shadow-[0_0_8px_#ef4444]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Deep-Dive Inspection Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-zinc-950/80 border border-white/10 rounded-3xl p-6 lg:p-10 shadow-2xl">
        {/* Left Column: Visual Frame Preview with Camera Overlays */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/15 bg-black group shadow-2xl">
            <img
              src={selectedPhase.frameImage}
              alt={selectedPhase.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Viewport UI Overlay */}
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded border border-white/10 text-[9px] font-mono text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>TIMELINE: {selectedPhase.timeRange}</span>
            </div>

            <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded border border-white/10 text-[9px] font-mono text-zinc-300">
              1600 × 900 · 60 FPS
            </div>

            {/* Target Reticle Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity">
              <div className="w-16 h-16 rounded-full border border-dashed border-white/50 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-red-500" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
            <span>Primary Focus: {selectedPhase.headline}</span>
            <button
              onClick={() => {
                atelierSound.playClick();
                onJumpToTime?.(selectedPhase.timeStart);
              }}
              className="text-red-400 hover:text-red-300 flex items-center gap-1.5 font-sans font-medium"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Jump To Frame</span>
            </button>
          </div>
        </div>

        {/* Right Column: Technical Mechanics Specification */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-semibold block mb-1">
              STAGE SPECIFICATION · {selectedPhase.timeRange}
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl text-white font-normal">
              {selectedPhase.headline}
            </h2>
            <p className="mt-2 text-xs uppercase tracking-widest text-zinc-400 font-mono">
              {selectedPhase.subtext}
            </p>
          </div>

          {/* Technical Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
              <div className="flex items-center gap-2 text-xs font-bold text-white mb-1.5">
                <Camera className="w-3.5 h-3.5 text-red-400" />
                <span>Camera Motion</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                {selectedPhase.cameraMovement}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
              <div className="flex items-center gap-2 text-xs font-bold text-white mb-1.5">
                <Sliders className="w-3.5 h-3.5 text-red-400" />
                <span>Easing Interpolation</span>
              </div>
              <p className="text-xs font-mono text-zinc-300 leading-relaxed">
                {selectedPhase.easingCurve}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
              <div className="flex items-center gap-2 text-xs font-bold text-white mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>Optical Lighting Model</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                {selectedPhase.lightingSetup}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
              <div className="flex items-center gap-2 text-xs font-bold text-white mb-1.5">
                <Layers className="w-3.5 h-3.5 text-red-400" />
                <span>Interaction Model</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                {selectedPhase.interactionModel}
              </p>
            </div>
          </div>

          {/* Architectural Bullet Points */}
          <div className="pt-2">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-2.5">
              CRITICAL IMPLEMENTATION RULES
            </span>
            <ul className="flex flex-col gap-2">
              {selectedPhase.technicalDetails.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Comparison & Choreography Timeline Table */}
      <div className="p-8 rounded-3xl bg-zinc-950/70 border border-white/10 flex flex-col gap-6">
        <div>
          <h3 className="font-serif-editorial text-2xl text-white font-normal">
            Motion Choreography Comparison
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            How the 4 stages harmonize into a continuous 7-second seamless loop.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 font-mono text-[11px]">
                <th className="py-3 px-4">Stage</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Primary Focal Subject</th>
                <th className="py-3 px-4">Dominant Colorway</th>
                <th className="py-3 px-4">CSS / Motion Trigger</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-light">
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-red-400">Phase 1: Trio</td>
                <td className="py-3 px-4 font-mono">0.0s – 2.1s</td>
                <td className="py-3 px-4 text-white">G63, GT3 RS, Defender Trio in Atelier</td>
                <td className="py-3 px-4 text-zinc-300">Obsidian Black + Guards Red Specular</td>
                <td className="py-3 px-4 font-mono text-[11px] text-zinc-400">Isometric wide reveal with fade-up</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-red-400">Phase 2: Cockpit</td>
                <td className="py-3 px-4 font-mono">2.1s – 3.8s</td>
                <td className="py-3 px-4 text-white">Carbon bucket seats & red roll-cage trellis</td>
                <td className="py-3 px-4 text-zinc-300">Crimson Titanium + Deep Charcoal Weave</td>
                <td className="py-3 px-4 font-mono text-[11px] text-zinc-400">Scale 1.0 → 3.8 forward dolly push</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-red-400">Phase 3: Ribbon</td>
                <td className="py-3 px-4 font-mono">3.8s – 5.6s</td>
                <td className="py-3 px-4 text-white">4x Craftsmanship Cards (Carbon, Brake, Metal, Spray)</td>
                <td className="py-3 px-4 text-zinc-300">Racing Yellow, Raw Carbon, Infrared Red</td>
                <td className="py-3 px-4 font-mono text-[11px] text-zinc-400">Spring physics magnetic card fan</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-red-400">Phase 4: Leather</td>
                <td className="py-3 px-4 font-mono">5.6s – 7.0s</td>
                <td className="py-3 px-4 text-white">Hand-stitched needle through perforated leather</td>
                <td className="py-3 px-4 text-zinc-300">Pebbled Black Nappa + Red Nylon Cord</td>
                <td className="py-3 px-4 font-mono text-[11px] text-zinc-400">Macro depth dolly & brand mark loop</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
