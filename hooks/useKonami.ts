"use client";
import { useEffect } from "react";

// ↑ ↑ ↓ ↓ ← → ← → B A — the classic cheat code.
const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/**
 * useKonami — listens for the Konami code and fires `onUnlock` when matched.
 * Case-insensitive on B / A. Ignores repeated keys (keydown on already-held keys).
 */
export function useKonami(onUnlock: () => void) {
  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const expected = SEQUENCE[idx];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === expected) {
        idx++;
        if (idx === SEQUENCE.length) {
          idx = 0;
          onUnlock();
        }
      } else {
        // Allow re-starting the sequence from this key if it's the first char
        idx = key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onUnlock]);
}
