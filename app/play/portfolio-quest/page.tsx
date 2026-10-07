import React from "react";
import dynamic from "next/dynamic";

const PortfolioQuestGame = dynamic(
  () => import("@/components/Play/PortfolioQuestGame"),
  {
    loading: () => (
      <div className="w-full h-96 flex items-center justify-center font-mono text-xs text-charcoal-soft">
        Entering portfolio world...
      </div>
    ),
  }
);

export const metadata = {
  title: "Portfolio Quest · Play · Kristian Novan",
  description: "An interactive 2D world exploring 5 landmarks across Kristian Novan's portfolio.",
};

export default function PortfolioQuestPage() {
  return (
    <div className="min-h-screen pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-28 md:pb-14 px-3 sm:px-6 md:px-8">
      <PortfolioQuestGame />
    </div>
  );
}
