"use client";

import React, { useState } from "react";
import { personalData } from "@/data/personal";
import ScrollReveal from "./ScrollReveal";
import { Mail, Instagram, Linkedin, Github, Copy, Check, ArrowUpRight, MessageSquare, Send, FileDown, MessageCircle } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [activeAction, setActiveAction] = useState<"talk" | "contact" | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleButtonClick = (action: "talk" | "contact") => {
    setActiveAction(action);
    setTimeout(() => {
      setActiveAction(null);
    }, 450);
  };

  return (
    <section id="contact" className="py-14 md:py-20 border-t border-surface-border">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12">
        <ScrollReveal className="bg-white dark:bg-canvas-card-dark rounded-3xl border border-surface-border p-7 sm:p-10 lg:p-12 shadow-xs relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative max-w-2xl space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-light dark:bg-accent-soft border border-accent-border/60 text-accent dark:text-accent-dark font-mono text-[11px] font-medium">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-charcoal leading-tight">
              Let&apos;s Connect
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed font-sans">
              Interested in collaborating, discussing a software or AI project, or simply connecting? Feel free to reach out directly.
            </p>

            {/* Contact channels grid */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
              {/* Email Card */}
              <div className="p-4 rounded-xl bg-canvas-subtle border border-surface-border flex flex-col justify-between space-y-3 group hover:border-accent-border transition-colors">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-canvas-card-dark border border-surface-border flex items-center justify-center text-accent dark:text-accent-dark shadow-2xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="text-xs text-charcoal-soft hover:text-accent flex items-center gap-1 transition-colors cursor-pointer"
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-accent dark:text-accent-dark" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-charcoal-soft font-semibold block font-mono">
                    Email
                  </span>
                  <a
                    href={`mailto:${personalData.contact.email}`}
                    className="text-xs font-semibold text-charcoal hover:text-accent truncate block mt-0.5"
                  >
                    {personalData.contact.email}
                  </a>
                </div>
              </div>

              {/* WhatsApp Card */}
              <a
                href={personalData.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-canvas-subtle border border-surface-border flex flex-col justify-between space-y-3 group hover:border-emerald-500/60 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-2xs">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-charcoal-soft group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-charcoal-soft font-semibold block font-mono">
                    WhatsApp
                  </span>
                  <span className="text-xs font-semibold text-charcoal group-hover:text-emerald-500 truncate block mt-0.5 font-mono">
                    {personalData.contact.phone}
                  </span>
                </div>
              </a>

              {/* GitHub Card */}
              {personalData.contact.githubUrl && (
                <a
                  href={personalData.contact.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-canvas-subtle border border-surface-border flex flex-col justify-between space-y-3 group hover:border-accent-border transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-canvas-card-dark border border-surface-border flex items-center justify-center text-charcoal group-hover:text-accent transition-colors shadow-2xs">
                      <Github className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-charcoal-soft group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-charcoal-soft font-semibold block font-mono">
                      GitHub
                    </span>
                    <span className="text-xs font-semibold text-charcoal group-hover:text-accent truncate block mt-0.5">
                      krisvan123
                    </span>
                  </div>
                </a>
              )}

              {/* LinkedIn Card */}
              <a
                href={personalData.contact.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-canvas-subtle border border-surface-border flex flex-col justify-between space-y-3 group hover:border-accent-border transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-canvas-card-dark border border-surface-border flex items-center justify-center text-[#0A66C2] shadow-2xs">
                    <Linkedin className="w-4 h-4 fill-current" />
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-charcoal-soft group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-charcoal-soft font-semibold block font-mono">
                    LinkedIn
                  </span>
                  <span className="text-xs font-semibold text-charcoal group-hover:text-accent truncate block mt-0.5">
                    {personalData.contact.linkedInName}
                  </span>
                </div>
              </a>

              {/* Instagram Card */}
              <a
                href={personalData.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-canvas-subtle border border-surface-border flex flex-col justify-between space-y-3 group hover:border-accent-border transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-canvas-card-dark border border-surface-border flex items-center justify-center text-charcoal group-hover:text-accent transition-colors shadow-2xs">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-charcoal-soft group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-charcoal-soft font-semibold block font-mono">
                    Instagram
                  </span>
                  <span className="text-xs font-semibold text-charcoal group-hover:text-accent truncate block mt-0.5">
                    {personalData.contact.instagramHandle}
                  </span>
                </div>
              </a>
            </div>

            {/* Dedicated CV / Resume Quick Banner */}
            <div className="mt-2 p-4 rounded-2xl bg-canvas-subtle border border-surface-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group hover:border-accent-border transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shadow-2xs shrink-0">
                  <FileDown className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-display font-semibold text-charcoal">
                    Curriculum Vitae (PDF)
                  </h4>
                  <p className="text-[11px] sm:text-xs text-charcoal-muted font-sans">
                    Detailed summary of Intelligent Systems (AI) coursework, machine learning projects, and credentials.
                  </p>
                </div>
              </div>
              <a
                href="/cv/Kristian-Novan-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Kristian-Novan-CV.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-semibold shrink-0 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </a>
            </div>

            {/* CTAs with responsive micro-interactions: "Let's Talk", "Contact Me" & "Download CV" */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <a
                href={`mailto:${personalData.contact.email}`}
                onClick={() => handleButtonClick("talk")}
                className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-charcoal dark:bg-charcoal-dark text-white dark:text-canvas-dark text-sm font-semibold hover:bg-accent dark:hover:bg-accent-hover hover:text-white transition-all duration-200 shadow-sm active:scale-95 ${
                  activeAction === "talk"
                    ? "scale-95 bg-accent text-white"
                    : "hover:-translate-y-0.5"
                }`}
              >
                {activeAction === "talk" ? (
                  <Send className="w-4 h-4 animate-bounce text-white" />
                ) : (
                  <Mail className="w-4 h-4" />
                )}
                <span className="font-display">
                  {activeAction === "talk" ? "Opening Client..." : "Let's Talk"}
                </span>
              </a>

              <a
                href={`mailto:${personalData.contact.email}`}
                onClick={() => handleButtonClick("contact")}
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-canvas-card-dark border border-surface-border text-charcoal text-sm font-semibold hover:border-accent hover:text-accent transition-all duration-200 shadow-2xs active:scale-95 ${
                  activeAction === "contact"
                    ? "scale-95 border-accent text-accent bg-accent-light dark:bg-accent-soft"
                    : "hover:-translate-y-0.5"
                }`}
              >
                {activeAction === "contact" ? (
                  <Check className="w-4 h-4 stroke-[2.2] text-accent animate-bounce" />
                ) : (
                  <span className="font-display">Contact Me</span>
                )}
                {activeAction !== "contact" && <ArrowUpRight className="w-4 h-4" />}
              </a>

              <a
                href={personalData.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all duration-200 shadow-2xs hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
                title="Chat with Kristian on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-display">WhatsApp Chat</span>
              </a>

              <a
                href="/cv/Kristian-Novan-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Kristian-Novan-CV.pdf"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition-all duration-200 shadow-2xs hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
                title="Download Kristian Novan's Curriculum Vitae (PDF)"
              >
                <FileDown className="w-4 h-4 group-hover:scale-110 transition-transform stroke-[2.2]" />
                <span className="font-display">Download CV (PDF)</span>
              </a>

              <span className="text-xs text-charcoal-soft font-mono ml-1">
                Direct via email or download CV
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
