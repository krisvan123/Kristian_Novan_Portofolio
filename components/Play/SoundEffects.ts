"use client";

// Simple zero-dependency Web Audio synthesizer
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
      // Play brief soft confirmation tone
      this.playNote(523.25, 0.08, "sine", 0.05); // C5
    }
    return this.isMuted;
  }

  // Play a soft clean musical tone
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
    } catch {
      // safe fallback if audio is not permitted
    }
  }

  // Soft UI click
  public playClick() {
    this.playNote(440, 0.05, "sine", 0.04);
  }

  // Correct selection or match
  public playSuccess() {
    const ctx = this.getContext();
    if (!ctx) return;

    // Harmonious two-tone chime (E5 -> G5)
    this.playNote(659.25, 0.1, "sine", 0.06);
    setTimeout(() => {
      this.playNote(783.99, 0.16, "sine", 0.07);
    }, 90);
  }

  // Victory / Game Complete fanfare
  public playVictory() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playNote(freq, 0.22, "sine", 0.08);
      }, idx * 110);
    });
  }

  // Gentle soft error / mismatch tone
  public playMiss() {
    this.playNote(261.63, 0.15, "triangle", 0.04);
  }
}

export const sounds = new SoundEffectsManager();
