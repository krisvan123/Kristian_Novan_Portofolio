import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import GameCard from "@/components/Play/GameCard";

export const metadata = {
  title: "Play · Kristian Novan Portfolio",
  description:
    "A few interactive browser mini-games and experiments built for fun around algorithms, ML concepts, design, and exploration.",
};

export default function PlayPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12 space-y-12 md:space-y-14">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-charcoal-soft hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-light dark:bg-accent-soft text-accent dark:text-accent-dark text-[11px] font-mono font-medium border border-accent-border/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Experiments</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-semibold tracking-tight text-charcoal">
            Play
          </h1>

          <p className="text-base sm:text-lg text-charcoal-muted max-w-xl font-sans leading-relaxed">
            A few little experiments I made for fun, built somewhere between coding, design, and curiosity.
          </p>

          <div className="pt-1">
            <span
              style={{ fontFamily: "var(--font-quote), Georgia, serif" }}
              className="text-sm italic text-accent dark:text-accent-dark"
            >
              5 little experiments — pick one and play.
            </span>
          </div>
        </div>

        {/* FEATURED GAME: Route Runner */}
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-charcoal-soft font-semibold block">
            Featured Experiment
          </span>

          <GameCard
            slug="route-runner"
            title="Route Runner"
            badge="Featured Optimization Game"
            description="A routing challenge inspired by EcoRouter AI. Can you find the optimal trajectory from warehouse to hospital while minimizing fuel burn under dynamic vehicle load drops?"
            tagline="Eco-routing • Load heuristics • Smart lights"
            isFeatured={true}
            preview={
              <div className="relative w-full h-full flex flex-col items-center justify-center select-none">
                <svg viewBox="0 0 280 140" className="w-full h-full">
                  <path
                    d="M 20 100 C 60 100, 80 40, 140 40 C 200 40, 220 90, 260 70"
                    stroke="#2D5A43"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="4 4"
                    className="opacity-75"
                  />
                  {/* Traffic light */}
                  <circle cx="140" cy="40" r="7" fill="#1E293B" />
                  <circle cx="140" cy="40" r="4" fill="#10B981" />
                  {/* Start Depot */}
                  <circle cx="20" cy="100" r="10" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
                  {/* Goal */}
                  <circle cx="260" cy="70" r="11" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" />
                  {/* Animated Mini Truck */}
                  <g className="animate-pulse" transform="translate(140, 36)">
                    <rect x="-10" y="-8" width="20" height="12" rx="2" fill="#2563EB" />
                    <circle cx="-5" cy="5" r="2.5" fill="#1E293B" />
                    <circle cx="5" cy="5" r="2.5" fill="#1E293B" />
                  </g>
                </svg>
                <span className="text-[10px] font-mono text-charcoal-soft mt-1">
                  Click to launch interactive routing map
                </span>
              </div>
            }
          />
        </div>

        {/* MORE EXPERIMENTS GRID (4 Games) */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between pb-2 border-b border-surface-border">
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-charcoal tracking-tight">
              More Experiments
            </h2>
            <span className="text-xs font-mono text-charcoal-soft">
              4 mini-games
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Game 02: Catch the Data */}
            <GameCard
              slug="catch-the-data"
              title="Catch the Data"
              badge="ML Classification"
              description="Classify floating data points across decision boundaries. Train your eye to isolate cluster targets from noisy feature outliers."
              tagline="Can you sort the data?"
              preview={
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-36 h-24 rounded-xl border border-dashed border-charcoal/20 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 animate-ping absolute top-3 left-4" />
                    <div className="w-4 h-4 rounded-full bg-emerald-600 absolute top-3 left-4" />
                    <div className="w-3.5 h-3.5 rotate-45 bg-amber-500 absolute bottom-3 right-6 animate-pulse" />
                    <div className="w-3 h-3 rotate-45 bg-amber-600 absolute bottom-5 left-10" />
                    <div className="w-4 h-4 rounded-full bg-indigo-500 absolute top-8 right-10" />
                  </div>
                </div>
              }
            />

            {/* Game 03: Portfolio Quest */}
            <GameCard
              slug="portfolio-quest"
              title="Portfolio Quest"
              badge="Interactive World"
              description="Explore a tiny 2D illustrated world representing Kristian's projects, AI lab, volunteer garden, design studio, and certificates."
              tagline="Explore my little digital world."
              preview={
                <div className="relative w-full h-full flex items-center justify-center gap-4 text-2xl">
                  <span className="animate-bounce">💻</span>
                  <div className="w-6 h-8 rounded-full bg-blue-500 border border-blue-900 flex items-center justify-center text-[10px] text-white">
                    You
                  </div>
                  <span className="animate-bounce" style={{ animationDelay: "300ms" }}>🌻</span>
                </div>
              }
            />

            {/* Game 04: Memory of My Journey */}
            <GameCard
              slug="memory"
              title="Memory of My Journey"
              badge="Memory Matching"
              description="A 4x4 card matching challenge featuring Python, Figma, Machine Learning, Computer Vision, and the core technologies in Kristian's journey."
              tagline="Match the pieces of my journey."
              preview={
                <div className="grid grid-cols-2 gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[#2D5A43] text-emerald-200 flex items-center justify-center text-xs font-mono shadow-xs">
                    ✦
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-canvas-card-dark border border-accent text-accent flex items-center justify-center text-xs font-mono font-bold shadow-xs">
                    Py
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-canvas-card-dark border border-accent text-accent flex items-center justify-center text-xs font-mono font-bold shadow-xs">
                    Py
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-[#2D5A43] text-emerald-200 flex items-center justify-center text-xs font-mono shadow-xs">
                    ✦
                  </div>
                </div>
              }
            />

            {/* Game 05: MindCare Choice */}
            <GameCard
              slug="mindcare"
              title="MindCare Choice"
              badge="Interactive Story"
              description="A calm, thoughtful narrative exploration of everyday choices when someone feels overwhelmed. A gentle pause to reflect and reset."
              tagline="Sometimes the next step starts with a choice."
              preview={
                <div className="flex flex-col items-center justify-center text-center space-y-1">
                  <span className="text-2xl animate-float-subtle">☕</span>
                  <span
                    style={{ fontFamily: "var(--font-quote), Georgia, serif" }}
                    className="text-xs italic text-charcoal-muted"
                  >
                    &ldquo;Take a quiet pause...&rdquo;
                  </span>
                </div>
              }
            />
          </div>
        </div>

        {/* Play Page Personal Detail */}
        <div className="pt-8 border-t border-surface-border text-center">
          <p className="text-xs text-charcoal-soft font-mono">
            Built as a little corner of the portfolio.
          </p>
        </div>
      </div>
    </div>
  );
}
