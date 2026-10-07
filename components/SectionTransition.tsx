"use client";

import React, { useEffect, useRef, useState } from "react";

interface SectionTransitionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export default function SectionTransition({
  children,
  id,
  className = "",
}: SectionTransitionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [direction, setDirection] = useState<"down" | "up">("down");
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsInView(true);
      return;
    }

    const handleScrollDirection = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setDirection("down");
      } else if (currentScrollY < lastScrollY.current) {
        setDirection("up");
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScrollDirection, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle view state to allow re-entering smoothly when scrolling back up
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          // If scrolled significantly past, mark out of view so it reveals again on reverse scroll
          if (entry.boundingClientRect.top > window.innerHeight) {
            setIsInView(false);
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      window.removeEventListener("scroll", handleScrollDirection);
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  // When scrolling DOWN: next section comes upward (translateY positive to 0)
  // When scrolling UP: section returns naturally
  const transformClass = isInView
    ? "opacity-100 translate-y-0 scale-100"
    : direction === "down"
    ? "opacity-0 translate-y-12 scale-[0.99]"
    : "opacity-0 -translate-y-8 scale-[0.99]";

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`scroll-mt-20 scroll-snap-section transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 will-change-[transform,opacity] ${transformClass} ${className}`}
    >
      {children}
    </div>
  );
}
