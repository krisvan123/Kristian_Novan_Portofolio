"use client";

// Zero-dependency Web Audio synthesizer
// Completely self-contained, no external MP3s/assets
class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = true; // Muted by default per specification

  private getContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (typeof window === "undefined") return null;

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }

    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.playNote(523.25, 0.08, "sine", 0.06); // C5
    }
    return this.isMuted;
  }

  public playNote(
    freq: number,
    duration: number = 0.12,
    type: OscillatorType = "sine",
    volume: number = 0.08
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {}
  }

  // Soft UI click
  public playClick() {
    this.playNote(480, 0.05, "sine", 0.04);
  }

  // Card flip rustle
  public playCardFlip() {
    this.playNote(320, 0.07, "triangle", 0.05);
  }

  // Collect item / star
  public playCollect() {
    this.playNote(659.25, 0.08, "sine", 0.06);
    setTimeout(() => {
      this.playNote(880, 0.14, "sine", 0.07);
    }, 60);
  }

  // Combo progression: higher pitch per combo step
  public playCombo(comboMultiplier: number = 1) {
    const baseFreq = 440;
    const freq = baseFreq * Math.pow(1.12, Math.min(10, comboMultiplier));
    this.playNote(freq, 0.1, "sine", 0.07);
    setTimeout(() => {
      this.playNote(freq * 1.25, 0.15, "sine", 0.07);
    }, 70);
  }

  // Laser scanner / zap
  public playLaser() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {}
  }

  // Power-up arpeggio
  public playPowerUp() {
    const freqs = [440, 554.37, 659.25, 880];
    freqs.forEach((f, idx) => {
      setTimeout(() => this.playNote(f, 0.1, "sine", 0.06), idx * 55);
    });
  }

  // Car horn
  public playHonk() {
    this.playNote(349.23, 0.14, "triangle", 0.08); // F4
    setTimeout(() => this.playNote(440, 0.18, "triangle", 0.08), 20); // A4
  }

  // Successful action / delivery / objective
  public playSuccess() {
    this.playNote(659.25, 0.1, "sine", 0.06);
    setTimeout(() => {
      this.playNote(783.99, 0.16, "sine", 0.07);
    }, 90);
  }

  // Game over / failure tone
  public playGameOver() {
    const freqs = [392, 349.23, 311.13, 261.63]; // G4, F4, Eb4, C4
    freqs.forEach((f, idx) => {
      setTimeout(() => this.playNote(f, 0.22, "sawtooth", 0.05), idx * 130);
    });
  }

  // Victory / Game Complete fanfare
  public playVictory() {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playNote(freq, 0.22, "sine", 0.08);
      }, idx * 110);
    });
  }

  // Gentle soft error / mismatch tone
  public playMiss() {
    this.playNote(220, 0.18, "triangle", 0.05);
  }

  // Glitch / static zap / impact
  public playGlitch() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {}
  }

  // Pause toggle
  public playPause() {
    this.playNote(370, 0.08, "sine", 0.05);
  }
}

export const sounds = new SoundEffectsManager();
