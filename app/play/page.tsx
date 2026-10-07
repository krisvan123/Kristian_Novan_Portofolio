"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Trophy, Calendar, CheckCircle2, ChevronRight, Award, Flame } from "lucide-react";
import GameCard from "@/components/Play/GameCard";
import { gameStorage, ALL_ACHIEVEMENTS, getDailyChallenge, DailyChallenge, Achievement } from "@/lib/gameStorage";

export default function PlayPage() {
  const [totalStars, setTotalStars] = useState(0);
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge | null>(null);
  const [isDailyDone, setIsDailyDone] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    setTotalStars(gameStorage.getStarsCount());
    const challenge = getDailyChallenge();
    setDailyChallenge(challenge);
    setIsDailyDone(gameStorage.isDailyCompleted(challenge.dateKey));
    setUnlockedAchievements(gameStorage.getUnlockedAchievements());
  }, []);

  const filteredAchievements = ALL_ACHIEVEMENTS.filter((ach) => {
    if (selectedCategory === "all") return true;
    return ach.gameId === selectedCategory;
  });

  return (
    <div className="min-h-screen pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12 space-y-12 md:space-y-16">
        {/* Back Link & Header Row */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-charcoal-soft hover:text-accent transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Portfolio</span>
          </Link>

          {/* Global Stars Tracker */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 font-mono text-xs shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-bold">{totalStars} / 50</span>
            <span className="text-[10px] opacity-75">Stars</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-light dark:bg-accent-soft text-accent dark:text-accent-dark text-[11px] font-mono font-medium border border-accent-border/60">
            <Flame className="w-3.5 h-3.5" />
            <span>Interactive Arcade & Experiments</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-semibold tracking-tight text-charcoal">
            Play
          </h1>

          <p className="text-base sm:text-lg text-charcoal-muted max-w-2xl font-sans leading-relaxed">
            Five interactive indie browser games built around algorithms, machine learning, 2D RPG exploration, memory recall, and mindful decision making. Real game loops, win/loss states, and secrets to uncover.
          </p>
        </div>

        {/* Daily Challenge Banner */}
        {dailyChallenge && (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent/10 via-amber-500/10 to-transparent border border-accent-border/60 p-6 sm:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-accent dark:text-accent-dark uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5" />
                    Today's Daily Challenge
                  </span>
                  {isDailyDone ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      Completed (+5 ⭐)
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 text-[10px] font-mono font-bold">
                      +{dailyChallenge.rewardStars} Stars Reward
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-charcoal">
                  {dailyChallenge.title}
                </h3>

                <p className="text-xs sm:text-sm text-charcoal-muted max-w-xl font-sans">
                  {dailyChallenge.description}
                </p>
              </div>

              <Link
                href={`/play/${dailyChallenge.gameId}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-mono font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer"
              >
                <span>Play Challenge</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* FEATURED GAME: Route Runner */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-charcoal-soft font-semibold block">
              Featured Optimization Game
            </span>
          </div>

          <GameCard
            slug="route-runner"
            title="Route Runner"
            badge="Top-Down Logistics"
            description="Choose roads, avoid traffic, and deliver every package before you run out of fuel."
            tagline="Dynamic Traffic · Refuel Depots · Rooftop Easter Egg"
            isFeatured={true}
            preview={
              <div className="relative w-full h-full flex flex-col items-center justify-center select-none p-4">
                <svg viewBox="0 0 320 180" className="w-full h-full max-h-52 drop-shadow-md">
                  {/* City blocks */}
                  <rect x="20" y="20" width="120" height="60" rx="8" fill="#1e2230" stroke="#33394a" strokeWidth="2" />
                  <rect x="180" y="20" width="120" height="60" rx="8" fill="#1e2230" stroke="#33394a" strokeWidth="2" />
                  <rect x="20" y="100" width="120" height="60" rx="8" fill="#1e2230" stroke="#33394a" strokeWidth="2" />
                  <rect x="180" y="100" width="120" height="60" rx="8" fill="#1e2230" stroke="#33394a" strokeWidth="2" />

                  {/* Block decor */}
                  <text x="80" y="55" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">DEPOT A</text>
                  <text x="240" y="55" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">AI LAB</text>
                  <text x="80" y="135" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">DEPOT B</text>
                  <text x="240" y="135" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">CLIENT HUB</text>

                  {/* Asphalt road lines */}
                  <line x1="0" y1="90" x2="320" y2="90" stroke="#FBBF24" strokeWidth="2" strokeDasharray="6 6" />
                  <line x1="160" y1="0" x2="160" y2="180" stroke="#FBBF24" strokeWidth="2" strokeDasharray="6 6" />

                  {/* Intersection Signal */}
                  <circle cx="160" cy="90" r="11" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <circle cx="160" cy="90" r="5" fill="#10B981" className="animate-pulse" />

                  {/* Delivery pin target */}
                  <circle cx="255" cy="90" r="14" fill="#3B82F6" opacity="0.25" className="animate-ping" />
                  <circle cx="255" cy="90" r="7" fill="#3B82F6" />
                  <text x="255" y="93" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">📦</text>

                  {/* Fuel Depot marker */}
                  <circle cx="65" cy="90" r="8" fill="#10B981" opacity="0.3" />
                  <text x="65" y="93" fill="#10B981" fontSize="9" fontWeight="bold" textAnchor="middle">⛽</text>

                  {/* Player Delivery Van with headlight beam */}
                  <g className="animate-bounce" transform="translate(120, 85)">
                    {/* Headlight beam */}
                    <polygon points="14,-4 40,-12 40,12 14,4" fill="#FBBF24" opacity="0.25" />
                    <rect x="-14" y="-8" width="28" height="16" rx="4" fill="#2563EB" stroke="#60A5FA" strokeWidth="1.5" />
                    <rect x="5" y="-6" width="6" height="12" rx="1.5" fill="#93C5FD" />
                    <circle cx="-7" cy="8" r="3" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                    <circle cx="7" cy="8" r="3" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                    <text x="-3" y="4" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="monospace">KN</text>
                  </g>
                </svg>
                <div className="flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs border border-white/10 text-[10px] font-mono text-charcoal-muted">
                  <span>🚗</span>
                  <span>Navigate roads, grab fuel &amp; drop parcels</span>
                </div>
              </div>
            }
          />
        </div>

        {/* 4 MORE EXPERIMENTS GRID */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between pb-2 border-b border-surface-border">
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-charcoal tracking-tight">
              More Mini-Games
            </h2>
            <span className="text-xs font-mono text-charcoal-soft">
              4 interactive games
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Game 02: Catch the Data */}
            <GameCard
              slug="catch-the-data"
              title="Catch the Data"
              badge="ML Stream Arcade"
              description="Move your scanner and collect the right data while avoiding noise."
              tagline="Data Classification · Wave 5 Boss · x5 Combos"
              preview={
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  <div className="relative w-full h-36 rounded-xl bg-[#0c0e14] border border-emerald-500/30 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:14px_14px] opacity-15" />
                    
                    {/* Scanner Reticle */}
                    <div className="w-14 h-14 rounded-full border-2 border-emerald-400/80 flex items-center justify-center animate-pulse">
                      <div className="w-8 h-8 rounded-full border border-dashed border-emerald-300 animate-spin" />
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>

                    {/* Floating Packets */}
                    <div className="absolute top-4 left-6 flex items-center gap-1 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/40 animate-bounce">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-[10px] font-mono text-emerald-300 font-bold">+100</span>
                    </div>

                    <div className="absolute bottom-4 right-8 flex items-center gap-1 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/40 animate-pulse">
                      <span className="text-xs">★</span>
                      <span className="text-[10px] font-mono text-amber-300 font-bold">x3 COMBO</span>
                    </div>

                    <div className="absolute top-5 right-6 w-4 h-4 rotate-45 bg-rose-500/80 border border-rose-300 shadow-sm flex items-center justify-center">
                      <span className="text-[8px] text-white">✕</span>
                    </div>

                    <div className="absolute bottom-5 left-8 w-4 h-4 rounded-full bg-cyan-400/80 border border-cyan-200 animate-pulse flex items-center justify-center">
                      <span className="text-[8px] text-white">⚡</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-charcoal-soft mt-1.5">
                    🎯 Guide reticle over emerald packets · Dodge red spikes
                  </span>
                </div>
              }
            />

            {/* Game 03: Portfolio Quest */}
            <GameCard
              slug="portfolio-quest"
              title="Portfolio Quest"
              badge="2D RPG Adventure"
              description="Explore a tiny world and discover the hidden pieces of Kristian's portfolio."
              tagline="Top-Down RPG · 5 Pavilions · Day/Night Cycle"
              preview={
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  <div className="relative w-full h-36 rounded-xl bg-[#14231b] border border-white/10 flex items-center justify-center overflow-hidden">
                    {/* Walkways */}
                    <div className="absolute inset-y-0 w-12 bg-[#c0b7a4]/80" />
                    <div className="absolute inset-x-0 h-10 bg-[#c0b7a4]/80" />

                    {/* Central Water Fountain */}
                    <div className="relative w-10 h-10 rounded-full bg-sky-500 border-2 border-white/80 z-10 flex items-center justify-center shadow-md">
                      <div className="w-5 h-5 rounded-full bg-sky-200 animate-ping opacity-60" />
                      <span className="absolute text-xs">⛲</span>
                    </div>

                    {/* Milestone Pavilions */}
                    <div className="absolute top-2 left-3 bg-[#1e293b] border border-blue-400/60 px-2 py-0.5 rounded-md text-[9px] font-mono text-blue-300 z-10 shadow-sm flex items-center gap-1">
                      <span>🤖</span>
                      <span>AI Lab</span>
                    </div>

                    <div className="absolute top-2 right-3 bg-[#1e293b] border border-amber-400/60 px-2 py-0.5 rounded-md text-[9px] font-mono text-amber-300 z-10 shadow-sm flex items-center gap-1">
                      <span>🏆</span>
                      <span>CompFest</span>
                    </div>

                    {/* Walking Avatar */}
                    <div className="absolute bottom-3 right-10 flex flex-col items-center z-10 animate-pulse">
                      <div className="w-5 h-7 rounded-md bg-blue-600 border border-white flex flex-col items-center justify-start p-0.5 shadow-md">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-200" />
                      </div>
                      <span className="text-[8px] font-mono text-white bg-black/60 px-1 rounded-sm mt-0.5">KN</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-charcoal-soft mt-1.5">
                    🧭 Walk with WASD/Arrows · Talk to NPCs · Find secret garden
                  </span>
                </div>
              }
            />

            {/* Game 04: Memory of My Journey */}
            <GameCard
              slug="memory"
              title="Memory of My Journey"
              badge="Tactile Card Quest"
              description="Flip, match, and beat the clock."
              tagline="Wax-Seal Flips · Freeze Time · 3 Progressive Levels"
              preview={
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  <div className="w-full h-36 rounded-xl bg-[#11131a] border border-white/10 flex items-center justify-center p-2 overflow-hidden">
                    <div className="grid grid-cols-4 gap-2 w-full max-w-[240px]">
                      {/* Card 1 - Face Up */}
                      <div className="h-12 rounded-lg bg-[#1e2230] border-2 border-emerald-500 flex flex-col items-center justify-center p-1 shadow-sm">
                        <span className="text-sm">🌱</span>
                        <span className="text-[7px] font-mono text-emerald-400 leading-none">ECO</span>
                      </div>
                      {/* Card 2 - Face Up Match */}
                      <div className="h-12 rounded-lg bg-[#1e2230] border-2 border-emerald-500 flex flex-col items-center justify-center p-1 shadow-sm animate-pulse">
                        <span className="text-sm">🌱</span>
                        <span className="text-[7px] font-mono text-emerald-400 leading-none">ECO</span>
                      </div>
                      {/* Card 3 - Face Down Crest */}
                      <div className="h-12 rounded-lg bg-gradient-to-br from-[#272b3b] to-[#171924] border border-white/10 flex flex-col items-center justify-center shadow-xs">
                        <span className="text-[9px] font-mono font-bold text-accent">KN</span>
                      </div>
                      {/* Card 4 - Special Freeze */}
                      <div className="h-12 rounded-lg bg-[#1e2230] border-2 border-cyan-400 flex flex-col items-center justify-center p-1 shadow-sm">
                        <span className="text-sm">⏱️</span>
                        <span className="text-[7px] font-mono text-cyan-300 leading-none">FREEZE</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-charcoal-soft mt-1.5">
                    🃏 Flip cards · Chain fast pairs (&lt;4.5s) for combo bonuses
                  </span>
                </div>
              }
            />

            {/* Game 05: MindCare Choice */}
            <GameCard
              slug="mindcare"
              title="MindCare Choice"
              badge="Cozy Room Simulation"
              description="Explore a small story where your choices change what happens next."
              tagline="Atmospheric Room · Blooming Plant · 4 Narrative Endings"
              preview={
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  <div className="relative w-full h-36 rounded-xl bg-[#14151f] border border-white/10 flex items-center justify-center overflow-hidden">
                    {/* Window with shifting sky */}
                    <div className="w-24 h-20 rounded-t-full bg-gradient-to-b from-rose-400 via-amber-300 to-sky-400 border-2 border-white/20 flex flex-col items-center justify-center shadow-md relative overflow-hidden group">
                      <div className="text-sm animate-pulse">☀️</div>
                      <div className="absolute inset-x-0 top-1/2 h-0.5 bg-white/30" />
                      <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white/30" />
                      <span className="absolute bottom-0.5 text-[8px] font-mono text-black/70 bg-white/60 px-1 rounded-xs">🪟 Gaze</span>
                    </div>

                    {/* Steaming Mug */}
                    <div className="absolute bottom-3 left-6 flex flex-col items-center">
                      <div className="text-lg animate-bounce">☕</div>
                      <span className="text-[8px] font-mono text-amber-300 bg-black/60 px-1 rounded-xs">Sip Tea</span>
                    </div>

                    {/* Blooming Monstera Plant */}
                    <div className="absolute bottom-3 right-6 flex flex-col items-center">
                      <div className="text-xl animate-pulse">🌸</div>
                      <span className="text-[8px] font-mono text-emerald-300 bg-black/60 px-1 rounded-xs">Plant</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-charcoal-soft mt-1.5">
                    ☕ Balance Energy, Clarity &amp; Flow across 6 meaningful choices
                  </span>
                </div>
              }
            />
          </div>
        </div>

        {/* ACHIEVEMENTS TROPHY CABINET */}
        <div className="space-y-6 pt-6 border-t border-surface-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl sm:text-2xl font-display font-semibold text-charcoal tracking-tight">
                  Trophy Cabinet
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-muted font-sans mt-1">
                Unlock achievements across all five games by completing special challenges and discovering easter eggs.
              </p>
            </div>

            {/* Unlocked Counter Pill */}
            <div className="px-3.5 py-1.5 rounded-full bg-canvas-subtle border border-surface-border font-mono text-xs text-charcoal shrink-0">
              <span className="font-bold text-accent dark:text-accent-dark">
                {unlockedAchievements.length} / {ALL_ACHIEVEMENTS.length}
              </span>{" "}
              Unlocked
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
            {[
              { id: "all", label: "All Trophies" },
              { id: "route-runner", label: "Route Runner" },
              { id: "catch-the-data", label: "Catch Data" },
              { id: "portfolio-quest", label: "Quest" },
              { id: "memory", label: "Memory" },
              { id: "mindcare", label: "MindCare" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-charcoal text-white dark:bg-white dark:text-charcoal border-charcoal dark:border-white font-bold"
                    : "bg-canvas-subtle border-surface-border text-charcoal-muted hover:text-charcoal"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAchievements.map((ach) => {
              const isUnlocked = unlockedAchievements.includes(ach.id);

              return (
                <div
                  key={ach.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isUnlocked
                      ? "bg-white dark:bg-canvas-card-dark border-amber-500/40 shadow-xs"
                      : "bg-canvas-subtle/50 border-surface-border/60 opacity-60"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                        isUnlocked
                          ? "bg-amber-500/10 border border-amber-500/30"
                          : "bg-black/5 dark:bg-white/5 border border-surface-border"
                      }`}
                    >
                      {ach.icon}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-display font-bold text-sm text-charcoal">
                          {ach.title}
                        </h4>
                        {isUnlocked && (
                          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-charcoal-muted font-sans leading-relaxed">
                        {ach.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
