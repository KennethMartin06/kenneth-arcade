"use client";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Mail, Github, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import Typewriter from "../Typewriter";
import { profile } from "@/lib/data";

const channels = [
  { icon: Mail, label: "EMAIL", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Linkedin, label: "LINKEDIN", value: "kenneth-martin", href: profile.linkedin },
  { icon: Github, label: "GITHUB", value: "@KennethMartin06", href: profile.github },
  { icon: Instagram, label: "INSTAGRAM", value: "@k3nneth_martin", href: profile.instagram },
];

/**
 * MagneticCard — contact channel card with subtle cursor attraction.
 * Inlined here to keep the number of component files small.
 */
function MagneticCard({
  children,
  href,
  i,
}: {
  children: React.ReactNode;
  href: string;
  i: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.5 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 14);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 10);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.08 * i }}
      style={{ x: sx, y: sy }}
      className="group relative neon-box-purple bg-panel/80 p-5 flex items-center gap-4 hover:bg-neonPurple/10 transition-colors overflow-hidden"
    >
      {/* Hover light sweep */}
      <span className="pointer-events-none absolute -inset-2 bg-gradient-to-r from-transparent via-neonPink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {children}
    </motion.a>
  );
}

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
          <MagneticCard key={c.label} href={c.href} i={i}>
            <div className="relative w-12 h-12 flex items-center justify-center border-2 border-neonPink bg-neonPink/10 group-hover:bg-neonPink/30 transition-colors">
              <c.icon size={18} className="text-neonPink" />
            </div>
            <div className="relative min-w-0">
              <p className="font-pixel text-[9px] neon-yellow mb-1">{c.label}</p>
              <p className="font-vt text-lg text-white/90 break-all">{c.value}</p>
            </div>
            <span className="relative ml-auto flex items-center gap-1 font-pixel text-[9px] neon-cyan group-hover:translate-x-1 transition-transform">
              <ArrowUpRight size={12} />
            </span>
          </MagneticCard>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
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
