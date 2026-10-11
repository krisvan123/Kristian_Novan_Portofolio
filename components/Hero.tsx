"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  FolderGit2,
  ArrowRight,
  Check,
  FileDown,
  Cpu,
  Sparkles,
  Mic,
  Award,
  Layers,
  HeartHandshake,
} from "lucide-react";
import { personalData } from "@/data/personal";
import ProfilePhoto from "./ProfilePhoto";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero() {
  const [lens, setLens] = useState<"ai" | "creative">("ai");
  const [isContacting, setIsContacting] = useState(false);

  const handleContactClick = () => {
    setIsContacting(true);
    setTimeout(() => {
      setIsContacting(false);
    }, 450);
  };

  return (
    <section
      id="home"
      className="relative pt-28 pb-8 md:pt-36 md:pb-14 overflow-hidden"
    >
      {/* Dynamic Ambient Background Tone based on interactive lens */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden transition-colors duration-700">
        <div
          className={`absolute top-16 left-1/4 w-[28rem] h-[28rem] rounded-full blur-3xl transition-all duration-700 ${
            lens === "ai"
              ? "bg-accent/10 dark:bg-accent/15 scale-100"
              : "bg-amber-500/10 dark:bg-rose-500/15 scale-105"
          }`}
        />
        <div
          className={`absolute top-1/3 right-10 w-[24rem] h-[24rem] rounded-full blur-3xl transition-all duration-700 ${
            lens === "ai"
              ? "bg-blue-500/5 dark:bg-indigo-500/10"
              : "bg-orange-500/10 dark:bg-amber-500/10"
          }`}
        />
      </div>

      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12 w-full">
        {/* Responsive Grid: Desktop Two-Column, Mobile Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Clear Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Top Eyebrow with Availability & Campus Mobility */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-canvas-subtle border border-surface-border text-charcoal-soft font-mono text-[11px] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-charcoal font-medium">BINUS University B2028</span>
              <span className="opacity-40">•</span>
              <span>Sem 1–3 Semarang · Sem 4–5 Jakarta (AI)</span>
              <span className="opacity-40">•</span>
              <span className="text-accent dark:text-accent-dark font-semibold">GPA 3.5875</span>
            </div>

            {/* Primary Name & Direction */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-semibold tracking-tight text-charcoal leading-[1.06]">
                Kristian Novan
              </h1>
              <div className="space-y-1 pt-1">
                <p className="text-xl sm:text-2xl lg:text-3xl font-display font-medium text-charcoal-muted tracking-tight">
                  Creative Technologist
                </p>
                <p className="text-xs sm:text-sm font-mono text-accent dark:text-accent-dark font-medium">
                  Where Machine Learning Rigor Meets Human Stagecraft
                </p>
              </div>
            </div>

            {/* Interactive Duality Lens Switcher (The Interactive Hook!) */}
            <div className="w-full max-w-xl p-3.5 sm:p-4 rounded-2xl bg-white/80 dark:bg-canvas-card-dark/80 backdrop-blur-xs border border-surface-border shadow-xs space-y-3 transition-all duration-300">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-soft font-semibold">
                  Dual Focus Profile:
                </span>
                <span className="text-[10px] font-mono text-accent dark:text-accent-dark font-medium">
                  Select focus
                </span>
              </div>

              {/* Lens Toggle Pills */}
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-canvas-subtle border border-surface-border/60">
                <button
                  type="button"
                  onClick={() => setLens("ai")}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                    lens === "ai"
                      ? "bg-charcoal dark:bg-charcoal-dark text-white dark:text-canvas-dark shadow-2xs font-semibold"
                      : "text-charcoal-soft hover:text-charcoal"
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>The AI Engineer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLens("creative")}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                    lens === "creative"
                      ? "bg-accent dark:bg-accent-hover text-white shadow-2xs font-semibold"
                      : "text-charcoal-soft hover:text-charcoal"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Stage Performer</span>
                </button>
              </div>

              {/* Dynamic Lens Content */}
              <div className="text-xs font-sans text-charcoal-muted leading-relaxed min-h-[52px] flex items-center">
                {lens === "ai" ? (
                  <div className="space-y-1.5 animate-fade-in-up">
                    <p>
                      <strong className="text-charcoal font-semibold">Intelligent Systems (AI):</strong> Building regression pipelines, computer vision models, and heuristic vehicle routing. Top 41 Finalist at CompFest AIC &amp; ICORIS 2026 paper author.
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-charcoal-soft pt-0.5">
                      <span className="px-2 py-0.5 rounded bg-canvas-subtle border border-surface-border">Python · PyTorch</span>
                      <span className="px-2 py-0.5 rounded bg-canvas-subtle border border-surface-border">OpenCV · NLP</span>
                      <span className="px-2 py-0.5 rounded bg-canvas-subtle border border-surface-border">Azure AI Certified</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5 animate-fade-in-up">
                    <p>
                      <strong className="text-charcoal font-semibold">Stagecraft &amp; Creative Arts:</strong> Experienced Master of Ceremony (PTK Techno Events), classical choir ensemble, theater stagecraft, modeling, and humanitarian logistics (WALUBI Waisak).
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-charcoal-soft pt-0.5">
                      <span className="px-2 py-0.5 rounded bg-canvas-subtle border border-surface-border">Public Speaking &amp; MC</span>
                      <span className="px-2 py-0.5 rounded bg-canvas-subtle border border-surface-border">Choir &amp; Vocal Arts</span>
                      <span className="px-2 py-0.5 rounded bg-canvas-subtle border border-surface-border">HIMTI Mentorship</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Primary CTAs: View Projects, Download CV, Contact Me */}
            <div className="flex flex-wrap items-center gap-3 pt-1 w-full sm:w-auto">
              <Link
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-charcoal dark:bg-charcoal-dark text-white dark:text-canvas-dark text-xs sm:text-sm font-semibold hover:bg-accent dark:hover:bg-accent-hover hover:text-white transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 group cursor-pointer"
              >
                <FolderGit2 className="w-4 h-4 stroke-[1.9]" />
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              {/* Download CV (PDF) Button */}
              <a
                href="/cv/Kristian-Novan-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Kristian-Novan-CV.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group active:scale-95"
              >
                <FileDown className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Download CV (PDF)</span>
              </a>

              <a
                href={`mailto:${personalData.contact.email}`}
                onClick={handleContactClick}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-canvas-card-dark border border-surface-border text-charcoal dark:text-charcoal-dark text-xs sm:text-sm font-semibold hover:border-accent hover:text-accent transition-all duration-200 shadow-2xs cursor-pointer active:scale-95 ${
                  isContacting
                    ? "scale-95 border-accent text-accent bg-accent-light dark:bg-accent-soft"
                    : "hover:-translate-y-0.5"
                }`}
              >
                {isContacting ? (
                  <Check className="w-4 h-4 stroke-[2.2] text-accent animate-bounce" />
                ) : (
                  <Mail className="w-4 h-4 stroke-[1.9]" />
                )}
                <span>{isContacting ? "Opening..." : "Contact Me"}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Balanced Profile Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ProfilePhoto />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="w-full flex justify-center pt-10 md:pt-14">
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}
