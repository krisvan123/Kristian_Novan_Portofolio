"use client";

import React, { useState } from "react";
import { personalData } from "@/data/personal";
import { Mail, Instagram, Linkedin, Copy, Check, ArrowUpRight, MessageSquare } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-14 md:py-20 border-t border-surface-border">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12">
        <div className="bg-white dark:bg-canvas-card-dark rounded-3xl border border-surface-border p-7 sm:p-10 lg:p-12 shadow-xs relative overflow-hidden">
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
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
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
            </div>

            {/* CTAs: "Let's Talk" & "Contact Me" */}
            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <a
                href={`mailto:${personalData.contact.email}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-charcoal dark:bg-[#F3F2EE] text-white dark:text-[#111113] text-sm font-semibold hover:bg-accent dark:hover:bg-accent-hover hover:text-white transition-all duration-200 shadow-sm hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
                <span className="font-display">Let&apos;s Talk</span>
              </a>

              <a
                href={`mailto:${personalData.contact.email}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-canvas-card-dark border border-surface-border text-charcoal text-sm font-semibold hover:border-accent hover:text-accent transition-all duration-200 shadow-2xs hover:-translate-y-0.5"
              >
                <span className="font-display">Contact Me</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <span className="text-xs text-charcoal-soft font-mono ml-1">
                Direct via email
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
