import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "var(--background)",
          card: "var(--surface)",
          subtle: "var(--surface-soft)",
          muted: "var(--surface-muted)",
          dark: "#111113",
          "card-dark": "#18181C",
          "subtle-dark": "#202026",
        },
        charcoal: {
          DEFAULT: "var(--foreground)",
          muted: "var(--foreground-muted)",
          soft: "var(--foreground-soft)",
          dark: "#F3F2EE",
          "muted-dark": "#9E9C96",
          "soft-dark": "#73716C",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          light: "var(--accent-soft)",
          border: "var(--accent-border)",
          dark: "#488A68",
          "dark-light": "#172B20",
        },
        surface: {
          border: "var(--border)",
          "border-hover": "var(--border-hover)",
          "border-dark": "#282830",
          "border-hover-dark": "#3C3C48",
        },
      },
      fontFamily: {
        display: ["var(--font-heading)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        "content": "1280px",
      },
      animation: {
        "float-gentle": "floatGentle 6s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        twinkle: "twinkle 4s ease-in-out infinite",
      },
      keyframes: {
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.25", transform: "scale(0.85)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
