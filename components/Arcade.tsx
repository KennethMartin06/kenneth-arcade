"use client";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import Sidebar, { LEVELS, LevelKey } from "./Sidebar";
import HomeScreen from "./screens/HomeScreen";
import CursorGlow from "./CursorGlow";
import Marquee from "./Marquee";
import SoundToggle, { playBloop } from "./SoundToggle";
import CommandPalette from "./CommandPalette";
import { useKonami } from "@/hooks/useKonami";

// Breakout is large (canvas game) and only shown on secret unlock → lazy load.
const Breakout = dynamic(() => import("./Breakout"), { ssr: false });

// Route-level code splitting — each non-home screen is chunked out of the
// initial bundle, trimming first-paint JS by ~40KB+. Home ships eagerly
// because it's the landing view.
const AboutScreen = dynamic(() => import("./screens/AboutScreen"), {
  loading: () => <ScreenSkeleton label="ABOUT" />,
});
const SkillsScreen = dynamic(() => import("./screens/SkillsScreen"), {
  loading: () => <ScreenSkeleton label="SKILLS" />,
});
const ProjectsScreen = dynamic(() => import("./screens/ProjectsScreen"), {
  loading: () => <ScreenSkeleton label="MISSIONS" />,
});
const ContactScreen = dynamic(() => import("./screens/ContactScreen"), {
  loading: () => <ScreenSkeleton label="CONTACT" />,
});
const DevLogScreen = dynamic(() => import("./screens/DevLogScreen"), {
  loading: () => <ScreenSkeleton label="DEV LOG" />,
});

function ScreenSkeleton({ label }: { label: string }) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <p className="font-pixel text-sm neon-cyan animate-flicker">
        LOADING {label}...
      </p>
    </div>
  );
}

// Tech stack ticker shown at the bottom of the screen — premium Framer touch.
const TICKER_ITEMS = [
  "PyTorch",
  "TensorFlow",
  "scikit-learn",
  "FastAPI",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "WebSockets",
  "MediaPipe",
  "Oracle DB",
  "PostgreSQL",
  "Python",
  "Java",
  "C",
  "OpenCV",
  "Framer Motion",
];

export default function Arcade() {
  const [level, setLevel] = useState<LevelKey>("home");
  const [loading, setLoading] = useState(false);
  const [showBreakout, setShowBreakout] = useState(false);

  useKonami(() => setShowBreakout(true));

  const go = useCallback((k: LevelKey) => {
    if (k === level) return;
    playBloop("select"); // no-op if SFX is off
    setLoading(true);
    setTimeout(() => {
      setLevel(k);
      setLoading(false);
    }, 450);
  }, [level]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const keys = LEVELS.map((l) => l.key);
      const idx = keys.indexOf(level);
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        go(keys[(idx + 1) % keys.length]);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        go(keys[(idx - 1 + keys.length) % keys.length]);
      } else if (/^[1-6]$/.test(e.key)) {
        go(keys[parseInt(e.key, 10) - 1]);
      } else if (e.key === "Enter" && level === "home") {
        go("about");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [level, go]);

  const current = LEVELS.find((l) => l.key === level)!;

  return (
    <div className="relative z-10 min-h-screen px-4 md:px-8 py-4 pb-10">
      <CursorGlow />
      <SoundToggle />
      <div className="w-full flex flex-col md:flex-row gap-5">
        <Sidebar active={level} onSelect={go} />

        {/* Game window */}
        <main className="flex-1 min-h-[80vh] relative">
          {/* Top HUD */}
          <div className="flex items-center justify-between mb-3 font-pixel text-[9px]">
            <div className="flex items-center gap-3">
              <span className="neon-pink animate-blink">●</span>
              <span className="neon-cyan">{current.code}</span>
              <span className="text-white/50">//</span>
              <span className="neon-yellow">{current.label}</span>
            </div>
            <div className="flex items-center gap-4 text-white/60">
              <span>
                LIVES <span className="neon-pink">♥♥♥</span>
              </span>
              <span>
                SCORE <span className="neon-cyan">007{level === "home" ? 0 : LEVELS.findIndex((l) => l.key === level)}00</span>
              </span>
            </div>
          </div>

          {/* Screen frame */}
          <div className="relative neon-box-cyan bg-panel p-5 md:p-8 min-h-[70vh] overflow-hidden">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-bg/70"
                >
                  <p className="font-pixel text-sm neon-pink animate-flicker">LOADING...</p>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 0.8, delay: i * 0.08, repeat: Infinity }}
                        className="w-4 h-4 bg-neonCyan"
                        style={{ boxShadow: "0 0 8px #00fff0" }}
                      />
                    ))}
                  </div>
                  <p className="font-vt text-sm neon-cyan">
                    ENTERING {current.label}...
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={level}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {level === "home" && <HomeScreen onStart={() => go("about")} />}
                  {level === "about" && <AboutScreen />}
                  {level === "skills" && <SkillsScreen />}
                  {level === "projects" && <ProjectsScreen />}
                  {level === "devlog" && <DevLogScreen />}
                  {level === "contact" && <ContactScreen />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Tech stack ticker — pure CSS marquee, GPU-only, near-zero cost */}
      <div className="mt-6 border-y-2 border-neonPurple/30 bg-panel/60 py-2">
        <Marquee items={TICKER_ITEMS} speed={50} />
      </div>

      {/* ⌘K palette — always mounted, renders its own overlay when open */}
      <CommandPalette onLevel={go} onSecret={() => setShowBreakout(true)} />

      {/* Konami-unlocked secret game */}
      {showBreakout && <Breakout onClose={() => setShowBreakout(false)} />}
    </div>
  );
}
