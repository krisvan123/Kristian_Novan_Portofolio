"use client";

import React, { useState } from "react";

export default function CrayonSunflower() {
  const [isHappy, setIsHappy] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    if (isHappy) return;
    setIsHappy(true);
    setShowMessage(true);

    // Celebration duration: ~1.4 seconds then return smoothly to idle
    setTimeout(() => {
      setIsHappy(false);
    }, 1400);

    setTimeout(() => {
      setShowMessage(false);
    }, 2800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-2">
      {/* Hand-drawn style speech bubble */}
      {showMessage && (
        <div className="absolute -top-11 z-20 px-3 py-1 rounded-full bg-white border border-amber-300/80 text-charcoal text-[11px] font-mono shadow-xs animate-fade-in-up flex items-center gap-1.5 whitespace-nowrap">
          <span>you found me! 🌻</span>
          <span className="w-1.5 h-1.5 absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white border-r border-b border-amber-300 rotate-45" />
        </div>
      )}

      {/* Interactive Sunflower Button */}
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label="Handmade crayon sunflower illustration (click for small interaction)"
        title="Tap the sunflower!"
        className="group relative outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full p-1.5 cursor-pointer"
      >
        <div
          className={`transition-transform duration-300 ${
            isHappy ? "animate-crayon-happy" : "animate-crayon-sway group-hover:scale-105"
          }`}
        >
          <svg
            width="72"
            height="86"
            viewBox="0 0 72 86"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            {/* Hand-drawn crayon stem (deliberately wavy, organic curve) */}
            <path
              d="M36 48 C 35 58, 38 68, 36 84"
              stroke="#537F4B"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="40"
              strokeDashoffset="0"
            />
            {/* Secondary crayon stroke to give handmade texture */}
            <path
              d="M37 50 C 35.5 60, 37.5 70, 36.5 83"
              stroke="#3D6437"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Left Leaf (imperfect, hand-sketched) */}
            <g className={`origin-[35px_64px] transition-transform duration-300 ${isHappy ? "-rotate-12" : "group-hover:-rotate-6"}`}>
              <path
                d="M35 64 C 24 59, 18 66, 21 73 C 27 75, 32 71, 35 66 Z"
                fill="#6A9A5E"
                stroke="#3D6437"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {/* Leaf vein line */}
              <path d="M26 68 C 29 67, 32 66, 34 65" stroke="#3D6437" strokeWidth="1" strokeLinecap="round" />
            </g>

            {/* Right Leaf (imperfect, slightly asymmetrical) */}
            <g className={`origin-[37px_70px] transition-transform duration-300 ${isHappy ? "rotate-12" : "group-hover:rotate-6"}`}>
              <path
                d="M37 70 C 47 66, 53 72, 50 78 C 44 80, 39 76, 37 72 Z"
                fill="#6A9A5E"
                stroke="#3D6437"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {/* Leaf vein line */}
              <path d="M40 72 C 43 73, 46 75, 48 76" stroke="#3D6437" strokeWidth="1" strokeLinecap="round" />
            </g>

            {/* Hand-drawn Crayon Petals (deliberately uneven, handmade strokes) */}
            <g className={`origin-[36px_30px] transition-transform duration-500 ${isHappy ? "scale-105" : ""}`}>
              {/* Petal Top */}
              <path d="M36 6 C 32 13, 33 20, 36 21 C 39 20, 40 13, 36 6 Z" fill="#F7C438" stroke="#D39213" strokeWidth="1.8" />
              {/* Petal Top-Right 1 */}
              <path d="M48 9 C 42 15, 41 21, 44 23 C 47 22, 51 17, 48 9 Z" fill="#F1B526" stroke="#D39213" strokeWidth="1.8" />
              {/* Petal Top-Right 2 */}
              <path d="M57 18 C 50 20, 46 25, 48 28 C 51 29, 57 25, 57 18 Z" fill="#F7C438" stroke="#D39213" strokeWidth="1.8" />
              {/* Petal Right */}
              <path d="M60 31 C 53 29, 47 31, 46 34 C 48 37, 55 37, 60 31 Z" fill="#F1B526" stroke="#D39213" strokeWidth="1.8" />
              {/* Petal Bottom-Right 1 */}
              <path d="M55 43 C 50 37, 44 38, 43 41 C 44 44, 49 48, 55 43 Z" fill="#F7C438" stroke="#D39213" strokeWidth="1.8" />
              {/* Petal Bottom-Right 2 */}
              <path d="M45 52 C 43 45, 39 43, 37 45 C 37 49, 41 54, 45 52 Z" fill="#F1B526" stroke="#D39213" strokeWidth="1.8" />
              {/* Petal Bottom */}
              <path d="M35 55 C 37 48, 36 42, 34 41 C 32 43, 31 49, 35 55 Z" fill="#F7C438" stroke="#D39213" strokeWidth="1.8" />
              {/* Petal Bottom-Left 1 */}
              <path d="M23 51 C 28 46, 29 40, 27 38 C 24 39, 20 44, 23 51 Z" fill="#F1B526" stroke="#D39213" strokeWidth="1.8" />
              {/* Petal Bottom-Left 2 */}
              <path d="M14 42 C 21 39, 24 35, 23 32 C 20 32, 14 36, 14 42 Z" fill="#F7C438" stroke="#D39213" strokeWidth="1.8" />
              {/* Petal Left */}
              <path d="M11 29 C 18 31, 23 29, 24 26 C 22 23, 16 23, 11 29 Z" fill="#F1B526" stroke="#D39213" strokeWidth="1.8" />
              {/* Petal Top-Left 1 */}
              <path d="M16 16 C 22 21, 27 21, 29 18 C 28 15, 22 12, 16 16 Z" fill="#F7C438" stroke="#D39213" strokeWidth="1.8" />
              {/* Petal Top-Left 2 */}
              <path d="M26 8 C 29 15, 33 18, 35 16 C 35 13, 30 7, 26 8 Z" fill="#F1B526" stroke="#D39213" strokeWidth="1.8" />
            </g>

            {/* Hand-drawn Center Disk (warm, wobbly chocolate brown) */}
            <circle
              cx="35.5"
              cy="30.5"
              r="13"
              fill="#7A4822"
              stroke="#533116"
              strokeWidth="2.2"
            />
            {/* Subtle crayon texture sketch marks */}
            <circle cx="31" cy="26" r="0.9" fill="#533116" />
            <circle cx="40" cy="27" r="0.9" fill="#533116" />
            <circle cx="35" cy="35" r="0.9" fill="#533116" />

            {/* Tiny Friendly Face */}
            {isHappy ? (
              /* Joyful arched smiling face ^^ */
              <g className="transition-all duration-300">
                {/* Cheerful arched eyes */}
                <path d="M29 27 C 29 25, 32 25, 32 27" stroke="#FAF8F2" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M38 27 C 38 25, 41 25, 41 27" stroke="#FAF8F2" strokeWidth="1.8" strokeLinecap="round" />
                {/* Tiny pink blush cheeks */}
                <circle cx="28" cy="31" r="1.8" fill="#FF8D7E" opacity="0.85" />
                <circle cx="42" cy="31" r="1.8" fill="#FF8D7E" opacity="0.85" />
                {/* Happy open smile */}
                <path d="M31.5 31 C 33 35.5, 37 35.5, 38.5 31" fill="#FAF8F2" stroke="#FAF8F2" strokeWidth="1.2" strokeLinecap="round" />
              </g>
            ) : (
              /* Gentle, quiet, friendly idle smile */
              <g>
                <circle cx="30.5" cy="28" r="1.4" fill="#FAF8F2" />
                <circle cx="39.5" cy="28" r="1.4" fill="#FAF8F2" />
                <path
                  d="M32 32.5 C 33.5 34.5, 36.5 34.5, 38 32.5"
                  stroke="#FAF8F2"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </g>
            )}
          </svg>
        </div>
      </button>

      {/* Subtle hint */}
      <span className="text-[10px] text-charcoal-soft/50 font-mono tracking-wide mt-0.5">
        handmade with care 🌻
      </span>
    </div>
  );
}
