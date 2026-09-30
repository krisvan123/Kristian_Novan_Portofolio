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
    <section id="about" className="py-12 md:py-16 border-t border-surface-border/60 dark:border-surface-border-dark/60">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-1.5 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-subtle dark:bg-canvas-subtle-dark border border-surface-border dark:border-surface-border-dark text-charcoal-soft dark:text-charcoal-soft-dark text-xs font-semibold">
            <span>About Me</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-charcoal dark:text-charcoal-dark">
            Background &amp; Direction
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-soft dark:text-charcoal-soft-dark max-w-2xl">
            {personalData.academic.school} at {personalData.academic.university} ({personalData.academic.cohort}), specializing in {personalData.academic.specialization}.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Narrative paragraphs & Core Strengths */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-3.5 text-charcoal-muted dark:text-charcoal-muted-dark leading-relaxed text-sm sm:text-base">
              <p className="text-base sm:text-lg text-charcoal dark:text-charcoal-dark font-medium leading-relaxed">
                {personalData.aboutBio.lead}
              </p>
              {personalData.aboutBio.body.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>

            {/* Core Capabilities */}
            <div className="pt-2">
              <h3 className="text-xs font-mono font-semibold tracking-wider text-charcoal-soft dark:text-charcoal-soft-dark uppercase mb-3">
                Current Experience &amp; Involvements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {personalData.aboutBio.capabilities.map((item, index) => {
                  const Icon = CAPABILITY_ICONS[index % CAPABILITY_ICONS.length];
                  return (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-canvas-card-dark border border-surface-border dark:border-surface-border-dark shadow-2xs hover:border-accent-border dark:hover:border-accent-dark transition-all duration-200 group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-accent-light dark:bg-accent-dark-light text-accent dark:text-accent-dark flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Icon className="w-3.5 h-3.5 stroke-[1.8]" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-charcoal dark:text-charcoal-dark">
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
            <div className="bg-white dark:bg-canvas-card-dark p-6 sm:p-7 rounded-2xl border border-surface-border dark:border-surface-border-dark shadow-2xs space-y-5">
              <div className="flex items-center justify-between pb-3.5 border-b border-surface-border dark:border-surface-border-dark">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal-soft dark:text-charcoal-soft-dark">
                  Academic Overview
                </span>
                <span className="text-xs text-accent dark:text-accent-dark font-semibold px-2 py-0.5 rounded bg-accent-light dark:bg-accent-dark-light">
                  {personalData.academic.cohort}
                </span>
              </div>

              {/* Explicit Academic Details Card */}
              <div className="space-y-3 p-3.5 rounded-xl bg-canvas-subtle/70 dark:bg-canvas-subtle-dark/70 border border-surface-border/70 dark:border-surface-border-dark/70 text-xs">
                <div>
                  <span className="text-charcoal-soft dark:text-charcoal-soft-dark text-[11px] block">
                    School
                  </span>
                  <span className="font-semibold text-charcoal dark:text-charcoal-dark text-sm">
                    {personalData.academic.school}
                  </span>
                </div>
                <div>
                  <span className="text-charcoal-soft dark:text-charcoal-soft-dark text-[11px] block">
                    University
                  </span>
                  <span className="font-semibold text-charcoal dark:text-charcoal-dark text-sm">
                    {personalData.academic.university}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-surface-border/50 dark:border-surface-border-dark/50">
                  <div>
                    <span className="text-charcoal-soft dark:text-charcoal-soft-dark text-[11px] block">
                      Cohort
                    </span>
                    <span className="font-semibold text-charcoal dark:text-charcoal-dark">
                      {personalData.academic.cohort}
                    </span>
                  </div>
                  <div>
                    <span className="text-charcoal-soft dark:text-charcoal-soft-dark text-[11px] block">
                      Specialization
                    </span>
                    <span className="font-semibold text-accent dark:text-accent-dark">
                      {personalData.academic.specialization}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-1">
                {personalData.metrics.map((metric) => (
                  <div key={metric.label} className="group">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-xs font-medium text-charcoal-soft dark:text-charcoal-soft-dark">
                        {metric.label}
                      </span>
                      <span className="text-lg sm:text-xl font-serif font-bold text-charcoal dark:text-charcoal-dark group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
                        {metric.value}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-soft/80 dark:text-charcoal-soft-dark/80">
                      {metric.description}
                    </p>
                    <div className="w-full h-1 bg-canvas-subtle dark:bg-canvas-subtle-dark rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-accent/40 dark:bg-accent-dark/40 w-full rounded-full" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Approach Note */}
              <div className="p-3.5 rounded-xl bg-canvas-subtle dark:bg-canvas-subtle-dark border border-surface-border dark:border-surface-border-dark text-xs text-charcoal-muted dark:text-charcoal-muted-dark leading-relaxed">
                <span className="font-semibold text-charcoal dark:text-charcoal-dark block mb-0.5">
                  Design &amp; Engineering Philosophy
                </span>
                Balancing algorithmic intelligence with thoughtful user experience. Code should be robust, clean, and intuitive to use.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
