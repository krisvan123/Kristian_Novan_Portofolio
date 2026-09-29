"use client";

import React from "react";
import { upcomingProjectsData } from "@/data/projects";
import SafeImage from "./SafeImage";
import { Compass, Sparkles, AlertCircle, ArrowUpRight } from "lucide-react";

export default function UpcomingProjects() {
  return (
    <section id="upcoming" className="py-20 md:py-24 border-t border-surface-border/60">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col items-start space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Concepts &amp; Prototypes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-charcoal">
            Upcoming Projects
          </h2>
          <p className="text-sm sm:text-base text-charcoal-soft max-w-2xl">
            Concepts and initial prototypes currently undergoing iteration and design exploration.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {upcomingProjectsData.map((project) => (
            <div
              key={project.slug}
              className="bg-white rounded-2xl border border-surface-border p-6 sm:p-8 shadow-2xs hover:border-accent-border/80 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Status & Category */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-canvas-subtle border border-surface-border text-charcoal-muted">
                    {project.category}
                  </span>
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                    {project.status}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-charcoal tracking-tight group-hover:text-accent transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-charcoal-muted leading-relaxed">
                  {project.description}
                </p>

                {project.disclaimer && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 leading-normal">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{project.disclaimer}</span>
                  </div>
                )}

                {/* Two Image Previews */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {project.images.map((imgSrc, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="relative aspect-[16/10] overflow-hidden rounded-xl bg-canvas-subtle border border-surface-border/60"
                    >
                      <SafeImage
                        src={imgSrc}
                        alt={`${project.title} preview ${imgIdx + 1}`}
                        fallbackTitle={`${project.title} #${imgIdx + 1}`}
                        fallbackSubtitle="Upcoming Prototype"
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        aspectRatioClass="aspect-[16/10]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mt-6 pt-4 border-t border-surface-border/60 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-medium text-charcoal-soft bg-canvas-subtle px-2 py-0.5 rounded"
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
