"use client";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * AnimatedCounter — ticks a number up from 0 when scrolled into view.
 * Uses framer-motion's animate() on a motion value → cheap string transform.
 */
export default function AnimatedCounter({
  to,
  duration = 1.4,
  suffix = "",
  prefix = "",
  className = "",
  decimals = 0,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (n) =>
    prefix + n.toFixed(decimals) + suffix
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo-ish
    });
    return controls.stop;
  }, [inView, to, duration, mv]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
}
