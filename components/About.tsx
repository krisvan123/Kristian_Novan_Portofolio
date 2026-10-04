import React from "react";
import { personalData } from "@/data/personal";
import ScrollReveal from "./ScrollReveal";
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
    <section id="about" className="py-14 md:py-20 border-t border-surface-border">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col items-start space-y-2 mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-subtle border border-surface-border text-charcoal-soft font-mono text-[11px]">
            <span>Background &amp; Direction</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-charcoal">
            About Me
          </h2>
          <p className="text-sm sm:text-base text-charcoal-soft max-w-2xl font-sans">
            Undergraduate student at BINUS University exploring the balance between machine intelligence and clear, comfortable user experience.
          </p>
        </ScrollReveal>

        {/* Content Grid: 12-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Narrative paragraphs & Core Strengths */}
          <ScrollReveal delay={120} className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-charcoal-muted leading-relaxed text-base sm:text-lg font-sans">
              <p className="text-lg sm:text-xl text-charcoal font-medium leading-relaxed font-display">
                {personalData.aboutBio.lead}
              </p>
              {personalData.aboutBio.body.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>

            {/* Core Capabilities */}
            <div className="pt-3">
              <h3 className="text-xs font-mono font-semibold tracking-wider text-charcoal-soft uppercase mb-3.5">
                Current Experience &amp; Involvements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {personalData.aboutBio.capabilities.map((item, index) => {
                  const Icon = CAPABILITY_ICONS[index % CAPABILITY_ICONS.length];
                  return (
                    <div
                      key={item}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-canvas-card-dark border border-surface-border shadow-2xs hover:border-accent-border transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent-light dark:bg-accent-soft text-accent dark:text-accent-dark flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
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
          </ScrollReveal>

          {/* Right Column: Clean Editorial Academic Overview Card */}
          <ScrollReveal delay={200} className="lg:col-span-5 flex flex-col space-y-4">
            <div className="bg-white dark:bg-canvas-card-dark p-6 sm:p-8 rounded-2xl border border-surface-border shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal-soft">
                  Academic Overview
                </span>
                <span className="text-[11px] font-mono text-accent dark:text-accent-dark font-medium px-2.5 py-0.5 rounded-full bg-accent-light dark:bg-accent-soft border border-accent-border/60">
                  {personalData.academic.cohort}
                </span>
              </div>

              {/* Clean Editorial Layout — No unnecessary boxes, pure typography & hierarchy */}
              <div className="space-y-4 text-sm divide-y divide-surface-border/60">
                <div className="pt-1">
                  <span className="text-[11px] font-mono text-charcoal-soft uppercase tracking-wider block mb-0.5">
                    School
                  </span>
                  <span className="font-display font-semibold text-charcoal text-base">
                    {personalData.academic.school}
                  </span>
                </div>

                <div className="pt-3.5">
                  <span className="text-[11px] font-mono text-charcoal-soft uppercase tracking-wider block mb-0.5">
                    Program
                  </span>
                  <span className="font-display font-semibold text-charcoal text-base">
                    {personalData.academic.program}
                  </span>
                </div>

                <div className="pt-3.5">
                  <span className="text-[11px] font-mono text-charcoal-soft uppercase tracking-wider block mb-0.5">
                    University
                  </span>
                  <span className="font-display font-semibold text-charcoal text-base">
                    {personalData.academic.university}
                  </span>
                </div>

                <div className="pt-3.5 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] font-mono text-charcoal-soft uppercase tracking-wider block mb-0.5">
                      Cohort
                    </span>
                    <span className="font-display font-semibold text-charcoal text-base">
                      {personalData.academic.cohort}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-charcoal-soft uppercase tracking-wider block mb-0.5">
                      Study Period
                    </span>
                    <span className="font-display font-medium text-charcoal-muted text-sm">
                      {personalData.academic.studyPeriod}
                    </span>
                  </div>
                </div>

                <div className="pt-3.5">
                  <span className="text-[11px] font-mono text-charcoal-soft uppercase tracking-wider block mb-0.5">
                    Specialization
                  </span>
                  <span className="font-display font-semibold text-accent dark:text-accent-dark text-base">
                    {personalData.academic.specialization}
                  </span>
                  <span className="text-xs text-charcoal-soft block mt-0.5">
                    Focused study taken during {personalData.academic.studyPeriod}
                  </span>
                </div>
              </div>

              {/* Design & Engineering Philosophy Note */}
              <div className="pt-4 border-t border-surface-border">
                <div className="p-4 rounded-xl bg-canvas-subtle border border-surface-border text-xs text-charcoal-muted leading-relaxed">
                  <span className="font-display font-semibold text-charcoal block mb-1">
                    Design &amp; Engineering Philosophy
                  </span>
                  Balancing computational intelligence with thoughtful human interaction. Technology should be dependable under the hood, but feel intuitive, clear, and calm on the surface.
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
