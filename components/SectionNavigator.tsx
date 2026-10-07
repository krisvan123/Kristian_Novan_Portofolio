"use client";

import React, { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface SectionItem {
  id: string;
  label: string;
}

const SECTIONS: SectionItem[] = [
  { id: "home", label: "Home" },
  { id: "activities", label: "Activities" },
  { id: "projects", label: "Projects" },
  { id: "upcoming", label: "Upcoming" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Certificates" },
  { id: "about", label: "About" },
  { id: "quotes", label: "Quotes" },
  { id: "contact", label: "Contact" },
];

export default function SectionNavigator() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only show navigator once scrolled past initial hero peak
      setIsVisible(window.scrollY > 120);

      const scrollPosition = window.scrollY + 220;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNext = () => {
    if (currentIndex < SECTIONS.length - 1) {
      scrollToSection(SECTIONS[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToSection(SECTIONS[currentIndex - 1].id);
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Section navigation"
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-1.5 p-2 rounded-full bg-white/80 dark:bg-canvas-card-dark/80 backdrop-blur-md border border-surface-border shadow-md transition-all duration-300 animate-fade-in-up"
    >
      {/* Up Button */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentIndex <= 0}
        aria-label="Scroll to previous section"
        className="p-1 rounded-full text-charcoal-soft hover:text-accent disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer"
      >
        <ChevronUp className="w-3.5 h-3.5" />
      </button>

      {/* Dots */}
      <div className="flex flex-col gap-2 py-1">
        {SECTIONS.map((section, idx) => {
          const isActive = section.id === activeSection;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              aria-label={`Jump to ${section.label}`}
              className="group relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
            >
              {/* Tooltip */}
              <span className="absolute right-7 px-2.5 py-1 rounded-md bg-charcoal dark:bg-[#F3F2EE] text-white dark:text-[#111113] text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
                {section.label}
              </span>

              {/* Indicator Dot */}
              <span
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-2 h-5 bg-accent rounded-full"
                    : "w-2 h-2 bg-charcoal-soft/40 hover:bg-charcoal group-hover:scale-125"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Down Button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentIndex >= SECTIONS.length - 1}
        aria-label="Scroll to next section"
        className="p-1 rounded-full text-charcoal-soft hover:text-accent disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer"
      >
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
}
