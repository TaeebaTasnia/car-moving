import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Sparkles, ChevronRight, Sliders, Shield } from 'lucide-react';
import { VEHICLE_BUILDS } from '../data/atelierData';
import { VehicleBuild } from '../types/atelier';
import { CraftsmanshipRibbon } from './CraftsmanshipRibbon';
import { atelierSound } from '../utils/soundEffects';

interface AtelierHeroExperienceProps {
  onOpenInquiry: (vehicleId?: string) => void;
  externalScrubTime?: number | null;
  onScrubTimeConsumed?: () => void;
}

export const AtelierHeroExperience: React.FC<AtelierHeroExperienceProps> = ({
  onOpenInquiry,
  externalScrubTime,
  onScrubTimeConsumed,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(7.0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [activeVehicle, setActiveVehicle] = useState<VehicleBuild | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, normalizedX: 0.5, normalizedY: 0.5 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [showVehicleSpecs, setShowVehicleSpecs] = useState(false);

  // Sync external scrub request if triggered from TransitionDeepDive
  useEffect(() => {
    if (externalScrubTime !== null && externalScrubTime !== undefined && videoRef.current) {
      videoRef.current.currentTime = externalScrubTime;
      setCurrentTime(externalScrubTime);
      onScrubTimeConsumed?.();
    }
  }, [externalScrubTime, onScrubTimeConsumed]);

  // Video time listener
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

  const handleSelectVehicle = (vehicle: VehicleBuild) => {
    if (activeVehicle?.id === vehicle.id) {
      setActiveVehicle(null);
      setShowVehicleSpecs(false);
      atelierSound.playClick(700);
    } else {
      setActiveVehicle(vehicle);
      setShowVehicleSpecs(true);
      atelierSound.playEngineRumble();
    }
  };

  // Determine current active phase name for the header badge
  const getPhaseName = (time: number) => {
    if (time < 2.1) return 'STAGE 1: TRIO SHOWROOM & SPOTLIGHT';
    if (time < 3.8) return 'STAGE 2: COCKPIT MACRO ZOOM';
    if (time < 5.6) return 'STAGE 3: CRAFTSMANSHIP RIBBON';
    return 'STAGE 4: MACRO LEATHER STITCHING';
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Main Full-Scale Hero Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full h-[85vh] min-h-[620px] max-h-[920px] bg-[#050505] overflow-hidden select-none cursor-crosshair border-b border-white/10"
      >
        {/* 1. High-Performance Video Player */}
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
            transform: activeVehicle?.id === 'gt3rs'
              ? 'scale(1.25) translateY(-5%)'
              : activeVehicle?.id === 'g-wagon'
              ? 'scale(1.22) translateX(12%)'
              : activeVehicle?.id === 'defender'
              ? 'scale(1.22) translateX(-12%)'
              : 'scale(1.0)',
          }}
        />

        {/* 2. Wet asphalt studio floor reflection gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />

        {/* 3. Concentric Circular Target Reticle (Interactive Cursor) */}
        <motion.div
          className="pointer-events-none absolute z-30 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
          animate={{
            left: mousePos.x,
            top: mousePos.y,
            scale: isHoveringInteractive ? 1.4 : 1.0,
          }}
          transition={{ type: 'spring', damping: 28, stiffness: 350, mass: 0.1 }}
        >
          <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center backdrop-blur-[1px] shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
          </div>
        </motion.div>

        {/* 4. Luxury Atelier Floating Top Navigation */}
        <div className="absolute top-0 left-0 right-0 z-40 px-6 sm:px-12 py-7 flex items-center justify-between text-xs tracking-[0.25em] uppercase text-zinc-300 font-medium">
          <nav className="flex items-center gap-6 sm:gap-8">
            {['ABOUT', 'BUILDS', 'PROCESS'].map((item) => (
              <button
                key={item}
                onMouseEnter={() => {
                  setIsHoveringInteractive(true);
                  atelierSound.playClick(1000);
                }}
                onMouseLeave={() => setIsHoveringInteractive(false)}
                onClick={() => onOpenInquiry()}
                className="hover:text-white transition-colors relative py-1 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Center Monogram */}
          <div
            onClick={() => handleScrub(0)}
            onMouseEnter={() => setIsHoveringInteractive(true)}
            onMouseLeave={() => setIsHoveringInteractive(false)}
            className="flex flex-col items-center gap-1 cursor-pointer group"
          >
            <svg className="w-4 h-4 fill-white transition-transform group-hover:scale-110" viewBox="0 0 24 24">
              <path d="M12 2L2 19h20L12 2zm0 6l5 9H7l5-9z" />
            </svg>
            <span className="font-display tracking-[0.35em] text-white font-bold text-sm">
              VANTARE
            </span>
          </div>

          {/* Right Action */}
          <button
            onClick={() => onOpenInquiry(activeVehicle?.id)}
            onMouseEnter={() => setIsHoveringInteractive(true)}
            onMouseLeave={() => setIsHoveringInteractive(false)}
            className="relative py-1 group text-white font-semibold flex items-center gap-2"
          >
            <span>GET IN TOUCH</span>
            <span className="w-6 h-[1px] bg-white transition-all duration-300 group-hover:w-10" />
          </button>
        </div>

        {/* 5. Phase Stage Badge */}
        <div className="absolute top-20 left-6 sm:left-12 z-30">
          <span className="px-3 py-1 rounded-full text-[9px] font-mono tracking-widest text-zinc-300 bg-black/60 border border-white/15 backdrop-blur-md">
            {getPhaseName(currentTime)}
          </span>
        </div>

        {/* 6. Dynamic Typography Transitions */}
        <div className="absolute inset-x-6 sm:inset-x-12 top-32 z-20 pointer-events-none max-w-2xl">
          <AnimatePresence mode="wait">
            {currentTime < 2.1 && (
              <motion.div
                key="phase-1-text"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl text-white font-normal leading-[1.05] tracking-tight">
                  For Those Who <br />
                  <span className="italic font-light text-zinc-200">Refuse Ordinary</span>
                </h1>
                <p className="mt-4 text-[10px] sm:text-xs tracking-[0.25em] text-zinc-400 uppercase font-light max-w-lg leading-relaxed">
                  A LUXURY AUTOMOTIVE ATELIER FOR BESPOKE STYLING, PERFORMANCE AND CRAFTSMANSHIP.
                </p>
              </motion.div>
            )}

            {currentTime >= 2.1 && currentTime < 3.8 && (
              <motion.div
                key="phase-2-text"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
              >
                <span className="px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] bg-red-600/30 text-red-400 border border-red-500/40 rounded-full font-mono">
                  COCKPIT SPECIFICATION
                </span>
                <h2 className="mt-3 font-serif-editorial text-4xl sm:text-6xl text-white font-normal">
                  Into The Cockpit
                </h2>
                <p className="mt-3 text-xs tracking-wider text-zinc-300 max-w-md leading-relaxed font-light">
                  Chromoly safety cell, FIA-spec 6-point harness, and hand-stitched perforated Alcantara steering controls.
                </p>
              </motion.div>
            )}

            {currentTime >= 3.8 && currentTime < 5.6 && (
              <motion.div
                key="phase-3-text"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-serif-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight">
                  We Don’t Modify Vehicles. <br />
                  <span className="italic font-light text-zinc-300">We Build Them For You.</span>
                </h2>
                <p className="mt-3 text-[10px] sm:text-xs tracking-[0.2em] text-zinc-400 uppercase font-light">
                  DRY CARBON · CERAMIC COMPOSITES · HAND COACHWORK · THERMAL CURING
                </p>
              </motion.div>
            )}

            {currentTime >= 5.6 && (
              <motion.div
                key="phase-4-text"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-serif-editorial text-4xl sm:text-6xl text-white font-normal leading-tight">
                  Our Approach <br />
                  <span className="italic font-light text-zinc-300">To Every Build</span>
                </h2>
                <p className="mt-3 text-xs tracking-[0.25em] text-zinc-400 uppercase font-light">
                  BESPOKE · PERFORMANCE · CRAFT
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 7. Interactive Vehicle Click Hitboxes (Active in Phase 1) */}
        {currentTime < 2.5 && (
          <div className="absolute inset-0 z-20 pointer-events-auto flex items-end justify-center pb-28">
            <div className="w-full max-w-6xl grid grid-cols-3 gap-4 px-6 h-48">
              {VEHICLE_BUILDS.map((v) => {
                const isSelected = activeVehicle?.id === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => handleSelectVehicle(v)}
                    onMouseEnter={() => {
                      setIsHoveringInteractive(true);
                      atelierSound.playClick(900);
                    }}
                    onMouseLeave={() => setIsHoveringInteractive(false)}
                    className={`relative rounded-2xl border transition-all duration-300 flex flex-col justify-end p-4 text-left group ${
                      isSelected
                        ? 'border-red-500 bg-red-950/20 shadow-[0_0_30px_rgba(239,68,68,0.3)]'
                        : 'border-white/0 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                      <span className="text-[9px] font-mono text-red-400 tracking-widest uppercase">
                        CLICK TO FOCUS CAMERA
                      </span>
                      <span className="text-xs font-bold text-white tracking-wider">
                        {v.name}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {v.power}
                      </span>
                    </div>

                    {isSelected && (
                      <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 8. Vehicle Specs HUD Panel (When a vehicle is selected) */}
        <AnimatePresence>
          {showVehicleSpecs && activeVehicle && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-24 right-6 sm:right-12 z-40 w-72 sm:w-80 p-5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col gap-3"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest">
                  ATELIER ARCHITECTURE
                </span>
                <button
                  onClick={() => setShowVehicleSpecs(false)}
                  className="text-zinc-500 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white tracking-wider">
                  {activeVehicle.name}
                </h4>
                <p className="text-[11px] text-zinc-400 font-light">
                  {activeVehicle.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs py-1">
                <div>
                  <span className="text-[9px] text-zinc-500 uppercase font-mono block">Power</span>
                  <span className="font-mono text-red-400 font-bold">{activeVehicle.power.split('/')[0]}</span>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-500 uppercase font-mono block">0-100 km/h</span>
                  <span className="font-mono text-white font-bold">{activeVehicle.acceleration}</span>
                </div>
              </div>

              <button
                onClick={() => onOpenInquiry(activeVehicle.id)}
                className="w-full py-2 bg-white text-black font-semibold text-[11px] tracking-wider uppercase rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Request Allocation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 9. Bottom Floating Control Bar */}
        <div className="absolute bottom-6 inset-x-6 sm:inset-x-12 z-40 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
          {/* Timeline & Scrubber */}
          <div className="pointer-events-auto flex items-center gap-4 bg-black/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/15 shadow-xl">
            <button
              onClick={togglePlay}
              onMouseEnter={() => setIsHoveringInteractive(true)}
              onMouseLeave={() => setIsHoveringInteractive(false)}
              className="text-white hover:text-red-400 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={() => handleScrub(0)}
              title="Restart Loop"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-zinc-400 w-7">
                {currentTime.toFixed(1)}s
              </span>
              <input
                type="range"
                min={0}
                max={duration}
                step={0.05}
                value={currentTime}
                onChange={(e) => handleScrub(parseFloat(e.target.value))}
                className="w-28 sm:w-56 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <span className="text-[10px] font-mono text-zinc-500 w-7">
                {duration.toFixed(1)}s
              </span>
            </div>

            {/* Playback speed selector */}
            <div className="hidden sm:flex items-center gap-1.5 border-l border-zinc-700 pl-3 text-[10px] font-mono text-zinc-400">
              {[0.5, 1, 1.5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => {
                    setPlaybackRate(speed);
                    if (videoRef.current) videoRef.current.playbackRate = speed;
                    atelierSound.playClick();
                  }}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    playbackRate === speed ? 'bg-white text-black font-bold' : 'hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Right Brand Mark */}
          <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
            © 2026 VANTARE ATELIER · MILANO
          </div>
        </div>
      </div>

      {/* Embedded Craftsmanship Ribbon Section */}
      <CraftsmanshipRibbon onSelectCraft={() => onOpenInquiry()} />
    </div>
  );
};
