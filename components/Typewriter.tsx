"use client";
import { useEffect, useState } from "react";

export default function Typewriter({
  text,
  speed = 40,
  className = "",
  startDelay = 0,
  caret = true,
}: {
  text: string;
  speed?: number;
  className?: string;
  startDelay?: number;
  caret?: boolean;
}) {
  const [out, setOut] = useState("");

  useEffect(() => {
    setOut("");
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, speed);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, speed, startDelay]);

  return <span className={`${className} ${caret ? "blink-caret" : ""}`}>{out}</span>;
}
