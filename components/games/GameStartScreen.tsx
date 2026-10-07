"use client";

import React from "react";
import { Play, Trophy, Keyboard, MousePointer, Smartphone, Sparkles, HelpCircle } from "lucide-react";

interface GameStartScreenProps {
  title: string;
  tagline: string;
  description: string;
  controls: {
    keyboard?: string;
    mouse?: string;
    touch?: string;
  };
  objectives: string[];
  bestScore?: number;
  onStart: () => void;
  badge?: string;
}

export default function GameStartScreen({
  title,
  tagline,
  description,
  controls,
  objectives,
  bestScore = 0,
  onStart,
  badge = "Interactive Mini-Game",
}: GameStartScreenProps) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-3 sm:p-6 bg-gradient-to-b from-[#0c0d12]/95 via-[#12131a]/95 to-[#0b0c10]/95 backdrop-blur-md select-none overflow-y-auto">
      {/* Background ambient grid/glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#2D5A43_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-48 bg-accent/15 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-xl my-auto flex flex-col items-center text-center space-y-3.5 sm:space-y-5 animate-in fade-in zoom-in-95 duration-300 py-3 sm:py-4">
        {/* Badge & Best Score */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent-light text-[11px] font-mono font-medium">
            <Sparkles className="w-3 h-3 text-accent" />
            {badge}
          </span>
          {bestScore > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-mono">
              <Trophy className="w-3 h-3 text-amber-400" />
              High Score: {bestScore.toLocaleString()}
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white drop-shadow-md">
            {title}
          </h1>
          <p className="text-sm sm:text-base font-mono text-accent-light font-medium tracking-wide">
            {tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-white/70 max-w-md font-sans leading-relaxed">
          {description}
        </p>

        {/* Objectives / Rules Card */}
        <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-3.5 sm:p-4 text-left space-y-2 backdrop-blur-sm">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-white/80">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>HOW TO PLAY & OBJECTIVES:</span>
          </div>
          <ul className="grid grid-cols-1 gap-1 text-xs text-white/70 font-sans">
            {objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-accent font-bold mt-0.5">•</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Controls Legend */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
          {controls.keyboard && (
            <div className="flex items-center gap-2 p-2 rounded-xl bg-black/40 border border-white/10 text-white/70">
              <Keyboard className="w-4 h-4 text-accent shrink-0" />
              <span className="truncate">{controls.keyboard}</span>
            </div>
          )}
          {controls.mouse && (
            <div className="flex items-center gap-2 p-2 rounded-xl bg-black/40 border border-white/10 text-white/70">
              <MousePointer className="w-4 h-4 text-accent shrink-0" />
              <span className="truncate">{controls.mouse}</span>
            </div>
          )}
          {controls.touch && (
            <div className="flex items-center gap-2 p-2 rounded-xl bg-black/40 border border-white/10 text-white/70">
              <Smartphone className="w-4 h-4 text-accent shrink-0" />
              <span className="truncate">{controls.touch}</span>
            </div>
          )}
        </div>

        {/* Start Button */}
        <button
          type="button"
          onClick={onStart}
          className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-accent to-emerald-600 hover:from-accent-hover hover:to-emerald-500 text-white font-display font-bold text-base sm:text-lg shadow-xl shadow-accent/20 hover:shadow-accent/40 active:scale-95 transition-all duration-200 cursor-pointer overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
          <span className="relative z-10">START GAME</span>
        </button>
      </div>
    </div>
  );
}
