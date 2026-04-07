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
        bg: {
          primary: "#04030A",
          secondary: "#0C0B15",
          card: "#12111E",
          elevated: "#1A1830",
        },
        border: {
          subtle: "rgba(255,255,255,0.05)",
          visible: "rgba(255,255,255,0.10)",
          accent: "rgba(139,92,246,0.35)",
        },
        accent: {
          primary: "#8B5CF6",
          secondary: "#F59E0B",
          success: "#10B981",
          danger: "#EF4444",
          info: "#0EA5E9",
        },
        text: {
          primary: "#F8F7FF",
          secondary: "#A09DB8",
          muted: "#6B6880",
          accent: "#8B5CF6",
          gold: "#F59E0B",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-ibm-plex)", "monospace"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "marquee-left": "marquee-left 30s linear infinite",
        "marquee-right": "marquee-right 30s linear infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "float-medium": "float-medium 6s ease-in-out infinite",
        "float-fast": "float-fast 10s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        shake: "shake 0.5s ease-in-out",
        "corner-glow": "corner-glow 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 4px #8B5CF6" },
          "50%": { opacity: "0.5", boxShadow: "0 0 12px #8B5CF6" },
        },
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "float-medium": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-fast": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-4px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(4px)" },
        },
        "corner-glow": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
