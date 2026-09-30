"use client";

import React from "react";
import { activitiesData, additionalExperiences } from "@/data/activities";
import InfiniteMarquee from "./InfiniteMarquee";
import SafeImage from "./SafeImage";
import { Building, Award, Sparkles } from "lucide-react";

export default function Activities() {
  const [walubiActivity, mcActivity] = activitiesData;

  return (
    <section id="activities" className="py-14 md:py-20 border-t border-surface-border overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12 mb-10 md:mb-12">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-subtle border border-surface-border text-charcoal-soft font-mono text-[11px]">
            <span>Leadership &amp; Campus Life</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-charcoal">
            Activities &amp; Experiences
          </h2>
          <p className="text-sm sm:text-base text-charcoal-soft max-w-2xl font-sans">
            Active committee organization, corporate visits, peer mentoring, and event stage moderation.
          </p>
        </div>
      </div>

      <div className="space-y-12 md:space-y-14">
        {/* Activity 1: Campus Committee & Event Organization */}
        <div className="space-y-4">
          <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12">
            <div className="bg-white dark:bg-canvas-card-dark p-6 sm:p-8 rounded-2xl border border-surface-border shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-light dark:bg-accent-soft text-accent dark:text-accent-dark text-xs font-semibold border border-accent-border/60">
                  <Award className="w-3.5 h-3.5" />
                  {walubiActivity.badge}
                </span>
                <span className="text-xs text-charcoal-soft font-mono">
                  8 Event Photos
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-charcoal tracking-tight">
                {walubiActivity.title}
              </h3>
              <p className="text-sm sm:text-base text-charcoal-muted mt-2 max-w-3xl leading-relaxed font-sans">
                {walubiActivity.description}
              </p>
            </div>
          </div>

          {/* Activity 1: True Seamless Continuous Image Marquee (NO text underneath) */}
          <div className="w-full">
            <InfiniteMarquee direction="left" speed="normal" durationSeconds={24} pauseOnHover={true}>
              {walubiActivity.imagePaths.map((src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  className="w-[280px] sm:w-[380px] shrink-0 aspect-[16/11] overflow-hidden rounded-xl border border-surface-border bg-canvas-subtle shadow-2xs hover:border-accent-border hover:scale-[1.01] transition-all duration-300"
                >
                  <SafeImage
                    src={src}
                    alt={`Campus committee activity photo ${idx + 1}`}
                    fallbackTitle={`Activity Photo ${idx + 1}`}
                    fallbackSubtitle="WALUBI & Campus Committees"
                    className="w-full h-full object-cover"
                    aspectRatioClass="aspect-[16/11]"
                  />
                </div>
              ))}
            </InfiniteMarquee>
          </div>
        </div>

        {/* Activity 2: Master of Ceremony */}
        <div className="space-y-4">
          <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12">
            <div className="bg-white dark:bg-canvas-card-dark p-6 sm:p-8 rounded-2xl border border-surface-border shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-light dark:bg-accent-soft text-accent dark:text-accent-dark text-xs font-semibold border border-accent-border/60">
                  <Sparkles className="w-3.5 h-3.5" />
                  {mcActivity.badge}
                </span>
                <span className="text-xs text-charcoal-soft font-mono">
                  6 Stage Photos
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-charcoal tracking-tight">
                {mcActivity.title}
              </h3>
              <p className="text-sm sm:text-base text-charcoal-muted mt-2 max-w-3xl leading-relaxed font-sans">
                {mcActivity.description}
              </p>
            </div>
          </div>

          {/* Activity 2: True Seamless Continuous Image Marquee (NO text underneath) */}
          <div className="w-full">
            <InfiniteMarquee direction="right" speed="normal" durationSeconds={22} pauseOnHover={true}>
              {mcActivity.imagePaths.map((src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  className="w-[280px] sm:w-[380px] shrink-0 aspect-[16/11] overflow-hidden rounded-xl border border-surface-border bg-canvas-subtle shadow-2xs hover:border-accent-border hover:scale-[1.01] transition-all duration-300"
                >
                  <SafeImage
                    src={src}
                    alt={`Master of Ceremony documentation ${idx + 1}`}
                    fallbackTitle={`MC Photo ${idx + 1}`}
                    fallbackSubtitle="Master of Ceremony"
                    className="w-full h-full object-cover"
                    aspectRatioClass="aspect-[16/11]"
                  />
                </div>
              ))}
            </InfiniteMarquee>
          </div>
        </div>

        {/* Activity 3: Additional Campus Experiences */}
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12">
          <div className="bg-canvas-subtle p-6 sm:p-8 rounded-2xl border border-surface-border space-y-5">
            <div className="flex flex-col space-y-1">
              <span className="text-xs font-mono font-semibold text-accent dark:text-accent-dark uppercase tracking-wider">
                Campus Engagement
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-charcoal">
                Additional Campus Experiences
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-soft font-sans">
                Peer mentorship with junior students, corporate site visits, and team-based development in university communities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {additionalExperiences.map((exp) => (
                <div
                  key={exp.role}
                  className="bg-white dark:bg-canvas-card-dark p-5 rounded-xl border border-surface-border shadow-2xs hover:border-accent-border hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs text-accent dark:text-accent-dark font-medium">
                      <Building className="w-3.5 h-3.5" />
                      <span className="truncate">{exp.organization}</span>
                    </div>
                    <h4 className="text-base font-display font-semibold text-charcoal leading-snug">
                      {exp.role}
                    </h4>
                    <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans">
                      {exp.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-surface-border/60">
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-canvas-subtle text-[11px] font-mono text-charcoal-soft"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
