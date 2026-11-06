import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ShieldCheck, Sparkles, Send, Sliders } from 'lucide-react';
import { VEHICLE_BUILDS } from '../data/atelierData';
import { VehicleBuild } from '../types/atelier';
import { atelierSound } from '../utils/soundEffects';

interface VehicleConfiguratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVehicleId?: string | null;
}

export const VehicleConfiguratorModal: React.FC<VehicleConfiguratorModalProps> = ({
  isOpen,
  onClose,
  initialVehicleId,
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleBuild>(
    VEHICLE_BUILDS.find((v) => v.id === initialVehicleId) || VEHICLE_BUILDS[1]
  );
  const [paintOption, setPaintOption] = useState('Guards Crimson Pearl');
  const [aeroPackage, setAeroPackage] = useState('Full Dry Carbon Twill (Gloss)');
  const [exhaustOption, setExhaustOption] = useState('Active Inconel Valved Race Pipes');
  const [submitted, setSubmitted] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    atelierSound.playEngineRumble();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        className="relative w-full max-w-4xl bg-[#09090b] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="px-8 py-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-display tracking-[0.3em] text-white font-bold text-sm">
              VANTARE ATELIER · PRIVATE COMMISSION
            </span>
          </div>
          <button
            onClick={() => {
              onClose();
              atelierSound.playClick();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Vehicle Selector & Specs */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div>
              <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block mb-3">
                1. SELECT BASE PLATFORM
              </label>
              <div className="flex flex-col gap-2">
                {VEHICLE_BUILDS.map((v) => {
                  const isCurrent = selectedVehicle.id === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => {
                        setSelectedVehicle(v);
                        atelierSound.playClick();
                      }}
                      className={`text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between ${
                        isCurrent
                          ? 'border-red-500 bg-red-950/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                          : 'border-white/10 bg-zinc-900/40 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold text-white block">
                          {v.name}
                        </span>
                        <span className="text-[10px] text-zinc-400 block">
                          {v.subtitle}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-red-400">
                        {v.power.split('/')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Spec Card */}
            <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/60 flex flex-col gap-3">
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">
                BENCHMARK SPECIFICATION
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-zinc-500 block">0-100 KM/H</span>
                  <span className="font-mono font-bold text-white">{selectedVehicle.acceleration}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">TOP VELOCITY</span>
                  <span className="font-mono font-bold text-white">{selectedVehicle.topSpeed}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">POWERTRAIN</span>
                  <span className="font-mono text-zinc-300 text-[11px]">{selectedVehicle.engine}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">TOTAL OUTPUT</span>
                  <span className="font-mono font-bold text-red-400">{selectedVehicle.power}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                atelierSound.playEngineRumble();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-200 text-xs font-mono tracking-wider flex items-center justify-center gap-2 border border-white/10 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>TEST ATELIER SOUND SYNTH</span>
            </button>
          </div>

          {/* Right Column: Customization & Form */}
          <div className="md:col-span-7 flex flex-col justify-between">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-zinc-900/40 rounded-2xl border border-white/10">
                <div className="w-14 h-14 rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-7 h-7 text-red-400" />
                </div>
                <h3 className="font-serif-editorial text-3xl text-white font-normal">
                  Commission Docket Received
                </h3>
                <p className="mt-2 text-xs text-zinc-400 max-w-md leading-relaxed">
                  Your allocation request for the <strong className="text-white">{selectedVehicle.name}</strong> build has been forwarded to our Chief Technical Artisan. An encrypted spec dossier will be dispatched shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                >
                  Return to Atelier
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block mb-2">
                    2. BESPOKE FINISH & EXHAUST SPEC
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] text-zinc-400 block mb-1">Coachwork Paint</span>
                      <select
                        value={paintOption}
                        onChange={(e) => setPaintOption(e.target.value)}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                      >
                        <option>Guards Crimson Pearl</option>
                        <option>Matte Obsidian Stealth</option>
                        <option>Brushed Liquid Titanium</option>
                        <option>British Racing Heritage Green</option>
                        <option>Paint-to-Sample Custom Spec</option>
                      </select>
                    </div>

                    <div>
                      <span className="text-[11px] text-zinc-400 block mb-1">Exhaust Architecture</span>
                      <select
                        value={exhaustOption}
                        onChange={(e) => setExhaustOption(e.target.value)}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                      >
                        <option>Active Inconel Valved Race Pipes</option>
                        <option>Titanium Dual-Outlet Straight-Pipe</option>
                        <option>Acoustic Resonated Ceramic Matrix</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block mb-2">
                    3. CLIENT CREDENTIALS
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Full Name / Designation"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Private Email Address"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-white/10 text-xs flex flex-col gap-1.5">
                  <span className="text-[10px] text-zinc-400 uppercase font-mono">SELECTED BUILD DETAILS</span>
                  <span className="text-white font-medium">{selectedVehicle.name} · {selectedVehicle.subtitle}</span>
                  <p className="text-[11px] text-zinc-400 line-clamp-2">{selectedVehicle.description}</p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold text-xs tracking-widest uppercase rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT BESPOKE INQUIRY DOCKET</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
