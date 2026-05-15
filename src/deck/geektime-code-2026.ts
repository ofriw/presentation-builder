import type { Slide } from "./types";

export const deck: Slide[] = [
  // ── Slide 1 — Title ──────────────────────────────────────────
  {
    kind: "hero",
    tone: "dark",
    icon: "code",
    iconWeight: "duotone",
    title: "Reverse Engineering 180M Lines of Code",
    subtitle: "Ofri Wolfus · Applied Materials · GeekTime Code 2026",
    content: {
      mark: "ChunkHound",
      caption: "Your entire codebase, deeply understood",
    }
  },

  // ── Slide 2 — The Beast ──────────────────────────────────────
  {
    kind: "linearScale",
    title: "The Beast",
    icon: "smileyDead",
    content: {
      max: 200,
      unit: "M LoC",
      references: [
        { label: "Linux", value: 15 },
        { label: "Facebook", value: 20 },
        { label: "Windows", value: 50 },
      ],
      subject: {
        label: "Applied Materials monorepo",
        value: 180,
        caption: "180M+ LoC",
      },
      callouts: [
        "TOP 0.001%|of repositories worldwide",
        "9×|the 20M large-enterprise tier",
        "24 YEARS|mission-critical history",
      ],
      facts: [],
      hyperscaleNote: "",
      caveat: "",
    }
  },

  // ── Slide 3 — The Problem ────────────────────────────────────
  {
    kind: "fragmentedQuote",
    title: "The Problem",
    icon: "knowledge",
    content: {
      quote: '"Nobody knows what this code actually does."',
      fragments: [
        { label: "What was there before their time (vaguely)", icon: "legacy" },
        { label: "What they personally changed", icon: "local" },
        { label: "No full current-state snapshot exists", icon: "missingView" },
      ],
      footer: "Previous refactoring attempts: FAILED",
      footerDetail: "Many talented people tried. The code won.",
    }
  },

  // ── Slide 4 — The AI Bet ────────────────────────────────────
  {
    kind: "decisionFunnel",
    title: "The AI Bet",
    icon: "robot",
    content: {
      inputs: [
        "Enterprise code search",
        "Cloud RAG platforms",
        "AI coding assistants",
      ],
      filters: [
        "Scale: 180M+ LoC",
        "Privacy: on-prem / air-gapped",
        "Price: cannot send millions of tokens / query",
      ],
      result: "So we built our own.",
    }
  },

  // ── Slide 5 — v1: The Obvious Approach (and Why It Fails) ──
  {
    kind: "pipelineFailure",
    title: "The Obvious Approach",
    subtitle: "(and Why It Fails)",
    icon: "failure",
    content: {
      steps: [
        "Code",
        "Chunks",
        "Embeddings",
        "Vector DB",
        "Top‑K",
        "LLM",
      ],
      failureAt: 4,
      scaleMismatch: "One real feature can span hundreds of files and thousands of chunks.",
      reason: "DOESN'T WORK AT THIS SCALE",
    }
  },

  // ── Slide 6 — Deep Research for Code ─────────────────────────
  {
    kind: "iterativeLoop",
    title: "Deep Research for Code",
    icon: "research",
    subtitle: "Not search-and-stuff. Investigation.",
    content: {
      question: "How does electron-beam calibration work?",
      trail: [
        {
          label: "Question",
          detail: "beam calibration",
          note: "LLM-guided exploration",
          icon: "question",
        },
        {
          label: "Entry point",
          detail: "CALIBRATE_BEAM",
          note: "first useful hit",
          icon: "entryPoint",
        },
        {
          label: "Extract leads",
          detail: "constants + calls",
          note: "Constant extraction + facts ledger",
          icon: "leads",
        },
        {
          label: "Follow-up hops",
          detail: "callers · hardware · safety",
          note: "Multi-hop semantic search",
          icon: "research",
        },
        {
          label: "Map-reduce",
          detail: "summarize big branches",
          note: "Map-reduce summarization · adaptive token budgets (30K → 150K)",
          icon: "summarize",
        },
      ],
      ledger: [
        "architecture",
        "constants",
        "patterns",
        "constraints",
      ],
      answer: "Deep architectural answer",
    }
  },

  // ── Slide 7 — How We Actually Use It ────────────────────────
  {
    kind: "parallelResearch",
    title: "How We Actually Use It",
    icon: "hammer",
    content: {
      hub: "Claude Code orchestrates ChunkHound deep research calls",
      spokes: [
        { title: "Algorithm details", caption: "zoom in", icon: "code" },
        { title: "Test coverage", caption: "zoom mid", icon: "evidence" },
        { title: "Architecture", caption: "zoom out", icon: "architecture" },
      ],
      target:
        "Claude Code → ChunkHound MCP → parallel research calls → codebase",
      powerUpSequence:
        "Vacuum → Voltage → E-beam → Cooling → Interlocks → Ready",
    }
  },

  // ── Slide 8 — The Local Vector DB Problem ──────────────────
  {
    kind: "architectureSplit",
    title: "Scaling Local Vector Search",
    icon: "database",
    content: {
      problem: [
        "Nobody builds local vector DBs for millions of vectors",
        "Usually a cloud problem — not a dev laptop problem",
        "Must be private — code never leaves your laptop",
      ],
      solution: [
        "DuckDB as source of truth (metadata, chunks)",
        "Sharded vector index built on USearch",
        "Semantic search bypasses DuckDB",
        "Indexes millions of lines locally, privately, offline",
      ],
    }
  },

  // ── Slide 9 — One Year In ──────────────────────────────────
  {
    kind: "impactDashboard",
    title: "One Year In",
    icon: "impact",
    content: {
      metrics: [
        { value: "32+", label: "languages supported", icon: "code" },
        {
          value: "3 months → 3 days",
          label: "specification time",
          emphasis: "accent",
          icon: "impact",
        },
        {
          value: "20+",
          label: "contributors from industry",
          icon: "community",
        },
      ],
      proof: [
        "Local-first, private, MCP",
        "Kimara AI · Riot Games · US Gov contractors · and growing...",
      ],
    }
  },

  // ── Slide 10 — The Meta-Lesson ──────────────────────────────
  {
    kind: "principleContrast",
    title: "The Meta-Lesson",
    icon: "spark",
    content: {
      bad: {
        title: "Garbage in → Garbage out",
        icon: "warning",
        items: [
          "Your mistakes propagate 10x faster",
          "Weak fundamentals crash harder",
          "Noise scales with speed",
        ],
      },
      good: {
        title: "Agents amplify engineers",
        icon: "spark",
        items: [
          "Strong fundamentals → 10x leverage",
          "Small steps + explicit constraints",
          "Verification at every stage",
        ],
      },
      insight:
        "Building ChunkHound with AI taught us how to build software with AI.",
      footerLink: "agenticoding.ai",
    }
  },

  // ── Slide 11 — The Future Is Private ────────────────────────
  {
    kind: "knowledgeMoat",
    title: "The Future Is Private",
    icon: "future",
    content: {
      layers: [
        "Training hundreds of devs internally",
        "Claude cowork for management",
        "AI-native DNA transformation",
      ],
      moat: "In the agentic era, your ability to harness the knowledge you ALREADY HAVE is what sets you apart.",
    }
  },

  // ── Slide 12 — Call to Action ───────────────────────────────
  {
    kind: "closingCta",
    tone: "dark",
    icon: "community",
    iconWeight: "duotone",
    title: "Join Us",
    content: {
      links: [
        {
          label: "github.com/chunkhound/chunkhound",
          href: "https://github.com/chunkhound/chunkhound",
        },
        { label: "agenticoding.ai", href: "https://agenticoding.ai" },
      ],
      prompt: "We'd love your involvement.",
      rule: "One rule: all code must be AI-generated 😉",
    }
  },
];
