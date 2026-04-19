"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Github, ExternalLink, X } from "lucide-react";
import { useEffect } from "react";
import clsx from "clsx";
import type { Mission } from "@/lib/data";

const diffColor: Record<Mission["difficulty"], string> = {
  EASY: "text-neonCyan border-neonCyan/60",
  NORMAL: "text-neonYellow border-neonYellow/60",
  HARD: "text-neonPink border-neonPink/60",
  BOSS: "text-neonPurple border-neonPurple/70",
};

const statusColor: Record<NonNullable<Mission["status"]>, string> = {
  SHIPPED: "text-neonCyan",
  ACTIVE: "text-neonPink animate-blink",
  ARCHIVED: "text-white/50",
};

export default function MissionModal({
  mission,
  onClose,
}: {
  mission: Mission | null;
  onClose: () => void;
}) {
  // Lock body scroll + ESC to close
  useEffect(() => {
    if (!mission) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mission, onClose]);

  return (
    <AnimatePresence>
      {mission && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-start md:items-center justify-center p-3 md:p-8 bg-bg/80"
        >
          {/* Stop clicks on modal body from closing */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto neon-box-pink bg-panel p-6 md:p-8"
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close mission briefing"
              className="absolute top-3 right-3 p-2 border border-neonPurple/40 hover:border-neonPink hover:bg-neonPink/10 transition-colors"
            >
              <X size={16} className="text-white/80" />
            </button>

            {/* Header */}
            <div className="mb-5 pr-10">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-pixel text-[10px] neon-cyan">
                  {mission.code}
                </span>
                <span
                  className={clsx(
                    "font-pixel text-[8px] px-2 py-1 border",
                    diffColor[mission.difficulty]
                  )}
                >
                  {mission.difficulty}
                </span>
                {mission.status && (
                  <span
                    className={clsx(
                      "font-pixel text-[8px] px-2 py-1 border border-white/20",
                      statusColor[mission.status]
                    )}
                  >
                    ● {mission.status}
                  </span>
                )}
                <span className="font-vt text-sm text-white/50 ml-auto">
                  {mission.year}
                </span>
              </div>
              <h3 className="font-pixel text-xl md:text-3xl neon-pink mb-2 leading-tight">
                {mission.title}
              </h3>
              <p className="font-vt text-lg md:text-xl neon-cyan">
                {mission.subtitle}
              </p>
              <p className="font-vt text-sm text-white/50 mt-1">
                ROLE: <span className="text-white/80">{mission.role}</span>
              </p>
            </div>

            {/* Brief */}
            <div className="mb-6">
              <p className="font-pixel text-[9px] neon-yellow mb-2">▼ BRIEFING</p>
              <p className="font-vt text-base md:text-lg text-white/85 leading-relaxed border-l-2 border-neonPurple/50 pl-4">
                {mission.brief}
              </p>
            </div>

            {/* Outcomes */}
            {mission.outcomes.length > 0 && (
              <div className="mb-6">
                <p className="font-pixel text-[9px] neon-yellow mb-3">
                  ◆ IMPACT / METRICS
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {mission.outcomes.map((o) => (
                    <div
                      key={o.label}
                      className="border border-neonCyan/40 bg-neonCyan/5 p-3 text-center"
                    >
                      <p className="font-pixel text-[8px] text-white/50 mb-1">
                        {o.label}
                      </p>
                      <p className="font-vt text-xl md:text-2xl neon-cyan">
                        {o.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="mb-6">
              <p className="font-pixel text-[9px] neon-yellow mb-3">
                ⚙ KEY FEATURES
              </p>
              <ul className="space-y-2">
                {mission.features.map((f, i) => (
                  <li
                    key={i}
                    className="font-vt text-base text-white/80 flex gap-3 leading-snug"
                  >
                    <span className="neon-pink shrink-0 mt-1">▸</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Highlights */}
            {mission.highlights && mission.highlights.length > 0 && (
              <div className="mb-6">
                <p className="font-pixel text-[9px] neon-yellow mb-3">
                  ★ HIGHLIGHTS
                </p>
                <ul className="space-y-2">
                  {mission.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="font-vt text-base text-white/80 flex gap-3 leading-snug"
                    >
                      <span className="neon-cyan shrink-0 mt-1">◆</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech */}
            <div className="mb-6">
              <p className="font-pixel text-[9px] neon-yellow mb-3">
                ▣ TECH STACK
              </p>
              <div className="flex flex-wrap gap-2">
                {mission.tech.map((t) => (
                  <span
                    key={t}
                    className="font-vt text-sm px-2.5 py-1 border border-neonPurple/60 bg-neonPurple/5 text-white/85"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 pt-5 border-t border-dashed border-neonPurple/40">
              {mission.github && (
                <a
                  href={mission.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 font-pixel text-[10px] px-3 py-2 border border-neonCyan/60 text-neonCyan hover:bg-neonCyan/10 transition-colors"
                >
                  <Github size={14} /> VIEW CODE
                </a>
              )}
              {mission.demo && (
                <a
                  href={mission.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 font-pixel text-[10px] px-3 py-2 border border-neonPink/60 text-neonPink hover:bg-neonPink/10 transition-colors"
                >
                  <ExternalLink size={14} /> LIVE DEMO
                </a>
              )}
              <span className="font-pixel text-[9px] text-white/40 ml-auto self-center">
                ESC to close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
