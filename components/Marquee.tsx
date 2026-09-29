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
  // Speed mapping for duration
  const speedClass =
    speed === "slow"
      ? "duration-[60s]"
      : speed === "fast"
      ? "duration-[25s]"
      : "duration-[40s]";

  const animationClass =
    direction === "left"
      ? "animate-marquee-left"
      : "animate-marquee-right";

  return (
    <div
      className={`group relative flex overflow-hidden select-none ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        className={`flex min-w-full shrink-0 items-center justify-around gap-6 ${animationClass} ${speedClass} ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        } motion-reduce:[animation-play-state:paused]`}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={`flex min-w-full shrink-0 items-center justify-around gap-6 ${animationClass} ${speedClass} ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        } motion-reduce:[animation-play-state:paused]`}
      >
        {children}
      </div>
    </div>
  );
}
