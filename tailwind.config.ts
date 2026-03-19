import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        bg: {
          primary: "#080810",
          secondary: "#0e0e1a",
          card: "#12121f",
          border: "#1e1e30",
        },
        accent: {
          pink: "#ff3d8a",
          purple: "#a855f7",
          cyan: "#22d3ee",
          glow: "rgba(255,61,138,0.15)",
        },
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(135deg, #ff3d8a 0%, #a855f7 100%)",
        "gradient-card": "linear-gradient(145deg, #12121f 0%, #0e0e1a 100%)",
        "gradient-hero": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(168,85,247,0.3) 0%, transparent 60%)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% center" },
          to: { backgroundPosition: "200% center" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
