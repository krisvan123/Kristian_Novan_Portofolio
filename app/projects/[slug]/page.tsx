import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projectsData } from "@/data/projects";
import SafeImage from "@/components/SafeImage";
import ProjectGallery from "@/components/ProjectGallery";
import {
  ArrowLeft,
  Calendar,
  Layers,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Edit3,
  CheckCircle,
} from "lucide-react";

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
            className="inline-flex items-center gap-2 text-xs font-medium text-charcoal-soft hover:text-accent group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>← Back to Projects</span>
          </Link>
        </div>

        {/* Header Block */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-accent-light text-accent text-xs font-semibold">
              {project.category}
            </span>
            <span className="text-xs font-mono text-charcoal-soft">
              Case Study #{currentIndex + 1}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-charcoal leading-[1.15]">
            {project.title}
          </h1>

          {project.subtitle && (
            <p className="text-lg sm:text-xl font-serif italic text-accent">
              {project.subtitle}
            </p>
          )}

          <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed pt-2">
            {project.shortDescription}
          </p>

          {/* Tech Stack Pills */}
          <div className="pt-2 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-canvas-subtle border border-surface-border text-xs font-medium text-charcoal"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Main Hero Preview Image */}
        <div className="w-full overflow-hidden rounded-2xl border border-surface-border bg-white p-3 shadow-xs">
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

        {/* Detailed Sections List */}
        <div className="space-y-8 pt-4">
          {project.sections.map((section, idx) => (
            <section
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-surface-border shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-semibold text-charcoal tracking-tight">
                  {section.title}
                </h2>
                {section.isPlaceholder && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded font-mono">
                    <Edit3 className="w-3 h-3" />
                    <span>Editable Field</span>
                  </span>
                )}
              </div>

              {Array.isArray(section.content) ? (
                <ul className="space-y-2 pt-1">
                  {section.content.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="flex items-start gap-2.5 text-sm sm:text-base text-charcoal-muted"
                    >
                      <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p
                  className={`text-sm sm:text-base leading-relaxed ${
                    section.isPlaceholder
                      ? "text-charcoal-soft italic font-mono bg-canvas-subtle/80 p-3 rounded-lg border border-dashed border-surface-border-hover"
                      : "text-charcoal-muted"
                  }`}
                >
                  {section.content}
                </p>
              )}
            </section>
          ))}
        </div>

        {/* Multi-Image Display / Gallery */}
        {project.hasContinuousGallery ? (
          /* Special Requirement for Travel App: Smooth Continuous Gallery at bottom */
          <div className="pt-6 space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                Visual Showcase
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal">
                Interface &amp; Journey Gallery
              </h2>
            </div>
            <ProjectGallery
              images={project.images}
              title={project.title}
              caption={project.galleryCaption}
              direction="right"
            />
          </div>
        ) : (
          /* For other projects with multiple images (e.g., ProMod AI) */
          project.images.length > 1 && (
            <div className="pt-6 space-y-4">
              <div className="flex flex-col space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Project Gallery
                </span>
                <h2 className="text-xl sm:text-2xl font-semibold text-charcoal">
                  Additional Views &amp; Diagrams
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.images.map((img, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white rounded-xl border border-surface-border shadow-2xs space-y-2"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-canvas-subtle">
                      <SafeImage
                        src={img}
                        alt={`${project.title} figure ${i + 1}`}
                        fallbackTitle={`${project.title} — Figure ${i + 1}`}
                        fallbackSubtitle="Replace in /public/images/projects"
                        className="w-full h-full object-cover"
                        aspectRatioClass="aspect-[16/10]"
                      />
                    </div>
                    <p className="text-xs text-charcoal-soft text-center font-mono">
                      Figure {i + 1}: {img.split("/").pop()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )
        )}

        {/* Bottom Navigation: Back to Projects + Next/Prev Project */}
        <div className="pt-8 border-t border-surface-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-medium text-charcoal hover:text-accent px-4 py-2 rounded-xl bg-white border border-surface-border shadow-2xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to Projects</span>
          </Link>

          <div className="flex items-center gap-3">
            {prevProject && (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="text-xs text-charcoal-soft hover:text-charcoal px-3 py-1.5 rounded-lg border border-surface-border bg-white"
              >
                Previous: {prevProject.title}
              </Link>
            )}
            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="text-xs text-charcoal-soft hover:text-charcoal px-3 py-1.5 rounded-lg border border-surface-border bg-white flex items-center gap-1"
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
