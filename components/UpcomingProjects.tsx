import React from "react";
import { upcomingProjectsData } from "@/data/projects";
import SafeImage from "./SafeImage";
import InfiniteMarquee from "./InfiniteMarquee";
import ScrollReveal from "./ScrollReveal";
import { AlertCircle, Clock } from "lucide-react";

export default function UpcomingProjects() {
  return (
    <section id="upcoming" className="py-14 md:py-20 border-t border-surface-border">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12">
        {/* Header */}
        <ScrollReveal className="flex flex-col items-start space-y-2 mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 font-mono text-[11px] font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>Upcoming Concepts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-charcoal">
            Upcoming Projects
          </h2>
          <p className="text-sm sm:text-base text-charcoal-soft max-w-2xl font-sans">
            Early-stage design prototypes and concept iterations currently in active exploration.
          </p>
        </ScrollReveal>

        {/* Cards Grid */}
        <ScrollReveal delay={120} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {upcomingProjectsData.map((project, idx) => (
            <div
              key={project.slug}
              className="bg-white dark:bg-canvas-card-dark rounded-2xl border border-surface-border p-6 sm:p-8 shadow-2xs hover:border-accent-border hover:shadow-md transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div className="space-y-4">
                {/* Status & Category */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-canvas-subtle border border-surface-border text-charcoal-muted">
                    {project.category}
                  </span>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                    {project.status}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-semibold text-charcoal tracking-tight group-hover:text-accent transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-sans">
                  {project.description}
                </p>

                {project.disclaimer && (
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 leading-normal font-sans">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>{project.disclaimer}</span>
                  </div>
                )}

                {/* Pure Visual Continuous Showcase (Images ordered 01, 02, 03... NO text underneath) */}
                <div className="pt-2 w-full overflow-hidden rounded-xl">
                  <InfiniteMarquee
                    direction={idx % 2 === 0 ? "left" : "right"}
                    speed="normal"
                    durationSeconds={18}
                    pauseOnHover={true}
                    gapClass="gap-3 pr-3"
                  >
                    {project.images.map((imgSrc, imgIdx) => (
                      <div
                        key={`${imgSrc}-${imgIdx}`}
                        className="w-[220px] sm:w-[260px] shrink-0 aspect-[16/10] overflow-hidden rounded-xl bg-canvas-subtle border border-surface-border"
                      >
                        <SafeImage
                          src={imgSrc}
                          alt={`${project.title} prototype preview ${imgIdx + 1}`}
                          fallbackTitle={`${project.title} #${imgIdx + 1}`}
                          fallbackSubtitle="In Development"
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                          aspectRatioClass="aspect-[16/10]"
                        />
                      </div>
                    ))}
                  </InfiniteMarquee>
                </div>
              </div>

              {/* Technologies */}
              <div className="mt-6 pt-4 border-t border-surface-border/60 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono text-charcoal-soft bg-canvas-subtle px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
