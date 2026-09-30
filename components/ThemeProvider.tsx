"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e?: React.MouseEvent) => void;
  isMounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  isMounted: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem("kn-theme") as Theme | null;
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
      if (stored === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = useCallback(
    (e?: React.MouseEvent) => {
      const nextTheme: Theme = theme === "light" ? "dark" : "light";

      const applyTheme = () => {
        setTheme(nextTheme);
        localStorage.setItem("kn-theme", nextTheme);
        if (nextTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      };

      // Check if browser supports View Transitions API and reduced motion is false
      const doc = document as any;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!prefersReducedMotion && doc.startViewTransition) {
        const x = e ? e.clientX : window.innerWidth / 2;
        const y = e ? e.clientY : 40;
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );

        const transition = doc.startViewTransition(() => {
          applyTheme();
        });

        transition.ready.then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 520,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        });
      } else {
        // Fallback smooth transition
        document.documentElement.classList.add("theme-transitioning");
        applyTheme();
        setTimeout(() => {
          document.documentElement.classList.remove("theme-transitioning");
        }, 520);
      }
    },
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isMounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
