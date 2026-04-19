"use client";
import clsx from "clsx";

export default function GlitchText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={clsx("relative inline-block", className)} data-text={children}>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="absolute inset-0 neon-pink"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)", transform: "translate(2px, -1px)" }}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 neon-cyan"
        style={{ clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)", transform: "translate(-2px, 1px)" }}
      >
        {children}
      </span>
    </span>
  );
}
