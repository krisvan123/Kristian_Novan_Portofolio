"use client";

import React from "react";
import { personalData } from "@/data/personal";
import { ArrowUp, Github, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-surface-border dark:border-surface-border-dark bg-canvas dark:bg-canvas-dark py-8 md:py-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-6 border-b border-surface-border/60 dark:border-surface-border-dark/60">
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-semibold text-charcoal dark:text-charcoal-dark">
              {personalData.name}
            </h3>
            <p className="text-xs text-charcoal-soft dark:text-charcoal-soft-dark font-mono">
              {personalData.academic.school} • {personalData.academic.university} ({personalData.academic.cohort})
            </p>
          </div>

          <div className="flex items-center gap-3 text-charcoal-soft dark:text-charcoal-soft-dark">
            <a
              href={`mailto:${personalData.contact.email}`}
              className="p-2 rounded-lg hover:text-accent dark:hover:text-accent-dark hover:bg-canvas-subtle dark:hover:bg-canvas-subtle-dark transition-colors"
              aria-label="Send Email"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={personalData.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-accent dark:hover:text-accent-dark hover:bg-canvas-subtle dark:hover:bg-canvas-subtle-dark transition-colors"
              aria-label="Instagram Profile"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={personalData.contact.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-accent dark:hover:text-accent-dark hover:bg-canvas-subtle dark:hover:bg-canvas-subtle-dark transition-colors"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            {personalData.contact.githubUrl && (
              <a
                href={personalData.contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:text-accent dark:hover:text-accent-dark hover:bg-canvas-subtle dark:hover:bg-canvas-subtle-dark transition-colors"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-charcoal-soft dark:text-charcoal-soft-dark">
          <p>© 2026 {personalData.name}. All rights reserved.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-charcoal dark:hover:text-charcoal-dark transition-colors group cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
