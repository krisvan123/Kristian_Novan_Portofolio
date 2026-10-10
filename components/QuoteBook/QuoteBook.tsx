"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, BookOpen, Sparkles, Hand } from "lucide-react";
import { quotesData, QuoteItem } from "@/data/quotes";
import CrayonIllustration from "./CrayonIllustration";
import ScrollReveal from "../ScrollReveal";

export default function QuoteBook() {
  // Spreads:
  // spread 0: Intro Spread (Left: ppp.jpg photo, Right: Title + Intro)
  // spread 1 to 9: Quote Spreads (Left: Crayon Drawing, Right: Quote)
  const totalSpreads = quotesData.length + 1; // 10 spreads total
  const [currentSpread, setCurrentSpread] = useState(0);

  // Drag interaction states (finger & mouse interactive dragging)
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0); // 0 to 1
  const [dragDirection, setDragDirection] = useState<"next" | "prev" | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // References
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const isHorizontalGesture = useRef<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  // Viewport trigger for natural book appearance
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

  // Programmatic turn forward
  const turnNext = useCallback(() => {
    if (isDragging || isCompleting || currentSpread >= totalSpreads - 1) return;
    setIsCompleting(true);
    setDragDirection("next");

    // Animate smoothly
    let p = 0;
    const interval = setInterval(() => {
      p += 0.14;
      if (p >= 1) {
        clearInterval(interval);
        setDragProgress(1);
        setTimeout(() => {
          setCurrentSpread((prev) => Math.min(prev + 1, totalSpreads - 1));
          setIsCompleting(false);
          setDragProgress(0);
          setDragDirection(null);
        }, 60);
      } else {
        setDragProgress(p);
      }
    }, 20);
  }, [currentSpread, isDragging, isCompleting, totalSpreads]);

  // Programmatic turn backward
  const turnPrev = useCallback(() => {
    if (isDragging || isCompleting || currentSpread <= 0) return;
    setIsCompleting(true);
    setDragDirection("prev");

    let p = 0;
    const interval = setInterval(() => {
      p += 0.14;
      if (p >= 1) {
        clearInterval(interval);
        setDragProgress(1);
        setTimeout(() => {
          setCurrentSpread((prev) => Math.max(prev - 1, 0));
          setIsCompleting(false);
          setDragProgress(0);
          setDragDirection(null);
        }, 60);
      } else {
        setDragProgress(p);
      }
    }, 20);
  }, [currentSpread, isDragging, isCompleting]);

  // Keyboard navigation (ArrowLeft & ArrowRight)
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

  // ---------------------------------------------------------------------------
  // INTERACTIVE POINTER / TOUCH DRAG-TO-FLIP SYSTEM (Real-time finger follow)
  // ---------------------------------------------------------------------------
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isCompleting) return;
    // Don't intercept button clicks
    if ((e.target as HTMLElement).closest("button")) return;

    startX.current = e.clientX;
    startY.current = e.clientY;
    isHorizontalGesture.current = null;
    setIsDragging(true);
    setDragProgress(0);
    setDragDirection(null);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isCompleting) return;

    const deltaX = e.clientX - startX.current;
    const deltaY = e.clientY - startY.current;

    // Determine gesture direction on first significant movement
    if (isHorizontalGesture.current === null) {
      if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
        isHorizontalGesture.current = Math.abs(deltaX) > Math.abs(deltaY) * 1.2;
      }
    }

    if (isHorizontalGesture.current === false) {
      // User is scrolling vertically, release drag
      setIsDragging(false);
      setDragProgress(0);
      setDragDirection(null);
      return;
    }

    const bookWidth = bookRef.current?.clientWidth || 700;
    const maxDragDistance = Math.min(350, bookWidth * 0.45);

    if (deltaX < 0) {
      // Dragging LEFT -> turning NEXT spread
      if (currentSpread >= totalSpreads - 1) {
        // At last spread, subtle resistance
        setDragDirection("next");
        setDragProgress(Math.min(0.08, -deltaX / (maxDragDistance * 4)));
      } else {
        setDragDirection("next");
        const p = Math.min(1, Math.max(0, -deltaX / maxDragDistance));
        setDragProgress(p);
      }
    } else if (deltaX > 0) {
      // Dragging RIGHT -> turning PREV spread
      if (currentSpread <= 0) {
        // At first spread, subtle resistance
        setDragDirection("prev");
        setDragProgress(Math.min(0.08, deltaX / (maxDragDistance * 4)));
      } else {
        setDragDirection("prev");
        const p = Math.min(1, Math.max(0, deltaX / maxDragDistance));
        setDragProgress(p);
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging || isCompleting) return;
    setIsDragging(false);

    const deltaX = e.clientX - startX.current;
    const isFlick = Math.abs(deltaX) > 35;

    if (dragDirection === "next" && currentSpread < totalSpreads - 1) {
      if (dragProgress >= 0.28 || isFlick) {
        // Commit turn next
        setIsCompleting(true);
        let p = dragProgress;
        const interval = setInterval(() => {
          p += 0.12;
          if (p >= 1) {
            clearInterval(interval);
            setDragProgress(1);
            setTimeout(() => {
              setCurrentSpread((prev) => Math.min(prev + 1, totalSpreads - 1));
              setIsCompleting(false);
              setDragProgress(0);
              setDragDirection(null);
            }, 50);
          } else {
            setDragProgress(p);
          }
        }, 18);
        return;
      }
    } else if (dragDirection === "prev" && currentSpread > 0) {
      if (dragProgress >= 0.28 || isFlick) {
        // Commit turn prev
        setIsCompleting(true);
        let p = dragProgress;
        const interval = setInterval(() => {
          p += 0.12;
          if (p >= 1) {
            clearInterval(interval);
            setDragProgress(1);
            setTimeout(() => {
              setCurrentSpread((prev) => Math.max(prev - 1, 0));
              setIsCompleting(false);
              setDragProgress(0);
              setDragDirection(null);
            }, 50);
          } else {
            setDragProgress(p);
          }
        }, 18);
        return;
      }
    }

    // Cancel turn & snap back to current spread
    setIsCompleting(true);
    let p = dragProgress;
    const interval = setInterval(() => {
      p -= 0.15;
      if (p <= 0) {
        clearInterval(interval);
        setDragProgress(0);
        setIsCompleting(false);
        setDragDirection(null);
      } else {
        setDragProgress(p);
      }
    }, 18);
  };

  // Content for current spread
  const activeQuoteIndex = currentSpread > 0 ? currentSpread - 1 : null;
  const currentQuote: QuoteItem | null =
    activeQuoteIndex !== null ? quotesData[activeQuoteIndex] : null;

  // Next and Prev spread helpers for turning animation
  const nextSpreadIndex = Math.min(currentSpread + 1, totalSpreads - 1);
  const nextQuote = nextSpreadIndex > 0 ? quotesData[nextSpreadIndex - 1] : null;

  const prevSpreadIndex = Math.max(currentSpread - 1, 0);
  const prevQuote = prevSpreadIndex > 0 ? quotesData[prevSpreadIndex - 1] : null;

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
            <span>Illustrated Codex</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-charcoal">
            My Favorite Quotes
          </h2>

          <p className="text-sm sm:text-base text-charcoal-soft max-w-lg font-sans">
            A few thoughts I keep coming back to.
          </p>

          <span className="text-[11px] font-mono text-charcoal-soft/80 pt-1 flex items-center gap-1.5">
            <Hand className="w-3.5 h-3.5 text-accent" />
            <span>Interactive folio — drag page edge to flip</span>
          </span>
        </ScrollReveal>

        {/* PHYSICAL BOOK CONTAINER */}
        <div className="flex flex-col items-center w-full">
          <div className="relative w-full max-w-5xl flex justify-center">
            {/* Ambient Shadow */}
            <div className="absolute -bottom-6 w-[92%] h-12 bg-black/35 dark:bg-black/60 blur-2xl rounded-full pointer-events-none" />

            <div
              ref={containerRef}
              className={`w-full rounded-3xl p-2.5 sm:p-4 bg-[#18150F] border border-[#2E2920] shadow-2xl relative transition-all duration-700 ${
                isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              {/* Stacked Edge Lines for physical book depth */}
              <div
                aria-hidden="true"
                className="absolute left-1.5 top-6 bottom-6 w-2 flex flex-col justify-between pointer-events-none opacity-40 hidden sm:flex"
              >
                <div className="w-full h-full border-l-2 border-dashed border-white/15" />
              </div>
              <div
                aria-hidden="true"
                className="absolute right-1.5 top-6 bottom-6 w-2 flex flex-col justify-between pointer-events-none opacity-40 hidden sm:flex"
              >
                <div className="w-full h-full border-r-2 border-dashed border-white/15" />
              </div>

              {/* =========================================================================
                  DESKTOP & LAPTOP TWO-PAGE SPREAD (md and above)
                  Supports real-time finger/mouse drag & interactive turning leaf!
                  ========================================================================= */}
              <div
                ref={bookRef}
                style={{ touchAction: "pan-y" }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className={`hidden md:block relative w-full aspect-[16/10] lg:aspect-[16/9] min-h-[500px] rounded-2xl bg-[#1E1B14] text-[#F3F2EE] border border-white/8 shadow-inner select-none ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}

              >
                {/* Central Spine Shadow & Stitching */}
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-0 bottom-0 w-12 -translate-x-1/2 z-30 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.18) 48%, rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.18) 52%, rgba(0,0,0,0.01) 100%)",
                  }}
                >
                  <div className="absolute left-1/2 top-3 bottom-3 w-[1px] -translate-x-1/2 border-l border-dashed border-amber-950/25 dark:border-amber-100/15" />
                </div>

                {/* SPREAD BASE LAYER */}
                <div className="w-full h-full grid grid-cols-2 relative z-0">
                  {/* LEFT BASE PAGE */}
                  <div className="h-full border-r border-amber-900/10 dark:border-white/5 bg-gradient-to-br from-[#201D16] via-[#1E1B14] to-[#1A1713] p-8 lg:p-10 flex flex-col justify-between overflow-hidden relative rounded-l-2xl">
                    {/* If dragging prev, show previous spread left underneath */}
                    {dragDirection === "prev" && dragProgress > 0 ? (
                      prevSpreadIndex === 0 ? (
                        <PhotoLeftPage />
                      ) : prevQuote ? (
                        <CrayonLeftPage quote={prevQuote} />
                      ) : null
                    ) : /* Otherwise show current spread left */
                    currentSpread === 0 ? (
                      <PhotoLeftPage />
                    ) : currentQuote ? (
                      <CrayonLeftPage quote={currentQuote} />
                    ) : null}
                  </div>

                  {/* RIGHT BASE PAGE */}
                  <div className="h-full bg-gradient-to-bl from-[#201D16] via-[#1E1B14] to-[#1A1713] p-8 lg:p-10 flex flex-col justify-between overflow-hidden relative rounded-r-2xl">
                    {/* If dragging next, reveal next spread right page underneath */}
                    {dragDirection === "next" && dragProgress > 0 && nextQuote ? (
                      <QuoteRightPage
                        quote={nextQuote}
                        spreadIndex={nextSpreadIndex}
                        totalSpreads={totalSpreads}
                      />
                    ) : currentSpread === 0 ? (
                      <TitleRightPage onStart={turnNext} />
                    ) : currentQuote ? (
                      <QuoteRightPage
                        quote={currentQuote}
                        spreadIndex={currentSpread}
                        totalSpreads={totalSpreads}
                      />
                    ) : null}
                  </div>
                </div>

                {/* =====================================================================
                    REAL-TIME TURNING LEAF (Active when user drags forward with finger/mouse)
                    Zero bleed-through: Front face and back face toggle cleanly at 90deg!
                    ===================================================================== */}
                {dragDirection === "next" && dragProgress > 0 && (
                  <div
                    className="absolute right-0 top-0 bottom-0 w-1/2 z-25 pointer-events-none"
                    style={{
                      transformOrigin: "left center",
                      transform: `perspective(1600px) rotateY(${-dragProgress * 180}deg)`,
                      transition: isCompleting ? "transform 0.18s ease-out" : "none",
                      boxShadow:
                        dragProgress > 0.05 && dragProgress < 0.95
                          ? "0 20px 40px rgba(0,0,0,0.3)"
                          : "none",
                    }}
                  >
                     {/* FRONT FACE of turning leaf (Current spread right page) */}
                    <div
                      className="absolute inset-0 bg-gradient-to-bl from-[#201D16] via-[#1E1B14] to-[#1A1713] p-8 lg:p-10 flex flex-col justify-between border-l border-amber-900/10 dark:border-white/5 shadow-md overflow-hidden"
                      style={{
                        opacity: dragProgress <= 0.5 ? 1 : 0,
                        visibility: dragProgress <= 0.5 ? "visible" : "hidden",
                      }}
                    >
                      {currentSpread === 0 ? (
                        <TitleRightPage onStart={turnNext} />
                      ) : currentQuote ? (
                        <QuoteRightPage
                          quote={currentQuote}
                          spreadIndex={currentSpread}
                          totalSpreads={totalSpreads}
                        />
                      ) : null}
                    </div>

                    {/* BACK FACE of turning leaf (Next spread left illustration page) */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-[#201D16] via-[#1E1B14] to-[#1A1713] p-8 lg:p-10 flex flex-col justify-between border-r border-amber-900/10 dark:border-white/5 shadow-md overflow-hidden"
                      style={{
                        transform: "rotateY(180deg)",
                        opacity: dragProgress > 0.5 ? 1 : 0,
                        visibility: dragProgress > 0.5 ? "visible" : "hidden",
                      }}
                    >
                      {nextSpreadIndex === 0 ? (
                        <PhotoLeftPage />
                      ) : nextQuote ? (
                        <CrayonLeftPage quote={nextQuote} />
                      ) : null}
                    </div>
                  </div>
                )}

                {/* =====================================================================
                    REAL-TIME TURNING LEAF BACKWARD (Active when user drags back with finger/mouse)
                    ===================================================================== */}
                {dragDirection === "prev" && dragProgress > 0 && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1/2 z-25 pointer-events-none"
                    style={{
                      transformOrigin: "right center",
                      transform: `perspective(1600px) rotateY(${dragProgress * 180}deg)`,
                      transition: isCompleting ? "transform 0.18s ease-out" : "none",
                      boxShadow:
                        dragProgress > 0.05 && dragProgress < 0.95
                          ? "0 20px 40px rgba(0,0,0,0.3)"
                          : "none",
                    }}
                  >
                    {/* FRONT FACE of prev leaf (Current spread left page) */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-[#201D16] via-[#1E1B14] to-[#1A1713] p-8 lg:p-10 flex flex-col justify-between border-r border-amber-900/10 dark:border-white/5 shadow-md overflow-hidden"
                      style={{
                        opacity: dragProgress <= 0.5 ? 1 : 0,
                        visibility: dragProgress <= 0.5 ? "visible" : "hidden",
                      }}
                    >
                      {currentSpread === 0 ? (
                        <PhotoLeftPage />
                      ) : currentQuote ? (
                        <CrayonLeftPage quote={currentQuote} />
                      ) : null}
                    </div>

                    {/* BACK FACE of prev leaf (Previous spread right page) */}
                    <div
                      className="absolute inset-0 bg-gradient-to-bl from-[#201D16] via-[#1E1B14] to-[#1A1713] p-8 lg:p-10 flex flex-col justify-between border-l border-amber-900/10 dark:border-white/5 shadow-md overflow-hidden"
                      style={{
                        transform: "rotateY(180deg)",
                        opacity: dragProgress > 0.5 ? 1 : 0,
                        visibility: dragProgress > 0.5 ? "visible" : "hidden",
                      }}
                    >
                      {prevSpreadIndex === 0 ? (
                        <TitleRightPage onStart={turnNext} />
                      ) : prevQuote ? (
                        <QuoteRightPage
                          quote={prevQuote}
                          spreadIndex={prevSpreadIndex}
                          totalSpreads={totalSpreads}
                        />
                      ) : null}
                    </div>
                  </div>
                )}

                {/* Clickable Edge Turn Buttons (Desktop Comfort) */}
                {currentSpread > 0 && (
                  <button
                    type="button"
                    onClick={turnPrev}
                    aria-label="Previous spread"
                    className="absolute left-0 inset-y-0 w-14 hover:bg-black/5 dark:hover:bg-white/5 transition-colors z-20 cursor-pointer group flex items-center justify-start pl-2"
                    title="Click or drag to turn back"
                  >
                    <ChevronLeft className="w-5 h-5 text-charcoal-muted group-hover:text-charcoal transition-transform group-hover:-translate-x-1" />
                  </button>
                )}

                {currentSpread < totalSpreads - 1 && (
                  <button
                    type="button"
                    onClick={turnNext}
                    aria-label="Next spread"
                    className="absolute right-0 inset-y-0 w-14 hover:bg-black/5 dark:hover:bg-white/5 transition-colors z-20 cursor-pointer group flex items-center justify-end pr-2"
                    title="Click or drag to turn forward"
                  >
                    <ChevronRight className="w-5 h-5 text-charcoal-muted group-hover:text-charcoal transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </div>

              {/* =========================================================================
                  MOBILE & TABLET FOLIO CARD (< md, phones & tablets)
                  Supports real-time touch dragging with tactile paper tilt!
                  ========================================================================= */}
              <div
                style={{ touchAction: "pan-y" }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className={`block md:hidden relative w-full min-h-[460px] sm:min-h-[500px] rounded-2xl bg-[#1E1B14] text-[#F3F2EE] border border-white/8 p-5 sm:p-6 shadow-inner select-none overflow-hidden ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
              >

                <div
                  style={{
                    transform:
                      isDragging && dragDirection === "next"
                        ? `translateX(${-dragProgress * 45}px) rotateZ(${-dragProgress * 3.5}deg)`
                        : isDragging && dragDirection === "prev"
                        ? `translateX(${dragProgress * 45}px) rotateZ(${dragProgress * 3.5}deg)`
                        : "translateX(0) rotateZ(0)",
                    transition: isCompleting ? "transform 0.18s ease-out" : "none",
                  }}
                  className="w-full h-full flex flex-col justify-between"
                >
                  {currentSpread === 0 ? (
                    /* SPREAD 0 on Mobile: Photo + Title Introduction */
                    <div className="flex flex-col items-center justify-center text-center space-y-4 py-2">
                      <div className="relative w-44 aspect-[4/5] rounded-xl overflow-hidden border-2 border-white dark:border-[#2b2824] shadow-md bg-stone-100 dark:bg-stone-900">
                        <Image
                          src="/images/profile/ppp.jpg"
                          alt="Kristian Novan portrait"
                          fill
                          className="object-cover object-top filter contrast-[1.02]"
                          sizes="176px"
                          priority
                        />
                      </div>

                      <div className="space-y-1">
                        <h3
                          style={{ fontFamily: "var(--font-quote), Georgia, serif" }}
                          className="text-2xl font-semibold tracking-tight text-charcoal"
                        >
                          My Favorite Quotes
                        </h3>
                        <p className="text-xs text-charcoal-muted max-w-xs font-sans leading-relaxed">
                          A few thoughts I keep coming back to.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={turnNext}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent text-white font-mono text-xs font-bold shadow-md cursor-pointer active:scale-95 transition-transform"
                      >
                        <span>Open Quotes</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : currentQuote ? (
                    /* SPREADS 1-9 on Mobile: Illustration (Top) + Quote (Bottom) */
                    <div className="flex flex-col justify-between h-full space-y-4">
                      {/* Top indicator */}
                      <div className="flex items-center justify-between text-[11px] font-mono text-charcoal-soft/70 border-b border-amber-900/10 dark:border-white/10 pb-2">
                        <span className="text-accent font-semibold">{currentQuote.theme}</span>
                        <span>
                          p. {String(currentSpread).padStart(2, "0")} / {String(totalSpreads - 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Center Crayon Illustration */}
                      <div className="flex items-center justify-center py-2">
                        <CrayonIllustration type={currentQuote.illustration} className="w-40 h-40 sm:w-48 sm:h-48" />
                      </div>

                      {/* Bottom Quote & Author */}
                      <div className="text-center space-y-2 py-2">
                        <blockquote
                          style={{ fontFamily: "var(--font-quote), Georgia, serif" }}
                          className="text-lg sm:text-xl italic text-charcoal leading-snug font-normal"
                        >
                          &ldquo;{currentQuote.quote}&rdquo;
                        </blockquote>
                        {currentQuote.author && (
                          <div className="text-[11px] font-mono uppercase tracking-wider text-accent dark:text-accent-dark font-medium pt-1">
                            — {currentQuote.author}
                          </div>
                        )}
                      </div>

                      {/* Mobile Drag / Swipe Hint */}
                      <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-charcoal-soft/50 pt-1">
                        <span>← Drag finger across card to turn →</span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* SECONDARY NAVIGATION CONTROLS */}
          <div className="mt-5 w-full max-w-5xl flex items-center justify-between px-2 sm:px-4 text-xs font-mono text-charcoal-soft">
            <button
              type="button"
              onClick={turnPrev}
              disabled={currentSpread === 0 || isCompleting}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-surface-border bg-white dark:bg-canvas-card-dark disabled:opacity-40 hover:text-charcoal shadow-2xs hover:border-accent-border transition-colors cursor-pointer disabled:cursor-not-allowed active:scale-95"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono">
                {currentSpread === 0 ? "Cover / Intro" : `Quote ${currentSpread} of ${totalSpreads - 1}`}
              </span>
            </div>

            <button
              type="button"
              onClick={turnNext}
              disabled={currentSpread === totalSpreads - 1 || isCompleting}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-surface-border bg-white dark:bg-canvas-card-dark disabled:opacity-40 hover:text-charcoal shadow-2xs hover:border-accent-border transition-colors cursor-pointer disabled:cursor-not-allowed active:scale-95"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   FIRST SPREAD (DESKTOP):
   - Left Page: ONLY portrait photo `/images/profile/ppp.jpg`
   - Right Page: "My Favorite Quotes" title & introductory line
   ========================================================================= */

function PhotoLeftPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-[210px] lg:max-w-[250px] aspect-[4/5] rounded-xl overflow-hidden border border-[#3A3530] shadow-lg ring-1 ring-white/5">
        <Image
          src="/images/profile/ppp.jpg"
          alt="Kristian Novan portrait"
          fill
          className="object-cover object-top filter contrast-[1.02]"
          sizes="(max-width: 1024px) 210px, 250px"
          priority
        />
      </div>
    </div>
  );
}

function TitleRightPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 sm:p-8 space-y-4">
      <div className="space-y-3 max-w-sm">
        <h3
          style={{ fontFamily: "var(--font-quote), Georgia, serif" }}
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-charcoal leading-tight"
        >
          My Favorite Quotes
        </h3>

        <p className="text-sm sm:text-base text-charcoal-muted font-sans leading-relaxed">
          A few thoughts I keep coming back to.
        </p>

        <div className="pt-6">
          <button
            type="button"
            onClick={onStart}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent hover:bg-accent-hover text-white font-mono text-xs font-bold shadow-md cursor-pointer transition-all active:scale-95"
          >
            <span>Begin Reading</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   ALL SUBSEQUENT SPREADS (DESKTOP):
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
            className="text-xl sm:text-2xl lg:text-3xl italic text-charcoal leading-[1.38] tracking-tight font-normal"
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
