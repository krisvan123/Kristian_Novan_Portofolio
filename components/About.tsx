"use client";

import React from "react";
import { personalData } from "@/data/personal";
import {
  Code2,
  Users2,
  Mic2,
  Cpu,
  Compass,
  GraduationCap,
} from "lucide-react";

const CAPABILITY_ICONS = [
  Cpu,
  Compass,
  Code2,
  Mic2,
  Users2,
  GraduationCap,
];

export default function About() {
  return (
    <section id="about" className="py-12 md:py-16 border-t border-surface-border/60">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-1.5 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-subtle border border-surface-border text-charcoal-soft text-xs font-semibold">
            <span>About Me</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-charcoal">
            Background &amp; Direction
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-soft max-w-2xl">
            Computer Science student at BINUS University (B2028), developing practical work in Machine Learning and UI/UX.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Narrative paragraphs & Core Strengths */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-3.5 text-charcoal-muted leading-relaxed text-sm sm:text-base">
              <p className="text-base sm:text-lg text-charcoal font-medium leading-relaxed">
                {personalData.aboutBio.lead}
              </p>
              {personalData.aboutBio.body.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>

            {/* Core Capabilities */}
            <div className="pt-2">
              <h3 className="text-xs font-mono font-semibold tracking-wider text-charcoal-soft uppercase mb-3">
                Current Experience &amp; Involvements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {personalData.aboutBio.capabilities.map((item, index) => {
                  const Icon = CAPABILITY_ICONS[index % CAPABILITY_ICONS.length];
                  return (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-surface-border shadow-2xs hover:border-accent-border transition-all duration-200 group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-accent-light text-accent flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Icon className="w-3.5 h-3.5 stroke-[1.8]" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-charcoal">
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Key Overview & Cohort Info */}
          <div className="lg:col-span-5 flex flex-col space-y-3.5">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-surface-border shadow-2xs space-y-5">
              <div className="flex items-center justify-between pb-3.5 border-b border-surface-border">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal-soft">
                  Academic Overview
                </span>
                <span className="text-xs text-accent font-semibold px-2 py-0.5 rounded bg-accent-light">
                  BINUS B2028
                </span>
              </div>

              <div className="space-y-4">
                {personalData.metrics.map((metric) => (
                  <div key={metric.label} className="group">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-xs font-medium text-charcoal-soft">
                        {metric.label}
                      </span>
                      <span className="text-lg sm:text-xl font-serif font-bold text-charcoal group-hover:text-accent transition-colors">
                        {metric.value}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-soft/80">
                      {metric.description}
                    </p>
                    <div className="w-full h-1 bg-canvas-subtle rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-accent/40 w-full rounded-full" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Approach Note */}
              <div className="p-3.5 rounded-xl bg-canvas-subtle border border-surface-border text-xs text-charcoal-muted leading-relaxed">
                <span className="font-semibold text-charcoal block mb-0.5">
                  Design &amp; Engineering Philosophy
                </span>
                Balancing algorithmic logic with thoughtful user interaction. Code should be clean, functional, and pleasant to interact with.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
