"use client";

import React from "react";
import { Zap, Clock, Shield, Fuel, Heart, Award, Flame } from "lucide-react";

export interface GameHUDProps {
  score: number;
  combo?: number;
  objective?: string;
  level?: number;
  maxLevel?: number;
  timeRemaining?: number; // seconds
  health?: number; // percentage 0 to 100
  fuel?: number; // percentage 0 to 100
  secondaryMetric?: {
    label: string;
    value: string | number;
    icon?: React.ReactNode;
  };
  feedbackPopups?: Array<{ id: string; text: string; color?: string; x?: number; y?: number }>;
  onOpenTutorial?: () => void;
}

export default function GameHUD({
  score,
  combo = 1,
  objective,
  level,
  maxLevel,
  timeRemaining,
  health,
  fuel,
  secondaryMetric,
  feedbackPopups = [],
  onOpenTutorial,
}: GameHUDProps) {
  const formatTime = (secs?: number) => {
    if (secs === undefined) return "--:--";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="absolute inset-x-0 top-0 p-3 sm:p-4 pointer-events-none z-20 flex flex-col justify-between">
      {/* Top HUD Row */}
      <div className="flex items-center justify-between gap-2">
        {/* Left: Score & Combo */}
        <div className="flex items-center gap-2">
          {/* Score Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-lg pointer-events-auto">
            <Award className="w-4 h-4 text-amber-400" />
            <div className="flex flex-col">
              <span className="text-[9px] font-mono tracking-wider uppercase text-white/50">Score</span>
              <span className="font-mono font-bold text-sm sm:text-base leading-none text-amber-300">
                {score.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Combo Multiplier */}
          {combo > 1 && (
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-orange-500/20 backdrop-blur-md border border-orange-500/40 text-orange-400 shadow-lg animate-pulse pointer-events-auto">
              <Flame className="w-4 h-4" />
              <span className="font-mono font-extrabold text-xs sm:text-sm">x{combo}</span>
            </div>
          )}

          {/* Level Badge if available */}
          {level !== undefined && (
            <div className="hidden sm:flex items-center px-2.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-mono">
              <span>LVL {level}{maxLevel ? `/${maxLevel}` : ""}</span>
            </div>
          )}
        </div>

        {/* Center: Objective Pill */}
        {objective && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/90 text-xs font-mono max-w-xs sm:max-w-md truncate shadow-md pointer-events-auto">
            <Zap className="w-3.5 h-3.5 text-accent shrink-0" />
            <span className="truncate font-semibold">{objective}</span>
            {onOpenTutorial && (
              <button
                type="button"
                onClick={onOpenTutorial}
                className="ml-1 px-1.5 py-0.5 rounded-md bg-white/15 hover:bg-accent text-[10px] font-bold text-white transition-colors cursor-pointer"
                title="View How to Play Tutorial"
              >
                ? Guide
              </button>
            )}
          </div>
        )}

        {/* Right: Health / Fuel / Timer / Secondary */}
        <div className="flex items-center gap-2">
          {/* Timer Display */}
          {timeRemaining !== undefined && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-lg font-mono">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span className={`text-xs sm:text-sm font-bold ${timeRemaining <= 10 ? "text-red-400 animate-pulse" : "text-white"}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          )}

          {/* Health / Shield Bar */}
          {health !== undefined && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-lg">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <div className="w-16 sm:w-20 h-2 bg-white/10 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-rose-500 to-emerald-400"
                  style={{ width: `${Math.max(0, Math.min(100, health))}%` }}
                />
              </div>
            </div>
          )}

          {/* Fuel Bar */}
          {fuel !== undefined && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-lg">
              <Fuel className="w-3.5 h-3.5 text-amber-400" />
              <div className="w-16 sm:w-20 h-2 bg-white/10 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${fuel < 25 ? "bg-red-500 animate-pulse" : "bg-amber-400"}`}
                  style={{ width: `${Math.max(0, Math.min(100, fuel))}%` }}
                />
              </div>
            </div>
          )}

          {/* Secondary Metric */}
          {secondaryMetric && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-lg font-mono text-xs">
              {secondaryMetric.icon}
              <span className="text-white/60">{secondaryMetric.label}:</span>
              <span className="font-bold text-white">{secondaryMetric.value}</span>
            </div>
          )}
        </div>
      </div>

      {/* Floating feedback animations */}
      <div className="relative w-full h-12 pointer-events-none overflow-visible">
        {feedbackPopups.map((popup) => (
          <div
            key={popup.id}
            className="absolute left-1/2 -translate-x-1/2 font-mono font-black text-sm sm:text-base pointer-events-none drop-shadow-md animate-bounce"
            style={{
              color: popup.color || "#FBBF24",
              top: popup.y ? `${popup.y}px` : "10px",
            }}
          >
            {popup.text}
          </div>
        ))}
      </div>
    </div>
  );
}
