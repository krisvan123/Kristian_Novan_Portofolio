"use client";

import React, { useState } from "react";

export default function CrayonSunflower() {
  const [isHappy, setIsHappy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = () => {
    setIsHappy(true);
    const messages = ["You found me! 🌻", "Nice to see you! ✨", "Have a wonderful day! ☀️"];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMsg);

    setTimeout(() => {
      setIsHappy(false);
      setMessage(null);
    }, 3200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-6 select-none">
      {/* Speech Bubble */}
      {message && (
        <div className="absolute -top-12 z-20 px-3.5 py-1.5 rounded-full bg-white border border-amber-300 text-charcoal text-xs font-medium shadow-md animate-fade-in-up flex items-center gap-1.5 whitespace-nowrap">
          <span>{message}</span>
          <span className="w-2 h-2 absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white border-r border-b border-amber-300 rotate-45" />
        </div>
      )}

      {/* Sunflower Button Container */}
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label="Interactive hand-drawn crayon sunflower easter egg"
        title="Click the sunflower!"
        className={`group relative outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full p-2 transition-transform duration-300 ${
          isHappy ? "-translate-y-3 scale-110" : "hover:scale-105 active:scale-95"
        }`}
      >
        <svg
          width="84"
          height="100"
          viewBox="0 0 84 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-all duration-300 ${
            isHappy ? "animate-bounce" : "animate-float-gentle"
          }`}
          style={{
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.06))",
          }}
        >
          {/* Crayon Stem (rough textured curve) */}
          <path
            d="M42 58 C 41 72, 44 86, 42 98"
            stroke="#4A7A46"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeDasharray="60"
            strokeDashoffset="0"
          />

          {/* Left Leaf */}
          <path
            d="M41 76 C 28 72, 22 80, 26 86 C 32 88, 38 84, 42 79"
            fill="#5E9659"
            stroke="#3C6438"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className={`origin-[41px_76px] transition-transform duration-300 ${
              isHappy ? "-rotate-12" : "group-hover:-rotate-6"
            }`}
          />

          {/* Right Leaf */}
          <path
            d="M43 82 C 55 78, 62 84, 58 90 C 52 92, 46 88, 43 84"
            fill="#5E9659"
            stroke="#3C6438"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className={`origin-[43px_82px] transition-transform duration-300 ${
              isHappy ? "rotate-12" : "group-hover:rotate-6"
            }`}
          />

          {/* Crayon Petals - 12 hand-drawn warm yellow petals */}
          <g className={`origin-[42px_36px] transition-transform duration-500 ${isHappy ? "rotate-45" : ""}`}>
            {/* Petal 0 */}
            <path d="M42 4 C 38 12, 38 20, 42 22 C 46 20, 46 12, 42 4 Z" fill="#F4B728" stroke="#D99714" strokeWidth="1.8" />
            {/* Petal 30 */}
            <path d="M58 8 C 51 14, 48 22, 51 25 C 55 24, 61 18, 58 8 Z" fill="#F9C338" stroke="#D99714" strokeWidth="1.8" />
            {/* Petal 60 */}
            <path d="M70 19 C 62 21, 56 27, 57 31 C 61 32, 69 28, 70 19 Z" fill="#F4B728" stroke="#D99714" strokeWidth="1.8" />
            {/* Petal 90 */}
            <path d="M74 36 C 66 33, 58 34, 56 38 C 58 42, 66 43, 74 36 Z" fill="#F9C338" stroke="#D99714" strokeWidth="1.8" />
            {/* Petal 120 */}
            <path d="M68 53 C 62 46, 55 45, 52 48 C 53 53, 59 58, 68 53 Z" fill="#F4B728" stroke="#D99714" strokeWidth="1.8" />
            {/* Petal 150 */}
            <path d="M54 64 C 52 56, 46 51, 43 53 C 42 58, 47 66, 54 64 Z" fill="#F9C338" stroke="#D99714" strokeWidth="1.8" />
            {/* Petal 180 */}
            <path d="M42 68 C 45 60, 45 52, 42 50 C 39 52, 39 60, 42 68 Z" fill="#F4B728" stroke="#D99714" strokeWidth="1.8" />
            {/* Petal 210 */}
            <path d="M26 64 C 33 58, 36 50, 33 47 C 29 48, 23 54, 26 64 Z" fill="#F9C338" stroke="#D99714" strokeWidth="1.8" />
            {/* Petal 240 */}
            <path d="M14 53 C 22 51, 28 45, 27 41 C 23 40, 15 44, 14 53 Z" fill="#F4B728" stroke="#D99714" strokeWidth="1.8" />
            {/* Petal 270 */}
            <path d="M10 36 C 18 39, 26 38, 28 34 C 26 30, 18 29, 10 36 Z" fill="#F9C338" stroke="#D99714" strokeWidth="1.8" />
            {/* Petal 300 */}
            <path d="M16 19 C 22 26, 29 27, 32 24 C 31 19, 25 14, 16 19 Z" fill="#F4B728" stroke="#D99714" strokeWidth="1.8" />
            {/* Petal 330 */}
            <path d="M30 8 C 32 16, 38 21, 41 19 C 42 14, 37 6, 30 8 Z" fill="#F9C338" stroke="#D99714" strokeWidth="1.8" />
          </g>

          {/* Center Circle (Crayon Brown Disk) */}
          <circle
            cx="42"
            cy="36"
            r="16"
            fill="#75471F"
            stroke="#533113"
            strokeWidth="2.5"
          />

          {/* Seeds / Texture Dots */}
          <circle cx="37" cy="31" r="1.2" fill="#533113" />
          <circle cx="47" cy="32" r="1.2" fill="#533113" />
          <circle cx="42" cy="42" r="1.2" fill="#533113" />
          <circle cx="36" cy="40" r="1.2" fill="#533113" />
          <circle cx="48" cy="39" r="1.2" fill="#533113" />

          {/* Sunflower Face (Happy Expression vs Idle Smile) */}
          {isHappy ? (
            /* Joyful Smiling Eyes + Happy Open Mouth + Pink Blush */
            <g className="animate-pulse">
              {/* Happy Arched Eyes ^^ */}
              <path d="M34 32 C 34 30, 38 30, 38 32" stroke="#FAF9F5" strokeWidth="2" strokeLinecap="round" />
              <path d="M46 32 C 46 30, 50 30, 50 32" stroke="#FAF9F5" strokeWidth="2" strokeLinecap="round" />
              {/* Rosy Cheeks */}
              <circle cx="33" cy="37" r="2.2" fill="#FF8A80" opacity="0.8" />
              <circle cx="51" cy="37" r="2.2" fill="#FF8A80" opacity="0.8" />
              {/* Happy Open Smile */}
              <path d="M37 36 C 39 42, 45 42, 47 36 Z" fill="#FAF9F5" stroke="#FAF9F5" strokeWidth="1.2" />
            </g>
          ) : (
            /* Gentle Idle Friendly Face */
            <g>
              {/* Gentle Cute Eyes */}
              <circle cx="36" cy="33" r="1.8" fill="#FAF9F5" />
              <circle cx="48" cy="33" r="1.8" fill="#FAF9F5" />
              {/* Gentle Smile */}
              <path
                d="M38 38 C 40 41, 44 41, 46 38"
                stroke="#FAF9F5"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>
          )}
        </svg>
      </button>

      {/* Subtle Caption */}
      <span className="text-[10px] text-charcoal-soft/60 tracking-wider font-mono">
        tap the sunflower 🌻
      </span>
    </div>
  );
}
