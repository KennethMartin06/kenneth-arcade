"use client";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import Typewriter from "../Typewriter";
import GlitchText from "../GlitchText";
import MagneticButton from "../MagneticButton";
import AnimatedCounter from "../AnimatedCounter";
import { profile } from "@/lib/data";

/**
 * HomeScreen — hero with parallax mouse-tracked depth layers,
 * a magnetic CTA, and live KPI counters to sell impact at a glance.
 */
export default function HomeScreen({ onStart }: { onStart: () => void }) {
  // Normalized pointer offset from screen center → used to drive parallax on 3 layers.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  // Three layers, each moving at a different magnitude → classic parallax depth.
  const xBack = useTransform(sx, (v) => v * -20);
  const yBack = useTransform(sy, (v) => v * -20);
  const xMid = useTransform(sx, (v) => v * -10);
  const yMid = useTransform(sy, (v) => v * -10);
  const xFore = useTransform(sx, (v) => v * 12);
  const yFore = useTransform(sy, (v) => v * 12);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1; // -1..1
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mx.set(nx);
      my.set(ny);
    };
    // Skip on coarse pointer (touch) — parallax doesn't work without mouse.
    if (!window.matchMedia("(pointer: coarse)").matches) {
      window.addEventListener("mousemove", onMove, { passive: true });
    }
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div className="relative min-h-[72vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* ── BACKGROUND LAYER — distant "stars" that drift slowest ── */}
      <motion.div
        aria-hidden
        style={{ x: xBack, y: yBack }}
        className="pointer-events-none absolute inset-0 opacity-30"
      >
        <span className="absolute top-[15%] left-[12%] font-pixel text-[8px] text-neonPurple/60">
          ✦
        </span>
        <span className="absolute top-[22%] right-[18%] font-pixel text-[9px] text-neonCyan/60">
          ◆
        </span>
        <span className="absolute bottom-[20%] left-[20%] font-pixel text-[8px] text-neonPink/60">
          ✧
        </span>
        <span className="absolute bottom-[30%] right-[12%] font-pixel text-[10px] text-neonYellow/60">
          ★
        </span>
      </motion.div>

      {/* ── MID LAYER — accent badges ── */}
      <motion.div
        aria-hidden
        style={{ x: xMid, y: yMid }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute top-[8%] left-[6%] md:left-[10%] font-pixel text-[9px] text-neonCyan/40 tracking-widest">
          ▌ STAGE 01
        </div>
        <div className="absolute top-[10%] right-[6%] md:right-[10%] font-pixel text-[9px] text-neonPink/40">
          COIN · 01
        </div>
        <div className="absolute bottom-[10%] left-[6%] md:left-[10%] font-pixel text-[9px] text-neonYellow/40 animate-blink">
          ● REC
        </div>
        <div className="absolute bottom-[10%] right-[6%] md:right-[10%] font-pixel text-[9px] text-neonPurple/40">
          SYS · OK
        </div>
      </motion.div>

      {/* ── INSERT COIN tag ── */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative font-pixel text-[10px] md:text-xs neon-yellow mb-6 tracking-widest"
      >
        ★ INSERT COIN ★ KENNETH ARCADE v2.0 ★
      </motion.p>

      {/* ── FOREGROUND LAYER — title moves opposite for depth ── */}
      <motion.div
        style={{ x: xFore, y: yFore }}
        className="relative"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-pixel text-3xl md:text-5xl lg:text-6xl leading-tight chunky-shadow"
        >
          <GlitchText className="neon-cyan">KENNETH</GlitchText>
          <br />
          <GlitchText className="neon-pink">MARTIN</GlitchText>
        </motion.h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative font-vt text-xl md:text-2xl neon-cyan mt-10 min-h-[2em]"
      >
        &gt; <Typewriter text={profile.tagline} speed={45} startDelay={600} />
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="relative font-vt text-lg text-white/70 mt-2"
      >
        CLASS: <span className="neon-yellow">{profile.role}</span>
      </motion.p>

      {/* ── MAGNETIC CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3 }}
        className="relative mt-10"
      >
        <MagneticButton
          onClick={onStart}
          className="font-pixel text-xs md:text-sm px-8 py-4 neon-box-pink bg-neonPink/10 hover:bg-neonPink/25 transition-colors neon-pink animate-flicker"
        >
          ▶ PRESS START
        </MagneticButton>
      </motion.div>

      {/* ── KPI COUNTERS — count up on load, sell impact instantly ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6 }}
        className="relative grid grid-cols-3 gap-3 md:gap-6 mt-10 max-w-md w-full"
      >
        <div className="border border-neonCyan/40 bg-neonCyan/5 p-3 text-center">
          <p className="font-pixel text-[8px] text-white/50 mb-1">MISSIONS</p>
          <p className="font-vt text-2xl md:text-3xl neon-cyan">
            <AnimatedCounter to={6} duration={1.2} />
          </p>
        </div>
        <div className="border border-neonPink/40 bg-neonPink/5 p-3 text-center">
          <p className="font-pixel text-[8px] text-white/50 mb-1">ACCURACY</p>
          <p className="font-vt text-2xl md:text-3xl neon-pink">
            <AnimatedCounter to={99.38} duration={1.6} decimals={2} suffix="%" />
          </p>
        </div>
        <div className="border border-neonYellow/40 bg-neonYellow/5 p-3 text-center">
          <p className="font-pixel text-[8px] text-white/50 mb-1">R² SCORE</p>
          <p className="font-vt text-2xl md:text-3xl neon-yellow">
            <AnimatedCounter to={0.9993} duration={1.8} decimals={4} />
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="relative mt-6 font-vt text-sm text-white/40"
      >
        HI-SCORE <span className="neon-yellow">999999</span> · 1P
      </motion.div>
    </div>
  );
}
