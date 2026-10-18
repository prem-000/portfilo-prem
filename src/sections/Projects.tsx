"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const SoccerBallScene = dynamic(
  () => import("@/components/SoccerBallScene"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
      </div>
    ),
  }
);

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 mb-8"
        >
          <div className="px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5">
            <span className="text-xs uppercase tracking-[0.3em] text-cyan-400">
            Projects
            </span>
          </div>

          <h2 className="text-center text-4xl md:text-5xl font-semibold text-white">
            Featured Ones
          </h2>
        </motion.div>
      </div>

      {/* Soccer Ball Scene */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <SoccerBallScene />
      </motion.div>
    </section>
  );
}
