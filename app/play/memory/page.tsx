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
    <div className="min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 md:px-10">
      <MemoryJourneyGame />
    </div>
  );
}
