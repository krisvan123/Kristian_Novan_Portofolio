"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { quotesData, QuoteItem } from "@/data/quotes";
import CrayonIllustration from "./CrayonIllustration";
import ScrollReveal from "../ScrollReveal";

export default function QuoteBook() {
  // Spreads:
  // spread 0: Intro Spread (Left: ppp.jpg photo, Right: Title + Intro)
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

  // Viewport trigger for natural book opening animation
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

    const startTime = performance.now();
    const duration = 680;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Soft spring-like paper easing with slight momentum carry
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
    const duration = 680;

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

  // Pointer Down (Desktop Mouse Drag or Mobile Touch Drag)
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

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  // Pointer Move (Flexible paper tracking)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !pointerStartPos.current || !dragDirection) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const pageWidth = rect.width / 2;
    const deltaX = e.clientX - pointerStartPos.current.x;

    if (dragDirection === "next") {
      // Pulling right page to left
      const pull = -deltaX;
      const progress = Math.min(1, Math.max(0, pull / pageWidth));
      setDragProgress(progress);
    } else if (dragDirection === "prev") {
      // Pulling left page to right
      const pull = deltaX;
      const progress = Math.min(1, Math.max(0, pull / pageWidth));
      setDragProgress(progress);
    }
  };

  // Pointer Up (Physics release: spring-back vs momentum completion)
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragDirection) return;
    setIsDragging(false);
    pointerStartPos.current = null;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    // Flexible threshold: 34% drag required to turn
    const threshold = 0.34;
    const shouldComplete = dragProgress >= threshold;

    setIsAnimating(true);
    const startP = dragProgress;
    const targetP = shouldComplete ? 1 : 0;
    const startTime = performance.now();
    const duration = shouldComplete ? 420 : 300;

    const finishAnimation = (time: number) => {
      const elapsed = time - startTime;
      const t = Math.min(1, elapsed / duration);
      // Soft spring-back physics
      const eased =
        shouldComplete
          ? 1 - Math.pow(1 - t, 3) // easeOutCubic
          : 1 - Math.pow(1 - t, 4); // soft gentle return

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

  // Spread Content Helpers
  const activeQuoteIndex = currentSpread > 0 ? currentSpread - 1 : null;
  const currentQuote: QuoteItem | null =
    activeQuoteIndex !== null ? quotesData[activeQuoteIndex] : null;

  const nextSpread = currentSpread + 1;
  const nextQuote: QuoteItem | null =
    nextSpread > 0 && nextSpread < totalSpreads
      ? quotesData[nextSpread - 1]
      : null;

  const prevSpread = currentSpread - 1;
  const prevQuote: QuoteItem | null =
    prevSpread > 0 && prevSpread < totalSpreads
      ? quotesData[prevSpread - 1]
      : null;

  // Realistic Paper Curvature & Physics calculations
  // Angle: from 0deg to -180deg (forward) or 0deg to 180deg (backward)
  const forwardAngle = -(dragProgress * 180);
  const backwardAngle = dragProgress * 180;

  // Paper flexibility / subtle curvature parameters
  // At midpoint (~0.5), paper arches most dramatically
  const curveArc = Math.sin(dragProgress * Math.PI);
  const paperSkewY = curveArc * 3.5; // slight cylindrical curl skew in degrees
  const paperScaleX = 1 - curveArc * 0.04; // slight paper compression along bend

  // Dynamic shadows responding to elevation & turn angle
  const underPageShadowOpacity = curveArc * 0.42;
  const pageFoldShadowOpacity = curveArc * 0.35;
  const pageHighlightOpacity = curveArc * 0.28;

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
            <span>Click or drag page edges to turn</span>
            <span className="text-accent dark:text-accent-dark">↷</span>
          </span>
        </ScrollReveal>

        {/* PHYSICAL BOOK STAGE */}
        <div className="flex flex-col items-center w-full">
          {/* Ambient Surface Shadow underneath the book */}
          <div className="relative w-full max-w-5xl flex justify-center">
            <div className="absolute -bottom-6 w-[92%] h-12 bg-black/35 dark:bg-black/60 blur-2xl rounded-full pointer-events-none" />

            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              style={{
                touchAction: "pan-y",
                perspective: "2000px",
              }}
              className={`w-full rounded-3xl p-3 sm:p-4 bg-[#211f1b] dark:bg-[#121110] border border-[#3A3631] dark:border-white/10 shadow-2xl relative cursor-grab active:cursor-grabbing transition-all duration-700 ${
                isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              {/* Stacked Pages Illusion along the left and right outer book edges */}
              <div
                aria-hidden="true"
                className="absolute left-1.5 top-5 bottom-5 w-2 flex flex-col justify-between pointer-events-none opacity-40"
              >
                <div className="w-full h-full border-l-2 border-dashed border-[#e6dfd1] dark:border-white/20" />
              </div>
              <div
                aria-hidden="true"
                className="absolute right-1.5 top-5 bottom-5 w-2 flex flex-col justify-between pointer-events-none opacity-40"
              >
                <div className="w-full h-full border-r-2 border-dashed border-[#e6dfd1] dark:border-white/20" />
              </div>

              {/* Main Open Book Spread Container */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] min-h-[480px] sm:min-h-[520px] rounded-2xl bg-[#FAF7EE] dark:bg-[#1f1d1a] text-charcoal dark:text-[#F3F2EE] border border-amber-900/15 dark:border-white/10 overflow-hidden shadow-inner preserve-3d">
                {/* Subtle paper grain texture pattern overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(#d6cdbe_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none"
                />

                {/* ================= LAYER 1: BASE PAGES (UNDERNEATH) ================= */}
                <div className="absolute inset-0 grid grid-cols-2">
                  {/* Underneath Left Page */}
                  <div className="h-full border-r border-amber-900/10 dark:border-white/5 bg-gradient-to-br from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE0] dark:from-[#24221F] dark:via-[#201E1B] dark:to-[#1B1917] p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden relative">
                    {dragDirection === "prev" ? (
                      prevSpread === 0 ? (
                        <PhotoLeftPage />
                      ) : prevQuote ? (
                        <CrayonLeftPage quote={prevQuote} />
                      ) : null
                    ) : currentSpread === 0 ? (
                      <PhotoLeftPage />
                    ) : currentQuote ? (
                      <CrayonLeftPage quote={currentQuote} />
                    ) : null}

                    {/* Dynamic shadow cast on Left Page when turning back */}
                    {dragDirection === "prev" && (
                      <div
                        style={{ opacity: underPageShadowOpacity }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/50 pointer-events-none transition-opacity duration-75"
                      />
                    )}
                  </div>

                  {/* Underneath Right Page */}
                  <div className="h-full bg-gradient-to-bl from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE0] dark:from-[#24221F] dark:via-[#201E1B] dark:to-[#1B1917] p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden relative">
                    {dragDirection === "next" ? (
                      nextQuote ? (
                        <QuoteRightPage
                          quote={nextQuote}
                          spreadIndex={nextSpread}
                          totalSpreads={totalSpreads}
                        />
                      ) : null
                    ) : currentSpread === 0 ? (
                      <TitleRightPage />
                    ) : currentQuote ? (
                      <QuoteRightPage
                        quote={currentQuote}
                        spreadIndex={currentSpread}
                        totalSpreads={totalSpreads}
                      />
                    ) : null}

                    {/* Dynamic shadow cast on Right Page when turning forward */}
                    {dragDirection === "next" && (
                      <div
                        style={{ opacity: underPageShadowOpacity }}
                        className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/50 pointer-events-none transition-opacity duration-75"
                      />
                    )}
                  </div>
                </div>

                {/* ================= LAYER 2: TURNING LEAF (FLEXIBLE PAPER SIMULATION) ================= */}
                {dragDirection === "next" && (
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: 0,
                      bottom: 0,
                      width: "50%",
                      transformOrigin: "left center",
                      transform: `rotateY(${forwardAngle}deg) skewY(${paperSkewY}deg) scaleX(${paperScaleX})`,
                      transformStyle: "preserve-3d",
                      zIndex: 35,
                      filter: `drop-shadow(-8px 12px 16px rgba(0,0,0,${pageFoldShadowOpacity}))`,
                    }}
                    className="pointer-events-none"
                  >
                    {/* FRONT FACE (Turning Right Page) */}
                    <div
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                      className="absolute inset-0 bg-gradient-to-bl from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE0] dark:from-[#24221F] dark:via-[#201E1B] dark:to-[#1B1917] p-6 sm:p-8 md:p-10 flex flex-col justify-between border-l border-amber-900/10 dark:border-white/5 border-r border-[#dfd7c9] dark:border-[#38342e] overflow-hidden"
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

                      {/* Physical Paper Highlight Ridge */}
                      <div
                        style={{ opacity: pageHighlightOpacity }}
                        className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/10 to-transparent pointer-events-none"
                      />

                      {/* Physical Paper Darkening Ridge */}
                      <div
                        style={{ opacity: pageFoldShadowOpacity }}
                        className="absolute inset-0 bg-gradient-to-l from-black/25 via-transparent to-transparent pointer-events-none"
                      />
                    </div>

                    {/* BACK FACE (Turning Left Page of Next Spread) */}
                    <div
                      style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE0] dark:from-[#24221F] dark:via-[#201E1B] dark:to-[#1B1917] p-6 sm:p-8 md:p-10 flex flex-col justify-between border-r border-amber-900/10 dark:border-white/5 border-l border-[#dfd7c9] dark:border-[#38342e] overflow-hidden"
                    >
                      {nextQuote ? <CrayonLeftPage quote={nextQuote} /> : null}

                      {/* Paper highlight on landing side */}
                      <div
                        style={{ opacity: pageHighlightOpacity }}
                        className="absolute inset-0 bg-gradient-to-l from-white/35 via-transparent to-transparent pointer-events-none"
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
                      transform: `rotateY(${backwardAngle}deg) skewY(${-paperSkewY}deg) scaleX(${paperScaleX})`,
                      transformStyle: "preserve-3d",
                      zIndex: 35,
                      filter: `drop-shadow(8px 12px 16px rgba(0,0,0,${pageFoldShadowOpacity}))`,
                    }}
                    className="pointer-events-none"
                  >
                    {/* FRONT FACE (Left page of current spread) */}
                    <div
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE0] dark:from-[#24221F] dark:via-[#201E1B] dark:to-[#1B1917] p-6 sm:p-8 md:p-10 flex flex-col justify-between border-r border-amber-900/10 dark:border-white/5 border-l border-[#dfd7c9] dark:border-[#38342e] overflow-hidden"
                    >
                      {currentSpread === 0 ? (
                        <PhotoLeftPage />
                      ) : currentQuote ? (
                        <CrayonLeftPage quote={currentQuote} />
                      ) : null}

                      <div
                        style={{ opacity: pageHighlightOpacity }}
                        className="absolute inset-0 bg-gradient-to-l from-white/40 via-white/10 to-transparent pointer-events-none"
                      />
                    </div>

                    {/* BACK FACE (Right page of previous spread) */}
                    <div
                      style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                      className="absolute inset-0 bg-gradient-to-bl from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE0] dark:from-[#24221F] dark:via-[#201E1B] dark:to-[#1B1917] p-6 sm:p-8 md:p-10 flex flex-col justify-between border-l border-amber-900/10 dark:border-white/5 border-r border-[#dfd7c9] dark:border-[#38342e] overflow-hidden"
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
                        style={{ opacity: pageHighlightOpacity }}
                        className="absolute inset-0 bg-gradient-to-r from-white/35 via-transparent to-transparent pointer-events-none"
                      />
                    </div>
                  </div>
                )}

                {/* ================= LAYER 3: CENTRAL SPINE CREASE & STITCHING ================= */}
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-0 bottom-0 w-12 -translate-x-1/2 z-40 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.18) 48%, rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.18) 52%, rgba(0,0,0,0.01) 100%)",
                  }}
                >
                  {/* Subtle Book Spine Stitching */}
                  <div className="absolute left-1/2 top-3 bottom-3 w-[1px] -translate-x-1/2 border-l border-dashed border-amber-950/25 dark:border-amber-100/15" />
                </div>
              </div>
            </div>
          </div>

          {/* SECONDARY NAVIGATION CONTROLS */}
          <div className="mt-6 w-full max-w-5xl flex items-center justify-between px-2 sm:px-4 text-xs font-mono text-charcoal-soft">
            <button
              type="button"
              onClick={turnPrev}
              disabled={currentSpread === 0 || isAnimating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-border bg-white dark:bg-canvas-card-dark disabled:opacity-40 hover:text-charcoal transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous Page</span>
            </button>

            <span className="text-[11px] font-mono">
              Spread {currentSpread + 1} of {totalSpreads}
            </span>

            <button
              type="button"
              onClick={turnNext}
              disabled={currentSpread === totalSpreads - 1 || isAnimating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-border bg-white dark:bg-canvas-card-dark disabled:opacity-40 hover:text-charcoal transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <span>Next Page</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   FIRST SPREAD:
   - Left Page: ONLY photo `/images/profile/ppp.jpg`
   - Right Page: "My Favorite Quotes" title & introductory line
   ========================================================================= */

function PhotoLeftPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-[210px] sm:max-w-[260px] aspect-[4/5] rounded-xl overflow-hidden border-2 border-white dark:border-[#2b2824] shadow-md bg-stone-100 dark:bg-stone-900">
        <Image
          src="/images/profile/ppp.jpg"
          alt="Kristian Novan portrait"
          fill
          className="object-cover object-top filter contrast-[1.02]"
          sizes="(max-width: 640px) 210px, 260px"
          priority
        />
      </div>

      <div className="pt-2.5 text-center">
        <span className="text-xs font-mono font-medium text-charcoal tracking-wide block">
          Kristian Novan
        </span>
        <span className="text-[10px] font-mono text-charcoal-soft">
          BINUS University · B2028
        </span>
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
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-400/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 text-xs font-mono">
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
   - Left Page: ONLY the childlike crayon illustration
   - Right Page: ONLY quote text + author attribution + subtle page number
   ========================================================================= */

function CrayonLeftPage({ quote }: { quote: QuoteItem }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
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
      {/* Top page indicator */}
      <div className="w-full flex justify-end">
        <span className="text-[11px] font-mono text-charcoal-soft/60">
          p. {String(spreadIndex).padStart(2, "0")}
        </span>
      </div>

      {/* Quote Body */}
      <div className="my-auto py-4 flex flex-col items-center text-center space-y-5 max-w-md mx-auto">
        <blockquote className="space-y-3">
          <p
            style={{ fontFamily: "var(--font-quote), Georgia, serif" }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] italic text-charcoal leading-[1.35] tracking-tight font-normal"
          >
            &ldquo;{quote.quote}&rdquo;
          </p>
        </blockquote>

        {quote.author && (
          <div className="text-xs sm:text-sm font-mono tracking-wider uppercase text-accent dark:text-accent-dark font-medium">
            — {quote.author}
          </div>
        )}
      </div>

      {/* Bottom theme and spread number */}
      <div className="w-full flex justify-between items-center text-[10px] font-mono text-charcoal-soft/50 pt-2 border-t border-amber-900/5 dark:border-white/5">
        <span>{quote.theme}</span>
        <span>
          {String(spreadIndex).padStart(2, "0")} / {String(totalSpreads - 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
