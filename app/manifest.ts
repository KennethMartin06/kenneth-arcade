import type { MetadataRoute } from "next";

// PWA manifest — when this site is pinned on mobile Safari / Chrome it
// becomes installable with the arcade theme applied to the OS chrome.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kenneth Martin — Arcade",
    short_name: "K.ARCADE",
    description:
      "AI/ML developer portfolio rendered as a synthwave arcade. Built by Kenneth Martin.",
    start_url: "/",
    display: "standalone",
    background_color: "#08090d",
    theme_color: "#fb7185",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
