export const profile = {
  name: "KENNETH MARTIN",
  handle: "P1: K3NN3TH",
  role: "AI / ML DEVELOPER",
  tagline: "Building intelligent systems. One frame at a time.",
  email: "kennethmartin0207@gmail.com",
  github: "https://github.com/KennethMartin06",
  linkedin: "https://www.linkedin.com/in/kenneth-martin-a8708b381",
  instagram: "https://instagram.com/k3nneth_martin",
};

export const stats = [
  { label: "INTELLIGENCE", value: 92, color: "neonCyan" },
  { label: "DEEP LEARNING", value: 85, color: "neonPink" },
  { label: "PROBLEM SOLVING", value: 90, color: "neonPurple" },
  { label: "SYSTEMS / DBMS", value: 78, color: "neonYellow" },
  { label: "FRONTEND CRAFT", value: 80, color: "neonCyan" },
  { label: "CURIOSITY", value: 99, color: "neonPink" },
];

export const skills = {
  LANGUAGES: ["Python", "Java", "C", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
  "ML / AI": ["PyTorch", "TensorFlow", "scikit-learn", "OpenCV", "Transformers", "NumPy", "Pandas"],
  FRONTEND: ["React", "Next.js", "Tailwind", "Framer Motion", "Three.js"],
  "DATA / DB": ["Oracle SQL*Plus", "MySQL", "REST APIs", "FastAPI"],
  DOMAINS: ["Deep Learning", "Computer Vision", "NLP", "Multi-Modal AI", "DBMS", "OS"],
  TOOLS: ["Git", "GitHub", "VS Code", "Jupyter", "Obsidian"],
};

export type Mission = {
  code: string;
  title: string;
  brief: string;
  tech: string[];
  github?: string;
  difficulty: "EASY" | "NORMAL" | "HARD" | "BOSS";
};

export const missions: Mission[] = [
  {
    code: "M-01",
    title: "CHEAT DETECTOR",
    brief:
      "Multi-modal AI agent that monitors online exams via video, audio, and behavioral cues. Flags suspicious events in real time.",
    tech: ["Python", "PyTorch", "OpenCV", "Transformers", "FastAPI"],
    github: "https://github.com/KennethMartin06",
    difficulty: "BOSS",
  },
  {
    code: "M-02",
    title: "POLYMER ORACLE",
    brief:
      "ML model predicting structure & parameters of PET polymers — accelerating sustainable material research.",
    tech: ["Python", "scikit-learn", "PyTorch", "Pandas", "NumPy"],
    github: "https://github.com/KennethMartin06",
    difficulty: "HARD",
  },
  {
    code: "M-03",
    title: "SECOND BRAIN",
    brief:
      "Obsidian-powered knowledge vault indexing ML, DBMS, and OS concepts — my personal retrieval layer.",
    tech: ["Obsidian", "Markdown", "Graph"],
    difficulty: "NORMAL",
  },
  {
    code: "M-04",
    title: "ARCADE PORTFOLIO",
    brief:
      "This very site. A synthwave-inspired arcade interface for showcasing work. Press any key.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind"],
    github: "https://github.com/KennethMartin06",
    difficulty: "EASY",
  },
];

export const about = {
  class: "ML DEVELOPER / RESEARCHER",
  level: "17",
  origin: "INDIA",
  specialty: "MULTI-MODAL AI",
  weapon: "PYTORCH + PYTHON",
  lines: [
    "CSE (AI & ML) student. I build intelligent systems that see, listen, and predict.",
    "Current quest: mastering deep learning, computer vision, and applied ML research.",
    "Side quests: clean engineering, reproducible pipelines, and shipping polished UIs.",
    "Objective: impactful ML work at the intersection of research and product.",
  ],
};
