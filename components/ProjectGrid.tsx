"use client";

import React, { useState } from "react";
import { projectsData } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { FolderGit2 } from "lucide-react";

export default function ProjectGrid() {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Machine Learning", "NLP / Bio", "Software & HCI", "Competition"];

  const filteredProjects = projectsData.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Machine Learning") {
      return p.category.includes("Machine Learning") || p.category.includes("Computer Vision");
    }
    if (filter === "NLP / Bio") {
      return p.category.includes("NLP") || p.category.includes("Computational Biology");
    }
    if (filter === "Software & HCI") {
      return p.category.includes("Software") || p.category.includes("Interaction");
    }
    if (filter === "Competition") {
      return p.category.includes("Competition");
    }
    return true;
  });

  return (
    <section id="projects" className="py-12 md:py-16 border-t border-surface-border/60 dark:border-surface-border-dark/60">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 md:mb-10">
          <div className="flex flex-col items-start space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-subtle dark:bg-canvas-subtle-dark border border-surface-border dark:border-surface-border-dark text-charcoal-soft dark:text-charcoal-soft-dark text-xs font-semibold">
              <FolderGit2 className="w-3.5 h-3.5 text-accent dark:text-accent-dark" />
              <span>Selected Projects</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-charcoal dark:text-charcoal-dark">
              Featured Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-soft dark:text-charcoal-soft-dark max-w-xl">
              Academic coursework builds, machine learning systems, and collaborative competition entries.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1 p-1 bg-white dark:bg-canvas-card-dark border border-surface-border dark:border-surface-border-dark rounded-xl shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-150 ${
                  filter === cat
                    ? "bg-charcoal dark:bg-white text-white dark:text-charcoal shadow-2xs font-semibold"
                    : "text-charcoal-soft dark:text-charcoal-soft-dark hover:text-charcoal dark:hover:text-white hover:bg-canvas-subtle dark:hover:bg-canvas-subtle-dark"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
