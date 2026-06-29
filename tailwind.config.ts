import type { Config } from "tailwindcss";
import { fontFamilySans } from "./src/lib/fonts";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tamrix: {
          bg: "#050A0F",
          surface: "#0A1219",
          elevated: "#0F1A24",
          border: "#1A2D3D",
          cyan: "#70D1FF",
          "cyan-dim": "#3BAEE6",
          "cyan-glow": "rgba(112, 209, 255, 0.15)",
          muted: "#8BA3B8",
          text: "#E8F4FC",
        },
        brand: {
          50: "#E8F7FF",
          100: "#C5EBFF",
          200: "#9DDCFF",
          300: "#70D1FF",
          400: "#4AC4FF",
          500: "#2BB5F5",
          600: "#1A9EE0",
          700: "#1480B8",
          800: "#126694",
          900: "#0F4F73",
          950: "#0A3349",
        },
      },
      fontFamily: {
        sans: [...fontFamilySans],
        display: [...fontFamilySans],
      },
      boxShadow: {
        glow: "0 0 20px rgba(112, 209, 255, 0.25)",
        "glow-lg": "0 0 40px rgba(112, 209, 255, 0.2)",
        card: "0 4px 24px rgba(0, 0, 0, 0.4)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(112, 209, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(112, 209, 255, 0.03) 1px, transparent 1px)",
        "hero-glow":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(112, 209, 255, 0.18), transparent)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "glow-pulse": {
          "0%, 100%": {
            filter: "drop-shadow(0 0 18px rgba(112, 209, 255, 0.35))",
          },
          "50%": {
            filter: "drop-shadow(0 0 36px rgba(112, 209, 255, 0.65))",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "line-grow": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.65s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        shimmer: "shimmer 4s linear infinite",
        "line-grow": "line-grow 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
