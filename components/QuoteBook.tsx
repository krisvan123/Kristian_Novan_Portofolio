"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, BookOpen, Sparkles } from "lucide-react";
import { quotesData, QuoteItem } from "@/data/quotes";
import QuoteIllustration from "./QuoteIllustration";
import ScrollReveal from "./ScrollReveal";

export default function QuoteBook() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState<"next" | "prev" | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const bookRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const currentQuote: QuoteItem = quotesData[currentIndex];
  const totalQuotes = quotesData.length;

  // Viewport trigger for opening animation
  useEffect(() => {
    const el = bookRef.current;
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

  // Next page transition
  const handleNext = useCallback(() => {
    if (isFlipping) return;
    setIsFlipping("next");

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalQuotes);
    }, 380);

    setTimeout(() => {
      setIsFlipping(null);
    }, 760);
  }, [isFlipping, totalQuotes]);

  // Previous page transition
  const handlePrev = useCallback(() => {
    if (isFlipping) return;
    setIsFlipping("prev");

    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + totalQuotes) % totalQuotes);
    }, 380);

    setTimeout(() => {
      setIsFlipping(null);
    }, 760);
  }, [isFlipping, totalQuotes]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      // Only capture if not typing inside an input or textarea
      if (
        activeEl?.tagName === "INPUT" ||
        activeEl?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Gentle desktop parallax hover effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 6, y: y * 4 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="quotes"
      className="py-16 md:py-24 border-t border-surface-border relative overflow-hidden select-none"
    >
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col items-center text-center space-y-2.5 mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-light dark:bg-accent-soft text-accent dark:text-accent-dark text-[11px] font-mono font-medium border border-accent-border/60">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Interactive Journal</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-charcoal">
            My Favorite Quotes
          </h2>

          <p className="text-sm sm:text-base text-charcoal-soft max-w-xl font-sans">
            A few thoughts I keep coming back to.
          </p>
        </ScrollReveal>

        {/* 3D Interactive Physical Book */}
        <div
          ref={bookRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="perspective-book flex justify-center w-full"
        >
          <div
            style={{
              transform: `rotateY(${mouseOffset.x}deg) rotateX(${-mouseOffset.y}deg)`,
              transition: isFlipping
                ? "none"
                : "transform 0.4s cubic-bezier(0.2, 0, 0, 1)",
            }}
            className={`w-full max-w-5xl rounded-3xl p-2 sm:p-3.5 bg-[#252320] dark:bg-[#121110] border border-[#3E3A34] dark:border-white/10 book-shadow-ambient transition-all duration-700 ${
              isOpen ? "animate-book-open opacity-100" : "opacity-0 scale-95"
            }`}
          >
            {/* Real Open Book Spread Container */}
            <div className="relative w-full rounded-2xl bg-[#FBF9F4] dark:bg-[#1E1C1A] text-charcoal dark:text-[#F3F2EE] border border-amber-900/10 dark:border-white/5 overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-inner">
              {/* Central Spine Seam & Crease Shadow (Desktop) */}
              <div
                aria-hidden="true"
                className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 z-20 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.18) 48%, rgba(0,0,0,0.22) 50%, rgba(0,0,0,0.18) 52%, rgba(0,0,0,0.06) 100%)",
                }}
              >
                {/* Book Stitching Line */}
                <div className="absolute left-1/2 top-3 bottom-3 w-[1px] -translate-x-1/2 border-l border-dashed border-amber-950/30 dark:border-amber-100/20" />
              </div>

              {/* Horizontal Spine Divider (Mobile) */}
              <div
                aria-hidden="true"
                className="md:hidden w-full h-4 relative z-10"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.04) 100%)",
                }}
              >
                <div className="absolute top-1/2 left-4 right-4 h-[1px] -translate-y-1/2 border-t border-dashed border-amber-950/30 dark:border-amber-100/20" />
              </div>

              {/* ================= LEFT PAGE: Scrapbook Photo & Personal Note ================= */}
              <div className="relative p-6 sm:p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-amber-900/10 dark:border-white/5 bg-gradient-to-br from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE0] dark:from-[#22201D] dark:via-[#1E1C1A] dark:to-[#191715]">
                {/* Subtle paper line watermark header */}
                <div className="flex items-center justify-between text-[11px] font-mono text-charcoal-soft border-b border-amber-900/10 dark:border-white/10 pb-3">
                  <span className="tracking-widest uppercase font-semibold text-accent dark:text-accent-dark">
                    Notebook Archive
                  </span>
                  <span>Vol. 1 · 2026</span>
                </div>

                {/* Framed Personal Photo (Tipped-In Scrapbook Treatment) */}
                <div className="my-6 sm:my-8 flex flex-col items-center">
                  <div className="relative group p-2.5 sm:p-3 bg-white dark:bg-[#2A2724] rounded-xl shadow-md border border-amber-900/15 dark:border-white/10 -rotate-1 hover:rotate-0 transition-transform duration-300">
                    {/* Washi Tape Accent at Top */}
                    <div
                      aria-hidden="true"
                      className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 rounded-xs bg-[#E6D5B8]/85 dark:bg-[#785C3A]/70 border border-amber-700/20 shadow-2xs rotate-1"
                    />

                    {/* Image Viewport */}
                    <div className="relative w-44 h-48 sm:w-52 sm:h-56 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                      <Image
                        src="/images/profile.jpg"
                        alt="Kristian Novan portrait"
                        fill
                        className="object-cover object-top filter contrast-[1.03] group-hover:scale-103 transition-transform duration-500"
                        sizes="240px"
                        priority
                      />
                    </div>

                    {/* Hand-written style photo label */}
                    <div className="pt-2 text-center">
                      <span className="text-xs font-mono font-medium text-charcoal tracking-wide block">
                        Kristian Novan
                      </span>
                      <span className="text-[10px] font-mono text-charcoal-soft">
                        Computer Science · BINUS
                      </span>
                    </div>
                  </div>
                </div>

                {/* Left Page Footer Note */}
                <div className="pt-3 border-t border-amber-900/10 dark:border-white/10 text-center md:text-left">
                  <p className="text-xs text-charcoal-muted leading-relaxed font-sans italic">
                    &ldquo;Principles and anchors that guide my craft in AI
                    systems, user interaction, and disciplined curiosity.&rdquo;
                  </p>
                </div>
              </div>

              {/* ================= RIGHT PAGE: Quote, Unique Illustration & Turn Controls ================= */}
              <div
                onClick={() => {
                  // Clicking right page turns to next quote
                  if (!isFlipping) handleNext();
                }}
                className="relative p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-gradient-to-bl from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE0] dark:from-[#22201D] dark:via-[#1E1C1A] dark:to-[#191715] cursor-pointer"
                title="Click right page to turn next"
              >
                {/* Right Page Header */}
                <div className="flex items-center justify-between text-[11px] font-mono text-charcoal-soft border-b border-amber-900/10 dark:border-white/10 pb-3">
                  <div className="flex items-center gap-1.5 text-accent dark:text-accent-dark font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    <span>{currentQuote.theme}</span>
                  </div>
                  <span className="font-semibold text-charcoal">
                    {String(currentIndex + 1).padStart(2, "0")} /{" "}
                    {String(totalQuotes).padStart(2, "0")}
                  </span>
                </div>

                {/* Animated Quote Content Area */}
                <div
                  className={`my-auto py-6 sm:py-8 flex flex-col items-center text-center space-y-6 transition-all duration-380 ${
                    isFlipping
                      ? "opacity-20 scale-95 translate-y-1"
                      : "opacity-100 scale-100 translate-y-0"
                  }`}
                >
                  {/* Decorative Opening Quotation Mark */}
                  <span
                    aria-hidden="true"
                    className="text-4xl sm:text-5xl font-serif text-accent/30 dark:text-accent-dark/30 leading-none select-none"
                  >
                    “
                  </span>

                  {/* Quote Statement */}
                  <blockquote className="max-w-md">
                    <p className="text-xl sm:text-2xl md:text-[26px] font-display font-medium text-charcoal leading-[1.3] tracking-tight">
                      {currentQuote.quote}
                    </p>
                  </blockquote>

                  {/* Author Attribution */}
                  <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-accent dark:text-accent-dark font-display">
                    <span className="w-4 h-[1.5px] bg-accent/60 dark:bg-accent-dark/60 rounded-full" />
                    <span>{currentQuote.author}</span>
                    <span className="w-4 h-[1.5px] bg-accent/60 dark:bg-accent-dark/60 rounded-full" />
                  </div>

                  {/* Personal Reflective Note */}
                  {currentQuote.note && (
                    <p className="text-xs sm:text-sm text-charcoal-soft max-w-sm font-sans leading-relaxed">
                      {currentQuote.note}
                    </p>
                  )}

                  {/* Unique Hand-Drawn Animated Crayon Illustration */}
                  <div className="pt-2">
                    <QuoteIllustration type={currentQuote.illustration} />
                  </div>
                </div>

                {/* Right Page Footer & Tactile Controls */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="pt-4 border-t border-amber-900/10 dark:border-white/10 flex items-center justify-between"
                >
                  {/* Previous Button */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={Boolean(isFlipping)}
                    aria-label="Previous quote in journal"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium text-charcoal hover:text-accent hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>

                  {/* Hint indicator */}
                  <span className="text-[10px] font-mono text-charcoal-soft/75 hidden sm:inline">
                    Tap page or use arrow keys
                  </span>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={Boolean(isFlipping)}
                    aria-label="Next quote in journal"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium text-charcoal hover:text-accent hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all disabled:opacity-40 cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
