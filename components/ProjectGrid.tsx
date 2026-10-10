"use client";

import React, { useState } from "react";
import { projectsData } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import SpotlightProjectCard from "./SpotlightProjectCard";
import ScrollReveal from "./ScrollReveal";
import { FolderGit2 } from "lucide-react";

export default function ProjectGrid() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filterTabs = [
    { id: "all", label: `All (${projectsData.length})` },
    { id: "ai-ml", label: "AI & Machine Learning" },
    { id: "ui-ux", label: "UI/UX & Design" },
    { id: "web-proto", label: "Prototypes & Web" },
  ];

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === "all") return true;

    if (activeFilter === "ai-ml") {
      // Machine Learning, Deep Learning, NLP, Bioinformatics, AI
      return (
        p.category.toLowerCase().includes("machine learning") ||
        p.category.toLowerCase().includes("natural language") ||
        p.category.toLowerCase().includes("computational biology") ||
        p.category.toLowerCase().includes("computer vision") ||
        p.category.toLowerCase().includes("ai") ||
        p.technologies.some((t) =>
          ["Machine Learning", "NLP", "Computer Vision", "Deep Learning", "Computational Biology", "Optimization Algorithms"].includes(t)
        )
      );
    }

    if (activeFilter === "ui-ux") {
      // UI/UX, Design, Figma, Human Computer Interaction
      return (
        p.slug === "travel-app" ||
        p.slug === "finpro" ||
        p.category.toLowerCase().includes("interaction") ||
        p.technologies.some((t) => ["Figma", "UI/UX Design", "HCI Principles", "Wireframing", "UI/UX"].includes(t))
      );
    }

    if (activeFilter === "web-proto") {
      // Web platforms, Software Engineering, Dashboards
      return (
        p.slug === "finpro" ||
        p.slug === "skinical" ||
        p.slug === "airsense-dashboard" ||
        p.slug === "platgizi" ||
        p.category.toLowerCase().includes("software") ||
        p.technologies.some((t) => ["Software Engineering", "Full-Stack Development", "Web Interface", "System Design"].includes(t))
      );
    }

    return true;
  });

  const spotlightProject = projectsData.find((p) => p.slug === "ecorouter-ai");
  const displayProjects =
    activeFilter === "all" && spotlightProject
      ? filteredProjects.filter((p) => p.slug !== "ecorouter-ai")
      : filteredProjects;

  return (
    <section id="projects" className="py-14 md:py-20 border-t border-surface-border">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
          <div className="flex flex-col items-start space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-subtle border border-surface-border text-charcoal-soft font-mono text-[11px]">
              <FolderGit2 className="w-3.5 h-3.5 text-accent dark:text-accent-dark" />
              <span>Selected Projects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-charcoal">
              Featured Case Studies
            </h2>
            <p className="text-sm sm:text-base text-charcoal-soft max-w-xl font-sans">
              Academic coursework builds, machine learning systems, and collaborative competition entries.
            </p>
          </div>

          {/* Filter Pills with dynamic counts and clear keyboard access */}
          <div className="flex flex-wrap gap-1 p-1 bg-canvas-card dark:bg-canvas-card-dark border border-surface-border rounded-xl shadow-2xs">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`text-xs font-mono px-3.5 py-1.5 rounded-lg transition-all duration-150 cursor-pointer ${
                  activeFilter === tab.id
                    ? "bg-charcoal dark:bg-charcoal-dark text-white dark:text-canvas-dark shadow-2xs font-semibold"
                    : "text-charcoal-soft hover:text-charcoal hover:bg-canvas-subtle"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* 1. Editorial Spotlight Feature (Active when viewing All) */}
        {activeFilter === "all" && spotlightProject && (
          <ScrollReveal delay={100} className="mb-8">
            <SpotlightProjectCard project={spotlightProject} />
          </ScrollReveal>
        )}

        {/* 2. Responsive Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
          {displayProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
