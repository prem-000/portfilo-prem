import { PortfolioItem } from "./types";

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    slug: "praxis",
    title: "Praxis — Turn Coding Failures into Learning Intelligence",
    shortTitle: "Praxis",
    tagline: "Bayesian Competitive Programming Diagnostic & Algorithmic Knowledge Graph",
    description:
      "Built a Bayesian inference engine to diagnose root causes of competitive-programming failures directly from submission metadata. Designed a PageRank-based graph algorithm to surface recurring weakness patterns and map blind spots in algorithmic knowledge. Integrated Groq (LLaMA-3 8B) with a RAG pipeline for personalized learning paths and semantic search across past submissions. Developed a Manifest V3 Chrome extension with TypeScript service workers for real-time LeetCode submission capture and JWT authentication. Visualized weakness relationships through an interactive React Flow knowledge graph and deployed the full-stack application on Vercel.",
    image: "/projects/praxis.png",
    github: "https://github.com/prem-000/failureatlas",
    tech: [
      "Next.js 14",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Groq API",
      "LLaMA-3 8B",
      "Chrome Extension",
      "React Flow",
    ],
    details: {
      category: "Algorithmic Intelligence & Knowledge Graphs",
      caseStudyNumber: "01",
      targetAudience:
        "Competitive programmers, LeetCode candidates, and software engineering interviewees seeking targeted algorithmic diagnosis rather than repetitive, untracked problem drilling.",
      statusBadge: "Completed & Deployed on Vercel",
      metrics: [
        {
          value: "< 1.0s",
          label: "Diagnostic Latency",
          detail: "Sub-second Bayesian inference & Groq LLaMA-3 8B RAG response",
        },
        {
          value: "MV3 + JWT",
          label: "Extension Engine",
          detail: "TypeScript service worker with secure token authentication",
        },
        {
          value: "PageRank",
          label: "Graph Algorithm",
          detail: "Weakness weight propagation across conceptual tag trees",
        },
        {
          value: "Postgres + Vercel",
          label: "Full-Stack Deployment",
          detail: "Serverless Next.js 14 App Router paired with Prisma ORM",
        },
      ],
      problem:
        "Developers and competitive programmers spend hundreds of hours solving problems without systematically diagnosing why their submissions fail (e.g., algorithmic blind spots vs. edge cases vs. time-complexity mismatches). This causes repetitive errors, inefficient practice, and stagnant progress on LeetCode.",
      solution:
        "Praxis automates failure diagnostics at the moment of submission through a Chrome extension, executing Bayesian inference to identify the statistical root cause, traversing a PageRank algorithmic knowledge graph to uncover concept gaps, and generating personalized RAG learning pathways powered by Groq LLaMA-3 8B.",
      features: [
        "Real-time LeetCode submission interception via Manifest V3 Chrome Extension service workers",
        "Automated JWT authentication linking extension payloads securely with the full-stack platform",
        "Bayesian inference engine mapping error traces and submission telemetry to underlying conceptual weaknesses",
        "PageRank-based algorithmic knowledge graph highlighting recursive failure nodes and topic dependencies",
        "Groq API (LLaMA-3 8B) RAG pipeline performing semantic search over historical submissions for tailored practice",
        "Interactive React Flow visualization enabling visual exploration of algorithmic blind spots",
        "Production deployment on Vercel delivering sub-second diagnostic query latency",
      ],
      architecture:
        "Dual-component architecture: A client-side TypeScript Manifest V3 Chrome Extension intercepts submission events and passes signed payloads to a Next.js 14 serverless API layer. The backend queries PostgreSQL via Prisma ORM, executes the Bayesian diagnostic engine, computes PageRank weakness weights, and queries vector embeddings via Groq for synthesized recommendations.",
      architecturePipeline: [
        {
          step: "01",
          title: "Submission Interception",
          tech: "Chrome MV3 / TypeScript",
          description:
            "Manifest V3 background service worker captures verdict, runtime, memory, and code telemetry from LeetCode submission DOM events.",
        },
        {
          step: "02",
          title: "Authenticated Gateway",
          tech: "JWT / Next.js 14 API",
          description:
            "Signed cryptographic tokens forward encrypted payloads to serverless Next.js API endpoints with rate limiting.",
        },
        {
          step: "03",
          title: "Bayesian Root-Cause",
          tech: "Probabilistic Inference",
          description:
            "Inference engine calculates posterior probability over failure classes (TLE complexity, corner cases, data structure mismatch).",
        },
        {
          step: "04",
          title: "PageRank Graph Traversal",
          tech: "Directed Graph / React Flow",
          description:
            "Propagates failure weights across prerequisite topic nodes to pinpoint recursive algorithmic knowledge blind spots.",
        },
        {
          step: "05",
          title: "Cited RAG Synthesis",
          tech: "Groq LLaMA-3 8B",
          description:
            "Semantic embeddings retrieve similar solved problems and generate targeted remedial practice plans in sub-second latency.",
        },
      ],
      workflow: [
        "1. User submits code on LeetCode; Manifest V3 service worker captures submission verdict, runtime, memory, and code metadata.",
        "2. Encrypted payload is transmitted via authenticated JWT bearer tokens to the Next.js backend API.",
        "3. Bayesian inference engine computes the probability distribution of root-cause failure categories.",
        "4. PageRank graph algorithm traverses the problem's conceptual graph to identify upstream knowledge gaps.",
        "5. RAG engine retrieves related solved/failed problems and queries Groq LLaMA-3 8B to generate targeted practice recommendations.",
        "6. React Flow graph renders dynamic interactive nodes showing mastery levels, weaknesses, and next-best problems.",
      ],
      contributions: [
        "Designed and implemented the core Bayesian root-cause inference model from raw submission telemetry.",
        "Developed the PageRank knowledge-graph algorithm mapping LeetCode tag hierarchies and failure correlations.",
        "Engineered the Manifest V3 Chrome Extension with asynchronous TypeScript service workers and JWT auth.",
        "Constructed the Groq RAG pipeline with semantic embedding similarity for past submission search.",
        "Architected and deployed the full-stack web application on Vercel with PostgreSQL database schemas.",
      ],
      engineeringNotes: [
        {
          title: "Bayesian Root-Cause Inference",
          content:
            "Modeled submission telemetry (time/memory percentiles, error signatures, problem tags) as evidence variables. The Bayesian network decouples superficial off-by-one boundary bugs from deep asymptotic algorithmic complexity mismatches.",
        },
        {
          title: "PageRank Algorithmic Knowledge Graph",
          content:
            "Represented LeetCode topics and problems as a directed acyclic graph (DAG). Failure propagation via PageRank surfaces root-concept deficits (e.g. inability to identify monotonic queue structures behind DP memoization failures).",
        },
        {
          title: "Sub-Second Groq Inference Pipeline",
          content:
            "Employed Groq LPU acceleration for LLaMA-3 8B to deliver instant diagnostic feedback in < 1.0s, ensuring the diagnostic assistant operates synchronously with the user's active coding workflow.",
        },
      ],
      whatNext: [
        "Multi-Platform Ingestion: expanding the Chrome Extension to capture submissions from Codeforces and AtCoder.",
        "Fine-Tuned Diagnostic LoRA: lightweight specialized weights for offline instant error explanation.",
        "Collaborative Knowledge Graph: synchronized topic mastery boards for university competitive programming clubs.",
      ],
      techCategories: [
        {
          category: "Frontend & Visualization",
          items: ["Next.js 14 (App Router)", "React 18", "TypeScript", "Tailwind CSS", "React Flow", "Framer Motion"],
        },
        {
          category: "Backend & Database",
          items: ["Next.js API Routes", "Prisma ORM", "PostgreSQL", "JWT Authentication", "REST APIs"],
        },
        {
          category: "AI & Inference Algorithms",
          items: ["Groq API", "LLaMA-3 8B", "RAG Pipeline", "Bayesian Inference Engine", "PageRank Algorithm"],
        },
        {
          category: "Client & DevOps",
          items: ["Chrome Extension (Manifest V3)", "Service Workers", "Vercel", "Git/GitHub"],
        },
      ],
    },
  },
  {
    id: "2",
    slug: "nexora",
    title: "NEXORA — Off-Grid Mesh Communication & Emergency Response",
    shortTitle: "NEXORA",
    tagline: "Decentralized P2P Mesh Communication, Offline Maps & Disaster Coordination",
    description:
      "Decentralized peer-to-peer communication, multi-hop messaging, offline maps, and emergency coordination when cellular networks and internet access are unavailable. Features multi-hop message routing with duplicate suppression, delay-tolerant store-and-forward messaging, encrypted messages, signed emergency SOS alert frames, offline map caching with MapLibre, local persistence via Room and SQLite, and delivery-status tracking. Documented 106 passing automated tests. (Roadmap items including double ratchet and internet spool relay are planned).",
    image: "/projects/NEXORA.png",
    tech: [
      "Kotlin",
      "Android SDK",
      "Java 17",
      "Room DB",
      "SQLite",
      "Nearby Connections",
      "Wi-Fi Direct",
      "MapLibre",
      "NanoHTTPD",
      "Material Design 3",
    ],
    details: {
      category: "Decentralized P2P Mesh & Emergency Systems",
      caseStudyNumber: "02",
      targetAudience:
        "Disaster-zone civilians, emergency medical teams, search-and-rescue (SAR) operators, and remote exploration teams operating in cellular blackouts.",
      statusBadge: "106 Documented Passing Tests • Core Implemented",
      metrics: [
        {
          value: "106",
          label: "Passing Automated Tests",
          detail: "Documented JUnit 4/5 and Robolectric test coverage",
        },
        {
          value: "Zero Infrastructure",
          label: "Network Dependency",
          detail: "Fully off-grid P2P mesh via BLE & Wi-Fi Direct sockets",
        },
        {
          value: "Multi-Hop",
          label: "Routing Protocol",
          detail: "Distance-vector routing with TTL & duplicate hash suppression",
        },
        {
          value: "100% Offline",
          label: "Vector Maps",
          detail: "MapLibre Native Android SDK with local MBTiles caching",
        },
      ],
      problem:
        "In disaster-stricken zones, subterranean environments, or remote regions, cellular infrastructure and internet access frequently collapse. First responders and trapped civilians have no reliable, decentralized mechanism to send SOS alerts, coordinate rescue teams, or share offline coordinates.",
      solution:
        "NEXORA turns consumer Android smartphones into an autonomous ad-hoc peer-to-peer mesh network without needing cell towers or satellite uplinks. It provides multi-hop packet forwarding, delay-tolerant store-and-forward buffers, encrypted communications, cryptographically signed SOS alert broadcasts, and offline vector map navigation.",
      features: [
        "Decentralized peer-to-peer mesh networking without dependence on cellular infrastructure or internet",
        "Multi-hop message routing protocol with time-to-live (TTL) counters and duplicate packet suppression",
        "Delay-tolerant store-and-forward mechanism guaranteeing asynchronous message delivery as nodes move in/out of range",
        "Cryptographically signed emergency SOS alert frames with priority broadcast status across the entire mesh",
        "Emergency SOS categorization and search-and-rescue (SAR) coordinate tracking with severity levels",
        "Offline map navigation using MapLibre SDK with local vector tile caching and rescue waypoints",
        "Robust local data persistence engineered with Room Database and SQLite",
        "P2P binary attachment transfer and delivery state tracking (sent, delivered, read)",
        "Documented 106 passing automated tests verifying routing logic, protocol frames, and database persistence",
      ],
      plannedFeatures: [
        "Internet spool relay gateway (syncing queued off-grid messages to the web when any single node discovers internet)",
        "Double Ratchet protocol implementation for forward-secrecy session keys",
        "SQLCipher transparent database encryption for local message stores",
        "On-device ML automated emergency categorization and spam/moderation filter",
      ],
      architecture:
        "Layered native Android architecture: The Physical Layer leverages Google Nearby Connections API and Wi-Fi Direct for zero-config device discovery. The Routing Layer maintains an ad-hoc distance-vector routing table with duplicate suppression tables. The Transport Layer handles packet fragmentation and store-and-forward FIFO queues. The Data Layer persists states in Room/SQLite, while MapLibre and Material 3 power the UI layer.",
      architecturePipeline: [
        {
          step: "01",
          title: "Ad-Hoc Peer Discovery",
          tech: "BLE & Nearby API",
          description:
            "Continuous background beaconing detects adjacent Android nodes and negotiates high-speed Wi-Fi Direct sockets.",
        },
        {
          step: "02",
          title: "Cryptographic Signing",
          tech: "ECDSA / Keystore",
          description:
            "Emergency SOS frames and messages are signed with hardware-backed keys and given immutable packet UUIDs.",
        },
        {
          step: "03",
          title: "Multi-Hop Flooding",
          tech: "Distance-Vector Protocol",
          description:
            "Packets travel across intermediate nodes with TTL decrementing; circular hash ring suppresses duplicate re-broadcasts.",
        },
        {
          step: "04",
          title: "Delay-Tolerant Buffer",
          tech: "Room DB / SQLite FIFO",
          description:
            "If destination is out of radio range, packets are persisted in local SQLite queues until mobile nodes bridge network partitions.",
        },
        {
          step: "05",
          title: "Geospatial Projection",
          tech: "MapLibre Native SDK",
          description:
            "Decodes geographic coordinates from SOS payloads and renders real-time rescue pins on bundled offline MBTiles vector maps.",
        },
      ],
      workflow: [
        "1. Devices discover adjacent peers via Bluetooth Low Energy (BLE) and establish high-speed Wi-Fi Direct sockets.",
        "2. An SOS or text frame is created, signed with the sender's cryptographic key, and given a unique packet UUID.",
        "3. The packet is flooded to nearby peers; intermediate nodes verify the hash to prevent redundant re-broadcasts.",
        "4. If a destination peer is out of radio range, the packet enters the delay-tolerant store-and-forward Room SQLite buffer.",
        "5. When the intermediate node encounters the recipient node later, the pending message buffer is dispatched.",
        "6. Emergency coordinates are decoded and projected onto the offline MapLibre vector tile canvas with SAR pins.",
      ],
      contributions: [
        "Engineered the decentralized peer discovery and connection lifecycle using Nearby Connections & Wi-Fi Direct.",
        "Implemented the multi-hop routing protocol with TTL decrementing and duplicate hash suppression tables.",
        "Designed the delay-tolerant store-and-forward architecture using Room and SQLite.",
        "Integrated MapLibre vector map engine with local MBTiles caching for full offline geospatial rendering.",
        "Authored comprehensive JUnit test suites covering protocol packets and routing algorithms (106 documented passing tests).",
      ],
      engineeringNotes: [
        {
          title: "Delay-Tolerant Store-and-Forward (DTN)",
          content:
            "Engineered persistent FIFO buffer queues in Room/SQLite enabling message delivery across physically partitioned clusters as first responders physically move between disconnected sectors.",
        },
        {
          title: "Duplicate Packet Suppression",
          content:
            "Implemented circular SHA-256 hash sets with sliding window invalidation, ensuring multi-hop floods terminate naturally and do not cause broadcast storms or battery drain.",
        },
        {
          title: "Zero-Internet Offline Geospatial Engine",
          content:
            "Integrated MapLibre Native with bundled local MBTiles vector archives, allowing complete topographical map interaction, waypoint plotting, and distance estimation in total cellular blackouts.",
        },
      ],
      whatNext: [
        "Internet Spool Relay: automatically offloading queued off-grid messages to cloud gateways when any single node discovers connectivity.",
        "Double Ratchet Protocol: signal-grade end-to-end forward secrecy for sensitive emergency coordination channels.",
        "SQLCipher Transparent Encryption: full hardware-accelerated AES-256 encryption for on-device message stores.",
        "On-Device TFLite Triage: automated semantic classification of emergency messages to prioritize critical trauma signals.",
      ],
      techCategories: [
        {
          category: "Core Android Platform",
          items: ["Kotlin", "Android SDK (API 34)", "Java 17", "Gradle", "AndroidX", "Coroutines"],
        },
        {
          category: "Mesh Networking & Sockets",
          items: ["Google Nearby Connections", "Wi-Fi Direct", "NanoHTTPD", "P2P Protocols", "BLE Discovery"],
        },
        {
          category: "Local Persistence & Crypto",
          items: ["Room Database", "SQLite", "Android Keystore", "Cryptographic Signatures (SHA-256/ECDSA)"],
        },
        {
          category: "Mapping & User Interface",
          items: ["MapLibre Native Android SDK", "Material Design 3", "Android Location APIs", "Vector Tiles"],
        },
        {
          category: "Verification & Testing",
          items: ["JUnit 4/5", "Robolectric", "106 Documented Passing Automated Tests"],
        },
      ],
    },
  },
  {
    id: "3",
    slug: "prothexai",
    title: "ProthexAI — Clinical Mobility Platform",
    shortTitle: "ProthexAI",
    tagline: "Clinical Mobility Telemetry, Multi-Target ML Edge Inference & AI Medical Bridge",
    description:
      "Designed a dual-layer architecture separating high-frequency sensor streams from hourly aggregates, enabling sub-50ms edge inference while preserving longitudinal clinical context. Built a multi-target risk pipeline with independent classifiers per physiological domain, decoupling gait, pressure, and skin-integrity failure modes to prevent cross-axis signal contamination. Implemented an AI reasoning bridge grounding probabilistic ML risk scores into plain-language clinical guidance. Automated scheduled PDF report generation with real-time manual-log synchronization, maintaining consistency between clinical snapshots and live dashboard state.",
    image: "/projects/prothexgen-ai.png",
    github: "https://github.com/prem-000/prothexgenai",
    tech: [
      "FastAPI",
      "Python",
      "Motor",
      "MongoDB",
      "Google GenAI SDK",
      "Gemini 1.5 Flash",
      "scikit-learn",
      "ReportLab",
      "APScheduler",
      "D3.js",
    ],
    details: {
      category: "Clinical Mobility & Real-Time ML Inference",
      caseStudyNumber: "03",
      targetAudience:
        "Orthopedic prosthetists, rehabilitation clinicians, and lower-limb amputees needing continuous real-time telemetry to prevent stump skin breakdown and gait degeneration.",
      statusBadge: "Production Pipeline • Open Source",
      metrics: [
        {
          value: "< 50ms",
          label: "Edge Inference Latency",
          detail: "Sub-50ms classification on streaming high-frequency sensor packets",
        },
        {
          value: "3 Decoupled",
          label: "Target Classifiers",
          detail: "Zero cross-axis signal contamination across gait, pressure, and skin",
        },
        {
          value: "Gemini 1.5 Flash",
          label: "Clinical Reasoning",
          detail: "Prompt-engineered reasoning bridge translating ML matrices into notes",
        },
        {
          value: "Automated",
          label: "ReportLab PDFs",
          detail: "Scheduled generation synchronized with live MongoDB clinical state",
        },
      ],
      problem:
        "Lower-limb prosthetic users face acute clinical risks including stump pressure sores, gait biomechanical imbalances, and skin breakdown. Traditional clinical assessments rely on infrequent in-clinic visits, while raw wearable sensor data overwhelms clinicians with millions of uninterpreted time-series data points.",
      solution:
        "ProthexAI provides an end-to-end clinical mobility platform that ingests high-frequency prosthetic telemetry, runs independent scikit-learn edge classifiers across distinct physiological domains to eliminate cross-signal contamination, and employs Google Gemini 1.5 Flash as an AI reasoning bridge to convert ML probability matrices into actionable clinical guidance and scheduled ReportLab PDF reports.",
      features: [
        "Dual-layer telemetry pipeline separating sub-50ms high-frequency sensor streams from longitudinal hourly aggregates",
        "Multi-target risk pipeline with decoupled classifiers for gait symmetry, socket pressure, and skin integrity",
        "Zero cross-axis signal contamination by isolating biomechanical and dermatological failure modes",
        "AI reasoning bridge using Google Gemini 1.5 Flash to ground probabilistic ML vectors into clinical notes",
        "Automated scheduled PDF report generation with ReportLab, synchronized with real-time clinician manual logs",
        "High-throughput asynchronous ingestion powered by FastAPI and Motor async MongoDB driver",
        "Interactive D3.js telemetry dashboard visualizing pressure distribution and gait cycle waveforms",
      ],
      architecture:
        "The system features an Asynchronous Ingestion Layer (FastAPI + Motor) handling sensor streams; an Edge Machine Learning Layer running independent scikit-learn random forest and gradient-boosted classifiers; an AI Reasoning Bridge powered by Google GenAI SDK (Gemini 1.5 Flash) with clinical prompt guardrails; and an Automated Reporting Engine (APScheduler + ReportLab) with MongoDB persistence.",
      architecturePipeline: [
        {
          step: "01",
          title: "Socket Telemetry Ingestion",
          tech: "FastAPI / Motor Async",
          description:
            "Ingests continuous multi-axis pressure, accelerometer, and thermal readings at high sampling frequency.",
        },
        {
          step: "02",
          title: "Sliding Window Aggregation",
          tech: "NumPy / Pandas Engine",
          description:
            "Buffers streaming packets into rolling statistical windows for real-time stance-phase biomechanical extraction.",
        },
        {
          step: "03",
          title: "Decoupled Edge Inference",
          tech: "scikit-learn Ensemble",
          description:
            "Executes 3 independent classifiers (gait asymmetry, peak socket pressure, skin shear) in < 50ms without cross-contamination.",
        },
        {
          step: "04",
          title: "AI Clinical Bridge",
          tech: "Gemini 1.5 Flash / GenAI",
          description:
            "Translates multidimensional probability vectors and risk thresholds into plain-language clinical adjustment recommendations.",
        },
        {
          step: "05",
          title: "Reporting & Visualization",
          tech: "ReportLab & D3.js",
          description:
            "APScheduler triggers medical PDF generation while D3.js updates live pressure-map heatmaps for attending clinicians.",
        },
      ],
      workflow: [
        "1. Wearable socket sensors stream multi-axis pressure, accelerometer, and temperature data to FastAPI endpoints.",
        "2. Edge ingestion layer buffers high-frequency packets and computes sliding-window biomechanical metrics.",
        "3. Scikit-learn multi-target classifiers independently score gait asymmetry, peak pressure, and friction risks.",
        "4. The AI Reasoning Bridge packages risk matrices into clinical context prompts for Gemini 1.5 Flash.",
        "5. Gemini generates structured clinical guidance, identifying risk factors and recommending prosthetic alignment adjustments.",
        "6. APScheduler triggers ReportLab to render formal medical PDF summaries while D3.js updates live telemetry charts.",
      ],
      contributions: [
        "Architected the dual-layer data pipeline achieving sub-50ms inference latency on streaming telemetry.",
        "Developed and trained the independent multi-target classification pipelines in scikit-learn.",
        "Engineered the Google GenAI (Gemini 1.5 Flash) clinical prompt reasoning bridge with structured JSON outputs.",
        "Built the asynchronous Motor/MongoDB database persistence layer and REST API endpoints in FastAPI.",
        "Implemented the automated ReportLab PDF generation engine with dynamic charts and log synchronization.",
      ],
      engineeringNotes: [
        {
          title: "Dual-Layer Temporal Architecture",
          content:
            "Separated sub-50ms edge inference loops from hourly aggregate historical rollups. This ensures critical pressure alerts trigger instantaneously while maintaining compact longitudinal records for long-term clinical progression.",
        },
        {
          title: "Decoupled Domain Classifiers",
          content:
            "Monolithic multi-class models often conflate biomechanical limp indicators with localized pressure peaks. Decoupling into independent scikit-learn classifiers completely eliminated cross-axis signal contamination.",
        },
        {
          title: "Structured Gemini 1.5 Reasoning Bridge",
          content:
            "Implemented strict JSON schema enforcement via Google GenAI SDK. Gemini receives quantified feature matrices and outputs categorized clinical findings with alignment recommendations, entirely eliminating diagnostic hallucinations.",
        },
      ],
      whatNext: [
        "Markerless Gait Lab Sync: multi-camera computer vision validation correlating sensor telemetry with 3D joint angles.",
        "Quantized TFLite Edge Deployment: running classifiers directly on low-power prosthetic embedded microcontrollers.",
        "HL7/FHIR EHR Integration: direct bidirectional sync with hospital electronic health record systems.",
      ],
      techCategories: [
        {
          category: "Backend & Microservices",
          items: ["FastAPI", "Python 3.11", "Motor (Async Driver)", "Uvicorn", "RESTful APIs", "Pydantic"],
        },
        {
          category: "Machine Learning & AI",
          items: ["scikit-learn", "Google GenAI SDK", "Gemini 1.5 Flash", "NumPy", "Pandas", "Feature Engineering"],
        },
        {
          category: "Database & Scheduling",
          items: ["MongoDB", "Motor", "APScheduler", "AsyncIO", "Time-Series Aggregations"],
        },
        {
          category: "Reporting & Visualization",
          items: ["ReportLab", "D3.js", "Automated PDF Generation", "Canvas/SVG Telemetry Graphs"],
        },
      ],
    },
  },
  {
    id: "4",
    slug: "research-agent",
    title: "Multi-Source Research & Project Agent",
    shortTitle: "Research Agent",
    tagline: "Specialist Research Agent Architecture, Verification Pipeline & Cited Synthesis",
    description:
      "AI-powered research assistant architecture designed to route user inquiries to specialized source agents, verify retrieved findings, and synthesize answers with inline citations. Designed with intent classification across study, project, technical, and trending domains; modular agents for literature, repositories, and technical documentation; startup-time API key validation; source-level caching; result verification for quality and relevance; and ChromaDB vector embeddings with LLM synthesis.",
    image: "/projects/Research-Dashboard.png",
    tech: [
      "FastAPI",
      "Python",
      "Groq API",
      "Pydantic Settings",
      "HTTPX",
      "ChromaDB",
      "GitHub API",
      "Tavily Search",
      "arXiv API",
      "Semantic Scholar",
    ],
    details: {
      category: "Multi-Agent Architectures & Verified Synthesis",
      caseStudyNumber: "04",
      targetAudience:
        "Software engineers, AI researchers, and technical architects conducting literature reviews, repository discovery, and architectural feasibility studies without hallucinated citations.",
      statusBadge: "System Specification & Architectural Design",
      metrics: [
        {
          value: "4 Domains",
          label: "Specialist Source Agents",
          detail: "arXiv, Semantic Scholar, GitHub REST, and Tavily Web",
        },
        {
          value: "ChromaDB",
          label: "Vector Embeddings",
          detail: "Persistent semantic embeddings with cosine similarity retrieval",
        },
        {
          value: "100%",
          label: "URL Verification",
          detail: "HTTP reachability & content-density quality pipeline filter",
        },
        {
          value: "Zero Crash",
          label: "Startup Validation",
          detail: "Pydantic Settings failsafe environment initialization",
        },
      ],
      problem:
        "Technical researchers, engineers, and students need to synthesize information from diverse sources (academic papers, GitHub codebases, official documentation, web benchmarks). Manually cross-referencing causes tab overload, hallucinations, and outdated or dead links.",
      solution:
        "An architectural specification and working system design for a multi-source research agent. It intelligently categorizes user prompts via an intent classifier, dispatches queries to specialist domain agents, verifies content reachability and quality, stores embeddings in ChromaDB, and synthesizes answers with inline academic/technical citations.",
      features: [
        "Intent classification module routing questions into study, project, technical, trending, or general research",
        "Specialist research agents: Academic Literature Agent (arXiv, Semantic Scholar), Repository Discovery Agent (GitHub REST API), Documentation Agent, and General Web Agent (Tavily)",
        "Startup-time environment and API key validation ensuring zero unhandled runtime missing-credential crashes",
        "Multi-tier query-level and source-level in-memory caching to eliminate redundant API requests and reduce token costs",
        "Per-agent result verification pipeline checking HTTP reachability, content density, and semantic relevance",
        "Chunking, vector embeddings, and persistent semantic storage using ChromaDB",
        "Groq-accelerated LLM synthesis producing structured answers with inline citations and verifiable URLs",
        "FastAPI microservice backend paired with a lightweight, responsive JavaScript dashboard",
      ],
      architecture:
        "Modular hub-and-spoke multi-agent system: FastAPI orchestrates the request lifecycle. The Intent Classifier identifies query domain. Dispatched worker agents execute asynchronous HTTPX calls to arXiv, Semantic Scholar, GitHub, and Tavily APIs. A Verification Engine filters failed links and low-signal responses. Validated snippets are embedded and stored in ChromaDB, then fed to Groq LLM for cited synthesis.",
      architecturePipeline: [
        {
          step: "01",
          title: "Intent Classification",
          tech: "FastAPI / Domain Routing",
          description:
            "Deconstructs research prompts into academic, codebase, or web search intents and resolves parameters.",
        },
        {
          step: "02",
          title: "Multi-Tier Caching",
          tech: "In-Memory LRU Cache",
          description:
            "Checks query-level and source-level cached responses to eliminate redundant external API requests and token costs.",
        },
        {
          step: "03",
          title: "Concurrent Dispatch",
          tech: "Async HTTPX Pool",
          description:
            "Forks asynchronous workers across arXiv, Semantic Scholar, GitHub REST, and Tavily web endpoints simultaneously.",
        },
        {
          step: "04",
          title: "Verification Pipeline",
          tech: "Content Quality Filter",
          description:
            "Validates HTTP 200 response codes, content density, and removes dead links before embedding into ChromaDB.",
        },
        {
          step: "05",
          title: "Cited Synthesis",
          tech: "Groq LLaMA-3 / ChromaDB",
          description:
            "Vector embeddings ground LLM generation, outputting structured technical responses with numbered inline citations.",
        },
      ],
      workflow: [
        "1. User submits research inquiry via the dashboard interface.",
        "2. Intent classifier analyzes the prompt and determines which specialist agents to activate.",
        "3. The system checks query-level and source-level caches for recent valid responses.",
        "4. Specialist agents fetch candidate documents from arXiv, Semantic Scholar, GitHub, and Tavily concurrently via HTTPX.",
        "5. Verification engine evaluates link status codes, content quality thresholds, and relevance scores.",
        "6. Valid documents are chunked and embedded in ChromaDB vector store.",
        "7. Groq LLM synthesizes a unified technical answer with numbered inline citations linked to verified URLs.",
      ],
      contributions: [
        "Authored the multi-source research agent architecture and system specification.",
        "Designed the specialist agent routing logic, intent taxonomy, and verification pipeline.",
        "Implemented the FastAPI backend structure, Pydantic settings validation, and caching abstractions.",
        "Engineered the asynchronous HTTPX client connectors for arXiv, Semantic Scholar, and GitHub APIs.",
        "Designed the ChromaDB embedding retrieval schema and cited prompt synthesis templates.",
      ],
      engineeringNotes: [
        {
          title: "Intent Taxonomy & Routing",
          content:
            "Formulated an intent routing engine that discriminates between mathematical/theoretical questions (routing to arXiv/Semantic Scholar) versus implementation queries (routing to GitHub repositories and Tavily technical docs).",
        },
        {
          title: "Pre-Embedding Quality Gate",
          content:
            "Engineered a strict verification filter ensuring unreachable endpoints, paywalled abstracts, and low-density snippets are filtered prior to vectorization, preventing hallucination during synthesis.",
        },
        {
          title: "Failsafe Configuration Bootstrapping",
          content:
            "Leveraged Pydantic BaseSettings with strict startup validation, ensuring all agent credentials, rate limits, and cache TTL parameters are validated at container startup rather than failing during live research sessions.",
        },
      ],
      whatNext: [
        "Autonomous Self-Critique Agent: secondary agent scoring cited claim coherence and identifying disputed literature findings.",
        "Local Air-Gapped LLM Fallback: integrated Ollama backend for private, offline enterprise research workflows.",
        "Interactive Citation Graph: visual export of discovered papers and repositories into a dynamic knowledge graph.",
      ],
      techCategories: [
        {
          category: "Backend & Orchestration",
          items: ["FastAPI", "Python 3.11", "Pydantic Settings", "HTTPX (Async Client)", "Uvicorn", "AsyncIO"],
        },
        {
          category: "LLM & Vector Storage",
          items: ["Groq API (LLaMA-3)", "ChromaDB", "Vector Embeddings", "Prompt Engineering", "Citation Engine"],
        },
        {
          category: "External Data APIs",
          items: ["arXiv API", "Semantic Scholar API", "GitHub REST API", "Tavily Search API"],
        },
        {
          category: "Performance & Utilities",
          items: ["In-Memory Caching", "URL Verification Pipeline", "JavaScript", "HTML5/CSS3"],
        },
      ],
    },
  },
];
