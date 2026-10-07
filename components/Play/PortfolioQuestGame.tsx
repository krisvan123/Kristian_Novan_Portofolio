"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2, Compass, ExternalLink, ArrowUp, ArrowDown, ArrowLeft as LeftIcon, ArrowRight as RightIcon } from "lucide-react";
import { sounds } from "./SoundEffects";

interface Landmark {
  id: string;
  name: string;
  emoji: string;
  x: number; // percentage 0 to 100
  y: number; // percentage 0 to 100
  sectionId: string;
  description: string;
  tag: string;
  discovered: boolean;
}

const INITIAL_LANDMARKS: Landmark[] = [
  {
    id: "projects",
    name: "Projects Pavilion",
    emoji: "💻",
    x: 25,
    y: 28,
    sectionId: "projects",
    description: "Coursework builds, regression models, NLP analyzers, and optimization systems.",
    tag: "Selected Work",
    discovered: false,
  },
  {
    id: "ai",
    name: "Intelligent Systems Lab",
    emoji: "🧠",
    x: 75,
    y: 26,
    sectionId: "skills",
    description: "Machine Learning, Computer Vision, and Computational Biology research explorations.",
    tag: "AI Specialization",
    discovered: false,
  },
  {
    id: "activities",
    name: "Volunteer & Stage Garden",
    emoji: "🌻",
    x: 20,
    y: 72,
    sectionId: "activities",
    description: "Master of Ceremony stage moderation and WALUBI humanitarian volunteer service.",
    tag: "Campus Life",
    discovered: false,
  },
  {
    id: "design",
    name: "UI/UX Design Studio",
    emoji: "🎨",
    x: 78,
    y: 74,
    sectionId: "projects",
    description: "Human-Computer Interaction studies, user journey mapping, and Figma prototypes.",
    tag: "Interface Craft",
    discovered: false,
  },
  {
    id: "certificates",
    name: "Credentials Arch",
    emoji: "📜",
    x: 50,
    y: 48,
    sectionId: "certificates",
    description: "Peer-reviewed ICORIS research paper, CompFest AIC Top 41, and Azure AI credentials.",
    tag: "Verified Milestones",
    discovered: false,
  },
];

export default function PortfolioQuestGame() {
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 78 }); // player start at bottom center
  const [landmarks, setLandmarks] = useState<Landmark[]>(INITIAL_LANDMARKS);
  const [activeLandmark, setActiveLandmark] = useState<Landmark | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [facing, setFacing] = useState<"left" | "right">("right");
  const [isWalking, setIsWalking] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const moveStep = 4.5; // percentage per step

  const handleToggleMute = () => {
    const next = sounds.toggleMute();
    setIsMuted(next);
  };

  // Move player logic
  const movePlayer = (dx: number, dy: number) => {
    setIsWalking(true);
    setTimeout(() => setIsWalking(false), 200);

    if (dx < 0) setFacing("left");
    if (dx > 0) setFacing("right");

    setPlayerPos((prev) => {
      const nextX = Math.max(8, Math.min(92, prev.x + dx));
      const nextY = Math.max(12, Math.min(88, prev.y + dy));
      return { x: nextX, y: nextY };
    });
  };

  // Check proximity to landmarks
  useEffect(() => {
    const proximityThreshold = 13; // 13% distance
    let nearby: Landmark | null = null;

    landmarks.forEach((lm) => {
      const dist = Math.hypot(playerPos.x - lm.x, playerPos.y - lm.y);
      if (dist < proximityThreshold) {
        nearby = lm;
      }
    });

    if (nearby && !(nearby as Landmark).discovered) {
      sounds.playSuccess();
      const updated = landmarks.map((l) =>
        l.id === (nearby as Landmark).id ? { ...l, discovered: true } : l
      );
      setLandmarks(updated);

      // Check if all discovered
      if (updated.every((l) => l.discovered)) {
        sounds.playVictory();
        setIsCompleted(true);
      }
    }

    setActiveLandmark(nearby);
  }, [playerPos, landmarks]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") return;

      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        movePlayer(0, -moveStep);
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        movePlayer(0, moveStep);
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        movePlayer(-moveStep, 0);
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        movePlayer(moveStep, 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const discoveredCount = landmarks.filter((l) => l.discovered).length;

  const resetQuest = () => {
    setPlayerPos({ x: 50, y: 78 });
    setLandmarks(INITIAL_LANDMARKS);
    setActiveLandmark(null);
    setIsCompleted(false);
    sounds.playClick();
  };

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
          <div className="text-xs font-mono text-charcoal-soft">
            Explored: <span className="font-semibold text-accent">{discoveredCount}</span> / {landmarks.length}
          </div>
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

      {/* Main Quest Canvas */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[400px] rounded-3xl bg-[#FAF7EE] dark:bg-[#161514] border border-surface-border overflow-hidden shadow-sm flex flex-col justify-between p-4 sm:p-6 select-none"
      >
        {/* Subtle stone path tiles */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle, #D8CFBD 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Decorative Trees & Hills */}
        <div className="absolute top-6 left-8 text-2xl opacity-75 pointer-events-none animate-float-gentle">🌳</div>
        <div className="absolute top-10 right-12 text-2xl opacity-75 pointer-events-none animate-float-gentle" style={{ animationDelay: "1.2s" }}>🌲</div>
        <div className="absolute bottom-8 left-14 text-2xl opacity-75 pointer-events-none animate-float-gentle" style={{ animationDelay: "2.4s" }}>🌸</div>
        <div className="absolute bottom-12 right-16 text-2xl opacity-75 pointer-events-none animate-float-gentle" style={{ animationDelay: "0.8s" }}>🌿</div>

        {/* Interactive Landmarks */}
        {landmarks.map((lm) => (
          <div
            key={lm.id}
            style={{
              left: `${lm.x}%`,
              top: `${lm.y}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
            onClick={() => {
              // Click to move toward landmark
              setPlayerPos({ x: lm.x, y: lm.y });
            }}
          >
            {/* Pulsing beacon ring if discovered */}
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl border transition-all duration-300 ${
                lm.discovered
                  ? "bg-emerald-100 dark:bg-emerald-950/70 border-emerald-400/80 shadow-md scale-105"
                  : "bg-white/90 dark:bg-canvas-card-dark/90 border-surface-border shadow-2xs group-hover:scale-110"
              }`}
            >
              <span>{lm.emoji}</span>
            </div>

            <span className="text-[11px] font-display font-semibold text-charcoal bg-white/90 dark:bg-canvas-card-dark/90 px-2 py-0.5 rounded-md border border-surface-border mt-1 shadow-2xs whitespace-nowrap">
              {lm.name}
            </span>
          </div>
        ))}

        {/* Player Character */}
        <div
          style={{
            left: `${playerPos.x}%`,
            top: `${playerPos.y}%`,
            transition: "left 140ms ease-out, top 140ms ease-out",
          }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex flex-col items-center ${
            isWalking ? "animate-bounce" : ""
          }`}
        >
          {/* Hand-drawn style avatar */}
          <div className="relative">
            {/* Backpack */}
            <div className={`absolute top-2 w-3 h-4 bg-[#2D5A43] rounded-xs ${facing === "right" ? "-left-2" : "-right-2"}`} />
            {/* Character body */}
            <div className="w-8 h-10 rounded-full bg-[#3B82F6] border-2 border-[#1E3A8A] flex flex-col items-center justify-between p-0.5 shadow-md">
              {/* Head / cap */}
              <div className="w-4 h-4 rounded-full bg-[#FED7AA] border border-[#EA580C] mt-0.5" />
              {/* Shoes */}
              <div className="flex gap-1 mb-0.5">
                <div className="w-1.5 h-1 bg-[#1E293B] rounded-full" />
                <div className="w-1.5 h-1 bg-[#1E293B] rounded-full" />
              </div>
            </div>
          </div>
          <span className="text-[9px] font-mono font-semibold px-1 rounded bg-black/60 text-white mt-0.5">
            You
          </span>
        </div>

        {/* Top Header Objective */}
        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-canvas-card-dark/90 border border-surface-border shadow-2xs text-xs font-mono">
            <Compass className="w-3.5 h-3.5 text-accent animate-spin" style={{ animationDuration: "12s" }} />
            <span>Walk around to discover 5 portfolio landmarks</span>
          </div>
        </div>

        {/* Landmark Info Dialogue Popover */}
        {activeLandmark && !isCompleted && (
          <div className="relative z-10 mx-auto max-w-md w-full bg-white/95 dark:bg-canvas-card-dark/95 backdrop-blur-xs p-4 rounded-2xl border border-surface-border shadow-xl animate-fade-in-up flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">{activeLandmark.emoji}</span>
                <h4 className="text-sm font-display font-semibold text-charcoal">
                  {activeLandmark.name}
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent-light dark:bg-accent-soft text-accent dark:text-accent-dark font-medium">
                  {activeLandmark.tag}
                </span>
              </div>
              <p className="text-xs text-charcoal-muted font-sans leading-relaxed">
                {activeLandmark.description}
              </p>
            </div>

            <Link
              href={`/#${activeLandmark.sectionId}`}
              className="shrink-0 p-2 rounded-xl bg-canvas-subtle hover:bg-accent hover:text-white border border-surface-border text-charcoal text-xs font-mono transition-colors flex items-center gap-1 shadow-2xs"
              title="Visit section in portfolio"
            >
              <span>Explore</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        )}

        {/* Quest Complete Screen */}
        {isCompleted && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-30 animate-fade-in-up">
            <div className="bg-white dark:bg-canvas-card-dark rounded-3xl border border-surface-border p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <Sparkles className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-xl font-display font-semibold text-charcoal">
                  You Explored the Whole Portfolio!
                </h4>
                <p className="text-xs text-charcoal-muted font-sans mt-1">
                  You discovered all 5 key landmarks across Kristian&apos;s academic, AI, activities, and design journey.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2.5">
                <Link
                  href="/"
                  className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-semibold font-display shadow-xs transition-colors"
                >
                  Back to Portfolio
                </Link>
                <button
                  type="button"
                  onClick={resetQuest}
                  className="px-4 py-2.5 rounded-xl border border-surface-border bg-canvas-subtle hover:bg-white text-charcoal text-xs font-mono transition-colors cursor-pointer"
                >
                  Restart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* On-Screen Mobile Virtual Controls & Instructions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-canvas-card-dark border border-surface-border shadow-2xs">
        <div className="text-xs font-mono text-charcoal-soft space-y-1">
          <div>Desktop: Use Arrow keys or WASD to walk</div>
          <div>Mobile: Tap on-screen directional buttons or tap any landmark directly</div>
        </div>

        {/* Virtual Directional D-Pad */}
        <div className="flex flex-col items-center gap-1">
          <button
            type="button"
            onClick={() => movePlayer(0, -moveStep)}
            className="w-10 h-10 rounded-xl bg-canvas-subtle border border-surface-border flex items-center justify-center active:bg-accent active:text-white transition-colors cursor-pointer"
            aria-label="Walk Up"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => movePlayer(-moveStep, 0)}
              className="w-10 h-10 rounded-xl bg-canvas-subtle border border-surface-border flex items-center justify-center active:bg-accent active:text-white transition-colors cursor-pointer"
              aria-label="Walk Left"
            >
              <LeftIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => movePlayer(0, moveStep)}
              className="w-10 h-10 rounded-xl bg-canvas-subtle border border-surface-border flex items-center justify-center active:bg-accent active:text-white transition-colors cursor-pointer"
              aria-label="Walk Down"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => movePlayer(moveStep, 0)}
              className="w-10 h-10 rounded-xl bg-canvas-subtle border border-surface-border flex items-center justify-center active:bg-accent active:text-white transition-colors cursor-pointer"
              aria-label="Walk Right"
            >
              <RightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
