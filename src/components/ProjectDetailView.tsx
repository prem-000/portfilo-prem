"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortfolioItem } from "@/data/types";
import { portfolioItems } from "@/data/portfolio";

interface ProjectDetailViewProps {
  project: PortfolioItem;
  onClose: () => void;
  onSelectProject: (p: PortfolioItem) => void;
}

const SECTIONS = [
  { id: "overview", label: "Overview", num: "01" },
  { id: "problem-solution", label: "Problem & Solution", num: "02" },
  { id: "features", label: "Key Features", num: "03" },
  { id: "architecture", label: "Architecture", num: "04" },
  { id: "technologies", label: "Tech Stack", num: "05" },
  { id: "screenshots", label: "Screenshots", num: "06" },
  { id: "engineering", label: "Engineering Details", num: "07" },
  { id: "roadmap", label: "What's Next", num: "08" },
];

export default function ProjectDetailView({
  project,
  onClose,
  onSelectProject,
}: ProjectDetailViewProps) {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation: Escape closes modal or view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedImage) {
          setSelectedImage(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, selectedImage]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(`section-${id}`);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [project.id]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      const yOffset = -90;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const category =
    project.details.category || "Engineering & Algorithmic Systems";
  const caseNumber = project.details.caseStudyNumber || `0${project.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-zinc-300 font-[family-name:var(--font-inter)]"
    >
      {/* Top Header / Sticky Navigation Bar */}
      <div className="sticky top-20 z-40 mb-6 backdrop-blur-xl bg-[#090510]/85 border border-white/10 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] px-4 py-3 sm:px-6 sm:py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Back Button */}
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium text-white/90 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-400/50 hover:text-white transition-all cursor-pointer group"
        >
          <svg
            className="w-4 h-4 text-violet-400 group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="font-[family-name:var(--font-mono)] text-xs tracking-wider uppercase">
            Back to 3D Sphere
          </span>
        </button>

        {/* Project Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-zinc-500 hidden sm:inline mr-1">
            Case Studies:
          </span>
          {portfolioItems.map((item) => {
            const isActive = item.id === project.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectProject(item)}
                className={`px-3 py-1.5 rounded-lg text-xs font-[family-name:var(--font-mono)] transition-all cursor-pointer ${
                  isActive
                    ? "bg-violet-600/30 border border-violet-400/60 text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] font-semibold"
                    : "bg-white/[0.03] border border-white/10 text-white/60 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                0{item.id} {item.shortTitle}
              </button>
            );
          })}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close case study"
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/15 text-white/70 hover:text-white hover:bg-white/10 hover:scale-105 transition-all cursor-pointer"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Main Container */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(14,8,22,0.96)_0%,rgba(8,4,13,0.98)_100%)] backdrop-blur-2xl shadow-[0_0_80px_rgba(139,92,246,0.14)] p-5 sm:p-8 md:p-12">
        {/* =========================================================================
            PROJECT HERO
            ========================================================================= */}
        <div id="section-hero" className="border-b border-white/10 pb-12 mb-12">
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 font-[family-name:var(--font-mono)] text-xs">
            <div className="flex items-center gap-3">
              <span className="text-violet-400 uppercase tracking-widest font-semibold">
                CASE STUDY № {caseNumber}
              </span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400 uppercase tracking-wider hidden sm:inline">
                {category}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {project.details.statusBadge}
              </span>
            </div>
          </div>

          {/* Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Title, Tagline, Actions, Metrics */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.08]">
                {project.title}
              </h1>

              <p className="font-[family-name:var(--font-serif)] text-lg sm:text-xl md:text-2xl italic text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 leading-snug">
                {project.tagline}
              </p>

              <p className="text-sm sm:text-base text-zinc-300/90 leading-relaxed max-w-2xl">
                {project.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {project.github && project.github.startsWith("http") && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 border border-violet-400/30 shadow-[0_0_25px_rgba(139,92,246,0.25)] transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>View GitHub Source</span>
                    <svg
                      className="w-3.5 h-3.5 text-cyan-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                )}

                {project.live && project.live.startsWith("http") && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white/90 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>Live Interactive Demo</span>
                    <svg
                      className="w-3.5 h-3.5 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>

              {/* Verified Metrics Row */}
              {project.details.metrics && project.details.metrics.length > 0 && (
                <div className="pt-6 border-t border-white/[0.08]">
                  <div className="text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-zinc-500 mb-3">
                    // Key Engineering Metrics &amp; Benchmarks
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {project.details.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-violet-500/30 transition-colors"
                      >
                        <div className="font-[family-name:var(--font-mono)] text-base sm:text-lg font-bold text-white tracking-tight">
                          {metric.value}
                        </div>
                        <div className="text-[11px] font-medium text-violet-400 uppercase tracking-wider mt-0.5">
                          {metric.label}
                        </div>
                        {metric.detail && (
                          <div className="text-[10px] text-zinc-400 mt-1 leading-snug">
                            {metric.detail}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Large Natural Screenshot Frame */}
            <div className="lg:col-span-5">
              <div
                onClick={() => setSelectedImage(project.image)}
                className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/70 shadow-[0_0_60px_rgba(139,92,246,0.18)] group cursor-zoom-in transition-all duration-300 hover:border-violet-400/40"
              >
                {/* Image Window Header */}
                <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.03] border-b border-white/10 font-[family-name:var(--font-mono)] text-[11px] text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="truncate max-w-[200px]">
                    {project.slug}.screenshot
                  </span>
                  <span className="text-violet-400 text-[10px] uppercase tracking-wider">
                    Click to Zoom
                  </span>
                </div>

                {/* Screenshot Container */}
                <div className="p-3 sm:p-4 bg-gradient-to-b from-black/80 to-[#0e0717]/90 flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto max-h-[380px] object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Screenshot Caption Footer */}
                <div className="px-4 py-2.5 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-[11px] font-[family-name:var(--font-mono)] text-zinc-400">
                  <span className="text-zinc-500">Live Application View</span>
                  <span className="text-violet-400">Verified Asset</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            EDITORIAL BODY: STICKY SIDEBAR + CONTENT
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Desktop Left Sticky Navigation Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-36 space-y-6">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <div className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-zinc-500 mb-3.5">
                // Case Study Sections
              </div>
              <nav className="space-y-1">
                {SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-[family-name:var(--font-mono)] transition-all cursor-pointer text-left ${
                        isActive
                          ? "bg-violet-600/20 border border-violet-400/40 text-white font-semibold shadow-[0_0_15px_rgba(139,92,246,0.25)]"
                          : "text-zinc-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span
                          className={`text-[10px] ${
                            isActive ? "text-violet-400 font-bold" : "text-zinc-600"
                          }`}
                        >
                          {sec.num}
                        </span>
                        <span>{sec.label}</span>
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_#a78bfa]" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Context Card */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-xs font-[family-name:var(--font-mono)] space-y-3">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500">
                // System Summary
              </div>
              <div className="text-zinc-300">
                <span className="text-zinc-500 block text-[10px] uppercase">
                  Primary Stack:
                </span>
                <span className="text-violet-300 font-medium">
                  {project.tech.slice(0, 3).join(" • ")}
                </span>
              </div>
              <div className="text-zinc-300">
                <span className="text-zinc-500 block text-[10px] uppercase">
                  Deployment / Status:
                </span>
                <span className="text-emerald-400">
                  {project.details.statusBadge}
                </span>
              </div>
            </div>
          </aside>

          {/* Mobile Horizontal Sticky Subnav */}
          <div className="lg:hidden col-span-1 sticky top-36 z-30 -mx-2 px-2 py-2 mb-4 bg-[#090510]/95 backdrop-blur-md border-y border-white/10 flex overflow-x-auto gap-2 no-scrollbar">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-[family-name:var(--font-mono)] shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? "bg-violet-600/30 border border-violet-400/50 text-white font-semibold"
                      : "bg-white/[0.03] border border-white/10 text-zinc-400"
                  }`}
                >
                  {sec.num} {sec.label}
                </button>
              );
            })}
          </div>

          {/* Main Case Study Editorial Content */}
          <div ref={contentRef} className="lg:col-span-9 space-y-16">
            {/* =========================================================================
                SECTION 01: OVERVIEW
                ========================================================================= */}
            <section id="section-overview" className="scroll-mt-36 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <span className="font-[family-name:var(--font-mono)] text-xs text-violet-400 font-semibold tracking-widest uppercase">
                  01 // Overview
                </span>
                <span className="text-zinc-600 font-[family-name:var(--font-mono)] text-xs">
                  /
                </span>
                <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-white font-normal">
                  Executive Summary &amp; Purpose
                </h2>
              </div>

              <div className="prose prose-invert max-w-none space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-[family-name:var(--font-inter)]">
                <p>{project.description}</p>
              </div>

              {/* Target Audience & Engineering Motive Card */}
              {project.details.targetAudience && (
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-violet-500/20 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 blur-3xl pointer-events-none" />
                  <div className="text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-violet-400 font-semibold mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                    Target Stakeholders &amp; End Users
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {project.details.targetAudience}
                  </p>
                </div>
              )}
            </section>

            {/* =========================================================================
                SECTION 02: PROBLEM AND SOLUTION
                ========================================================================= */}
            <section
              id="section-problem-solution"
              className="scroll-mt-36 space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <span className="font-[family-name:var(--font-mono)] text-xs text-violet-400 font-semibold tracking-widest uppercase">
                  02 // Problem &amp; Solution
                </span>
                <span className="text-zinc-600 font-[family-name:var(--font-mono)] text-xs">
                  /
                </span>
                <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-white font-normal">
                  The Technical Challenge &amp; Resolution
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* The Problem Panel */}
                <div className="rounded-2xl p-6 bg-gradient-to-b from-amber-500/[0.04] to-transparent border border-amber-500/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 blur-2xl pointer-events-none" />
                  <div className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-amber-400 mb-3 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    The Inefficiency &amp; Problem
                  </div>
                  <h3 className="font-[family-name:var(--font-serif)] text-xl text-white font-normal mb-3">
                    Status Quo Bottlenecks
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {project.details.problem}
                  </p>
                </div>

                {/* The Engineered Solution Panel */}
                <div className="rounded-2xl p-6 bg-gradient-to-b from-cyan-500/[0.04] to-transparent border border-cyan-500/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 blur-2xl pointer-events-none" />
                  <div className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-cyan-400 mb-3 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    The Engineered Solution
                  </div>
                  <h3 className="font-[family-name:var(--font-serif)] text-xl text-white font-normal mb-3">
                    Architectural Resolution
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {project.details.solution}
                  </p>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 03: KEY FEATURES
                ========================================================================= */}
            <section id="section-features" className="scroll-mt-36 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <span className="font-[family-name:var(--font-mono)] text-xs text-violet-400 font-semibold tracking-widest uppercase">
                  03 // Key Features
                </span>
                <span className="text-zinc-600 font-[family-name:var(--font-mono)] text-xs">
                  /
                </span>
                <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-white font-normal">
                  Implemented Capabilities
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.details.features.map((feat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-violet-400/30 transition-all group flex items-start gap-3.5"
                  >
                    <div className="w-7 h-7 rounded-lg bg-violet-600/15 border border-violet-500/30 flex items-center justify-center shrink-0 mt-0.5 text-violet-400 group-hover:scale-105 group-hover:bg-violet-600/25 transition-all">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-zinc-500 mb-1">
                        FEAT // 0{idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {feat}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* =========================================================================
                SECTION 04: ARCHITECTURE & WORKFLOW
                ========================================================================= */}
            <section
              id="section-architecture"
              className="scroll-mt-36 space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <span className="font-[family-name:var(--font-mono)] text-xs text-violet-400 font-semibold tracking-widest uppercase">
                  04 // Architecture
                </span>
                <span className="text-zinc-600 font-[family-name:var(--font-mono)] text-xs">
                  /
                </span>
                <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-white font-normal">
                  System Architecture &amp; Data Pipeline
                </h2>
              </div>

              {/* Architecture Narrative */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                <div className="text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  System Overview
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {project.details.architecture}
                </p>
              </div>

              {/* Horizontal / Sequential Visual Pipeline Diagram */}
              {project.details.architecturePipeline &&
                project.details.architecturePipeline.length > 0 && (
                  <div className="space-y-3">
                    <div className="text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-zinc-400 font-semibold flex items-center justify-between">
                      <span>// Visual Execution Pipeline</span>
                      <span className="text-zinc-500 text-[10px]">
                        End-to-End Processing
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
                      {project.details.architecturePipeline.map(
                        (stage, idx, arr) => (
                          <div key={idx} className="relative flex flex-col">
                            <div className="p-4 rounded-xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/[0.08] hover:border-violet-500/40 transition-all h-full flex flex-col justify-between space-y-3">
                              <div>
                                <div className="flex items-center justify-between font-[family-name:var(--font-mono)] text-[10px] text-zinc-500 mb-1.5">
                                  <span>STAGE {stage.step}</span>
                                  <span className="text-violet-400 font-semibold">
                                    ●
                                  </span>
                                </div>
                                <h4 className="font-semibold text-xs sm:text-sm text-white tracking-tight">
                                  {stage.title}
                                </h4>
                                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-[family-name:var(--font-mono)] bg-violet-500/10 border border-violet-500/20 text-violet-300">
                                  {stage.tech}
                                </span>
                              </div>
                              <p className="text-[11px] text-zinc-400 leading-snug">
                                {stage.description}
                              </p>
                            </div>

                            {/* Arrow Indicator between horizontal items on desktop */}
                            {idx < arr.length - 1 && (
                              <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full bg-[#0d0716] border border-violet-400/40 items-center justify-center text-violet-400 text-[9px]">
                                →
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Step-by-Step Data Workflow List */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <div className="text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                  // Step-by-Step Execution Sequence
                </div>
                <div className="space-y-2.5">
                  {project.details.workflow.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3 hover:border-violet-500/30 transition-colors"
                    >
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500/20 text-violet-300 text-[10px] font-[family-name:var(--font-mono)] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-[family-name:var(--font-inter)]">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 05: TECHNOLOGIES & STACK
                ========================================================================= */}
            <section
              id="section-technologies"
              className="scroll-mt-36 space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <span className="font-[family-name:var(--font-mono)] text-xs text-violet-400 font-semibold tracking-widest uppercase">
                  05 // Technologies
                </span>
                <span className="text-zinc-600 font-[family-name:var(--font-mono)] text-xs">
                  /
                </span>
                <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-white font-normal">
                  Categorized Technology Stack
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.details.techCategories.map((group, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl p-4 sm:p-5 bg-white/[0.02] border border-white/[0.08] hover:border-violet-500/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-cyan-300 font-semibold mb-3">
                        {group.category}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="px-2.5 py-1 rounded-md text-[11px] font-[family-name:var(--font-mono)] bg-white/[0.04] text-zinc-300 border border-white/[0.08] hover:border-violet-400/40 hover:text-white transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* =========================================================================
                SECTION 06: SCREENSHOTS GALLERY
                ========================================================================= */}
            <section
              id="section-screenshots"
              className="scroll-mt-36 space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <span className="font-[family-name:var(--font-mono)] text-xs text-violet-400 font-semibold tracking-widest uppercase">
                  06 // Screenshots
                </span>
                <span className="text-zinc-600 font-[family-name:var(--font-mono)] text-xs">
                  /
                </span>
                <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-white font-normal">
                  Visual Interface &amp; Demonstration
                </h2>
              </div>

              <div className="space-y-4">
                <div
                  onClick={() => setSelectedImage(project.image)}
                  className="rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-[0_12px_40px_rgba(0,0,0,0.6)] cursor-zoom-in group"
                >
                  <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/10 font-[family-name:var(--font-mono)] text-xs text-zinc-400">
                    <span>
                      {project.shortTitle} — Full Application View
                    </span>
                    <span className="text-violet-400 text-[11px] uppercase tracking-wider">
                      Click to Expand / Zoom
                    </span>
                  </div>

                  <div className="p-4 sm:p-6 bg-[#08040f] flex items-center justify-center">
                    <img
                      src={project.image}
                      alt={`${project.title} detailed screenshot`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto max-h-[580px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                  </div>

                  <div className="px-5 py-3 bg-white/[0.02] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-[family-name:var(--font-mono)] text-zinc-400">
                    <span>
                      Figure 1.0: Live interface layout &amp; telemetry
                      dashboard
                    </span>
                    <span className="text-zinc-500">
                      Format: High-Resolution Native PNG
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 07: ENGINEERING DETAILS & RESULTS
                ========================================================================= */}
            <section
              id="section-engineering"
              className="scroll-mt-36 space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <span className="font-[family-name:var(--font-mono)] text-xs text-violet-400 font-semibold tracking-widest uppercase">
                  07 // Engineering
                </span>
                <span className="text-zinc-600 font-[family-name:var(--font-mono)] text-xs">
                  /
                </span>
                <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-white font-normal">
                  Technical Decisions &amp; Core Contributions
                </h2>
              </div>

              {/* Engineering Deep Dives */}
              {project.details.engineeringNotes &&
                project.details.engineeringNotes.length > 0 && (
                  <div className="space-y-4">
                    <div className="text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-zinc-400 font-semibold">
                      // Architectural Decisions &amp; Analysis
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {project.details.engineeringNotes.map((note, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-violet-500/30 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-violet-400 mb-2">
                              DECISION // 0{idx + 1}
                            </div>
                            <h4 className="font-semibold text-sm text-white mb-2 font-[family-name:var(--font-serif)]">
                              {note.title}
                            </h4>
                            <p className="text-xs text-zinc-300 leading-relaxed font-[family-name:var(--font-inter)]">
                              {note.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Core Contributions List */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                <div className="text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-fuchsia-400 font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
                  Engineering Contributions &amp; Implementation Details
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.details.contributions.map((c, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs sm:text-sm text-zinc-300 leading-relaxed flex items-start gap-2.5 font-[family-name:var(--font-inter)]"
                    >
                      <span className="text-fuchsia-400 font-bold shrink-0">
                        ✓
                      </span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 08: WHAT'S NEXT & ROADMAP
                ========================================================================= */}
            <section id="section-roadmap" className="scroll-mt-36 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <span className="font-[family-name:var(--font-mono)] text-xs text-violet-400 font-semibold tracking-widest uppercase">
                  08 // What&apos;s Next
                </span>
                <span className="text-zinc-600 font-[family-name:var(--font-mono)] text-xs">
                  /
                </span>
                <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-white font-normal">
                  Future Roadmap &amp; Planned Milestones
                </h2>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                <div className="text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-amber-300 font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Planned Roadmap Items (Explicitly Distinguished from Shipped Features)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(
                    project.details.whatNext ||
                    project.details.plannedFeatures || [
                      "Expanded platform integrations & cloud synchronization",
                      "Automated edge telemetry compression and benchmark optimization",
                    ]
                  ).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-amber-500/[0.02] border border-amber-500/20 text-xs sm:text-sm text-zinc-300 leading-relaxed flex items-start gap-2.5"
                    >
                      <span className="text-amber-400 mt-0.5 shrink-0 font-[family-name:var(--font-mono)]">
                        ○
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Bottom Actions & Switcher */}
            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-white/5 border border-white/15 hover:bg-white/10 hover:border-violet-400/50 transition-all cursor-pointer"
              >
                <span>← Close Case Study &amp; Return to 3D Ball</span>
              </button>

              <div className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-xs text-zinc-500">
                <span>Press</span>
                <kbd className="px-2 py-1 rounded bg-white/10 text-zinc-300 border border-white/10">
                  Esc
                </kbd>
                <span>to exit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl max-h-[90vh] rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl p-2"
            >
              <button
                onClick={() => setSelectedImage(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
              >
                ✕
              </button>
              <img
                src={selectedImage}
                alt="Enlarged screenshot"
                className="w-auto h-auto max-h-[85vh] max-w-full object-contain mx-auto rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
