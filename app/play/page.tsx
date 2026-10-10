"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Box, Cpu } from "lucide-react";
import GameCard from "@/components/Play/GameCard";

export default function PlayPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12 space-y-12 md:space-y-16">
        {/* Back Link & Header Row */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-charcoal-soft hover:text-accent transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Portfolio</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-light dark:bg-accent-soft text-accent dark:text-accent-dark text-[11px] font-mono font-medium border border-accent-border/60">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive 3D Simulation Lab</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-semibold tracking-tight text-charcoal">
            3D Lab
          </h1>

          <p className="text-base sm:text-lg text-charcoal-muted max-w-2xl font-sans leading-relaxed">
            A WebGL-powered logistics simulation built around real vehicle routing and pathfinding algorithms. Navigate road networks, manage fuel resources, and deliver packages across a dynamic city grid.
          </p>
        </div>

        {/* FEATURED: Route Runner */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-charcoal-soft font-semibold block">
              Vehicle Routing Simulation
            </span>
          </div>

          <GameCard
            slug="route-runner"
            title="Route Runner"
            badge="Vehicle Routing Simulation"
            description="Navigate a dynamic city grid — choose roads, avoid traffic, manage fuel, and complete deliveries before resources run out. A real-time logistics optimization challenge."
            tagline="Pathfinding · Dynamic Traffic · Fuel Management · Delivery Optimization"
            isFeatured={true}
            preview={
              <div className="relative w-full h-full flex flex-col items-center justify-center select-none p-4">
                <svg viewBox="0 0 320 180" className="w-full h-full max-h-52 drop-shadow-md">
                  {/* City blocks */}
                  <rect x="20" y="20" width="120" height="60" rx="8" fill="#1e2230" stroke="#33394a" strokeWidth="2" />
                  <rect x="180" y="20" width="120" height="60" rx="8" fill="#1e2230" stroke="#33394a" strokeWidth="2" />
                  <rect x="20" y="100" width="120" height="60" rx="8" fill="#1e2230" stroke="#33394a" strokeWidth="2" />
                  <rect x="180" y="100" width="120" height="60" rx="8" fill="#1e2230" stroke="#33394a" strokeWidth="2" />

                  {/* Block labels */}
                  <text x="80" y="55" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">DEPOT A</text>
                  <text x="240" y="55" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">AI LAB</text>
                  <text x="80" y="135" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">DEPOT B</text>
                  <text x="240" y="135" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">CLIENT HUB</text>

                  {/* Road lines */}
                  <line x1="0" y1="90" x2="320" y2="90" stroke="#FBBF24" strokeWidth="2" strokeDasharray="6 6" />
                  <line x1="160" y1="0" x2="160" y2="180" stroke="#FBBF24" strokeWidth="2" strokeDasharray="6 6" />

                  {/* Intersection Signal */}
                  <circle cx="160" cy="90" r="11" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <circle cx="160" cy="90" r="5" fill="#10B981" className="animate-pulse" />

                  {/* Delivery pin */}
                  <circle cx="255" cy="90" r="14" fill="#3B82F6" opacity="0.25" className="animate-ping" />
                  <circle cx="255" cy="90" r="7" fill="#3B82F6" />
                  <text x="255" y="93" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">📦</text>

                  {/* Fuel Depot */}
                  <circle cx="65" cy="90" r="8" fill="#10B981" opacity="0.3" />
                  <text x="65" y="93" fill="#10B981" fontSize="9" fontWeight="bold" textAnchor="middle">⛽</text>

                  {/* Delivery Van */}
                  <g className="animate-bounce" transform="translate(120, 85)">
                    <polygon points="14,-4 40,-12 40,12 14,4" fill="#FBBF24" opacity="0.25" />
                    <rect x="-14" y="-8" width="28" height="16" rx="4" fill="#2563EB" stroke="#60A5FA" strokeWidth="1.5" />
                    <rect x="5" y="-6" width="6" height="12" rx="1.5" fill="#93C5FD" />
                    <circle cx="-7" cy="8" r="3" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                    <circle cx="7" cy="8" r="3" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                    <text x="-3" y="4" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="monospace">KN</text>
                  </g>
                </svg>
                <div className="flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs border border-white/10 text-[10px] font-mono text-charcoal-muted">
                  <Box className="w-3 h-3 text-accent" />
                  <span>Navigate roads · Manage fuel · Complete deliveries</span>
                </div>
              </div>
            }
          />
        </div>

        {/* Tech Context */}
        <div className="p-6 rounded-2xl bg-canvas-subtle border border-surface-border space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-charcoal-soft font-semibold block">
            Under the Hood
          </span>
          <div className="flex flex-wrap gap-2 font-mono text-[11px]">
            {["Three.js WebGL", "React Three Fiber", "Pathfinding Algorithms", "Real-time State Machine", "3D Asset Rendering"].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-canvas-card-dark border border-surface-border text-charcoal-muted shadow-2xs"
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="text-xs text-charcoal-soft font-sans leading-relaxed max-w-2xl">
            Route Runner is built on Three.js with React Three Fiber for declarative 3D scene management. The routing logic uses a greedy pathfinding approach across a procedurally generated city grid.
          </p>
        </div>
      </div>
    </div>
  );
}
