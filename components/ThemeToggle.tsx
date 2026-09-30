"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme, isMounted } = useTheme();

  if (!isMounted) {
    return (
      <div className={`w-8 h-8 rounded-full border border-surface-border dark:border-surface-border-dark ${className}`} />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
      title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
      className={`relative p-2 rounded-full border border-surface-border dark:border-surface-border-dark bg-white/80 dark:bg-canvas-card-dark text-charcoal dark:text-charcoal-dark hover:border-accent dark:hover:border-accent-dark transition-all duration-200 shadow-2xs group cursor-pointer ${className}`}
    >
      <div className="relative w-4 h-4 overflow-hidden">
        <Sun
          className={`w-4 h-4 absolute inset-0 transition-transform duration-300 text-amber-500 ${
            isDark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <Moon
          className={`w-4 h-4 absolute inset-0 transition-transform duration-300 text-indigo-300 ${
            isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
    </button>
  );
}
