"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import ElectricBorder from '@/components/ElectricBorder'

const Hyperspeed = dynamic(() => import('@/components/ui/HyperSpeed'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />,
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

export const HeroSection: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const roles = [
    {
      prefix: "",
      title: "Software",
      highlight: "Engineer",
      key: "software-engineer",
    },
    {
      prefix: "AI",
      title: "Software",
      highlight: "Engineer",
      key: "ai-software-engineer",
    },
  ];

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [prefersReducedMotion, roles.length]);

  const navItems = [
    { label: "Home", section: "home" },
    { label: "Projects", section: "projects" },
    { label: "About", section: "about" },
    { label: "Contact", section: "contact" },
  ];
  return (
    <div id="home" className="relative w-full bg-transparent text-white overflow-hidden">
      {/* Hyperspeed background */}
      <div className="absolute inset-0 z-0">
        <Hyperspeed />
      </div>
      {/* Main container with space for content */}
      <div className="relative z-30 flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 h-screen overflow-hidden">
        {/* Navigation */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full flex items-center justify-between px-5 md:px-6 py-3 rounded-full bg-black/20 backdrop-blur-xl md:backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] mb-8"
        >
          <div
            className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-violet-500/20 via-violet-400/10 to-cyan-500/20 border border-white/10"
          >
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="6" width="32" height="28" rx="6" stroke="white" strokeWidth="2.5" />
              <path d="M11 14L17 20L11 26" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 26H29" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() =>
                  document
                    .getElementById(item.section)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-5 py-2.5 rounded-full font-sans text-[15px] font-normal text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </motion.nav>

        {/* Mobile menu */}
        <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-sm rounded-[32px] bg-[linear-gradient(180deg,rgba(10,10,10,0.92)_0%,rgba(53,1,54,0.28)_100%)] backdrop-blur-3xl border border-white/10 shadow-[0_0_60px_rgba(139,92,246,0.15)] overflow-hidden p-8"
            >
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.12),transparent_65%)]" />

              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[rgba(53,1,54,0.15)] border border-white/10 backdrop-blur-xl flex items-center justify-center text-white/80 hover:text-white hover:border-violet-500/20 transition-all cursor-pointer"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="relative flex flex-col gap-3 mt-8">
                {navItems.map((item, index) => (
                  <ElectricBorder
                    key={item.label}
                    color="#B497CF"
                    speed={1.5}
                    chaos={0.06}
                    borderRadius={13}
                  >
                    <motion.button
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.3 }}
                      onClick={() => {
                        document
                          .getElementById(item.section)
                          ?.scrollIntoView({ behavior: "smooth" });

                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-4 rounded-2xl font-sans text-[15px] font-normal text-white/80 hover:text-white transition-all duration-300 cursor-pointer"
                    >
                      {item.label}
                    </motion.button>
                  </ElectricBorder>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>


        {/* Main hero content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-30 flex-1 flex items-center justify-center w-full"
        >
          <div className="text-center flex flex-col items-center w-full max-w-3xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 md:px-4 py-1.5 md:py-2 rounded-full border border-emerald-500/25 bg-emerald-500/5 backdrop-blur-sm md:backdrop-blur-md mb-4 md:mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[11px] md:text-[12px] tracking-[0.08em] md:tracking-[0.1em] text-emerald-300 uppercase font-normal">
                Available for new opportunities
              </span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="font-serif-display text-[clamp(1.5rem,2.5vw,2.25rem)] text-white/95 font-normal tracking-[0.04em] mb-2 md:mb-3 drop-shadow-[0_2px_12px_rgba(255,255,255,0.12)] uppercase"
            >
              PREMA SAI KURUVA
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="w-full min-h-[100px] sm:min-h-[125px] md:min-h-[145px] flex items-center justify-center my-1"
            >
              <AnimatePresence mode="wait">
                <motion.h1
                  key={roles[roleIndex].key}
                  initial={{
                    opacity: 0,
                    y: prefersReducedMotion ? 0 : 16,
                    filter: prefersReducedMotion ? "none" : "blur(6px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "none",
                  }}
                  exit={{
                    opacity: 0,
                    y: prefersReducedMotion ? 0 : -16,
                    filter: prefersReducedMotion ? "none" : "blur(6px)",
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-editorial text-[clamp(4rem,7vw,6.5rem)] font-normal tracking-[-0.03em] leading-[0.95] text-center"
                >
                  <span className="inline-flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1">
                    <span className="inline-flex items-center gap-x-2 sm:gap-x-2.5">
                      {roles[roleIndex].prefix && (
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-violet-400 drop-shadow-[0_0_24px_rgba(34,211,238,0.45)]">
                          {roles[roleIndex].prefix}
                        </span>
                      )}
                      <span className="text-white drop-shadow-[0_2px_18px_rgba(255,255,255,0.12)]">
                        {roles[roleIndex].title}
                      </span>
                    </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 drop-shadow-[0_0_32px_rgba(168,85,247,0.45)]">
                      {roles[roleIndex].highlight}
                    </span>
                  </span>
                </motion.h1>
              </AnimatePresence>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mt-5 md:mt-8 text-neutral-400 font-sans font-normal text-[clamp(1rem,1.25vw,1.2rem)] leading-[1.6] max-w-xl mx-auto"
            >
              Backend &amp; AI-focused AIML student building FastAPI microservices,
              ML inference pipelines, and AI-powered developer tools.
              Experienced with Python, PostgreSQL, FastAPI, Next.js, and LLM integrations.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
