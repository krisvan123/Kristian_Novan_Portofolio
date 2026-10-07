import React from "react";
import dynamic from "next/dynamic";

const MemoryJourneyGame = dynamic(
  () => import("@/components/Play/MemoryJourneyGame"),
  {
    loading: () => (
      <div className="w-full h-96 flex items-center justify-center font-mono text-xs text-charcoal-soft">
        Shuffling cards...
      </div>
    ),
  }
);

export const metadata = {
  title: "Memory of My Journey · Play · Kristian Novan",
  description: "A 4x4 card matching memory game based on Kristian's technology journey.",
};

export default function MemoryPage() {
  return (
    <div className="min-h-screen pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-28 md:pb-14 px-3 sm:px-6 md:px-8">
      <MemoryJourneyGame />
    </div>
  );
}
