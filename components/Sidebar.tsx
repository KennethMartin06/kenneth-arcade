"use client";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Home, User, Zap, Swords, Radio } from "lucide-react";

export type LevelKey = "home" | "about" | "skills" | "projects" | "contact";

export const LEVELS: { key: LevelKey; label: string; icon: typeof Home; code: string }[] = [
  { key: "home", label: "HOME", icon: Home, code: "L-00" },
  { key: "about", label: "ABOUT", icon: User, code: "L-01" },
  { key: "skills", label: "SKILLS", icon: Zap, code: "L-02" },
  { key: "projects", label: "MISSIONS", icon: Swords, code: "L-03" },
  { key: "contact", label: "CONTACT", icon: Radio, code: "L-04" },
];

export default function Sidebar({
  active,
  onSelect,
}: {
  active: LevelKey;
  onSelect: (k: LevelKey) => void;
}) {
  return (
    <aside className="relative z-20 w-full md:w-72 shrink-0 md:h-[calc(100vh-32px)] md:sticky md:top-4">
      <div className="relative neon-box-pink bg-panel p-5 md:h-full">
        <div className="flex items-center justify-between mb-6">
          <p className="font-pixel text-[10px] neon-pink">LEVEL SELECT</p>
          <span className="font-vt text-sm neon-cyan animate-blink">●</span>
        </div>

        <nav className="space-y-2">
          {LEVELS.map((l, i) => {
            const isActive = active === l.key;
            return (
              <motion.button
                key={l.key}
                onClick={() => onSelect(l.key)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={clsx(
                  "relative w-full text-left px-3 py-3 border-2 flex items-center gap-3 transition-all",
                  isActive
                    ? "neon-box-cyan bg-neonCyan/10"
                    : "border-neonPurple/40 hover:border-neonPink hover:bg-neonPink/5"
                )}
              >
                <span
                  className={clsx(
                    "font-pixel text-[8px]",
                    isActive ? "neon-cyan" : "text-neonPurple"
                  )}
                >
                  {isActive ? "▶" : String(i + 1).padStart(2, "0")}
                </span>
                <l.icon
                  size={16}
                  className={isActive ? "text-neonCyan" : "text-neonPurple"}
                />
                <div className="flex-1">
                  <p
                    className={clsx(
                      "font-pixel text-[10px] leading-tight",
                      isActive ? "neon-cyan" : "text-white/85"
                    )}
                  >
                    {l.label}
                  </p>
                  <p className="font-vt text-xs text-white/40">{l.code}</p>
                </div>
              </motion.button>
            );
          })}
        </nav>

        <div className="mt-8 pt-4 border-t-2 border-dashed border-neonPurple/40">
          <p className="font-pixel text-[8px] text-neonYellow mb-2">CONTROLS</p>
          <div className="space-y-1 font-vt text-sm text-white/60">
            <p>
              <span className="neon-cyan">↑ ↓</span> navigate
            </p>
            <p>
              <span className="neon-cyan">ENTER</span> select
            </p>
            <p>
              <span className="neon-cyan">1-5</span> jump
            </p>
          </div>
        </div>

        <div className="absolute bottom-4 left-5 right-5">
          <div className="font-pixel text-[8px] text-white/30 flex justify-between">
            <span>P1</span>
            <span className="neon-pink animate-flicker">READY</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
