"use client";

import React, { useState } from "react";
import Image from "next/image";
import { personalData } from "@/data/personal";
import ScrollReveal from "./ScrollReveal";
import {
  Music,
  Drama,
  Users2,
  Sparkles,
  Compass,
  Lightbulb,
  ArrowRight,
  Mail,
  GraduationCap,
  FileDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const CREATIVE_INTERESTS = [
  { label: "Music", description: "Melody, harmonies, & instruments", icon: Music },
  { label: "Theater", description: "Dramatic arts, expression & stagecraft", icon: Drama },
  { label: "Choir", description: "Vocal ensemble & choral performance", icon: Users2 },
  { label: "Modeling", description: "Visual aesthetics, poise & fashion", icon: Sparkles },
  { label: "Exploring New Things", description: "Stepping beyond familiar comfort zones", icon: Compass },
  { label: "Learning New Things", description: "Curiosity-driven self-discovery", icon: Lightbulb },
];

const COLLAGE_PHOTOS = [
  {
    src: "/images/profile/p1.jpg",
    alt: "Kristian on stage",
    caption: "The Stage",
    subtitle: "Where performance meets presence",
  },
  {
    src: "/images/profile/p2.jpg",
    alt: "Kristian — creative expression",
    caption: "The Performer",
    subtitle: "Choir, theater & creative arts",
  },
  {
    src: "/images/profile/p3.jpg",
    alt: "Kristian exploring",
    caption: "The Explorer",
    subtitle: "Moments of curiosity & discovery",
  },
  {
    src: "/images/profile/p4.jpg",
    alt: "Kristian — personal style",
    caption: "The Creative",
    subtitle: "Aesthetics, fashion & identity",
  },
];

export default function About() {
  const [isPressingCta, setIsPressingCta] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const [mobilePhoto, setMobilePhoto] = useState(0);

  const handleCtaClick = () => {
    setIsPressingCta(true);
    setTimeout(() => {
      setIsPressingCta(false);
    }, 300);
  };

  return (
    <section id="about" className="py-16 md:py-24 border-t border-surface-border">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12 space-y-14 md:space-y-18">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col items-start space-y-2.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-subtle border border-surface-border text-charcoal-soft font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Personal Profile &amp; Story</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-charcoal">
            About Me
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted font-sans leading-relaxed">
            A Computer Science student combining technical discipline in Machine Learning and UI/UX with active creative pursuits in performing arts and hands-on discovery.
          </p>
        </ScrollReveal>

        {/* Narrative & Editorial Collage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Natural Personal Narrative & Beyond CS */}
          <ScrollReveal delay={100} className="lg:col-span-7 space-y-8">
            {/* Main Narrative Paragraphs */}
            <div className="space-y-5 text-charcoal-muted leading-relaxed text-base sm:text-lg font-sans">
              <p className="text-lg sm:text-xl text-charcoal font-medium leading-relaxed font-display">
                I started my Computer Science journey at BINUS University Semarang (Semesters 1–3), and am currently undertaking the Intelligent Systems (AI) streaming in Jakarta (Semesters 4–5) to dive deeper into Machine Learning and UI/UX engineering.
              </p>
              <p>
                Outside of technology, I am passionate about music, theater, choir, and modeling. I like stepping into unfamiliar territory and discovering how things work from the ground up. Exploring diverse creative domains is fundamental to how I stay curious and continually evolve.
              </p>
              <p>
                Whether I&apos;m training a machine learning model, crafting an interface in Figma, or stepping onto a stage, I find joy in connecting technical thinking with creative expression. I enjoy building things from both sides of the process — making systems dependable under the hood while ensuring they feel natural, clear, and human on the surface.
              </p>

              {/* Editorial Pull-Quote */}
              <blockquote className="p-4 sm:p-5 rounded-2xl bg-canvas-subtle border-l-4 border-accent text-charcoal font-quote italic text-base sm:text-lg leading-relaxed shadow-2xs">
                &ldquo;Technical discipline gives structure to algorithms, but it is stagecraft, choral harmony, and theater that teach the power of human connection, presence, and timing.&rdquo;
              </blockquote>
            </div>

            {/* BEYOND COMPUTER SCIENCE — Subtle Editorial Interest Area */}
            <div className="pt-2 space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold tracking-wider text-charcoal-soft uppercase">
                  Beyond Computer Science
                </span>
                <div className="flex-1 h-[1px] bg-surface-border" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {CREATIVE_INTERESTS.map((item) => (
                  <div
                    key={item.label}
                    className="p-3 rounded-xl bg-white/70 dark:bg-canvas-card-dark/70 border border-surface-border/80 hover:border-accent/40 shadow-2xs hover:shadow-xs transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className="w-3.5 h-3.5 text-accent dark:text-accent-dark shrink-0" />
                      <span className="text-xs font-display font-semibold text-charcoal group-hover:text-accent transition-colors">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-charcoal-soft block line-clamp-1">
                      {item.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* PERSONAL COLLABORATION CTA */}
            <div className="p-6 sm:p-7 rounded-2xl bg-canvas-subtle border border-surface-border space-y-4">
              <div className="space-y-1.5">
                <p className="text-sm sm:text-base font-display font-semibold text-charcoal">
                  I&apos;m always open to meeting people, working on interesting ideas, and building something meaningful together.
                </p>
                <p className="text-xs sm:text-sm text-charcoal-muted font-sans">
                  Interested in collaborating on software, AI/ML, UI/UX, or creative technical projects? I&apos;d be happy to hear from you.
                </p>
              </div>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${personalData.contact.email}`}
                  onClick={handleCtaClick}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-charcoal dark:bg-charcoal-dark text-white dark:text-canvas-dark text-xs sm:text-sm font-semibold font-display shadow-xs hover:bg-accent dark:hover:bg-accent-hover hover:text-white transition-all duration-200 cursor-pointer group ${
                    isPressingCta ? "scale-95" : "hover:-translate-y-0.5"
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Let&apos;s Work Together</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="/cv/Kristian-Novan-CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Kristian-Novan-CV.pdf"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-canvas-card-dark border border-surface-border text-charcoal text-xs sm:text-sm font-semibold font-display shadow-2xs hover:border-accent hover:text-accent transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer group"
                  title="Download Kristian Novan's Curriculum Vitae (PDF)"
                >
                  <FileDown className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                  <span>Download CV (PDF)</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Curated Personal Photos Collage */}
          <ScrollReveal delay={200} className="lg:col-span-5 flex flex-col space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold tracking-wider text-charcoal-soft uppercase block">
                Moments &amp; Creative Life
              </span>
              <p className="text-xs text-charcoal-soft font-sans">
                A visual snapshot across university life, stage events, and personal creative pursuits.
              </p>
            </div>

            {/* ── DESKTOP: Expanding Accordion ──────────────────────── */}
            <div className="hidden sm:flex gap-2 h-80 rounded-2xl overflow-hidden border border-surface-border shadow-xs">
              {COLLAGE_PHOTOS.map((photo, i) => {
                const isActive = activePhoto === i;
                return (
                  <div
                    key={photo.src}
                    role="button"
                    tabIndex={0}
                    aria-label={photo.caption}
                    onMouseEnter={() => setActivePhoto(i)}
                    onFocus={() => setActivePhoto(i)}
                    onClick={() => setActivePhoto(i)}
                    onKeyDown={(e) => e.key === "Enter" && setActivePhoto(i)}
                    className={`relative overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${
                      isActive ? "flex-[3]" : "flex-[1]"
                    }`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className={`object-cover object-center transition-all duration-500 ${
                        isActive ? "scale-105" : "scale-100 brightness-75"
                      }`}
                      priority={i < 2}
                    />
                    {/* Always-visible slim label for collapsed slices */}
                    {!isActive && (
                      <div className="absolute inset-0 flex items-end justify-center pb-4">
                        <span
                          className="font-mono text-[9px] font-bold text-white/80 tracking-widest uppercase"
                          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                        >
                          {photo.caption}
                        </span>
                      </div>
                    )}
                    {/* Expanded caption overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 flex flex-col justify-end p-4 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest mb-0.5">
                        {String(i + 1).padStart(2, "0")} / {COLLAGE_PHOTOS.length}
                      </span>
                      <span className="text-base font-display font-bold text-white leading-tight">
                        {photo.caption}
                      </span>
                      <span className="text-[11px] font-sans text-white/70 mt-0.5">
                        {photo.subtitle}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── MOBILE: Single card with prev / next ──────────────── */}
            <div className="sm:hidden relative h-72 rounded-2xl overflow-hidden border border-surface-border shadow-xs">
              <Image
                src={COLLAGE_PHOTOS[mobilePhoto].src}
                alt={COLLAGE_PHOTOS[mobilePhoto].alt}
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority
              />
              {/* Caption overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-4">
                <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest mb-0.5">
                  {String(mobilePhoto + 1).padStart(2, "0")} / {COLLAGE_PHOTOS.length}
                </span>
                <span className="text-base font-display font-bold text-white leading-tight">
                  {COLLAGE_PHOTOS[mobilePhoto].caption}
                </span>
                <span className="text-[11px] font-sans text-white/70 mt-0.5">
                  {COLLAGE_PHOTOS[mobilePhoto].subtitle}
                </span>
              </div>
              {/* Prev / Next */}
              <button
                type="button"
                onClick={() => setMobilePhoto((p) => (p - 1 + COLLAGE_PHOTOS.length) % COLLAGE_PHOTOS.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setMobilePhoto((p) => (p + 1) % COLLAGE_PHOTOS.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {COLLAGE_PHOTOS.map((_, di) => (
                  <button
                    key={di}
                    type="button"
                    onClick={() => setMobilePhoto(di)}
                    className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                      di === mobilePhoto ? "bg-white w-4" : "bg-white/40"
                    }`}
                    aria-label={`Go to photo ${di + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Academic Summary Badge */}
            <div className="p-4 rounded-xl bg-white dark:bg-canvas-card-dark border border-surface-border text-xs flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-accent" />
                <div>
                  <span className="font-display font-semibold text-charcoal block">
                    BINUS University · B2028
                  </span>
                  <span className="text-[10px] font-mono text-charcoal-soft">
                    Sem 1–3: Semarang (Main) · Sem 4–5: Jakarta (AI Streaming)
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent-light dark:bg-accent-soft text-accent dark:text-accent-dark">
                SOCS
              </span>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
