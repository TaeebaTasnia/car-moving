import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, ChevronRight, Check } from 'lucide-react';
import { CRAFT_IMAGES } from '../data/atelierData';
import { CraftImage } from '../types/atelier';
import { atelierSound } from '../utils/soundEffects';

interface CraftsmanshipRibbonProps {
  onSelectCraft?: (craft: CraftImage) => void;
}

export const CraftsmanshipRibbon: React.FC<CraftsmanshipRibbonProps> = ({ onSelectCraft }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCraft, setSelectedCraft] = useState<CraftImage | null>(null);

  const handleCardClick = (craft: CraftImage) => {
    setSelectedCraft(craft);
    atelierSound.playShutter();
    onSelectCraft?.(craft);
  };

  return (
    <div className="relative py-14 px-6 max-w-6xl mx-auto flex flex-col items-center">
      {/* Section Header */}
      <div className="text-center max-w-2xl mb-12">
        <span className="px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-[0.25em] text-red-400 bg-red-950/40 border border-red-500/20 inline-block mb-3">
          PHASE 3 TRANSITION COMPONENT
        </span>
        <h2 className="font-serif-editorial text-4xl sm:text-5xl text-white font-normal leading-tight">
          We Don't Modify Vehicles. <br />
          <span className="italic font-light text-zinc-300">We Build Them For You.</span>
        </h2>
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-zinc-400 max-w-lg mx-auto">
          Hover across the deck to dynamically fan out bespoke atelier engineering layers. Click any card to inspect fabrication specifications.
        </p>
      </div>

      {/* Physics Magnetic Fan Deck */}
      <div
        onMouseEnter={() => {
          setIsExpanded(true);
          atelierSound.playWhoosh();
        }}
        onMouseLeave={() => {
          setIsExpanded(false);
          setHoveredIndex(null);
        }}
        className="relative h-72 w-full max-w-3xl flex items-center justify-center cursor-pointer my-4"
      >
        {CRAFT_IMAGES.map((item, idx) => {
          const isHovered = hoveredIndex === idx;
          // Calculate dynamic offsets based on expanded state
          const spreadMultiplier = isExpanded ? 1.6 : 0.85;
          const baseOffset = (idx - 1.5) * 110 * spreadMultiplier;
          const baseRotation = (idx - 1.5) * (isExpanded ? 8 : 4);

          return (
            <motion.div
              key={item.id}
              onMouseEnter={() => {
                setHoveredIndex(idx);
                atelierSound.playClick(700 + idx * 90);
              }}
              onClick={() => handleCardClick(item)}
              animate={{
                x: baseOffset,
                y: isHovered ? -35 : (idx % 2 === 0 ? 12 : -8),
                rotate: isHovered ? 0 : baseRotation,
                scale: isHovered ? 1.18 : 1.0,
                zIndex: isHovered ? 50 : 10 + idx,
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 22,
                mass: 0.6,
              }}
              className="absolute w-48 sm:w-60 h-64 rounded-2xl overflow-hidden border border-white/20 bg-zinc-950 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-4 text-left">
                <span className="text-[9px] uppercase tracking-widest text-red-400 font-mono font-medium">
                  {item.category}
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-white leading-tight mt-1 line-clamp-2">
                  {item.title}
                </h4>
                <div className="mt-2 flex items-center gap-1.5 text-[10px] text-zinc-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Inspect Spec</span>
                  <ChevronRight className="w-3 h-3 text-red-400" />
                </div>
              </div>

              {/* Edge glow on hover */}
              <div className="absolute inset-0 border-2 border-red-500/0 group-hover:border-red-500/40 rounded-2xl pointer-events-none transition-colors duration-300" />
            </motion.div>
          );
        })}
      </div>

      {/* Control Instruction Bar */}
      <div className="mt-8 flex items-center gap-4 text-xs font-mono text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Interactive 3D Spring Physics
        </span>
        <span>•</span>
        <span>Relative Elliptic Trajectory</span>
        <span>•</span>
        <span>Drag & Hover Proximity Lerp</span>
      </div>

      {/* Detailed Modal for Selected Craft Card */}
      <AnimatePresence>
        {selectedCraft && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-zinc-950 border border-white/20 rounded-2xl overflow-hidden shadow-2xl p-6"
            >
              <button
                onClick={() => {
                  setSelectedCraft(null);
                  atelierSound.playClick();
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="h-48 w-full rounded-xl overflow-hidden mb-5 border border-white/10">
                <img
                  src={selectedCraft.image}
                  alt={selectedCraft.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-red-400 font-semibold">
                {selectedCraft.category}
              </span>
              <h3 className="font-serif-editorial text-2xl text-white font-normal mt-1">
                {selectedCraft.title}
              </h3>
              <p className="mt-3 text-xs text-zinc-300 leading-relaxed">
                {selectedCraft.description}
              </p>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 font-mono">
                  VANTARE BESPOKE SPEC #049
                </span>
                <button
                  onClick={() => {
                    setSelectedCraft(null);
                    atelierSound.playClick();
                  }}
                  className="px-4 py-2 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-zinc-200 transition-colors"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
