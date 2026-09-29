import type { Config } from "tailwindcss";

const config: Config = {
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
          DEFAULT: "#F9F8F5", // warm ivory / off-white
          subtle: "#F2F0E8",
          card: "#FFFFFF",
          muted: "#EDEAE1",
        },
        charcoal: {
          DEFAULT: "#18181A",
          muted: "#3F3F46",
          soft: "#71717A",
          light: "#A1A1AA",
        },
        accent: {
          DEFAULT: "#2D5A46", // elegant muted sage / deep botanical green
          hover: "#234737",
          light: "#EAF2ED",
          border: "#C2D9CD",
          subtle: "#507564",
        },
        surface: {
          border: "#E7E4D8",
          "border-hover": "#D3CEBE",
        }
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
          "var(--font-newsreader)",
          "Georgia",
          "Cambria",
          "serif",
        ],
      },
      animation: {
        "marquee-left": "marqueeLeft 40s linear infinite",
        "marquee-left-slow": "marqueeLeft 50s linear infinite",
        "marquee-right": "marqueeRight 45s linear infinite",
        "float-gentle": "floatGentle 6s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        marqueeLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
