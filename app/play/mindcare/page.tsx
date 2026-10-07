import React from "react";
import dynamic from "next/dynamic";

const MindCareGame = dynamic(
  () => import("@/components/Play/MindCareGame"),
  {
    loading: () => (
      <div className="w-full h-96 flex items-center justify-center font-mono text-xs text-charcoal-soft">
        Opening story...
      </div>
    ),
  }
);

export const metadata = {
  title: "MindCare Choice · Play · Kristian Novan",
  description: "A calm, thoughtful narrative exploration of everyday choices.",
};

export default function MindCarePage() {
  return (
    <div className="min-h-screen pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-28 md:pb-14 px-3 sm:px-6 md:px-8">
      <MindCareGame />
    </div>
  );
}
