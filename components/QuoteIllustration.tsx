"use client";

import React from "react";

interface QuoteIllustrationProps {
  type:
    | "sprout"
    | "path"
    | "telescope"
    | "prism"
    | "pencil"
    | "mountain"
    | "lightbulb"
    | "notebook";
  className?: string;
}

export default function QuoteIllustration({
  type,
  className = "",
}: QuoteIllustrationProps) {
  return (
    <div
      className={`relative flex items-center justify-center select-none w-28 h-24 sm:w-32 sm:h-28 ${className}`}
      aria-hidden="true"
    >
      {type === "sprout" && <SproutIllustration />}
      {type === "path" && <PathIllustration />}
      {type === "telescope" && <TelescopeIllustration />}
      {type === "prism" && <PrismIllustration />}
      {type === "pencil" && <PencilIllustration />}
      {type === "mountain" && <MountainIllustration />}
      {type === "lightbulb" && <LightbulbIllustration />}
      {type === "notebook" && <NotebookIllustration />}
    </div>
  );
}

/* 1. Sprout — "The beginning is the most important part of the work." */
function SproutIllustration() {
  return (
    <div className="relative animate-crayon-sway origin-bottom">
      <svg
        width="90"
        height="80"
        viewBox="0 0 90 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Earth mound base */}
        <path
          d="M18 68 C 30 62, 60 62, 72 68"
          stroke="#8B5E3C"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M26 73 C 38 69, 52 69, 64 73"
          stroke="#6E4426"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Tiny soil pebbles */}
        <circle cx="28" cy="65" r="1.5" fill="#8B5E3C" />
        <circle cx="62" cy="65" r="1.8" fill="#8B5E3C" />
        <circle cx="45" cy="71" r="1.2" fill="#6E4426" />

        {/* Stem - curved organic growth */}
        <path
          d="M45 65 C 44 48, 47 38, 45 22"
          stroke="#4D7C3F"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M46 63 C 44.5 48, 48 37, 45.5 24"
          stroke="#3A612E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Left leaf */}
        <g className="animate-pulse-slow origin-[45px_36px]">
          <path
            d="M45 36 C 30 32, 22 40, 26 50 C 35 52, 42 46, 45 38 Z"
            fill="#7CAE6B"
            stroke="#3A612E"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M32 43 C 36 41, 40 40, 44 38"
            stroke="#3A612E"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>

        {/* Right young leaf unfolding upward */}
        <g className="animate-pulse-slow origin-[45px_24px]">
          <path
            d="M45 22 C 58 14, 68 20, 64 32 C 54 36, 48 30, 45 24 Z"
            fill="#91C77F"
            stroke="#3A612E"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M50 25 C 55 24, 60 25, 62 28"
            stroke="#3A612E"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>

        {/* Little morning dewdrop */}
        <circle cx="63" cy="22" r="2.2" fill="#60A5FA" opacity="0.85" />
      </svg>
    </div>
  );
}

/* 2. Path — "What we do repeatedly shapes who we become." */
function PathIllustration() {
  return (
    <div className="relative animate-float-subtle">
      <svg
        width="95"
        height="80"
        viewBox="0 0 95 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Distant soft hill */}
        <path
          d="M10 65 C 32 45, 65 42, 88 62"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 2"
        />

        {/* Golden sun / guiding star on horizon */}
        <circle cx="56" cy="24" r="7" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
        <path d="M56 12 L56 15" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M56 33 L56 36" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M44 24 L47 24" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M65 24 L68 24" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />

        {/* Winding path left border */}
        <path
          d="M20 72 C 32 60, 42 54, 52 38 C 54 34, 55 31, 56 29"
          stroke="#B45309"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Winding path right border */}
        <path
          d="M38 74 C 46 62, 50 54, 56 40 C 57 35, 57 32, 57 29"
          stroke="#B45309"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Path fill (subtle warm wash) */}
        <path
          d="M20 72 C 32 60, 42 54, 52 38 C 54 34, 55 31, 56 29 L 57 29 C 57 32, 57 35, 56 40 C 50 54, 46 62, 38 74 Z"
          fill="#FDE68A"
          fillOpacity="0.45"
        />

        {/* Stepping stones / dashes */}
        <path
          d="M28 66 C 36 57, 44 51, 53 43"
          stroke="#92400E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="3 4"
        />

        {/* Small wayside wildflower */}
        <circle cx="16" cy="62" r="3" fill="#F472B6" />
        <circle cx="16" cy="62" r="1.2" fill="#FDE047" />
        <path d="M16 65 L16 70" stroke="#4D7C3F" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* 3. Telescope — "Stay hungry. Stay foolish." */
function TelescopeIllustration() {
  return (
    <div className="relative animate-crayon-sway origin-bottom">
      <svg
        width="95"
        height="80"
        viewBox="0 0 95 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Night sky crayon stars */}
        <g className="animate-pulse-slow">
          <path
            d="M68 12 L70 17 L75 18 L71 22 L72 27 L68 24 L63 27 L65 22 L61 18 L66 17 Z"
            fill="#FBBF24"
            stroke="#D97706"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <circle cx="82" cy="24" r="1.5" fill="#FDE047" />
          <circle cx="54" cy="14" r="1.2" fill="#FDE047" />
        </g>

        {/* Tripod legs */}
        <path d="M42 46 L26 74" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M42 46 L43 75" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M42 46 L58 73" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />

        {/* Tripod joint mount */}
        <circle cx="42" cy="46" r="3.5" fill="#D97706" stroke="#78350F" strokeWidth="1.5" />

        {/* Telescope barrel (pointing up & right towards the star) */}
        <g transform="rotate(-30 42 44)">
          {/* Eyepiece */}
          <rect
            x="20"
            y="41"
            width="8"
            height="6"
            rx="1.5"
            fill="#B45309"
            stroke="#78350F"
            strokeWidth="1.8"
          />
          {/* Main tube */}
          <rect
            x="28"
            y="39"
            width="28"
            height="10"
            rx="2"
            fill="#3B82F6"
            stroke="#1E40AF"
            strokeWidth="2"
          />
          {/* Brass accent ring */}
          <line x1="38" y1="39" x2="38" y2="49" stroke="#FBBF24" strokeWidth="2" />
          {/* Objective hood */}
          <path
            d="M56 37 L64 36 L64 52 L56 51 Z"
            fill="#1E40AF"
            stroke="#172554"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Lens shimmer */}
          <line x1="64" y1="39" x2="64" y2="49" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

/* 4. Prism — "Simplicity is the soul of efficiency." */
function PrismIllustration() {
  return (
    <div className="relative animate-float-subtle">
      <svg
        width="90"
        height="80"
        viewBox="0 0 90 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Soft shadow below */}
        <ellipse cx="45" cy="72" rx="20" ry="4" fill="#000000" fillOpacity="0.08" />

        {/* Geometric Origami Diamond Facets */}
        {/* Top left facet */}
        <path
          d="M45 15 L24 35 L45 42 Z"
          fill="#93C5FD"
          fillOpacity="0.7"
          stroke="#2563EB"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Top right facet */}
        <path
          d="M45 15 L66 35 L45 42 Z"
          fill="#BFDBFE"
          fillOpacity="0.85"
          stroke="#2563EB"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Bottom left facet */}
        <path
          d="M24 35 L45 68 L45 42 Z"
          fill="#3B82F6"
          fillOpacity="0.8"
          stroke="#1D4ED8"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Bottom right facet */}
        <path
          d="M66 35 L45 68 L45 42 Z"
          fill="#60A5FA"
          fillOpacity="0.75"
          stroke="#1D4ED8"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Hand-drawn crayon accent hatch lines */}
        <path d="M35 30 L41 33" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M49 28 L57 32" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M47 46 L47 60" stroke="#BFDBFE" strokeWidth="1.2" strokeLinecap="round" />

        {/* Little sparkle marks around */}
        <path d="M18 24 L20 28 L24 30 L20 32 L18 36 L16 32 L12 30 L16 28 Z" fill="#FBBF24" />
        <path d="M72 48 L73 51 L76 52 L73 53 L72 56 L71 53 L68 52 L71 51 Z" fill="#34D399" />
      </svg>
    </div>
  );
}

/* 5. Pencil & Ruler — "The details are not the details. They make the design." */
function PencilIllustration() {
  return (
    <div className="relative animate-pencil-draw">
      <svg
        width="95"
        height="80"
        viewBox="0 0 95 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Mini drafting ruler lying horizontally */}
        <g transform="rotate(8 45 52)">
          <rect
            x="16"
            y="48"
            width="60"
            height="14"
            rx="2"
            fill="#FEF08A"
            stroke="#CA8A04"
            strokeWidth="2"
          />
          {/* Ruler tick marks */}
          <line x1="22" y1="48" x2="22" y2="55" stroke="#A16207" strokeWidth="1.5" />
          <line x1="28" y1="48" x2="28" y2="52" stroke="#A16207" strokeWidth="1" />
          <line x1="34" y1="48" x2="34" y2="55" stroke="#A16207" strokeWidth="1.5" />
          <line x1="40" y1="48" x2="40" y2="52" stroke="#A16207" strokeWidth="1" />
          <line x1="46" y1="48" x2="46" y2="55" stroke="#A16207" strokeWidth="1.5" />
          <line x1="52" y1="48" x2="52" y2="52" stroke="#A16207" strokeWidth="1" />
          <line x1="58" y1="48" x2="58" y2="55" stroke="#A16207" strokeWidth="1.5" />
          <line x1="64" y1="48" x2="64" y2="52" stroke="#A16207" strokeWidth="1" />
          <line x1="70" y1="48" x2="70" y2="55" stroke="#A16207" strokeWidth="1.5" />
        </g>

        {/* Drawn dotted blueprint curve */}
        <path
          d="M20 34 C 35 22, 55 24, 75 36"
          stroke="#3B82F6"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="3 3"
        />

        {/* Artisan Wooden Pencil (angled down sketching) */}
        <g transform="rotate(-38 52 32)">
          {/* Eraser */}
          <rect x="30" y="27" width="8" height="9" rx="2" fill="#F472B6" stroke="#BE185D" strokeWidth="1.5" />
          {/* Metal ferrule */}
          <rect x="38" y="27" width="4" height="9" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
          {/* Wooden body */}
          <rect x="42" y="27" width="30" height="9" fill="#F97316" stroke="#C2410C" strokeWidth="1.8" />
          {/* Inner pencil ridge line */}
          <line x1="42" y1="31.5" x2="72" y2="31.5" stroke="#EA580C" strokeWidth="1" />
          {/* Sharpened wood cone */}
          <polygon points="72,27 82,31.5 72,36" fill="#FED7AA" stroke="#C2410C" strokeWidth="1.5" />
          {/* Graphite lead tip */}
          <polygon points="79,30 83,31.5 79,33" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}

/* 6. Mountain — "Success is the sum of small efforts, repeated day in and day out." */
function MountainIllustration() {
  return (
    <div className="relative animate-float-subtle">
      <svg
        width="95"
        height="80"
        viewBox="0 0 95 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Soft background hill */}
        <path
          d="M8 72 L32 46 L58 72 Z"
          fill="#E2E8F0"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Main dramatic peak */}
        <path
          d="M26 72 L52 24 L78 72 Z"
          fill="#CBD5E1"
          stroke="#475569"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Shaded right face of the mountain */}
        <path
          d="M52 24 L78 72 L53 72 Z"
          fill="#94A3B8"
          fillOpacity="0.5"
        />

        {/* Snow cap on summit */}
        <path
          d="M52 24 L44 38 L48 37 L52 41 L56 36 L60 39 Z"
          fill="#FFFFFF"
          stroke="#475569"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Waving Summit Flag */}
        <g className="animate-flag-wave origin-[52px_24px]">
          <line x1="52" y1="24" x2="52" y2="12" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M52 12 L64 16 L52 20 Z"
            fill="#EF4444"
            stroke="#B91C1C"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </g>

        {/* Mountain trail path with switchbacks */}
        <path
          d="M36 68 C 42 63, 46 64, 44 58 C 42 53, 50 51, 51 46"
          stroke="#D97706"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="2 3"
        />

        {/* Little summit cloud */}
        <path
          d="M68 28 C 70 25, 75 25, 77 27 C 80 27, 83 30, 81 33 C 78 35, 68 35, 68 28 Z"
          fill="#F1F5F9"
          stroke="#94A3B8"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}

/* 7. Lightbulb — "Make it simple, but significant." */
function LightbulbIllustration() {
  return (
    <div className="relative animate-pulse-slow">
      <svg
        width="90"
        height="80"
        viewBox="0 0 90 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Radiating warm light rays */}
        <g stroke="#F59E0B" strokeWidth="2" strokeLinecap="round">
          <line x1="45" y1="10" x2="45" y2="15" />
          <line x1="28" y1="18" x2="32" y2="22" />
          <line x1="62" y1="18" x2="58" y2="22" />
          <line x1="20" y1="35" x2="25" y2="35" />
          <line x1="70" y1="35" x2="65" y2="35" />
        </g>

        {/* Bulb Glass Body */}
        <path
          d="M34 50 C 26 44, 26 28, 35 22 C 45 16, 55 18, 57 26 C 60 34, 56 44, 56 50 Z"
          fill="#FEF08A"
          fillOpacity="0.8"
          stroke="#D97706"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Filament coil */}
        <path
          d="M40 50 L40 38 C 40 34, 43 32, 45 32 C 47 32, 50 34, 50 38 L50 50"
          stroke="#EA580C"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="45" cy="32" r="2" fill="#F97316" />

        {/* Light reflection gleam */}
        <path
          d="M32 28 C 34 24, 38 22, 42 21"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Screw base cap */}
        <rect x="36" y="50" width="18" height="4" rx="1" fill="#94A3B8" stroke="#475569" strokeWidth="1.8" />
        <rect x="38" y="54" width="14" height="4" rx="1" fill="#94A3B8" stroke="#475569" strokeWidth="1.8" />
        <rect x="40" y="58" width="10" height="3" rx="1.5" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

/* 8. Notebook — "There is no substitute for hard work." */
function NotebookIllustration() {
  return (
    <div className="relative animate-crayon-sway origin-bottom">
      <svg
        width="95"
        height="80"
        viewBox="0 0 95 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Soft shadow */}
        <ellipse cx="48" cy="70" rx="34" ry="5" fill="#000000" fillOpacity="0.08" />

        {/* Open book / journal left page */}
        <path
          d="M16 32 C 28 30, 42 33, 46 36 L 46 66 C 42 63, 28 60, 16 62 Z"
          fill="#FFFDF7"
          stroke="#78350F"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Open book / journal right page */}
        <path
          d="M48 36 C 52 33, 66 30, 78 32 L 78 62 C 66 60, 52 63, 48 66 Z"
          fill="#FFFDF7"
          stroke="#78350F"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* Spine seam binding */}
        <line x1="47" y1="36" x2="47" y2="66" stroke="#92400E" strokeWidth="2.5" />

        {/* Sketched writing lines on left page */}
        <line x1="22" y1="40" x2="38" y2="40" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="22" y1="46" x2="40" y2="46" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="22" y1="52" x2="35" y2="52" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />

        {/* Sketched writing lines on right page */}
        <line x1="54" y1="40" x2="72" y2="40" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="54" y1="46" x2="70" y2="46" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="54" y1="52" x2="66" y2="52" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />

        {/* Little hand-drawn heart / emblem on right page */}
        <circle cx="68" cy="54" r="2.5" fill="#EF4444" />

        {/* Fluttering ribbon bookmark */}
        <path
          d="M47 36 C 45 44, 49 52, 45 60 C 43 65, 41 71, 44 74"
          stroke="#DC2626"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
