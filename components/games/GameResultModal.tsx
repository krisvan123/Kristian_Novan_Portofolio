"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Trophy, RotateCcw, ArrowLeft, Sparkles, CheckCircle2, XCircle, Award } from "lucide-react";
import { sounds } from "@/components/Play/SoundEffects";

interface GameResultModalProps {
  isOpen: boolean;
  isVictory: boolean;
  title?: string;
  score: number;
  bestScore: number;
  isNewRecord: boolean;
  starsEarned?: number;
  breakdown?: Array<{ label: string; value: string | number }>;
  unlockedAchievements?: Array<{ id: string; title: string; icon: string }>;
  onReplay: () => void;
}

export default function GameResultModal({
  isOpen,
  isVictory,
  title,
  score,
  bestScore,
  isNewRecord,
  starsEarned = 0,
  breakdown = [],
  unlockedAchievements = [],
  onReplay,
}: GameResultModalProps) {
  useEffect(() => {
    if (isOpen) {
      if (isVictory) {
        sounds.playVictory();
      } else {
        sounds.playGameOver();
      }
    }
  }, [isOpen, isVictory]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-300 overflow-y-auto">
      <div className="relative w-full max-w-md my-auto flex flex-col items-center bg-[#181920] border-2 border-white/15 rounded-3xl p-5 sm:p-6 text-center space-y-4 shadow-2xl">
        {/* Victory/Defeat Icon Banner */}
        <div className="flex flex-col items-center gap-2">
          {isVictory ? (
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 animate-bounce">
              <Trophy className="w-9 h-9" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <XCircle className="w-9 h-9" />
            </div>
          )}

          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            {title || (isVictory ? "MISSION COMPLETE!" : "GAME OVER")}
          </h2>

          {isNewRecord && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              NEW HIGH SCORE RECORD!
            </span>
          )}
        </div>

        {/* Score Display Card */}
        <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">Final Score</span>
          <span className="text-4xl font-mono font-black text-amber-300 tracking-tight">
            {score.toLocaleString()}
          </span>
          <span className="text-xs font-mono text-white/60">
            Best: {Math.max(score, bestScore).toLocaleString()}
          </span>
        </div>

        {/* Breakdown details */}
        {breakdown.length > 0 && (
          <div className="w-full bg-black/40 rounded-xl p-3 space-y-1.5 text-xs font-mono">
            {breakdown.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-white/70">
                <span>{item.label}</span>
                <span className="text-white font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Stars Earned */}
        {starsEarned > 0 && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>+{starsEarned} Star Collectibles Earned!</span>
          </div>
        )}

        {/* Unlocked Achievements list */}
        {unlockedAchievements.length > 0 && (
          <div className="w-full space-y-1.5 text-left">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block text-center">
              Achievements Unlocked
            </span>
            {unlockedAchievements.map((ach) => (
              <div
                key={ach.id}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-accent/20 border border-accent/40 text-xs font-mono text-white"
              >
                <span className="text-lg">{ach.icon}</span>
                <span className="font-bold text-accent-light">{ach.title}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onReplay}
            className="flex-1 py-3 px-4 rounded-xl bg-accent hover:bg-accent-hover text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-accent/20 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>PLAY AGAIN</span>
          </button>

          <Link
            href="/play"
            className="py-3 px-4 rounded-xl border border-white/20 hover:bg-white/10 text-white/80 hover:text-white font-mono text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>HUB</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
