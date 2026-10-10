import React from "react";
import dynamic from "next/dynamic";

const RouteRunner3DGame = dynamic(
  () => import("@/components/games/RouteRunner3D/RouteRunner3DGame"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 flex flex-col items-center justify-center gap-3 font-mono text-xs text-slate-400 bg-slate-950 rounded-2xl border border-slate-700">
        <div className="w-6 h-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        <span>Loading 3D scene…</span>
      </div>
    ),
  }
);

export const metadata = {
  title: "Route Runner · Play · Kristian Novan",
  description: "A real 3D city delivery game. Drive, deliver, and survive.",
};

export default function RouteRunnerPage() {
  return (
    <div className="min-h-screen pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-28 md:pb-14 px-3 sm:px-6 md:px-8">
      <RouteRunner3DGame />
    </div>
  );
}
