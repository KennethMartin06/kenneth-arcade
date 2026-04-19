"use client";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import Typewriter from "../Typewriter";
import { profile } from "@/lib/data";

const channels = [
  { icon: Mail, label: "EMAIL", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Linkedin, label: "LINKEDIN", value: "kenneth-martin", href: profile.linkedin },
  { icon: Github, label: "GITHUB", value: "@KennethMartin06", href: profile.github },
  { icon: Instagram, label: "INSTAGRAM", value: "@k3nneth_martin", href: profile.instagram },
];

export default function ContactScreen() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-pixel text-xs neon-cyan animate-flicker">📡</span>
        <h2 className="font-pixel text-lg md:text-2xl neon-cyan">TRANSMIT MESSAGE</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="neon-box-pink bg-panel/80 p-6"
      >
        <p className="font-pixel text-[10px] neon-pink mb-3">◇ INCOMING FROM PLAYER</p>
        <p className="font-vt text-xl md:text-2xl text-white/90">
          <Typewriter
            text="Game over? Not yet. Let's build the next level together."
            speed={35}
            startDelay={300}
          />
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {channels.map((c, i) => (
          <motion.a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i }}
            whileHover={{ x: 3, y: -3 }}
            className="group neon-box-purple bg-panel/80 p-5 flex items-center gap-4 hover:bg-neonPurple/10 transition-all"
          >
            <div className="w-12 h-12 flex items-center justify-center border-2 border-neonPink bg-neonPink/10 group-hover:bg-neonPink/30 transition-colors">
              <c.icon size={18} className="text-neonPink" />
            </div>
            <div>
              <p className="font-pixel text-[9px] neon-yellow mb-1">{c.label}</p>
              <p className="font-vt text-lg text-white/90 break-all">{c.value}</p>
            </div>
            <span className="ml-auto font-pixel text-[9px] neon-cyan group-hover:animate-blink">
              ▶
            </span>
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center pt-6"
      >
        <p className="font-pixel text-[10px] neon-yellow animate-flicker">
          ★ THANKS FOR PLAYING ★
        </p>
        <p className="font-vt text-sm text-white/40 mt-2">
          © {new Date().getFullYear()} KENNETH MARTIN · INSERT COIN TO CONTINUE
        </p>
      </motion.div>
    </div>
  );
}
