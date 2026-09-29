"use client";

import React from "react";
import { personalData } from "@/data/personal";
import {
  Code2,
  Cpu,
  Users2,
  Mic2,
  Compass,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

const PASSION_ICONS = [
  Code2,
  Cpu,
  Users2,
  Mic2,
  Compass,
  Lightbulb,
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 border-t border-surface-border/60">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-subtle border border-surface-border text-charcoal-soft text-xs font-medium">
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-charcoal">
            Academic Journey &amp; Passion for Building
          </h2>
          <p className="text-sm sm:text-base text-charcoal-soft max-w-2xl">
            A balance of technical problem solving, teamwork, and active campus engagement.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Narrative paragraphs & Passions list */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-charcoal-muted leading-relaxed text-sm sm:text-base">
              {personalData.aboutBio.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Passions list */}
            <div className="pt-4">
              <h3 className="text-sm font-semibold tracking-wide text-charcoal uppercase mb-4">
                What I Genuinely Enjoy
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {personalData.aboutBio.passions.map((item, index) => {
                  const Icon = PASSION_ICONS[index % PASSION_ICONS.length];
                  return (
                    <div
                      key={item}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white border border-surface-border shadow-2xs hover:border-accent-border transition-colors duration-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent-light text-accent flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 stroke-[1.8]" />
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

          {/* Right Column: Statistics / Visual Highlights */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-surface-border shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-surface-border">
                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-soft">
                  Key Metrics
                </span>
                <span className="text-xs text-accent font-medium">Verified Overview</span>
              </div>

              <div className="space-y-6">
                {personalData.metrics.map((metric) => (
                  <div key={metric.label} className="group">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-xs font-medium text-charcoal-soft">
                        {metric.label}
                      </span>
                      <span className="text-2xl font-serif font-bold text-charcoal group-hover:text-accent transition-colors">
                        {metric.value}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-soft/80">
                      {metric.description}
                    </p>
                    <div className="w-full h-1 bg-canvas-subtle rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-accent/40 w-full rounded-full" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Callout box */}
              <div className="p-4 rounded-xl bg-[#F6F5F0] border border-surface-border text-xs text-charcoal-muted leading-relaxed">
                <span className="font-semibold text-charcoal block mb-1">
                  Continuous Growth
                </span>
                Driven by curiosity in modern AI architectures and practical software engineering that delivers real utility to people.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
