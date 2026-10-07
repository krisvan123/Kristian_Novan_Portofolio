import React from "react";
import dynamic from "next/dynamic";

const RouteRunnerGame = dynamic(
  () => import("@/components/Play/RouteRunnerGame"),
  {
    loading: () => (
      <div className="w-full h-96 flex items-center justify-center font-mono text-xs text-charcoal-soft">
        Loading Route Runner simulation...
      </div>
    ),
  }
);

export const metadata = {
  title: "Route Runner · Play · Kristian Novan",
  description: "An optimization browser mini-game inspired by EcoRouter AI.",
};

export default function RouteRunnerPage() {
  return (
    <div className="min-h-screen pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-28 md:pb-14 px-3 sm:px-6 md:px-8">
      <RouteRunnerGame />
    </div>
  );
}
