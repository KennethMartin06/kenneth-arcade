"use client";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

/**
 * Breakout — tiny arcade game unlocked via Konami code.
 * Pure canvas + requestAnimationFrame, no game library needed.
 * Colors match the synthwave palette. Paddle follows the mouse / ← →.
 */

const WIDTH = 480;
const HEIGHT = 360;
const PADDLE_W = 76;
const PADDLE_H = 10;
const BALL_R = 6;
const BRICK_ROWS = 4;
const BRICK_COLS = 8;
const BRICK_H = 16;
const BRICK_GAP = 4;
const BRICK_W = (WIDTH - BRICK_GAP * (BRICK_COLS + 1)) / BRICK_COLS;

const COLORS = ["#fb7185", "#fbbf24", "#5eead4", "#a78bfa"];

type Brick = { x: number; y: number; color: string; alive: boolean };

function makeBricks(): Brick[] {
  const bricks: Brick[] = [];
  for (let r = 0; r < BRICK_ROWS; r++) {
    for (let c = 0; c < BRICK_COLS; c++) {
      bricks.push({
        x: BRICK_GAP + c * (BRICK_W + BRICK_GAP),
        y: 30 + r * (BRICK_H + BRICK_GAP),
        color: COLORS[r % COLORS.length],
        alive: true,
      });
    }
  }
  return bricks;
}

export default function Breakout({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Game state
    const state = {
      px: WIDTH / 2 - PADDLE_W / 2,
      bx: WIDTH / 2,
      by: HEIGHT - 40,
      vx: 3,
      vy: -3,
      bricks: makeBricks(),
      score: 0,
      left: false,
      right: false,
      running: true,
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") state.left = true;
      if (e.key === "ArrowRight") state.right = true;
      if (e.key === "Escape") onClose();
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") state.left = false;
      if (e.key === "ArrowRight") state.right = false;
    };
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = WIDTH / rect.width;
      state.px = Math.max(
        0,
        Math.min(
          WIDTH - PADDLE_W,
          (e.clientX - rect.left) * scaleX - PADDLE_W / 2
        )
      );
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("mousemove", onMouseMove);

    let raf = 0;
    const tick = () => {
      if (!state.running) return;

      // Paddle
      if (state.left) state.px = Math.max(0, state.px - 6);
      if (state.right) state.px = Math.min(WIDTH - PADDLE_W, state.px + 6);

      // Ball
      state.bx += state.vx;
      state.by += state.vy;

      // Walls
      if (state.bx - BALL_R < 0 || state.bx + BALL_R > WIDTH) state.vx = -state.vx;
      if (state.by - BALL_R < 0) state.vy = -state.vy;

      // Paddle collision
      if (
        state.by + BALL_R >= HEIGHT - 24 &&
        state.by + BALL_R <= HEIGHT - 24 + PADDLE_H &&
        state.bx >= state.px &&
        state.bx <= state.px + PADDLE_W &&
        state.vy > 0
      ) {
        state.vy = -state.vy;
        // angle control: edge hits steer the ball
        const offset = (state.bx - (state.px + PADDLE_W / 2)) / (PADDLE_W / 2);
        state.vx = offset * 4;
      }

      // Floor
      if (state.by - BALL_R > HEIGHT) {
        state.running = false;
        setLost(true);
      }

      // Brick collision (simple AABB)
      for (const b of state.bricks) {
        if (!b.alive) continue;
        if (
          state.bx + BALL_R > b.x &&
          state.bx - BALL_R < b.x + BRICK_W &&
          state.by + BALL_R > b.y &&
          state.by - BALL_R < b.y + BRICK_H
        ) {
          b.alive = false;
          state.vy = -state.vy;
          state.score += 10;
          setScore(state.score);
          break;
        }
      }

      if (state.bricks.every((b) => !b.alive)) {
        state.running = false;
        setWon(true);
      }

      // ── Render ──
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      // background grid
      ctx.strokeStyle = "rgba(167,139,250,0.08)";
      ctx.lineWidth = 1;
      for (let x = 0; x < WIDTH; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, HEIGHT);
        ctx.stroke();
      }

      // bricks
      for (const b of state.bricks) {
        if (!b.alive) continue;
        ctx.fillStyle = b.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = b.color;
        ctx.fillRect(b.x, b.y, BRICK_W, BRICK_H);
      }
      ctx.shadowBlur = 0;

      // paddle
      ctx.fillStyle = "#5eead4";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#5eead4";
      ctx.fillRect(state.px, HEIGHT - 24, PADDLE_W, PADDLE_H);
      ctx.shadowBlur = 0;

      // ball
      ctx.fillStyle = "#fb7185";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#fb7185";
      ctx.beginPath();
      ctx.arc(state.bx, state.by, BALL_R, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      state.running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, [resetKey, onClose]);

  const restart = () => {
    setScore(0);
    setWon(false);
    setLost(false);
    setResetKey((k) => k + 1);
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-bg/85"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative neon-box-cyan bg-panel p-5 md:p-6"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 p-2 border border-neonPurple/40 hover:border-neonPink transition-colors"
        >
          <X size={14} className="text-white/80" />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <span className="font-pixel text-[10px] neon-pink animate-flicker">
            ★ SECRET STAGE UNLOCKED
          </span>
          <span className="font-vt text-sm text-white/50 ml-auto">
            SCORE <span className="neon-cyan">{score}</span>
          </span>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={WIDTH}
            height={HEIGHT}
            className="block border-2 border-neonPurple/50 bg-crt max-w-full"
            style={{ imageRendering: "pixelated" }}
          />
          {(won || lost) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg/85">
              <p
                className={`font-pixel text-xl ${
                  won ? "neon-cyan" : "neon-pink"
                } animate-flicker`}
              >
                {won ? "★ STAGE CLEARED ★" : "GAME OVER"}
              </p>
              <p className="font-vt text-lg text-white/70">
                FINAL SCORE <span className="neon-yellow">{score}</span>
              </p>
              <button
                onClick={restart}
                className="mt-2 font-pixel text-[10px] px-4 py-2 border border-neonCyan text-neonCyan hover:bg-neonCyan/10 transition-colors"
              >
                ▶ RETRY
              </button>
            </div>
          )}
        </div>

        <p className="font-vt text-sm text-white/50 mt-3 text-center">
          ← → or MOUSE to move paddle · ESC to exit
        </p>
      </div>
    </div>
  );
}
