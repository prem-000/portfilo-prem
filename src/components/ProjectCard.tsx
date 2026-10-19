"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PortfolioItem } from "@/data/types";
import { portfolioItems } from "@/data/portfolio";

interface ProjectCardProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onViewProject?: (item: PortfolioItem) => void;
  onSelectProject?: (item: PortfolioItem) => void;
}

const allTech = Array.from(new Set(portfolioItems.flatMap((p) => p.tech)));

function IdleState({
  onSelectProject,
}: {
  onSelectProject?: (item: PortfolioItem) => void;
}) {
  return (
    <motion.div
      key="idle"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md space-y-3 md:space-y-6"
    >
      {/* Prompt */}
      <div className="flex flex-col items-center gap-2 md:gap-3 text-center">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            className="w-7 h-7 md:w-9 md:h-9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="url(#idleGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <defs>
              <linearGradient id="idleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
          </svg>
        </motion.div>
        <p className="text-xs md:text-sm text-zinc-400 tracking-wide">
          <span className="hidden md:inline">
            Click a sphere face or a project below to explore
          </span>
          <span className="md:hidden">Tap a sphere face or project to explore</span>
        </p>
      </div>

      {/* Project previews */}
      <div className="space-y-2 md:space-y-2.5">
        {portfolioItems.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
            onClick={() => onSelectProject?.(project)}
            className="rounded-lg md:rounded-xl p-3 md:p-3.5 transition-all duration-300 cursor-pointer hover:border-violet-500/40 hover:bg-white/[0.04] group"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center gap-2.5 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden shrink-0 bg-black/40 border border-white/10 group-hover:border-violet-400/30 transition-colors">
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs md:text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors truncate">
                    {project.title}
                  </h4>
                  <span className="text-[10px] text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    Select →
                  </span>
                </div>
                <p className="text-[10px] md:text-xs text-zinc-500 mt-0.5 line-clamp-1">
                  {project.tagline || project.description}
                </p>
              </div>
              <div className="hidden lg:flex gap-1 shrink-0">
                {project.tech.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="px-1.5 py-0.5 text-[9px] rounded-full"
                    style={{
                      background: "rgba(139, 92, 246, 0.1)",
                      border: "1px solid rgba(139, 92, 246, 0.15)",
                      color: "#a78bfa",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tech cloud */}
      <div>
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2 font-medium">
          Technologies
        </p>
        <div className="flex flex-wrap gap-1 md:gap-1.5">
          {allTech.slice(0, 14).map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.03, duration: 0.3 }}
              className="px-2 md:px-2.5 py-0.5 md:py-1 text-[9px] md:text-[10px] rounded-full"
              style={{
                background: "rgba(139, 92, 246, 0.08)",
                border: "1px solid rgba(139, 92, 246, 0.15)",
                color: "#c4b5fd",
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div
        className="flex items-center justify-around rounded-lg md:rounded-xl py-2.5 md:py-3"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="text-center">
          <div className="text-base md:text-lg font-bold text-violet-400">
            {portfolioItems.length}
          </div>
          <div className="text-[8px] md:text-[10px] text-zinc-500 uppercase tracking-wider">
            Featured Projects
          </div>
        </div>
        <div
          className="w-px h-6 md:h-8"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        <div className="text-center">
          <div className="text-base md:text-lg font-bold text-cyan-400">
            {allTech.length}
          </div>
          <div className="text-[8px] md:text-[10px] text-zinc-500 uppercase tracking-wider">
            Technologies
          </div>
        </div>
        <div
          className="w-px h-6 md:h-8"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        <div className="text-center">
          <div className="text-base md:text-lg font-bold text-emerald-400">
            {portfolioItems.filter((p) => p.github).length}
          </div>
          <div className="text-[8px] md:text-[10px] text-zinc-500 uppercase tracking-wider">
            Open Source
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectCard({
  item,
  onClose,
  onViewProject,
  onSelectProject,
}: ProjectCardProps) {
  return (
    <AnimatePresence mode="wait">
      {item ? (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              boxShadow:
                "0 0 60px rgba(139, 92, 246, 0.18), 0 0 120px rgba(34, 211, 238, 0.06)",
            }}
          >
            {/* Project Image Header */}
            <div
              className="h-32 sm:h-40 md:h-44 w-full flex items-center justify-center relative overflow-hidden bg-black/60"
            >
              <img
                src={item.image}
                alt={`${item.title} project screenshot`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 40%, rgba(7,7,7,0.85) 100%)",
                }}
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide border border-emerald-500/30 bg-black/60 backdrop-blur-md text-emerald-400">
                {item.details?.statusBadge || "Active Project"}
              </span>
            </div>

            <div className="p-4 sm:p-5 md:p-6 space-y-3">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                {item.tagline && (
                  <p className="text-[11px] sm:text-xs text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 font-medium mt-0.5">
                    {item.tagline}
                  </p>
                )}
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-3">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {item.tech.slice(0, 6).map((t) => (
                  <span
                    key={t}
                    className="px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs rounded-full font-medium"
                    style={{
                      background: "rgba(139, 92, 246, 0.15)",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      color: "#c4b5fd",
                    }}
                  >
                    {t}
                  </span>
                ))}
                {item.tech.length > 6 && (
                  <span className="px-2 py-0.5 text-[10px] sm:text-xs rounded-full text-zinc-500 bg-white/[0.04] border border-white/10">
                    +{item.tech.length - 6} more
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-2">
                {/* View Project Button */}
                <button
                  onClick={() => onViewProject?.(item)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 shadow-[0_0_20px_rgba(139,92,246,0.3)] border border-violet-400/40 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                >
                  <span>View Project</span>
                  <svg
                    className="w-3.5 h-3.5 text-cyan-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>

                {item.github && (
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#e2e8f0",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="sm:w-4 sm:h-4"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                )}
                {item.live && (
                  <a
                    href={item.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(34,211,238,0.3))",
                      border: "1px solid rgba(139, 92, 246, 0.4)",
                      color: "#e2e8f0",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="sm:w-4 sm:h-4"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live
                  </a>
                )}
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
              }}
              aria-label="Close project preview"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="sm:w-3.5 sm:h-3.5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </motion.div>
      ) : (
        <IdleState onSelectProject={onSelectProject} />
      )}
    </AnimatePresence>
  );
}
