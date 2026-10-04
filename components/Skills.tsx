import React from "react";
import { skillsData } from "@/data/skills";
import ScrollReveal from "./ScrollReveal";
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
    <section id="skills" className="py-14 md:py-20 border-t border-surface-border">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col items-start space-y-2 mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-subtle border border-surface-border text-charcoal-soft font-mono text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-accent dark:text-accent-dark" />
            <span>Tools &amp; Strengths</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-charcoal">
            Skills &amp; Capabilities
          </h2>
          <p className="text-sm sm:text-base text-charcoal-soft max-w-2xl font-sans">
            Technical languages and tools applied across academic coursework, paired with interpersonal strengths refined in campus leadership.
          </p>
        </ScrollReveal>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Category 1: Programming & Tools */}
          <ScrollReveal delay={100} className="bg-white dark:bg-canvas-card-dark p-6 sm:p-8 rounded-2xl border border-surface-border shadow-2xs space-y-6 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-display font-semibold text-charcoal tracking-tight">
                  {techCategory.title}
                </h3>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-accent-light dark:bg-accent-soft text-accent dark:text-accent-dark font-medium border border-accent-border/60">
                  Technical
                </span>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-soft leading-relaxed font-sans">
                {techCategory.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {techCategory.items.map((skill) => {
                const Icon = SKILL_ICONS[skill.name] || Terminal;
                return (
                  <div
                    key={skill.name}
                    className="p-3.5 rounded-xl bg-canvas-subtle/80 border border-surface-border hover:border-accent-border hover:bg-white dark:hover:bg-canvas-card-dark hover:-translate-y-1 hover:shadow-2xs transition-all duration-200 group cursor-default"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="w-7 h-7 rounded-lg bg-white dark:bg-canvas-subtle border border-surface-border/70 flex items-center justify-center text-charcoal group-hover:text-accent group-hover:scale-110 transition-all duration-200">
                        <Icon className="w-4 h-4 stroke-[1.8]" />
                      </div>
                      <span className="text-sm font-display font-semibold text-charcoal group-hover:text-accent transition-colors">
                        {skill.name}
                      </span>
                    </div>
                    <p className="text-[11px] font-sans text-charcoal-soft leading-normal pl-9">
                      {skill.context}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-surface-border/60 text-[11px] text-charcoal-soft font-mono">
              Coursework implementations • Lab projects • Academic builds
            </div>
          </ScrollReveal>

          {/* Category 2: Soft Skills */}
          <ScrollReveal delay={160} className="bg-white dark:bg-canvas-card-dark p-6 sm:p-8 rounded-2xl border border-surface-border shadow-2xs space-y-6 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-display font-semibold text-charcoal tracking-tight">
                  {softCategory.title}
                </h3>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-accent-light dark:bg-accent-soft text-accent dark:text-accent-dark font-medium border border-accent-border/60">
                  Interpersonal
                </span>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-soft leading-relaxed font-sans">
                {softCategory.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {softCategory.items.map((skill) => {
                const Icon = SKILL_ICONS[skill.name] || Users;
                return (
                  <div
                    key={skill.name}
                    className="p-3.5 rounded-xl bg-canvas-subtle/80 border border-surface-border hover:border-accent-border hover:bg-white dark:hover:bg-canvas-card-dark hover:-translate-y-1 hover:shadow-2xs transition-all duration-200 group cursor-default"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="w-7 h-7 rounded-lg bg-white dark:bg-canvas-subtle border border-surface-border/70 flex items-center justify-center text-charcoal group-hover:text-accent group-hover:scale-110 transition-all duration-200">
                        <Icon className="w-4 h-4 stroke-[1.8]" />
                      </div>
                      <span className="text-sm font-display font-semibold text-charcoal group-hover:text-accent transition-colors">
                        {skill.name}
                      </span>
                    </div>
                    <p className="text-[11px] font-sans text-charcoal-soft leading-normal pl-9">
                      {skill.context}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-surface-border/60 text-[11px] text-charcoal-soft font-mono">
              Stage moderation • Committee teamwork • Student mentorship
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
