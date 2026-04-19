"use client";
import { useEffect, useRef } from "react";

/**
 * CursorGlow — a lightweight neon blob that follows the mouse with easing.
 * Desktop-only, GPU-only (transform + opacity), no blur filter on the blob itself.
 * The blob IS the glow (radial gradient), so there is zero filter cost.
 * Disables itself on touch devices and when the user prefers reduced motion.
 */
export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch / reduced motion
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isTouch || reduceMotion) return;

    const el = dotRef.current;
    if (!el) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let raf = 0;
    let active = false;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!active) {
        active = true;
        el.style.opacity = "1";
      }
    };

    const onLeave = () => {
      active = false;
      el.style.opacity = "0";
    };

    const tick = () => {
      // Easing — lerp 15% per frame feels premium without lag
      x += (targetX - x) * 0.15;
      y += (targetY - y) * 0.15;
      el.style.transform = `translate3d(${x - 150}px, ${y - 150}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[5] opacity-0 transition-opacity duration-300"
      style={{
        width: 300,
        height: 300,
        background:
          "radial-gradient(circle, rgba(94,234,212,0.18) 0%, rgba(167,139,250,0.08) 40%, transparent 70%)",
        mixBlendMode: "screen",
        willChange: "transform, opacity",
      }}
    />
  );
}
