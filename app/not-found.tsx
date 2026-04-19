import Link from "next/link";

/**
 * 404 — arcade "GAME OVER" screen with CRT glitch and a retry CTA.
 * Intentionally static (no client JS needed) so it ships lean.
 */
export default function NotFound() {
  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
      <div className="relative neon-box-pink bg-panel/80 p-10 md:p-14 max-w-xl w-full text-center">
        <p className="font-pixel text-[10px] neon-yellow mb-6 tracking-widest">
          ★ SIGNAL LOST ★
        </p>

        <h1 className="font-pixel text-3xl md:text-5xl neon-pink animate-flicker leading-tight chunky-shadow">
          GAME OVER
        </h1>

        <div className="my-8 space-y-2">
          <p className="font-pixel text-[10px] neon-cyan">ERROR 404</p>
          <p className="font-vt text-lg text-white/75">
            &gt; level not found in cartridge
          </p>
          <p className="font-vt text-base text-white/50">
            You wandered off the map, player.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Link
            href="/"
            className="font-pixel text-xs px-6 py-3 neon-box-cyan bg-neonCyan/10 hover:bg-neonCyan/25 transition-colors neon-cyan"
          >
            ▶ INSERT COIN TO RETRY
          </Link>
          <p className="font-vt text-sm text-white/40">
            or press <span className="neon-yellow">ESC</span> to return home
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-dashed border-neonPurple/40 font-pixel text-[8px] text-white/30 flex justify-between">
          <span>P1</span>
          <span className="neon-pink animate-blink">READY</span>
        </div>
      </div>
    </div>
  );
}
