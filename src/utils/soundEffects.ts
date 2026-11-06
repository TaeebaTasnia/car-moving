// Web Audio API Synthesizer for tactile luxury interactions without external assets

class AtelierSoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Subtle luxury tactile click
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
    } catch {
      // AudioContext policy safe catch
    }
  }

  // Aerodynamic frequency whoosh for camera transitions
  public playWhoosh() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(120, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(950, this.ctx.currentTime + 0.2);
      filter.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.4);
      filter.Q.value = 3.0;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {
      // safe catch
    }
  }

  // Deep engine ignition rumble
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

      osc2.frequency.setValueAtTime(110, this.ctx.currentTime);
      osc2.frequency.linearRampToValueAtTime(170, this.ctx.currentTime + 0.3);
      osc2.frequency.exponentialRampToValueAtTime(90, this.ctx.currentTime + 0.9);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.9);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(this.ctx.currentTime + 0.9);
      osc2.stop(this.ctx.currentTime + 0.9);
    } catch {
      // safe catch
    }
  }

  // Mechanical shutter / latch
  public playShutter() {
    if (!this.enabled) return;
    this.playClick(1200);
    setTimeout(() => this.playClick(650), 45);
  }
}

export const atelierSound = new AtelierSoundEngine();
