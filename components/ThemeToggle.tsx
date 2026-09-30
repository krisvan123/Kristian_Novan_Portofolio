"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme, isMounted } = useTheme();

  if (!isMounted) {
    return (
      <div
        className={`w-9 h-9 rounded-xl border border-surface-border dark:border-surface-border-dark ${className}`}
      />
    );
  }

  const isDark = theme === "dark";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleTheme(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleTheme();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={isDark ? "Switch to daylight mode" : "Switch to starry night mode"}
      title={isDark ? "Switch to daylight mode" : "Switch to starry night mode"}
      className={`group relative flex items-center justify-center w-9 h-9 rounded-xl border border-surface-border dark:border-surface-border-dark bg-white dark:bg-canvas-card-dark text-charcoal dark:text-charcoal-dark hover:border-accent dark:hover:border-accent-dark hover:bg-canvas-subtle dark:hover:bg-canvas-subtle-dark active:scale-95 transition-all duration-200 shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
    >
      <div className="relative w-4 h-4 overflow-hidden pointer-events-none">
        {/* Sun Icon */}
        <Sun
          className={`w-4 h-4 absolute inset-0 text-amber-600 dark:text-amber-400 transition-all duration-400 ease-out ${
            isDark
              ? "-rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100 group-hover:rotate-45"
          }`}
          strokeWidth={1.9}
        />
        {/* Moon Icon */}
        <Moon
          className={`w-4 h-4 absolute inset-0 text-indigo-300 dark:text-emerald-300 transition-all duration-400 ease-out ${
            isDark
              ? "rotate-0 scale-100 opacity-100 group-hover:-rotate-12"
              : "rotate-90 scale-0 opacity-0"
          }`}
          strokeWidth={1.9}
        />
      </div>

      {/* Subtle indicator dot */}
      <span
        className={`absolute -bottom-0.5 w-1 h-1 rounded-full transition-colors duration-300 ${
          isDark ? "bg-accent-dark" : "bg-accent"
        }`}
      />
    </button>
  );
}
