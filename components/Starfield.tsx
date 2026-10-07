"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export default function Starfield() {
  const { theme, isMounted } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isMounted || theme !== "dark") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Generate ~65 organic drifting stars with depth & varying speeds
    const starCount = Math.min(75, Math.max(40, Math.floor(width / 22)));
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      // 3 organic depth tiers:
      // Tier 1 (distant): small, gentle drift
      // Tier 2 (mid): balanced
      // Tier 3 (close): slightly larger, brighter, faster noticeable drift
      const depth = Math.random();
      const radius = depth > 0.85 ? 1.8 + Math.random() * 0.6 : depth > 0.5 ? 1.2 + Math.random() * 0.4 : 0.8 + Math.random() * 0.3;
      // Visibly moving speed: ~0.35 to 0.85 px/frame
      const speedMultiplier = prefersReducedMotion ? 0 : 0.55 + depth * 0.75;

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() * 0.5 - 0.25) * speedMultiplier * 0.6,
        vy: (0.35 + Math.random() * 0.45) * speedMultiplier,
        radius,
        baseAlpha: 0.3 + depth * 0.5,
        twinkleSpeed: 0.025 + Math.random() * 0.045,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Move star (organic slow drift)
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around viewport edges smoothly
        if (star.x < -10) star.x = width + 10;
        if (star.x > width + 10) star.x = -10;
        if (star.y < -10) star.y = height + 10;
        if (star.y > height + 10) star.y = -10;

        // Gentle twinkle calculation
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase);
        const currentAlpha = Math.max(
          0.12,
          Math.min(0.95, star.baseAlpha + twinkle * 0.28)
        );

        // Draw star with soft ambient glow on larger stars
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 240, 245, ${currentAlpha})`;
        ctx.fill();

        if (star.radius > 1.4 && currentAlpha > 0.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 220, 255, ${currentAlpha * 0.18})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMounted, theme]);

  if (!isMounted || theme !== "dark") return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700 opacity-100"
    />
  );
}
