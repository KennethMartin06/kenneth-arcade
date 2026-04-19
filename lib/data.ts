export const profile = {
  name: "KENNETH MARTIN",
  handle: "P1: K3NN3TH",
  role: "AI / ML DEVELOPER",
  tagline: "Building intelligent systems. One frame at a time.",
  email: "kennethmartin0207@gmail.com",
  github: "https://github.com/KennethMartin06",
  linkedin: "https://www.linkedin.com/in/kenneth-martin-a8708b381",
  instagram: "https://instagram.com/k3nneth_martin",
  portfolio: "https://kenneth-arcade.vercel.app",
};

export const stats = [
  { label: "INTELLIGENCE", value: 92, color: "neonCyan" },
  { label: "DEEP LEARNING", value: 88, color: "neonPink" },
  { label: "PROBLEM SOLVING", value: 90, color: "neonPurple" },
  { label: "SYSTEMS / DBMS", value: 82, color: "neonYellow" },
  { label: "FRONTEND CRAFT", value: 83, color: "neonCyan" },
  { label: "CURIOSITY", value: 99, color: "neonPink" },
];

export const skills = {
  LANGUAGES: ["Python", "Java", "C", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
  "ML / AI": ["PyTorch", "TensorFlow", "scikit-learn", "OpenCV", "MediaPipe", "Transformers", "NumPy", "Pandas"],
  FRONTEND: ["React", "Next.js", "Tailwind", "Framer Motion", "Three.js", "Vite"],
  BACKEND: ["FastAPI", "Node.js", "Express", "WebSockets", "SQLAlchemy", "JWT"],
  "DATA / DB": ["Oracle SQL", "PostgreSQL", "MySQL", "PL/SQL", "REST APIs"],
  DOMAINS: ["Deep Learning", "Computer Vision", "NLP", "Multi-Modal AI", "DBMS", "OS"],
  TOOLS: ["Git", "GitHub", "VS Code", "Jupyter", "Obsidian", "Vercel", "Railway"],
};

export type Mission = {
  code: string;
  title: string;
  subtitle: string;
  brief: string;
  tech: string[];
  github?: string;
  demo?: string;
  difficulty: "EASY" | "NORMAL" | "HARD" | "BOSS";
  role: string;
  year: string;
  features: string[];
  outcomes: { label: string; value: string }[];
  highlights?: string[];
  status?: "SHIPPED" | "ACTIVE" | "ARCHIVED";
};

export const missions: Mission[] = [
  {
    code: "M-01",
    title: "INVIGILAI",
    subtitle: "Multi-Modal AI Proctoring System",
    brief:
      "Real-time exam proctoring that fuses 8 visual signals (gaze, head-pose, face count) with 8 behavioral signals (keystroke dynamics, cursor patterns) into a 16-D vector processed by a PyTorch MLP every 2 seconds.",
    tech: [
      "Python",
      "PyTorch",
      "FastAPI",
      "MediaPipe",
      "React",
      "WebSockets",
      "PostgreSQL",
      "Tailwind",
    ],
    github: "https://github.com/KennethMartin06",
    difficulty: "BOSS",
    role: "Sole Architect & ML Engineer",
    year: "2026",
    status: "SHIPPED",
    features: [
      "Late-fusion multi-modal architecture — any modality can be swapped or dropped without breaking inference",
      "Real-time WebSocket pipeline — 1.5s frame cadence + 2s behavioral events, live admin dashboard",
      "MediaPipe Face Mesh → gaze, head-pose via solvePnP, face-count, embedding norm for impersonation",
      "PyTorch MLP (16→128→64→5) with Focal Loss, MixUp, SWA, MC-Dropout for calibrated confidence",
      "Admin console with live session cards, flag timeline, screenshot storage, JWT-secured roles",
      "Ablation study proving fusion (99.1% F1) vs visual-only (69.9%) vs behavioral-only (67.7%)",
    ],
    outcomes: [
      { label: "TEST ACCURACY", value: "99.38%" },
      { label: "ROC-AUC", value: "0.9997" },
      { label: "F1 (FUSED)", value: "99.1%" },
      { label: "FALSE POSITIVES", value: "3.1%" },
    ],
    highlights: [
      "Multi-modal fusion beats single-modality by 29+ F1 points",
      "Production-ready: ONNX export path, Railway + Vercel deployment",
      "Research-grade: paper-style ablation, 5 cheating classes, 5,411 labeled windows",
    ],
  },
  {
    code: "M-02",
    title: "CYCLAARAAI",
    subtitle: "AI for Sustainable PET Polymer Manufacturing",
    brief:
      "Production-grade ML ensemble predicting environmental impact of PET polymer manufacturing (CO₂, energy, sustainability score) directly from formulation parameters — no lab testing required.",
    tech: [
      "Python",
      "scikit-learn",
      "GradientBoosting",
      "FastAPI",
      "React",
      "Pandas",
      "NumPy",
    ],
    github: "https://github.com/KennethMartin06",
    difficulty: "BOSS",
    role: "Co-Founder & ML Engineer",
    year: "2026",
    status: "ACTIVE",
    features: [
      "Physics-constrained feature engineering: rPET × Energy_Source interaction, Total_Recycled composite",
      "RandomizedSearchCV over GBM / RandomForest / HistGBM — 30 configs × 3 algorithms × 5-fold CV",
      "Validation rules enforce IV ∈ [0.60, 0.85], Temp ∈ [250, 290], rPET + BioPET ≤ 100",
      "FastAPI inference server + React what-if dashboard for material scientists",
      "Grid-search optimizer: finds cheapest formulation meeting a target Env_Score",
      "Roadmap: chained architecture → degradation → process-property → environmental full-chain",
    ],
    outcomes: [
      { label: "CO₂ R²", value: "0.9993" },
      { label: "ENERGY R²", value: "1.000" },
      { label: "ENV SCORE R²", value: "0.9995" },
      { label: "MAE REDUCTION", value: "39–40%" },
    ],
    highlights: [
      "Co-founded an AI startup applying ML to polymer sustainability",
      "v2 improvements cut CO₂ MAE by 39% and Env_Score MAE by 40% via feature engineering",
      "Honest ML: switched the Energy model from RandomForest to LinearRegression after spotting the relationship was linear",
    ],
  },
  {
    code: "M-03",
    title: "SMART HOSTEL",
    subtitle: "Full-Stack Hostel Management Platform",
    brief:
      "Enterprise-grade hostel management system with two frontends (React web + JavaFX desktop), a Node.js/Express API, and 26-table Oracle DB — covering auth, room allocation, biometrics, discipline, and more.",
    tech: [
      "React 18",
      "Node.js",
      "Express",
      "Oracle DB",
      "PL/SQL",
      "JavaFX",
      "JWT",
      "Tailwind",
    ],
    github: "https://github.com/KennethMartin06",
    difficulty: "HARD",
    role: "Full-Stack Engineer",
    year: "2026",
    status: "SHIPPED",
    features: [
      "Dual frontend, shared API — React (web) + JavaFX (desktop kiosk) both consume the same JWT-secured endpoints",
      "26 Oracle tables organized into 11 functional clusters with sequence + BEFORE INSERT triggers",
      "Business logic in PL/SQL triggers — occupancy tracking, auto-overdue fees, event-driven notifications",
      "sp_allocate_room uses SELECT … FOR UPDATE pessimistic locking to prevent double allocations",
      "14-module student portal + 18-module admin portal (allocations, audit logs, housekeeping, visitors)",
      "Curfew-aware biometric: POST /biometric/scan parses open inquiries and auto-levies ₹50 fines on violations",
    ],
    outcomes: [
      { label: "ORACLE TABLES", value: "26" },
      { label: "ADMIN MODULES", value: "18" },
      { label: "API ROUTES", value: "22+" },
      { label: "FRONTENDS", value: "2" },
    ],
    highlights: [
      "Pessimistic locking in stored procedures eliminated race conditions in room allocation",
      "Single Express API serves both browser and JavaFX desktop clients with identical auth",
      "Business logic pushed into DB triggers keeps the API layer thin and consistent",
    ],
  },
  {
    code: "M-04",
    title: "HOTEL OS",
    subtitle: "JavaFX Hotel Management (OSDL Capstone)",
    brief:
      "Java + JavaFX desktop application covering the full OOP spectrum — inheritance, polymorphism, generics, multithreading, synchronization, serialization — 36 files, ~4,200 lines.",
    tech: ["Java 17", "JavaFX 21", "Serialization", "pthreads-style concurrency"],
    github: "https://github.com/KennethMartin06/Hotel_management_system",
    difficulty: "NORMAL",
    role: "Solo Developer",
    year: "2025",
    status: "SHIPPED",
    features: [
      "Layered architecture: UI → Service → Model → Utility with a generic DataStore<T extends Serializable>",
      "Room hierarchy with runtime polymorphism — Standard / Deluxe / Suite each override calculateTariff()",
      "Multithreaded service requests with synchronized DataStore writes and volatile shared state",
      "GST (18%) + conditional 10% discount billing engine with 5 payment methods",
      "9 modules: rooms, bookings, check-in/out, customers, billing, staff, services, availability, reports",
      "Persistent state via Java Serialization to .dat files — no database dependency",
    ],
    outcomes: [
      { label: "JAVA FILES", value: "36" },
      { label: "LINES OF CODE", value: "~4,200" },
      { label: "MODULES", value: "9" },
      { label: "OOP CONCEPTS", value: "9 weeks" },
    ],
    highlights: [
      "Every OSDL concept (encapsulation → JavaFX) demonstrated in a single coherent product",
      "Generic repository pattern eliminated duplicate persistence code across all entities",
    ],
  },
  {
    code: "M-05",
    title: "SYSTEMS LAB",
    subtitle: "OS Scheduling in C with pthreads & fork",
    brief:
      "C implementations of CPU scheduling algorithms using POSIX threads and UNIX process primitives — FCFS via pthreads, Round-Robin skeleton, and fork()/wait() process creation.",
    tech: ["C", "POSIX threads", "fork/wait", "Linux"],
    github: "https://github.com/KennethMartin06",
    difficulty: "NORMAL",
    role: "Systems Programmer",
    year: "2025",
    status: "ARCHIVED",
    features: [
      "FCFS scheduler split across two pthreads — sort thread + scheduling thread, joined sequentially",
      "Correct handling of gaps: CT[i] = max(CT[i-1], AT[i]) + BT[i]",
      "Round-Robin skeleton with time_quantum = 4 and Gantt chart tracking arrays",
      "fork()/wait() demo showing parent-child synchronization and exit status handling",
    ],
    outcomes: [
      { label: "ALGORITHMS", value: "FCFS + RR" },
      { label: "PRIMITIVES", value: "pthreads + fork" },
      { label: "LANGUAGE", value: "Pure C" },
    ],
  },
  {
    code: "M-06",
    title: "ARCADE PORTFOLIO",
    subtitle: "This Website",
    brief:
      "The very site you're browsing — a synthwave-inspired arcade interface with level-select navigation, CRT scanlines, and keyboard controls. Optimized for 60fps on low-end hardware.",
    tech: ["Next.js 14", "TypeScript", "Framer Motion", "Tailwind", "Vercel"],
    github: "https://github.com/KennethMartin06",
    demo: "https://kenneth-arcade.vercel.app",
    difficulty: "EASY",
    role: "Designer & Engineer",
    year: "2026",
    status: "SHIPPED",
    features: [
      "Level-select navigation with keyboard shortcuts (↑↓, 1–5, Enter)",
      "Loading transitions between 'levels' mimic arcade game level swaps",
      "Perf-optimized: no blur filters, no backdrop-blur, static grid — ships at 60fps",
      "Muted synthwave palette (teal/rose/violet/amber) chosen for readability over saturation",
    ],
    outcomes: [
      { label: "LIGHTHOUSE PERF", value: "90+" },
      { label: "FIRST PAINT", value: "< 1.5s" },
      { label: "CLS", value: "~0" },
    ],
  },
];

export const experience = [
  {
    company: "CyclaaraAI",
    role: "Co-Founder & ML Engineer",
    period: "Jan 2026 — Present",
    location: "Remote",
    bullets: [
      "Founded an AI startup building production-grade ML models predicting PET polymer environmental impact (CO₂, Energy, Sustainability Score) with R² 0.9993–1.0.",
      "Led end-to-end ML pipeline — data engineering, physics-constrained feature engineering, hyperparameter search, FastAPI inference, and React what-if dashboard.",
    ],
  },
  {
    company: "ShikshaVertex",
    role: "IBM Certified Intern",
    period: "Ongoing",
    location: "Remote",
    bullets: [
      "IBM Certified Internship — hands-on experience in AI/ML technologies and enterprise-grade software development practices.",
    ],
  },
];

export const about = {
  class: "ML DEVELOPER / RESEARCHER",
  level: "17",
  origin: "INDIA",
  specialty: "MULTI-MODAL AI",
  weapon: "PYTORCH + PYTHON",
  lines: [
    "CSE (AI & ML) student at Manipal Institute of Technology. I build intelligent systems that see, listen, and predict.",
    "Co-founded CyclaaraAI — applying ML to polymer sustainability (R² 0.9993+ across three environmental targets).",
    "Shipped InvigilAI — a multi-modal proctoring system where late-fusion of visual + behavioral signals beats single-modality by 29+ F1 points.",
    "Objective: impactful ML work at the intersection of research and product.",
  ],
};
