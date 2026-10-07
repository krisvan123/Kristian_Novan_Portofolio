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
            description="Control an agile delivery van through an animated metropolitan grid. Dodge traffic jams, time the cycling traffic lights, refuel at depots, and drop 3 parcels before fuel or time runs out."
            tagline="Dynamic traffic • Refuel depots • Rooftop easter egg"
            isFeatured={true}
            preview={
              <div className="relative w-full h-full flex flex-col items-center justify-center select-none p-4">
                <svg viewBox="0 0 320 180" className="w-full h-full">
                  {/* City blocks */}
                  <rect x="20" y="20" width="120" height="60" rx="6" fill="#202430" stroke="#33394a" strokeWidth="2" />
                  <rect x="180" y="20" width="120" height="60" rx="6" fill="#202430" stroke="#33394a" strokeWidth="2" />
                  <rect x="20" y="100" width="120" height="60" rx="6" fill="#202430" stroke="#33394a" strokeWidth="2" />
                  <rect x="180" y="100" width="120" height="60" rx="6" fill="#202430" stroke="#33394a" strokeWidth="2" />

                  {/* Roads */}
                  <line x1="0" y1="90" x2="320" y2="90" stroke="#FBBF24" strokeWidth="2" strokeDasharray="6 6" />
                  <line x1="160" y1="0" x2="160" y2="180" stroke="#FBBF24" strokeWidth="2" strokeDasharray="6 6" />

                  {/* Traffic Light */}
                  <circle cx="160" cy="90" r="10" fill="#111827" />
                  <circle cx="160" cy="90" r="5" fill="#10B981" className="animate-pulse" />

                  {/* Delivery target */}
                  <circle cx="240" cy="50" r="12" fill="#3B82F6" opacity="0.3" className="animate-ping" />
                  <circle cx="240" cy="50" r="8" fill="#3B82F6" />

                  {/* Moving Van */}
                  <g className="animate-bounce" transform="translate(90, 85)">
                    <rect x="-14" y="-8" width="28" height="16" rx="3" fill="#2563EB" stroke="#60A5FA" strokeWidth="1.5" />
                    <circle cx="-7" cy="8" r="3" fill="#1E293B" />
                    <circle cx="7" cy="8" r="3" fill="#1E293B" />
                  </g>
                </svg>
                <span className="text-[10px] font-mono text-charcoal-soft mt-1">
                  Click to start simulation
                </span>
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
              description="High-velocity laser scanner arcade. Chain target captures into x5 combos, grab power-up capsules, dodge noise spikes, and defeat the Wave 5 Boss Anomaly."
              tagline="5 waves • Boss battle • Smiling golden data"
              preview={
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-44 h-28 rounded-xl bg-[#0e1017] border border-emerald-500/30 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:12px_12px] opacity-20" />
                    {/* Pulsing reticle */}
                    <div className="w-12 h-12 rounded-full border-2 border-emerald-400 flex items-center justify-center animate-spin">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    {/* Floating data dots */}
                    <div className="absolute top-3 left-4 w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-md animate-bounce" />
                    <div className="absolute bottom-3 right-6 w-3 h-3 rounded-full bg-amber-400 shadow-md animate-pulse" />
                    <div className="absolute top-4 right-5 w-3 h-3 rotate-45 bg-rose-500 shadow-md" />
                  </div>
                </div>
              }
            />

            {/* Game 03: Portfolio Quest */}
            <GameCard
              slug="portfolio-quest"
              title="Portfolio Quest"
              badge="2D RPG Adventure"
              description="Walk across an illustrated campus world. Discover 5 milestone pavilions, speak with wandering NPCs, switch day/night lighting, and seek the hidden sunflower garden."
              tagline="Follow camera • NPCs • Hidden garden secret"
              preview={
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-44 h-28 rounded-xl bg-[#1d3329] border border-white/10 flex items-center justify-center overflow-hidden">
                    {/* Cross walkways */}
                    <div className="absolute inset-y-0 w-8 bg-[#c2bcad]" />
                    <div className="absolute inset-x-0 h-8 bg-[#c2bcad]" />
                    {/* Center fountain */}
                    <div className="w-8 h-8 rounded-full bg-sky-400 border-2 border-white/60 z-10" />
                    {/* Avatar */}
                    <div className="absolute bottom-4 right-8 w-5 h-7 rounded-md bg-blue-600 border border-white flex flex-col items-center justify-start p-0.5 z-10 animate-pulse">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-200" />
                    </div>
                  </div>
                </div>
              }
            />

            {/* Game 04: Memory of My Journey */}
            <GameCard
              slug="memory"
              title="Memory of My Journey"
              badge="Tactile Card Quest"
              description="Match 8 milestones across Kristian's engineering journey with 3D wax-seal flips. Chain rapid matches for combo points, trigger Time Freezes, and survive Memory Fog."
              tagline="3D card flip • Time freeze • 3 progressive levels"
              preview={
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-2 w-36">
                    <div className="h-10 rounded-lg bg-emerald-600/30 border border-emerald-500 flex items-center justify-center text-xs">
                      🌱
                    </div>
                    <div className="h-10 rounded-lg bg-[#252836] border border-white/10 flex items-center justify-center text-[10px] font-mono text-accent">
                      KN
                    </div>
                    <div className="h-10 rounded-lg bg-blue-600/30 border border-blue-500 flex items-center justify-center text-xs">
                      📜
                    </div>
                    <div className="h-10 rounded-lg bg-[#252836] border border-white/10 flex items-center justify-center text-[10px] font-mono text-accent">
                      KN
                    </div>
                    <div className="h-10 rounded-lg bg-amber-600/30 border border-amber-500 flex items-center justify-center text-xs">
                      🏆
                    </div>
                    <div className="h-10 rounded-lg bg-[#252836] border border-white/10 flex items-center justify-center text-[10px] font-mono text-accent">
                      KN
                    </div>
                  </div>
                </div>
              }
            />

            {/* Game 05: MindCare Choice */}
            <GameCard
              slug="mindcare"
              title="MindCare Choice"
              badge="Cozy Room Simulation"
              description="A living interactive workspace room. Balance Mental Energy, Emotional Clarity, and Creative Flow across dynamic sky cycles, water the plant to bloom, and reach 4 endings."
              tagline="Day/sunset/night sky • Plant bloom • 4 endings"
              preview={
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-44 h-28 rounded-xl bg-[#181924] border border-white/10 flex items-center justify-center overflow-hidden">
                    {/* Window with sunset */}
                    <div className="w-20 h-16 rounded-t-full bg-gradient-to-b from-rose-400 via-amber-300 to-sky-400 border-2 border-white/20 flex items-center justify-center">
                      <div className="text-base animate-pulse">☀️</div>
                    </div>
                    {/* Plant */}
                    <div className="absolute bottom-2 right-4 text-xl">🪴</div>
                    {/* Tea cup */}
                    <div className="absolute bottom-2 left-4 text-base">☕</div>
                  </div>
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
