"use client";

import React from "react";

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  durationSeconds?: number;
  pauseOnHover?: boolean;
  className?: string;
  gapClass?: string;
}

export default function InfiniteMarquee({
  children,
  direction = "left",
  speed = "normal",
  durationSeconds,
  pauseOnHover = true,
  className = "",
  gapClass = "gap-4 sm:gap-5 pr-4 sm:pr-5",
}: InfiniteMarqueeProps) {
  // Speed tuned for lively showcase:
  // Desktop ~50-85 px/s, mobile ~30-55 px/s
  // "fast" = ~16s, "normal" = ~22s, "slow" = ~30s
  const duration = durationSeconds
    ? `${durationSeconds}s`
    : speed === "fast"
    ? "16s"
    : speed === "slow"
    ? "30s"
    : "22s";

  const animationClass =
    direction === "left" ? "animate-seamless-left" : "animate-seamless-right";

  return (
    <div
      className={`group relative flex overflow-hidden select-none w-full ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)",
      }}
    >
      <div
        className={`flex w-max shrink-0 will-change-transform ${animationClass} ${
          pauseOnHover ? "hover:[animation-play-state:paused]" : ""
        } motion-reduce:[animation-play-state:paused]`}
        style={
          {
            "--marquee-duration": duration,
          } as React.CSSProperties
        }
      >
        {/* Track A */}
        <div className={`flex shrink-0 items-center ${gapClass}`}>
          {children}
        </div>
        {/* Track B (Exact duplicate for uninterrupted infinite continuous loop) */}
        <div aria-hidden="true" className={`flex shrink-0 items-center ${gapClass}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
