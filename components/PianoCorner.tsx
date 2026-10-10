"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Music, Play, Square, Volume2, VolumeX, Sparkles, Piano as PianoIcon } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

// Standard MIDI frequencies
const NOTE_FREQS: Record<string, number> = {
  C4: 261.63,
  "C#4": 277.18,
  D4: 293.66,
  "D#4": 311.13,
  E4: 329.63,
  F4: 349.23,
  "F#4": 369.99,
  G4: 392.0,
  "G#4": 415.3,
  A4: 440.0,
  "A#4": 466.16,
  B4: 493.88,
  C5: 523.25,
  "C#5": 554.37,
  D5: 587.33,
  "D#5": 622.25,
  E5: 659.25,
  F5: 698.46,
  "F#5": 739.99,
  G5: 783.99,
  "G#5": 830.61,
  A5: 880.0,
  "A#5": 932.33,
  B5: 987.77,
  C6: 1046.5,
};

interface KeyDef {
  note: string;
  isBlack: boolean;
  keyboardKey?: string;
}

const PIANO_KEYS: KeyDef[] = [
  { note: "C4", isBlack: false, keyboardKey: "a" },
  { note: "C#4", isBlack: true, keyboardKey: "w" },
  { note: "D4", isBlack: false, keyboardKey: "s" },
  { note: "D#4", isBlack: true, keyboardKey: "e" },
  { note: "E4", isBlack: false, keyboardKey: "d" },
  { note: "F4", isBlack: false, keyboardKey: "f" },
  { note: "F#4", isBlack: true, keyboardKey: "t" },
  { note: "G4", isBlack: false, keyboardKey: "g" },
  { note: "G#4", isBlack: true, keyboardKey: "y" },
  { note: "A4", isBlack: false, keyboardKey: "h" },
  { note: "A#4", isBlack: true, keyboardKey: "u" },
  { note: "B4", isBlack: false, keyboardKey: "j" },
  { note: "C5", isBlack: false, keyboardKey: "k" },
  { note: "C#5", isBlack: true, keyboardKey: "o" },
  { note: "D5", isBlack: false, keyboardKey: "l" },
  { note: "D#5", isBlack: true, keyboardKey: "p" },
  { note: "E5", isBlack: false, keyboardKey: ";" },
  { note: "F5", isBlack: false },
  { note: "F#5", isBlack: true },
  { note: "G5", isBlack: false },
  { note: "G#5", isBlack: true },
  { note: "A5", isBlack: false },
  { note: "A#5", isBlack: true },
  { note: "B5", isBlack: false },
  { note: "C6", isBlack: false },
];

// Debussy: Clair de Lune theme sequence (note, duration in ms)
const CLAIR_DE_LUNE_NOTES: Array<{ note: string; duration: number }> = [
  { note: "F5", duration: 800 },
  { note: "Eb5", duration: 600 },
  { note: "Db5", duration: 700 },
  { note: "C5", duration: 550 },
  { note: "Bb4", duration: 600 },
  { note: "Ab4", duration: 900 },
  { note: "F4", duration: 700 },
  { note: "Db4", duration: 1100 },
  { note: "F4", duration: 500 },
  { note: "Ab4", duration: 650 },
  { note: "C5", duration: 800 },
  { note: "Eb5", duration: 750 },
  { note: "Db5", duration: 1200 },
];

export default function PianoCorner() {
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [currentMelodyNote, setCurrentMelodyNote] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Initialize Web Audio Context on first interaction
  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Play a note synthesizing piano harmonics
  const playNote = useCallback(
    (note: string) => {
      if (isMuted) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      const freq = NOTE_FREQS[note];
      if (!freq) return;

      const now = ctx.currentTime;

      // Master note gain node with piano-like decay envelope
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.35, now + 0.015); // Quick attack
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.8); // Natural piano sustain & decay
      gainNode.connect(ctx.destination);

      // Fundamental harmonic (Sine)
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(freq, now);
      osc1.connect(gainNode);
      osc1.start(now);
      osc1.stop(now + 1.85);

      // Warm body overtone (Triangle 2nd harmonic)
      const osc2 = ctx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(freq * 2, now);
      const overtoneGain = ctx.createGain();
      overtoneGain.gain.setValueAtTime(0.12, now);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      osc2.connect(overtoneGain);
      overtoneGain.connect(ctx.destination);
      osc2.start(now);
      osc2.stop(now + 1.25);
    },
    [getAudioContext, isMuted]
  );

  const handleKeyDown = useCallback(
    (note: string) => {
      playNote(note);
      setActiveNotes((prev) => new Set(prev).add(note));
    },
    [playNote]
  );

  const handleKeyUp = useCallback((note: string) => {
    setActiveNotes((prev) => {
      const next = new Set(prev);
      next.delete(note);
      return next;
    });
  }, []);

  // Keyboard events for playing with computer keyboard
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable) return;
      const keyDef = PIANO_KEYS.find((k) => k.keyboardKey === e.key.toLowerCase());
      if (keyDef && !activeNotes.has(keyDef.note)) {
        handleKeyDown(keyDef.note);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const keyDef = PIANO_KEYS.find((k) => k.keyboardKey === e.key.toLowerCase());
      if (keyDef) {
        handleKeyUp(keyDef.note);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [activeNotes, handleKeyDown, handleKeyUp]);

  // Stop demo playback
  const stopClairDeLune = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setIsPlayingDemo(false);
    setCurrentMelodyNote(null);
    setActiveNotes(new Set());
  }, []);

  // Guided Clair de Lune demonstration
  const playClairDeLune = () => {
    stopClairDeLune();
    getAudioContext();
    setIsPlayingDemo(true);

    let accumulatedTime = 100;
    CLAIR_DE_LUNE_NOTES.forEach((item, index) => {
      const t = setTimeout(() => {
        playNote(item.note);
        setCurrentMelodyNote(item.note);
        setActiveNotes(new Set([item.note]));

        // Clear highlight before next note
        setTimeout(() => {
          setActiveNotes((prev) => {
            const next = new Set(prev);
            next.delete(item.note);
            return next;
          });
        }, item.duration * 0.85);

        if (index === CLAIR_DE_LUNE_NOTES.length - 1) {
          setTimeout(() => {
            setIsPlayingDemo(false);
            setCurrentMelodyNote(null);
          }, item.duration);
        }
      }, accumulatedTime);

      timeoutsRef.current.push(t);
      accumulatedTime += item.duration;
    });
  };

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  // Separate white keys and black keys for 3D layout
  const whiteKeys = PIANO_KEYS.filter((k) => !k.isBlack);

  return (
    <section id="piano" className="py-14 md:py-20 border-t border-surface-border relative select-none">
      <div className="max-w-content mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        {/* Header Block */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
          <div className="flex flex-col items-start space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-light dark:bg-accent-soft text-accent dark:text-accent-dark text-[11px] font-mono font-medium border border-accent-border/60">
              <Music className="w-3.5 h-3.5" />
              <span>A Little Piano Corner</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-charcoal">
              Interactive 3D Keyboard
            </h2>
            <p className="text-sm sm:text-base text-charcoal-soft max-w-xl font-sans">
              Outside Computer Science, I love music, theater, and choir. Play freely with your keyboard, mouse, or touch, or listen to Debussy's Clair de Lune.
            </p>
          </div>

          {/* Piano Controls Toolbar */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {!isPlayingDemo ? (
              <button
                type="button"
                onClick={playClairDeLune}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-mono text-xs font-bold shadow-md cursor-pointer active:scale-95 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Play Clair de Lune</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={stopClairDeLune}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold shadow-md cursor-pointer active:scale-95 transition-all"
              >
                <Square className="w-3.5 h-3.5 fill-white" />
                <span>Stop Demo</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsMuted((m) => !m)}
              className="p-2.5 rounded-xl border border-surface-border bg-white dark:bg-canvas-card-dark text-charcoal hover:border-accent transition-colors shadow-2xs cursor-pointer"
              title={isMuted ? "Unmute Piano" : "Mute Piano"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-charcoal" />}
            </button>
          </div>
        </ScrollReveal>

        {/* 3D PIANO CASE */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          <div className="relative w-full rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-[#1c1815] via-[#141210] to-[#0d0c0a] border-2 border-[#38312b] dark:border-white/10 shadow-2xl overflow-hidden">
            {/* Piano Nameplate */}
            <div className="w-full flex items-center justify-between pb-3 px-2 border-b border-amber-900/20 text-white/70">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400/80 animate-pulse" />
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-amber-200/90 font-bold">
                  KRISTIAN NOVAN · CONCERT KEYBOARD
                </span>
              </div>

              {currentMelodyNote && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-[10px] font-mono text-amber-300 animate-pulse">
                  <Sparkles className="w-3 h-3" />
                  <span>Now Playing: {currentMelodyNote}</span>
                </div>
              )}
            </div>

            {/* Red Felt Strip above keys */}
            <div className="w-full h-2.5 bg-gradient-to-r from-rose-950 via-rose-700 to-rose-950 rounded-t-sm my-1 shadow-inner" />

            {/* 3D Keybed Container */}
            <div
              style={{ touchAction: "none" }}
              className="relative w-full h-44 sm:h-52 flex justify-between bg-[#151311] rounded-b-xl p-1 shadow-2xl overflow-x-auto select-none"
            >
              {/* WHITE KEYS LAYER */}
              <div className="relative w-full h-full flex">
                {whiteKeys.map((k) => {
                  const isPressed = activeNotes.has(k.note);

                  return (
                    <button
                      key={k.note}
                      type="button"
                      aria-label={`Key ${k.note}`}
                      onPointerDown={(e) => {
                        e.preventDefault();
                        handleKeyDown(k.note);
                      }}
                      onPointerUp={() => handleKeyUp(k.note)}
                      onPointerLeave={() => handleKeyUp(k.note)}
                      onPointerCancel={() => handleKeyUp(k.note)}
                      style={{
                        transform: isPressed ? "translateY(5px) rotateX(1.5deg)" : "translateY(0) rotateX(0)",
                        transformOrigin: "top center",
                      }}
                      className={`flex-1 h-full rounded-b-md sm:rounded-b-lg border-x border-b border-stone-400/40 flex flex-col justify-end items-center pb-2 transition-all duration-75 relative cursor-pointer ${
                        isPressed
                          ? "bg-gradient-to-b from-[#e8e2d5] via-[#f7f2e7] to-[#d6cebe] shadow-inner ring-2 ring-accent"
                          : "bg-gradient-to-b from-[#faf7ee] via-[#fffdf9] to-[#ede7d8] shadow-[0_6px_8px_rgba(0,0,0,0.35)] hover:bg-[#fffdf8]"
                      }`}
                    >
                      {/* Key Note Label */}
                      <span className="text-[9px] sm:text-[10px] font-mono text-charcoal-muted/70 font-semibold">
                        {k.note}
                      </span>
                      {k.keyboardKey && (
                        <span className="hidden sm:inline-block text-[8px] font-mono text-charcoal-soft/50 uppercase">
                          [{k.keyboardKey}]
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* BLACK KEYS LAYER (Absolute positioning over the gaps) */}
              <div className="absolute inset-x-1 top-1 h-[62%] flex pointer-events-none">
                {whiteKeys.map((wKey, index) => {
                  // Standard black key pattern: between C-D, D-E, F-G, G-A, A-B (no black key after E and B)
                  const hasBlackKey = !wKey.note.startsWith("E") && !wKey.note.startsWith("B") && index < whiteKeys.length - 1;
                  const octave = wKey.note.slice(-1);
                  const baseNote = wKey.note.slice(0, -1);
                  const blackNoteName = `${baseNote}#${octave}`;

                  const isPressed = activeNotes.has(blackNoteName);

                  return (
                    <div key={`spacer-${wKey.note}`} className="flex-1 relative flex justify-end">
                      {hasBlackKey && (
                        <button
                          type="button"
                          aria-label={`Key ${blackNoteName}`}
                          onPointerDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleKeyDown(blackNoteName);
                          }}
                          onPointerUp={() => handleKeyUp(blackNoteName)}
                          onPointerLeave={() => handleKeyUp(blackNoteName)}
                          onPointerCancel={() => handleKeyUp(blackNoteName)}
                          style={{
                            right: "-32%",
                            width: "64%",
                            transform: isPressed ? "translateY(4px) scaleY(0.98)" : "translateY(0) scaleY(1)",
                            transformOrigin: "top center",
                          }}
                          className={`absolute top-0 h-full rounded-b-md sm:rounded-b-lg border border-black z-20 pointer-events-auto flex flex-col justify-end items-center pb-1.5 transition-all duration-75 cursor-pointer ${
                            isPressed
                              ? "bg-gradient-to-b from-[#1f2024] via-[#2d303b] to-[#15161a] ring-2 ring-accent shadow-inner"
                              : "bg-gradient-to-b from-[#2b2927] via-[#1a1918] to-[#0f0e0d] shadow-[0_5px_8px_rgba(0,0,0,0.65)] hover:from-[#3a3735]"
                          }`}
                        >
                          <span className="text-[8px] font-mono text-white/50">{blackNoteName}</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick usage instructions below keyboard */}
          <div className="flex flex-wrap items-center justify-between w-full pt-3 px-2 text-[11px] font-mono text-charcoal-soft">
            <span>Click, tap, or play using computer keyboard [A - K]</span>
            <span className="text-accent dark:text-accent-dark font-medium">Clair de Lune (Debussy) Guided Mode</span>
          </div>
        </div>
      </div>
    </section>
  );
}
