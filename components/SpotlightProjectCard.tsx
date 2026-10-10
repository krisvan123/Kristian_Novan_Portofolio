"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Trophy, Sparkles, ExternalLink } from "lucide-react";
import { ProjectDetail } from "@/data/projects";
import SafeImage from "./SafeImage";

interface SpotlightProjectCardProps {
  project: ProjectDetail;
}

export default function SpotlightProjectCard({ project }: SpotlightProjectCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-white to-canvas-subtle dark:from-canvas-card-dark dark:via-canvas-card-dark dark:to-canvas-subtle-dark border border-surface-border shadow-xs hover:border-accent-border hover:shadow-lg transition-all duration-300 group">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 dark:bg-accent/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-6 sm:p-8 lg:p-10 items-center">
        {/* Left Column: Editorial Case Study Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-3.5">
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 font-mono text-[11px] font-medium shadow-2xs">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>Top 41 Finalist · CompFest AIC UI</span>
              </span>
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-canvas-subtle border border-surface-border text-[11px] font-mono font-medium text-charcoal-muted">
                {project.category}
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1">
              <h3 className="text-3xl sm:text-4xl font-display font-bold text-charcoal group-hover:text-accent transition-colors tracking-tight">
                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
              </h3>
              {project.subtitle && (
                <p className="text-sm font-mono text-accent dark:text-accent-dark font-medium">
                  {project.subtitle}
                </p>
              )}
            </div>

            {/* Problem & Build Narrative */}
            <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-sans max-w-xl">
              {project.shortDescription}
            </p>

            {/* Highlights Telemetry Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
              <div className="p-2.5 rounded-xl bg-canvas-subtle border border-surface-border space-y-0.5">
                <span className="text-[10px] text-charcoal-soft block uppercase">Core Innovation</span>
                <span className="font-semibold text-charcoal block">Dynamic Mass Routing</span>
              </div>
              <div className="p-2.5 rounded-xl bg-canvas-subtle border border-surface-border space-y-0.5">
                <span className="text-[10px] text-charcoal-soft block uppercase">Optimization</span>
                <span className="font-semibold text-charcoal block">Heuristic Search</span>
              </div>
              <div className="p-2.5 rounded-xl bg-canvas-subtle border border-surface-border space-y-0.5">
                <span className="text-[10px] text-charcoal-soft block uppercase">Target Impact</span>
                <span className="font-semibold text-charcoal block">Green Carbon Reduction</span>
              </div>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-canvas-subtle/80 border border-surface-border/60 text-[11px] font-mono text-charcoal-soft"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Link */}
          <div className="pt-2">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-charcoal dark:bg-charcoal-dark text-white dark:text-canvas-dark text-xs sm:text-sm font-semibold font-display shadow-xs group-hover:bg-accent dark:group-hover:bg-accent-hover group-hover:text-white transition-all duration-200"
            >
              <span>Explore Complete Case Study</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Column: Hero Showcase Visual */}
        <div className="lg:col-span-5">
          <Link
            href={`/projects/${project.slug}`}
            className="block relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-canvas-subtle border border-surface-border shadow-xs group/thumb"
          >
            <SafeImage
              src={project.previewImage}
              alt={`${project.title} spotlight`}
              fallbackTitle={project.title}
              fallbackSubtitle="Spotlight Preview"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/thumb:scale-104"
              aspectRatioClass="aspect-[16/11]"
            />
            {/* Live Case Study Badge Overlay */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-mono">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Featured Case Study</span>
              </span>
              <span className="text-accent-border font-semibold flex items-center gap-1">
                <span>View Details</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
