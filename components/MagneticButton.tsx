"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { PropsWithChildren, useRef } from "react";

/**
 * MagneticButton — subtle cursor attraction effect.
 * Classic Framer-template interaction. Uses spring physics for weight.
 */
export default function MagneticButton({
  children,
  strength = 0.3,
  className = "",
  onClick,
}: PropsWithChildren<{
  strength?: number;
  className?: string;
  onClick?: () => void;
}>) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}
