"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PropsWithChildren } from "react";

/**
 * TiltCard — subtle 3D tilt on mouse move. Uses spring physics for smoothness.
 * GPU-only (transform), no layout thrash, ~60fps on low-end hardware.
 */
export default function TiltCard({
  children,
  className,
  maxTilt = 6,
  onClick,
}: PropsWithChildren<{
  className?: string;
  maxTilt?: number;
  onClick?: () => void;
}>) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.6 };
  const sx = useSpring(mx, springConfig);
  const sy = useSpring(my, springConfig);

  const rotateX = useTransform(sy, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
