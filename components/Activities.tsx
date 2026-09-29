"use client";

import React from "react";
import { activitiesData, additionalExperiences } from "@/data/activities";
import Marquee from "./Marquee";
import SafeImage from "./SafeImage";
import { Building, Award, Sparkles } from "lucide-react";

export default function Activities() {
  const [walubiActivity, mcActivity] = activitiesData;

  return (
    <section id="activities" className="py-12 md:py-16 border-t border-surface-border/60 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-8 mb-8 md:mb-10">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-subtle border border-surface-border text-charcoal-soft text-xs font-semibold">
            <span>Leadership &amp; Campus Life</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-charcoal">
            Activities &amp; Experiences
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-soft max-w-2xl">
            Active committee organization, corporate visits, peer mentoring, and event stage moderation.
          </p>
        </div>
      </div>

      <div className="space-y-10 md:space-y-12">
        {/* Activity 1: Campus Committee & Event Organization */}
        <div className="space-y-4">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="bg-white p-5 sm:p-7 rounded-2xl border border-surface-border shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-light text-accent text-xs font-semibold">
                  <Award className="w-3.5 h-3.5" />
                  {walubiActivity.badge}
                </span>
                <span className="text-xs text-charcoal-soft font-mono">
                  8 Event Photos
                </span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-charcoal tracking-tight">
                {walubiActivity.title}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-1.5 max-w-3xl leading-relaxed">
                {walubiActivity.description}
              </p>
            </div>
          </div>

          {/* Activity 1: True Seamless Continuous Image Marquee (NO text underneath) */}
          <div className="w-full">
            <Marquee direction="left" speed="normal" pauseOnHover={true}>
              {walubiActivity.imagePaths.map((src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  className="w-[280px] sm:w-[360px] shrink-0 aspect-[16/11] overflow-hidden rounded-xl border border-surface-border/80 bg-canvas-subtle shadow-2xs hover:border-accent-border/90 hover:scale-[1.01] transition-all duration-300"
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
            </Marquee>
          </div>
        </div>

        {/* Activity 2: Master of Ceremony */}
        <div className="space-y-4">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="bg-white p-5 sm:p-7 rounded-2xl border border-surface-border shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-light text-accent text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  {mcActivity.badge}
                </span>
                <span className="text-xs text-charcoal-soft font-mono">
                  6 Stage Photos
                </span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-charcoal tracking-tight">
                {mcActivity.title}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-1.5 max-w-3xl leading-relaxed">
                {mcActivity.description}
              </p>
            </div>
          </div>

          {/* Activity 2: True Seamless Continuous Image Marquee (NO text underneath) */}
          <div className="w-full">
            <Marquee direction="right" speed="normal" pauseOnHover={true}>
              {mcActivity.imagePaths.map((src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  className="w-[280px] sm:w-[360px] shrink-0 aspect-[16/11] overflow-hidden rounded-xl border border-surface-border/80 bg-canvas-subtle shadow-2xs hover:border-accent-border/90 hover:scale-[1.01] transition-all duration-300"
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
            </Marquee>
          </div>
        </div>

        {/* Activity 3: Additional Campus Experiences */}
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="bg-[#FAF9F5] p-5 sm:p-7 rounded-2xl border border-surface-border space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="text-xs font-semibold text-accent uppercase tracking-wider font-mono">
                Campus Engagement
              </span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-charcoal">
                Additional Campus Experiences
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-soft">
                Peer mentorship with junior students, corporate site visits, and team-based development in university communities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {additionalExperiences.map((exp) => (
                <div
                  key={exp.role}
                  className="bg-white p-4 sm:p-5 rounded-xl border border-surface-border shadow-2xs hover:border-accent-border hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-accent font-medium">
                      <Building className="w-3.5 h-3.5" />
                      <span className="truncate">{exp.organization}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-semibold text-charcoal leading-snug">
                      {exp.role}
                    </h4>
                    <p className="text-xs text-charcoal-muted leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-surface-border/60">
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-canvas-subtle text-[10px] sm:text-[11px] font-medium text-charcoal-soft"
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
