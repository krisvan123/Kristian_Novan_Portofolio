"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pause, Volume2, VolumeX, Trophy, Sparkles } from "lucide-react";
import { sounds } from "@/components/Play/SoundEffects";
import { gameStorage } from "@/lib/gameStorage";

interface GameShellProps {
  gameId: string;
  gameTitle: string;
  subtitle: string;
  score: number;
  bestScore: number;
  isPaused: boolean;
  onTogglePause: () => void;
  children: React.ReactNode;
}

export default function GameShell({
  gameId,
  gameTitle,
  subtitle,
  score,
  bestScore,
  isPaused,
  onTogglePause,
  children,
}: GameShellProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [totalStars, setTotalStars] = useState(0);

  useEffect(() => {
    setIsMuted(sounds.isMuted);
    setTotalStars(gameStorage.getStarsCount());
  }, []);

  const handleToggleMute = () => {
    const next = sounds.toggleMute();
    setIsMuted(next);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center space-y-4 select-none">
      {/* Top Game Navigation & System Bar */}
      <header className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-canvas-card-dark/90 backdrop-blur-md border border-surface-border shadow-xs text-xs">
        {/* Left: Back to Play Hub */}
        <Link
          href="/play"
          className="inline-flex items-center gap-1.5 font-mono text-charcoal-soft hover:text-accent transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Exit to Play</span>
        </Link>

        {/* Center: Title & Subtitle */}
        <div className="hidden sm:flex flex-col items-center">
          <span className="font-display font-bold text-sm tracking-tight text-charcoal">
            {gameTitle}
          </span>
          <span className="font-mono text-[10px] text-charcoal-soft">
            {subtitle}
          </span>
        </div>

        {/* Right: Quick Controls & Global Stars */}
        <div className="flex items-center gap-2.5">
          {/* Best Score Pill */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-canvas-subtle border border-surface-border font-mono text-[11px] text-charcoal">
            <Trophy className="w-3 h-3 text-amber-500" />
            <span>Best: {bestScore}</span>
          </div>

          {/* Stars Pill */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 font-mono text-[11px]">
            <Sparkles className="w-3 h-3" />
            <span>{totalStars}</span>
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={handleToggleMute}
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
            className="p-1.5 rounded-lg border border-surface-border text-charcoal-soft hover:text-accent hover:bg-canvas-subtle transition-colors cursor-pointer"
            title={isMuted ? "Audio Muted (Click to Unmute)" : "Audio On"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-accent" />}
          </button>

          {/* Pause Button */}
          <button
            type="button"
            onClick={onTogglePause}
            aria-label={isPaused ? "Resume game" : "Pause game"}
            className="p-1.5 rounded-lg border border-surface-border text-charcoal-soft hover:text-accent hover:bg-canvas-subtle transition-colors cursor-pointer flex items-center gap-1 font-mono text-[11px]"
            title="Pause Game (ESC)"
          >
            <Pause className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[10px]">ESC</span>
          </button>
        </div>
      </header>

      {/* Main Game Stage Viewport */}
      <main className="relative w-full h-[520px] sm:h-[560px] md:h-[600px] lg:h-[630px] max-h-[78vh] rounded-3xl bg-[#111113] border-2 border-surface-border shadow-xl overflow-hidden focus:outline-none flex flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
}
