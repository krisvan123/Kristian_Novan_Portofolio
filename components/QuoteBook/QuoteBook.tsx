"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { quotesData, QuoteItem } from "@/data/quotes";
import CrayonIllustration from "./CrayonIllustration";
import ScrollReveal from "../ScrollReveal";

export default function QuoteBook() {
  // Spreads:
  // spread 0: Intro Spread (Left: Kristian Photo, Right: Title + Intro)
  // spread 1 to 9: Quote Spreads (Left: Crayon Drawing, Right: Quote)
  const totalSpreads = quotesData.length + 1; // 10 spreads total
  const [currentSpread, setCurrentSpread] = useState(0);

  // Drag interaction state
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0); // 0 to 1
  const [dragDirection, setDragDirection] = useState<"next" | "prev" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pointerStartPos = useRef<{ x: number; y: number } | null>(null);
  const currentDragAngle = useRef<number>(0);

  // Viewport trigger for opening animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsOpen(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Programmatic turn forward (e.g. Next button or ArrowRight)
  const turnNext = useCallback(() => {
    if (isAnimating || currentSpread >= totalSpreads - 1) return;
    setIsAnimating(true);
    setDragDirection("next");

    // Animate from 0 to 1 over 650ms
    const startTime = performance.now();
    const duration = 650;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Smooth cubic easing
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setDragProgress(eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentSpread((prev) => Math.min(prev + 1, totalSpreads - 1));
        setDragDirection(null);
        setDragProgress(0);
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [currentSpread, isAnimating, totalSpreads]);

  // Programmatic turn backward (e.g. Prev button or ArrowLeft)
  const turnPrev = useCallback(() => {
    if (isAnimating || currentSpread <= 0) return;
    setIsAnimating(true);
    setDragDirection("prev");

    const startTime = performance.now();
    const duration = 650;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setDragProgress(eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentSpread((prev) => Math.max(prev - 1, 0));
        setDragDirection(null);
        setDragProgress(0);
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [currentSpread, isAnimating]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        turnNext();
      } else if (e.key === "ArrowLeft") {
        turnPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [turnNext, turnPrev]);

  // Pointer Down (Mouse or Touch)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isAnimating) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientX = e.clientX;
    const clientY = e.clientY;
    const relativeX = clientX - rect.left;
    const isRightHalf = relativeX >= rect.width / 2;

    if (isRightHalf) {
      if (currentSpread >= totalSpreads - 1) return;
      setDragDirection("next");
    } else {
      if (currentSpread <= 0) return;
      setDragDirection("prev");
    }

    pointerStartPos.current = { x: clientX, y: clientY };
    setIsDragging(true);
    setDragProgress(0);
    currentDragAngle.current = 0;

    // Capture pointer
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // safe fallback if not supported
    }
  };

  // Pointer Move (Mouse or Touch Dragging)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !pointerStartPos.current || !dragDirection) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const pageWidth = rect.width / 2;
    const deltaX = e.clientX - pointerStartPos.current.x;

    if (dragDirection === "next") {
      // Dragging left from right page
      const pull = -deltaX; // positive when dragging left
      const progress = Math.min(1, Math.max(0, pull / pageWidth));
      setDragProgress(progress);
    } else if (dragDirection === "prev") {
      // Dragging right from left page
      const pull = deltaX; // positive when dragging right
      const progress = Math.min(1, Math.max(0, pull / pageWidth));
      setDragProgress(progress);
    }
  };

  // Pointer Up (Release Drag)
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragDirection) return;
    setIsDragging(false);
    pointerStartPos.current = null;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }

    // Threshold check: 28% width
    const threshold = 0.28;
    const shouldComplete = dragProgress >= threshold;

    setIsAnimating(true);
    const startP = dragProgress;
    const targetP = shouldComplete ? 1 : 0;
    const startTime = performance.now();
    const duration = shouldComplete ? 360 : 260;

    const finishAnimation = (time: number) => {
      const elapsed = time - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased =
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // quad easing
      const currentP = startP + (targetP - startP) * eased;

      setDragProgress(currentP);

      if (t < 1) {
        requestAnimationFrame(finishAnimation);
      } else {
        if (shouldComplete) {
          if (dragDirection === "next") {
            setCurrentSpread((prev) => Math.min(prev + 1, totalSpreads - 1));
          } else if (dragDirection === "prev") {
            setCurrentSpread((prev) => Math.max(prev - 1, 0));
          }
        }
        setDragDirection(null);
        setDragProgress(0);
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(finishAnimation);
  };

  // Content Helpers
  // If spread === 0: Intro Spread
  // If spread > 0: quote index is spread - 1
  const activeQuoteIndex = currentSpread > 0 ? currentSpread - 1 : null;
  const currentQuote: QuoteItem | null =
    activeQuoteIndex !== null ? quotesData[activeQuoteIndex] : null;

  // Next spread preview (for turning leaf)
  const nextSpread = currentSpread + 1;
  const nextQuote: QuoteItem | null =
    nextSpread > 0 && nextSpread < totalSpreads
      ? quotesData[nextSpread - 1]
      : null;

  // Previous spread preview (for turning leaf)
  const prevSpread = currentSpread - 1;
  const prevQuote: QuoteItem | null =
    prevSpread > 0 && prevSpread < totalSpreads
      ? quotesData[prevSpread - 1]
      : null;

  // Dynamic rotation angles
  // When turning next: leaf starts at right (0deg) and flips to left (-180deg)
  const forwardAngle = -(dragProgress * 180);
  // When turning prev: leaf starts at left (0deg relative to left or 180deg) and flips to right (180deg)
  const backwardAngle = dragProgress * 180;

  // Dynamic shadow opacity (peaks at 90deg perpendicular)
  const shadowOpacity = Math.sin(dragProgress * Math.PI) * 0.45;

  return (
    <section
      id="quotes"
      className="py-16 md:py-24 border-t border-surface-border relative overflow-hidden select-none"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col items-center text-center space-y-2 mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-light dark:bg-accent-soft text-accent dark:text-accent-dark text-[11px] font-mono font-medium border border-accent-border/60">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Physical Illustrated Book</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-charcoal">
            My Favorite Quotes
          </h2>

          <p className="text-sm sm:text-base text-charcoal-soft max-w-lg font-sans">
            A few thoughts I keep coming back to.
          </p>

          <span className="text-[11px] font-mono text-charcoal-soft/80 pt-1 flex items-center gap-1.5">
            <span>Drag page edges to flip</span>
            <span className="text-accent dark:text-accent-dark">↷</span>
          </span>
        </ScrollReveal>

        {/* ================= PHYSICAL BOOK WORKSPACE ================= */}
        <div className="flex flex-col items-center w-full">
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              touchAction: "pan-y",
              perspective: "1800px",
            }}
            className={`w-full max-w-5xl rounded-3xl p-2.5 sm:p-4 bg-[#23211E] dark:bg-[#11100F] border border-[#3A3631] dark:border-white/10 book-shadow-ambient relative cursor-grab active:cursor-grabbing transition-all duration-700 ${
              isOpen ? "animate-book-open opacity-100" : "opacity-0 scale-95"
            }`}
          >
            {/* Real Open Book Container with Central Spine */}
            <div
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] min-h-[460px] sm:min-h-[500px] rounded-2xl bg-[#FAF7EE] dark:bg-[#201E1B] text-charcoal dark:text-[#F3F2EE] border border-amber-900/10 dark:border-white/5 overflow-hidden shadow-inner preserve-3d"
            >
              {/* ================= LAYER 1: BASE PAGES (UNDERNEATH) ================= */}
              <div className="absolute inset-0 grid grid-cols-2">
                {/* Underneath Left Page:
                    If turning backward, this is the Left Page of the previous spread.
                    Otherwise, it is the Left Page of the current spread. */}
                <div className="h-full border-r border-amber-900/10 dark:border-white/5 bg-gradient-to-br from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE0] dark:from-[#24221F] dark:via-[#201E1B] dark:to-[#1B1917] p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden relative">
                  {dragDirection === "prev" ? (
                    // Previous spread left content
                    prevSpread === 0 ? (
                      <PhotoLeftPage />
                    ) : prevQuote ? (
                      <CrayonLeftPage quote={prevQuote} />
                    ) : null
                  ) : (
                    // Current spread left content
                    currentSpread === 0 ? (
                      <PhotoLeftPage />
                    ) : currentQuote ? (
                      <CrayonLeftPage quote={currentQuote} />
                    ) : null
                  )}
                </div>

                {/* Underneath Right Page:
                    If turning forward, this is the Right Page of the NEXT spread.
                    Otherwise, it is the Right Page of the current spread. */}
                <div className="h-full bg-gradient-to-bl from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE0] dark:from-[#24221F] dark:via-[#201E1B] dark:to-[#1B1917] p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden relative">
                  {dragDirection === "next" ? (
                    // Next spread right content
                    nextQuote ? (
                      <QuoteRightPage
                        quote={nextQuote}
                        spreadIndex={nextSpread}
                        totalSpreads={totalSpreads}
                      />
                    ) : null
                  ) : (
                    // Current spread right content
                    currentSpread === 0 ? (
                      <TitleRightPage />
                    ) : currentQuote ? (
                      <QuoteRightPage
                        quote={currentQuote}
                        spreadIndex={currentSpread}
                        totalSpreads={totalSpreads}
                      />
                    ) : null
                  )}
                </div>
              </div>

              {/* ================= LAYER 2: TURNING LEAF (3D ROTATING PAGE) ================= */}
              {dragDirection === "next" && (
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 0,
                    bottom: 0,
                    width: "50%",
                    transformOrigin: "left center",
                    transform: `rotateY(${forwardAngle}deg)`,
                    transformStyle: "preserve-3d",
                    zIndex: 30,
                  }}
                  className="pointer-events-none"
                >
                  {/* FRONT FACE OF TURNING LEAF (Right page of current spread, facing right) */}
                  <div
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                    className="absolute inset-0 bg-gradient-to-bl from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE0] dark:from-[#24221F] dark:via-[#201E1B] dark:to-[#1B1917] p-6 sm:p-8 md:p-10 flex flex-col justify-between border-l border-amber-900/10 dark:border-white/5 overflow-hidden shadow-2xl"
                  >
                    {currentSpread === 0 ? (
                      <TitleRightPage />
                    ) : currentQuote ? (
                      <QuoteRightPage
                        quote={currentQuote}
                        spreadIndex={currentSpread}
                        totalSpreads={totalSpreads}
                      />
                    ) : null}

                    {/* Dynamic turning shadow on front face */}
                    <div
                      style={{ opacity: shadowOpacity }}
                      className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-75"
                    />
                  </div>

                  {/* BACK FACE OF TURNING LEAF (Left page of next spread, facing left when turned over) */}
                  <div
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE0] dark:from-[#24221F] dark:via-[#201E1B] dark:to-[#1B1917] p-6 sm:p-8 md:p-10 flex flex-col justify-between border-r border-amber-900/10 dark:border-white/5 overflow-hidden shadow-2xl"
                  >
                    {nextQuote ? (
                      <CrayonLeftPage quote={nextQuote} />
                    ) : null}

                    {/* Dynamic turning shadow on back face */}
                    <div
                      style={{ opacity: shadowOpacity }}
                      className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-75"
                    />
                  </div>
                </div>
              )}

              {/* Turning Leaf for PREVIOUS spread */}
              {dragDirection === "prev" && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "50%",
                    transformOrigin: "right center",
                    transform: `rotateY(${backwardAngle}deg)`,
                    transformStyle: "preserve-3d",
                    zIndex: 30,
                  }}
                  className="pointer-events-none"
                >
                  {/* FRONT FACE (Left page of current spread, facing left) */}
                  <div
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE0] dark:from-[#24221F] dark:via-[#201E1B] dark:to-[#1B1917] p-6 sm:p-8 md:p-10 flex flex-col justify-between border-r border-amber-900/10 dark:border-white/5 overflow-hidden shadow-2xl"
                  >
                    {currentSpread === 0 ? (
                      <PhotoLeftPage />
                    ) : currentQuote ? (
                      <CrayonLeftPage quote={currentQuote} />
                    ) : null}

                    <div
                      style={{ opacity: shadowOpacity }}
                      className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-75"
                    />
                  </div>

                  {/* BACK FACE (Right page of previous spread, facing right when turned back) */}
                  <div
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                    className="absolute inset-0 bg-gradient-to-bl from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE0] dark:from-[#24221F] dark:via-[#201E1B] dark:to-[#1B1917] p-6 sm:p-8 md:p-10 flex flex-col justify-between border-l border-amber-900/10 dark:border-white/5 overflow-hidden shadow-2xl"
                  >
                    {prevSpread === 0 ? (
                      <TitleRightPage />
                    ) : prevQuote ? (
                      <QuoteRightPage
                        quote={prevQuote}
                        spreadIndex={prevSpread}
                        totalSpreads={totalSpreads}
                      />
                    ) : null}

                    <div
                      style={{ opacity: shadowOpacity }}
                      className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-75"
                    />
                  </div>
                </div>
              )}

              {/* ================= LAYER 3: CENTRAL SPINE CREASE & STITCHING ================= */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-0 bottom-0 w-10 -translate-x-1/2 z-40 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.14) 48%, rgba(0,0,0,0.22) 50%, rgba(0,0,0,0.14) 52%, rgba(0,0,0,0.02) 100%)",
                }}
              >
                {/* Book Stitching Line */}
                <div className="absolute left-1/2 top-4 bottom-4 w-[1px] -translate-x-1/2 border-l border-dashed border-amber-950/30 dark:border-amber-100/20" />
              </div>

              {/* Subtle page edge curled hover hint on desktop */}
              {!isDragging && !isAnimating && currentSpread < totalSpreads - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-l from-black/5 to-transparent"
                />
              )}
            </div>
          </div>

          {/* ================= SECONDARY NAVIGATION & ACCESSIBILITY CONTROLS ================= */}
          <div className="mt-6 w-full max-w-5xl flex items-center justify-between px-2 sm:px-4 text-xs font-mono text-charcoal-soft">
            {/* Previous Page Button */}
            <button
              type="button"
              onClick={turnPrev}
              disabled={currentSpread === 0 || isAnimating}
              aria-label="Turn to previous page"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-surface-border bg-white dark:bg-canvas-card-dark text-charcoal hover:text-accent hover:border-accent-border disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>← Previous</span>
            </button>

            {/* Subtle Page Indicator */}
            <div className="text-[11px] font-mono tracking-wider text-charcoal-soft">
              {currentSpread === 0 ? (
                <span>Introduction</span>
              ) : (
                <span>
                  {String(currentSpread).padStart(2, "0")} /{" "}
                  {String(quotesData.length).padStart(2, "0")}
                </span>
              )}
            </div>

            {/* Next Page Button */}
            <button
              type="button"
              onClick={turnNext}
              disabled={currentSpread >= totalSpreads - 1 || isAnimating}
              aria-label="Turn to next page"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-surface-border bg-white dark:bg-canvas-card-dark text-charcoal hover:text-accent hover:border-accent-border disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              <span>Next →</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   FIRST SPREAD ONLY:
   - Left Page: ONLY Kristian's profile photo in a natural scrapbook paper frame
   - Right Page: ONLY "My Favorite Quotes" + "A few thoughts I keep coming back to."
   ========================================================================= */

function PhotoLeftPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 sm:p-4">
      {/* Framed Personal Photo (Tipped-In Scrapbook Treatment) */}
      <div className="relative group p-2.5 sm:p-3 bg-white dark:bg-[#2A2724] rounded-xl shadow-md border border-amber-900/15 dark:border-white/10 -rotate-1 hover:rotate-0 transition-transform duration-300">
        {/* Subtle Washi Tape Accent at Top */}
        <div
          aria-hidden="true"
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-4 sm:h-5 rounded-xs bg-[#E6D5B8]/85 dark:bg-[#785C3A]/70 border border-amber-700/20 shadow-2xs rotate-1"
        />

        {/* Profile Image Viewport */}
        <div className="relative w-36 h-40 sm:w-48 sm:h-52 md:w-56 md:h-60 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Image
            src="/images/profile.jpg"
            alt="Kristian Novan portrait"
            fill
            className="object-cover object-top filter contrast-[1.03]"
            sizes="(max-width: 640px) 180px, 240px"
            priority
          />
        </div>

        {/* Small subtle name caption */}
        <div className="pt-2 text-center">
          <span className="text-xs font-mono font-medium text-charcoal tracking-wide block">
            Kristian Novan
          </span>
          <span className="text-[10px] font-mono text-charcoal-soft">
            BINUS University · B2028
          </span>
        </div>
      </div>
    </div>
  );
}

function TitleRightPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 sm:p-8 space-y-4">
      <div className="space-y-3 max-w-sm">
        <h3
          style={{ fontFamily: "var(--font-quote), Georgia, serif" }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-charcoal leading-tight"
        >
          My Favorite Quotes
        </h3>

        <p className="text-sm sm:text-base text-charcoal-muted font-sans leading-relaxed">
          A few thoughts I keep coming back to.
        </p>

        <div className="pt-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-400/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 text-xs font-mono">
            <span>Drag right page to begin</span>
            <span>→</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   ALL SUBSEQUENT SPREADS:
   - Left Page: ONLY the one hand-drawn childlike crayon illustration
   - Right Page: ONLY quote text + author attribution + subtle page number
   ========================================================================= */

function CrayonLeftPage({ quote }: { quote: QuoteItem }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {/* ONLY ONE CHILDLIKE CRAYON ILLUSTRATION — NO TEXT, NO CAPTION */}
      <CrayonIllustration type={quote.illustration} />
    </div>
  );
}

function QuoteRightPage({
  quote,
  spreadIndex,
  totalSpreads,
}: {
  quote: QuoteItem;
  spreadIndex: number;
  totalSpreads: number;
}) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-4">
      {/* Top breathing space */}
      <div className="w-full flex justify-end">
        {/* Subtle page indicator at top right */}
        <span className="text-[11px] font-mono text-charcoal-soft/60">
          p. {String(spreadIndex).padStart(2, "0")}
        </span>
      </div>

      {/* Quote Body (Dominant literary serif font) */}
      <div className="my-auto py-4 flex flex-col items-center text-center space-y-5 max-w-md mx-auto">
        <blockquote className="space-y-3">
          <p
            style={{ fontFamily: "var(--font-quote), Georgia, serif" }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] italic text-charcoal leading-[1.35] tracking-tight font-normal"
          >
            &ldquo;{quote.quote}&rdquo;
          </p>
        </blockquote>

        {/* Author Attribution */}
        {quote.author && (
          <div className="text-xs sm:text-sm font-mono tracking-wider uppercase text-accent dark:text-accent-dark font-medium">
            — {quote.author}
          </div>
        )}
      </div>

      {/* Subtle Bottom Page Indicator */}
      <div className="w-full flex justify-between items-center text-[10px] font-mono text-charcoal-soft/50 pt-2 border-t border-amber-900/5 dark:border-white/5">
        <span>{quote.theme}</span>
        <span>
          {String(spreadIndex).padStart(2, "0")} /{" "}
          {String(totalSpreads - 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
