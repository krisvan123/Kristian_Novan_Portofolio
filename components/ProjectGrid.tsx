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
    <section id="projects" className="py-20 md:py-28 border-t border-surface-border/60">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col items-start space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-subtle border border-surface-border text-charcoal-soft text-xs font-medium">
              <FolderGit2 className="w-3.5 h-3.5 text-accent" />
              <span>Portfolio Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-charcoal">
              Selected Projects
            </h2>
            <p className="text-sm sm:text-base text-charcoal-soft max-w-xl">
              A collection of academic, technical, and collaborative projects I have worked on.
            </p>
          </div>

          {/* Optional Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-white border border-surface-border rounded-xl shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-150 ${
                  filter === cat
                    ? "bg-charcoal text-white shadow-2xs"
                    : "text-charcoal-soft hover:text-charcoal hover:bg-canvas-subtle"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
