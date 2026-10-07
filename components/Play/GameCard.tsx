"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Trophy } from "lucide-react";
import { gameStorage, ALL_ACHIEVEMENTS } from "@/lib/gameStorage";

interface GameCardProps {
  slug: string;
  title: string;
  badge: string;
  description: string;
  tagline: string;
  isFeatured?: boolean;
  preview: React.ReactNode;
}

export default function GameCard({
  slug,
  title,
  badge,
  description,
  tagline,
  isFeatured = false,
  preview,
}: GameCardProps) {
  const [bestScore, setBestScore] = useState<number>(0);
  const [unlockedCount, setUnlockedCount] = useState<number>(0);

  useEffect(() => {
    const score = gameStorage.getBestScore(slug);
    setBestScore(score);

    const unlocked = gameStorage.getUnlockedAchievements();
    const gameAchievements = ALL_ACHIEVEMENTS.filter((a) => a.gameId === slug);
    const count = gameAchievements.filter((a) => unlocked.includes(a.id)).length;
    setUnlockedCount(count);
  }, [slug]);

  if (isFeatured) {
    return (
      <Link
        href={`/play/${slug}`}
        className="group relative flex flex-col lg:flex-row items-stretch justify-between bg-white dark:bg-canvas-card-dark rounded-3xl border border-surface-border overflow-hidden shadow-xs hover:border-accent-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        {/* Left Content */}
        <div className="p-6 sm:p-8 lg:p-10 flex-1 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-light dark:bg-accent-soft text-accent dark:text-accent-dark text-[11px] font-mono font-medium border border-accent-border/60">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{badge}</span>
              </span>

              {bestScore > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-[11px] font-mono">
                  <Trophy className="w-3 h-3" />
                  <span>High: {bestScore.toLocaleString()}</span>
                </span>
              )}

              {unlockedCount > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-canvas-subtle border border-surface-border text-charcoal-muted text-[10px] font-mono">
                  <span>🏆 {unlockedCount}/3 Trophies</span>
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold tracking-tight text-charcoal group-hover:text-accent transition-colors">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-charcoal-muted font-sans leading-relaxed max-w-lg">
              {description}
            </p>

            <p className="text-xs font-mono text-accent dark:text-accent-dark pt-1">
              {tagline}
            </p>
          </div>

          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-charcoal dark:bg-[#F3F2EE] text-white dark:text-[#111113] text-sm font-semibold font-display shadow-xs group-hover:bg-accent dark:group-hover:bg-accent-hover group-hover:text-white transition-all duration-200">
              <span>Launch {title}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Right Animated Interactive Preview */}
        <div className="w-full lg:w-1/2 min-h-[240px] sm:min-h-[300px] bg-[#FAF8F2] dark:bg-[#141416] border-t lg:border-t-0 lg:border-l border-surface-border p-4 sm:p-6 flex items-center justify-center overflow-hidden">
          {preview}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/play/${slug}`}
      className="group relative flex flex-col justify-between bg-white dark:bg-canvas-card-dark rounded-2xl border border-surface-border p-5 sm:p-6 shadow-2xs hover:border-accent-border hover:shadow-md hover:-translate-y-1.5 transition-all duration-300"
    >
      <div>
        {/* Animated Card Preview Container */}
        <div className="relative aspect-[16/10] w-full rounded-xl bg-[#FAF8F2] dark:bg-[#141416] border border-surface-border/60 overflow-hidden mb-4 p-3 flex items-center justify-center">
          {preview}
        </div>

        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-canvas-subtle border border-surface-border text-charcoal-muted">
            {badge}
          </span>
          {bestScore > 0 && (
            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-amber-600 dark:text-amber-400">
              <Trophy className="w-3 h-3" />
              <span>{bestScore.toLocaleString()}</span>
            </span>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-display font-semibold text-charcoal group-hover:text-accent transition-colors tracking-tight">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-charcoal-muted mt-2 leading-relaxed font-sans line-clamp-2">
          {description}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-surface-border/60 flex items-center justify-between text-xs font-semibold text-charcoal group-hover:text-accent transition-colors">
        <span className="font-mono text-[11px] text-charcoal-soft">{tagline}</span>
        <div className="flex items-center gap-1 font-mono text-[11px] text-accent dark:text-accent-dark">
          <span>Play</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
