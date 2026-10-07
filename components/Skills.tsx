"use client";

import React from "react";
import { hardSkillsData, softSkillsData } from "@/data/skills";
import ScrollReveal from "./ScrollReveal";
import {
  Code2,
  Terminal,
  Cpu,
  Database,
  Globe,
  PenTool,
  Layout,
  Layers,
  Sparkles,
  Mic,
  Users,
  Award,
  MessageSquare,
  Handshake,
  Search,
  Compass,
  Presentation,
  GraduationCap,
  Calendar,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

const HARD_CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "Programming Languages": Terminal,
  "AI / Machine Learning": Cpu,
  "Design / Product": PenTool,
  "Web / Development": Globe,
};

const SOFT_SKILL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "Public Speaking": Mic,
  Teamwork: Users,
  Leadership: Award,
  Communication: MessageSquare,
  Collaboration: Handshake,
  "Independent Problem Solving": Search,
  Adaptability: Compass,
  Presentation: Presentation,
  Mentoring: GraduationCap,
  "Event Coordination": Calendar,
  "Creative Thinking": Lightbulb,
  Responsibility: CheckCircle2,
};

export default function Skills() {
  return (
    <section id="skills" className="py-14 md:py-20 border-t border-surface-border">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12 space-y-14 md:space-y-16">
        {/* ================= HARD SKILLS SECTION ================= */}
        <div>
          <ScrollReveal className="flex flex-col items-start space-y-2 mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-subtle border border-surface-border text-charcoal-soft font-mono text-[11px]">
              <Terminal className="w-3.5 h-3.5 text-accent dark:text-accent-dark" />
              <span>Technical Competencies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-charcoal">
              Hard Skills
            </h2>
            <p className="text-sm sm:text-base text-charcoal-soft max-w-2xl font-sans">
              Technologies and methodologies applied across academic coursework, research papers, and software prototypes.
            </p>
          </ScrollReveal>

          {/* Hard Skills 4 Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {hardSkillsData.map((category, catIdx) => {
              const CategoryIcon =
                HARD_CATEGORY_ICONS[category.title] || Code2;
              return (
                <ScrollReveal
                  key={category.title}
                  delay={catIdx * 80}
                  className="bg-white dark:bg-canvas-card-dark p-6 sm:p-7 rounded-2xl border border-surface-border shadow-2xs hover:border-accent-border transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-surface-border/60">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-accent-light dark:bg-accent-soft text-accent dark:text-accent-dark flex items-center justify-center">
                          <CategoryIcon className="w-4 h-4 stroke-[1.9]" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-display font-semibold text-charcoal tracking-tight">
                          {category.title}
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono text-charcoal-soft">
                        {category.skills.length} skills
                      </span>
                    </div>

                    {/* Skill Items List */}
                    <div className="space-y-2.5 pt-1">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="p-2.5 sm:p-3 rounded-xl bg-canvas-subtle/70 border border-surface-border/60 hover:bg-white dark:hover:bg-canvas-card-dark hover:border-accent-border/70 hover:translate-x-1 transition-all duration-200 group flex items-start justify-between gap-3"
                        >
                          <div>
                            <span className="text-xs sm:text-sm font-semibold text-charcoal group-hover:text-accent transition-colors font-display block">
                              {skill.name}
                            </span>
                            {skill.description && (
                              <p className="text-[11px] text-charcoal-soft font-sans leading-relaxed mt-0.5">
                                {skill.description}
                              </p>
                            )}
                          </div>
                          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-accent/60 mt-2 group-hover:bg-accent group-hover:scale-125 transition-all" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-surface-border/60 text-[10px] font-mono text-charcoal-soft/70">
                    Coursework implementations • Lab evaluations • Project builds
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* ================= SOFT SKILLS SECTION ================= */}
        <div className="pt-6 border-t border-surface-border/60">
          <ScrollReveal className="flex flex-col items-start space-y-2 mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-light dark:bg-accent-soft text-accent dark:text-accent-dark text-[11px] font-mono font-medium border border-accent-border/60">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interpersonal Disciplines</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-charcoal">
              Soft Skills
            </h2>
            <p className="text-sm sm:text-base text-charcoal-soft max-w-2xl font-sans">
              Interpersonal disciplines developed through stage moderation, student organization mentorship, and cross-functional team projects.
            </p>
          </ScrollReveal>

          {/* Tasteful Soft Skills Grid */}
          <ScrollReveal delay={100} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {softSkillsData.map((skill) => {
              const Icon = SOFT_SKILL_ICONS[skill.name] || Users;
              return (
                <div
                  key={skill.name}
                  className="p-4 sm:p-5 rounded-xl bg-white dark:bg-canvas-card-dark border border-surface-border shadow-2xs hover:border-accent-border hover:-translate-y-1 hover:shadow-xs transition-all duration-200 group flex items-start gap-3.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-canvas-subtle border border-surface-border/70 flex items-center justify-center text-charcoal group-hover:text-accent group-hover:scale-105 transition-all shrink-0">
                    <Icon className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-display font-semibold text-charcoal group-hover:text-accent transition-colors">
                      {skill.name}
                    </h4>
                    <p className="text-xs text-charcoal-soft leading-relaxed font-sans">
                      {skill.context}
                    </p>
                  </div>
                </div>
              );
            })}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
