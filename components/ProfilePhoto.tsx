"use client";

import React, { useRef, useState } from "react";
import SafeImage from "./SafeImage";
import { personalData } from "@/data/personal";

export default function ProfilePhoto() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Subtle max rotation +/- 3.5 degrees
    const rotateY = (mouseX / (rect.width / 2)) * 3.5;
    const rotateX = -(mouseY / (rect.height / 2)) * 3.5;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[340px] sm:max-w-[380px] select-none perspective-[1000px]"
    >
      {/* Ambient soft glow */}
      <div className="absolute -inset-2 rounded-3xl bg-accent-light/50 blur-xl -z-10 pointer-events-none transition-opacity duration-500" />

      {/* Tiltable Container */}
      <div
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.015, 1.015, 1.015)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        }}
        className="relative bg-white p-3.5 rounded-2xl border border-surface-border shadow-sm will-change-transform"
      >
        {/* Inner Image Container with subtle parallax */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-canvas-subtle border border-surface-border/50">
          <div
            style={{
              transform: isHovered
                ? `translate3d(${-rotate.y * 1.2}px, ${rotate.x * 1.2}px, 0)`
                : "translate3d(0, 0, 0)",
              transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
            }}
            className="w-full h-full"
          >
            <SafeImage
              src={personalData.profileImage}
              alt={`${personalData.name} — Profile Portrait`}
              fallbackTitle={personalData.name}
              fallbackSubtitle="Portrait Placeholder (/public/images/profile.jpg)"
              className="w-full h-full object-cover"
              aspectRatioClass="aspect-[3/4]"
            />
          </div>
        </div>

        {/* Minimal metadata strip */}
        <div className="mt-3 px-1.5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-charcoal">
              {personalData.name}
            </span>
            <span className="text-[11px] text-charcoal-soft font-mono">
              BINUS University • {personalData.classYear}
            </span>
          </div>
          <div className="px-2 py-0.5 rounded-md bg-canvas-subtle border border-surface-border text-[10px] font-mono font-medium text-accent">
            CS Student
          </div>
        </div>
      </div>
    </div>
  );
}
