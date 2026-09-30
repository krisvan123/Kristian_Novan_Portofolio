"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import InfiniteMarquee from "./InfiniteMarquee";
import { X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

interface TravelShowcaseProps {
  images: string[];
  title: string;
}

// Known aspect ratios for the travel screenshots to preserve exact visual dimensions:
// travel-01: 1376x940 (desktop landscape, ~1.46)
// travel-02: 531x839 (mobile portrait, ~0.63)
// travel-03: 492x850 (mobile portrait, ~0.58)
// travel-04: 529x839 (mobile portrait, ~0.63)
const TRAVEL_RATIOS: Record<string, string> = {
  "/images/projects/travel-01.jpg": "w-[380px] sm:w-[540px] md:w-[620px]",
  "/images/projects/travel-02.jpg": "w-[190px] sm:w-[260px] md:w-[290px]",
  "/images/projects/travel-03.jpg": "w-[180px] sm:w-[250px] md:w-[280px]",
  "/images/projects/travel-04.jpg": "w-[190px] sm:w-[260px] md:w-[290px]",
};

export default function TravelShowcase({ images, title }: TravelShowcaseProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const selectedIndex = selectedImage
    ? images.findIndex((img) => img === selectedImage)
    : -1;

  const handleNext = useCallback(() => {
    if (selectedIndex < images.length - 1) {
      setSelectedImage(images[selectedIndex + 1]);
    } else {
      setSelectedImage(images[0]);
    }
  }, [selectedIndex, images]);

  const handlePrev = useCallback(() => {
    if (selectedIndex > 0) {
      setSelectedImage(images[selectedIndex - 1]);
    } else {
      setSelectedImage(images[images.length - 1]);
    }
  }, [selectedIndex, images]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    if (selectedImage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, handleNext, handlePrev]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full space-y-3">
      {/* Visual Showcase Ribbon Container with Defined Height Preserving Proportions */}
      <div className="w-full overflow-hidden rounded-2xl bg-white dark:bg-canvas-card-dark p-3 sm:p-5 border border-surface-border shadow-2xs">
        <InfiniteMarquee
          direction="right"
          durationSeconds={20}
          pauseOnHover={true}
          gapClass="gap-4 sm:gap-6 pr-4 sm:pr-6"
        >
          {images.map((imgSrc, idx) => {
            const widthClass =
              TRAVEL_RATIOS[imgSrc] || "w-[280px] sm:w-[420px]";

            return (
              <div
                key={`${imgSrc}-${idx}`}
                onClick={() => setSelectedImage(imgSrc)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedImage(imgSrc);
                  }
                }}
                className={`relative ${widthClass} h-[340px] sm:h-[430px] md:h-[480px] shrink-0 rounded-xl overflow-hidden bg-canvas-subtle border border-surface-border/80 group hover:border-accent-border/90 hover:scale-[1.02] hover:shadow-md transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent flex items-center justify-center p-2.5 sm:p-3`}
                title="Click to view full screenshot"
                aria-label={`UI screenshot ${idx + 1}`}
              >
                {/* Contained image preserving original aspect ratio with zero cropping */}
                <div className="relative w-full h-full">
                  <Image
                    src={imgSrc}
                    alt={`${title} UI screen ${idx + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 70vw, 550px"
                    priority={idx === 0}
                  />
                </div>

                {/* Subtle Hover Overlay with Maximize icon */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-xs text-white text-[11px] font-mono flex items-center gap-1.5 shadow-md">
                    <Maximize2 className="w-3 h-3" />
                    <span>View Screen</span>
                  </span>
                </div>
              </div>
            );
          })}
        </InfiniteMarquee>
      </div>

      {/* Full-Screen Lightbox Modal (Preserving Original Aspect Ratio & Never Cropping) */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="UI Screen Lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-8 animate-fade-in-up"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full h-[85vh] bg-[#18181C] rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#121214]">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-accent-dark">
                  Figma UI Screen
                </span>
                <span className="text-white/40">•</span>
                <span className="text-xs text-white/80 font-mono">
                  {selectedIndex + 1} of {images.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Viewport (Preserves exact aspect ratio, object-contain, never cropped) */}
            <div className="relative flex-1 w-full bg-black/60 flex items-center justify-center p-4 overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage}
                  alt={`${title} full UI screenshot`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Prev / Next controls */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer backdrop-blur-xs"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer backdrop-blur-xs"
                aria-label="Next screenshot"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
