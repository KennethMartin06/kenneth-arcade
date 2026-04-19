import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#08090d",
        panel: "#12141b",
        panel2: "#1a1d26",
        neonPink: "#fb7185",   // muted rose
        neonPurple: "#a78bfa", // soft violet
        neonCyan: "#5eead4",   // muted teal
        neonBlue: "#60a5fa",   // soft sky
        neonYellow: "#fbbf24", // warm amber (CRT glow)
        crt: "#0d0f14",
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
        vt: ["var(--font-vt)", "monospace"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
      },
      animation: {
        flicker: "flicker 4s linear infinite",
        scanline: "scanline 10s linear infinite",
        grid: "gridmove 18s linear infinite",
        glitch: "glitch 600ms steps(2, end) infinite",
        blink: "blink 1.2s steps(2, end) infinite",
        starfall: "starfall 120s linear infinite",
      },
      keyframes: {
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: "1" },
          "20%, 22%, 24%, 55%": { opacity: "0.75" },
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
          "20%": { transform: "translate(-1px, 1px)" },
          "40%": { transform: "translate(-1px, -1px)" },
          "60%": { transform: "translate(1px, 1px)" },
          "80%": { transform: "translate(1px, -1px)" },
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
