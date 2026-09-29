"use client";

import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  // Duration for true seamless continuous loop
  const duration =
    speed === "slow" ? "52s" : speed === "fast" ? "26s" : "38s";

  const animationClass =
    direction === "left" ? "animate-seamless-left" : "animate-seamless-right";

  return (
    <div
      className={`group relative flex overflow-hidden select-none w-full ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
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
        <div className="flex shrink-0 items-center gap-5 pr-5">
          {children}
        </div>
        {/* Track B (Exact duplicate for seamless continuous ribbon loop) */}
        <div aria-hidden="true" className="flex shrink-0 items-center gap-5 pr-5">
          {children}
        </div>
      </div>
    </div>
  );
}
