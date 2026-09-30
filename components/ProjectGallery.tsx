"use client";

import React from "react";
import SafeImage from "./SafeImage";
import InfiniteMarquee from "./InfiniteMarquee";

interface ProjectGalleryProps {
  images: string[];
  title: string;
  direction?: "left" | "right";
}

export default function ProjectGallery({
  images,
  title,
  direction = "right",
}: ProjectGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white dark:bg-canvas-card-dark p-3.5 sm:p-5 border border-surface-border shadow-2xs">
      <InfiniteMarquee
        direction={direction}
        speed="normal"
        durationSeconds={20}
        pauseOnHover={true}
        gapClass="gap-3.5 sm:gap-5 pr-3.5 sm:pr-5"
      >
        {images.map((imgSrc, idx) => (
          <div
            key={`${imgSrc}-${idx}`}
            className="w-[280px] sm:w-[460px] md:w-[520px] shrink-0 aspect-[16/10] overflow-hidden rounded-xl border border-surface-border/80 bg-canvas-subtle shadow-2xs group hover:border-accent-border hover:scale-[1.01] transition-all duration-300"
          >
            <SafeImage
              src={imgSrc}
              alt={`${title} visual documentation`}
              fallbackTitle={title}
              fallbackSubtitle="Project Image"
              className="w-full h-full object-cover"
              aspectRatioClass="aspect-[16/10]"
            />
          </div>
        ))}
      </InfiniteMarquee>
    </div>
  );
}
