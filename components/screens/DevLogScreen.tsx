"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { devLog, DevLogEntry } from "@/lib/data";

const tagColor: Record<DevLogEntry["tag"], string> = {
  ML: "text-neonPink border-neonPink/60",
  SYSTEMS: "text-neonYellow border-neonYellow/60",
  BACKEND: "text-neonPurple border-neonPurple/60",
  FRONTEND: "text-neonCyan border-neonCyan/60",
  DESIGN: "text-white/80 border-white/30",
};

/**
 * DevLogScreen — curated engineering notes from my Obsidian second brain.
 * Click any entry to expand. Accordion keeps one open at a time.
 */
export default function DevLogScreen() {
  const [openId, setOpenId] = useState<string | null>(devLog[0]?.id ?? null);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-pixel text-xs neon-yellow animate-flicker">▤</span>
        <h2 className="font-pixel text-lg md:text-2xl neon-yellow">DEV LOG</h2>
        <span className="font-vt text-sm text-white/40">
          {devLog.length} entries · curated from my second brain
        </span>
      </div>

      <p className="font-vt text-base md:text-lg text-white/70 max-w-3xl">
        Short, honest engineering notes — what I learned, what broke, what I'd
        do differently. Pulled from my Obsidian vault. Click any entry.
      </p>

      <div className="space-y-3">
        {devLog.map((entry, i) => {
          const isOpen = entry.id === openId;
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.3 }}
              className="neon-box-purple bg-panel/70 overflow-hidden"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : entry.id)}
                className="w-full text-left p-5 flex items-start gap-4 hover:bg-neonPurple/5 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span
                      className={clsx(
                        "font-pixel text-[8px] px-2 py-1 border",
                        tagColor[entry.tag]
                      )}
                    >
                      {entry.tag}
                    </span>
                    <span className="font-vt text-sm text-white/45">
                      {entry.date}
                    </span>
                  </div>
                  <h3 className="font-pixel text-sm md:text-base neon-pink leading-snug mb-2">
                    {entry.title}
                  </h3>
                  <p className="font-vt text-base text-white/75 leading-snug">
                    {entry.excerpt}
                  </p>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-2 shrink-0 neon-cyan"
                >
                  <ChevronDown size={18} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0 border-t border-dashed border-neonPurple/30 space-y-3">
                      {entry.body.map((para, j) => (
                        <p
                          key={j}
                          className="font-vt text-base md:text-lg text-white/80 leading-relaxed border-l-2 border-neonCyan/40 pl-4"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
