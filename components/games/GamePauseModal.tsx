"use client";

import React from "react";
import Link from "next/link";
import { Play, RotateCcw, Volume2, VolumeX, ArrowLeft } from "lucide-react";
import { sounds } from "@/components/Play/SoundEffects";

interface GamePauseModalProps {
  isOpen: boolean;
  onResume: () => void;
  onRestart: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export default function GamePauseModal({
  isOpen,
  onResume,
  onRestart,
  isMuted,
  onToggleMute,
}: GamePauseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm flex flex-col items-center bg-[#181920] border-2 border-white/15 rounded-3xl p-6 text-center space-y-5 shadow-2xl">
        <h2 className="text-2xl font-display font-black text-white tracking-wider">
          GAME PAUSED
        </h2>
        <p className="text-xs font-mono text-white/60">
          Take a breath, adjust settings, or jump right back in.
        </p>

        <div className="w-full flex flex-col gap-2.5 pt-2">
          {/* Resume */}
          <button
            type="button"
            onClick={onResume}
            className="w-full py-3 px-4 rounded-xl bg-accent hover:bg-accent-hover text-white font-mono font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>RESUME (ESC)</span>
          </button>

          {/* Restart */}
          <button
            type="button"
            onClick={onRestart}
            className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESTART GAME</span>
          </button>

          {/* Audio Toggle */}
          <button
            type="button"
            onClick={onToggleMute}
            className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-accent-light" />}
            <span>{isMuted ? "UNMUTE AUDIO" : "MUTE AUDIO"}</span>
          </button>

          {/* Exit to Play */}
          <Link
            href="/play"
            className="w-full py-2.5 px-4 rounded-xl border border-white/15 hover:bg-white/5 text-white/70 hover:text-white font-mono text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>EXIT TO PLAY HUB</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
