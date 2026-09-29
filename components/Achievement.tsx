"use client";

import React from "react";
import { personalData } from "@/data/personal";
import SafeImage from "./SafeImage";
import { Award, FileText, CheckCircle2 } from "lucide-react";

export default function Achievement() {
  const { achievement } = personalData;

  return (
    <section id="achievements" className="py-16 md:py-20 border-t border-surface-border/60">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 lg:p-12 shadow-2xs relative overflow-hidden group hover:border-accent-border transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Achievement Info */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-light border border-accent-border/60 text-accent text-xs font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>{achievement.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-charcoal">
                {achievement.title}
              </h2>

              <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
                {achievement.description}
              </p>

              <div className="pt-2 flex items-center gap-3 text-xs text-charcoal-soft font-mono">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>Author Status Completed</span>
                </div>
                <span>•</span>
                <span>{achievement.event}</span>
              </div>
            </div>

            {/* Right: Certificate Image Showcase */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-lg rounded-2xl border border-surface-border/80 bg-canvas-subtle p-2.5 shadow-2xs group-hover:shadow-md group-hover:border-accent-border/70 transition-all duration-300">
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl bg-white">
                  <SafeImage
                    src={achievement.certificateImage}
                    alt={`${achievement.title} Certificate`}
                    fallbackTitle="ICORIS 2026 Certificate"
                    fallbackSubtitle="Author Certificate (/public/images/certificates/icoris-2026-author.jpg)"
                    className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-102"
                    aspectRatioClass="aspect-[16/11]"
                  />
                </div>
                <div className="mt-2.5 px-1.5 flex items-center justify-between text-[11px] text-charcoal-soft font-mono">
                  <span>Author Certificate</span>
                  <span>{achievement.event}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
