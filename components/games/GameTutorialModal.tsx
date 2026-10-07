"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, ArrowRight, Play, HelpCircle, X, Sparkles, Keyboard, MousePointer, Smartphone } from "lucide-react";
import { sounds } from "@/components/Play/SoundEffects";

export interface TutorialConfig {
  gameId: string;
  gameTitle: string;
  objective: string;
  controlText: string;
  doText: string;
  avoidText: string;
  winText: string;
  demoType: "route" | "catch" | "quest" | "memory" | "mindcare";
}

interface GameTutorialModalProps {
  isOpen: boolean;
  config: TutorialConfig;
  onComplete: () => void;
  onClose?: () => void;
}

export default function GameTutorialModal({
  isOpen,
  config,
  onComplete,
  onClose,
}: GameTutorialModalProps) {
  const [triedAction, setTriedAction] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setTriedAction(false);
      setDemoStep(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleActionSuccess = () => {
    if (!triedAction) {
      sounds.playCollect();
      setTriedAction(true);
    }
  };

  const handleStart = () => {
    sounds.playClick();
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(`kn_tut_${config.gameId}`, "true");
      } catch {}
    }
    onComplete();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#161722] border-2 border-white/15 rounded-3xl p-4 sm:p-6 text-white space-y-3.5 sm:space-y-4 shadow-2xl overflow-y-auto max-h-[92vh] flex flex-col justify-between my-auto">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/20 border border-accent/40 text-accent-light text-[10px] font-mono font-medium mb-1">
              <HelpCircle className="w-3 h-3 text-accent" />
              <span>Interactive Tutorial · 10-Second Guide</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
              {config.gameTitle}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-amber-300 font-bold mt-0.5">
              🎯 GOAL: {config.objective}
            </p>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer shrink-0"
              title="Close Tutorial"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 4 Clear Visual Rules */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-accent-light font-bold block">🎮 CONTROLS</span>
            <span className="text-white/80 line-clamp-2">{config.controlText}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[10px] text-emerald-400 font-bold block">🎯 WHAT TO DO</span>
            <span className="text-white/80 line-clamp-2">{config.doText}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <span className="text-[10px] text-rose-400 font-bold block">⚠️ WHAT TO AVOID</span>
            <span className="text-white/80 line-clamp-2">{config.avoidText}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <span className="text-[10px] text-amber-400 font-bold block">🏆 HOW YOU WIN</span>
            <span className="text-white/80 line-clamp-2">{config.winText}</span>
          </div>
        </div>

        {/* INTERACTIVE PLAYABLE MICRO-SANDBOX */}
        <div className="w-full bg-black/50 border border-white/10 rounded-2xl p-3 flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden">
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 absolute top-2 left-3">
            Interactive Test: {triedAction ? "✓ Action Verified!" : "Try It Below"}
          </span>

          {/* Route Runner Micro-Demo */}
          {config.demoType === "route" && (
            <div className="flex flex-col items-center gap-2 pt-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-7 rounded-md bg-blue-600 border border-blue-400 flex items-center justify-center text-[10px] font-mono transition-transform duration-300 ${
                    triedAction ? "translate-x-12" : "animate-pulse"
                  }`}
                >
                  🚐
                </div>
                <div className="text-lg">➔</div>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-sm animate-bounce">
                  📦
                </div>
              </div>

              {!triedAction ? (
                <button
                  type="button"
                  onClick={handleActionSuccess}
                  className="mt-1 px-4 py-1.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-mono text-xs font-bold cursor-pointer animate-pulse"
                >
                  Tap to Steer into Delivery Road →
                </button>
              ) : (
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  Nice! Parcel delivered. You understand the route control!
                </span>
              )}
            </div>
          )}

          {/* Catch the Data Micro-Demo */}
          {config.demoType === "catch" && (
            <div className="flex flex-col items-center gap-2 pt-4">
              <div className="relative w-48 h-14 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                {!triedAction ? (
                  <button
                    type="button"
                    onClick={handleActionSuccess}
                    className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-xs animate-ping cursor-pointer"
                    title="Tap this green target data"
                  >
                    ✦
                  </button>
                ) : (
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    +100 Target Captured! Combo Multiplier Activated!
                  </span>
                )}
              </div>
              {!triedAction && (
                <span className="text-[11px] font-mono text-white/70">
                  Tap or click the green target node above!
                </span>
              )}
            </div>
          )}

          {/* Portfolio Quest Micro-Demo */}
          {config.demoType === "quest" && (
            <div className="flex flex-col items-center gap-2 pt-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full bg-blue-600 border border-white flex items-center justify-center text-xs transition-transform duration-300 ${
                    triedAction ? "translate-x-10" : "animate-bounce"
                  }`}
                >
                  🧑
                </div>
                <div className="text-sm">➔</div>
                <div className="w-9 h-9 rounded-xl bg-accent/20 border border-accent flex items-center justify-center text-base">
                  🏛️
                </div>
              </div>
              {!triedAction ? (
                <button
                  type="button"
                  onClick={handleActionSuccess}
                  className="mt-1 px-4 py-1.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-mono text-xs font-bold cursor-pointer"
                >
                  Tap to Walk to Pavilion &amp; Inspect [E]
                </button>
              ) : (
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  Pavilion Reached! Milestones will open in rich detail.
                </span>
              )}
            </div>
          )}

          {/* Memory Micro-Demo */}
          {config.demoType === "memory" && (
            <div className="flex flex-col items-center gap-2 pt-4">
              <div className="flex items-center gap-3">
                <div
                  onClick={() => setDemoStep(1)}
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center text-lg cursor-pointer transition-all ${
                    demoStep >= 1 ? "bg-emerald-600 border-emerald-400" : "bg-white/10 border-white/20"
                  }`}
                >
                  {demoStep >= 1 ? "🌱" : "KN"}
                </div>
                <div
                  onClick={() => {
                    if (demoStep >= 1) handleActionSuccess();
                  }}
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center text-lg cursor-pointer transition-all ${
                    triedAction ? "bg-emerald-600 border-emerald-400" : "bg-white/10 border-white/20"
                  }`}
                >
                  {triedAction ? "🌱" : "KN"}
                </div>
              </div>
              {!triedAction ? (
                <span className="text-[11px] font-mono text-amber-300">
                  Click card 1, then card 2 to match the pair!
                </span>
              ) : (
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  Perfect Match! Pairs stay open &amp; rapid combos chain!
                </span>
              )}
            </div>
          )}

          {/* MindCare Micro-Demo */}
          {config.demoType === "mindcare" && (
            <div className="flex flex-col items-center gap-2 pt-4">
              <div className="flex items-center gap-4 text-2xl">
                <button
                  type="button"
                  onClick={handleActionSuccess}
                  className="p-2 rounded-xl bg-white/10 hover:bg-accent/30 border border-white/20 transition-all cursor-pointer"
                  title="Sip warm tea"
                >
                  ☕
                </button>
                <button
                  type="button"
                  onClick={handleActionSuccess}
                  className="p-2 rounded-xl bg-white/10 hover:bg-accent/30 border border-white/20 transition-all cursor-pointer"
                  title="Water monstera"
                >
                  🪴
                </button>
                <button
                  type="button"
                  onClick={handleActionSuccess}
                  className="p-2 rounded-xl bg-white/10 hover:bg-accent/30 border border-white/20 transition-all cursor-pointer"
                  title="Gaze out window"
                >
                  ☀️
                </button>
              </div>
              {!triedAction ? (
                <span className="text-[11px] font-mono text-white/70">
                  Tap any object above to test how the room reacts!
                </span>
              ) : (
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  Energy &amp; Clarity boosted! Your choices shape 4 endings.
                </span>
              )}
            </div>
          )}
        </div>

        {/* Bottom Action Button */}
        <div className="w-full flex items-center justify-between gap-3 pt-2 border-t border-white/10">
          <span className="text-[11px] font-mono text-white/50">
            {triedAction ? "Ready to play!" : "You can try or start right away:"}
          </span>

          <button
            type="button"
            onClick={handleStart}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent to-emerald-600 hover:from-accent-hover hover:to-emerald-500 text-white font-mono font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-accent/20 cursor-pointer transition-all active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>START GAME NOW</span>
          </button>
        </div>
      </div>
    </div>
  );
}
