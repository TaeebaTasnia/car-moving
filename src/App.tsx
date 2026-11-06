/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AtelierHeader } from './components/AtelierHeader';
import { AtelierHeroExperience } from './components/AtelierHeroExperience';
import { TransitionDeepDive } from './components/TransitionDeepDive';
import { CodebaseExplorer } from './components/CodebaseExplorer';
import { VehicleConfiguratorModal } from './components/VehicleConfiguratorModal';
import { AtelierFooter } from './components/AtelierFooter';
import { atelierSound } from './utils/soundEffects';

export default function App() {
  const [activeTab, setActiveTab] = useState<'experience' | 'breakdown' | 'codebase'>('experience');
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryVehicleId, setInquiryVehicleId] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [scrubTimeRequest, setScrubTimeRequest] = useState<number | null>(null);

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    atelierSound.enabled = nextState;
    if (nextState) {
      atelierSound.playClick();
    }
  };

  const handleOpenInquiry = (vehicleId?: string) => {
    setInquiryVehicleId(vehicleId || null);
    setInquiryOpen(true);
    atelierSound.playClick();
  };

  const handleJumpToTime = (time: number) => {
    setScrubTimeRequest(time);
    setActiveTab('experience');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* 1. Header Navigation */}
      <AtelierHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenInquiry={() => handleOpenInquiry()}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* 2. Main Tabbed Content Area */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'experience' && (
          <AtelierHeroExperience
            onOpenInquiry={handleOpenInquiry}
            externalScrubTime={scrubTimeRequest}
            onScrubTimeConsumed={() => setScrubTimeRequest(null)}
          />
        )}

        {activeTab === 'breakdown' && (
          <TransitionDeepDive onJumpToTime={handleJumpToTime} />
        )}

        {activeTab === 'codebase' && (
          <CodebaseExplorer />
        )}
      </main>

      {/* 3. Inquiry & Configurator Modal */}
      <VehicleConfiguratorModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        initialVehicleId={inquiryVehicleId}
      />

      {/* 4. Footer */}
      <AtelierFooter
        onTabChange={setActiveTab}
        onOpenInquiry={() => handleOpenInquiry()}
      />
    </div>
  );
}
