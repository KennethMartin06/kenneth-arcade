"use client";
import { motion } from "framer-motion";
import { about, profile } from "@/lib/data";

export default function AboutScreen() {
  const info = [
    { k: "NAME", v: profile.name },
    { k: "CLASS", v: about.class },
    { k: "LEVEL", v: about.level },
    { k: "ORIGIN", v: about.origin },
    { k: "SPECIALTY", v: about.specialty },
    { k: "WEAPON", v: about.weapon },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-pixel text-xs neon-pink animate-flicker">◆</span>
        <h2 className="font-pixel text-lg md:text-2xl neon-pink">PLAYER PROFILE</h2>
      </div>

      <div className="grid md:grid-cols-5 gap-4">
        {/* Avatar panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2 neon-box-cyan bg-panel/70 p-5"
        >
          <div className="aspect-square relative mb-4 border-2 border-neonPink/50 overflow-hidden bg-gradient-to-br from-neonPurple/30 to-neonCyan/20">
            {/* Pixel avatar */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="font-pixel text-6xl md:text-7xl neon-pink animate-flicker">
                KM
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0 2px, transparent 2px 4px)",
              }}
            />
            <div className="absolute bottom-1 left-1 right-1 flex justify-between font-pixel text-[8px] neon-cyan">
              <span>HP ████████</span>
              <span>MP ███████░</span>
            </div>
          </div>
          <p className="font-pixel text-[10px] neon-yellow text-center">{profile.handle}</p>
        </motion.div>

        {/* Stats table */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-3 neon-box-purple bg-panel/70 p-5"
        >
          <p className="font-pixel text-[10px] neon-cyan mb-4">◇ CHARACTER DATA</p>
          <div className="space-y-2">
            {info.map((row) => (
              <div
                key={row.k}
                className="flex justify-between font-vt text-lg border-b border-dashed border-neonPurple/30 pb-1"
              >
                <span className="text-white/60">{row.k}</span>
                <span className="neon-cyan">{row.v}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bio dialogue box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="neon-box-pink bg-panel/80 p-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="font-pixel text-[10px] neon-yellow animate-blink">▼</span>
          <p className="font-pixel text-[10px] neon-pink">DIALOGUE</p>
        </div>
        <div className="space-y-3 font-vt text-lg md:text-xl text-white/85 leading-relaxed">
          {about.lines.map((line, i) => (
            <p key={i}>
              <span className="neon-cyan">&gt;</span> {line}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
