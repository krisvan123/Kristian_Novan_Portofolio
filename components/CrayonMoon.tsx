"use client";

import React, { useState } from "react";

export default function CrayonMoon() {
  const [isHappy, setIsHappy] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    if (isHappy) return;
    setIsHappy(true);
    setShowMessage(true);

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
      {/* Speech bubble */}
      {showMessage && (
        <div className="absolute -top-11 z-20 px-3 py-1 rounded-full bg-[#1E1E24] border border-indigo-400/60 text-slate-100 text-[11px] font-mono shadow-md animate-fade-in-up flex items-center gap-1.5 whitespace-nowrap">
          <span>good night! 🌙</span>
          <span className="w-1.5 h-1.5 absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#1E1E24] border-r border-b border-indigo-400/60 rotate-45" />
        </div>
      )}

      {/* Interactive Moon Button */}
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label="Handmade crayon moon illustration (click for small interaction)"
        title="Tap the moon!"
        className="group relative outline-none focus-visible:ring-2 focus-visible:ring-accent-dark rounded-full p-2 cursor-pointer"
      >
        <div
          className={`transition-transform duration-300 ${
            isHappy ? "animate-crayon-happy" : "animate-crayon-sway group-hover:scale-105"
          }`}
        >
          <svg
            width="78"
            height="86"
            viewBox="0 0 78 86"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            {/* Ambient tiny hand-drawn stars around moon */}
            <g className={`transition-opacity duration-300 ${isHappy ? "opacity-100 scale-110" : "opacity-70"}`}>
              {/* Star 1 */}
              <path d="M12 18 L14 12 L16 18 L22 20 L16 22 L14 28 L12 22 L6 20 Z" fill="#FCE881" opacity="0.8" />
              {/* Star 2 */}
              <circle cx="68" cy="24" r="2.2" fill="#E0E7FF" />
              {/* Star 3 */}
              <circle cx="16" cy="65" r="1.8" fill="#FCE881" />
              {/* Star 4 */}
              <path d="M64 62 L65.5 58 L67 62 L71 63.5 L67 65 L65.5 69 L64 65 L60 63.5 Z" fill="#E0E7FF" opacity="0.8" />
            </g>

            {/* Hand-drawn Crayon Crescent/Gibbous Moon Body (warm ivory-yellow, organic wobble) */}
            <path
              d="M32 8 C 52 10, 68 26, 64 52 C 60 72, 42 80, 24 78 C 38 72, 46 60, 44 44 C 42 26, 32 14, 32 8 Z"
              fill="#F9E286"
              stroke="#D8BA4A"
              strokeWidth="2.8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Secondary crayon texture stroke */}
            <path
              d="M34 11 C 51 13, 65 28, 61 51 C 58 68, 43 76, 27 75 C 38 69, 44 58, 42 44 C 40 28, 33 16, 34 11 Z"
              stroke="#F3D35B"
              strokeWidth="1.2"
              fill="none"
            />

            {/* Hand-drawn Crayon Craters / Patches */}
            <ellipse cx="50" cy="28" rx="3.5" ry="4" fill="#EDCB5A" opacity="0.6" />
            <ellipse cx="54" cy="56" rx="4" ry="3.5" fill="#EDCB5A" opacity="0.6" />
            <circle cx="42" cy="62" r="2" fill="#EDCB5A" opacity="0.5" />

            {/* Tiny Friendly Face on Moon */}
            {isHappy ? (
              /* Happy Smiling Face */
              <g className="transition-all duration-300">
                {/* Cheerful arched sleeping/smiling eye */}
                <path d="M42 36 C 42 33, 46 33, 46 36" stroke="#483812" strokeWidth="2" strokeLinecap="round" />
                {/* Rosy blush */}
                <circle cx="43" cy="42" r="2.5" fill="#FF8D7E" opacity="0.7" />
                {/* Joyful open smile */}
                <path d="M43 45 C 45 49, 49 49, 51 45" fill="#483812" stroke="#483812" strokeWidth="1.2" strokeLinecap="round" />
              </g>
            ) : (
              /* Peaceful, calm friendly face */
              <g>
                <circle cx="44" cy="35" r="1.8" fill="#483812" />
                <path
                  d="M44 44 C 46 46.5, 49 46.5, 51 44"
                  stroke="#483812"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </g>
            )}
          </svg>
        </div>
      </button>

      {/* Subtle hint */}
      <span className="text-[10px] text-slate-400 font-mono tracking-wide mt-0.5">
        peaceful night 🌙
      </span>
    </div>
  );
}
