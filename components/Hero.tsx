"use client";

import React from "react";
import Link from "next/link";
import { Mail, FolderGit2, ArrowRight } from "lucide-react";
import { personalData } from "@/data/personal";
import ProfilePhoto from "./ProfilePhoto";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-28 pb-8 md:pt-36 md:pb-14 overflow-hidden"
    >
      {/* Subtle Ambient Background Warmth (Light) / Cosmic Soft Tone (Dark) */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-16 left-1/4 w-96 h-96 rounded-full bg-accent/5 dark:bg-accent/10 blur-3xl transition-colors duration-500" />
        <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-amber-500/5 dark:bg-indigo-500/5 blur-3xl transition-colors duration-500" />
      </div>

      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12 w-full">
        {/* Responsive Grid: Desktop Two-Column, Mobile Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Clear Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* 1. Small restrained eyebrow label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-subtle border border-surface-border text-charcoal-soft font-mono text-[11px] tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>
                {personalData.academic.program} • {personalData.academic.university} • {personalData.academic.cohort}
              </span>
            </div>

            {/* 2. Confident Name & Academic Direction */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-semibold tracking-tight text-charcoal leading-[1.08]">
                Kristian Novan
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-display font-medium text-charcoal-muted tracking-tight">
                Computer Science Student
                <span className="text-charcoal-soft font-normal text-base sm:text-lg block mt-1">
                  Specializing in {personalData.academic.specialization} ({personalData.academic.studyPeriod})
                </span>
              </p>
            </div>

            {/* 3. Natural Human Introduction */}
            <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed max-w-xl font-sans">
              {personalData.heroBio}
            </p>

            {/* 4. Current Core Focus Areas (Subtle metadata pills) */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-md bg-canvas-subtle border border-surface-border text-charcoal font-medium">
                Machine Learning
              </span>
              <span className="px-3 py-1 rounded-md bg-canvas-subtle border border-surface-border text-charcoal font-medium">
                UI/UX Prototyping
              </span>
              <span className="px-3 py-1 rounded-md bg-canvas-subtle border border-surface-border text-charcoal font-medium">
                Public Speaking &amp; MC
              </span>
              <span className="px-3 py-1 rounded-md bg-canvas-subtle border border-surface-border text-charcoal font-medium">
                Campus Leadership
              </span>
            </div>

            {/* 5. Primary CTAs with micro-interactions */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto">
              <Link
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-charcoal dark:bg-[#F3F2EE] text-white dark:text-[#111113] text-sm font-semibold hover:bg-accent dark:hover:bg-accent-hover hover:text-white transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 group w-full sm:w-auto"
              >
                <FolderGit2 className="w-4 h-4 stroke-[1.9]" />
                <span>View My Projects</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              <a
                href={`mailto:${personalData.contact.email}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-canvas-card-dark border border-surface-border text-charcoal dark:text-charcoal-dark text-sm font-semibold hover:border-accent hover:text-accent transition-all duration-200 shadow-2xs hover:-translate-y-0.5 w-full sm:w-auto"
              >
                <Mail className="w-4 h-4 stroke-[1.9]" />
                <span>Contact Me</span>
              </a>
            </div>
          </div>

          {/* Right Column: Balanced Profile Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ProfilePhoto />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="w-full flex justify-center pt-10 md:pt-14">
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}
