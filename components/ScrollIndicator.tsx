"use client";

import React, { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";

export default function ScrollIndicator() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 20) {
        setOpacity(1);
      } else if (scrollY < 140) {
        setOpacity(Math.max(0, 1 - (scrollY - 20) / 120));
      } else {
        setOpacity(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const aboutEl = document.getElementById("about");
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (opacity <= 0.02) return null;

  return (
    <div
      style={{ opacity }}
      className="transition-opacity duration-300 flex flex-col items-center justify-center select-none"
    >
      <button
        type="button"
        onClick={handleClick}
        className="group flex flex-col items-center gap-1.5 text-charcoal-soft hover:text-accent transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1"
        aria-label="Scroll down to About section"
      >
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-charcoal-soft/80 group-hover:text-accent transition-colors">
          Scroll
        </span>

        {/* Vertical Track with Animated Traveling Dot */}
        <div className="relative w-px h-9 bg-border group-hover:bg-accent/40 transition-colors overflow-hidden my-0.5">
          <div
            className="absolute top-0 left-0 w-full h-3 bg-accent animate-pulse"
            style={{ animation: "scrollDot 1.8s ease-in-out infinite" }}
          />
        </div>

        <ArrowDown className="w-3 h-3 text-charcoal-soft/70 group-hover:text-accent group-hover:translate-y-0.5 transition-all duration-200" />

        <style jsx>{`
          @keyframes scrollDot {
            0% {
              transform: translateY(-100%);
              opacity: 0;
            }
            30% {
              opacity: 1;
            }
            75% {
              opacity: 1;
            }
            100% {
              transform: translateY(280%);
              opacity: 0;
            }
          }
        `}</style>
      </button>
    </div>
  );
}
