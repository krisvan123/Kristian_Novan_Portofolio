"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Box, Cpu, GitBranch, Fuel } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const TECH_PILLS = [
  { label: "Three.js WebGL", icon: Box },
  { label: "React Three Fiber", icon: GitBranch },
  { label: "Pathfinding Algorithm", icon: Cpu },
  { label: "Fuel & Resource Logic", icon: Fuel },
];

export default function PlayTeaser() {
  return (
    <section className="py-10 md:py-14 border-t border-surface-border">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12">
        <ScrollReveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-canvas-subtle via-white to-accent-light/30 dark:from-canvas-card-dark dark:via-canvas-card-dark dark:to-accent-soft/40 border border-surface-border p-7 sm:p-10 lg:p-12 shadow-xs group hover:border-accent-border transition-all duration-300">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 dark:bg-accent/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-light dark:bg-accent-soft border border-accent-border/60 text-accent dark:text-accent-dark font-mono text-[11px] font-medium">
                <Cpu className="w-3.5 h-3.5" />
                <span>Interactive 3D Simulation Lab</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold tracking-tight text-charcoal">
                Vehicle Routing in a Live 3D City
              </h3>

              <p className="text-sm sm:text-base text-charcoal-muted font-sans leading-relaxed">
                An interactive logistics simulation built with <strong className="text-charcoal font-semibold">Three.js & React Three Fiber</strong> — navigate road networks, manage fuel, and optimize delivery routes across a dynamic city grid in real time.
              </p>

              {/* Tech Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px]">
                {TECH_PILLS.map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    className="px-2.5 py-1 rounded-lg bg-white/80 dark:bg-canvas-subtle-dark/80 border border-surface-border text-charcoal flex items-center gap-1.5 shadow-2xs font-medium"
                  >
                    <Icon className="w-3 h-3 text-accent" />
                    <span>{label}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Launch Button */}
            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Link
                href="/play"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-charcoal dark:bg-charcoal-dark text-white dark:text-canvas-dark text-sm font-semibold font-display shadow-xs hover:bg-accent dark:hover:bg-accent-hover hover:text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer group/btn"
              >
                <Box className="w-4 h-4 text-accent group-hover/btn:text-white transition-colors" />
                <span>Launch 3D Lab</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
