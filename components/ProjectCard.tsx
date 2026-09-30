"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectDetail } from "@/data/projects";
import SafeImage from "./SafeImage";

interface ProjectCardProps {
  project: ProjectDetail;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col justify-between bg-white dark:bg-canvas-card-dark rounded-2xl border border-surface-border dark:border-surface-border-dark p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-accent-border/90 dark:hover:border-accent-dark hover:-translate-y-1.5 transition-all duration-300">
      <div>
        {/* Image Preview Container (Primary 01 Suffix Thumbnail) */}
        <Link
          href={`/projects/${project.slug}`}
          className="block relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-canvas-subtle dark:bg-canvas-subtle-dark border border-surface-border/50 dark:border-surface-border-dark mb-5 group/img"
          tabIndex={-1}
          aria-hidden="true"
        >
          <SafeImage
            src={project.previewImage}
            alt={`${project.title} preview`}
            fallbackTitle={project.title}
            fallbackSubtitle="Project Preview"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/img:scale-104"
            aspectRatioClass="aspect-[16/10]"
          />
          <div className="absolute inset-0 bg-charcoal/5 dark:bg-white/5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </Link>

        {/* Category Label */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-block px-2.5 py-0.5 rounded-md bg-canvas-subtle dark:bg-canvas-subtle-dark border border-surface-border dark:border-surface-border-dark text-[11px] font-medium text-charcoal-muted dark:text-charcoal-muted-dark">
            {project.category}
          </span>
          <span className="text-[11px] font-mono text-charcoal-soft/70 dark:text-charcoal-soft-dark/70">
            0{index + 1}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-semibold text-charcoal dark:text-charcoal-dark group-hover:text-accent dark:group-hover:text-accent-dark transition-colors duration-200 tracking-tight">
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>

        {/* Optional Subtitle */}
        {project.subtitle && (
          <p className="text-xs font-serif italic text-accent dark:text-accent-dark mt-0.5">
            {project.subtitle}
          </p>
        )}

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-charcoal-soft dark:text-charcoal-soft-dark line-clamp-3 mt-2.5 leading-relaxed">
          {project.shortDescription}
        </p>
      </div>

      {/* Footer: Tech tags + About Project Button */}
      <div className="mt-6 pt-4 border-t border-surface-border/60 dark:border-surface-border-dark/60">
        {/* Technologies Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-medium text-charcoal-muted dark:text-charcoal-muted-dark bg-canvas-subtle dark:bg-canvas-subtle-dark px-2 py-0.5 rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-[11px] font-medium text-charcoal-soft dark:text-charcoal-soft-dark bg-canvas-subtle dark:bg-canvas-subtle-dark px-1.5 py-0.5 rounded">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Action Link with animated arrow */}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center justify-between w-full text-xs font-semibold text-charcoal dark:text-charcoal-dark group-hover:text-accent dark:group-hover:text-accent-dark pt-1 transition-colors duration-200"
        >
          <span>About Project</span>
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-charcoal-soft dark:text-charcoal-soft-dark group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
              Explore
            </span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </Link>
      </div>
    </div>
  );
}
