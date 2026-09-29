import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projectsData } from "@/data/projects";
import SafeImage from "@/components/SafeImage";
import ProjectGallery from "@/components/ProjectGallery";
import { ArrowLeft, ChevronRight, Sparkles, FolderGit2 } from "lucide-react";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Kristian Novan`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | Kristian Novan Portfolio`,
      description: project.shortDescription,
      images: [project.previewImage],
    },
  };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const currentIndex = projectsData.findIndex((p) => p.slug === params.slug);
  if (currentIndex === -1) {
    notFound();
  }

  const project = projectsData[currentIndex];
  const prevProject =
    currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  return (
    <article className="min-h-screen pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-4xl mx-auto px-6 md:px-8 space-y-12">
        {/* Top Back Navigation */}
        <div>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal-soft hover:text-accent group transition-colors px-3 py-1.5 rounded-lg hover:bg-canvas-subtle"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>← Back to Projects</span>
          </Link>
        </div>

        {/* Header Block */}
        <header className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-accent-light text-accent text-xs font-semibold">
              {project.category}
            </span>
            <span className="text-xs font-mono text-charcoal-soft">
              Case Study #{currentIndex + 1}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-charcoal leading-[1.15]">
            {project.title}
          </h1>

          {project.subtitle && (
            <p className="text-lg sm:text-xl font-serif italic text-accent">
              {project.subtitle}
            </p>
          )}

          {/* Tech Stack Badges */}
          <div className="pt-2 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-white border border-surface-border text-xs font-medium text-charcoal shadow-2xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Main Primary Hero Preview Image */}
        <div className="w-full overflow-hidden rounded-2xl border border-surface-border bg-white p-3 sm:p-4 shadow-2xs">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-canvas-subtle">
            <SafeImage
              src={project.previewImage}
              alt={`${project.title} primary display`}
              fallbackTitle={project.title}
              fallbackSubtitle="Primary Project Preview"
              className="w-full h-full object-cover"
              aspectRatioClass="aspect-[16/10]"
            />
          </div>
        </div>

        {/* Primary Narrative Section: Project Overview */}
        <section className="p-7 sm:p-10 rounded-3xl bg-white border border-surface-border shadow-2xs space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-surface-border/60">
            <FolderGit2 className="w-4 h-4 text-accent" />
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal-soft">
              Project Overview
            </h2>
          </div>

          <div className="space-y-4 text-charcoal-muted leading-relaxed text-base sm:text-lg">
            {project.overview.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Pure Visual Image Showcase Gallery (NO captions, continuous moving loop) */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              Visual Showcase
            </span>
            <span className="text-xs text-charcoal-soft font-mono">
              Hover to pause
            </span>
          </div>

          <ProjectGallery
            images={project.images}
            title={project.title}
            direction="left"
          />
        </section>

        {/* Bottom Navigation: Back to Projects + Next/Prev */}
        <div className="pt-8 border-t border-surface-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal hover:text-accent px-4 py-2.5 rounded-xl bg-white border border-surface-border shadow-2xs hover:border-accent-border transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to Projects</span>
          </Link>

          <div className="flex items-center gap-3">
            {prevProject && (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="text-xs text-charcoal-soft hover:text-charcoal px-3 py-2 rounded-xl border border-surface-border bg-white shadow-2xs hover:border-accent-border transition-colors"
              >
                Previous: {prevProject.title}
              </Link>
            )}
            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="text-xs text-charcoal-soft hover:text-charcoal px-3 py-2 rounded-xl border border-surface-border bg-white shadow-2xs hover:border-accent-border transition-colors flex items-center gap-1"
              >
                <span>Next: {nextProject.title}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
