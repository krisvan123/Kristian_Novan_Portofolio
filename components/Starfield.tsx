"use client";

import React, { useMemo } from "react";
import { useTheme } from "./ThemeProvider";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function Starfield() {
  const { theme, isMounted } = useTheme();

  // Generate a small, deterministic set of 36 sparse stars
  const stars: Star[] = useMemo(() => {
    const list: Star[] = [];
    const seed = [
      { x: 12, y: 15, s: 1.2, d: 4.2, l: 0.2, o: 0.6 },
      { x: 28, y: 8, s: 1.8, d: 5.5, l: 1.5, o: 0.8 },
      { x: 45, y: 22, s: 1.0, d: 3.8, l: 0.8, o: 0.5 },
      { x: 62, y: 12, s: 1.5, d: 6.0, l: 2.1, o: 0.7 },
      { x: 78, y: 28, s: 2.0, d: 4.8, l: 1.0, o: 0.85 },
      { x: 89, y: 18, s: 1.1, d: 5.2, l: 2.7, o: 0.6 },
      { x: 95, y: 35, s: 1.4, d: 4.0, l: 0.5, o: 0.75 },
      { x: 8, y: 45, s: 1.6, d: 6.5, l: 3.0, o: 0.65 },
      { x: 22, y: 55, s: 1.0, d: 4.5, l: 1.2, o: 0.55 },
      { x: 38, y: 68, s: 1.7, d: 5.8, l: 2.0, o: 0.8 },
      { x: 55, y: 48, s: 1.2, d: 3.5, l: 0.7, o: 0.6 },
      { x: 72, y: 62, s: 1.8, d: 6.2, l: 1.8, o: 0.75 },
      { x: 84, y: 75, s: 1.3, d: 4.9, l: 2.4, o: 0.7 },
      { x: 16, y: 82, s: 1.5, d: 5.1, l: 1.1, o: 0.65 },
      { x: 32, y: 92, s: 1.2, d: 4.3, l: 2.8, o: 0.6 },
      { x: 68, y: 88, s: 1.6, d: 5.7, l: 0.9, o: 0.75 },
      { x: 88, y: 94, s: 1.1, d: 4.1, l: 1.6, o: 0.5 },
      { x: 50, y: 80, s: 1.9, d: 6.0, l: 3.2, o: 0.85 },
    ];

    seed.forEach((s, idx) => {
      list.push({
        id: idx,
        x: s.x,
        y: s.y,
        size: s.s,
        duration: s.d,
        delay: s.l,
        opacity: s.o,
      });
    });

    return list;
  }, []);

  if (!isMounted || theme !== "dark") return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden motion-reduce:hidden"
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.6)`,
          }}
        />
      ))}
    </div>
  );
}
