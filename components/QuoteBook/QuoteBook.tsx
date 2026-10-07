"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, BookOpen, Sparkles } from "lucide-react";
import { quotesData, QuoteItem } from "@/data/quotes";
import CrayonIllustration from "./CrayonIllustration";
import ScrollReveal from "../ScrollReveal";

export default function QuoteBook() {
  // Spreads:
  // spread 0: Intro Spread (Left: ppp.jpg photo, Right: Title + Intro)
  // spread 1 to 9: Quote Spreads (Left: Crayon Drawing, Right: Quote)
  const totalSpreads = quotesData.length + 1; // 10 spreads total
  const [currentSpread, setCurrentSpread] = useState(0);

  // Transition & interaction states
  const [isAnimating, setIsAnimating] = useState(false);
  const [turnDirection, setTurnDirection] = useState<"next" | "prev" | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Touch / pointer swipe tracking
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    if (isAnimating || currentSpread >= totalSpreads - 1) return;
    setIsAnimating(true);
    setTurnDirection("next");

    setTimeout(() => {
      setCurrentSpread((prev) => Math.min(prev + 1, totalSpreads - 1));
      setIsAnimating(false);
      setTurnDirection(null);
    }, 400);
  }, [currentSpread, isAnimating, totalSpreads]);

  // Programmatic turn backward
  const turnPrev = useCallback(() => {
    if (isAnimating || currentSpread <= 0) return;
    setIsAnimating(true);
    setTurnDirection("prev");

    setTimeout(() => {
      setCurrentSpread((prev) => Math.max(prev - 1, 0));
      setIsAnimating(false);
      setTurnDirection(null);
    }, 400);
  }, [currentSpread, isAnimating]);

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

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null || isAnimating) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Verify predominantly horizontal swipe (>40px)
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        turnNext(); // Swipe left -> Next
      } else {
        turnPrev(); // Swipe right -> Prev
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Content for current spread
  const activeQuoteIndex = currentSpread > 0 ? currentSpread - 1 : null;
  const currentQuote: QuoteItem | null =
    activeQuoteIndex !== null ? quotesData[activeQuoteIndex] : null;

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
            <span>Swipe or click page controls to turn</span>
            <span className="text-accent dark:text-accent-dark">↷</span>
          </span>
        </ScrollReveal>

        {/* PHYSICAL BOOK CONTAINER */}
        <div className="flex flex-col items-center w-full">
          <div className="relative w-full max-w-5xl flex justify-center">
            {/* Ambient Surface Shadow */}
            <div className="absolute -bottom-6 w-[92%] h-12 bg-black/35 dark:bg-black/60 blur-2xl rounded-full pointer-events-none" />

            <div
              ref={containerRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className={`w-full rounded-3xl p-2.5 sm:p-4 bg-[#211f1b] dark:bg-[#121110] border border-[#3A3631] dark:border-white/10 shadow-2xl relative transition-all duration-700 ${
                isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              {/* Stacked Edge Lines for physical book depth */}
              <div
                aria-hidden="true"
                className="absolute left-1.5 top-6 bottom-6 w-2 flex flex-col justify-between pointer-events-none opacity-40 hidden sm:flex"
              >
                <div className="w-full h-full border-l-2 border-dashed border-[#e6dfd1] dark:border-white/20" />
              </div>
              <div
                aria-hidden="true"
                className="absolute right-1.5 top-6 bottom-6 w-2 flex flex-col justify-between pointer-events-none opacity-40 hidden sm:flex"
              >
                <div className="w-full h-full border-r-2 border-dashed border-[#e6dfd1] dark:border-white/20" />
              </div>

              {/* =========================================================================
                  DESKTOP & LAPTOP TWO-PAGE SPREAD (md and above)
                  ========================================================================= */}
              <div className="hidden md:block relative w-full aspect-[16/10] lg:aspect-[16/9] min-h-[500px] rounded-2xl bg-[#FAF7EE] dark:bg-[#1f1d1a] text-charcoal dark:text-[#F3F2EE] border border-amber-900/15 dark:border-white/10 overflow-hidden shadow-inner">
                {/* Paper grain texture */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(#d6cdbe_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none z-10"
                />

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

                {/* Main Spread Grid with Smooth Content Transition */}
                <div
                  className={`w-full h-full grid grid-cols-2 transition-all duration-300 ease-out ${
                    isAnimating
                      ? turnDirection === "next"
                        ? "opacity-60 -translate-x-2"
                        : "opacity-60 translate-x-2"
                      : "opacity-100 translate-x-0"
                  }`}
                >
                  {/* LEFT PAGE */}
                  <div className="h-full border-r border-amber-900/10 dark:border-white/5 bg-gradient-to-br from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE0] dark:from-[#24221F] dark:via-[#201E1B] dark:to-[#1B1917] p-8 lg:p-10 flex flex-col justify-between overflow-hidden relative">
                    {currentSpread === 0 ? (
                      <PhotoLeftPage />
                    ) : currentQuote ? (
                      <CrayonLeftPage quote={currentQuote} />
                    ) : null}
                  </div>

                  {/* RIGHT PAGE */}
                  <div className="h-full bg-gradient-to-bl from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE0] dark:from-[#24221F] dark:via-[#201E1B] dark:to-[#1B1917] p-8 lg:p-10 flex flex-col justify-between overflow-hidden relative">
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
                </div>

                {/* Clickable Page Corner Zones for Quick Desktop Turning */}
                {currentSpread > 0 && (
                  <button
                    type="button"
                    onClick={turnPrev}
                    aria-label="Previous spread"
                    className="absolute left-0 inset-y-0 w-16 hover:bg-black/5 dark:hover:bg-white/5 transition-colors z-20 cursor-w-resize group flex items-center justify-start pl-2"
                    title="Click left page to turn back"
                  >
                    <ChevronLeft className="w-5 h-5 text-charcoal-muted group-hover:text-charcoal transition-transform group-hover:-translate-x-1" />
                  </button>
                )}

                {currentSpread < totalSpreads - 1 && (
                  <button
                    type="button"
                    onClick={turnNext}
                    aria-label="Next spread"
                    className="absolute right-0 inset-y-0 w-16 hover:bg-black/5 dark:hover:bg-white/5 transition-colors z-20 cursor-e-resize group flex items-center justify-end pr-2"
                    title="Click right page to turn forward"
                  >
                    <ChevronRight className="w-5 h-5 text-charcoal-muted group-hover:text-charcoal transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </div>

              {/* =========================================================================
                  MOBILE & TABLET FOLIO CARD (< md, phones & tablets)
                  Solves all cramping, bleed-through, and small-screen unreadability!
                  ========================================================================= */}
              <div className="block md:hidden relative w-full min-h-[460px] sm:min-h-[500px] rounded-2xl bg-[#FAF7EE] dark:bg-[#1f1d1a] text-charcoal dark:text-[#F3F2EE] border border-amber-900/15 dark:border-white/10 p-5 sm:p-6 overflow-hidden shadow-inner">
                {/* Paper grain */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(#d6cdbe_1px,transparent_1px)] [background-size:14px_14px] opacity-15 pointer-events-none"
                />

                <div
                  className={`w-full h-full flex flex-col justify-between transition-all duration-300 ease-out ${
                    isAnimating
                      ? turnDirection === "next"
                        ? "opacity-50 -translate-x-3"
                        : "opacity-50 translate-x-3"
                      : "opacity-100 translate-x-0"
                  }`}
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

                      {/* Mobile Swipe Hint */}
                      <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-charcoal-soft/50 pt-1">
                        <span>← Swipe or use buttons below →</span>
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
              disabled={currentSpread === 0 || isAnimating}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-surface-border bg-white dark:bg-canvas-card-dark disabled:opacity-40 hover:text-charcoal shadow-2xs hover:border-accent-border transition-colors cursor-pointer disabled:cursor-not-allowed"
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
              disabled={currentSpread === totalSpreads - 1 || isAnimating}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-surface-border bg-white dark:bg-canvas-card-dark disabled:opacity-40 hover:text-charcoal shadow-2xs hover:border-accent-border transition-colors cursor-pointer disabled:cursor-not-allowed"
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
      <div className="relative w-full max-w-[210px] lg:max-w-[250px] aspect-[4/5] rounded-xl overflow-hidden border-2 border-white dark:border-[#2b2824] shadow-md bg-stone-100 dark:bg-stone-900">
        <Image
          src="/images/profile/ppp.jpg"
          alt="Kristian Novan portrait"
          fill
          className="object-cover object-top filter contrast-[1.02]"
          sizes="(max-width: 1024px) 210px, 250px"
          priority
        />
      </div>

      <div className="pt-3 text-center">
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
