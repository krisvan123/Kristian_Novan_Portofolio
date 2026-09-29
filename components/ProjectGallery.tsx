"use client";

import React from "react";
import SafeImage from "./SafeImage";
import Marquee from "./Marquee";
import { Eye } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
  title: string;
  caption?: string;
  direction?: "left" | "right";
}

export default function ProjectGallery({
  images,
  title,
  caption,
  direction = "right", // Continuous left-to-right as specified for Travel App
}: ProjectGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="w-full space-y-4">
      {caption && (
        <div className="flex items-center justify-between text-xs text-charcoal-soft px-1">
          <div className="flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-accent" />
            <span>{caption}</span>
          </div>
          <span className="font-mono text-[11px]">
            {images.length} Screen{images.length > 1 ? "s" : ""}
          </span>
        </div>
      )}

      <div className="w-full overflow-hidden rounded-2xl bg-white p-4 border border-surface-border shadow-2xs">
        <Marquee direction={direction} speed="slow" pauseOnHover={true}>
          {images.map((imgSrc, idx) => (
            <div
              key={`${imgSrc}-${idx}`}
              className="w-[340px] sm:w-[480px] shrink-0 overflow-hidden rounded-xl border border-surface-border/80 bg-canvas-subtle p-2 group hover:border-accent-border transition-all duration-300"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
                <SafeImage
                  src={imgSrc}
                  alt={`${title} screenshot ${idx + 1}`}
                  fallbackTitle={`${title} Screen ${idx + 1}`}
                  fallbackSubtitle="Screenshot Placeholder • Replace in /public/images/projects"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  aspectRatioClass="aspect-[16/10]"
                />
              </div>
              <div className="mt-2 px-1 flex items-center justify-between text-[11px] text-charcoal-soft">
                <span>{title} — Screenshot #{idx + 1}</span>
                <span className="font-mono">{imgSrc.split("/").pop()}</span>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
