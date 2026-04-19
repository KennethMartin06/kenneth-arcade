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

export const metadata: Metadata = {
  title: "KENNETH.MARTIN // ARCADE",
  description: "Kenneth Martin — AI/ML developer. A retro arcade portfolio.",
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
