"use client";
import { motion } from "framer-motion";
import { skills, stats } from "@/lib/data";
import AnimatedCounter from "../AnimatedCounter";

const colorMap: Record<string, string> = {
  neonPink: "#fb7185",
  neonCyan: "#5eead4",
  neonPurple: "#a78bfa",
  neonYellow: "#fbbf24",
};

function Bar({ label, value, color, i }: { label: string; value: number; color: string; i: number }) {
  const c = colorMap[color] ?? "#ff2bd6";
  return (
    <div>
      <div className="flex justify-between font-pixel text-[10px] mb-2">
        <span className="text-white/80">{label}</span>
        <span style={{ color: c, textShadow: `0 0 6px ${c}` }}>
          <AnimatedCounter to={value} duration={0.9 + i * 0.05} />/100
        </span>
      </div>
      <div className="h-4 border-2 border-white/30 bg-black/50 p-[2px]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, delay: 0.1 * i, ease: "easeOut" }}
          className="h-full"
          style={{
            background: `repeating-linear-gradient(90deg, ${c} 0 8px, ${c}99 8px 12px)`,
            boxShadow: `0 0 10px ${c}`,
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsScreen() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-pixel text-xs neon-yellow animate-flicker">⚡</span>
        <h2 className="font-pixel text-lg md:text-2xl neon-yellow">POWER-UPS</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="neon-box-cyan bg-panel/70 p-5">
          <p className="font-pixel text-[10px] neon-cyan mb-5">◇ STATS</p>
          <div className="space-y-5">
            {stats.map((s, i) => (
              <Bar key={s.label} label={s.label} value={s.value} color={s.color} i={i} />
            ))}
          </div>
        </div>

        <div className="neon-box-purple bg-panel/70 p-5">
          <p className="font-pixel text-[10px] neon-purple mb-5">◇ INVENTORY</p>
          <div className="space-y-4">
            {Object.entries(skills).map(([cat, items], i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * i }}
              >
                <p className="font-pixel text-[9px] neon-yellow mb-2">{cat}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((t) => (
                    <span
                      key={t}
                      className="font-vt text-sm px-2.5 py-1 border border-neonPink/50 bg-neonPink/5 hover:bg-neonPink/20 hover:neon-pink transition-colors cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
