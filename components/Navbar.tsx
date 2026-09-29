"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { personalData } from "@/data/personal";

const NAV_ITEMS = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Activities", href: "/#activities" },
  { label: "Projects", href: "/#projects" },
  { label: "Upcoming", href: "/#upcoming" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      if (pathname !== "/") return;

      const sections = ["home", "about", "activities", "projects", "upcoming", "skills", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF9F5]/90 backdrop-blur-md border-b border-surface-border shadow-xs py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-charcoal hover:text-accent transition-colors duration-200"
          aria-label="Kristian Novan — Home"
        >
          <div className="w-8 h-8 rounded-lg bg-charcoal text-canvas-card flex items-center justify-center font-serif text-sm font-semibold tracking-wider group-hover:bg-accent transition-colors duration-200">
            KN
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-charcoal group-hover:text-accent transition-colors">
              {personalData.name}
            </span>
            <span className="text-[10px] text-charcoal-soft font-mono">
              BINUS • {personalData.classYear}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/80 backdrop-blur-xs border border-surface-border/80 rounded-full px-4 py-1.5 shadow-2xs">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace("/#", "");
            const isActive = pathname === "/" && activeSection === sectionId;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-150 ${
                  isActive
                    ? "bg-charcoal text-white shadow-2xs"
                    : "text-charcoal-muted hover:text-charcoal hover:bg-canvas-subtle"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action: Direct Mail Contact */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`mailto:${personalData.contact.email}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-accent hover:bg-accent-hover px-4 py-2 rounded-full transition-colors duration-200 shadow-2xs"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          className="lg:hidden p-2 rounded-lg text-charcoal hover:bg-canvas-subtle transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-[#FAF9F5] border-b border-surface-border shadow-lg px-6 py-6 transition-all duration-300 animate-fade-in-up">
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-charcoal hover:text-accent hover:bg-canvas-subtle px-3 py-2.5 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-surface-border">
              <a
                href={`mailto:${personalData.contact.email}`}
                className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-white bg-accent hover:bg-accent-hover px-4 py-3 rounded-xl transition-colors"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
