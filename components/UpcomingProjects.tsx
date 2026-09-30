"use client";

import React from "react";
import { upcomingProjectsData } from "@/data/projects";
import SafeImage from "./SafeImage";
import InfiniteMarquee from "./InfiniteMarquee";
import { AlertCircle, Clock } from "lucide-react";

export default function UpcomingProjects() {
  return (
    <section id="upcoming" className="py-12 md:py-16 border-t border-surface-border/60 dark:border-surface-border-dark/60">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col items-start space-y-1.5 mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Prototypes &amp; Concepts</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-charcoal dark:text-charcoal-dark">
            Upcoming Projects
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-soft dark:text-charcoal-soft-dark max-w-2xl">
            Early-stage design prototypes and concept iterations currently in active exploration.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {upcomingProjectsData.map((project, idx) => (
            <div
              key={project.slug}
              className="bg-white dark:bg-canvas-card-dark rounded-2xl border border-surface-border dark:border-surface-border-dark p-5 sm:p-7 shadow-2xs hover:border-accent-border/80 dark:hover:border-accent-dark hover:shadow-md transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div className="space-y-3.5">
                {/* Status & Category */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-canvas-subtle dark:bg-canvas-subtle-dark border border-surface-border dark:border-surface-border-dark text-charcoal-muted dark:text-charcoal-muted-dark">
                    {project.category}
                  </span>
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-charcoal dark:text-charcoal-dark tracking-tight group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-charcoal-muted dark:text-charcoal-muted-dark leading-relaxed">
                  {project.description}
                </p>

                {project.disclaimer && (
                  <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 leading-normal">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>{project.disclaimer}</span>
                  </div>
                )}

                {/* Pure Visual Continuous Showcase (Images ordered 01, 02, 03... NO text underneath) */}
                <div className="pt-2 w-full overflow-hidden rounded-xl">
                  <InfiniteMarquee
                    direction={idx % 2 === 0 ? "left" : "right"}
                    speed="normal"
                    durationSeconds={18}
                    pauseOnHover={true}
                    gapClass="gap-2.5 pr-2.5"
                  >
                    {project.images.map((imgSrc, imgIdx) => (
                      <div
                        key={`${imgSrc}-${imgIdx}`}
                        className="w-[200px] sm:w-[240px] shrink-0 aspect-[16/10] overflow-hidden rounded-xl bg-canvas-subtle dark:bg-canvas-subtle-dark border border-surface-border/60 dark:border-surface-border-dark"
                      >
                        <SafeImage
                          src={imgSrc}
                          alt={`${project.title} prototype preview ${imgIdx + 1}`}
                          fallbackTitle={`${project.title} #${imgIdx + 1}`}
                          fallbackSubtitle="In Development"
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                          aspectRatioClass="aspect-[16/10]"
                        />
                      </div>
                    ))}
                  </InfiniteMarquee>
                </div>
              </div>

              {/* Technologies */}
              <div className="mt-5 pt-3.5 border-t border-surface-border/60 dark:border-surface-border-dark/60 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-medium text-charcoal-soft dark:text-charcoal-soft-dark bg-canvas-subtle dark:bg-canvas-subtle-dark px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
