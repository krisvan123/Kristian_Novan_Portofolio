"use client";

import React from "react";

interface CrayonIllustrationProps {
  type:
    | "sprout-sun"
    | "winding-path"
    | "telescope-stars"
    | "crayon-diamond"
    | "chubby-pencil"
    | "mountain-flag"
    | "glowing-bulb"
    | "sketch-book"
    | "potted-daisy";
  className?: string;
}

export default function CrayonIllustration({
  type,
  className = "",
}: CrayonIllustrationProps) {
  return (
    <div
      className={`relative flex items-center justify-center select-none w-48 h-48 sm:w-56 sm:h-56 ${className}`}
      aria-hidden="true"
    >
      {/* SVG Wax Crayon Roughness Filter Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="crayon-roughness" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        style={{ filter: "url(#crayon-roughness)" }}
        className="w-full h-full flex items-center justify-center"
      >
        {type === "sprout-sun" && <SproutSun />}
        {type === "winding-path" && <WindingPath />}
        {type === "telescope-stars" && <TelescopeStars />}
        {type === "crayon-diamond" && <CrayonDiamond />}
        {type === "chubby-pencil" && <ChubbyPencil />}
        {type === "mountain-flag" && <MountainFlag />}
        {type === "glowing-bulb" && <GlowingBulb />}
        {type === "sketch-book" && <SketchBook />}
        {type === "potted-daisy" && <PottedDaisy />}
      </div>
    </div>
  );
}

/* 1. Sprout & Crooked Smiling Sun (Beginnings) */
function SproutSun() {
  return (
    <svg
      viewBox="0 0 160 160"
      className="w-full h-full overflow-visible animate-crayon-sway origin-bottom"
    >
      {/* Crooked Crayon Sun in top-right */}
      <g>
        {/* Uneven crayon rays */}
        <path d="M125 15 L128 28" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M142 22 L133 33" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
        <path d="M150 40 L137 42" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M145 60 L134 52" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
        <path d="M110 16 L116 27" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
        <path d="M96 28 L108 34" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />

        {/* Scribbly Yellow Sun Center */}
        <path
          d="M114 36 C 104 38, 102 52, 108 61 C 117 71, 134 68, 138 57 C 141 46, 131 34, 120 35 Z"
          fill="#FDE047"
          stroke="#EA580C"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Scribbled crayon texture filling the sun */}
        <path
          d="M110 45 Q 124 43 132 48 Q 115 54 130 58 Q 118 63 126 64"
          stroke="#FBBF24"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Childlike smiling face on sun */}
        <circle cx="118" cy="48" r="2" fill="#78350F" />
        <circle cx="128" cy="49" r="2" fill="#78350F" />
        <path d="M120 56 Q 124 60 128 56" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>

      {/* Earth mound scribbles */}
      <path
        d="M25 138 C 45 130, 85 132, 135 140"
        stroke="#8B5E3C"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M38 144 C 60 138, 100 140, 125 145"
        stroke="#6E4426"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="48" cy="136" r="2.5" fill="#8B5E3C" />
      <circle cx="112" cy="138" r="3" fill="#8B5E3C" />

      {/* Sprout Stem — imperfect wobbly curve */}
      <path
        d="M78 134 C 74 110, 84 95, 78 68"
        stroke="#4D7C3F"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Secondary jitter crayon stroke */}
      <path
        d="M80 132 C 76 108, 86 94, 80 70"
        stroke="#65A30D"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Left Leaf (imperfect, scribbled coloring) */}
      <path
        d="M77 96 C 54 88, 42 102, 50 114 C 62 118, 72 110, 77 98 Z"
        fill="#84CC16"
        stroke="#3F6212"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Scribble inside left leaf */}
      <path
        d="M52 104 Q 65 98 74 102 M56 110 Q 66 106 72 108"
        stroke="#65A30D"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Right Leaf unfolding */}
      <path
        d="M78 72 C 100 62, 114 74, 106 88 C 94 94, 84 84, 78 76 Z"
        fill="#A3E635"
        stroke="#3F6212"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Scribble inside right leaf */}
      <path
        d="M84 76 Q 96 74 104 80 M86 82 Q 94 84 100 86"
        stroke="#4D7C3F"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* 2. Winding Path Between Two Crayon Hills (Habits & Consistency) */
function WindingPath() {
  return (
    <svg
      viewBox="0 0 160 160"
      className="w-full h-full overflow-visible animate-float-subtle"
    >
      {/* Distant wobbly hill */}
      <path
        d="M10 135 C 35 90, 80 85, 150 130"
        fill="#86EFAC"
        stroke="#15803D"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Scribbly green texture on back hill */}
      <path
        d="M35 110 Q 55 100 75 106 M50 118 Q 75 112 105 116"
        stroke="#4ADE80"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Foreground left hill */}
      <path
        d="M0 148 C 25 115, 60 120, 85 155 Z"
        fill="#4ADE80"
        stroke="#166534"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Guiding star above hills */}
      <path
        d="M95 38 L98 48 L108 50 L100 57 L102 67 L94 62 L86 67 L88 57 L80 50 L90 48 Z"
        fill="#FDE047"
        stroke="#D97706"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />

      {/* Winding crayon trail */}
      <path
        d="M32 152 C 50 135, 65 128, 76 108 C 82 98, 88 88, 92 82"
        stroke="#B45309"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M52 154 C 64 138, 76 130, 84 112 C 88 102, 92 92, 95 84"
        stroke="#B45309"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Path warm wash & stepping stone scribbles */}
      <path
        d="M38 145 L46 142 M54 132 L62 130 M68 120 L74 117 M78 106 L84 104 M86 94 L90 92"
        stroke="#92400E"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Cute little red wayside crayon flower */}
      <circle cx="28" cy="128" r="4.5" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
      <circle cx="28" cy="128" r="2" fill="#FDE047" />
      <path d="M28 132 L27 142" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* 3. Childlike Telescope Pointing at Crayon Stars & Moon (Curiosity) */
function TelescopeStars() {
  return (
    <svg
      viewBox="0 0 160 160"
      className="w-full h-full overflow-visible animate-crayon-sway origin-bottom"
    >
      {/* Wobbly crescent moon */}
      <path
        d="M120 22 C 108 26, 104 42, 112 52 C 118 60, 130 60, 136 56 C 122 56, 116 38, 120 22 Z"
        fill="#FDE047"
        stroke="#D97706"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Scribbly stars */}
      <path
        d="M72 26 L74 32 L80 33 L75 38 L76 44 L71 41 L66 44 L68 38 L63 33 L69 32 Z"
        fill="#FBBF24"
        stroke="#B45309"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="95" cy="20" r="2.5" fill="#FBBF24" />
      <circle cx="140" cy="38" r="2" fill="#FBBF24" />
      <circle cx="58" cy="48" r="2" fill="#FBBF24" />

      {/* Clunky wooden tripod legs */}
      <path d="M72 96 L42 145" stroke="#78350F" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M72 96 L74 147" stroke="#92400E" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M72 96 L102 144" stroke="#78350F" strokeWidth="4.5" strokeLinecap="round" />

      {/* Joint knob */}
      <circle cx="72" cy="96" r="6" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />

      {/* Angled telescope barrel pointing up & right */}
      <g transform="rotate(-34 72 92)">
        {/* Eyepiece */}
        <rect x="36" y="87" width="12" height="10" rx="2" fill="#B45309" stroke="#78350F" strokeWidth="3" />
        {/* Main body (sky blue crayon tube) */}
        <rect x="48" y="84" width="46" height="16" rx="3" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="3.5" />
        {/* Scribbly crayon fill inside tube */}
        <path d="M52 88 Q 70 86 88 92 M52 94 Q 72 92 88 98" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
        {/* Brass middle ring */}
        <line x1="68" y1="84" x2="68" y2="100" stroke="#FBBF24" strokeWidth="3.5" />
        {/* Objective lens hood */}
        <path
          d="M94 82 L108 80 L108 104 L94 102 Z"
          fill="#2563EB"
          stroke="#1E3A8A"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Lens reflection dash */}
        <line x1="108" y1="85" x2="108" y2="99" stroke="#E0F2FE" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* 4. Childlike Crayon Origami Diamond / Prism (Simplicity) */
function CrayonDiamond() {
  return (
    <svg
      viewBox="0 0 160 160"
      className="w-full h-full overflow-visible animate-float-subtle"
    >
      {/* Soft shadow */}
      <ellipse cx="80" cy="142" rx="36" ry="6" fill="#000000" fillOpacity="0.08" />

      {/* Hand-drawn crooked diamond facets */}
      {/* Top triangle facet */}
      <path
        d="M80 24 L42 62 L80 72 Z"
        fill="#BAE6FD"
        stroke="#0284C7"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M80 24 L118 62 L80 72 Z"
        fill="#E0F2FE"
        stroke="#0284C7"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Bottom long facet left */}
      <path
        d="M42 62 L80 132 L80 72 Z"
        fill="#38BDF8"
        stroke="#0369A1"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Bottom long facet right */}
      <path
        d="M118 62 L80 132 L80 72 Z"
        fill="#0284C7"
        stroke="#075985"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Scribbly crayon texture lines across the facets */}
      <path d="M54 55 Q 68 50 78 56" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <path d="M84 48 Q 98 46 110 54" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <path d="M52 74 Q 68 88 78 98" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M106 74 Q 92 90 82 102" stroke="#0C4A6E" strokeWidth="3.5" strokeLinecap="round" />

      {/* Playful childlike sparkles around the gem */}
      <g>
        <path d="M30 40 L34 46 L40 48 L34 50 L30 56 L28 50 L22 48 L28 46 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
        <path d="M126 84 L129 89 L134 90 L129 92 L126 97 L124 92 L119 90 L124 89 Z" fill="#34D399" stroke="#059669" strokeWidth="1.5" />
        <circle cx="125" cy="35" r="3" fill="#F472B6" />
      </g>
    </svg>
  );
}

/* 5. Chubby Wooden Pencil & Rainbow Squiggle Doodle (Craft & Design) */
function ChubbyPencil() {
  return (
    <svg
      viewBox="0 0 160 160"
      className="w-full h-full overflow-visible animate-pencil-draw"
    >
      {/* Drawn looping squiggle trail */}
      <path
        d="M26 128 C 42 100, 68 110, 84 94 C 100 78, 126 92, 138 72"
        stroke="#EC4899"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M24 132 C 40 104, 66 114, 82 98 C 98 82, 124 96, 136 76"
        stroke="#F59E0B"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="28" cy="130" r="3" fill="#3B82F6" />
      <circle cx="85" cy="96" r="2.5" fill="#10B981" />
      <circle cx="136" cy="74" r="3" fill="#EC4899" />

      {/* Chubby Wooden Crayon Pencil (angled sketching) */}
      <g transform="rotate(-32 95 62)">
        {/* Pink eraser */}
        <rect x="52" y="52" width="16" height="18" rx="4" fill="#F472B6" stroke="#DB2777" strokeWidth="3" />
        {/* Metal band */}
        <rect x="68" y="52" width="8" height="18" fill="#E2E8F0" stroke="#64748B" strokeWidth="3" />
        <line x1="72" y1="52" x2="72" y2="70" stroke="#94A3B8" strokeWidth="2" />
        {/* Yellow wooden pencil body */}
        <rect x="76" y="52" width="46" height="18" rx="2" fill="#FBBF24" stroke="#D97706" strokeWidth="3.5" />
        {/* Pencil body stripe */}
        <line x1="76" y1="61" x2="122" y2="61" stroke="#F59E0B" strokeWidth="3" />
        {/* Sharpened wood cone */}
        <polygon points="122,52 142,61 122,70" fill="#FED7AA" stroke="#D97706" strokeWidth="3" strokeLinejoin="round" />
        {/* Lead graphite tip */}
        <polygon points="135,58 144,61 135,64" fill="#1E293B" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/* 6. Mountain Peak with Waving Crayon Flag (Persistence) */
function MountainFlag() {
  return (
    <svg
      viewBox="0 0 160 160"
      className="w-full h-full overflow-visible animate-float-subtle"
    >
      {/* Background soft mountain */}
      <path
        d="M20 145 L62 82 L108 145 Z"
        fill="#CBD5E1"
        stroke="#64748B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Foreground primary jagged peak */}
      <path
        d="M48 145 L94 45 L144 145 Z"
        fill="#94A3B8"
        stroke="#334155"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Right shaded side */}
      <path
        d="M94 45 L144 145 L98 145 Z"
        fill="#64748B"
        fillOpacity="0.5"
      />

      {/* Uneven snow cap */}
      <path
        d="M94 45 L78 72 L88 68 L94 76 L104 69 L112 74 Z"
        fill="#FFFFFF"
        stroke="#334155"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Red Crayon Flag waving on summit pole */}
      <g className="animate-flag-wave origin-[94px_45px]">
        <line x1="94" y1="45" x2="94" y2="20" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
        <path
          d="M94 20 L116 28 L94 36 Z"
          fill="#EF4444"
          stroke="#B91C1C"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        {/* Scribble on flag */}
        <path d="M98 25 L110 28" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Mountain path switchbacks */}
      <path
        d="M62 135 Q 74 125 70 114 Q 84 108 86 98 Q 96 90 94 80"
        stroke="#D97706"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="4 4"
        fill="none"
      />

      {/* Cute fluffy drifting cloud */}
      <path
        d="M112 56 C 114 48, 126 48, 130 52 C 136 50, 144 56, 140 62 C 142 66, 138 72, 130 72 C 122 72, 110 70, 112 56 Z"
        fill="#F8FAFC"
        stroke="#94A3B8"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* 7. Warm Glowing Lightbulb with Radiating Crayon Sparks (Intention & Ideas) */
function GlowingBulb() {
  return (
    <svg
      viewBox="0 0 160 160"
      className="w-full h-full overflow-visible animate-pulse-slow"
    >
      {/* Energetic crayon glow dashes */}
      <g stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round">
        <line x1="80" y1="16" x2="80" y2="26" />
        <line x1="48" y1="28" x2="56" y2="36" />
        <line x1="112" y1="28" x2="104" y2="36" />
        <line x1="32" y1="62" x2="42" y2="62" />
        <line x1="128" y1="62" x2="118" y2="62" />
        <line x1="44" y1="96" x2="54" y2="92" />
        <line x1="116" y1="96" x2="106" y2="92" />
      </g>

      {/* Bulb Glass Body — slightly asymmetrical & wobbly */}
      <path
        d="M62 94 C 48 84, 46 54, 62 40 C 76 28, 96 32, 102 46 C 108 60, 100 82, 98 94 Z"
        fill="#FEF08A"
        stroke="#D97706"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Scribbled yellow crayon filling the bulb */}
      <path
        d="M64 54 Q 80 50 94 56 M62 68 Q 80 64 96 72 M66 82 Q 80 80 92 84"
        stroke="#FDE047"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Curly filament inside */}
      <path
        d="M72 94 L72 68 C 72 60, 78 56, 80 56 C 82 56, 88 60, 88 68 L88 94"
        stroke="#EA580C"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="80" cy="56" r="3.5" fill="#EF4444" />

      {/* Screw base cap */}
      <rect x="66" y="94" width="28" height="7" rx="2" fill="#94A3B8" stroke="#475569" strokeWidth="3" />
      <rect x="69" y="101" width="22" height="7" rx="2" fill="#94A3B8" stroke="#475569" strokeWidth="3" />
      <rect x="73" y="108" width="14" height="6" rx="2" fill="#64748B" stroke="#334155" strokeWidth="2.5" />
    </svg>
  );
}

/* 8. Open Little Sketchbook with Wobbly Writing (Dedication) */
function SketchBook() {
  return (
    <svg
      viewBox="0 0 160 160"
      className="w-full h-full overflow-visible animate-crayon-sway origin-bottom"
    >
      {/* Soft shadow */}
      <ellipse cx="80" cy="136" rx="55" ry="8" fill="#000000" fillOpacity="0.08" />

      {/* Left page — crooked rectangle */}
      <path
        d="M26 55 C 48 50, 72 55, 78 60 L 78 122 C 72 116, 48 112, 26 118 Z"
        fill="#FFFDF7"
        stroke="#78350F"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Right page — crooked rectangle */}
      <path
        d="M82 60 C 88 55, 112 50, 134 55 L 134 118 C 112 112, 88 116, 82 122 Z"
        fill="#FFFDF7"
        stroke="#78350F"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Central spine stitch */}
      <line x1="80" y1="58" x2="80" y2="124" stroke="#92400E" strokeWidth="4" strokeLinecap="round" />

      {/* Childlike scribbled text lines on left page */}
      <path d="M36 72 Q 52 70 68 74" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M36 84 Q 54 82 66 86" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M36 96 Q 50 94 62 98" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Childlike scribbled text lines on right page */}
      <path d="M92 72 Q 108 70 124 74" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M92 84 Q 106 82 120 86" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M92 96 Q 104 94 114 98" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Little red crayon heart doodle */}
      <path
        d="M116 100 C 114 96, 110 96, 108 99 C 106 96, 102 96, 100 100 C 100 106, 108 110, 108 112 C 108 110, 116 106, 116 100 Z"
        fill="#EF4444"
        stroke="#B91C1C"
        strokeWidth="2"
      />

      {/* Red bookmark ribbon flowing out */}
      <path
        d="M80 58 C 76 74, 84 94, 76 112 C 72 122, 68 132, 74 138"
        stroke="#DC2626"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* 9. Potted Daisy / Sunflower with a Crooked Smile (Courage & Realization) */
function PottedDaisy() {
  return (
    <svg
      viewBox="0 0 160 160"
      className="w-full h-full overflow-visible animate-crayon-sway origin-bottom"
    >
      {/* Terracotta pot */}
      <path
        d="M54 104 L106 104 L98 144 L62 144 Z"
        fill="#F97316"
        stroke="#9A3412"
        strokeWidth="3.8"
        strokeLinejoin="round"
      />
      {/* Pot rim */}
      <rect x="48" y="98" width="64" height="10" rx="3" fill="#EA580C" stroke="#9A3412" strokeWidth="3" />
      {/* Scribble texture on pot */}
      <path d="M60 116 Q 80 114 100 118 M64 128 Q 80 126 96 130" stroke="#C2410C" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Wobbly green stem */}
      <path d="M80 98 C 78 80, 84 68, 80 52" stroke="#4D7C3F" strokeWidth="4.5" strokeLinecap="round" fill="none" />

      {/* Stem leaf */}
      <path
        d="M80 78 C 96 72, 104 80, 98 88 C 88 92, 82 86, 80 82 Z"
        fill="#84CC16"
        stroke="#3F6212"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />

      {/* Cheerful uneven yellow daisy petals */}
      <g>
        <ellipse cx="80" cy="34" rx="7" ry="12" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
        <ellipse cx="80" cy="70" rx="7" ry="12" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
        <ellipse cx="62" cy="52" rx="12" ry="7" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
        <ellipse cx="98" cy="52" rx="12" ry="7" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
        <ellipse cx="67" cy="39" rx="8" ry="10" transform="rotate(-45 67 39)" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
        <ellipse cx="93" cy="39" rx="8" ry="10" transform="rotate(45 93 39)" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
        <ellipse cx="67" cy="65" rx="8" ry="10" transform="rotate(45 67 65)" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
        <ellipse cx="93" cy="65" rx="8" ry="10" transform="rotate(-45 93 65)" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />

        {/* Brown flower center */}
        <circle cx="80" cy="52" r="14" fill="#78350F" stroke="#451A03" strokeWidth="3" />
        {/* Scribbled face */}
        <circle cx="75" cy="50" r="1.8" fill="#FDE047" />
        <circle cx="85" cy="50" r="1.8" fill="#FDE047" />
        <path d="M76 56 Q 80 60 84 56" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}
