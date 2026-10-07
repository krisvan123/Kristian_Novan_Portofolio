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
    <div className="min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 md:px-10">
      <PortfolioQuestGame />
    </div>
  );
}
