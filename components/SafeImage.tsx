"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Image as ImageIcon } from "lucide-react";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  aspectRatioClass?: string;
}

export default function SafeImage({
  src,
  alt,
  fallbackTitle,
  fallbackSubtitle,
  className = "",
  aspectRatioClass = "aspect-[16/10]",
  ...rest
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`w-full ${aspectRatioClass} bg-[#F4F3EE] border border-surface-border rounded-xl flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
      >
        <div className="w-12 h-12 rounded-full bg-accent-light text-accent flex items-center justify-center mb-3">
          <ImageIcon className="w-6 h-6 stroke-[1.5]" />
        </div>
        <p className="text-sm font-medium text-charcoal">{fallbackTitle || alt || "Image Preview"}</p>
        <p className="text-xs text-charcoal-soft mt-1">
          {fallbackSubtitle || "Image Coming Soon • Replace in /public/images"}
        </p>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src as string}
      alt={alt || "Portfolio image"}
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
}
