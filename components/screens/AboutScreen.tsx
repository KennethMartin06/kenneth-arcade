"use client";
import { motion } from "framer-motion";
import { about, profile, experience } from "@/lib/data";
import { Briefcase, Activity } from "lucide-react";

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
            {/* Real photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile.jpg"
              alt="Kenneth Martin"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            {/* CRT scanline overlay on photo */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 2px, transparent 2px 4px)",
              }}
            />
            {/* Neon border glow overlay */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: "inset 0 0 20px rgba(94,234,212,0.15)" }}
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
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4 }}
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

      {/* GitHub Contribution Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="neon-box-purple bg-panel/80 p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Activity size={14} className="text-neonPurple" />
          <p className="font-pixel text-[10px] neon-purple">
            COMBAT RECORD / GITHUB ACTIVITY
          </p>
          <span className="font-vt text-sm text-white/40 ml-auto hidden md:inline">
            last 12 months · @KennethMartin06
          </span>
        </div>
        <div className="relative overflow-x-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://ghchart.rshah.org/a78bfa/KennethMartin06"
            alt="Kenneth Martin's GitHub contribution graph"
            className="w-full min-w-[640px] opacity-90"
            loading="lazy"
          />
          {/* Scanline overlay to match the arcade aesthetic */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0 2px, transparent 2px 4px)",
            }}
          />
        </div>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-3 font-pixel text-[9px] text-white/70 hover:text-neonCyan transition-colors"
        >
          ▸ VIEW FULL PROFILE →
        </a>
      </motion.div>

      {/* Experience timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="neon-box-cyan bg-panel/80 p-5"
      >
        <div className="flex items-center gap-2 mb-5">
          <Briefcase size={14} className="text-neonCyan" />
          <p className="font-pixel text-[10px] neon-cyan">QUEST LOG / EXPERIENCE</p>
        </div>
        <ol className="relative border-l-2 border-dashed border-neonPurple/40 ml-2 space-y-6">
          {experience.map((e, i) => (
            <motion.li
              key={e.company}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="pl-5"
            >
              {/* Marker */}
              <span className="absolute -left-[7px] w-3 h-3 bg-neonPink border border-neonPink/60 shadow-[0_0_8px_#fb7185]" />
              <div className="flex flex-wrap items-baseline gap-x-3 mb-1">
                <p className="font-pixel text-xs neon-pink">{e.company}</p>
                <span className="font-vt text-sm text-white/40">·</span>
                <p className="font-vt text-base neon-cyan">{e.role}</p>
                <span className="font-vt text-sm text-white/50 ml-auto">
                  {e.period} · {e.location}
                </span>
              </div>
              <ul className="space-y-1 mt-2">
                {e.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="font-vt text-base text-white/80 flex gap-2 leading-snug"
                  >
                    <span className="neon-yellow shrink-0">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </div>
  );
}
