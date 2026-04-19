import type { Metadata } from "next";
import { Press_Start_2P, VT323, Orbitron } from "next/font/google";
import "./globals.css";
import CRT from "@/components/CRT";
import SynthwaveBackground from "@/components/SynthwaveBackground";

const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});
const vt = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt",
  display: "swap",
});
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const SITE_URL = "https://kenneth-arcade.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "KENNETH.MARTIN // ARCADE",
  description:
    "Kenneth Martin — AI/ML developer. A synthwave-arcade portfolio of multi-modal ML systems, full-stack builds, and engineering notes.",
  keywords: [
    "Kenneth Martin",
    "AI Developer",
    "ML Engineer",
    "PyTorch",
    "Multi-Modal AI",
    "InvigilAI",
    "CyclaaraAI",
    "Portfolio",
  ],
  authors: [{ name: "Kenneth Martin" }],
  openGraph: {
    title: "Kenneth Martin — AI / ML Developer",
    description:
      "Multi-modal AI systems, full-stack builds, and engineering notes — rendered as a synthwave arcade.",
    url: SITE_URL,
    siteName: "KENNETH.ARCADE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenneth Martin — AI / ML Developer",
    description: "A synthwave arcade portfolio of multi-modal ML systems.",
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
};

// Tinted OS chrome on mobile to match the arcade theme
export const viewport = {
  themeColor: "#08090d",
  colorScheme: "dark" as const,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pixel.variable} ${vt.variable} ${orbitron.variable}`}>
      <body className="font-vt antialiased bg-bg text-white">
        <SynthwaveBackground />
        {children}
        <CRT />
      </body>
    </html>
  );
}
