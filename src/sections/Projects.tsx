"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { PortfolioItem } from "@/data/types";
import { portfolioItems } from "@/data/portfolio";
import ProjectDetailView from "@/components/ProjectDetailView";

const SoccerBallScene = dynamic(
  () => import("@/components/SoccerBallScene"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full flex items-center justify-center min-h-[450px]">
        <div className="w-12 h-12 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
      </div>
    ),
  }
);

export function Projects() {
  const [activeDetailProject, setActiveDetailProject] = useState<PortfolioItem | null>(null);

  // Sync with URL hash on client mount and browser back / forward navigation
  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (!hash) {
        setActiveDetailProject(null);
      } else {
        const found = portfolioItems.find(
          (p) => p.slug.toLowerCase() === hash || p.id === hash
        );
        setActiveDetailProject(found || null);
      }
    };

    // Run once on client mount post-hydration
    syncHash();

    window.addEventListener("popstate", syncHash);
    return () => window.removeEventListener("popstate", syncHash);
  }, []);

  const handleOpenDetail = (project: PortfolioItem) => {
    setActiveDetailProject(project);
    if (typeof window !== "undefined") {
      window.history.pushState({ project: project.slug }, "", `#${project.slug}`);
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCloseDetail = () => {
    setActiveDetailProject(null);
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  return (
    <section id="projects" className="relative overflow-hidden py-16 md:py-24">
      {/* Permanent Header — Stays visible regardless of view state */}
      <div className="max-w-7xl mx-auto px-4 relative z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 mb-8 md:mb-12"
        >
          <div className="px-3.5 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm">
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-cyan-400 font-medium">
              Projects
            </span>
          </div>

          <h2 className="text-center text-4xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-display)] tracking-tight">
            Featured Ones
          </h2>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 w-full max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeDetailProject ? (
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectDetailView
                project={activeDetailProject}
                onClose={handleCloseDetail}
                onSelectProject={(p) => {
                  setActiveDetailProject(p);
                  if (typeof window !== "undefined") {
                    window.history.pushState({ project: p.slug }, "", `#${p.slug}`);
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="sphere-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <SoccerBallScene
                onViewProject={handleOpenDetail}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
