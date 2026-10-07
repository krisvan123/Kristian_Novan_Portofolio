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
    <div className="min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 md:px-10">
      <CatchDataGame />
    </div>
  );
}
