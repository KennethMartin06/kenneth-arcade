import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0118",
        panel: "#140030",
        neonPink: "#ff2bd6",
        neonPurple: "#b14aff",
        neonCyan: "#00fff0",
        neonBlue: "#2b8cff",
        neonYellow: "#fff35c",
        crt: "#0f0022",
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
        vt: ["var(--font-vt)", "monospace"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
      },
      animation: {
        flicker: "flicker 3s linear infinite",
        scanline: "scanline 8s linear infinite",
        grid: "gridmove 14s linear infinite",
        glitch: "glitch 600ms steps(2, end) infinite",
        blink: "blink 1s steps(2, end) infinite",
        starfall: "starfall 60s linear infinite",
      },
      keyframes: {
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: "1" },
          "20%, 22%, 24%, 55%": { opacity: "0.6" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        gridmove: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(48px)" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        starfall: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 1000px" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
