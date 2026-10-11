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
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

const CREATIVE_INTERESTS = [
  { label: "Music", description: "Melody, harmonies, & instruments", icon: Music },
  { label: "Theater", description: "Dramatic arts & stagecraft", icon: Drama },
  { label: "Choir", description: "Vocal choral ensemble", icon: Users2 },
  { label: "Modeling", description: "Visual aesthetics & poise", icon: Sparkles },
  { label: "Exploring", description: "Stepping beyond comfort zones", icon: Compass },
  { label: "Learning", description: "Curiosity-driven discovery", icon: Lightbulb },
];

const COLLAGE_PHOTOS = [
  {
    src: "/images/profile/p1.jpg",
    alt: "Kristian on stage",
    caption: "The Stage",
    subtitle: "Presence & performance",
  },
  {
    src: "/images/profile/p2.jpg",
    alt: "Kristian — creative expression",
    caption: "The Performer",
    subtitle: "Choir & dramatic arts",
  },
  {
    src: "/images/profile/p3.jpg",
    alt: "Kristian exploring",
    caption: "The Explorer",
    subtitle: "Moments of discovery",
  },
  {
    src: "/images/profile/p4.jpg",
    alt: "Kristian — personal style",
    caption: "The Creative",
    subtitle: "Visual aesthetics & identity",
  },
];

export default function About() {
  const [activePhoto, setActivePhoto] = useState(0);
  const [mobilePhoto, setMobilePhoto] = useState(0);

  return (
    <section id="about" className="py-16 md:py-24 border-t border-surface-border">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12 space-y-12 md:space-y-14">
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

        {/* Balanced Two-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (col-span-7): Story, Philosophy, & Creative Interests */}
          <ScrollReveal delay={100} className="lg:col-span-7 flex flex-col space-y-6">
            {/* Main Narrative Paragraphs */}
            <div className="space-y-4 text-charcoal-muted leading-relaxed text-sm sm:text-base font-sans">
              <p className="text-base sm:text-lg text-charcoal font-medium leading-relaxed font-display">
                I started my Computer Science journey at BINUS University Semarang (Semesters 1–3), and am currently undertaking the Intelligent Systems (AI) streaming in Jakarta (Semesters 4–5) to dive deeper into Machine Learning and UI/UX engineering.
              </p>
              <p>
                Outside of technology, I am passionate about music, theater, choir, and modeling. I like stepping into unfamiliar territory and discovering how things work from the ground up. Exploring diverse creative domains is fundamental to how I stay curious and continually evolve.
              </p>
              <p>
                Whether I&apos;m training a machine learning model, crafting an interface in Figma, or stepping onto a stage, I find joy in connecting technical thinking with creative expression — making systems dependable under the hood while ensuring they feel natural, clear, and human on the surface.
              </p>
            </div>

            {/* Editorial Pull-Quote */}
            <blockquote className="p-4 rounded-xl bg-canvas-subtle border-l-3 border-accent text-charcoal font-quote italic text-sm sm:text-base leading-relaxed shadow-2xs">
              &ldquo;Technical discipline gives structure to algorithms, but it is stagecraft, choral harmony, and theater that teach the power of human connection, presence, and timing.&rdquo;
            </blockquote>

            {/* Beyond Computer Science Pills */}
            <div className="pt-1 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold tracking-wider text-charcoal-soft uppercase">
                  Beyond Computer Science
                </span>
                <div className="flex-1 h-[1px] bg-surface-border/80" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {CREATIVE_INTERESTS.map((item) => (
                  <div
                    key={item.label}
                    className="p-3 rounded-xl bg-canvas-card dark:bg-canvas-card-dark border border-surface-border hover:border-accent/50 shadow-2xs transition-all duration-200 group"
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
          </ScrollReveal>

          {/* Right Column (col-span-5): Curated Visual Accordion + Academic Trajectory & GPA Card */}
          <ScrollReveal delay={200} className="lg:col-span-5 flex flex-col space-y-5">
            {/* Visual Photo Accordion */}
            <div className="space-y-2">
              {/* Desktop Accordion */}
              <div className="hidden sm:flex gap-2 h-64 rounded-2xl overflow-hidden border border-surface-border shadow-2xs bg-canvas-subtle">
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
                        isActive ? "flex-[3.5]" : "flex-[1]"
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
                      {!isActive && <div className="absolute inset-0 bg-black/35" />}
                      {isActive && (
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white animate-fade-in-up pointer-events-none">
                          <p className="text-xs font-display font-semibold">{photo.caption}</p>
                          <p className="text-[10px] text-white/80 font-mono line-clamp-1">{photo.subtitle}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Mobile Carousel */}
              <div className="sm:hidden relative h-64 rounded-2xl overflow-hidden border border-surface-border shadow-2xs">
                <Image
                  src={COLLAGE_PHOTOS[mobilePhoto].src}
                  alt={COLLAGE_PHOTOS[mobilePhoto].alt}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                  priority
                />
                <button
                  type="button"
                  onClick={() => setMobilePhoto((p) => (p - 1 + COLLAGE_PHOTOS.length) % COLLAGE_PHOTOS.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobilePhoto((p) => (p + 1) % COLLAGE_PHOTOS.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {COLLAGE_PHOTOS.map((_, di) => (
                    <button
                      key={di}
                      type="button"
                      onClick={() => setMobilePhoto(di)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        di === mobilePhoto ? "bg-white w-4" : "bg-white/40 w-1.5"
                      }`}
                      aria-label={`Go to photo ${di + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Academic Trajectory & GPA Card */}
            <div className="p-5 rounded-2xl bg-canvas-card dark:bg-canvas-card-dark border border-surface-border shadow-2xs space-y-4">
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-surface-border/70">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-accent-light dark:bg-accent-soft text-accent dark:text-accent-dark flex items-center justify-center">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-display font-semibold text-charcoal">
                      Academic Trajectory
                    </h3>
                    <p className="text-[10px] font-mono text-charcoal-soft">
                      BINUS University · B2028 (SOCS)
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent-light dark:bg-accent-soft border border-accent-border/60 text-accent font-mono text-[11px] font-bold">
                  <TrendingUp className="w-3 h-3" />
                  <span>GPA {personalData.academic.cumulativeGpa}</span>
                </div>
              </div>

              {/* 4 Semesters 2x2 Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {personalData.academic.semesters.map((sem) => (
                  <div
                    key={sem.semester}
                    className="p-3 rounded-xl bg-canvas-subtle border border-surface-border/70 space-y-1.5 hover:border-accent-border transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-display font-semibold text-charcoal">
                        {sem.label}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-accent dark:text-accent-dark px-1.5 py-0.5 rounded bg-accent-light dark:bg-accent-soft border border-accent-border/30">
                        {sem.gpa}
                      </span>
                    </div>

                    <div className="w-full bg-surface-border/80 rounded-full h-1 overflow-hidden">
                      <div
                        className="bg-accent h-1 rounded-full"
                        style={{
                          width: `${(parseFloat(sem.gpa) / 4.0) * 100}%`,
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[9.5px] font-mono text-charcoal-soft">
                      <span className="truncate">{sem.campus.replace("BINUS ", "")}</span>
                      <span className="text-charcoal font-medium">/ 4.00</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer strip */}
              <div className="flex items-center justify-between pt-1 text-[10.5px] font-mono text-charcoal-soft border-t border-surface-border/60">
                <span className="flex items-center gap-1 text-accent font-medium">
                  <TrendingUp className="w-3 h-3" />
                  <span>+0.41 Growth (Sem 1 ➔ Sem 4)</span>
                </span>
                <span>Mobility: Semarang ➔ Jkt</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
