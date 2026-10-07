import React from "react";
import dynamic from "next/dynamic";

const CatchDataGame = dynamic(
  () => import("@/components/Play/CatchDataGame"),
  {
    loading: () => (
      <div className="w-full h-96 flex items-center justify-center font-mono text-xs text-charcoal-soft">
        Initializing feature clustering field...
      </div>
    ),
  }
);

export const metadata = {
  title: "Catch the Data · Play · Kristian Novan",
  description: "A machine learning-inspired classification mini-game.",
};

export default function CatchDataPage() {
  return (
    <div className="min-h-screen pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-28 md:pb-14 px-3 sm:px-6 md:px-8">
      <CatchDataGame />
    </div>
  );
}
