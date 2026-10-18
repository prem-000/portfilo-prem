"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PortfolioItem } from "@/data/types";
import { portfolioItems } from "@/data/portfolio";

interface ProjectCardProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

const allTech = Array.from(new Set(portfolioItems.flatMap((p) => p.tech)));

function IdleState() {
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
        <p className="text-xs md:text-sm text-zinc-500 tracking-wide">
          <span className="hidden md:inline">
            Click a face on the ball to explore
          </span>
          <span className="md:hidden">Tap a face to explore</span>
        </p>
      </div>

      {/* Project previews */}
      <div className="space-y-2 md:space-y-3">
        {portfolioItems.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
            className="rounded-lg md:rounded-xl p-3 md:p-4"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center gap-2.5 md:gap-3">
              <div
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0 text-sm md:text-lg font-bold text-white/20"
                
              >
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs md:text-sm font-semibold text-zinc-300">
                  {project.title}
                </h4>
                <p className="text-[10px] md:text-xs text-zinc-600 mt-0.5 line-clamp-1">
                  {project.description}
                </p>
              </div>
              <div className="hidden md:flex gap-1">
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
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-2">
          Tech Stack
        </p>
        <div className="flex flex-wrap gap-1 md:gap-1.5">
          {allTech.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.04, duration: 0.3 }}
              className="px-2 md:px-2.5 py-0.5 md:py-1 text-[9px] md:text-[10px] rounded-full"
              style={{
                background: "rgba(139, 92, 246, 0.08)",
                border: "1px solid rgba(139, 92, 246, 0.15)",
                color: "#a78bfa",
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
          <div className="text-[8px] md:text-[10px] text-zinc-600 uppercase tracking-wider">
            Projects
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
          <div className="text-[8px] md:text-[10px] text-zinc-600 uppercase tracking-wider">
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
          <div className="text-[8px] md:text-[10px] text-zinc-600 uppercase tracking-wider">
            Open Source
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectCard({ item, onClose }: ProjectCardProps) {
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
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              boxShadow:
                "0 0 60px rgba(139, 92, 246, 0.15), 0 0 120px rgba(34, 211, 238, 0.05)",
            }}
          >
            <div
              className="h-28 sm:h-36 md:h-44 w-full flex items-center justify-center relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(34,211,238,0.1) 100%)",
              }}
            >
              <div className="text-5xl sm:text-6xl font-bold text-white select-none">
                <img
                  src={item.image}
                  alt={`${item.title} project screenshot`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 50%, rgba(7,7,7,0.8) 100%)",
                }}
              />
            </div>

            <div className="p-4 sm:p-5 md:p-6 space-y-2.5 sm:space-y-3">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3 sm:line-clamp-none">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {item.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full"
                    style={{
                      background: "rgba(139, 92, 246, 0.15)",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      color: "#c4b5fd",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 sm:gap-3 pt-1 sm:pt-2">
                {item.github && (
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
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
                    className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105"
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
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
              }}
              aria-label="Close project details"
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
        <IdleState />
      )}
    </AnimatePresence>
  );
}
