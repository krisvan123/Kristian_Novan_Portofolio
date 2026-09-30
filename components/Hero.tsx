"use client";

import React from "react";
import Link from "next/link";
import { Mail, FolderGit2, ArrowRight, GraduationCap } from "lucide-react";
import { personalData } from "@/data/personal";
import ProfilePhoto from "./ProfilePhoto";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-24 pb-6 md:pt-32 md:pb-10 overflow-hidden"
    >
      {/* Subtle Hero Background Ambience */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-80 h-80 rounded-full bg-accent-light/30 dark:bg-accent-dark-light/20 blur-3xl" />
        <div className="absolute top-1/3 right-12 w-80 h-80 rounded-full bg-amber-50/40 dark:bg-indigo-950/20 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-8 w-full">
        {/* Responsive Grid: Desktop Two-Column, Mobile Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Introduction & Primary CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5">
            {/* Academic Overview Quick Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-light dark:bg-accent-dark-light border border-accent-border/60 dark:border-accent-dark/40 text-accent dark:text-accent-dark text-xs font-semibold">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{personalData.academic.school}</span>
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-canvas-subtle dark:bg-canvas-subtle-dark border border-surface-border dark:border-surface-border-dark text-charcoal-muted dark:text-charcoal-muted-dark text-xs font-mono font-medium">
                {personalData.academic.specialization}
              </span>
            </div>

            {/* Name & Academic Identity */}
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-charcoal dark:text-charcoal-dark leading-[1.12]">
                Hello, I&apos;m{" "}
                <span className="font-serif italic font-normal text-accent dark:text-accent-dark">
                  {personalData.name}
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-medium text-charcoal-muted dark:text-charcoal-muted-dark tracking-tight">
                {personalData.academic.university} • Cohort {personalData.academic.cohort} • {personalData.focus}
              </p>
            </div>

            {/* Natural Human Introduction */}
            <p className="text-sm sm:text-base text-charcoal-soft dark:text-charcoal-soft-dark leading-relaxed max-w-xl">
              {personalData.heroBio}
            </p>

            {/* Focus Areas Pills */}
            <div className="pt-1 flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-lg bg-white dark:bg-canvas-card-dark border border-surface-border dark:border-surface-border-dark text-charcoal dark:text-charcoal-dark font-medium shadow-2xs">
                Intelligent Systems (AI)
              </span>
              <span className="px-3 py-1 rounded-lg bg-white dark:bg-canvas-card-dark border border-surface-border dark:border-surface-border-dark text-charcoal dark:text-charcoal-dark font-medium shadow-2xs">
                Machine Learning
              </span>
              <span className="px-3 py-1 rounded-lg bg-white dark:bg-canvas-card-dark border border-surface-border dark:border-surface-border-dark text-charcoal dark:text-charcoal-dark font-medium shadow-2xs">
                UI/UX Prototyping
              </span>
              <span className="px-3 py-1 rounded-lg bg-white dark:bg-canvas-card-dark border border-surface-border dark:border-surface-border-dark text-charcoal dark:text-charcoal-dark font-medium shadow-2xs">
                Public Speaking &amp; MC
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              <Link
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-charcoal dark:bg-white text-white dark:text-charcoal text-sm font-semibold hover:bg-accent dark:hover:bg-neutral-200 transition-colors duration-200 shadow-sm group w-full sm:w-auto"
              >
                <FolderGit2 className="w-4 h-4 stroke-[1.8]" />
                <span>View My Projects</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <a
                href={`mailto:${personalData.contact.email}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-canvas-card-dark border border-surface-border dark:border-surface-border-dark text-charcoal dark:text-charcoal-dark text-sm font-semibold hover:border-accent dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-dark transition-colors duration-200 shadow-2xs w-full sm:w-auto"
              >
                <Mail className="w-4 h-4 stroke-[1.8]" />
                <span>Contact Me</span>
              </a>
            </div>
          </div>

          {/* Right Column: Profile Photo Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ProfilePhoto />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="w-full flex justify-center pt-8 md:pt-10">
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}
