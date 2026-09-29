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
  Workflow,
  Sparkles,
} from "lucide-react";

// Mapping icons to skill names
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
  Adaptability: Workflow,
};

export default function Skills() {
  const [techCategory, softCategory] = skillsData;

  return (
    <section id="skills" className="py-20 md:py-28 border-t border-surface-border/60">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-subtle border border-surface-border text-charcoal-soft text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Capabilities &amp; Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-charcoal">
            Skills &amp; Tools
          </h2>
          <p className="text-sm sm:text-base text-charcoal-soft max-w-2xl">
            A balanced overview of technical tools applied across coursework and interpersonal strengths honed in campus leadership.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Category 1: Programming Languages & Tools */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-surface-border shadow-2xs space-y-6 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-charcoal tracking-tight">
                  {techCategory.title}
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-accent-light text-accent font-medium">
                  Technical
                </span>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-soft leading-relaxed">
                {techCategory.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {techCategory.items.map((skill) => {
                const Icon = SKILL_ICONS[skill.name] || Terminal;
                return (
                  <div
                    key={skill.name}
                    className="p-3.5 rounded-xl bg-canvas-subtle/70 border border-surface-border/70 hover:border-accent-border hover:bg-white hover:shadow-2xs transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-2.5 mb-1">
                      <div className="w-7 h-7 rounded-lg bg-white border border-surface-border/60 flex items-center justify-center text-charcoal group-hover:text-accent group-hover:border-accent-border transition-colors">
                        <Icon className="w-4 h-4 stroke-[1.8]" />
                      </div>
                      <span className="text-sm font-semibold text-charcoal">
                        {skill.name}
                      </span>
                    </div>
                    {skill.description && (
                      <p className="text-[11px] text-charcoal-soft leading-normal pl-9">
                        {skill.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-surface-border/60 text-[11px] text-charcoal-soft/80">
              * Proficiencies reflected through academic coursework, laboratory implementations, and practical builds.
            </div>
          </div>

          {/* Category 2: Soft Skills */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-surface-border shadow-2xs space-y-6 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-charcoal tracking-tight">
                  {softCategory.title}
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-accent-light text-accent font-medium">
                  Interpersonal
                </span>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-soft leading-relaxed">
                {softCategory.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {softCategory.items.map((skill) => {
                const Icon = SKILL_ICONS[skill.name] || Users;
                return (
                  <div
                    key={skill.name}
                    className="p-3.5 rounded-xl bg-canvas-subtle/70 border border-surface-border/70 hover:border-accent-border hover:bg-white hover:shadow-2xs transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-2.5 mb-1">
                      <div className="w-7 h-7 rounded-lg bg-white border border-surface-border/60 flex items-center justify-center text-charcoal group-hover:text-accent group-hover:border-accent-border transition-colors">
                        <Icon className="w-4 h-4 stroke-[1.8]" />
                      </div>
                      <span className="text-sm font-semibold text-charcoal">
                        {skill.name}
                      </span>
                    </div>
                    {skill.description && (
                      <p className="text-[11px] text-charcoal-soft leading-normal pl-9">
                        {skill.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-surface-border/60 text-[11px] text-charcoal-soft/80">
              * Developed through stage moderation, committee leadership, peer mentoring, and team collaboration.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
