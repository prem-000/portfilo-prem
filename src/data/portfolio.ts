import { PortfolioItem } from "./types";

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Praxis — Turn Coding Failures into Learning Intelligence",
    description:
      "Built a Bayesian inference engine to diagnose root causes of competitive-programming failures directly from submission metadata. Designed a PageRank-based graph algorithm to surface recurring weakness patterns and map blind spots in algorithmic knowledge. Integrated Groq (LLaMA-3 8B) with a RAG pipeline for personalized learning paths and semantic search across past submissions. Developed a Manifest V3 Chrome extension with TypeScript service workers for real-time LeetCode submission capture and JWT authentication. Visualized weakness relationships through an interactive React Flow knowledge graph and deployed the full-stack application on Vercel.",
    image: "/projects/DevToolKit.png",
    github: "https://github.com/prem-000/failureatlas",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Groq API",
      "Chrome Extension",
    ],
  },
  {
    id: "2",
    title: "NEXORA — Off-Grid Mesh Communication & Emergency Response",
    description:
      "Decentralized peer-to-peer communication, multi-hop messaging, offline maps, and emergency coordination when cellular networks and internet access are unavailable. Features multi-hop message routing with duplicate suppression, delay-tolerant store-and-forward messaging, encrypted messages, signed emergency SOS alert frames, offline map caching with MapLibre, local persistence via Room and SQLite, and delivery-status tracking. Documented 106 passing automated tests. (Roadmap items including double ratchet and internet spool relay are planned).",
    image: "/projects/bwuweb.png",
    tech: [
      "Kotlin",
      "Android SDK",
      "Java 17",
      "Room",
      "SQLite",
      "Nearby Connections",
      "Wi-Fi Direct",
      "MapLibre",
      "NanoHTTPD",
    ],
  },
  {
    id: "3",
    title: "ProthexAI — Clinical Mobility Platform",
    description:
      "Designed a dual-layer architecture separating high-frequency sensor streams from hourly aggregates, enabling sub-50ms edge inference while preserving longitudinal clinical context. Built a multi-target risk pipeline with independent classifiers per physiological domain, decoupling gait, pressure, and skin-integrity failure modes to prevent cross-axis signal contamination. Implemented an AI reasoning bridge grounding probabilistic ML risk scores into plain-language clinical guidance. Automated scheduled PDF report generation with real-time manual-log synchronization, maintaining consistency between clinical snapshots and live dashboard state.",
    image: "/projects/Interns.png",
    github: "https://github.com/prem-000/prothexgenai",
    tech: [
      "FastAPI",
      "Motor",
      "MongoDB",
      "Google GenAI SDK",
      "Gemini 1.5 Flash",
      "scikit-learn",
      "ReportLab",
      "APScheduler",
      "D3.js",
    ],
  },
  {
    id: "4",
    title: "Multi-Source Research & Project Agent",
    description:
      "AI-powered research assistant architecture designed to route user inquiries to specialized source agents, verify retrieved findings, and synthesize answers with inline citations. Designed with intent classification across study, project, technical, and trending domains; modular agents for literature, repositories, and technical documentation; startup-time API key validation; source-level caching; result verification for quality and relevance; and ChromaDB vector embeddings with LLM synthesis.",
    image: "/projects/httpx.png",
    tech: [
      "Python",
      "FastAPI",
      "Groq",
      "Pydantic",
      "HTTPX",
      "GitHub API",
      "Tavily",
      "arXiv",
      "Semantic Scholar",
      "ChromaDB",
    ],
  },
];
