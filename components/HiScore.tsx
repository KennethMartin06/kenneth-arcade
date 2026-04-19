"use client";
import { useEffect, useState } from "react";

const KEY = "kenneth-arcade-hiscore";

/**
 * HiScore — local visit counter. Bumps on first load of each session.
 * Renders as a 6-digit arcade score. Persists across visits via localStorage.
 * No backend required.
 */
export default function HiScore() {
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    const current = raw ? parseInt(raw, 10) || 0 : 0;
    const next = current + 1;
    localStorage.setItem(KEY, String(next));
    setScore(next);
  }, []);

  const display =
    score == null ? "------" : String(score * 1337).padStart(6, "0").slice(-6);

  return (
    <span className="neon-yellow tabular-nums" aria-label="Hi-score">
      {display}
    </span>
  );
}
