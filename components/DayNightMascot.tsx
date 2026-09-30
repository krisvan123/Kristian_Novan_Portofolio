"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import CrayonSunflower from "./CrayonSunflower";
import CrayonMoon from "./CrayonMoon";

export default function DayNightMascot() {
  const { theme, isMounted } = useTheme();

  return (
    <div className="w-full flex justify-center py-4 sm:py-6 bg-canvas dark:bg-canvas-dark transition-colors duration-300">
      {isMounted && theme === "dark" ? <CrayonMoon /> : <CrayonSunflower />}
    </div>
  );
}
