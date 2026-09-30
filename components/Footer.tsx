"use client";

import React from "react";
import { personalData } from "@/data/personal";
import { ArrowUp, Github, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-surface-border bg-canvas py-10 md:py-12 transition-colors duration-300">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-6 border-b border-surface-border/60">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-display font-semibold text-charcoal">
              {personalData.name}
            </h3>
            <p className="text-xs text-charcoal-soft font-mono">
              {personalData.academic.school} • {personalData.academic.program} • {personalData.academic.university} ({personalData.academic.cohort})
            </p>
          </div>

          <div className="flex items-center gap-2.5 text-charcoal-soft">
            <a
              href={`mailto:${personalData.contact.email}`}
              className="p-2 rounded-lg hover:text-accent hover:bg-canvas-subtle transition-colors"
              aria-label="Send Email"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={personalData.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-accent hover:bg-canvas-subtle transition-colors"
              aria-label="Instagram Profile"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={personalData.contact.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-accent hover:bg-canvas-subtle transition-colors"
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
                className="p-2 rounded-lg hover:text-accent hover:bg-canvas-subtle transition-colors"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-charcoal-soft font-mono">
          <p>© 2026 {personalData.name}. All rights reserved.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-charcoal transition-colors group cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
