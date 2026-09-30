"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function ScrollIndicator() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 30) {
        setOpacity(1);
      } else if (scrollY < 160) {
        setOpacity(Math.max(0, 1 - (scrollY - 30) / 130));
      } else {
        setOpacity(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (opacity <= 0.02) return null;

  return (
    <div
      style={{ opacity }}
      className="transition-opacity duration-300 flex flex-col items-center justify-center select-none"
    >
      <Link
        href="#about"
        className="group flex flex-col items-center gap-2 text-charcoal-soft dark:text-charcoal-soft-dark hover:text-accent dark:hover:text-accent-dark transition-colors"
        aria-label="Scroll down to explore About section"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-charcoal-soft/80 dark:text-charcoal-soft-dark/80 group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
          Scroll to explore
        </span>

        {/* Elegant Minimalist Vertical Track with Sliding Dot */}
        <div className="relative w-px h-8 bg-charcoal/20 dark:bg-white/20 group-hover:bg-accent/40 dark:group-hover:bg-accent-dark/40 transition-colors overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-3 bg-accent dark:bg-accent-dark animate-pulse"
            style={{ animation: "scrollDot 1.8s ease-in-out infinite" }}
          />
        </div>

        <style jsx>{`
          @keyframes scrollDot {
            0% {
              transform: translateY(-100%);
              opacity: 0;
            }
            30% {
              opacity: 1;
            }
            80% {
              opacity: 1;
            }
            100% {
              transform: translateY(250%);
              opacity: 0;
            }
          }
        `}</style>
      </Link>
    </div>
  );
}
