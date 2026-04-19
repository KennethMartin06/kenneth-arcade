"use client";
import { motion } from "framer-motion";
import { Github, Info } from "lucide-react";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { missions, Mission } from "@/lib/data";
import MissionModal from "../MissionModal";
import TiltCard from "../TiltCard";

const diffColor: Record<Mission["difficulty"], string> = {
  EASY: "text-neonCyan border-neonCyan/50",
  NORMAL: "text-neonYellow border-neonYellow/50",
  HARD: "text-neonPink border-neonPink/50",
  BOSS: "text-neonPurple border-neonPurple/70",
};

const statusDot: Record<NonNullable<Mission["status"]>, string> = {
  SHIPPED: "bg-neonCyan",
  ACTIVE: "bg-neonPink animate-blink",
  ARCHIVED: "bg-white/30",
};

type Filter = "ALL" | Mission["difficulty"];
const FILTERS: Filter[] = ["ALL", "BOSS", "HARD", "NORMAL", "EASY"];

export default function ProjectsScreen() {
  const [selected, setSelected] = useState<Mission | null>(null);
  const [filter, setFilter] = useState<Filter>("ALL");

  const visible = useMemo(
    () => (filter === "ALL" ? missions : missions.filter((m) => m.difficulty === filter)),
    [filter]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <span className="font-pixel text-xs neon-pink animate-flicker">⚔</span>
        <h2 className="font-pixel text-lg md:text-2xl neon-pink">MISSIONS</h2>
        <span className="font-vt text-sm text-white/40">
          {visible.length} / {missions.length} available
        </span>
        <span className="font-vt text-sm text-white/40 ml-auto hidden md:inline">
          click any card for full briefing
        </span>
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-pixel text-[9px] text-white/50">DIFFICULTY ›</span>
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={clsx(
                "font-pixel text-[9px] px-2.5 py-1 border transition-all",
                active
                  ? "border-neonCyan text-neonCyan bg-neonCyan/10"
                  : "border-neonPurple/40 text-white/60 hover:border-neonPink hover:text-neonPink"
              )}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid md:grid-cols-2 xl:grid-cols-3 gap-5"
      >
        {visible.map((m, i) => (
          <motion.div
            key={m.code}
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.35 }}
          >
            <TiltCard
              onClick={() => setSelected(m)}
              className="group relative neon-box-cyan bg-panel/80 p-5 overflow-hidden cursor-pointer h-full"
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute -top-20 -right-20 w-48 h-48 rounded-full bg-neonPink/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Top row */}
              <div
                className="relative flex items-center gap-2 mb-3"
                style={{ transform: "translateZ(20px)" }}
              >
                <span className="font-pixel text-[9px] neon-cyan">{m.code}</span>
                <span
                  className={clsx(
                    "font-pixel text-[8px] px-2 py-1 border",
                    diffColor[m.difficulty]
                  )}
                >
                  {m.difficulty}
                </span>
                {m.status && (
                  <span className="flex items-center gap-1.5 ml-auto">
                    <span className={clsx("w-1.5 h-1.5", statusDot[m.status])} />
                    <span className="font-pixel text-[8px] text-white/60">
                      {m.status}
                    </span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h3
                className="relative font-pixel text-sm md:text-base neon-pink mb-1 leading-tight"
                style={{ transform: "translateZ(30px)" }}
              >
                {m.title}
              </h3>
              <p
                className="relative font-vt text-sm text-neonCyan/90 mb-3"
                style={{ transform: "translateZ(24px)" }}
              >
                {m.subtitle}
              </p>

              {/* Brief */}
              <p
                className="relative font-vt text-base text-white/75 leading-snug mb-4 line-clamp-3"
                style={{ transform: "translateZ(10px)" }}
              >
                {m.brief}
              </p>

              {/* Key metric preview */}
              {m.outcomes.length > 0 && (
                <div
                  className="relative flex flex-wrap gap-2 mb-4"
                  style={{ transform: "translateZ(16px)" }}
                >
                  {m.outcomes.slice(0, 2).map((o) => (
                    <div
                      key={o.label}
                      className="border border-neonPurple/40 bg-neonPurple/5 px-2 py-1"
                    >
                      <p className="font-pixel text-[7px] text-white/50 leading-none">
                        {o.label}
                      </p>
                      <p className="font-vt text-sm neon-cyan leading-tight">
                        {o.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech chips */}
              <div
                className="relative flex flex-wrap gap-1.5 mb-4"
                style={{ transform: "translateZ(12px)" }}
              >
                {m.tech.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="font-vt text-xs px-2 py-0.5 border border-neonPurple/60 text-white/80"
                  >
                    {t}
                  </span>
                ))}
                {m.tech.length > 5 && (
                  <span className="font-vt text-xs px-2 py-0.5 text-white/50">
                    +{m.tech.length - 5}
                  </span>
                )}
              </div>

              {/* Footer actions */}
              <div
                className="relative flex items-center gap-4 pt-3 border-t border-dashed border-neonPurple/40"
                style={{ transform: "translateZ(8px)" }}
              >
                {m.github && (
                  <a
                    href={m.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 font-pixel text-[9px] text-white/80 hover:text-neonCyan transition-colors"
                  >
                    <Github size={12} /> CODE
                  </a>
                )}
                <span className="flex items-center gap-1.5 font-pixel text-[9px] neon-yellow ml-auto group-hover:animate-blink">
                  <Info size={12} /> BRIEFING ▶
                </span>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      <MissionModal mission={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
