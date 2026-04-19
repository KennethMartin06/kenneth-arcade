/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

// OG image — 1200x630, rendered by Next.js Image Response on deploy.
// Fully inline (no fonts fetched) → fast, cacheable, crisp on LinkedIn.
export const runtime = "edge";
export const alt = "Kenneth Martin — AI / ML Developer. Retro arcade portfolio.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "70px",
          background:
            "radial-gradient(circle at 70% 40%, #1a1d26 0%, #0d0f14 55%, #08090d 100%)",
          color: "#fff",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Top HUD */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 16,
            letterSpacing: 3,
            color: "#fbbf24",
          }}
        >
          <span style={{ color: "#fb7185" }}>●</span>
          <span>INSERT COIN</span>
          <span style={{ color: "#5eead4" }}>★</span>
          <span>KENNETH ARCADE v2.0</span>
          <span style={{ color: "#5eead4" }}>★</span>
        </div>

        {/* Title */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: 2,
            lineHeight: 1.0,
            textShadow: "0 0 28px rgba(94,234,212,0.5)",
          }}
        >
          <span style={{ color: "#5eead4" }}>KENNETH</span>
          <span style={{ color: "#fb7185", textShadow: "0 0 28px rgba(251,113,133,0.5)" }}>
            MARTIN
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 36,
            fontSize: 32,
            color: "#ffffffd0",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span style={{ color: "#5eead4" }}>&gt;</span>
          Building intelligent systems. One frame at a time.
        </div>

        <div
          style={{
            marginTop: 18,
            fontSize: 22,
            color: "#ffffff70",
          }}
        >
          AI / ML DEVELOPER · Multi-Modal AI · PyTorch · FastAPI · Next.js
        </div>

        {/* Stat row */}
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 50,
          }}
        >
          {[
            { k: "MISSIONS", v: "6", c: "#5eead4" },
            { k: "ACCURACY", v: "99.38%", c: "#fb7185" },
            { k: "R² SCORE", v: "0.9993", c: "#fbbf24" },
          ].map((s) => (
            <div
              key={s.k}
              style={{
                display: "flex",
                flexDirection: "column",
                border: `2px solid ${s.c}40`,
                background: `${s.c}10`,
                padding: "14px 22px",
              }}
            >
              <span style={{ fontSize: 14, color: "#ffffff70", letterSpacing: 2 }}>
                {s.k}
              </span>
              <span style={{ fontSize: 34, color: s.c, marginTop: 4 }}>{s.v}</span>
            </div>
          ))}
        </div>

        {/* Bottom URL bar */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 70,
            right: 70,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 16,
            color: "#ffffff60",
            borderTop: "2px dashed #a78bfa50",
            paddingTop: 18,
          }}
        >
          <span>kenneth-arcade.vercel.app</span>
          <span style={{ color: "#fb7185" }}>● READY PLAYER 1</span>
        </div>
      </div>
    ),
    size
  );
}
