"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function ScrollIndicator() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 50) {
        setOpacity(1);
      } else if (scrollY < 200) {
        setOpacity(Math.max(0, 1 - (scrollY - 50) / 150));
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
        className="group flex flex-col items-center gap-2 text-charcoal-soft hover:text-accent transition-colors"
        aria-label="Scroll to explore About section"
      >
        <span className="text-[11px] font-medium tracking-widest uppercase transition-colors group-hover:text-accent">
          Scroll to explore
        </span>

        {/* Animated Mouse Icon */}
        <div className="w-5 h-8 rounded-full border-2 border-charcoal/30 group-hover:border-accent p-1 flex justify-center transition-colors shadow-2xs">
          <span className="w-1 h-2 rounded-full bg-accent animate-bounce" />
        </div>
      </Link>
    </div>
  );
}
