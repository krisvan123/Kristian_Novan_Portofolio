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
        background: "var(--background)",
        foreground: "var(--foreground)",
        canvas: {
          DEFAULT: "#FAF9F5", // warm ivory / off-white
          subtle: "#F2F0E8",
          card: "#FFFFFF",
          muted: "#EDEAE1",
          dark: "#121214", // deep charcoal night
          "card-dark": "#1A1A1E",
          "subtle-dark": "#232328",
        },
        charcoal: {
          DEFAULT: "#18181A",
          muted: "#3F3F46",
          soft: "#71717A",
          light: "#A1A1AA",
          dark: "#F4F4F6", // text in dark mode
          "soft-dark": "#9E9EA8",
          "muted-dark": "#C8C8D0",
        },
        accent: {
          DEFAULT: "#2D5A46", // elegant botanical sage
          hover: "#234737",
          light: "#EAF2ED",
          border: "#C2D9CD",
          subtle: "#507564",
          dark: "#3E8363",
          "dark-light": "#192B22",
        },
        surface: {
          border: "#E7E4D8",
          "border-hover": "#D3CEBE",
          "border-dark": "#2A2A32",
          "border-hover-dark": "#3D3D48",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        serif: [
          "Georgia",
          "Cambria",
          "serif",
        ],
      },
      animation: {
        "float-gentle": "floatGentle 6s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        twinkle: "twinkle 4s ease-in-out infinite",
      },
      keyframes: {
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
