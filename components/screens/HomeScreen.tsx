"use client";
import { motion } from "framer-motion";
import Typewriter from "../Typewriter";
import GlitchText from "../GlitchText";
import { profile } from "@/lib/data";

export default function HomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-pixel text-[10px] md:text-xs neon-yellow mb-6 tracking-widest"
      >
        ★ INSERT COIN ★ KENNETH ARCADE v1.0 ★
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-pixel text-3xl md:text-5xl lg:text-6xl leading-tight chunky-shadow"
      >
        <GlitchText className="neon-cyan">KENNETH</GlitchText>
        <br />
        <GlitchText className="neon-pink">MARTIN</GlitchText>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="font-vt text-xl md:text-2xl neon-cyan mt-10 min-h-[2em]"
      >
        &gt; <Typewriter text={profile.tagline} speed={45} startDelay={600} />
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="font-vt text-lg text-white/70 mt-2"
      >
        CLASS: <span className="neon-yellow">{profile.role}</span>
      </motion.p>

      <motion.button
        onClick={onStart}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-12 font-pixel text-xs md:text-sm px-8 py-4 neon-box-pink bg-neonPink/10 hover:bg-neonPink/20 transition-colors neon-pink animate-flicker"
      >
        ▶ PRESS START
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="mt-8 font-vt text-sm text-white/40"
      >
        HI-SCORE <span className="neon-yellow">999999</span> · 1P
      </motion.div>
    </div>
  );
}
