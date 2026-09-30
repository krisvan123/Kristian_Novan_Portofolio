"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Award, Maximize2, Sparkles, CheckCircle2 } from "lucide-react";
import { certificatesData, CertificateItem } from "@/data/certificates";
import CertificateLightbox from "./CertificateLightbox";

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <section id="certificates" className="py-14 md:py-20 border-t border-surface-border">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2 mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-light dark:bg-accent-soft text-accent dark:text-accent-dark text-[11px] font-mono font-medium border border-accent-border/60">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-charcoal">
            Certifications &amp; Achievements
          </h2>
          <p className="text-sm sm:text-base text-charcoal-soft max-w-2xl font-sans">
            Peer-reviewed research publication, technical cloud AI credentials, national design competition, and campus mentorship service.
          </p>
        </div>

        {/* 5 Unique Certificate Cards Grid (Responsive: 1 col on mobile, 2 on tablet, 3 on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificatesData.map((cert) => (
            <CertificateCard
              key={cert.id}
              cert={cert}
              onSelect={() => setSelectedCert(cert)}
            />
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

function CertificateCard({
  cert,
  onSelect,
}: {
  cert: CertificateItem;
  onSelect: () => void;
}) {
  const [imgSrc, setImgSrc] = useState(cert.image);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className="group text-left bg-white dark:bg-canvas-card-dark rounded-2xl border border-surface-border overflow-hidden shadow-2xs hover:border-accent-border hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {/* Contained Certificate Thumbnail with subtle hover zoom */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-canvas-subtle border-b border-surface-border p-2 sm:p-2.5 flex items-center justify-center">
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-white/50 dark:bg-black/20 flex items-center justify-center">
          {!hasError ? (
            <Image
              src={imgSrc}
              alt={cert.title}
              fill
              className="object-contain p-1 group-hover:scale-103 transition-transform duration-500 ease-out"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
              onError={() => {
                if (imgSrc.includes("icoris-2026")) {
                  setImgSrc("/images/certificates/Icoris-2026-author.jpg");
                } else if (imgSrc.includes("Icoris-2026")) {
                  setImgSrc("/images/certificates/icoris-2026-author.jpg");
                } else {
                  setHasError(true);
                }
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <Award className="w-8 h-8 text-accent mb-1" />
              <span className="text-xs font-mono text-charcoal-soft">{cert.issuer}</span>
            </div>
          )}
        </div>

        {/* Subtle Hover Action Hint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-xs text-white text-[11px] font-mono flex items-center gap-1.5 shadow-md">
            <Maximize2 className="w-3 h-3" />
            <span>View Certificate</span>
          </span>
        </div>

        {cert.highlight && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-0.5 rounded-full bg-accent text-white text-[10px] font-mono font-medium tracking-wide uppercase shadow-2xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Card Metadata & Description */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono font-medium text-accent dark:text-accent-dark uppercase tracking-wider block">
            {cert.category}
          </span>
          <h3 className="text-base sm:text-lg font-display font-semibold text-charcoal group-hover:text-accent transition-colors leading-snug">
            {cert.title}
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed line-clamp-2 pt-1 font-sans">
            {cert.description}
          </p>
        </div>

        <div className="pt-3 border-t border-surface-border/60 flex items-center justify-between text-xs text-charcoal-soft font-mono">
          <span className="truncate max-w-[210px]">{cert.issuer}</span>
          <span className="text-accent dark:text-accent-dark font-medium flex items-center gap-1 group-hover:underline">
            Inspect
          </span>
        </div>
      </div>
    </div>
  );
}
