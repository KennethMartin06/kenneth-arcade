"use client";
import { useCallback, useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Sound manager — muted by default. Uses the Web Audio API to synthesize
 * 8-bit style bleeps on demand. Zero audio assets loaded, zero bytes shipped.
 *
 * Exposes a global playBloop() that other components can call (level-select
 * in Arcade.tsx wires to this). Respects the toggle state stored in localStorage.
 */

const STORAGE_KEY = "kenneth-arcade-sound";

// Module-level state so any component can trigger a bloop.
let audioCtx: AudioContext | null = null;
let soundOn = false;

function ensureCtx() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    audioCtx = new Ctor();
  }
  return audioCtx;
}

/**
 * playBloop(variant) — short synthesized blip. Cheap: creates a 1-shot
 * oscillator + gain node, disposes when done. No audio files.
 */
export function playBloop(variant: "select" | "back" = "select") {
  if (!soundOn) return;
  const ctx = ensureCtx();
  if (!ctx) return;
  const t0 = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square"; // classic chiptune timbre
  osc.frequency.setValueAtTime(variant === "select" ? 880 : 523, t0);
  osc.frequency.exponentialRampToValueAtTime(
    variant === "select" ? 1760 : 262,
    t0 + 0.08
  );
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(0.07, t0 + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.12);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + 0.14);
}

export default function SoundToggle() {
  const [on, setOn] = useState(false);

  // Restore preference on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const enabled = saved === "on";
    setOn(enabled);
    soundOn = enabled;
  }, []);

  const toggle = useCallback(() => {
    setOn((prev) => {
      const next = !prev;
      soundOn = next;
      localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
      // Resume audio context on first user gesture (browser autoplay policy)
      if (next) {
        const ctx = ensureCtx();
        if (ctx && ctx.state === "suspended") ctx.resume();
        // Tiny confirmation bloop so the user knows it's live
        playBloop("select");
      }
      return next;
    });
  }, []);

  return (
    <button
      onClick={toggle}
      aria-label={on ? "Mute sound" : "Unmute sound"}
      className="fixed bottom-4 right-4 z-[70] flex items-center gap-2 border-2 border-neonPurple/50 bg-panel/90 hover:bg-neonPurple/10 px-3 py-2 font-pixel text-[9px] transition-colors"
    >
      {on ? (
        <Volume2 size={14} className="text-neonCyan" />
      ) : (
        <VolumeX size={14} className="text-white/60" />
      )}
      <span className={on ? "neon-cyan" : "text-white/60"}>
        {on ? "SFX ON" : "SFX OFF"}
      </span>
    </button>
  );
}
