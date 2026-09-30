"use client";

import React from "react";
import { skillsData } from "@/data/skills";
import {
  Code,
  Terminal,
  Cpu,
  Layers,
  Database,
  Globe,
  PenTool,
  Mic,
  Users,
  Award,
  Search,
  MessageSquare,
  Handshake,
  Sparkles,
} from "lucide-react";

const SKILL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  C: Terminal,
  Python: Code,
  JavaScript: Globe,
  Java: Cpu,
  SQL: Database,
  HTML: Layers,
  Figma: PenTool,
  "Public Speaking": Mic,
  Teamwork: Users,
  Leadership: Award,
  "Independent Problem Solving": Search,
  Communication: MessageSquare,
  Collaboration: Handshake,
};

export default function Skills() {
  const [techCategory, softCategory] = skillsData;

  return (
    <section id="skills" className="py-12 md:py-16 border-t border-surface-border/60 dark:border-surface-border-dark/60">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-1.5 mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-subtle dark:bg-canvas-subtle-dark border border-surface-border dark:border-surface-border-dark text-charcoal-soft dark:text-charcoal-soft-dark text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-accent dark:text-accent-dark" />
            <span>Tools &amp; Strengths</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-charcoal dark:text-charcoal-dark">
            Skills &amp; Capabilities
          </h2>
          <p className="text-sm sm:text-base text-charcoal-soft dark:text-charcoal-soft-dark max-w-2xl">
            Technical languages and tools applied across academic coursework, paired with interpersonal strengths refined in campus leadership.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Category 1: Programming & Tools */}
          <div className="bg-white dark:bg-canvas-card-dark p-6 sm:p-8 rounded-2xl border border-surface-border dark:border-surface-border-dark shadow-2xs space-y-5 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-charcoal dark:text-charcoal-dark tracking-tight">
                  {techCategory.title}
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-accent-light dark:bg-accent-dark-light text-accent dark:text-accent-dark font-semibold">
                  Technical
                </span>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-soft dark:text-charcoal-soft-dark leading-relaxed">
                {techCategory.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {techCategory.items.map((skill) => {
                const Icon = SKILL_ICONS[skill.name] || Terminal;
                return (
                  <div
                    key={skill.name}
                    className="p-3.5 rounded-xl bg-canvas-subtle/80 dark:bg-canvas-subtle-dark/80 border border-surface-border dark:border-surface-border-dark hover:border-accent-border dark:hover:border-accent-dark hover:bg-white dark:hover:bg-canvas-card-dark hover:-translate-y-1 hover:shadow-2xs transition-all duration-200 group cursor-default"
                  >
                    <div className="flex items-center gap-2.5 mb-1">
                      <div className="w-7 h-7 rounded-lg bg-white dark:bg-canvas-card-dark border border-surface-border/70 dark:border-surface-border-dark flex items-center justify-center text-charcoal dark:text-charcoal-dark group-hover:text-accent dark:group-hover:text-accent-dark group-hover:scale-110 transition-all duration-200">
                        <Icon className="w-4 h-4 stroke-[1.8]" />
                      </div>
                      <span className="text-sm font-semibold text-charcoal dark:text-charcoal-dark group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
                        {skill.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-charcoal-soft dark:text-charcoal-soft-dark leading-normal pl-9">
                      {skill.context}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-surface-border/60 dark:border-surface-border-dark/60 text-[11px] text-charcoal-soft dark:text-charcoal-soft-dark font-mono">
              Coursework implementations • Lab projects • Academic builds
            </div>
          </div>

          {/* Category 2: Soft Skills */}
          <div className="bg-white dark:bg-canvas-card-dark p-6 sm:p-8 rounded-2xl border border-surface-border dark:border-surface-border-dark shadow-2xs space-y-5 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-charcoal dark:text-charcoal-dark tracking-tight">
                  {softCategory.title}
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-accent-light dark:bg-accent-dark-light text-accent dark:text-accent-dark font-semibold">
                  Interpersonal
                </span>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-soft dark:text-charcoal-soft-dark leading-relaxed">
                {softCategory.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {softCategory.items.map((skill) => {
                const Icon = SKILL_ICONS[skill.name] || Users;
                return (
                  <div
                    key={skill.name}
                    className="p-3.5 rounded-xl bg-canvas-subtle/80 dark:bg-canvas-subtle-dark/80 border border-surface-border dark:border-surface-border-dark hover:border-accent-border dark:hover:border-accent-dark hover:bg-white dark:hover:bg-canvas-card-dark hover:-translate-y-1 hover:shadow-2xs transition-all duration-200 group cursor-default"
                  >
                    <div className="flex items-center gap-2.5 mb-1">
                      <div className="w-7 h-7 rounded-lg bg-white dark:bg-canvas-card-dark border border-surface-border/70 dark:border-surface-border-dark flex items-center justify-center text-charcoal dark:text-charcoal-dark group-hover:text-accent dark:group-hover:text-accent-dark group-hover:scale-110 transition-all duration-200">
                        <Icon className="w-4 h-4 stroke-[1.8]" />
                      </div>
                      <span className="text-sm font-semibold text-charcoal dark:text-charcoal-dark group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
                        {skill.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-charcoal-soft dark:text-charcoal-soft-dark leading-normal pl-9">
                      {skill.context}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-surface-border/60 dark:border-surface-border-dark/60 text-[11px] text-charcoal-soft dark:text-charcoal-soft-dark font-mono">
              Stage moderation • Committee teamwork • Student mentorship
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
