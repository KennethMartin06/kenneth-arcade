"use client";
import { CSSProperties } from "react";

/**
 * Marquee — infinite horizontal scroll ticker.
 * Pure CSS animation (keyframes on transform) = GPU-only, no JS per-frame cost.
 * Duplicates children once for seamless loop.
 */
export default function Marquee({
  items,
  speed = 40,
  direction = "left",
  className = "",
}: {
  items: string[];
  speed?: number; // seconds for one full cycle
  direction?: "left" | "right";
  className?: string;
}) {
  const style: CSSProperties = {
    animation: `marquee-${direction} ${speed}s linear infinite`,
  };

  return (
    <>
      {/* Inject keyframes once — scoped via uniqueish names */}
      <style jsx global>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
      <div className={`overflow-hidden ${className}`}>
        <div className="flex w-max whitespace-nowrap" style={style}>
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="flex items-center font-pixel text-[10px] md:text-xs text-white/40 px-6"
            >
              <span className="neon-pink mr-2">◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
