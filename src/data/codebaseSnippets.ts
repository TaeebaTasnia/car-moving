export interface CodeFile {
  name: string;
  language: string;
  description: string;
  content: string;
}

export const CODEBASE_SNIPPETS: CodeFile[] = [
  {
    name: 'VantareAtelierHero.tsx',
    language: 'tsx',
    description: 'Main Hero component orchestrating video scrubbing, camera zooms, target reticle, typography transitions, and vehicle selection.',
    content: `import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Play, Pause, ChevronRight, Eye, Shield, Sparkles, Sliders } from 'lucide-react';
import { VEHICLE_BUILDS, TRANSITION_PHASES, CRAFT_IMAGES } from './atelierData';
import { CraftsmanshipRibbon } from './CraftsmanshipRibbon';
import { atelierSound } from './soundEffects';

export function VantareAtelierHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(7.0);
  const [activeVehicle, setActiveVehicle] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, normalizedX: 0.5, normalizedY: 0.5 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  // Synchronize playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const onLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, []);

  // Mouse tracking for reticle and parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({
      x,
      y,
      normalizedX: x / rect.width,
      normalizedY: y / rect.height,
    });
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
      atelierSound.playClick();
    } else {
      v.pause();
      setIsPlaying(false);
      atelierSound.playClick();
    }
  };

  const handleScrub = (time: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = time;
    setCurrentTime(time);
    atelierSound.playClick(900);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[88vh] min-h-[640px] bg-[#050505] overflow-hidden select-none"
    >
      {/* 1. Cinematic Video Background */}
      <video
        ref={videoRef}
        src="/vantare-atelier-hero.mp4"
        poster="/hero-poster.jpg"
        loop
        muted
        playsInline
        autoPlay
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: activeVehicle === 'gt3rs' 
            ? 'scale(1.28) translateY(-4%)'
            : activeVehicle === 'g-wagon'
            ? 'scale(1.22) translateX(12%)'
            : activeVehicle === 'defender'
            ? 'scale(1.22) translateX(-12%)'
            : 'scale(1.0)',
        }}
      />

      {/* 2. Wet asphalt studio reflection mask overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

      {/* 3. Interactive Reticle Target Cursor */}
      <motion.div
        className="pointer-events-none absolute z-30 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        animate={{
          left: mousePos.x,
          top: mousePos.y,
          scale: isHoveringInteractive ? 1.4 : 1.0,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 350, mass: 0.1 }}
      >
        <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-[1px]">
          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        </div>
      </motion.div>

      {/* 4. Luxury Atelier Navigation */}
      <header className="absolute top-0 left-0 right-0 z-40 px-8 py-7 flex items-center justify-between text-xs tracking-[0.25em] uppercase text-zinc-300 font-medium">
        <nav className="flex items-center gap-8">
          {['ABOUT', 'BUILDS', 'PROCESS'].map((item) => (
            <button
              key={item}
              onMouseEnter={() => {
                setIsHoveringInteractive(true);
                atelierSound.playClick(1000);
              }}
              onMouseLeave={() => setIsHoveringInteractive(false)}
              className="hover:text-white transition-colors relative py-1 group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Center Monogram / Brand */}
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
            <path d="M12 2L2 19h20L12 2zm0 6l5 9H7l5-9z" />
          </svg>
          <span className="font-display tracking-[0.35em] text-white font-bold text-sm">VANTARE</span>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              atelierSound.enabled = !soundEnabled;
              atelierSound.playClick();
            }}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-zinc-500" />}
            <span className="hidden sm:inline text-[10px]">{soundEnabled ? 'AUDIO ON' : 'AUDIO OFF'}</span>
          </button>

          <button 
            className="relative py-1 group text-white font-semibold flex items-center gap-2"
            onMouseEnter={() => setIsHoveringInteractive(true)}
            onMouseLeave={() => setIsHoveringInteractive(false)}
          >
            <span>GET IN TOUCH</span>
            <span className="w-6 h-[1px] bg-white transition-all duration-300 group-hover:w-10" />
          </button>
        </div>
      </header>

      {/* 5. Dynamic Phase Overlay / Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 sm:p-12 pointer-events-none">
        {/* Top-Mid Typography */}
        <div className="mt-20 max-w-xl">
          {currentTime < 2.5 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-serif-editorial text-4xl sm:text-6xl text-white font-normal leading-[1.05] tracking-tight">
                For Those Who <br />
                <span className="italic font-light text-zinc-200">Refuse Ordinary</span>
              </h1>
              <p className="mt-4 text-[10px] sm:text-xs tracking-[0.25em] text-zinc-400 uppercase font-light">
                A LUXURY AUTOMOTIVE ATELIER FOR BESPOKE STYLING, PERFORMANCE AND CRAFTSMANSHIP.
              </p>
            </motion.div>
          )}

          {currentTime >= 2.5 && currentTime < 4.5 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] bg-red-600/20 text-red-400 border border-red-500/30 rounded-full">
                COCKPIT MONOCOQUE
              </span>
              <h2 className="mt-3 font-serif-editorial text-3xl sm:text-5xl text-white font-normal">
                Race-Grade Carbon Monocoque
              </h2>
              <p className="mt-2 text-xs text-zinc-400 tracking-wider">
                Full chromoly roll cage, Nomex harness, and hand-stitched Alcantara steering controls.
              </p>
            </motion.div>
          )}

          {currentTime >= 4.5 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-serif-editorial text-3xl sm:text-5xl text-white">
                Our Approach <br />
                <span className="italic text-zinc-300">To Every Build</span>
              </h2>
              <p className="mt-3 text-xs tracking-[0.2em] text-zinc-400 uppercase">
                BESPOKE · PERFORMANCE · CRAFT
              </p>
            </motion.div>
          )}
        </div>

        {/* Bottom Timeline Scrubber */}
        <div className="pointer-events-auto flex items-center justify-between gap-6 bg-black/60 backdrop-blur-md px-6 py-3.5 rounded-full border border-white/10 w-fit max-w-full">
          <button 
            onClick={togglePlay}
            className="text-white hover:text-red-400 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-zinc-400 w-8">
              {currentTime.toFixed(1)}s
            </span>
            <input
              type="range"
              min={0}
              max={duration}
              step={0.05}
              value={currentTime}
              onChange={(e) => handleScrub(parseFloat(e.target.value))}
              className="w-36 sm:w-64 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <span className="text-[10px] font-mono text-zinc-500 w-8">
              {duration.toFixed(1)}s
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 border-l border-zinc-700 pl-4 text-[10px] tracking-wider text-zinc-400">
            {[0.5, 1, 1.5].map((rate) => (
              <button
                key={rate}
                onClick={() => {
                  setPlaybackRate(rate);
                  if (videoRef.current) videoRef.current.playbackRate = rate;
                }}
                className={\`px-1.5 py-0.5 rounded \${playbackRate === rate ? 'bg-white text-black font-bold' : 'hover:text-white'}\`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}`
  },
  {
    name: 'CraftsmanshipRibbon.tsx',
    language: 'tsx',
    description: 'The interactive magnetic fan component. Spreads craft photo cards along an elliptical curve responding to pointer velocity and proximity.',
    content: `import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CRAFT_IMAGES } from './atelierData';
import { atelierSound } from './soundEffects';

interface CraftsmanshipRibbonProps {
  onSelectCraft?: (craft: typeof CRAFT_IMAGES[0]) => void;
}

export function CraftsmanshipRibbon({ onSelectCraft }: CraftsmanshipRibbonProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [spreadFactor, setSpreadFactor] = useState(1);

  return (
    <div className="relative py-12 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h3 className="font-serif-editorial text-3xl sm:text-4xl text-white font-normal">
          We Don't Modify Vehicles. <br />
          <span className="italic text-zinc-300">We Build Them For You.</span>
        </h3>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
          HOVER & SCRUB ACROSS COMPONENTS TO EXPAND ATELIER LAYERS
        </p>
      </div>

      {/* Physics-driven fan container */}
      <div 
        onMouseEnter={() => setSpreadFactor(1.4)}
        onMouseLeave={() => {
          setSpreadFactor(1);
          setHoveredIndex(null);
        }}
        className="relative h-64 w-full max-w-2xl flex items-center justify-center cursor-pointer"
      >
        {CRAFT_IMAGES.map((item, idx) => {
          const isHovered = hoveredIndex === idx;
          const baseOffset = (idx - 1.5) * 85 * spreadFactor;
          const baseRotate = (idx - 1.5) * 7;

          return (
            <motion.div
              key={item.id}
              onMouseEnter={() => {
                setHoveredIndex(idx);
                atelierSound.playClick(750 + idx * 80);
              }}
              onClick={() => {
                onSelectCraft?.(item);
                atelierSound.playShutter();
              }}
              animate={{
                x: baseOffset,
                y: isHovered ? -35 : (idx % 2 === 0 ? 10 : -5),
                rotate: isHovered ? 0 : baseRotate,
                scale: isHovered ? 1.18 : 1.0,
                zIndex: isHovered ? 50 : 10 + idx,
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 22,
                mass: 0.6,
              }}
              className="absolute w-44 sm:w-56 h-56 rounded-xl overflow-hidden border border-white/20 bg-zinc-950 shadow-2xl group"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-3 text-left">
                <span className="text-[9px] uppercase tracking-widest text-red-400 font-mono">
                  {item.category}
                </span>
                <h4 className="text-xs font-semibold text-white leading-tight mt-0.5">
                  {item.title}
                </h4>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}`
  },
  {
    name: 'useAtelierSound.ts',
    language: 'ts',
    description: 'Self-contained zero-dependency Web Audio API synthesizer for tactile button clicks, camera shutter, and engine ignition rumble.',
    content: `// Web Audio API Synthesizer - No external sound files required!
export class AtelierSoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) this.ctx = new AudioContextClass();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playClick(freq = 800) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {}
  }

  public playEngineRumble() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc1.type = 'sawtooth';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(55, this.ctx.currentTime);
      osc1.frequency.linearRampToValueAtTime(85, this.ctx.currentTime + 0.3);
      osc1.frequency.exponentialRampToValueAtTime(45, this.ctx.currentTime + 0.9);
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.9);
      osc1.connect(gain);
      gain.connect(this.ctx.destination);
      osc1.start();
      osc1.stop(this.ctx.currentTime + 0.9);
    } catch {}
  }
}

export const atelierSound = new AtelierSoundEngine();`
  },
  {
    name: 'MotionSitesPrompt.md',
    language: 'markdown',
    description: 'The master AI generation prompt for MotionSites AI, Cursor, Lovable, or Bolt.new to reproduce this automotive experience.',
    content: `# MotionSites "Car Atelier" (Vantare Atelier) Complete AI Prompt

Create an ultra-luxury, high-end responsive landing page for "VANTARE" — a bespoke automotive atelier.

## 1. Visual Aesthetic & Mood
- Dark Mode / Obsidian (#050505) backdrop with high-contrast luxury editorial styling.
- Atmospheric soft volumetric overhead spotlight (5600K key light) slicing through subtle haze.
- Wet asphalt showroom floor featuring high-gloss specular reflections mirroring vehicle neon accents.
- Typography: High-fashion serif headlines (Cormorant Garamond / Playfair) paired with clean geometric uppercase sans (Plus Jakarta Sans, tracking: 0.25em).

## 2. Layout & Nav Structure
- Header:
  - Left: "ABOUT", "BUILDS", "PROCESS" with subtle hairline underlines on hover.
  - Center: Minimalist geometric arrowhead chevron monogram + "VANTARE".
  - Right: "GET IN TOUCH" with an animated horizontal rule + Audio toggle.
- Hero Section:
  - Three bespoke vehicles in stage formation:
    1. Left: Matte Black G-Wagon (AMG G63) with circular halo DRLs.
    2. Center: Flagship Guards Red Porsche 911 GT3 RS with swan-neck wing and aggressive hood ducts.
    3. Right: Obsidian Land Rover Defender with squared LED signatures.
  - Floating dynamic reticle target cursor with concentric circle following mouse pointer with smooth spring damping.

## 3. Motion & Transition Choreography
- Phase 1 (0s–2s): Static isometric trio reveal with typography: "For Those Who Refuse Ordinary".
- Phase 2 (2s–3.8s): Dynamic camera push/zoom straight into the Porsche RS-Corsa cockpit. Reveals red chromoly roll cage, carbon bucket seats, and harness.
- Phase 3 (3.8s–5.5s): Headline: "We Don't Modify Vehicles. We Build Them For You." Interactive floating ribbon of craft cards (Carbon Weave, Yellow Ceramic Calipers, Aluminum Surfacing, Paint Booth) that fans out on cursor proximity with spring physics.
- Phase 4 (5.5s–7s): Extreme macro dolly shot of artisan hand-stitching red thread into perforated black Nappa leather. Footer reveal: "© 2026 VANTARE ATELIER · BESPOKE · PERFORMANCE · CRAFT".

## 4. Interactive Components
- Timeline scrubber at bottom-left allowing smooth scrubbing, speed change (0.5x, 1x, 1.5x), and play/pause.
- Interactive vehicle click zooms into selected car and displays chassis specs (HP, engine, aero package, acceleration).
- Web Audio API integration: synthetic tactile clicks, engine rev rumble, and camera shutter without requiring external audio files.`
  }
];
