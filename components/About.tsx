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
} from "lucide-react";

const CREATIVE_INTERESTS = [
  { label: "Music", description: "Melody, harmonies, & instruments", icon: Music, emoji: "🎵" },
  { label: "Theater", description: "Dramatic arts, expression & stagecraft", icon: Drama, emoji: "🎭" },
  { label: "Choir", description: "Vocal ensemble & choral performance", icon: Users2, emoji: "🎶" },
  { label: "Modeling", description: "Visual aesthetics, poise & fashion", icon: Sparkles, emoji: "✨" },
  { label: "Exploring New Things", description: "Stepping beyond familiar comfort zones", icon: Compass, emoji: "🧭" },
  { label: "Learning New Things", description: "Curiosity-driven self-discovery", icon: Lightbulb, emoji: "💡" },
];

const COLLAGE_PHOTOS = [
  {
    src: "/images/profile/p1.jpg",
    alt: "Kristian Novan personal photo 1",
    caption: "Stage & Presence",
    aspect: "aspect-[4/5]",
    className: "rotate-[-1.5deg] hover:rotate-0 hover:z-10",
  },
  {
    src: "/images/profile/p2.jpg",
    alt: "Kristian Novan personal photo 2",
    caption: "Creative Expressions",
    aspect: "aspect-[1/1]",
    className: "rotate-[1.5deg] hover:rotate-0 hover:z-10 mt-4 md:mt-6",
  },
  {
    src: "/images/profile/p3.jpg",
    alt: "Kristian Novan personal photo 3",
    caption: "Moments & Exploration",
    aspect: "aspect-[1/1]",
    className: "rotate-[1deg] hover:rotate-0 hover:z-10 -mt-2",
  },
  {
    src: "/images/profile/p4.jpg",
    alt: "Kristian Novan personal photo 4",
    caption: "Curiosity in Motion",
    aspect: "aspect-[4/5]",
    className: "rotate-[-2deg] hover:rotate-0 hover:z-10 mt-3",
  },
];

export default function About() {
  const [isPressingCta, setIsPressingCta] = useState(false);

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
                I&apos;m a Computer Science student at BINUS University, currently exploring Machine Learning and UI/UX while building projects and learning through hands-on experiences.
              </p>
              <p>
                Outside of technology, I also enjoy music, theater, choir, and modeling. I like trying things that are unfamiliar to me and learning something new along the way. For me, exploring different interests is part of how I stay curious and keep growing.
              </p>
              <p>
                Whether I&apos;m training a machine learning model, crafting an interface in Figma, or stepping onto a stage, I find joy in connecting technical thinking with creative expression. I enjoy building things from both sides of the process — making systems dependable under the hood while ensuring they feel natural, clear, and human on the surface.
              </p>
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
                      <span className="text-sm">{item.emoji}</span>
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

              <div className="pt-1">
                <a
                  href={`mailto:${personalData.contact.email}`}
                  onClick={handleCtaClick}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-charcoal dark:bg-[#F3F2EE] text-white dark:text-[#111113] text-xs sm:text-sm font-semibold font-display shadow-xs hover:bg-accent dark:hover:bg-accent-hover hover:text-white transition-all duration-200 cursor-pointer group ${
                    isPressingCta ? "scale-95" : "hover:-translate-y-0.5"
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Let&apos;s Work Together</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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

            {/* Asymmetrical 2x2 Collage with subtle interactive tilt & hover */}
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 p-2 sm:p-3 rounded-3xl bg-white/40 dark:bg-canvas-card-dark/40 border border-surface-border shadow-2xs">
              {COLLAGE_PHOTOS.map((photo, i) => (
                <div
                  key={photo.src}
                  className={`group relative rounded-2xl overflow-hidden border-2 border-white dark:border-[#222126] shadow-xs hover:shadow-md transition-all duration-300 ${photo.aspect} ${photo.className}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 160px, 240px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-103"
                    priority={i < 2}
                  />
                  {/* Subtle hover gradient and caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
                    <span className="text-[10px] font-mono font-medium text-white tracking-wider">
                      {photo.caption}
                    </span>
                  </div>
                </div>
              ))}
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
                    Intelligent Systems (AI) Specialization · Semesters 4–5
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
