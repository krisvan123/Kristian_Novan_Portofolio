"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { sounds } from "./SoundEffects";

interface DataPoint {
  id: number;
  x: number; // percentage 5% to 95%
  y: number; // percentage 10% to 85%
  vx: number;
  vy: number;
  cluster: "A" | "B" | "Noise";
  size: number;
  shape: "circle" | "diamond" | "triangle";
  isSelected: boolean;
  isError: boolean;
}

interface LevelConfig {
  level: number;
  title: string;
  targetCluster: "A" | "B";
  targetDescription: string;
  totalPoints: number;
  targetCount: number;
}

const LEVELS: LevelConfig[] = [
  {
    level: 1,
    title: "Linear Feature Separation",
    targetCluster: "A",
    targetDescription: "Classify all Emerald Circular points (Cluster A: High Affinity)",
    totalPoints: 12,
    targetCount: 5,
  },
  {
    level: 2,
    title: "Feature Boundary Overlap",
    targetCluster: "B",
    targetDescription: "Isolate Diamond Amber points (Cluster B: Transient Signals)",
    totalPoints: 16,
    targetCount: 6,
  },
  {
    level: 3,
    title: "Noisy Latent Distribution",
    targetCluster: "A",
    targetDescription: "Identify Target Points (Cluster A) amidst noisy boundary outliers",
    totalPoints: 20,
    targetCount: 7,
  },
];

export default function CatchDataGame() {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [points, setPoints] = useState<DataPoint[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const currentLevel = LEVELS[currentLevelIdx];
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  const handleToggleMute = () => {
    const next = sounds.toggleMute();
    setIsMuted(next);
  };

  // Generate dataset for active level
  const generateLevelPoints = (lvl: LevelConfig) => {
    const newPoints: DataPoint[] = [];

    // Target points
    for (let i = 0; i < lvl.targetCount; i++) {
      newPoints.push({
        id: i,
        x: 15 + Math.random() * 70,
        y: 18 + Math.random() * 64,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        cluster: lvl.targetCluster,
        size: 16 + Math.random() * 6,
        shape: lvl.targetCluster === "A" ? "circle" : "diamond",
        isSelected: false,
        isError: false,
      });
    }

    // Distractor points
    const distractorCount = lvl.totalPoints - lvl.targetCount;
    for (let i = 0; i < distractorCount; i++) {
      const isNoise = lvl.level === 3 && i % 2 === 0;
      const clusterType = isNoise ? "Noise" : lvl.targetCluster === "A" ? "B" : "A";
      newPoints.push({
        id: lvl.targetCount + i,
        x: 10 + Math.random() * 80,
        y: 15 + Math.random() * 70,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        cluster: clusterType,
        size: 14 + Math.random() * 6,
        shape: clusterType === "A" ? "circle" : clusterType === "B" ? "diamond" : "triangle",
        isSelected: false,
        isError: false,
      });
    }

    // Shuffle
    return newPoints.sort(() => Math.random() - 0.5);
  };

  const startLevel = (idx: number) => {
    setCurrentLevelIdx(idx);
    setCorrectCount(0);
    setErrorCount(0);
    setIsLevelComplete(false);
    setPoints(generateLevelPoints(LEVELS[idx]));
  };

  useEffect(() => {
    startLevel(0);
  }, []);

  // Float animation physics loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min(32, time - lastTime);
      lastTime = time;

      setPoints((prevPoints) =>
        prevPoints.map((pt) => {
          let nextX = pt.x + pt.vx * (dt / 16);
          let nextY = pt.y + pt.vy * (dt / 16);
          let vx = pt.vx;
          let vy = pt.vy;

          if (nextX < 6 || nextX > 94) vx = -vx;
          if (nextY < 8 || nextY > 88) vy = -vy;

          return {
            ...pt,
            x: Math.max(5, Math.min(95, nextX)),
            y: Math.max(6, Math.min(90, nextY)),
            vx,
            vy,
          };
        })
      );

      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  // Click point to classify
  const handlePointClick = (pt: DataPoint) => {
    if (isLevelComplete || pt.isSelected) return;

    if (pt.cluster === currentLevel.targetCluster) {
      // Correct!
      sounds.playSuccess();
      const nextCorrect = correctCount + 1;
      setCorrectCount(nextCorrect);

      setPoints((prev) =>
        prev.map((p) => (p.id === pt.id ? { ...p, isSelected: true, isError: false } : p))
      );

      if (nextCorrect >= currentLevel.targetCount) {
        sounds.playVictory();
        setIsLevelComplete(true);
      }
    } else {
      // Incorrect!
      sounds.playMiss();
      setErrorCount((prev) => prev + 1);

      setPoints((prev) =>
        prev.map((p) => (p.id === pt.id ? { ...p, isError: true } : p))
      );

      setTimeout(() => {
        setPoints((prev) =>
          prev.map((p) => (p.id === pt.id ? { ...p, isError: false } : p))
        );
      }, 500);
    }
  };

  const accuracy =
    correctCount + errorCount > 0
      ? Math.max(0, Math.round((correctCount / (correctCount + errorCount)) * 100))
      : 100;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Top Controls */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-canvas-card-dark border border-surface-border shadow-2xs">
        <Link
          href="/play"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-charcoal-soft hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Play</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-accent-light dark:bg-accent-soft text-accent dark:text-accent-dark font-medium border border-accent-border/60">
            Level {currentLevel.level} / {LEVELS.length}
          </span>
          <button
            type="button"
            onClick={handleToggleMute}
            className="p-1.5 rounded-lg border border-surface-border text-charcoal-soft hover:text-accent hover:bg-canvas-subtle transition-colors cursor-pointer"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-accent" />}
          </button>
        </div>
      </div>

      {/* Level Target Mission Card */}
      <div className="p-4 rounded-2xl bg-white dark:bg-canvas-card-dark border border-surface-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <h3 className="text-sm font-display font-semibold text-charcoal">
              {currentLevel.title}
            </h3>
          </div>
          <p className="text-xs text-charcoal-muted font-sans mt-0.5">
            {currentLevel.targetDescription}
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-charcoal-soft shrink-0">
          <div>
            Target: <span className="font-semibold text-charcoal">{correctCount}</span> / {currentLevel.targetCount}
          </div>
          <div className="w-[1px] h-3.5 bg-surface-border" />
          <div>
            Accuracy: <span className="font-semibold text-accent">{accuracy}%</span>
          </div>
        </div>
      </div>

      {/* Interactive 2D Data Field */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[380px] rounded-3xl bg-[#FAF9F5] dark:bg-[#141416] border border-surface-border overflow-hidden shadow-inner flex items-center justify-center select-none"
      >
        {/* Subtle coordinate grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(to right, #E2DDD3 1px, transparent 1px), linear-gradient(to bottom, #E2DDD3 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Ambient Center Cluster Reference Boundary */}
        <div className="absolute inset-16 rounded-full border border-dashed border-charcoal/10 dark:border-white/5 pointer-events-none" />

        {/* Floating Data Points */}
        {points.map((pt) => {
          const isTarget = pt.cluster === currentLevel.targetCluster;

          return (
            <button
              key={pt.id}
              type="button"
              onClick={() => handlePointClick(pt)}
              style={{
                left: `${pt.x}%`,
                top: `${pt.y}%`,
                width: `${pt.size * 2}px`,
                height: `${pt.size * 2}px`,
              }}
              aria-label={`Data point ${pt.id}`}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-transform duration-200 cursor-pointer focus:outline-none ${
                pt.isSelected
                  ? "scale-125 pointer-events-none ring-4 ring-emerald-400/40 bg-emerald-500 shadow-lg"
                  : pt.isError
                  ? "animate-bounce scale-110 ring-4 ring-rose-500/50 bg-rose-500"
                  : "hover:scale-125 active:scale-95"
              }`}
            >
              {pt.shape === "circle" ? (
                <div
                  className={`w-full h-full rounded-full transition-colors border-2 ${
                    pt.isSelected
                      ? "bg-emerald-500 border-white"
                      : isTarget
                      ? "bg-[#2D5A43] dark:bg-[#488A68] border-[#1D3C2C] dark:border-[#86EFAC] shadow-xs"
                      : "bg-indigo-600/70 border-indigo-900"
                  }`}
                />
              ) : pt.shape === "diamond" ? (
                <div
                  className={`w-4/5 h-4/5 rotate-45 transition-colors border-2 ${
                    pt.isSelected
                      ? "bg-emerald-500 border-white"
                      : isTarget
                      ? "bg-amber-500 border-amber-800 dark:border-amber-300 shadow-xs"
                      : "bg-slate-400 border-slate-700"
                  }`}
                />
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center text-[10px] font-mono ${
                    pt.isSelected ? "text-white" : "text-neutral-500"
                  }`}
                >
                  ▲
                </div>
              )}
            </button>
          );
        })}

        {/* Level Complete Modal */}
        {isLevelComplete && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-20 animate-fade-in-up">
            <div className="bg-white dark:bg-canvas-card-dark rounded-2xl border border-surface-border p-6 max-w-sm w-full text-center space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-lg font-display font-semibold text-charcoal">
                  Classification Complete!
                </h4>
                <p className="text-xs text-charcoal-muted font-sans mt-1">
                  You successfully isolated Cluster {currentLevel.targetCluster} with {accuracy}% accuracy.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2">
                {currentLevelIdx < LEVELS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => startLevel(currentLevelIdx + 1)}
                    className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-semibold font-display shadow-xs transition-colors cursor-pointer"
                  >
                    Next Level →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => startLevel(0)}
                    className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-semibold font-display shadow-xs transition-colors cursor-pointer"
                  >
                    Play Again
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => startLevel(currentLevelIdx)}
                  className="px-4 py-2.5 rounded-xl border border-surface-border bg-canvas-subtle hover:bg-white text-charcoal text-xs font-mono transition-colors cursor-pointer"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Explanatory footer note */}
      <div className="text-center text-xs text-charcoal-soft font-mono">
        Tap floating points to categorize • Real-time clustering simulation
      </div>
    </div>
  );
}
