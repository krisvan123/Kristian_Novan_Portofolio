"use client";

import React from "react";
import { activitiesData, additionalExperiences } from "@/data/activities";
import Marquee from "./Marquee";
import SafeImage from "./SafeImage";
import { Calendar, Building, Sparkles, Award } from "lucide-react";

export default function Activities() {
  const [walubiActivity, mcActivity] = activitiesData;

  return (
    <section id="activities" className="py-20 md:py-28 border-t border-surface-border/60 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-8 mb-12">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-subtle border border-surface-border text-charcoal-soft text-xs font-medium">
            <span>Involvement &amp; Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-charcoal">
            Activities &amp; Experiences
          </h2>
          <p className="text-sm sm:text-base text-charcoal-soft max-w-2xl">
            Campus initiatives, organizational committees, and stage moderation experiences.
          </p>
        </div>
      </div>

      <div className="space-y-16">
        {/* Activity 1: Campus Committee & Event Organization */}
        <div className="space-y-6">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-surface-border shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-light text-accent text-xs font-semibold">
                  <Award className="w-3.5 h-3.5" />
                  {walubiActivity.badge}
                </span>
                <span className="text-xs text-charcoal-soft font-mono">
                  8 Curated Photos
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-charcoal tracking-tight">
                {walubiActivity.title}
              </h3>
              <p className="text-sm text-charcoal-muted mt-2 max-w-3xl leading-relaxed">
                {walubiActivity.description}
              </p>
            </div>
          </div>

          {/* Activity 1 Infinite Marquee (8 Photos) */}
          <div className="w-full">
            <Marquee direction="left" speed="normal" pauseOnHover={true}>
              {walubiActivity.images.map((item, idx) => (
                <div
                  key={`${item.src}-${idx}`}
                  className="w-[280px] sm:w-[320px] shrink-0 bg-white p-3 rounded-xl border border-surface-border shadow-2xs hover:border-accent-border transition-all duration-200"
                >
                  <div className="aspect-[16/11] w-full overflow-hidden rounded-lg bg-canvas-subtle">
                    <SafeImage
                      src={item.src}
                      alt={item.alt}
                      fallbackTitle={`Activity Photo ${idx + 1}`}
                      fallbackSubtitle="Replace in /public/images/activities"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      aspectRatioClass="aspect-[16/11]"
                    />
                  </div>
                  <div className="mt-2.5 px-1 flex items-center justify-between">
                    <p className="text-xs font-medium text-charcoal truncate">
                      {item.caption}
                    </p>
                    <span className="text-[10px] text-charcoal-soft font-mono shrink-0 ml-2">
                      #{idx + 1}
                    </span>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>

        {/* Activity 2: Master of Ceremony */}
        <div className="space-y-6">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-surface-border shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-light text-accent text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  {mcActivity.badge}
                </span>
                <span className="text-xs text-charcoal-soft font-mono">
                  6 Curated Photos
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-charcoal tracking-tight">
                {mcActivity.title}
              </h3>
              <p className="text-sm text-charcoal-muted mt-2 max-w-3xl leading-relaxed">
                {mcActivity.description}
              </p>
            </div>
          </div>

          {/* Activity 2 Infinite Marquee (6 Photos) */}
          <div className="w-full">
            <Marquee direction="right" speed="normal" pauseOnHover={true}>
              {mcActivity.images.map((item, idx) => (
                <div
                  key={`${item.src}-${idx}`}
                  className="w-[280px] sm:w-[320px] shrink-0 bg-white p-3 rounded-xl border border-surface-border shadow-2xs hover:border-accent-border transition-all duration-200"
                >
                  <div className="aspect-[16/11] w-full overflow-hidden rounded-lg bg-canvas-subtle">
                    <SafeImage
                      src={item.src}
                      alt={item.alt}
                      fallbackTitle={`MC Photo ${idx + 1}`}
                      fallbackSubtitle="Replace in /public/images/activities"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      aspectRatioClass="aspect-[16/11]"
                    />
                  </div>
                  <div className="mt-2.5 px-1 flex items-center justify-between">
                    <p className="text-xs font-medium text-charcoal truncate">
                      {item.caption}
                    </p>
                    <span className="text-[10px] text-charcoal-soft font-mono shrink-0 ml-2">
                      #{idx + 1}
                    </span>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>

        {/* Activity 3: Additional Campus Experiences */}
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="bg-[#FAF9F5] p-6 sm:p-8 rounded-2xl border border-surface-border space-y-6">
            <div className="flex flex-col space-y-1">
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                Community &amp; Academic Engagement
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-charcoal">
                Additional Campus Experiences
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-soft">
                Continuous engagement through student association mentorship, industrial site visits, and team initiatives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {additionalExperiences.map((exp) => (
                <div
                  key={exp.role}
                  className="bg-white p-5 rounded-xl border border-surface-border shadow-2xs hover:border-accent-border transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs text-accent font-medium">
                      <Building className="w-3.5 h-3.5" />
                      <span className="truncate">{exp.organization}</span>
                    </div>
                    <h4 className="text-base font-semibold text-charcoal leading-snug">
                      {exp.role}
                    </h4>
                    <p className="text-xs text-charcoal-muted leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-surface-border/60">
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-canvas-subtle text-[11px] font-medium text-charcoal-soft"
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
