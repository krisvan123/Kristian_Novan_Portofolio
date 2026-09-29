"use client";

import React from "react";
import Link from "next/link";
import { Mail, FolderGit2, Sparkles, ArrowRight } from "lucide-react";
import { personalData } from "@/data/personal";
import ProfilePhoto from "./ProfilePhoto";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[94vh] flex flex-col justify-between pt-28 pb-10 md:pt-36 md:pb-14 overflow-hidden"
    >
      {/* Subtle Hero Floating Background Accents */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Subtle geometric circles */}
        <div className="absolute top-24 left-1/4 w-72 h-72 rounded-full bg-accent-light/30 blur-3xl" />
        <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-amber-50/50 blur-3xl" />

        {/* Minimal floating geometric points */}
        <div className="absolute top-36 left-[8%] w-1.5 h-1.5 rounded-full bg-accent/30 animate-pulse" />
        <div className="absolute top-64 left-[4%] w-1 h-1 rounded-full bg-charcoal/20" />
        <div className="absolute top-48 right-[12%] w-2 h-2 rounded-full bg-accent/25 animate-float-gentle" />
        <div className="absolute bottom-32 right-[6%] w-1.5 h-1.5 rounded-full bg-charcoal/20" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Introduction & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Student & Cohort Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-light border border-accent-border/60 text-accent text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>Computer Science • BINUS University • {personalData.classYear}</span>
            </div>

            {/* Greeting & Name */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-charcoal leading-[1.12]">
                Hello, I&apos;m{" "}
                <span className="font-serif italic font-normal text-accent">
                  {personalData.name}
                </span>
              </h1>
              <p className="text-base sm:text-lg font-medium text-charcoal-muted tracking-tight">
                Computer Science Student — BINUS University — Class of {personalData.classYear}
              </p>
            </div>

            {/* Concise Bio */}
            <p className="text-sm sm:text-base text-charcoal-soft leading-relaxed max-w-xl">
              {personalData.heroBio}
            </p>

            {/* Focus Areas Pills */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-mono tracking-wider uppercase text-charcoal-soft font-medium">
                Focus Areas
              </span>
              <div className="flex flex-wrap gap-1.5 max-w-xl">
                {personalData.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="text-xs font-medium px-2.5 py-1 rounded-md bg-white border border-surface-border text-charcoal shadow-2xs hover:border-accent-border transition-colors"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-charcoal text-white text-sm font-medium hover:bg-accent transition-colors duration-200 shadow-sm group"
              >
                <FolderGit2 className="w-4 h-4 stroke-[1.8]" />
                <span>View My Projects</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <a
                href={`mailto:${personalData.contact.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-surface-border text-charcoal text-sm font-medium hover:border-accent hover:text-accent transition-colors duration-200 shadow-2xs"
              >
                <Mail className="w-4 h-4 stroke-[1.8]" />
                <span>Contact Me</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Profile Photo with 3D Mouse Tilt */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ProfilePhoto />
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator Directly Below Hero */}
      <div className="w-full flex justify-center pt-10">
        <ScrollIndicator />
      </div>
    </section>
  );
}
