"use client";
import { Command } from "cmdk";
import { useEffect, useState } from "react";
import {
  Home,
  User,
  Zap,
  Swords,
  Radio,
  BookOpen,
  Mail,
  Github,
  Linkedin,
  Gamepad2,
  FileText,
} from "lucide-react";
import { LevelKey } from "./Sidebar";
import { profile } from "@/lib/data";

type LevelAction = {
  kind: "level";
  key: LevelKey;
  label: string;
  icon: typeof Home;
  hint: string;
};
type LinkAction = {
  kind: "link";
  href: string;
  label: string;
  icon: typeof Home;
  hint: string;
};
type SecretAction = {
  kind: "secret";
  label: string;
  icon: typeof Home;
  hint: string;
};
type Action = LevelAction | LinkAction | SecretAction;

/**
 * CommandPalette — ⌘K / Ctrl+K to open. Provides keyboard-first navigation
 * across levels, external profiles, and the secret mini-game.
 */
export default function CommandPalette({
  onLevel,
  onSecret,
}: {
  onLevel: (k: LevelKey) => void;
  onSecret: () => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const levels: LevelAction[] = [
    { kind: "level", key: "home", label: "Home", icon: Home, hint: "Level select" },
    { kind: "level", key: "about", label: "About", icon: User, hint: "Player profile" },
    { kind: "level", key: "skills", label: "Skills", icon: Zap, hint: "Power-ups" },
    { kind: "level", key: "projects", label: "Missions", icon: Swords, hint: "Projects" },
    { kind: "level", key: "devlog", label: "Dev Log", icon: BookOpen, hint: "Engineering notes" },
    { kind: "level", key: "contact", label: "Contact", icon: Radio, hint: "Transmit message" },
  ];

  const links: LinkAction[] = [
    { kind: "link", href: `mailto:${profile.email}`, label: "Email", icon: Mail, hint: profile.email },
    { kind: "link", href: profile.github, label: "GitHub", icon: Github, hint: "@KennethMartin06" },
    { kind: "link", href: profile.linkedin, label: "LinkedIn", icon: Linkedin, hint: "kenneth-martin" },
    { kind: "link", href: "/resume.pdf", label: "Resume", icon: FileText, hint: "PDF (if present)" },
  ];

  const secret: SecretAction[] = [
    {
      kind: "secret",
      label: "Play the secret Breakout game",
      icon: Gamepad2,
      hint: "Hint: Konami code works too",
    },
  ];

  const run = (a: Action) => {
    setOpen(false);
    if (a.kind === "level") onLevel(a.key);
    else if (a.kind === "link") window.open(a.href, "_blank", "noopener");
    else if (a.kind === "secret") onSecret();
  };

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-[85] flex items-start justify-center p-4 md:p-20 bg-bg/80"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg neon-box-cyan bg-panel shadow-2xl"
      >
        <Command
          label="Command Menu"
          className="[&_[cmdk-input]]:bg-transparent"
        >
          <div className="flex items-center gap-3 px-4 py-3 border-b border-neonPurple/40">
            <span className="font-pixel text-[9px] neon-pink">&gt;</span>
            <Command.Input
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent font-vt text-lg text-white/90 placeholder-white/30 outline-none"
              autoFocus
            />
            <span className="font-pixel text-[8px] text-white/40 border border-white/20 px-2 py-0.5">
              ESC
            </span>
          </div>

          <Command.List className="max-h-[60vh] overflow-auto p-2">
            <Command.Empty className="font-vt text-base text-white/50 p-3 text-center">
              No matches. Try a different query.
            </Command.Empty>

            <Command.Group
              heading="LEVELS"
              className="[&_[cmdk-group-heading]]:font-pixel [&_[cmdk-group-heading]]:text-[9px] [&_[cmdk-group-heading]]:text-white/40 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1"
            >
              {levels.map((a) => (
                <Item key={a.key} icon={a.icon} label={a.label} hint={a.hint} onRun={() => run(a)} />
              ))}
            </Command.Group>

            <Command.Group
              heading="LINKS"
              className="[&_[cmdk-group-heading]]:font-pixel [&_[cmdk-group-heading]]:text-[9px] [&_[cmdk-group-heading]]:text-white/40 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1"
            >
              {links.map((a) => (
                <Item key={a.label} icon={a.icon} label={a.label} hint={a.hint} onRun={() => run(a)} />
              ))}
            </Command.Group>

            <Command.Group
              heading="SECRETS"
              className="[&_[cmdk-group-heading]]:font-pixel [&_[cmdk-group-heading]]:text-[9px] [&_[cmdk-group-heading]]:text-white/40 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1"
            >
              {secret.map((a) => (
                <Item key={a.label} icon={a.icon} label={a.label} hint={a.hint} onRun={() => run(a)} />
              ))}
            </Command.Group>
          </Command.List>

          <div className="px-4 py-2 border-t border-neonPurple/40 flex justify-between font-vt text-xs text-white/40">
            <span>
              <span className="neon-cyan">↑↓</span> navigate ·{" "}
              <span className="neon-cyan">↵</span> select
            </span>
            <span>
              <span className="neon-cyan">⌘K</span> toggle
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
}

function Item({
  icon: Icon,
  label,
  hint,
  onRun,
}: {
  icon: typeof Home;
  label: string;
  hint: string;
  onRun: () => void;
}) {
  return (
    <Command.Item
      onSelect={onRun}
      className="flex items-center gap-3 px-3 py-2 cursor-pointer data-[selected=true]:bg-neonCyan/10 data-[selected=true]:border-l-2 data-[selected=true]:border-neonCyan rounded-sm transition-colors"
    >
      <Icon size={14} className="text-neonPink shrink-0" />
      <span className="font-vt text-base text-white/90">{label}</span>
      <span className="ml-auto font-vt text-sm text-white/40">{hint}</span>
    </Command.Item>
  );
}
