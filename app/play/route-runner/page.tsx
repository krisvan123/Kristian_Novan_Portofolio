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
    <div className="min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 md:px-10">
      <RouteRunnerGame />
    </div>
  );
}
