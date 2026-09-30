"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Award, ExternalLink, Maximize2, ShieldCheck, Sparkles } from "lucide-react";
import { certificatesData, CertificateItem } from "@/data/certificates";
import CertificateLightbox from "./CertificateLightbox";

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <section id="certificates" className="py-12 md:py-16 border-t border-surface-border/60 dark:border-surface-border-dark/60">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-1.5 mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-light dark:bg-accent-dark-light text-accent dark:text-accent-dark text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-charcoal dark:text-charcoal-dark">
            Certifications &amp; Achievements
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-soft dark:text-charcoal-soft-dark max-w-2xl">
            Verified credentials spanning international research publication, cloud AI certifications, UI/UX competitions, and leadership service.
          </p>
        </div>

        {/* 6 Certificate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {certificatesData.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedCert(cert);
                }
              }}
              className="group text-left bg-white dark:bg-canvas-card-dark rounded-2xl border border-surface-border dark:border-surface-border-dark overflow-hidden shadow-2xs hover:border-accent-border dark:hover:border-accent-dark hover:-translate-y-1 hover:shadow-sm transition-all duration-300 flex flex-col justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {/* Thumbnail with overlay hint */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-canvas-subtle dark:bg-canvas-subtle-dark border-b border-surface-border/60 dark:border-surface-border-dark/60">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-xs text-white text-[11px] font-mono flex items-center gap-1.5 shadow-md">
                    <Maximize2 className="w-3 h-3" />
                    <span>View Certificate</span>
                  </span>
                </div>

                {cert.highlight && (
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-accent dark:bg-accent-dark text-white text-[10px] font-semibold tracking-wide uppercase shadow-2xs flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <span className="inline-block text-[11px] font-mono font-medium text-accent dark:text-accent-dark uppercase tracking-wider">
                    {cert.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-semibold text-charcoal dark:text-charcoal-dark group-hover:text-accent dark:group-hover:text-accent-dark transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-charcoal-muted dark:text-charcoal-muted-dark line-clamp-2 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-surface-border/60 dark:border-surface-border-dark/60 flex items-center justify-between text-[11px] text-charcoal-soft dark:text-charcoal-soft-dark">
                  <span className="truncate max-w-[200px]">{cert.issuer}</span>
                  <span className="text-accent dark:text-accent-dark font-medium flex items-center gap-1 group-hover:underline">
                    View
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <CertificateLightbox
        certificate={selectedCert}
        certificates={certificatesData}
        onClose={() => setSelectedCert(null)}
        onSelect={(c) => setSelectedCert(c)}
      />
    </section>
  );
}
