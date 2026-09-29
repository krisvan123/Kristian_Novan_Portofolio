"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown, Mail, FolderGit2, Sparkles } from "lucide-react";
import { personalData } from "@/data/personal";
import SafeImage from "./SafeImage";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Introduction & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-light border border-accent-border/60 text-accent text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>University Student &amp; Tech Enthusiast</span>
            </div>

            {/* Main Greeting & Name */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-charcoal leading-[1.12]">
                Hello, I&apos;m{" "}
                <span className="font-serif italic font-normal text-accent">
                  {personalData.name}
                </span>
              </h1>
              <p className="text-base sm:text-lg font-medium text-charcoal-muted tracking-tight">
                {personalData.role}
              </p>
            </div>

            {/* Concise Bio */}
            <p className="text-sm sm:text-base text-charcoal-soft leading-relaxed max-w-xl">
              {personalData.heroBio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-charcoal text-white text-sm font-medium hover:bg-accent transition-colors duration-200 shadow-sm"
              >
                <FolderGit2 className="w-4 h-4 stroke-[1.8]" />
                <span>View My Projects</span>
              </Link>

              <a
                href={`mailto:${personalData.contact.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-surface-border text-charcoal text-sm font-medium hover:border-accent hover:text-accent transition-colors duration-200 shadow-2xs"
              >
                <Mail className="w-4 h-4 stroke-[1.8]" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Quick Highlights / Social badges */}
            <div className="pt-4 flex items-center gap-6 text-xs text-charcoal-soft">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                <span>Computer Science</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                <span>AI &amp; Software Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                <span>Campus Activities</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dedicated Profile Photo Container */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              {/* Subtle Ambient Glow Behind Frame */}
              <div className="absolute -inset-2 rounded-3xl bg-accent-light/50 blur-xl -z-10 pointer-events-none" />

              {/* Profile Card Container with gentle floating animation */}
              <div className="relative bg-white p-3 rounded-2xl border border-surface-border shadow-sm animate-float-gentle">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-canvas-subtle border border-surface-border/50">
                  <SafeImage
                    src={personalData.profileImage}
                    alt={`${personalData.name} — Profile Portrait`}
                    fallbackTitle={personalData.name}
                    fallbackSubtitle="Portrait Placeholder (/public/images/profile.jpg)"
                    className="w-full h-full object-cover"
                    aspectRatioClass="aspect-[3/4]"
                  />
                </div>

                {/* Subtle photo metadata footer */}
                <div className="mt-3 px-1.5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-charcoal">
                      {personalData.name}
                    </span>
                    <span className="text-[11px] text-charcoal-soft">
                      Binus University • CS
                    </span>
                  </div>
                  <div className="px-2 py-0.5 rounded-md bg-canvas-subtle border border-surface-border text-[10px] font-medium text-charcoal-soft">
                    2026
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Small Scroll Indicator */}
        <div className="mt-16 md:mt-20 flex flex-col items-center justify-center text-charcoal-soft/80">
          <Link
            href="#about"
            className="group flex flex-col items-center gap-1.5 text-xs text-charcoal-soft hover:text-accent transition-colors"
            aria-label="Scroll to About section"
          >
            <span className="tracking-widest uppercase text-[10px] font-medium">
              Explore More
            </span>
            <div className="w-7 h-10 rounded-full border border-surface-border-hover flex items-start justify-center p-1.5">
              <span className="w-1 h-2 rounded-full bg-accent animate-bounce" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
