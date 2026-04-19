"use client";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import clsx from "clsx";
import { missions, Mission } from "@/lib/data";

const diffColor: Record<Mission["difficulty"], string> = {
  EASY: "text-neonCyan border-neonCyan/50",
  NORMAL: "text-neonYellow border-neonYellow/50",
  HARD: "text-neonPink border-neonPink/50",
  BOSS: "text-neonPurple border-neonPurple/70",
};

export default function ProjectsScreen() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-pixel text-xs neon-pink animate-flicker">⚔</span>
        <h2 className="font-pixel text-lg md:text-2xl neon-pink">MISSIONS</h2>
        <span className="font-vt text-sm text-white/40 ml-auto">
          {missions.length} available
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {missions.map((m, i) => (
          <motion.div
            key={m.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i }}
            whileHover={{ y: -4, rotate: -0.4 }}
            className="group relative neon-box-cyan bg-panel/80 p-5 overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-neonPink/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative flex items-center justify-between mb-3">
              <span className="font-pixel text-[9px] neon-cyan">{m.code}</span>
              <span
                className={clsx(
                  "font-pixel text-[8px] px-2 py-1 border",
                  diffColor[m.difficulty]
                )}
              >
                {m.difficulty}
              </span>
            </div>

            <h3 className="relative font-pixel text-sm md:text-base neon-pink mb-3 leading-tight">
              {m.title}
            </h3>

            <p className="relative font-vt text-base md:text-lg text-white/80 leading-snug mb-4">
              {m.brief}
            </p>

            <div className="relative flex flex-wrap gap-1.5 mb-4">
              {m.tech.map((t) => (
                <span
                  key={t}
                  className="font-vt text-xs px-2 py-0.5 border border-neonPurple/60 text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="relative flex items-center gap-4 pt-3 border-t border-dashed border-neonPurple/40">
              {m.github && (
                <a
                  href={m.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 font-pixel text-[9px] text-white/80 hover:neon-cyan transition-colors"
                >
                  <Github size={12} /> CODE
                </a>
              )}
              <span className="font-pixel text-[9px] neon-yellow animate-blink ml-auto">
                ▶ START
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
