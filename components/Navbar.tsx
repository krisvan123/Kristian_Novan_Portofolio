"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, GraduationCap, ChevronDown } from "lucide-react";
import { personalData } from "@/data/personal";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { label: "Home", href: "/#home" },
  { label: "Activities", href: "/#activities" },
  { label: "Projects", href: "/#projects" },
  { label: "Upcoming", href: "/#upcoming" },
  { label: "Skills", href: "/#skills" },
  { label: "Certificates", href: "/#certificates" },
  { label: "About", href: "/#about" },
  { label: "Quotes", href: "/#quotes" },
  { label: "Contact", href: "/#contact" },
  { label: "Play", href: "/play" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showAcademicDropdown, setShowAcademicDropdown] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (pathname !== "/") return;

      const sections = [
        "home",
        "activities",
        "projects",
        "upcoming",
        "skills",
        "certificates",
        "about",
        "quotes",
        "contact",
      ];
      const scrollPosition = window.scrollY + 180;

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
      if (window.innerWidth >= 1024) {
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
          ? "bg-[#FAF8F5]/90 dark:bg-[#111113]/90 backdrop-blur-md border-b border-surface-border shadow-xs py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand & Compact Academic Overview Pill */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-charcoal hover:text-accent transition-colors duration-200"
            aria-label="Kristian Novan — Home"
          >
            <div className="w-8 h-8 rounded-lg bg-charcoal dark:bg-canvas-card-dark text-white border border-transparent dark:border-surface-border flex items-center justify-center font-display text-xs font-semibold tracking-wider group-hover:bg-accent transition-colors duration-200 shadow-2xs">
              KN
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-display font-semibold tracking-tight text-charcoal group-hover:text-accent transition-colors">
                {personalData.name}
              </span>
              <span className="text-[10px] text-charcoal-soft font-mono">
                {personalData.academic.program} • {personalData.academic.cohort}
              </span>
            </div>
          </Link>

          {/* Academic Overview Quick Dropdown (Desktop) */}
          <div
            className="relative hidden xl:block"
            onMouseEnter={() => setShowAcademicDropdown(true)}
            onMouseLeave={() => setShowAcademicDropdown(false)}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-light dark:bg-accent-soft border border-accent-border/60 text-[11px] font-mono text-accent dark:text-accent-dark hover:border-accent transition-all cursor-pointer"
              aria-label="Academic Overview"
            >
              <GraduationCap className="w-3 h-3" />
              <span>SOCS • AI ({personalData.academic.studyPeriod})</span>
              <ChevronDown className="w-2.5 h-2.5 opacity-70" />
            </button>

            {/* Hover Popover */}
            {showAcademicDropdown && (
              <div className="absolute left-0 top-full mt-2 w-72 p-4 rounded-xl bg-white dark:bg-[#18181C] border border-surface-border shadow-xl text-left z-50 animate-fade-in-up">
                <div className="text-[10px] font-mono uppercase tracking-wider text-accent dark:text-accent-dark font-semibold mb-2">
                  Academic Overview
                </div>
                <div className="space-y-2 text-xs divide-y divide-surface-border/50">
                  <div className="pt-0.5">
                    <span className="text-charcoal-soft block text-[10px] font-mono">
                      School
                    </span>
                    <span className="font-semibold text-charcoal font-display">
                      {personalData.academic.school}
                    </span>
                  </div>
                  <div className="pt-1.5">
                    <span className="text-charcoal-soft block text-[10px] font-mono">
                      Program &amp; Cohort
                    </span>
                    <span className="font-semibold text-charcoal font-display">
                      {personalData.academic.program} • {personalData.academic.cohort}
                    </span>
                  </div>
                  <div className="pt-1.5">
                    <span className="text-charcoal-soft block text-[10px] font-mono">
                      University
                    </span>
                    <span className="font-semibold text-charcoal font-display">
                      {personalData.academic.university}
                    </span>
                  </div>
                  <div className="pt-1.5">
                    <span className="text-charcoal-soft block text-[10px] font-mono">
                      Specialization
                    </span>
                    <span className="font-semibold text-accent dark:text-accent-dark font-display">
                      {personalData.academic.specialization}
                    </span>
                    <span className="text-[10px] text-charcoal-soft block">
                      Study period: {personalData.academic.studyPeriod}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/80 dark:bg-canvas-card-dark/80 backdrop-blur-xs border border-surface-border rounded-full px-3 py-1 shadow-2xs">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace("/#", "");
            const isActive = pathname === "/" && activeSection === sectionId;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-xs font-medium px-2.5 py-1.5 rounded-full transition-all duration-150 ${
                  isActive
                    ? "bg-charcoal dark:bg-[#F3F2EE] text-white dark:text-[#111113] shadow-2xs font-semibold"
                    : "text-charcoal-muted hover:text-charcoal hover:bg-canvas-subtle"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle + Contact CTA */}
        <div className="hidden lg:flex items-center gap-2.5">
          <ThemeToggle />
          <a
            href={`mailto:${personalData.contact.email}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-accent hover:bg-accent-hover px-3.5 py-2 rounded-full transition-colors duration-200 shadow-2xs"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Actions: ThemeToggle + Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="p-2 rounded-lg text-charcoal hover:bg-canvas-subtle transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[56px] bg-[#FAF8F5] dark:bg-[#111113] border-b border-surface-border shadow-xl px-6 py-6 transition-all duration-300 animate-fade-in-up max-h-[calc(100vh-56px)] overflow-y-auto">
          {/* Mobile Academic Overview Card */}
          <div className="mb-4 p-4 rounded-xl bg-canvas-subtle border border-surface-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-accent dark:text-accent-dark font-semibold block mb-1">
              Academic Overview
            </span>
            <div className="text-xs space-y-1">
              <div className="font-semibold text-charcoal font-display">
                {personalData.academic.school}
              </div>
              <div className="text-charcoal-muted">
                {personalData.academic.program} • {personalData.academic.cohort} • {personalData.academic.university}
              </div>
              <div className="text-accent dark:text-accent-dark font-medium pt-0.5">
                Specialization: {personalData.academic.specialization} ({personalData.academic.studyPeriod})
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-charcoal hover:text-accent hover:bg-canvas-subtle px-3 py-2 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-surface-border">
              <a
                href={`mailto:${personalData.contact.email}`}
                className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-white bg-accent hover:bg-accent-hover px-4 py-2.5 rounded-xl transition-colors"
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
