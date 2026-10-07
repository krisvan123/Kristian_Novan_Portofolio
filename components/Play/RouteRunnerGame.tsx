"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Play, RotateCcw, Volume2, VolumeX, Fuel, Compass, Gauge, CheckCircle2, AlertTriangle, Truck } from "lucide-react";
import { sounds } from "./SoundEffects";

interface RouteOption {
  id: string;
  name: string;
  badge: string;
  distanceKm: number;
  baseFuelL: number;
  trafficLights: number;
  congestion: "Low" | "Medium" | "High";
  description: string;
  pathD: string;
  lightPositions: { x: number; y: number }[];
  stops: { x: number; y: number; dropWeight: number }[];
}

const ROUTES: RouteOption[] = [
  {
    id: "route-eco",
    name: "Eco Green Corridor",
    badge: "EcoRouter Recommended",
    distanceKm: 5.6,
    baseFuelL: 0.98,
    trafficLights: 2,
    congestion: "Low",
    description: "Sequences deliveries around load reduction drops along scenic bypass with smart green-wave lights.",
    pathD: "M 60 260 C 120 260, 160 170, 260 160 C 360 150, 420 220, 500 210 C 580 200, 640 120, 720 120",
    lightPositions: [
      { x: 260, y: 160 },
      { x: 500, y: 210 },
    ],
    stops: [
      { x: 200, y: 180, dropWeight: 20 },
      { x: 440, y: 210, dropWeight: 25 },
    ],
  },
  {
    id: "route-highway",
    name: "Northern Ring Road",
    badge: "Direct Expressway",
    distanceKm: 7.4,
    baseFuelL: 1.42,
    trafficLights: 1,
    congestion: "Medium",
    description: "Longer high-speed bypass with consistent velocity but elevated aerodynamic drag.",
    pathD: "M 60 260 C 100 80, 280 60, 420 60 C 560 60, 680 70, 720 120",
    lightPositions: [{ x: 420, y: 60 }],
    stops: [{ x: 340, y: 60, dropWeight: 40 }],
  },
  {
    id: "route-city",
    name: "Downtown Central Avenue",
    badge: "Shortest Distance",
    distanceKm: 4.8,
    baseFuelL: 1.76,
    trafficLights: 4,
    congestion: "High",
    description: "Shorter geographical line through metropolitan grid with heavy stop-and-go congestion.",
    pathD: "M 60 260 L 180 260 L 280 310 L 440 310 L 540 220 L 640 220 L 720 120",
    lightPositions: [
      { x: 180, y: 260 },
      { x: 360, y: 310 },
      { x: 490, y: 265 },
      { x: 640, y: 220 },
    ],
    stops: [
      { x: 280, y: 310, dropWeight: 15 },
      { x: 440, y: 310, dropWeight: 15 },
      { x: 540, y: 220, dropWeight: 15 },
    ],
  },
];

export default function RouteRunnerGame() {
  const [selectedRouteId, setSelectedRouteId] = useState<string>("route-eco");
  const [gameState, setGameState] = useState<"select" | "delivering" | "complete">("select");
  const [progress, setProgress] = useState(0); // 0 to 1
  const [currentLightIndex, setCurrentLightIndex] = useState<number | null>(null);
  const [isLightRed, setIsLightRed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const animationRef = useRef<number | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  const selectedRoute = ROUTES.find((r) => r.id === selectedRouteId) || ROUTES[0];

  const handleToggleMute = () => {
    const next = sounds.toggleMute();
    setIsMuted(next);
  };

  const handleSelectRoute = (id: string) => {
    if (gameState === "delivering") return;
    setSelectedRouteId(id);
    sounds.playClick();
  };

  const startDelivery = () => {
    sounds.playClick();
    setGameState("delivering");
    setProgress(0);
    setCurrentLightIndex(null);
    setIsLightRed(false);

    const startTime = performance.now();
    const duration = 5200; // 5.2 seconds simulation

    const step = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / duration);

      // Check traffic light encounters along the path
      if (rawProgress > 0.35 && rawProgress < 0.48 && selectedRoute.trafficLights > 0) {
        setIsLightRed(true);
        setCurrentLightIndex(0);
      } else if (rawProgress > 0.68 && rawProgress < 0.78 && selectedRoute.trafficLights > 1) {
        setIsLightRed(true);
        setCurrentLightIndex(1);
      } else {
        setIsLightRed(false);
        setCurrentLightIndex(null);
      }

      setProgress(rawProgress);

      if (rawProgress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        sounds.playVictory();
        setGameState("complete");
      }
    };

    animationRef.current = requestAnimationFrame(step);
  };

  const resetGame = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setProgress(0);
    setGameState("select");
    setCurrentLightIndex(null);
    setIsLightRed(false);
    sounds.playClick();
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Compute truck coordinates along the SVG path
  let truckPos = { x: 60, y: 260 };
  if (pathRef.current && progress > 0) {
    try {
      const totalLen = pathRef.current.getTotalLength();
      const pt = pathRef.current.getPointAtLength(progress * totalLen);
      truckPos = { x: pt.x, y: pt.y };
    } catch {
      // fallback
    }
  }

  // Efficiency calculation based on chosen route
  const efficiencyPct =
    selectedRoute.id === "route-eco"
      ? 91
      : selectedRoute.id === "route-highway"
      ? 72
      : 58;

  const fuelSavedPct =
    selectedRoute.id === "route-eco"
      ? 44
      : selectedRoute.id === "route-highway"
      ? 19
      : 0;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Game Top Bar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-canvas-card-dark border border-surface-border shadow-2xs">
        <Link
          href="/play"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-charcoal-soft hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Play</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-accent-light dark:bg-accent-soft text-accent dark:text-accent-dark font-medium border border-accent-border/60">
            Inspired by EcoRouter AI
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

      {/* Main Interactive Map Canvas */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[360px] rounded-3xl bg-[#F8F6F0] dark:bg-[#151518] border border-surface-border overflow-hidden shadow-sm flex flex-col justify-between p-4 sm:p-6 select-none">
        {/* Subtle Map Grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, #D5CEBF 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ambient Map Landmark SVG */}
        <svg
          viewBox="0 0 800 400"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Subtle hand-drawn terrain features */}
          <path d="M 20 40 Q 80 20 140 60 Q 200 100 240 80" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.4" />
          <path d="M 520 340 Q 600 320 680 360" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.4" />

          {/* All inactive route paths */}
          {ROUTES.map((route) => {
            const isSelected = route.id === selectedRouteId;
            return (
              <path
                key={route.id}
                d={route.pathD}
                stroke={isSelected ? "#2D5A43" : "#D1D5DB"}
                strokeWidth={isSelected ? "6" : "3"}
                strokeDasharray={isSelected ? "none" : "6 6"}
                strokeLinecap="round"
                fill="none"
                className={`transition-all duration-300 ${isSelected ? "opacity-90 dark:stroke-[#58A07A]" : "opacity-40"}`}
              />
            );
          })}

          {/* Selected route path reference for length calculations */}
          <path
            ref={pathRef}
            d={selectedRoute.pathD}
            stroke="transparent"
            strokeWidth="1"
            fill="none"
          />

          {/* Traffic light locations */}
          {selectedRoute.lightPositions.map((lp, idx) => (
            <g key={idx} transform={`translate(${lp.x}, ${lp.y})`}>
              <circle cx="0" cy="0" r="10" fill="#1E293B" />
              <circle
                cx="0"
                cy="0"
                r="6"
                fill={isLightRed && currentLightIndex === idx ? "#EF4444" : "#10B981"}
                className="transition-colors duration-200"
              />
              <line x1="0" y1="10" x2="0" y2="24" stroke="#475569" strokeWidth="2.5" />
            </g>
          ))}

          {/* START Point (Warehouse Depot) */}
          <g transform="translate(60, 260)">
            <circle cx="0" cy="0" r="18" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" />
            <rect x="-8" y="-7" width="16" height="14" fill="#B45309" rx="1.5" />
            <text x="0" y="28" textAnchor="middle" fill="#78350F" fontSize="11" fontFamily="monospace" fontWeight="600">
              START
            </text>
          </g>

          {/* DESTINATION Point (Hospital / City Center) */}
          <g transform="translate(720, 120)">
            <circle cx="0" cy="0" r="20" fill="#DCFCE7" stroke="#16A34A" strokeWidth="3" className={gameState === "complete" ? "animate-ping" : ""} />
            <circle cx="0" cy="0" r="16" fill="#16A34A" />
            <path d="M -4 -8 L 4 -8 L 4 -4 L 8 -4 L 8 4 L 4 4 L 4 8 L -4 8 L -4 4 L -8 4 L -8 -4 L -4 -4 Z" fill="#FFFFFF" />
            <text x="0" y="30" textAnchor="middle" fill="#15803D" fontSize="11" fontFamily="monospace" fontWeight="600">
              GOAL
            </text>
          </g>

          {/* Moving Delivery Truck */}
          {gameState === "delivering" && (
            <g transform={`translate(${truckPos.x}, ${truckPos.y})`}>
              {/* Soft vehicle shadow */}
              <ellipse cx="0" cy="10" rx="14" ry="4" fill="#000000" fillOpacity="0.2" />
              {/* Truck body */}
              <rect x="-14" y="-12" width="28" height="18" rx="3" fill="#2563EB" stroke="#1E3A8A" strokeWidth="2" />
              <rect x="6" y="-8" width="7" height="10" rx="1.5" fill="#93C5FD" />
              <circle cx="-8" cy="7" r="3" fill="#1F2937" />
              <circle cx="8" cy="7" r="3" fill="#1F2937" />
              {/* Cargo weight load indicator on truck roof */}
              <rect x="-10" y="-17" width="16" height="5" rx="1" fill="#D97706" />
            </g>
          )}
        </svg>

        {/* Real-time Status Overlay */}
        <div className="relative z-10 flex items-start justify-between w-full">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-charcoal-soft font-semibold">
              Mission Status
            </span>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${gameState === "delivering" ? "bg-amber-500 animate-pulse" : gameState === "complete" ? "bg-emerald-500" : "bg-neutral-400"}`} />
              <span className="text-sm font-display font-semibold text-charcoal">
                {gameState === "select"
                  ? "Select Optimal Route"
                  : gameState === "delivering"
                  ? isLightRed
                    ? "Paused at Smart Traffic Light..."
                    : "Cruising & Lightening Cargo Load..."
                  : "Delivery Complete!"}
              </span>
            </div>
          </div>

          {/* Real-time Telemetry Gauges */}
          <div className="flex items-center gap-3 bg-white/90 dark:bg-canvas-card-dark/90 backdrop-blur-xs p-2.5 rounded-xl border border-surface-border shadow-2xs text-xs font-mono">
            <div className="flex items-center gap-1.5 text-charcoal">
              <Compass className="w-3.5 h-3.5 text-accent" />
              <span>{selectedRoute.distanceKm} km</span>
            </div>
            <div className="w-[1px] h-4 bg-surface-border" />
            <div className="flex items-center gap-1.5 text-charcoal">
              <Fuel className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{selectedRoute.baseFuelL.toFixed(2)} L</span>
            </div>
          </div>
        </div>

        {/* Bottom Map Action Cue / Progress Bar */}
        <div className="relative z-10 w-full pt-4">
          {gameState === "delivering" ? (
            <div className="space-y-1.5 bg-white/80 dark:bg-canvas-card-dark/80 backdrop-blur-xs p-3 rounded-xl border border-surface-border">
              <div className="flex justify-between text-xs font-mono text-charcoal-soft">
                <span>Progress: {Math.round(progress * 100)}%</span>
                <span>Light status: {isLightRed ? "Waiting 🚦" : "Clear 🟢"}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-canvas-subtle overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-100 ease-linear"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          ) : gameState === "complete" ? (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in-up">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-display font-semibold text-emerald-950 dark:text-emerald-200">
                    Delivery Complete · {efficiencyPct}% Efficiency
                  </h4>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300 font-sans">
                    Used {selectedRoute.baseFuelL.toFixed(2)} L fuel. You burned {fuelSavedPct}% less fuel than the congested alternative route.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={resetGame}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold font-display shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Play Again</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={startDelivery}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold font-display shadow-md hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Delivery on This Route</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Route Options Selection Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-charcoal-soft font-semibold">
          Select Delivery Trajectory:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {ROUTES.map((route) => {
            const isSelected = route.id === selectedRouteId;
            return (
              <div
                key={route.id}
                onClick={() => handleSelectRoute(route.id)}
                role="button"
                tabIndex={0}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? "bg-white dark:bg-canvas-card-dark border-accent ring-2 ring-accent/20 shadow-sm -translate-y-0.5"
                    : "bg-white/60 dark:bg-canvas-card-dark/60 border-surface-border hover:border-accent-border/70"
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-canvas-subtle border border-surface-border text-charcoal-muted">
                      {route.badge}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        route.congestion === "Low"
                          ? "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40"
                          : route.congestion === "Medium"
                          ? "text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/40"
                          : "text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/40"
                      }`}
                    >
                      {route.congestion} Traffic
                    </span>
                  </div>

                  <h4 className="text-sm font-display font-semibold text-charcoal">
                    {route.name}
                  </h4>

                  <p className="text-xs text-charcoal-soft font-sans leading-relaxed line-clamp-2">
                    {route.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-surface-border/60 flex items-center justify-between text-xs font-mono text-charcoal-soft">
                  <span>{route.distanceKm} km</span>
                  <span className="font-semibold text-charcoal">
                    {route.baseFuelL.toFixed(2)} L
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
