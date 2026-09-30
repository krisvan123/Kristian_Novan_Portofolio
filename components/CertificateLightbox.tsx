"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { CertificateItem } from "@/data/certificates";

interface CertificateLightboxProps {
  certificate: CertificateItem | null;
  certificates: CertificateItem[];
  onClose: () => void;
  onSelect: (cert: CertificateItem) => void;
}

export default function CertificateLightbox({
  certificate,
  certificates,
  onClose,
  onSelect,
}: CertificateLightboxProps) {
  const [imgSrc, setImgSrc] = React.useState(certificate?.image || "");

  React.useEffect(() => {
    if (certificate?.image) {
      setImgSrc(certificate.image);
    }
  }, [certificate]);

  const currentIndex = certificate
    ? certificates.findIndex((c) => c.id === certificate.id)
    : -1;

  const handleNext = useCallback(() => {
    if (currentIndex < certificates.length - 1) {
      onSelect(certificates[currentIndex + 1]);
    } else {
      onSelect(certificates[0]);
    }
  }, [currentIndex, certificates, onSelect]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onSelect(certificates[currentIndex - 1]);
    } else {
      onSelect(certificates[certificates.length - 1]);
    }
  }, [currentIndex, certificates, onSelect]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    if (certificate) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [certificate, onClose, handleNext, handlePrev]);

  if (!certificate) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={certificate.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-fade-in-up"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#18181B] rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with certificate title & close button */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#121214]">
          <div className="flex flex-col">
            <span className="text-[11px] font-mono text-accent-dark uppercase tracking-wider">
              {certificate.category}
            </span>
            <h3 className="text-sm sm:text-base font-semibold text-white truncate max-w-[280px] sm:max-w-md">
              {certificate.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close certificate lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Image Viewport */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-h-[70vh] bg-black/50 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={imgSrc || certificate.image}
              alt={certificate.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 850px"
              priority
              onError={() => {
                if (imgSrc.includes("icoris-2026")) {
                  setImgSrc("/images/certificates/Icoris-2026-author.jpg");
                } else if (imgSrc.includes("Icoris-2026")) {
                  setImgSrc("/images/certificates/icoris-2026-author.jpg");
                }
              }}
            />
          </div>

          {/* Previous / Next buttons */}
          <button
            onClick={handlePrev}
            type="button"
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white/90 hover:text-white border border-white/20 transition-all cursor-pointer backdrop-blur-xs"
            aria-label="Previous certificate"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white/90 hover:text-white border border-white/20 transition-all cursor-pointer backdrop-blur-xs"
            aria-label="Next certificate"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-[#121214] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-neutral-300">
          <div>
            <span className="font-semibold text-white">Issued by: </span>
            <span>{certificate.issuer}</span>
            <span className="mx-2 text-neutral-600 hidden sm:inline">•</span>
            <span className="text-neutral-400 text-[11px] block sm:inline mt-0.5 sm:mt-0">
              {certificate.description}
            </span>
          </div>
          <div className="text-[11px] font-mono text-neutral-400 shrink-0">
            {currentIndex + 1} of {certificates.length}
          </div>
        </div>
      </div>
    </div>
  );
}
