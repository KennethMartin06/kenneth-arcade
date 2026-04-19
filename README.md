# KENNETH // ARCADE — Retro Synthwave Portfolio

An 80s arcade-themed portfolio disguised as a playable game interface. Built with Next.js 14, Tailwind, and Framer Motion.

**🎮 [Play it live →](https://kenneth-arcade.vercel.app/)**

## Features
- Synthwave horizon background (CSS grid + neon sun + parallax stars)
- Fixed "LEVEL SELECT" sidebar with glowing selection
- Loading screen between sections (like entering a new level)
- CRT scanlines, vignette, and sweep overlay
- Press Start 2P pixel font + VT323 terminal font
- Typewriter dialogue, glitch text, flicker + blink animations
- Keyboard navigation: `↑ ↓` cycle · `1-5` jump · `ENTER` start
- Player profile (About), power-up bars (Skills), missions (Projects), transmit screen (Contact)

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Customize
- Content lives in **`lib/data.ts`** (profile, stats, skills, missions).
- Theme colors in **`tailwind.config.ts`**.
- Background/CRT effects in **`app/globals.css`**.

## Deploy to Vercel
```bash
npm i -g vercel
vercel
```

## Stack
- Next.js 14 · React 18 · TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react
