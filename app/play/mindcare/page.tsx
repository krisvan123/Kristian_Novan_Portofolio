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
    <div className="min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 md:px-10">
      <MindCareGame />
    </div>
  );
}
